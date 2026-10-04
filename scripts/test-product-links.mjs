import assert from "node:assert/strict";
import { productDownloads, productPath, productSlug, httpsUrl } from "../src/lib/productLinks.ts";

const base = { _id: "product-one", name: "bebe", displayName: "DayByBaby" };
assert.equal(productPath(base, "ko"), "/apps/bebe?lang=ko");
assert.equal(productSlug({ _id: "fallback" }), "fallback");
assert.equal(productPath({ _id: "x", name: "a/b?" }, "en"), "/apps/a%2Fb%3F?lang=en");
for (const url of ["javascript:alert(1)", "http://example.com", "//example.com", "https://user:pass@example.com", "not-a-url"]) {
  assert.equal(httpsUrl(url), undefined);
}
assert.equal(httpsUrl("https://example.com/app"), "https://example.com/app");
assert.deepEqual(productDownloads(base).map((item) => [item.platform, item.planned]), [["android", true], ["ios", true]]);
const all = productDownloads({ ...base, googlePlayUrl: "https://play.google.com/store/apps/details?id=example", appStoreUrl: "https://apps.apple.com/app/id123", webUrl: "https://example.com" });
assert.equal(all.length, 3);
assert.ok(all.every((item) => item.url));
assert.deepEqual(productDownloads({ ...base, androidStatus: "none", iosStatus: "none" }), []);
assert.equal(productDownloads({ ...base, googlePlayUrl: "https://play.google.com/app", androidStatus: "planned" })[0].url, undefined);
assert.deepEqual(productDownloads({ ...base, name: "web-only", webUrl: "https://example.com" }).map((item) => item.platform), ["web"]);
assert.deepEqual(productDownloads({ ...base, name: "unsafe", googlePlayUrl: "javascript:alert(1)" }), []);
const platforms = [
  { _key: "a", platform: "android", status: "available", url: "https://play.google.com/app" },
  { _key: "b", platform: "ios", status: "planned" },
  { _key: "c", platform: "toss", status: "available", url: "https://go.toss.im/example" },
  { _key: "d", platform: "web", status: "hidden", url: "https://example.com" },
];
const multi = productDownloads({ ...base, platforms });
assert.equal(multi.length, 3);
assert.equal(multi[0].url, "https://play.google.com/app");
assert.equal(multi[1].planned, true);
assert.equal(multi[2].platform, "toss");
assert.deepEqual(productDownloads({ ...base, platforms: [], appStoreUrl: "https://apps.apple.com/app" }), []);
assert.equal(productDownloads({ ...base, platforms: [{ _key: "x", platform: "toss", status: "available", url: "javascript:bad" }] })[0].url, undefined);
assert.equal(productDownloads({ ...base, platforms: [...platforms, platforms[0]] }).length, 3);
console.log("Product links: route encoding, 3 platforms, planned/hidden states, legacy URLs and unsafe URLs passed.");
