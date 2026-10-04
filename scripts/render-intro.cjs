/* eslint-disable @typescript-eslint/no-require-imports -- Standalone CommonJS media renderer. */
const { chromium } = require("playwright");
const fs = require("node:fs"),
  path = require("node:path"),
  http = require("node:http"),
  { spawn, spawnSync } = require("node:child_process"),
  { once } = require("node:events");
const root = path.resolve(__dirname, ".."),
  output = path.join(root, "public/films");
const runtime =
  "C:/Users/jkhon/.codex/visualizations/2026/08/23/01a02efd-8933-7fb1-8295-35c1cad10105";
const ff = path.join(
  runtime,
  "intro-video-runtime/imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v7.1.exe",
);
const routes = {
  "/composition": path.join(__dirname, "intro-composition.html"),
  "/font.woff2": path.join(root, "src/app/fonts/PretendardVariable.woff2"),
  "/village.webp": path.join(output, "logus-village.webp"),
  "/clouds.webp": path.join(output, "logus-clouds.webp"),
  "/aerial.webp": path.join(output, "logus-aerial.webp"),
};
const server = http.createServer((req, res) => {
  const file = routes[req.url];
  if (!file) {
    res.writeHead(404).end();
    return;
  }
  res.setHeader(
    "Content-Type",
    file.endsWith(".html")
      ? "text/html"
      : file.endsWith(".woff2")
        ? "font/woff2"
        : "image/webp",
  );
  fs.createReadStream(file).pipe(res);
});
function encoder(name) {
  const target = path.join(output, name),
    pending = target.replace(".mp4", ".pending.mp4");
  const process = spawn(
    ff,
    [
      "-hide_banner",
      "-loglevel",
      "error",
      "-y",
      "-f",
      "image2pipe",
      "-vcodec",
      "mjpeg",
      "-framerate",
      "60",
      "-i",
      "pipe:0",
      "-an",
      "-vf",
      "scale=in_range=full:out_range=tv:in_color_matrix=bt601:out_color_matrix=bt709,format=yuv420p",
      "-c:v",
      "libx264",
      "-threads",
      "2",
      "-preset",
      "fast",
      "-crf",
      "19",
      "-color_range",
      "tv",
      "-colorspace",
      "bt709",
      "-color_primaries",
      "bt709",
      "-color_trc",
      "bt709",
      "-movflags",
      "+faststart",
      pending,
    ],
    { stdio: ["pipe", "ignore", "pipe"] },
  );
  let errors = "";
  process.stderr.on("data", (d) => {
    errors += d;
    console.error(String(d));
  });
  process.stdin.on("error", (e) => console.error(name, e.message, errors));
  const closed = once(process, "close");
  closed.then(([code]) => {
    if (code) console.error(name, "encoder exit", code, errors);
    else fs.renameSync(pending, target);
  });
  return {
    process,
    closed,
    get errors() {
      return errors;
    },
  };
}
(async () => {
  server.listen(8774, "127.0.0.1");
  await once(server, "listening");
  const browser = await chromium.launch({
    headless: true,
    executablePath:
      "C:/Users/jkhon/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe",
  });
  try {
    const page = await browser.newPage({
      viewport: { width: 1920, height: 1080 },
    });
    await page.goto("http://127.0.0.1:8774/composition");
    await page.evaluate(() => window.ready);
    const clean = encoder("logus-intro-cinema-15s.mp4"),
      brand = encoder("logus-intro-cinema-branded-15s.mp4");
    for (let frame = 0; frame < 900; frame++) {
      const t = frame / 60,
        raw = await page.evaluate((t) => window.renderFrame(t, false), t),
        buffer = Buffer.from(raw, "base64");
      if (!clean.process.stdin.write(buffer))
        await once(clean.process.stdin, "drain");
      const branded =
        t < 11.55
          ? buffer
          : Buffer.from(
              await page.evaluate((t) => window.renderFrame(t, true), t),
              "base64",
            );
      if (!brand.process.stdin.write(branded))
        await once(brand.process.stdin, "drain");
      if (frame % 120 === 0) console.log(`${frame}/900`);
    }
    for (const e of [clean, brand]) {
      e.process.stdin.end();
      const [code] = await e.closed;
      if (code) throw Error(e.errors);
    }
    const mobile = spawnSync(ff, [
      "-hide_banner", "-loglevel", "error", "-y",
      "-i", path.join(output, "logus-intro-cinema-15s.mp4"),
      "-vf", "crop=608:1080:1000:0,scale=720:1280",
      "-c:v", "libx264", "-preset", "fast", "-crf", "21",
      "-threads", "3", "-an", "-movflags", "+faststart",
      path.join(output, "logus-intro-cinema-mobile-15s.mp4"),
    ], { encoding: "utf8" });
    if (mobile.status !== 0) throw Error(mobile.stderr);
    console.log(
      "Rendered 15 seconds / 900 frames / 60fps / clean and branded versions",
    );
  } finally {
    await browser.close();
    server.close();
  }
})().catch((e) => {
  console.error(e);
  server.close();
  process.exitCode = 1;
});
