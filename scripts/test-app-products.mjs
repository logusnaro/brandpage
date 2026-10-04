// Server-rendered markup checks only. No browser screenshots or production data writes.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import vm from "node:vm";
import ts from "typescript";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import * as links from "../src/lib/productLinks.ts";
import * as rooms from "../src/lib/appDetailContent.ts";

const require = createRequire(import.meta.url);
const source = readFileSync(new URL("../src/components/AppProducts.tsx", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText;
const exports = {};
const imageBuilder = { width() { return this; }, height() { return this; }, fit() { return this; }, url() { return "https://cdn.example.com/image.webp"; } };
vm.runInNewContext(compiled, {
  exports,
  require: (id) => {
    if (id === "next/image") return { __esModule: true, default: ({ src, alt, width, height }) => React.createElement("img", { src, alt, width, height }) };
    if (id === "next/link") return { __esModule: true, default: ({ children, ...props }) => React.createElement("a", props, children) };
    if (id === "@/lib/productLinks") return links;
    if (id === "@/lib/appDetailContent") return rooms;
    if (id === "@/sanity/lib/image") return { urlFor: () => imageBuilder };
    if (id === "@/lib/homepageMedia") return { homepageImage: (image, fallback) => image?.asset ? imageBuilder.url() : fallback };
    return require(id);
  },
});
const render = (Component, props) => renderToStaticMarkup(React.createElement(Component, props));
const product = { _id: "p", name: "bebe", displayName: "DayByBaby", description: "Baby journal", status: "published", sortOrder: 0 };
const ten = Array.from({ length: 10 }, (_, index) => ({ ...product, _id: `p-${index}`, name: `app-${index}`, displayName: `App ${index}` }));
const home = render(exports.ProductCollection, { products: ten, locale: "ko", limit: 6 });
assert.equal((home.match(/class="app-card app-palette/g) || []).length, 6);
assert.ok(home.includes("나머지 앱 모두 보기"));
assert.ok(!home.includes("<video") && !home.includes("film-player"));
const directory = render(exports.ProductCollection, { products: ten, locale: "en" });
assert.equal((directory.match(/class="app-card app-palette/g) || []).length, 10);
assert.ok(directory.includes("Explore all apps"));
assert.ok(!directory.includes("app-village-note"));
const one = render(exports.ProductCollection, { products: [product], locale: "ko" });
assert.ok(one.includes("app-village-note") && one.includes("/apps/bebe?lang=ko"));
const four = render(exports.ProductCollection, { products: ten.slice(0, 4), locale: "ko", limit: 6 });
assert.equal((four.match(/app-card-upcoming/g) || []).length, 2);
assert.equal((four.match(/class="app-card app-palette/g) || []).length, 4);
assert.equal((four.match(/Coming soon/g) || []).length, 2);
const five = render(exports.ProductCollection, { products: ten.slice(0, 5), locale: "en" });
assert.equal((five.match(/app-card-upcoming/g) || []).length, 1);
const neighborhood = render(exports.ProductCollection, { products: [product, ...["memogrip", "goodgo", "bookbap"].map(name => ({ ...product, name, _id: name, displayName: name }))], locale: "ko", village: true });
assert.ok(neighborhood.includes("app-neighborhood-panorama"));
for (const name of ["daybybaby", "memogrip", "goodgo", "bookbap"]) assert.ok(neighborhood.includes(`/apps-art/${name}-v1.webp`));
assert.equal((neighborhood.match(/<a class="app-card /g) || []).length, 4);
assert.equal((neighborhood.match(/<article class="app-card app-card-upcoming"/g) || []).length, 2);
assert.ok(!neighborhood.includes("app-pebble-preview") && !neighborhood.includes("app-village-note"));
const header = render(exports.ProductCollectionHeader, { locale: "ko" });
assert.ok(header.includes("<h2>Apps</h2>") && header.includes("저마다의 하루"));
assert.ok(render(exports.ProductCollectionHeader, { locale: "en", directory: true }).includes("<h1>Apps</h1>"));
const badges = render(exports.ProductPlatforms, { product: { ...product, platforms: [
  { _key: "a", platform: "android", status: "available", url: "https://play.google.com/app" },
  { _key: "b", platform: "ios", status: "planned" },
  { _key: "c", platform: "toss", status: "planned" },
] }, locale: "ko" });
assert.ok(badges.includes("Android · 이용 가능") && badges.includes("iOS · 준비 중") && badges.includes("앱인토스 · 준비 중"));
const detail = render(exports.ProductShowcase, { product, index: 0, locale: "ko" });
assert.equal((detail.match(/<h1 /g) || []).length, 1);
assert.ok(detail.includes("Android · 출시 예정") && detail.includes("iOS · 준비 중"));
assert.ok(detail.includes("app-feature-grid") && detail.includes("응급 연락처는 DayByBaby의 필수 기능"));
assert.ok(detail.includes("app-room-emergency") && !detail.includes("시연 기능") && !detail.includes("demonstration feature"));
assert.ok(!detail.includes("daybybaby-guide.webp") && !detail.includes("daybybaby-day.webp"), "Do not reuse mascot-heavy video frames as feature cards");
assert.equal((detail.match(/aria-pressed="/g) || []).length, 3);
assert.ok(detail.includes("<details"));
const english = render(exports.ProductShowcase, { product, index: 0, locale: "en" });
assert.ok(english.includes("Less effort to log"));
assert.ok(english.includes("Emergency contacts are an essential") && !english.includes("demonstration feature"));
assert.ok(detail.includes("app-room-hero") && detail.includes("daybybaby-room-v1.webp"));
assert.ok(detail.indexOf("app-room-videos") < detail.indexOf("app-room-features"), "Video precedes features as approved");
assert.ok(!detail.includes("<video") && !detail.includes("<iframe"), "No media loads or plays before user interaction");
for (const name of ["memogrip", "goodgo", "bookbap"]) {
  const markup = render(exports.ProductShowcase, { product: { ...product, name, displayName: name }, index: 0, locale: "ko" });
  assert.ok(markup.includes("app-room-neighbor") && markup.includes("app-feature-grid"));
  assert.ok(markup.includes("app-room-designed") && markup.includes(`/apps-art/${name}-room-v2.webp`));
  for (const index of [1, 2, 3]) assert.ok(markup.includes(`/apps-art/${name}-feature-${index}.webp`));
  assert.ok(!markup.includes("app-detail-bottom"), "No duplicate downloads");
  assert.ok(!markup.includes("응급 연락처") && !markup.includes("film-video-area"));
}
const custom = render(exports.ProductShowcase, { product: { ...product, detail: { headlineI18n: { ko: "관리자가 바꾼 제목" }, introI18n: { ko: "관리자가 바꾼 설명" } }, highlights: [{ _key: "custom", label: { ko: "맞춤 기능" }, description: { ko: "맞춤 설명" }, image: { asset: { _ref: "test" } } }] }, index: 0, locale: "ko" });
for (const value of ["관리자가 바꾼 제목", "관리자가 바꾼 설명", "맞춤 기능", "맞춤 설명"]) assert.ok(custom.includes(value));
const empty = render(exports.ProductShowcase, { product: { ...product, videos: [], highlights: [] }, index: 0, locale: "ko" });
assert.ok(!empty.includes("film-video-area") && !empty.includes("app-feature-section"));
const allDownloads = render(exports.ProductDownloads, { product: { ...product, googlePlayUrl: "https://play.google.com/app", appStoreUrl: "https://apps.apple.com/app", webUrl: "https://example.com" }, locale: "ko" });
assert.equal((allDownloads.match(/target="_blank"/g) || []).length, 3);
console.log("Apps markup: 1/10 apps, 6-card homepage, list/detail split, Korean/English, 3 download links, empty CMS arrays and video grouping passed.");
console.log("Homepage/default-design regression is covered by test-admin-content.mjs.");
