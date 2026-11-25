import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { randomUUID } from "node:crypto";
import vm from "node:vm";
import ts from "typescript";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

const require = createRequire(import.meta.url);
const source = path => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const mocks = {};
function load(path) {
  const exports = {};
  const js = ts.transpileModule(source(path), { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText;
  vm.runInNewContext(js, { exports, Request, Response, URL, require: id => mocks[id] || require(id) });
  return exports;
}
const identity = load("src/lib/companyInfo.ts");
const privacy = load("src/lib/contactPrivacy.ts");
mocks["@/lib/companyInfo"] = identity;
mocks["@/lib/contactPrivacy"] = privacy;
const policy = load("src/content/websitePolicies.ts");
mocks["@/content/websitePolicies"] = policy;
const company = load("src/components/CompanyInformation.tsx");
const notice = load("src/components/ContactPrivacyNotice.tsx");
for (const locale of ["ko", "en"]) {
  const html = renderToStaticMarkup(React.createElement(company.CompanyInformation, { locale }));
  assert.ok(html.includes("701-12-03312") && html.includes("홍중기") && html.includes("06061"));
  assert.ok(html.includes("mailto:logus.naro@gmail.com") && html.includes("tel:01049649442"));
  assert.ok(!html.includes("146") && !html.includes("1981") && !html.includes("Mail-order registration"));
  assert.ok(locale === "ko" ? html.includes("언주로134길 18, 5층") : html.includes("Eonju-ro 134-gil"));
  const disclosure = renderToStaticMarkup(React.createElement(notice.ContactPrivacyNotice, { locale }));
  assert.ok(disclosure.includes(`/legal/studio/privacy?lang=${locale}`));
  assert.ok(disclosure.includes("privacy@sanity.io") && disclosure.includes("privacy@vercel.com"));
  for (const kind of ["privacy", "terms"]) {
    const document = policy.websitePolicy(kind, locale, identity.defaultCompanyInfo);
    assert.ok(document.body.includes("701-12-03312") && document.body.includes("logus.naro@gmail.com"));
    assert.ok(document.body.includes(locale === "ko" ? "언주로134길 18, 5층" : "Eonju-ro 134-gil"));
  }
}
const edited = identity.companyInfo({ address: "새 주소", phone: "", mailOrderNumber: "확인된 번호" });
assert.equal(edited.address, "새 주소");
assert.equal(edited.phone, identity.defaultCompanyInfo.phone);
assert.ok(renderToStaticMarkup(React.createElement(company.CompanyInformation, { locale: "ko", info: edited })).includes("확인된 번호"));

let cmsDocument = null;
mocks["@/sanity/client"] = { client: { fetch: async () => cmsDocument } };
mocks["@/sanity/lib/fetchPageData"] = { fetchPageData: async () => ({ settings: { businessInfo: { address: "관리자 변경 주소" } } }) };
mocks["next/link"] = { __esModule: true, default: ({ children, ...props }) => React.createElement("a", props, children) };
mocks["next/navigation"] = { notFound: () => { throw new Error("NOT_FOUND"); } };
const legalPage = load("src/app/legal/[service]/[kind]/page.tsx");
const pageProps = (kind, lang) => ({ params: Promise.resolve({ service: "studio", kind }), searchParams: Promise.resolve({ lang }) });
for (const kind of ["terms", "privacy"]) for (const locale of ["ko", "en"]) {
  const html = renderToStaticMarkup(await legalPage.default(pageProps(kind, locale)));
  assert.ok(html.includes(`lang="${locale}"`) && html.includes("701-12-03312"));
  if (locale === "ko") assert.ok(html.includes("관리자 변경 주소"));
}
cmsDocument = { title: "편집한 홈페이지 방침", version: "v2", effectiveDate: "2026-10-23", body: { ko: "관리자가 편집한 방침" } };
assert.ok(renderToStaticMarkup(await legalPage.default(pageProps("privacy", "ko"))).includes("관리자가 편집한 방침"));
assert.ok(renderToStaticMarkup(await legalPage.default(pageProps("privacy", "en"))).includes("Website Privacy Policy"));
await assert.rejects(() => legalPage.default(pageProps("missing", "ko")), /NOT_FOUND/);

let written = [], fail = false;
mocks["next/server"] = { NextResponse: { json: (body, init) => Response.json(body, init) } };
mocks["@/lib/sanity-admin"] = { getSanityAdminClient: () => ({ create: async doc => { if (fail) throw new Error("DO_NOT_LEAK_SECRET"); written.push(doc); return doc; } }) };
const route = load("src/app/api/contact/route.ts");
const valid = { inquiryType: "서비스 문의", name: " QA ", email: " QA@EXAMPLE.INVALID ", message: "테스트 문의", locale: "ko", privacyConsent: true, overseasConsent: true, noticeVersion: privacy.CONTACT_NOTICE_VERSION };
const send = value => route.POST(new Request("http://localhost/api/contact", { method: "POST", body: JSON.stringify(value) }));
for (const value of [null, [], {}, { ...valid, privacyConsent: false }, { ...valid, privacyConsent: "true" }, { ...valid, overseasConsent: false }, { ...valid, noticeVersion: "stale" }, { ...valid, email: "invalid" }, { ...valid, message: " " }]) {
  assert.equal((await send(value)).status, 400);
}
assert.equal((await route.POST(new Request("http://localhost/api/contact", { method: "POST", body: "{" }))).status, 400);
assert.equal(written.length, 0);
assert.equal((await send({ website: "spam.invalid" })).status, 200);
assert.equal(written.length, 0);
for (const locale of ["ko", "en"]) assert.equal((await send({ ...valid, locale })).status, 201);
assert.equal(written.length, 2);
assert.notEqual(written[0]._id, written[1]._id);
for (const doc of written) {
  assert.match(doc._id, /^private\.contacts\.[a-f0-9-]+$/);
  assert.equal(doc.name, "QA"); assert.equal(doc.email, "qa@example.invalid");
  assert.equal(doc.privacyConsent, true); assert.equal(doc.overseasConsent, true);
  assert.equal(doc.noticeVersion, privacy.CONTACT_NOTICE_VERSION);
  assert.ok(!Number.isNaN(Date.parse(doc.consentedAt)));
}
fail = true;
const failed = await send(valid);
assert.equal(failed.status, 503);
assert.ok(!(await failed.text()).includes("DO_NOT_LEAK_SECRET"));
console.log("Company/policies KO+EN, CMS fallback, contact consent/version validation, malformed input, private IDs and safe errors PASS.");

// Validate the real schema definitions without launching the interactive Studio CLI.
mocks.sanity = { defineType: value => value, defineField: value => value };
mocks["../../lib/companyInfo"] = identity;
mocks["../../lib/homepageMedia"] = { introVideoUrl: value => value || "" };
const objects = load("src/sanity/schemaTypes/storyObjects.ts");
const schemaTypes = [objects.localizedString, objects.localizedText, objects.dailyScene, objects.introScene, objects.lifeStage];
for (const file of ["siteSettings", "product", "socialLink", "mascot", "legalDocument", "appRelease", "contactSubmission", "operationsSnapshot"]) {
  schemaTypes.push(load(`src/sanity/schemaTypes/${file}.ts`)[file]);
}
const { validateSchema, groupProblems } = await import("@sanity/schema/_internal");
const problems = groupProblems(validateSchema(schemaTypes).getTypes());
const errors = problems.flatMap(group => group.problems).filter(problem => problem.severity === "error");
assert.deepEqual(errors, [], "Studio schema errors");
for (const definition of schemaTypes) {
  const groups = new Set((definition.groups || []).map(group => group.name));
  for (const field of definition.fields || []) for (const name of [field.group].flat().filter(Boolean)) {
    assert.ok(groups.has(name), `Undefined field group ${definition.name}.${field.name}: ${name}`);
  }
}
console.log(`Studio schema: ${schemaTypes.length} types, zero errors, field group references PASS.`);

if (process.argv.includes("--sanity-probe")) {
  const { createClient } = await import("@sanity/client");
  const options = { projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, dataset: process.env.NEXT_PUBLIC_SANITY_DATASET, apiVersion: "2026-10-23", useCdn: false, perspective: "raw" };
  assert.ok(process.env.SANITY_API_WRITE_TOKEN, "A server token is required for the authenticated probe.");
  const publicClient = createClient(options);
  const admin = createClient({ ...options, token: process.env.SANITY_API_WRITE_TOKEN });
  const id = `private.contacts.qa-${randomUUID()}`;
  let created = false;
  try {
    await admin.create({ _id: id, _type: "contactSubmission", name: "Temporary privacy access QA", email: "qa@example.invalid", message: "Synthetic access verification, no personal data.", receivedAt: new Date().toISOString(), status: "new" });
    created = true;
    assert.equal((await admin.getDocument(id))?._id, id);
    assert.equal(await publicClient.getDocument(id), undefined);
    assert.equal(await publicClient.fetch("count(*[_id == $id])", { id }), 0);
  } finally {
    if (created) await admin.delete(id);
  }
  assert.equal(await admin.getDocument(id), undefined);
  console.log("Sanity live synthetic probe: authenticated read PASS, anonymous direct/query access blocked PASS, own test document deleted PASS.");
}
