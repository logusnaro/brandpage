"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { urlFor } from "@/sanity/lib/image";
import type { Locale, LocalizedText, Product, ProductVideo } from "@/sanity/lib/types";
import { productPath, productDownloads, platformName } from "@/lib/productLinks";
import { appRoom } from "@/lib/appDetailContent";

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
  const [playbackFailed, setPlaybackFailed] = useState(false);
  const ppuri = isDayByBaby(product);
  const name = productName(product, locale);
  const room = appRoom(product);
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
    product.videos == null && ppuri ? dayByBabyClips : product.videos || []
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
      <span className="film-player-play">▶ {play}</span>
    </>
  );

  return (
    <article
      className={`app-room-service ${ppuri ? "app-room-ppuri" : "app-room-neighbor"}`}
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
            ) : (
              <span className="app-room-mark" aria-hidden="true">
                {ppuri ? "♡" : "•"}
              </span>
            )}
            <span>{name}</span>
          </div>
          <h1 id={`film-service-${index}`}>
            {localized(detail?.headlineI18n, locale, room.headline[locale])}
          </h1>
          <p>{localized(detail?.introI18n, locale, room.intro[locale])}</p>
          <ProductDownloads product={product} locale={locale} />
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
              <div className="film-player">
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
              <a
                className="film-video-direct"
                href={source.directUrl}
                target="_blank"
                rel="noreferrer"
              >
                {open} ↗
              </a>
              {ppuri ? (
                <p className="app-video-note">
                  {locale === "ko"
                    ? "가이드 영상은 개발 중인 화면을 포함합니다. 응급 연락처는 시연 기능이며 출시 버전의 제공 여부는 별도로 안내합니다."
                    : "The guides include work-in-progress screens. Emergency contacts are a demonstration feature; availability in the released app will be confirmed separately."}
                </p>
              ) : null}
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
          </section>
        ) : null}
        {features.length ? (
          <section className="app-feature-section app-room-features">
            <span className="app-eyebrow">
              {name.toUpperCase()} / LITTLE EXPERIENCES
            </span>
            <h2>
              {localized(
                detail?.featureHeadingI18n,
                locale,
                room.featureHeading[locale],
              )}
            </h2>
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
                  <h3>{feature.title}</h3>
                  <p>{feature.body}</p>
                </article>
              ))}
            </div>
            <p className="app-room-art-note">
              {locale === "ko"
                ? "이미지는 서비스의 분위기를 보여주는 설명용 그림이며, 영상의 앱 화면은 개발 중인 예시입니다."
                : "Illustrations show the service's world. App screens in the videos are work-in-progress examples."}
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
        <div className="app-detail-bottom app-room-download">
          <h2>
            {locale === "ko"
              ? "당신의 하루에, " + name + "."
              : name + ", for your everyday."}
          </h2>
          <ProductDownloads product={product} locale={locale} />
        </div>
      </div>
    </article>
  );
}
