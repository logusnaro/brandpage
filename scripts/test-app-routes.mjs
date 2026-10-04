import assert from "node:assert/strict";

const base = process.env.TEST_BASE_URL || "http://localhost:3001";
async function page(path, status = 200) {
  const response = await fetch(base + path, { redirect: "manual" });
  assert.equal(response.status, status, path);
  return { html: (await response.text()).replace(/<!--.*?-->/gs, ""), headers: response.headers };
}
const home = await page("/");
assert.ok(home.html.includes('class="app-card app-palette-0"'));
assert.ok(home.html.includes('id="intro"') && home.html.includes('id="contact"'));
assert.ok(!home.html.includes('class="film-player'));
const all = await page("/apps");
assert.ok(all.html.includes("THE logU NEIGHBORHOOD") && all.html.includes("/apps/bebe?lang=ko"));
for (const name of ["DayByBaby", "MemoGrip", "GoodGo", "BookBap"]) assert.ok(all.html.includes(name));
assert.equal((home.html.match(/class="app-card app-card-upcoming"/g) || []).length, 2);
for (const slug of ["memogrip", "goodgo", "bookbap"]) {
  const app = await page("/apps/" + slug);
  assert.ok(app.html.includes("<h1"));
}
const detail = await page("/apps/bebe");
assert.ok(detail.html.includes("<h1") && detail.html.includes("DayByBaby"));
assert.ok(detail.html.includes("Android ·") && detail.html.includes("iOS ·"));
assert.ok(detail.html.includes("app-feature-section"));
const english = await page("/apps/bebe?lang=en");
assert.ok(english.html.includes('lang="en"') && english.html.includes("Less effort to log"));
const missing = await page("/apps/not-a-real-app", 404);
assert.ok(missing.html.includes("App not found"));
const manage = await page("/manage", 307);
assert.ok(manage.headers.get("location")?.includes("/manage/login"));
for (const path of ["/films/ppuri.webp", "/films/logus-village.webp", "/films/daybybaby-ppuri-intro-20s.mp4"]) {
  await page(path);
}
console.log("HTTP QA: home/apps/detail/English 200, missing app 404, administrator 307, unchanged media 200 passed.");
