// Read-only fixture checks. No CMS writes, browser or live contact submission.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { execFileSync } from "node:child_process";
import vm from "node:vm";
import ts from "typescript";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import * as links from "../src/lib/productLinks.ts";
import * as rooms from "../src/lib/appDetailContent.ts";
import { launchCatalogue } from "../src/lib/launchCatalogue.ts";

const require = createRequire(import.meta.url);
const imageBuilder = { width() { return this; }, height() { return this; }, fit() { return this; }, url() { return "https://cdn.sanity.io/images/project/dataset/fixture.webp"; } };
const mocks = {
  "next/image": { __esModule: true, default: ({ src, alt, width, height }) => React.createElement("img", { src, alt, width, height }) },
  "next/link": { __esModule: true, default: ({ children, ...props }) => React.createElement("a", props, children) },
  "@/lib/productLinks": links,
  "@/lib/appDetailContent": rooms,
  "@/sanity/lib/image": { urlFor: () => imageBuilder },
  "../sanity/lib/image": { urlFor: () => imageBuilder },
};
const source = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
function load(text, overrides = {}) {
  const exports = {};
  const compiled = ts.transpileModule(text, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText;
  vm.runInNewContext(compiled, { exports, URL, require: (id) => {
    if (id.endsWith(".css")) return {};
    return overrides[id] || mocks[id] || require(id);
  } });
  return exports;
}
const media = load(source("src/lib/homepageMedia.ts"));
mocks["@/lib/homepageMedia"] = media;
const products = load(source("src/components/AppProducts.tsx"));
mocks["@/components/AppProducts"] = products;
const home = load(source("src/components/VideoHomepage.tsx"));
const baselineProducts = load(execFileSync("git", ["show", "d42b89d:src/components/AppProducts.tsx"], { encoding: "utf8" }));
const baselineHome = load(execFileSync("git", ["show", "d42b89d:src/components/VideoHomepage.tsx"], { encoding: "utf8" }), { "@/components/AppProducts": baselineProducts });
const render = (component, props) => renderToStaticMarkup(React.createElement(component, props)).replace(/\s+/g, " ");
const baseCopy = { pageLabels: { contact: { ko: "Contact", en: "Contact" } }, contactTitle: { ko: "함께 남기고 싶은\n이야기가 있나요?" } };
// Hold separately approved icon/film defaults fixed while comparing the CMS additions.
// Their fallback behavior is covered by test-app-products.mjs.
const fixedIcon = { asset: { _ref: "image-fixture-1000x1000-webp" } };
const props = { copy: baseCopy, products: launchCatalogue.map(product => ({ ...product, appIcon: fixedIcon })), socialLinks: [] };
assert.equal(render(home.VideoHomepage, props), render(baselineHome.VideoHomepage, props), "Unset CMS additions must preserve the complete current homepage markup");
for (const locale of ["ko", "en"]) {
  for (const product of launchCatalogue) {
    const props = { product: { ...product, appIcon: fixedIcon, videos: [] }, index: 0, locale };
    assert.equal(render(products.ProductShowcase, props), render(baselineProducts.ProductShowcase, props), `CMS baseline with fixed icon and hidden films: ${product.name}/${locale}`);
  }
}
const image = { asset: { _ref: "image-fixture-1000x1000-webp" } };
const settings = {
  cinema: Object.fromEntries(["heroSubtitle", "storyTitle", "storyBody", "worldsTitle", "worldsBody", "filmLabel", "studioNav", "appsNav", "growingCaption", "togetherCaption", "lookingBackCaption", "appsHeading", "productTitle", "appsDescription", "appsMore", "comingSoonTitle", "comingSoonBody", "comingSoonCaption", "growingNote", "platformRoadmap", "footerLegal", "footerBusiness"].map(key => [key, { ko: `수정-${key}`, en: `Edited-${key}` }])),
  homepageMedia: Object.fromEntries(["heroPoster", "growingImage", "togetherImage", "lookingBackImage", "contactImage", "villageImage"].map(key => [key, image])),
  contactForm: Object.fromEntries(["eyebrow", "inquiry", "product", "collaboration", "other", "name", "email", "message", "consent", "submit"].map(key => [key, { ko: `폼-${key}` }])),
};
settings.homepageMedia.heroVideoUrl = "https://media.example.com/intro.mp4";
const edited = render(home.VideoHomepage, { ...props, copy: { ...baseCopy, ...settings } });
for (const key of Object.keys(settings.cinema)) assert.ok(edited.includes(`수정-${key}`), `Connected homepage copy ${key}`);
for (const key of Object.keys(settings.contactForm)) assert.ok(edited.includes(`폼-${key}`), `Connected contact copy ${key}`);
assert.equal((edited.match(/src="https:\/\/media.example.com\/intro.mp4"/g) || []).length, 2, "Mobile falls back to edited PC film");
assert.ok((edited.match(/cdn.sanity.io/g) || []).length >= 9, "All selected image slots connected");
for (const key of ["inquiryType", "name", "email", "message", "website"]) assert.ok(edited.includes(`name="${key}"`));
assert.ok(edited.includes('required="" type="checkbox"'), "Consent still required");
const english = render(products.ProductCollectionHeader, { locale: "en", copy: settings.cinema });
for (const key of ["appsHeading", "productTitle", "appsDescription", "appsMore"]) assert.ok(english.includes(`Edited-${key}`));
const detailFields = ["headlineI18n", "introI18n", "featureHeadingI18n", "featureIntroI18n", "essentialTitleI18n", "essentialBodyI18n", "artNoteI18n"];
const custom = render(products.ProductShowcase, { product: { ...launchCatalogue[1], displayNameI18n: { ko: "메모그립" }, detail: Object.fromEntries(detailFields.map(key => [key, { ko: `상세-${key}` }])) }, index: 0, locale: "ko" });
for (const key of detailFields) assert.ok(custom.includes(`상세-${key}`));
assert.ok(custom.includes("app-room-designed") && custom.includes("메모그립"), "Editing name keeps designed app layout");
const renamed = render(products.ProductShowcase, { product: { ...launchCatalogue[0], displayNameI18n: { ko: "데이바이베이비" } }, index: 0, locale: "ko" });
assert.ok(renamed.includes("데이바이베이비"));
for (const invalid of ["http://bad/intro.mp4", "javascript:alert(1)", "//bad/intro.mp4", "/../intro.mp4", "/films/../intro.mp4", "/films/intro\\evil.mp4", "https://user:pass@bad/intro.mp4", "https://youtu.be/abcdefghijk"]) assert.equal(media.introVideoUrl(invalid, "default"), "default", invalid);
for (const valid of ["/films/new.mp4", "https://cdn.example.com/new.mp4?token=abc"]) assert.equal(media.introVideoUrl(valid, "default"), valid);
assert.equal(media.homepageImage({}, "default"), "default");
const merged = load(source("src/sanity/lib/fetchPageData.ts"), {
  "../client": { client: {} }, "./queries": {},
  "./fallback": { fallbackSiteSettings: load(source("src/sanity/lib/fallback.ts")).fallbackSiteSettings },
  "@/lib/launchCatalogue": { mergeLaunchCatalogue: (x) => x },
}).mergeSettings(settings);
assert.equal(merged.homepageMedia.heroVideoUrl, settings.homepageMedia.heroVideoUrl);
assert.equal(merged.contactForm.submit.ko, "폼-submit");
assert.equal(merged.cinema.appsHeading.ko, "수정-appsHeading");
const templates = load(source("src/sanity/productTemplates.ts"), { "../lib/launchCatalogue": { launchCatalogue }, "../lib/appDetailContent": rooms }).productTemplates;
assert.equal(templates.length, 4);
assert.equal(new Set(templates.map(item => item.id)).size, 4);
for (const template of templates) {
  assert.equal(template.value.status, "draft", "Template never publishes itself");
  assert.ok(template.value.detail.headlineI18n.ko && template.value.name.current);
}
console.log(`Admin content: ${Object.keys(settings.cinema).length} bilingual copy slots, 6 images, MP4 safety/mobile fallback, form integrity, 7 detail fields, merge wiring and 4 draft templates PASS.`);
console.log("CMS design regression: homepage + 4 apps × 2 languages match d42b89d with fixed icons and hidden films PASS; film/icon defaults are tested separately.");
