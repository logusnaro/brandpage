import { chromium } from "playwright";
import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import path from "node:path";
const base = process.env.TEST_BASE_URL || "http://localhost:3001";
const output = path.resolve("docs/qa/app-detail-2026-10-05");
await mkdir(output, { recursive: true });
// Existing system Edge; no new dependency or browser download.
const browser = await chromium.launch({ headless: true, channel: "msedge" });
const errors = [];
try {
  for (const [label, width, height] of [
    ["pc", 1440, 1000],
    ["mobile", 393, 852],
    ["small", 320, 740],
    ["tablet", 820, 1180],
  ]) {
    const page = await browser.newPage({
      viewport: { width, height },
      reducedMotion: "reduce",
    });
    page.on("pageerror", (error) => errors.push(`${label}: ${error.message}`));
    page.on("console", (message) => {
      if (message.type() === "error")
        errors.push(`${label}: ${message.text()}`);
    });
    for (const slug of ["bebe", "memogrip", "goodgo", "bookbap"]) {
      assert.equal(
        (await page.goto(`${base}/apps/${slug}?lang=ko`)).status(),
        200,
      );
      await page.evaluate(() => document.fonts.ready);
      await page.locator(".app-room-hero img").evaluate((img) => img.decode());
      const metrics = await page.evaluate(() => {
        const box = (selector) => {
          const r = document.querySelector(selector).getBoundingClientRect();
          return { top: r.top, bottom: r.bottom };
        };
        return {
          scrollWidth: document.documentElement.scrollWidth,
          header: box("header"),
          heading: box("h1"),
          copy: box(".app-room-copy"),
          scene: box(".app-room-scene"),
          media: document.querySelectorAll("video, iframe").length,
        };
      });
      assert.ok(
        metrics.scrollWidth <= width + 1,
        `${slug} ${label}: horizontal overflow`,
      );
      assert.ok(
        metrics.heading.top >= metrics.header.bottom,
        `${slug} ${label}: heading under header`,
      );
      if (width < 761)
        assert.ok(
          metrics.scene.top >= metrics.copy.bottom - 1,
          `${slug} ${label}: art overlaps copy`,
        );
      assert.equal(metrics.media, 0, "Media must not autoplay on arrival");
      assert.equal(await page.locator("h1").count(), 1);
      assert.equal(await page.locator(".app-room-neighbors a").count(), 3);
      if (label === "pc" || label === "mobile") {
        await page.screenshot({
          path: path.join(output, `${slug}-${label}-hero.png`),
        });
        if (slug === "bebe")
          for (const section of ["videos", "features"]) {
            const target = page.locator(`.app-room-${section}`);
            await target.scrollIntoViewIfNeeded();
            await target.locator("img").evaluateAll(async (imgs) => {
              await Promise.all(imgs.map((img) => img.decode()));
            });
            await target.evaluate((el) =>
              window.scrollTo(
                0,
                el.getBoundingClientRect().top + window.scrollY - 28,
              ),
            );
            await page.screenshot({
              path: path.join(output, `${slug}-${label}-${section}.png`),
            });
          }
      }
      await page.locator(".app-room-features").scrollIntoViewIfNeeded();
      await page.locator(".app-room-features img").evaluateAll(async (imgs) => {
        await Promise.all(imgs.map((img) => img.decode()));
      });
      console.log(`${slug}: ${label} ${width}×${height} layout/images passed`);
    }
    await page.goto(`${base}/apps/bebe?lang=en`);
    assert.ok(
      (await page.locator("h1").textContent()).includes("Less effort to log"),
    );
    const choices = page.locator(".film-video-options button");
    for (let index = 0; index < 3; index++) {
      await choices.nth(index).click();
      assert.equal(
        await choices.nth(index).getAttribute("aria-pressed"),
        "true",
      );
      assert.equal(await page.locator("video").count(), 0);
      await page.locator("button.film-player-poster").click();
      await page.waitForFunction(
        () => document.querySelector("video")?.readyState >= 1,
      );
      const media = await page.locator("video").evaluate((video) => {
        video.pause();
        return { duration: video.duration, width: video.videoWidth };
      });
      assert.ok(media.duration > 10 && media.width > 0);
    }
    await page.goto(`${base}/apps/bebe?lang=ko`);
    await page.locator(".app-extra-films summary").click();
    assert.equal(await page.locator(".app-extra-films a").count(), 2);
    await page.locator(".app-room-neighbors a").first().click();
    await page.waitForURL(/\/apps\/(memogrip|goodgo|bookbap)/);
    assert.ok(/\/apps\/(memogrip|goodgo|bookbap)/.test(page.url()));
    await page.close();
  }
  const page = await browser.newPage();
  for (const route of ["/", "/apps"]) {
    assert.equal((await page.goto(base + route)).status(), 200);
    assert.equal(await page.locator(".app-room-hero").count(), 0);
    assert.equal(await page.locator("a.app-card").count(), 4);
  }
  await page.close();
  assert.deepEqual(errors, [], "Browser errors");
  console.log(
    "English, 3 video playbacks, vertical links, neighbors, unchanged homepage/catalogue passed. No browser errors.",
  );
} finally {
  await browser.close();
}
