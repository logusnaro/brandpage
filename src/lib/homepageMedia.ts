import { urlFor } from "../sanity/lib/image";
import type { SanityImage } from "../sanity/lib/types";

/** Intro uses native MP4, not a YouTube page. Never accept credentials or protocol-relative paths. */
export function introVideoUrl(value: string | undefined, fallback: string): string {
  const raw = value?.trim();
  if (!raw || /[\\\u0000-\u0020]/.test(raw)) return fallback;
  if (/^\/(?!\/)[a-z0-9/_\-.]+\.mp4$/i.test(raw) && !raw.split("/").includes("..")) return raw;
  try {
    const url = new URL(raw);
    return url.protocol === "https:" && !url.username && !url.password && /\.mp4$/i.test(url.pathname)
      ? url.href : fallback;
  } catch { return fallback; }
}

export function homepageImage(image: SanityImage | undefined, fallback: string, width = 1800) {
  if (!image?.asset?._ref) return fallback;
  try { return urlFor(image).width(width).url(); }
  catch { return fallback; }
}
