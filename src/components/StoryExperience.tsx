"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { urlFor } from "@/sanity/lib/image";
import type {
  DailyScene,
  LifeStage,
  Locale,
  LocalizedText,
  Product,
  SiteSettings,
  SocialLink,
} from "@/sanity/lib/types";

type StoryExperienceProps = {
  settings: SiteSettings;
  products: Product[];
  socialLinks: SocialLink[];
};

const mascot = "/mascot/logi-4-web-v2.png";

const dailyArtwork: Record<DailyScene["visual"], string> = {
  wake: "/story/daily/daily-01-wake-v1.webp",
  meal: "/story/daily/daily-02-meal-v1.webp",
  commute: "/story/daily/daily-03-commute-v1.webp",
  work: "/story/daily/daily-04-work-v1.webp",
  lunch: "/story/daily/daily-05-lunch-v1.webp",
  home: "/story/daily/daily-06-home-v1.webp",
  family: "/story/daily/daily-07-family-v1.webp",
  night: "/story/daily/daily-08-night-v1.webp",
};

const lifeArtwork: Record<LifeStage["visual"], string> = {
  baby: "/story/life/life-01-baby-v1.webp",
  kindergarten: "/story/life/life-02-kindergarten-v1.webp",
  school: "/story/life/life-03-school-v1.webp",
  teen: "/story/life/life-04-teen-v1.webp",
  university: "/story/life/life-05-university-v1.webp",
  work: "/story/life/life-06-work-v1.webp",
  family: "/story/life/life-07-family-v1.webp",
  later: "/story/life/life-08-later-v1.webp",
};

function t(value: LocalizedText, locale: Locale) {
  return value[locale];
}

function productText(
  product: Product,
  field: "displayNameI18n" | "descriptionI18n" | "categoryI18n",
  locale: Locale,
) {
  const localized = product[field]?.[locale]?.trim();
  if (localized) return localized;
  if (field === "displayNameI18n") return product.displayName;
  if (field === "descriptionI18n") return product.description;
  return "";
}

function SceneArt({ visual, life = false }: { visual: DailyScene["visual"] | LifeStage["visual"]; life?: boolean }) {
  const artwork = life
    ? lifeArtwork[visual as LifeStage["visual"]]
    : dailyArtwork[visual as DailyScene["visual"]];

  return (
    <div className={`moment-art moment-art-${visual} ${life ? "moment-art-life" : ""}`} aria-hidden="true">
      <Image src={artwork} alt="" fill sizes={life ? "(max-width: 720px) 82vw, 42vw" : "(max-width: 720px) 92vw, 58vw"} />
      <span className="moment-art-shade" />
    </div>
  );
}

function Logi({ className = "", priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Image
      className={className}
      src={mascot}
      alt="logi"
      width={1374}
      height={1145}
      priority={priority}
      sizes="(max-width: 720px) 56vw, 38vw"
    />
  );
}

export function StoryExperience({ settings, products, socialLinks }: StoryExperienceProps) {
  const [locale, setLocale] = useState<Locale>("ko");
  const lifeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    document.documentElement.classList.add("story-motion-ready");
    const revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        }
      },
      { threshold: 0.14, rootMargin: "0px 0px -8%" },
    );

    const activeObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.target.classList.toggle("is-active", entry.isIntersecting);
        }
      },
      { threshold: 0.52, rootMargin: "-18% 0px -18%" },
    );

    const revealItems = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const activeItems = document.querySelectorAll<HTMLElement>("[data-life-card]");
    revealItems.forEach((item) => revealObserver.observe(item));
    activeItems.forEach((item) => activeObserver.observe(item));

    let frame = 0;
    const updateLifeProgress = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const section = lifeRef.current;
        if (!section) return;
        const rect = section.getBoundingClientRect();
        const distance = Math.max(rect.height - window.innerHeight, 1);
        const progress = Math.min(1, Math.max(0, -rect.top / distance));
        section.style.setProperty("--life-progress", progress.toFixed(3));
      });
    };

    updateLifeProgress();
    window.addEventListener("scroll", updateLifeProgress, { passive: true });
    window.addEventListener("resize", updateLifeProgress);

    return () => {
      document.documentElement.classList.remove("story-motion-ready");
      revealObserver.disconnect();
      activeObserver.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateLifeProgress);
      window.removeEventListener("resize", updateLifeProgress);
    };
  }, []);

  return (
    <div className={`logus-story lang-${locale}`}>
      <header className="story-header">
        <a className="story-wordmark" href="#daily" aria-label="logUs Studio">
          logUs Studio<span>:</span>
        </a>
        <nav className="story-header-nav" aria-label={locale === "ko" ? "주요 메뉴" : "Primary navigation"}>
          <a href="#daily">{t(settings.navigation.daily, locale)}</a>
          <a href="#products">{t(settings.navigation.products, locale)}</a>
          <a href="#life">{t(settings.navigation.life, locale)}</a>
        </nav>
        <div className="language-switch" aria-label={locale === "ko" ? "언어 선택" : "Language selection"}>
          <button type="button" className={locale === "ko" ? "is-selected" : ""} onClick={() => setLocale("ko")} aria-pressed={locale === "ko"}>
            {settings.language.korean}
          </button>
          <span aria-hidden="true">/</span>
          <button type="button" className={locale === "en" ? "is-selected" : ""} onClick={() => setLocale("en")} aria-pressed={locale === "en"}>
            {settings.language.english}
          </button>
        </div>
      </header>

      <main>
        <section id="daily" className="hero-chapter">
          <div className="hero-copy" data-reveal>
            <p className="chapter-label">{t(settings.daily.eyebrow, locale)}</p>
            <h1>{t(settings.daily.title, locale)}</h1>
            <p className="hero-body">{t(settings.daily.body, locale)}</p>
            <a className="story-cta" href="#ordinary-day">
              {t(settings.daily.cta, locale)} <span aria-hidden="true">↓</span>
            </a>
          </div>

          <div className="hero-world" aria-hidden="true" data-reveal>
            <Image
              className="hero-world-image"
              src={dailyArtwork.wake}
              alt=""
              fill
              priority
              sizes="(max-width: 960px) 92vw, 47vw"
            />
            <span className="hero-world-shade" />
            <span className="hero-orbit hero-orbit-one">i</span>
            <span className="hero-orbit hero-orbit-two">i</span>
            <span className="hero-orbit hero-orbit-three">i</span>
          </div>
        </section>

        <section id="ordinary-day" className="daily-journey">
          <div className="daily-heading" data-reveal>
            <p className="chapter-label chapter-label-light">{t(settings.daily.journeyLabel, locale)}</p>
            <div className="day-clock" aria-hidden="true"><span>07:10</span><i /><span>22:20</span></div>
          </div>

          <div className="daily-story-grid">
            <aside className="daily-logi-keeper" aria-hidden="true">
              <div className="daily-logi-sticky">
                <span className="daily-collected-label">i · i · i · i</span>
                <Logi />
                <span className="daily-pocket"><i /><i /><i /></span>
              </div>
            </aside>

            <div className="daily-scenes">
              {settings.daily.scenes.map((scene, index) => (
                <article className="daily-scene" key={scene._key} data-reveal>
                  <div className="scene-index"><span>{String(index + 1).padStart(2, "0")}</span><i /></div>
                  <SceneArt visual={scene.visual} />
                  <div className="scene-copy">
                    <time>{scene.time}</time>
                    <h2>{t(scene.title, locale)}</h2>
                    <p>{t(scene.copy, locale)}</p>
                  </div>
                  <span className="scene-fragment" aria-hidden="true">i</span>
                </article>
              ))}
            </div>
          </div>

          <div className="daily-closing" data-reveal>
            <div className="little-equation" aria-hidden="true">
              <span>i</span><span>i</span><span>i</span><b>→</b><strong>us</strong><b>→</b><em>story</em>
            </div>
            <h2>{t(settings.daily.closingTitle, locale)}</h2>
            <p>{t(settings.daily.closingBody, locale)}</p>
          </div>
        </section>

        <section id="products" className="products-chapter">
          <div className="products-heading" data-reveal>
            <p className="chapter-label">{t(settings.products.eyebrow, locale)}</p>
            <h2>{t(settings.products.title, locale)}</h2>
            <p>{t(settings.products.body, locale)}</p>
          </div>

          <div className="product-origin" data-reveal>
            <Image
              className="origin-image"
              src="/story/product/product-origin-v1.webp"
              alt=""
              fill
              sizes="(max-width: 960px) 92vw, 86vw"
            />
            <span className="origin-shade" aria-hidden="true" />
            <div className="origin-copy">
              <h3>{t(settings.products.transitionTitle, locale)}</h3>
              <p>{t(settings.products.transitionBody, locale)}</p>
            </div>
          </div>

          {products.length ? (
            <div className="product-world">
              {products.map((product, index) => {
                const target = product.appStoreUrl || product.webUrl;
                const image = product.homeScreen || product.screenshot;
                const content = (
                  <>
                    <div className="product-world-art" aria-hidden="true">
                      <span className="product-halo" />
                      <Logi />
                      {image ? (
                        <span className="product-screen">
                          <Image
                            src={urlFor(image).width(300).height(600).fit("crop").url()}
                            alt=""
                            fill
                            sizes="180px"
                          />
                        </span>
                      ) : null}
                    </div>
                    <div className="product-world-copy">
                      <span className="product-order">{String(index + 1).padStart(2, "0")}</span>
                      {productText(product, "categoryI18n", locale) ? <p>{productText(product, "categoryI18n", locale)}</p> : null}
                      <h3>{productText(product, "displayNameI18n", locale)}</h3>
                      <div>{productText(product, "descriptionI18n", locale)}</div>
                      <span className="product-link-label">
                        {t(target ? settings.products.visitProduct : settings.products.comingSoon, locale)}
                        {target ? " ↗" : ""}
                      </span>
                    </div>
                  </>
                );

                return target ? (
                  <a className="product-world-item" href={target} target="_blank" rel="noreferrer" key={product._id} data-reveal>
                    {content}
                  </a>
                ) : (
                  <article className="product-world-item" key={product._id} data-reveal>{content}</article>
                );
              })}
            </div>
          ) : null}
        </section>

        <section id="life" className="life-chapter" ref={lifeRef}>
          <div className="life-heading" data-reveal>
            <p className="chapter-label">{t(settings.life.eyebrow, locale)}</p>
            <h2>{t(settings.life.title, locale)}</h2>
            <p>{t(settings.life.body, locale)}</p>
          </div>

          <div className="life-road">
            <div className="life-center" aria-hidden="true">
              <span className="life-line"><i /></span>
              <div className="life-logi">
                <Logi />
                <span className="life-logi-count">i · i · i</span>
              </div>
            </div>

            <div className="life-cards">
              {settings.life.stages.map((stage, index) => (
                <article className={`life-card ${index % 2 ? "life-card-right" : "life-card-left"}`} key={stage._key} data-reveal data-life-card>
                  <span className="life-card-fragment" aria-hidden="true">i</span>
                  <SceneArt visual={stage.visual} life />
                  <div className="life-card-copy">
                    <span>{String(index + 1).padStart(2, "0")} · {t(stage.age, locale)}</span>
                    <h3>{t(stage.title, locale)}</h3>
                    <p>{t(stage.copy, locale)}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="life-closing" data-reveal>
            <div className="life-collage" aria-hidden="true">
              {settings.life.stages.map((stage) => <SceneArt key={stage._key} visual={stage.visual} life />)}
              <span className="collage-thread" />
            </div>
            <div className="life-closing-copy">
              <h2>{t(settings.life.closingTitle, locale)}</h2>
              <p>{t(settings.life.closingBody, locale)}</p>
            </div>
          </div>
        </section>

        <section className="contact-credits">
          <div className="credits-symbol" aria-hidden="true">[:]</div>
          <div className="credits-copy" data-reveal>
            <p className="chapter-label chapter-label-light">{t(settings.contact.eyebrow, locale)}</p>
            <h2>{t(settings.contact.title, locale)}</h2>
            <p>{t(settings.contact.body, locale)}</p>
            <a className="credits-email" href={`mailto:${settings.contact.email}`}>{settings.contact.email}</a>
          </div>
          <footer className="credits-footer">
            <p>{t(settings.contact.location, locale)}</p>
            <div>
              {socialLinks.map((link) => (
                <a key={link._id} href={link.url} target="_blank" rel="noreferrer">{link.label || link.platform}</a>
              ))}
            </div>
            <p>{t(settings.contact.copyright, locale)}</p>
          </footer>
        </section>
      </main>
    </div>
  );
}
