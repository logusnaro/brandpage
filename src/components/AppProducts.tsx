"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { urlFor } from "@/sanity/lib/image";
import type { Locale, LocalizedText, Product, ProductVideo } from "@/sanity/lib/types";
import { productPath, productDownloads, platformName } from "@/lib/productLinks";

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
    localPoster: "/films/daybybaby-intro.webp",
  },
  {
    _key: "ppuri-guide",
    titleI18n: { ko: "기능 가이드", en: "Feature guide" },
    url: "/films/daybybaby-ppuri-guide-35s.mp4",
    aspect: "landscape",
    duration: "0:35",
    localPoster: "/films/daybybaby-guide.webp",
  },
  {
    _key: "ppuri-full",
    titleI18n: { ko: "소개 + 가이드", en: "Introduction + guide" },
    url: "/films/daybybaby-ppuri-intro-guide-90s.mp4",
    aspect: "landscape",
    duration: "1:30",
    localPoster: "/films/daybybaby-full.webp",
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

const dayByBabyHighlights: Array<Partial<LocalizedText>> = [
  { ko: "간편 입력", en: "Quick logging" },
  { ko: "하루를 한눈에", en: "Your day at a glance" },
  { ko: "하루의 기록", en: "Daily memories" },
];

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
  if (isDayByBaby(product)) return "DayByBaby";
  return localized(product.displayNameI18n, locale, product.displayName).replace(/^\[:\]\s*/, "").trim();
}

export function ProductDownloads({ product, locale }: { product: Product; locale: Locale }) {
  const downloads = productDownloads(product);
  return (
    <div className="app-downloads">
      <span className="app-download-label">{locale === "ko" ? "당신의 하루에 함께하세요" : "Make it part of your day"}</span>
      <div className="app-download-buttons">
        {downloads.map((item) => item.url ? (
          <a key={item.platform} href={item.url} target="_blank" rel="noreferrer">
            <small>{platformName(item.platform, locale)}</small>
            <span>{item.platform === "web" ? (locale === "ko" ? "웹에서 시작하기" : "Open web app") : item.platform === "toss" ? (locale === "ko" ? "토스에서 이용하기" : "Open in Toss") : item.label} <span aria-hidden="true">↗</span></span>
            {localized(item.noteI18n, locale) ? <small>{localized(item.noteI18n, locale)}</small> : null}
          </a>
        ) : (
          <span className="app-platform-planned" key={item.platform}>
            {platformName(item.platform, locale)} · {locale === "ko" ? "준비 중" : "Coming soon"}
            {localized(item.noteI18n, locale) ? <small>{localized(item.noteI18n, locale)}</small> : null}
          </span>
        ))}
        {downloads.length === 0 ? (
          <p className="app-download-pending">{locale === "ko" ? "다운로드는 출시 후 이곳에서 안내할게요." : "Download links will be available here at launch."}</p>
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

export function ProductCollectionHeader({ locale, directory = false, description }: { locale: Locale; directory?: boolean; description?: string }) {
  const Heading = directory ? "h1" : "h2";
  return (
    <div className="app-neighborhood-heading">
      <Heading>Apps</Heading>
      <div className="app-neighborhood-intro">
        <h3>{locale === "ko" ? "저마다의 하루, 저마다의 logU." : "Different days. Different logU."}</h3>
        <p>{description || (locale === "ko" ? "작은 순간들이 모여, 더 따뜻한 하루가 됩니다." : "Little moments, together. A warmer everyday life.")}</p>
      </div>
      <Link className="app-neighborhood-all" href={directory ? "#app-collection" : `/apps?lang=${locale}`}>{locale === "ko" ? "모든 앱 보기" : "Explore all apps"} <span aria-hidden="true">↗</span></Link>
    </div>
  );
}

function collectionArt(product: Product) {
  if (product.mascotImage?.asset) return { src: urlFor(product.mascotImage).width(1000).url(), mascot: true };
  if (product.homeScreen?.asset || product.screenshot?.asset) return { src: productImage(product), mascot: false };
  const name = (product.name || "").toLowerCase();
  const slug = isDayByBaby(product) ? "daybybaby" : ({ memo: "memogrip", allinmemo: "memogrip", readygo: "goodgo", innerbrary: "bookbap" } as Record<string, string>)[name] || name;
  return { src: ["daybybaby", "memogrip", "goodgo", "bookbap"].includes(slug) ? `/apps-art/${slug}-v1.webp` : productImage(product), mascot: false };
}

export function ProductCollection({ products, locale, limit, village = false }: { products: Product[]; locale: Locale; limit?: number; village?: boolean }) {
  const shown = limit ? products.slice(0, limit) : products;
  const upcomingCount = products.length >= 4 ? Math.max(0, 6 - products.length) : 0;
  return (
    <div className={`app-collection${village ? " app-neighborhood-collection" : ""}`}>
      {village ? (
        <div className="app-neighborhood-panorama">
          <Image src="/apps-art/village-v1.webp" alt={locale === "ko" ? "저마다의 하루를 함께하는 다양한 logU들의 마을" : "A village of different logU, each sharing a different everyday life"} fill sizes="100vw" />
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
                  <span className="app-card-icon" aria-hidden="true">{product.appIcon?.asset ? <Image src={urlFor(product.appIcon).width(96).height(96).url()} alt="" width={48} height={48} /> : ppuri ? <Image src="/films/ppuri.webp" alt="" width={48} height={48} /> : <span>{name.charAt(0)}</span>}</span>
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
              <Image src="/apps-art/village-v1.webp" alt="" fill sizes="(max-width: 600px) 92vw, (max-width: 1000px) 46vw, 32vw" className={`app-coming-scene app-coming-scene-${index}`} />
              <span className="app-upcoming-index">0{shown.length + index + 1}</span>
            </div>
            <div className="app-card-info">
              <div className="app-card-summary">
                <span className="app-card-icon" aria-hidden="true">+</span>
                <div className="app-card-name"><h3>Coming soon</h3><p>{locale === "ko" ? "또 다른 하루를 함께할 새로운 이웃." : "A new neighbor for another everyday life."}</p></div>
                <span className="app-card-await" aria-hidden="true">···</span>
              </div>
              <p className="app-upcoming-caption">{locale === "ko" ? "새로운 logU를 준비하고 있어요" : "A new logU is on the way"}</p>
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
      {village ? <div className="app-neighborhood-growing"><span aria-hidden="true">✦</span><p>{locale === "ko" ? "작은 세계는 계속 자랍니다." : "Our little worlds keep growing."}</p><Link href={`/apps?lang=${locale}`}>{locale === "ko" ? "모든 앱 보기" : "All apps"} ↗</Link></div> : null}
      {limit && products.length > limit ? <Link className="app-collection-more" href={`/apps?lang=${locale}`}>{locale === "ko" ? "나머지 앱 모두 보기" : "See the full collection"} ↗</Link> : null}
      {products.length >= 4 ? (
        <aside className="app-platform-roadmap">
          <span>APPS IN TOSS</span>
          <p>{locale === "ko" ? "일부 기능은 앱인토스 미니앱으로도 찾아갈 예정이에요. 전체 앱과 제공 범위가 다르며, 앱별 기능과 일정은 확정 후 안내합니다." : "Selected features are planned as mini-apps in Toss. Their scope differs from the full apps; supported features and timing will be announced when confirmed."}</p>
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
  const ppuri = isDayByBaby(product);
  const name = productName(product, locale);
  const mascot = product.mascotImage?.asset
    ? urlFor(product.mascotImage).width(900).url()
    : ppuri
      ? "/films/ppuri.webp"
      : productImage(product);
  const highlights =
    product.highlights == null && ppuri
      ? dayByBabyHighlights
      : (product.highlights || []).map((item) => item.label);
  const features = product.highlights?.length
    ? product.highlights.map((item) => ({ title: localized(item.label, locale), body: localized(item.description, locale) }))
    : product.highlights == null && ppuri
      ? locale === "ko" ? [
          { title: "다시 쓰는 수고를 줄이고", body: "간편 입력으로 반복되는 기록을 빠르게 남겨요. 아이에게 집중할 시간을 더 많이." },
          { title: "흩어진 하루를 모으고", body: "수유와 일상의 기록을 한곳에서 돌아봐요. 바쁜 하루의 흐름도 한눈에." },
          { title: "작은 순간을 간직하고", body: "아이와 함께한 평범한 하루가 사라지지 않도록. 아기 logU 푸리가 함께해요." },
        ] : [
          { title: "Less repetitive typing", body: "Quick logging makes everyday entries easier, leaving more time to focus on your baby." },
          { title: "A day, all together", body: "Look back on feeding and everyday records in one place, and see the shape of a busy day." },
          { title: "Little moments, kept", body: "Ppuri, the baby logU, helps the ordinary days with your child stay with you." },
        ]
      : [];
  const clips: FilmClip[] = (
    product.videos == null && ppuri ? dayByBabyClips : product.videos || []
  ).filter((clip) => Boolean(clip.url && resolveClipSource(clip.url)));
  const mainClips = clips.filter((item) => item.aspect !== "portrait");
  const extraClips = clips.filter((item) => item.aspect === "portrait");
  const clip = mainClips[Math.min(selectedClip, mainClips.length - 1)];
  const source = clip ? resolveClipSource(clip.url) : null;
  const poster = clip?.poster?.asset
    ? urlFor(clip.poster).width(1280).url()
    : clip?.localPoster || productImage(product);
  const copy =
    locale === "ko"
      ? {
          play: "영상 재생",
          open: "영상 새 창에서 보기",
          watch: "영상으로 만나보기",
        }
      : {
          play: "Play video",
          open: "Open video in a new tab",
          watch: "Watch the story",
        };
  const posterContents = clip ? (
    <>
      <Image
        src={poster}
        alt=""
        fill
        sizes={
          clip.aspect === "portrait"
            ? "(max-width: 760px) 80vw, 380px"
            : "(max-width: 760px) 92vw, 980px"
        }
        className="film-player-image"
      />
      <span className="film-player-play">▶ {copy.play}</span>
    </>
  ) : null;

  return (
    <article className="film-service app-detail-service" aria-labelledby={`film-service-${index}`}>
      <div className="film-service-intro">
        <div
          className={`film-service-art ${ppuri || product.mascotImage?.asset ? "has-mascot" : ""}`}
        >
          <span className="film-art-caption">
            logU /{" "}
            {localized(
              product.categoryI18n,
              locale,
              ppuri
                ? locale === "ko"
                  ? "육아 기록"
                  : "Parenting journal"
                : "Service",
            )}
          </span>
          <Image
            src={mascot}
            alt={
              ppuri
                ? locale === "ko"
                  ? "아기 logU 푸리"
                  : "Ppuri, the baby logU"
                : name
            }
            fill
            sizes="(max-width: 760px) 90vw, 42vw"
            className="film-service-image"
          />
          {ppuri ? (
            <span className="film-art-signature">
              {locale === "ko" ? "푸리" : "Ppuri"}
              <small>the DayByBaby logU</small>
            </span>
          ) : null}
        </div>
        <div className="film-service-copy">
          <span className="film-service-number">
            {String(index + 1).padStart(2, "0")} / logUs Studio
          </span>
          {product.appIcon?.asset ? (
            <Image className="app-detail-icon" src={urlFor(product.appIcon).width(144).height(144).url()} alt="" width={64} height={64} />
          ) : null}
          <h1 id={`film-service-${index}`}>{name}</h1>
          <p>
            {localized(product.descriptionI18n, locale, product.description)}
          </p>
          {highlights.length > 0 ? (
            <ul className="film-highlights">
              {highlights.map((item, highlightIndex) => (
                <li
                  key={
                    product.highlights?.[highlightIndex]?._key || highlightIndex
                  }
                >
                  {localized(item, locale)}
                </li>
              ))}
            </ul>
          ) : null}
          <ProductDownloads product={product} locale={locale} />
        </div>
      </div>
      {features.length > 0 ? (
        <section className="app-feature-section">
          <span className="app-eyebrow">LESS EFFORT. MORE LITTLE MOMENTS.</span>
          <h2>{locale === "ko" ? "기록은 가볍게. 하루는 더 가까이." : "Less effort to log. More room to live."}</h2>
          <div className="app-feature-grid">
            {features.map((feature, featureIndex) => (
              <article key={feature.title}>
                <span>0{featureIndex + 1}</span><h3>{feature.title}</h3><p>{feature.body}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}
      {clip && source ? (
        <div className="film-video-area">
          <div className="film-video-topline">
            <h4>{copy.watch}</h4>
            <span>{locale === "ko" ? "앱을 먼저 만나보세요" : "See it in action"}</span>
          </div>
          <div className="film-video-options" aria-label={copy.watch}>
            {mainClips.map((item, clipIndex) => (
              <button
                key={item._key}
                type="button"
                aria-pressed={clipIndex === selectedClip}
                className={clipIndex === selectedClip ? "selected" : ""}
                onClick={() => {
                  setSelectedClip(clipIndex);
                  setPlaying(false);
                }}
              >
                <span>
                  {localized(
                    item.titleI18n,
                    locale,
                    locale === "ko" ? "영상" : "Video",
                  )}
                </span>
                <small>
                  {item.duration ||
                    (item.aspect === "portrait" ? "9:16" : "16:9")}
                </small>
              </button>
            ))}
          </div>
          <div
            className={`film-player ${clip.aspect === "portrait" ? "is-portrait" : ""}`}
          >
            {source.kind === "external" ? (
              <a
                className="film-player-poster"
                href={source.directUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`${localized(clip.titleI18n, locale, copy.watch)} · ${copy.open}`}
              >
                {posterContents}
              </a>
            ) : !playing ? (
              <button
                type="button"
                className="film-player-poster"
                onClick={() => setPlaying(true)}
                aria-label={`${localized(clip.titleI18n, locale, copy.watch)} · ${copy.play}`}
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
                aria-label={localized(clip.titleI18n, locale, copy.watch)}
              >
                <source src={source.playbackUrl} type="video/mp4" />
              </video>
            )}
          </div>
          <a
            className="film-video-direct"
            href={source.directUrl}
            target="_blank"
            rel="noreferrer"
          >
            {copy.open} ↗
          </a>
          {ppuri ? <p className="app-video-note">{locale === "ko" ? "가이드 영상은 개발 중인 화면을 포함합니다. 응급 연락처는 시연 기능이며 출시 버전의 제공 여부는 별도로 안내합니다." : "The guides include work-in-progress screens. Emergency contacts are a demonstration feature; availability in the released app will be confirmed separately."}</p> : null}
        </div>
      ) : null}
      {extraClips.length > 0 ? (
        <details className="app-extra-films">
          <summary>{locale === "ko" ? "짧은 세로 영상도 보기" : "More short videos"}</summary>
          {extraClips.map((item) => (
            <a key={item._key} href={resolveClipSource(item.url)!.directUrl} target="_blank" rel="noreferrer">
              {localized(item.titleI18n, locale, name)} · {item.duration} ↗
            </a>
          ))}
        </details>
      ) : null}
      {product.screenshots?.some((image) => image.asset) ? (
        <section className="app-screenshot-section">
          <h2>{locale === "ko" ? "일상에서는 이렇게." : "A look inside."}</h2>
          <div className="app-screenshots">
            {product.screenshots.filter((image) => image.asset).map((image, imageIndex) => (
              <figure key={image.asset!._ref + imageIndex}>
                <Image src={urlFor(image).width(600).url()} alt={image.alt || `${name} ${locale === "ko" ? "앱 화면" : "app screen"} ${imageIndex + 1}`} width={400} height={800} sizes="(max-width:760px) 60vw, 260px" />
              </figure>
            ))}
          </div>
        </section>
      ) : null}
      <div className="app-detail-bottom"><ProductDownloads product={product} locale={locale} /></div>
    </article>
  );
}
