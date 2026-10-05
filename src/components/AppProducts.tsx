"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { urlFor } from "@/sanity/lib/image";
import type {
  Locale,
  LocalizedText,
  Product,
  ProductVideo,
  CinemaCopy,
  SanityImage,
} from "@/sanity/lib/types";
import {
  productPath,
  productDownloads,
  platformName,
} from "@/lib/productLinks";
import { appRoom } from "@/lib/appDetailContent";
import { homepageImage } from "@/lib/homepageMedia";

type FilmClip = ProductVideo & { localPoster?: string };
type ClipSource = {
  kind: "mp4" | "youtube" | "external";
  playbackUrl: string;
  directUrl: string;
};

const dayByBabyClips: FilmClip[] = [
  {
    _key: "ppuri-intro",
    titleI18n: { ko: "짧은 소개", en: "Short introduction" },
    url: "/films/daybybaby-ppuri-intro-20s.mp4",
    aspect: "landscape",
    duration: "0:20",
    localPoster: "/apps-art/daybybaby-video-v2.webp",
  },
  {
    _key: "ppuri-guide",
    titleI18n: { ko: "기능 가이드", en: "Feature guide" },
    url: "/films/daybybaby-ppuri-guide-35s.mp4",
    aspect: "landscape",
    duration: "0:35",
    localPoster: "/apps-art/daybybaby-video-v2.webp",
  },
  {
    _key: "ppuri-full",
    titleI18n: { ko: "소개 + 가이드", en: "Introduction + guide" },
    url: "/films/daybybaby-ppuri-intro-guide-90s.mp4",
    aspect: "landscape",
    duration: "1:30",
    localPoster: "/apps-art/daybybaby-video-v2.webp",
  },
  {
    _key: "ppuri-vertical-intro",
    titleI18n: { ko: "세로 소개", en: "Vertical introduction" },
    url: "/films/daybybaby-ppuri-vertical-intro-20s.mp4",
    aspect: "portrait",
    duration: "0:20",
    localPoster: "/films/daybybaby-vertical-intro.webp",
  },
  {
    _key: "ppuri-vertical-guide",
    titleI18n: { ko: "세로 가이드", en: "Vertical guide" },
    url: "/films/daybybaby-ppuri-vertical-guide-35s.mp4",
    aspect: "portrait",
    duration: "0:35",
    localPoster: "/films/daybybaby-vertical-guide.webp",
  },
];

function neighborClips(hero: string): FilmClip[] {
  const app = /^\/apps-art\/(memogrip|goodgo|bookbap)-room-v[23]\.webp$/.exec(hero)?.[1];
  if (!app) return [];
  return [
    { kind: "intro", ko: "짧은 소개", en: "Short introduction", seconds: 20, aspect: "landscape" as const },
    { kind: "guide", ko: "기능 가이드", en: "Feature guide", seconds: 35, aspect: "landscape" as const },
    { kind: "full", ko: "소개 + 가이드", en: "Introduction + guide", seconds: 90, aspect: "landscape" as const },
    { kind: "vertical-intro", ko: "세로 소개", en: "Vertical introduction", seconds: 20, aspect: "portrait" as const },
    { kind: "vertical-guide", ko: "세로 가이드", en: "Vertical guide", seconds: 35, aspect: "portrait" as const },
  ].map(({ kind, ko, en, seconds, aspect }) => ({
    _key: `${app}-${kind}`,
    titleI18n: { ko, en },
    url: `/films/apps-2026-10-06/${app}-${kind}.mp4`,
    localPoster: `/films/apps-2026-10-06/${app}-${kind}-poster.jpg`,
    aspect,
    duration: `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`,
  }));
}

export function localized(
  value: Partial<LocalizedText> | undefined,
  locale: Locale,
  fallback = "",
) {
  return value?.[locale]?.trim() || fallback;
}

export function brandCase(value: string) {
  return value.replace(/\blogu\b/gi, "logU");
}

function isDayByBaby(product: Product) {
  return (
    /^(bebe|daybybaby)$/i.test(product.name || "") ||
    /^(?:\[:\]\s*|logUs:\s*)?(bebe|daybybaby)$/i.test(
      product.displayName.trim(),
    )
  );
}

function productName(product: Product, locale: Locale = "ko") {
  const translated = localized(product.displayNameI18n, locale);
  if (translated) return translated;
  if (isDayByBaby(product)) return "DayByBaby";
  return localized(product.displayNameI18n, locale, product.displayName)
    .replace(/^\[:\]\s*/, "")
    .trim();
}

function StoreGlyph({ platform }: { platform: string }) {
  return (
    <svg
      className="app-room-store-glyph"
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="30"
      height="30"
      fill="currentColor"
    >
      {platform === "android" ? (
        <>
          <path d="m3 2 13 10L3 22Z" />
          <path d="m5 1 17 10-5 1Zm12 12 5 1L5 23Z" opacity=".65" />
        </>
      ) : platform === "ios" ? (
        <path d="M16 4c1-1 1.5-2.5 1.4-4-1.4.1-3 1-3.9 2.1-.8.9-1.5 2.4-1.3 3.8 1.5.1 2.9-.7 3.8-1.9ZM20.5 16.7c-.6 1.4-.9 2-1.7 3.2-1.1 1.6-2.7 3.6-4.6 3.6-1.6 0-2.1-1-4.2-1-2.1 0-2.7 1-4.2 1-1.8 0-3.3-1.8-4.5-3.5C-2 15.1.2 8.2 4.3 7.1c2-.5 3.8.7 5.2.7 1.4 0 3.4-1.3 5.7-.9 1 .2 2.2.7 3.1 1.6-3.6 2-3 7.1 2.2 8.2Z" />
      ) : (
        <path d="M4 4h16v16H4zm3 3v10h10V7Z" />
      )}
    </svg>
  );
}

function FeatureGlyph({ index, app }: { index: number; app: string }) {
  const appPaths: Record<string, string[]> = {
    memogrip: ["M4 20h4L20 8l-4-4L4 16v4ZM13 7l4 4", "M3 6h7l2 3h9v11H3V6Z", "M3 4h14v11H3V4Zm2 15h10m-5-4v4M19 9h3v12h-6V9h3"],
    goodgo: ["M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 4v5l4 2", "M3 5l6-2 6 2 6-2v16l-6 2-6-2-6 2V5Zm6-2v16m6-14v16", "M4 6h3m3 0h10M4 12h3m3 0h10M4 18h3m3 0h10"],
    bookbap: ["M12 5C8 3 5 3 2 4v15c3-1 6-1 10 1 4-2 7-2 10-1V4c-3-1-6-1-10 1Zm0 0v15", "M4 6h6v6H4V6Zm10 0h6v6h-6V6ZM10 12c0 4-2 6-6 6m16-6c0 4-2 6-6 6", "M10 3a7 7 0 1 0 0 14 7 7 0 0 0 0-14Zm5 12 6 6"],
  };
  const path = appPaths[app]?.[index % 3];
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      {path ? <path d={path} /> : index % 3 === 0 ? (
        <>
          <path d="M10 2h4v4h-4zM8 6h8v3H8zm0 3h8v12H8zM12 12h4m-4 4h4" />
        </>
      ) : index % 3 === 1 ? (
        <>
          <rect x="3" y="5" width="18" height="16" rx="3" />
          <path d="M7 2v6m10-6v6M3 10h18M7 14h3m4 0h3M7 17h3" />
        </>
      ) : (
        <path
          fill="currentColor"
          stroke="none"
          d="M12 21C3 15-1 8 4 4c3-2 6-1 8 2 2-3 5-4 8-2 5 4 1 11-8 17Z"
        />
      )}
    </svg>
  );
}

export function ProductDownloads({
  product,
  locale,
}: {
  product: Product;
  locale: Locale;
}) {
  const downloads = productDownloads(product);
  return (
    <div className="app-downloads">
      <span className="app-download-label">
        {locale === "ko"
          ? "당신의 하루에 함께하세요"
          : "Make it part of your day"}
      </span>
      <div className="app-download-buttons">
        {downloads.map((item) =>
          item.url ? (
            <a
              key={item.platform}
              href={item.url}
              target="_blank"
              rel="noreferrer"
            >
              <small>{platformName(item.platform, locale)}</small>
              <span>
                {item.platform === "web"
                  ? locale === "ko"
                    ? "웹에서 시작하기"
                    : "Open web app"
                  : item.platform === "toss"
                    ? locale === "ko"
                      ? "토스에서 이용하기"
                      : "Open in Toss"
                    : item.label}{" "}
                <span aria-hidden="true">↗</span>
              </span>
              {localized(item.noteI18n, locale) ? (
                <small>{localized(item.noteI18n, locale)}</small>
              ) : null}
            </a>
          ) : (
            <span
              className="app-platform-planned"
              key={item.platform}
              data-platform={item.platform}
            >
              <StoreGlyph platform={item.platform} />
              {platformName(item.platform, locale)} ·{" "}
            {locale === "ko" ? (item.platform === "android" ? "출시 예정" : "준비 중") : "Coming soon"}
              {localized(item.noteI18n, locale) ? (
                <small>{localized(item.noteI18n, locale)}</small>
              ) : null}
            </span>
          ),
        )}
        {downloads.length === 0 ? (
          <p className="app-download-pending">
            {locale === "ko"
              ? "다운로드는 출시 후 이곳에서 안내할게요."
              : "Download links will be available here at launch."}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export function ProductPlatforms({ product, locale }: { product: Product; locale: Locale }) {
  const platforms = productDownloads(product);
  return (
    <div className="app-platform-badges" aria-label={locale === "ko" ? "이용 플랫폼" : "Available platforms"}>
      {platforms.length ? platforms.map((item) => (
        <span key={item.platform} className={item.url ? "is-available" : "is-planned"}>
          <span className="app-platform-dot" aria-hidden="true" />
          {platformName(item.platform, locale)} · {item.url ? locale === "ko" ? "이용 가능" : "Available" : locale === "ko" ? "준비 중" : "Coming soon"}
          {localized(item.noteI18n, locale) ? <small>{localized(item.noteI18n, locale)}</small> : null}
        </span>
      )) : <span className="app-platform-unannounced">{locale === "ko" ? "플랫폼 안내 예정" : "Platforms to be announced"}</span>}
    </div>
  );
}

export function ProductCollectionHeader({ locale, directory = false, description, copy }: { locale: Locale; directory?: boolean; description?: string; copy?: CinemaCopy }) {
  const Heading = directory ? "h1" : "h2";
  return (
    <div className="app-neighborhood-heading">
      <Heading>{localized(copy?.appsHeading, locale, "Apps")}</Heading>
      <div className="app-neighborhood-intro">
        <h3>{localized(copy?.productTitle, locale, locale === "ko" ? "저마다의 하루, 저마다의 logU." : "Different days. Different logU.")}</h3>
        <p>{description || localized(copy?.appsDescription, locale, locale === "ko" ? "작은 순간들이 모여, 더 따뜻한 하루가 됩니다." : "Little moments, together. A warmer everyday life.")}</p>
      </div>
      <Link className="app-neighborhood-all" href={directory ? "#app-collection" : `/apps?lang=${locale}`}>{localized(copy?.appsMore, locale, locale === "ko" ? "모든 앱 보기" : "Explore all apps")} <span aria-hidden="true">↗</span></Link>
    </div>
  );
}

function collectionArt(product: Product) {
  if (product.mascotImage?.asset) return { src: urlFor(product.mascotImage).width(1000).url(), mascot: true };
  if (product.homeScreen?.asset || product.screenshot?.asset) return { src: productImage(product), mascot: false };
  const name = (product.name || "").toLowerCase();
  const slug = isDayByBaby(product) ? "daybybaby" : ({ memo: "memogrip", allinmemo: "memogrip", readygo: "goodgo", innerbrary: "bookbap" } as Record<string, string>)[name] || name;
  if (slug === "memogrip") return { src: "/apps-art/memogrip-v2.webp", mascot: false };
  return { src: ["daybybaby", "memogrip", "goodgo", "bookbap"].includes(slug) ? `/apps-art/${slug}-v1.webp` : productImage(product), mascot: false };
}

export function ProductCollection({ products, locale, limit, village = false, copy, villageImage }: { products: Product[]; locale: Locale; limit?: number; village?: boolean; copy?: CinemaCopy; villageImage?: SanityImage }) {
  const shown = limit ? products.slice(0, limit) : products;
  const panorama = homepageImage(villageImage, "/apps-art/village-v1.webp");
  const upcomingCount = products.length >= 4 ? Math.max(0, 6 - products.length) : 0;
  return (
    <div className={`app-collection${village ? " app-neighborhood-collection" : ""}`}>
      {village ? (
        <div className="app-neighborhood-panorama">
          <Image src={panorama} alt={locale === "ko" ? "저마다의 하루를 함께하는 다양한 logU들의 마을" : "A village of different logU, each sharing a different everyday life"} fill sizes="100vw" />
        </div>
      ) : <div className="app-collection-bar">
        <span>{locale === "ko" ? "저마다의 하루, 저마다의 logU." : "Different days. Different logU."}</span>
        <Link href={`/apps?lang=${locale}`}>{locale === "ko" ? "모든 앱 보기" : "Explore all apps"} <span aria-hidden="true">↗</span></Link>
      </div>}
      <div className="app-card-grid" id={village ? "app-collection" : undefined}>
        {shown.map((product, index) => {
          const ppuri = isDayByBaby(product);
          const name = productName(product, locale);
          const art = collectionArt(product);
          return (
            <Link className={`app-card app-palette-${index % 4}`} key={product._id} href={productPath(product, locale)}>
              <div className={`app-card-art ${art.mascot ? "has-mascot" : ""}`}>
                <Image src={art.src} alt={ppuri ? locale === "ko" ? "아기 logU 푸리의 따뜻한 육아 공간" : "Ppuri's warm nursery" : `${name} logU`} fill sizes="(max-width: 600px) 92vw, (max-width: 1000px) 46vw, 32vw" />
              </div>
              <div className="app-card-info">
                <div className="app-card-summary">
                  <span className="app-card-icon" aria-hidden="true">{product.appIcon?.asset ? <Image src={urlFor(product.appIcon).width(96).height(96).url()} alt="" width={48} height={48} /> : ppuri ? <Image src="/apps-art/daybybaby-app-icon.png" alt="" width={48} height={48} /> : <span>{name.charAt(0)}</span>}</span>
                  <div className="app-card-name">
                    <h3>{name}</h3>
                    <p>{localized(product.shortDescriptionI18n, locale, localized(product.descriptionI18n, locale, product.description))}</p>
                  </div>
                  <span className="app-card-arrow" aria-hidden="true">→</span>
                </div>
                <ProductPlatforms product={product} locale={locale} />
              </div>
            </Link>
          );
        })}
        {Array.from({ length: upcomingCount }, (_, index) => (
          <article className="app-card app-card-upcoming" key={`upcoming-${index}`} aria-label={locale === "ko" ? "새로운 앱 준비 중" : "A new app is coming"}>
            <div className="app-card-art">
              <span className="app-card-category">A NEW NEIGHBOR</span>
              <Image src={panorama} alt="" fill sizes="(max-width: 600px) 92vw, (max-width: 1000px) 46vw, 32vw" className={`app-coming-scene app-coming-scene-${index}`} />
              <span className="app-upcoming-index">0{shown.length + index + 1}</span>
            </div>
            <div className="app-card-info">
              <div className="app-card-summary">
                <span className="app-card-icon" aria-hidden="true">+</span>
                <div className="app-card-name"><h3>{localized(copy?.comingSoonTitle, locale, "Coming soon")}</h3><p>{localized(copy?.comingSoonBody, locale, locale === "ko" ? "또 다른 하루를 함께할 새로운 이웃." : "A new neighbor for another everyday life.")}</p></div>
                <span className="app-card-await" aria-hidden="true">···</span>
              </div>
              <p className="app-upcoming-caption">{localized(copy?.comingSoonCaption, locale, locale === "ko" ? "새로운 logU를 준비하고 있어요" : "A new logU is on the way")}</p>
            </div>
          </article>
        ))}
        {!village && shown.length < 3 ? (
          <aside className="app-village-note">
            <span>THE logU NEIGHBORHOOD</span>
            <div className="app-village-image">
              <Image src="/films/logus-village.webp" alt="" fill sizes="(max-width: 760px) 90vw, 50vw" />
            </div>
            <h3>{locale === "ko" ? "한 가지 앱이 아닌,\n다양한 하루를 위한 마을." : "Not just one app.\nA village for different days."}</h3>
            <p>{locale === "ko" ? "기록하는 방식도, 살아가는 하루도 다르니까. 저마다의 일상에 어울리는 logU와 앱들을 만들어갑니다." : "Different ways to remember. Different lives to live. We are building logU and apps for each of them."}</p>
          </aside>
        ) : null}
      </div>
      {village ? <div className="app-neighborhood-growing"><span aria-hidden="true">✦</span><p>{localized(copy?.growingNote, locale, locale === "ko" ? "작은 세계는 계속 자랍니다." : "Our little worlds keep growing.")}</p><Link href={`/apps?lang=${locale}`}>{localized(copy?.appsMore, locale, locale === "ko" ? "모든 앱 보기" : "All apps")} ↗</Link></div> : null}
      {limit && products.length > limit ? <Link className="app-collection-more" href={`/apps?lang=${locale}`}>{locale === "ko" ? "나머지 앱 모두 보기" : "See the full collection"} ↗</Link> : null}
      {products.length >= 4 ? (
        <aside className="app-platform-roadmap">
          <span>APPS IN TOSS</span>
          <p>{localized(copy?.platformRoadmap, locale, locale === "ko" ? "일부 기능은 앱인토스 미니앱으로도 찾아갈 예정이에요. 전체 앱과 제공 범위가 다르며, 앱별 기능과 일정은 확정 후 안내합니다." : "Selected features are planned as mini-apps in Toss. Their scope differs from the full apps; supported features and timing will be announced when confirmed.")}</p>
        </aside>
      ) : null}
    </div>
  );
}

function productImage(product: Product) {
  const image = product.homeScreen?.asset
    ? product.homeScreen
    : product.screenshot;
  return image?.asset
    ? urlFor(image).width(1000).height(800).fit("crop").url()
    : product.localImage || "/story/product/product-origin-v1.webp";
}

function resolveClipSource(raw: string): ClipSource | null {
  if (/^\/(?!\/)[a-z0-9/_\-.]+\.mp4$/i.test(raw)) {
    return { kind: "mp4", playbackUrl: raw, directUrl: raw };
  }
  try {
    const url = new URL(raw);
    if (url.protocol !== "https:") return null;
    const host = url.hostname.toLowerCase();
    let youtubeId = "";
    if (host === "youtu.be") youtubeId = url.pathname.slice(1);
    if (
      [
        "youtube.com",
        "www.youtube.com",
        "m.youtube.com",
        "youtube-nocookie.com",
        "www.youtube-nocookie.com",
      ].includes(host)
    ) {
      youtubeId =
        url.pathname === "/watch"
          ? url.searchParams.get("v") || ""
          : url.pathname.match(/^\/(?:shorts|embed|live)\/([^/]+)/)?.[1] || "";
    }
    if (/^[a-z0-9_-]{11}$/i.test(youtubeId)) {
      return {
        kind: "youtube",
        playbackUrl: `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1`,
        directUrl: raw,
      };
    }
    return {
      kind: /\.mp4$/i.test(url.pathname) ? "mp4" : "external",
      playbackUrl: raw,
      directUrl: raw,
    };
  } catch {
    return null;
  }
}

export function ProductShowcase({
  product,
  index,
  locale,
}: {
  product: Product;
  index: number;
  locale: Locale;
}) {
  const [selectedClip, setSelectedClip] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [playbackFailed, setPlaybackFailed] = useState(false);
  const ppuri = isDayByBaby(product);
  const name = productName(product, locale);
  const room = appRoom(product);
  const designed = ppuri || /^\/apps-art\/(memogrip|goodgo|bookbap)-room-v[23]\.webp$/.test(room.hero);
  const detail = product.detail;
  const hero = detail?.heroImage?.asset
    ? urlFor(detail.heroImage).width(2000).url()
    : room.hero;
  const mascot = product.mascotImage?.asset
    ? urlFor(product.mascotImage).width(500).url()
    : ppuri
      ? "/films/ppuri.webp"
      : room.hero;
  const features =
    product.highlights == null
      ? room.features.map((item) => ({
          title: item.title[locale],
          body: item.body[locale],
          image: item.image,
        }))
      : product.highlights.map((item) => ({
          title: localized(item.label, locale),
          body: localized(item.description, locale),
          image: item.image?.asset ? urlFor(item.image).width(800).url() : "",
        }));
  const clips: FilmClip[] = (
    product.videos == null ? (ppuri ? dayByBabyClips : neighborClips(room.hero)) : product.videos
  ).filter((clip) => Boolean(clip.url && resolveClipSource(clip.url)));
  const mainClips = clips.filter((item) => item.aspect !== "portrait");
  const extraClips = clips.filter((item) => item.aspect === "portrait");
  const activeIndex = Math.min(selectedClip, mainClips.length - 1);
  const clip = mainClips[activeIndex];
  const source = clip ? resolveClipSource(clip.url) : null;
  const poster = clip?.poster?.asset
    ? urlFor(clip.poster).width(1280).url()
    : clip?.localPoster || room.hero;
  const play = locale === "ko" ? "영상 재생" : "Play video";
  const open =
    locale === "ko" ? "영상 새 창에서 보기" : "Open video in a new tab";
  const watch = locale === "ko" ? "영상으로 만나보기" : "Watch the story";
  const posterContents = (
    <>
      <Image
        src={poster}
        alt=""
        fill
        sizes="(max-width:760px) 92vw, 850px"
        className="film-player-image"
      />
      {ppuri ? <span className="app-room-poster-name">DayByBaby</span> : null}
      <span className="film-player-play">
        <span aria-hidden="true">▶</span>
        <span className="app-room-sr-only">{play}</span>
      </span>
    </>
  );

  return (
    <article
      className={`app-room-service ${designed ? "app-room-designed" : ""} ${ppuri ? "app-room-ppuri" : "app-room-neighbor"}`}
      aria-labelledby={`film-service-${index}`}
    >
      <section className="app-room-hero">
        <div className="app-room-scene">
          <Image
            src={hero}
            alt={
              ppuri
                ? locale === "ko"
                  ? "아기 logU 푸리가 기다리는 따뜻한 방"
                  : "Ppuri in a warm little nursery"
                : name + " logU"
            }
            fill
            preload
            sizes="100vw"
          />
        </div>
        <div className="app-room-copy">
          <Link className="app-room-breadcrumb" href={`/apps?lang=${locale}`}>
            Apps <span>/</span> {name}
          </Link>
          <div className="app-room-identity">
            {product.appIcon?.asset ? (
              <Image
                src={urlFor(product.appIcon).width(96).height(96).url()}
                alt=""
                width={44}
                height={44}
              />
            ) : ppuri ? (
              <Image
                src="/apps-art/daybybaby-app-icon.png"
                alt=""
                width={44}
                height={44}
              />
            ) : (
              <span className="app-room-mark" aria-hidden="true">
                {designed ? (
                  <svg viewBox="0 0 40 40" width="40" height="40">
                    <path
                      fill="#fff6ed"
                      d="M9 30C5 22 10 7 20 7s15 15 11 23c-2 4-20 4-22 0Z"
                    />
                    <circle cx="15" cy="20" r="2" fill="#263b35" />
                    <circle cx="25" cy="20" r="2" fill="#263b35" />
                    <path
                      d="M18 24q2 2 4 0"
                      fill="none"
                      stroke="#263b35"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                ) : (
                  "•"
                )}
              </span>
            )}
            <span>{name}</span>
          </div>
          <h1 id={`film-service-${index}`}>
            {localized(detail?.headlineI18n, locale, room.headline[locale])}
          </h1>
          <p>{localized(detail?.introI18n, locale, room.intro[locale])}</p>
          <ProductDownloads product={product} locale={locale} />
          {productDownloads(product).length > 0 &&
          productDownloads(product).every((item) => !item.url) ? (
            <p className="app-room-launch-note">
              {locale === "ko"
                ? "출시 후 다운로드 링크가 열립니다."
                : "Download links will open at launch."}
            </p>
          ) : null}
        </div>
      </section>
      <div className="app-room-content">
        {clip && source ? (
          <section
            className="film-video-area app-room-videos"
            aria-label={watch}
          >
            <div className="app-room-video-copy">
              <span className="app-eyebrow">{name.toUpperCase()} VIDEO</span>
              <h2>
                {localized(
                  detail?.videoHeadingI18n,
                  locale,
                  room.videoHeading[locale],
                )}
              </h2>
              <p>
                {localized(
                  detail?.videoBodyI18n,
                  locale,
                  room.videoBody[locale],
                )}
              </p>
              <Image
                src={mascot}
                alt=""
                width={240}
                height={240}
                sizes="(max-width:760px) 100px, 200px"
                className="app-room-video-mascot"
              />
            </div>
            <div className="app-room-video-screen">
              <div className={`film-player${playing ? " is-playing" : ""}`}>
                {source.kind === "external" ? (
                  <a
                    className="film-player-poster"
                    href={source.directUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={open}
                  >
                    {posterContents}
                  </a>
                ) : !playing ? (
                  <button
                    type="button"
                    className="film-player-poster"
                    onClick={() => {
                      setPlaying(true);
                      setPlaybackFailed(false);
                    }}
                    aria-label={
                      localized(clip.titleI18n, locale, watch) + " · " + play
                    }
                  >
                    {posterContents}
                  </button>
                ) : source.kind === "youtube" ? (
                  <iframe
                    key={clip._key}
                    title={localized(clip.titleI18n, locale, name)}
                    src={source.playbackUrl}
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video
                    key={clip._key}
                    controls
                    autoPlay
                    playsInline
                    poster={poster}
                    preload="none"
                    aria-label={localized(clip.titleI18n, locale, watch)}
                    onError={() => setPlaybackFailed(true)}
                  >
                    <source src={source.playbackUrl} type="video/mp4" />
                  </video>
                )}
              </div>
              <div className="film-video-options" aria-label={watch}>
                {mainClips.map((item, clipIndex) => (
                  <button
                    key={item._key}
                    type="button"
                    aria-pressed={clipIndex === activeIndex}
                    className={clipIndex === activeIndex ? "selected" : ""}
                    onClick={() => {
                      setSelectedClip(clipIndex);
                      setPlaying(false);
                      setPlaybackFailed(false);
                    }}
                  >
                    <span>{localized(item.titleI18n, locale, watch)}</span>
                    <small>{item.duration || "16:9"}</small>
                  </button>
                ))}
              </div>
              {playbackFailed ? (
                <p role="alert">
                  {locale === "ko"
                    ? "재생이 어려우면 아래 링크로 영상을 열어주세요."
                    : "If playback fails, open the video using the link below."}
                </p>
              ) : null}
              <div className="app-room-video-tools"><a
                className="film-video-direct"
                href={source.directUrl}
                target="_blank"
                rel="noreferrer"
              >
                {open} ↗
              </a>
              {extraClips.length ? (
                <details className="app-extra-films">
                  <summary>
                    {locale === "ko"
                      ? "짧은 세로 영상도 보기"
                      : "More short videos"}
                  </summary>
                  {extraClips.map((item) => (
                    <a
                      key={item._key}
                      href={resolveClipSource(item.url)!.directUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {localized(item.titleI18n, locale, name)} ·{" "}
                      {item.duration} ↗
                    </a>
                  ))}
                </details>
              ) : null}
              </div>
            </div>
          </section>
        ) : null}
        {features.length ? (
          <section className="app-feature-section app-room-features">
            <span className="app-eyebrow">KEY FEATURES</span>
            <div className="app-room-feature-heading"><h2>
              {localized(
                detail?.featureHeadingI18n,
                locale,
                room.featureHeading[locale],
              )}
            </h2>
            {ppuri || localized(detail?.featureIntroI18n, locale) ? <p>{localized(detail?.featureIntroI18n, locale, locale === "ko" ? "간단한 기록부터 한눈에 보는 하루,\n그리고 함께 남기는 소중한 기억까지." : "From easy entries to a day at a glance,\nand the little memories you keep together.")}</p> : null}</div>
            <div className="app-feature-grid">
              {features.map((feature, featureIndex) => (
                <article key={featureIndex}>
                  {feature.image ? (
                    <div className="app-room-feature-art">
                      <Image
                        src={feature.image}
                        alt=""
                        fill
                        sizes="(max-width:760px) 90vw, 380px"
                      />
                    </div>
                  ) : null}
                  <div className="app-room-feature-text">
                    {designed ? (
                      <span className="app-room-feature-badge">
                        <FeatureGlyph index={featureIndex} app={name.toLowerCase()} />
                      </span>
                    ) : null}
                    <h3>{feature.title}</h3>
                    <p>{feature.body}</p>
                  </div>
                </article>
              ))}
            </div>
            {ppuri || (localized(detail?.essentialTitleI18n, locale) && localized(detail?.essentialBodyI18n, locale)) ? (
              <div className="app-room-emergency">
                <span aria-hidden="true">↗</span>
                <div>
                  <h3>
                    {localized(detail?.essentialTitleI18n, locale, locale === "ko"
                      ? "급할 때도, 가족과 연결되도록."
                      : "Stay connected when it matters.")}
                  </h3>
                  <p>
                    {localized(detail?.essentialBodyI18n, locale, locale === "ko"
                    ? "응급 연락처는 DayByBaby의 필수 기능입니다. 가족에게 전화하고 응급 알림을 보낼 수 있어요. 일상의 기록뿐 아니라, 필요한 순간의 연결까지 함께합니다."
                    : "Emergency contacts are an essential DayByBaby feature. Call family and send an emergency alert, keeping important connections close alongside everyday records.")}
                  </p>
                </div>
              </div>
            ) : null}
            <p className="app-room-art-note">
              {localized(detail?.artNoteI18n, locale, locale === "ko"
                ? "이미지는 서비스 소개를 위한 설명용 그림입니다."
                : "Images are illustrations introducing the service.")}
            </p>
          </section>
        ) : null}
        {product.screenshots?.some((image) => image.asset) ? (
          <section className="app-screenshot-section">
            <h2>{locale === "ko" ? "일상에서는 이렇게." : "A look inside."}</h2>
            <div className="app-screenshots">
              {product.screenshots
                .filter((image) => image.asset)
                .map((image, imageIndex) => (
                  <figure key={image.asset!._ref + imageIndex}>
                    <Image
                      src={urlFor(image).width(600).url()}
                      alt={
                        image.alt ||
                        name +
                          " " +
                          (locale === "ko" ? "앱 화면" : "app screen") +
                          " " +
                          (imageIndex + 1)
                      }
                      width={400}
                      height={800}
                      sizes="(max-width:760px) 60vw, 260px"
                    />
                  </figure>
                ))}
            </div>
          </section>
        ) : null}
        {!designed ? (
          <div className="app-detail-bottom app-room-download">
            <h2>
              {locale === "ko"
                ? "당신의 하루에, " + name + "."
                : name + ", for your everyday."}
            </h2>
            <ProductDownloads product={product} locale={locale} />
          </div>
        ) : null}
      </div>
    </article>
  );
}
