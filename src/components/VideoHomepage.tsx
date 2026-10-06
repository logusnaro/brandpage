"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { ProductCollection, ProductCollectionHeader, localized, brandCase } from "@/components/AppProducts";
import "./app-products.css";
import { homepageImage, introVideoUrl } from "@/lib/homepageMedia";
import type {
  Locale,
  LocalizedText,
  Product,
  SiteSettings,
  SocialLink,
} from "@/sanity/lib/types";

export type HomepageCopy = {
  cinema?: SiteSettings["cinema"];
  homepageMedia?: SiteSettings["homepageMedia"];
  contactForm?: SiteSettings["contactForm"];
  pageLabels: SiteSettings["pageLabels"];
  introSubtitle?: Partial<LocalizedText>;
  productLead?: Partial<LocalizedText>;
  contactTitle?: Partial<LocalizedText>;
  contactBody?: Partial<LocalizedText>;
  copyright?: Partial<LocalizedText>;
};
type Props = {
  copy: HomepageCopy;
  products: Product[];
  socialLinks: SocialLink[];
};

export function VideoHomepage({ copy, products, socialLinks }: Props) {
  const [locale, setLocale] = useState<Locale>("ko");
  const [languageOpen, setLanguageOpen] = useState(false);
  const [heroComplete, setHeroComplete] = useState(false);
  const [heroPaused, setHeroPaused] = useState(false);
  const [heroProgress, setHeroProgress] = useState(0);
  const [heroDuration, setHeroDuration] = useState(15);
  const [activeSection, setActiveSection] = useState("intro");
  const [formSent, setFormSent] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSending, setFormSending] = useState(false);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const contactCopyRef = useRef<HTMLDivElement>(null);
  const questionLineRef = useRef<HTMLSpanElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      const frame = window.requestAnimationFrame(() => setHeroComplete(true));
      return () => window.cancelAnimationFrame(frame);
    }
    void video.play().catch(() => setHeroComplete(true));
  }, []);
  useEffect(() => {
    const sections = ["intro", "studio", "product", "contact"]
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries.find((entry) => entry.isIntersecting);
        if (current) setActiveSection(current.target.id);
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 },
    );
    sections.forEach((section) => section && observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const introSubtitle = brandCase(
    localized(
      copy.cinema?.heroSubtitle,
      locale,
      localized(
        copy.introSubtitle,
        locale,
        locale === "ko"
          ? "당신의 순간을 담고 간직하는 logU들의 이야기."
          : "Stories of logU that hold your moments.",
      ),
    ),
  );
  const contactBody = localized(
    copy.contactBody,
    locale,
    "서비스, 협업 또는 logUs Studio에 관해 함께 나누고 싶은 이야기를 남겨주세요.",
  );
  const contactTitle = localized(
    copy.contactTitle,
    locale,
    "함께 남기고 싶은\n이야기가 있나요?",
  );
  const [contactTitleFirst, ...contactTitleRest] = contactTitle.split("\n");
  const contactTitleLast = contactTitleRest.join("\n");
  const defaultFormCopy =
    locale === "ko"
      ? {
          eyebrow: "Talk with us",
          inquiry: "문의 유형을 선택하세요",
          product: "서비스 문의",
          collaboration: "협업 문의",
          other: "기타",
          name: "이름 또는 닉네임",
          email: "답변받을 이메일",
          message: "문의 내용을 입력하세요",
          consent: "개인정보 수집 및 이용에 동의합니다.",
          submit: "메시지 보내기",
          sent: "메시지가 담겼습니다.",
          sentBody: "문의 내용을 확인한 뒤 답변드리겠습니다.",
        }
      : {
          eyebrow: "Talk with us",
          inquiry: "Choose an inquiry type",
          product: "Service inquiry",
          collaboration: "Collaboration inquiry",
          other: "Other",
          name: "Name or nickname",
          email: "Reply-to email",
          message: "Write your message",
          consent: "I agree to the collection and use of personal information.",
          submit: "Send message",
          sent: "Your message is in.",
          sentBody: "We will get back to you after reviewing it.",
        };
  const formCopy = Object.fromEntries(
    Object.entries(defaultFormCopy).map(([key, value]) => [key,
      localized(copy.contactForm?.[key as keyof typeof defaultFormCopy], locale, value)]),
  ) as typeof defaultFormCopy;
  const media = copy.homepageMedia;
  const heroPoster = homepageImage(media?.heroPoster, "/films/logus-village.webp");
  const heroVideo = introVideoUrl(media?.heroVideoUrl, "/films/logus-intro-cinema-15s.mp4");
  const heroMobileVideo = introVideoUrl(media?.heroMobileVideoUrl,
    media?.heroVideoUrl ? heroVideo : "/films/logus-intro-cinema-mobile-15s.mp4");
  const defaultUi =
    locale === "ko"
      ? {
          skip: "건너뛰기",
          replay: "다시 보기",
          pause: "일시정지",
          play: "계속 보기",
          explore: "우리의 세계 만나보기",
          film: "작은 순간들이 살아가는 곳",
          empty: "새 서비스를 준비하고 있습니다.",
          studio: "Studio",
          apps: "Apps",
          contact: "Contact",
          storyTitle: "흘러가는 순간에,\n머물 곳을 만듭니다.",
          storyBody:
            "어떤 하루는 너무 빨리 지나갑니다.\nlogU는 그 순간을 담고 간직하는 기억의 조약돌.\n우리는 다양한 logU와 함께, 당신의 일상에 오래 남을 앱을 만듭니다.",
          moments: ["자라는 순간", "함께하는 순간", "돌아보는 순간"],
          worlds: "저마다의 하루. 저마다의 logU.",
          worldBody:
            "같은 기억은 없으니까. 다양한 삶의 곁에, 서로 다른 logU가 있습니다.",
          selected: "우리 곁의 앱",
          productIntro: "일상에 스며드는\n작은 세계들.",
          bottom: "오늘의 작은 순간이,\n내일의 이야기가 되도록.",
        }
      : {
          skip: "Skip",
          replay: "Replay",
          pause: "Pause",
          play: "Continue",
          explore: "Explore our world",
          film: "A home for little moments",
          empty: "New services are on their way.",
          studio: "Studio",
          apps: "Apps",
          contact: "Contact",
          storyTitle: "A place for moments\nto stay.",
          storyBody:
            "Some days pass too quickly.\nlogU is a memory pebble that holds those moments.\nTogether, we create apps that find a lasting place in your everyday life.",
          moments: ["Growing together", "Being together", "Looking back"],
          worlds: "Different days. Different logU.",
          worldBody:
            "No two memories are the same. Different logU live alongside different lives.",
          selected: "Apps beside you",
          productIntro: "Little worlds.\nEveryday life.",
          bottom: "Little moments today.\nStories for tomorrow.",
        };

  const ui = {
    ...defaultUi,
    film: localized(copy.cinema?.filmLabel, locale, defaultUi.film),
    studio: localized(copy.cinema?.studioNav, locale, defaultUi.studio),
    apps: localized(copy.cinema?.appsNav, locale, defaultUi.apps),
    storyTitle: localized(
      copy.cinema?.storyTitle,
      locale,
      defaultUi.storyTitle,
    ),
    storyBody: localized(copy.cinema?.storyBody, locale, defaultUi.storyBody),
    worlds: localized(copy.cinema?.worldsTitle, locale, defaultUi.worlds),
    worldBody: localized(copy.cinema?.worldsBody, locale, defaultUi.worldBody),
    moments: [
      localized(copy.cinema?.growingCaption, locale, defaultUi.moments[0]),
      localized(copy.cinema?.togetherCaption, locale, defaultUi.moments[1]),
      localized(copy.cinema?.lookingBackCaption, locale, defaultUi.moments[2]),
    ],
  };

  useEffect(() => {
    const fitContactForm = () => {
      const form = formRef.current;
      const line = questionLineRef.current;
      const copy = contactCopyRef.current;
      if (!form || !line || !copy) return;
      if (window.innerWidth <= 800) {
        form.style.width = "100%";
        return;
      }
      form.style.width = `${Math.min(copy.clientWidth, line.getBoundingClientRect().width + 96)}px`;
    };
    fitContactForm();
    window.addEventListener("resize", fitContactForm);
    return () => window.removeEventListener("resize", fitContactForm);
  }, [locale, contactTitle]);

  async function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormSending(true);
    setFormError("");
    const formData = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inquiryType: formData.get("inquiryType"),
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
          website: formData.get("website"),
          locale,
        }),
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.error || "문의 전송에 실패했습니다.");
      setFormSent(true);
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : "문의 전송에 실패했습니다.",
      );
    } finally {
      setFormSending(false);
    }
  }

  function replayFilm() {
    const video = heroVideoRef.current;
    if (!video) return;
    video.currentTime = 0;
    setHeroComplete(false);
    setHeroPaused(false);
    setHeroProgress(0);
    void video.play().catch(() => setHeroComplete(true));
  }

  return (
    <div className="film-home cinema-site">
      <header
        className={`cinema-header ${activeSection === "intro" && !heroComplete ? "on-film" : ""}`}
      >
        <a href="#intro" className="cinema-wordmark">
          logUs Studio
        </a>
        <nav
          className="cinema-nav"
          aria-label={locale === "ko" ? "페이지 이동" : "Page navigation"}
        >
          {[
            { id: "studio", label: ui.studio },
            { id: "product", label: ui.apps },
            { id: "contact", label: ui.contact },
          ].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={activeSection === item.id ? "location" : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div
          className="studio-language"
          onKeyDown={(event) => {
            if (event.key === "Escape") setLanguageOpen(false);
          }}
        >
          <button
            type="button"
            className="studio-language-trigger"
            aria-expanded={languageOpen}
            aria-controls="film-language-options"
            onClick={() => setLanguageOpen((open) => !open)}
          >
            Language⌄
          </button>
          {languageOpen ? (
            <div id="film-language-options" className="studio-language-popover">
              <button
                type="button"
                onClick={() => {
                  setLocale("ko");
                  setLanguageOpen(false);
                }}
                className={locale === "ko" ? "active" : ""}
              >
                ● 한국어
              </button>
              <button
                type="button"
                onClick={() => {
                  setLocale("en");
                  setLanguageOpen(false);
                }}
                className={locale === "en" ? "active" : ""}
              >
                ○ English
              </button>
            </div>
          ) : null}
        </div>
      </header>

      <main>
        <section
          id="intro"
          className={`film-hero ${heroComplete ? "has-finale" : ""}`}
        >
          <h1 className="sr-only">logUs Studio</h1>
          <Image
            src={heroPoster}
            alt=""
            fill
            priority
            sizes="100vw"
            className="film-hero-poster"
          />
          <video
            ref={heroVideoRef}
            className="film-hero-video"
            autoPlay
            muted
            playsInline
            preload="metadata"
            poster={heroPoster}
            onLoadedMetadata={(event) => {
              const duration = event.currentTarget.duration;
              if (Number.isFinite(duration) && duration > 0) setHeroDuration(duration);
            }}
            onTimeUpdate={(event) => {
              const video = event.currentTarget;
              const duration = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : 15;
              setHeroProgress(Math.min(1, video.currentTime / duration));
              const configured = media?.heroRevealAt;
              const revealAt = typeof configured === "number" && Number.isFinite(configured)
                ? Math.max(0, Math.min(configured, duration - 0.1)) : Math.max(0, duration - 3.2);
              if (video.currentTime >= revealAt) setHeroComplete(true);
            }}
            onEnded={() => setHeroComplete(true)}
            onError={() => setHeroComplete(true)}
            aria-hidden="true"
          >
            <source
              media="(max-width: 760px)"
              src={heroMobileVideo}
              type="video/mp4"
            />
            <source src={heroVideo} type="video/mp4" />
          </video>
          <div className="film-hero-shade" />
          <p className="film-hero-label">
            <span>01 / THE logUs WORLD</span>
            {ui.film}
          </p>
          <div
            className={`film-hero-finale ${heroComplete ? "is-visible" : ""}`}
          >
            <p className="film-finale-eyebrow">WE LOG U.</p>
            <h2>
              <span>logUs</span> <span>Studio</span>
            </h2>
            <p>{introSubtitle}</p>
            <a href="#studio" className="film-hero-explore">
              {ui.explore} <span aria-hidden="true">↘</span>
            </a>
          </div>
          <div className="film-controls">
            <span className="film-time">
              {formatFilmTime(heroProgress * heroDuration)} / {formatFilmTime(heroDuration)}
            </span>
            {heroComplete ? (
              <button type="button" onClick={replayFilm}>
                {ui.replay} ↺
              </button>
            ) : (
              <>
                <button
                  type="button"
                  aria-label={heroPaused ? ui.play : ui.pause}
                  onClick={() => {
                    const v = heroVideoRef.current;
                    if (!v) return;
                    if (v.paused) {
                      void v
                        .play()
                        .then(() => setHeroPaused(false))
                        .catch(() => setHeroComplete(true));
                    } else {
                      v.pause();
                      setHeroPaused(true);
                    }
                  }}
                >
                  {heroPaused ? "▶" : "Ⅱ"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    heroVideoRef.current?.pause();
                    setHeroComplete(true);
                    setHeroProgress(1);
                  }}
                >
                  {ui.skip} ↗
                </button>
              </>
            )}
          </div>
          <div className="film-timeline">
            <span style={{ transform: `scaleX(${heroProgress})` }} />
          </div>
        </section>

        <section id="studio" className="cinema-story">
          <div className="cinema-section-label">
            <span>02 / OUR REASON</span>
            <span>WE LOG U.</span>
          </div>
          <div className="cinema-story-grid">
            <h2>{ui.storyTitle}</h2>
            <div>
              <p>{ui.storyBody}</p>
              <a href="#product">
                {ui.apps} <span aria-hidden="true">↘</span>
              </a>
            </div>
          </div>
          <div className="cinema-moments">
            {[
              {
                image: homepageImage(media?.growingImage, "/story/life/life-02-kindergarten-v1.webp"),
                ratio: "wide",
              },
              { image: homepageImage(media?.togetherImage, "/story/life/life-07-family-v1.webp"), ratio: "tall" },
              { image: homepageImage(media?.lookingBackImage, "/story/life/life-08-later-v1.webp"), ratio: "wide" },
            ].map((moment, index) => (
              <figure key={index} className={moment.ratio}>
                <div>
                  <Image
                    src={moment.image}
                    alt={ui.moments[index]}
                    fill
                    sizes="(max-width:760px) 80vw, 33vw"
                  />
                </div>
                <figcaption>
                  <span>0{index + 1}</span>
                  {ui.moments[index]}
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="cinema-world-note">
            <h3>{ui.worlds}</h3>
            <p>{ui.worldBody}</p>
          </div>
        </section>

        <section id="product" className="film-products app-neighborhood-section">
          <div className="film-products-content">
            <ProductCollectionHeader locale={locale} copy={copy.cinema} />
            {products.length > 0 ? (
              <ProductCollection products={products} locale={locale} limit={6} village copy={copy.cinema} villageImage={media?.villageImage} />
            ) : (
              <p className="film-products-empty">{ui.empty}</p>
            )}
          </div>
        </section>

        <section id="contact" className="studio-contact">
          <div className="cinema-section-label">
            <span>04 / LET’S TALK</span>
            <span>logUs Studio</span>
          </div>
          <div className="studio-contact-head">
            <h2>
              {localized(copy.pageLabels.contact, locale, "Contact")}
              <span>↘</span>
            </h2>
          </div>
          <div className="studio-contact-body">
            <div className="studio-contact-image">
              <Image
                src={homepageImage(media?.contactImage, "/apps-art/contact-studio-v2.webp")}
                alt={
                  locale === "ko"
                    ? "작은 스튜디오에서 함께 이야기를 나누는 서로 다른 logU들"
                    : "Different logU friends sharing stories around a studio table"
                }
                fill
                sizes="(max-width: 800px) 92vw, 43vw"
                className="studio-cover"
              />
            </div>
            <div className="studio-contact-copy" ref={contactCopyRef}>
              <p className="studio-contact-label">{formCopy.eyebrow}</p>
              <h3>
                {contactTitleLast ? (
                  <>
                    {contactTitleFirst}
                    <br />
                    <span
                      className="studio-question-line"
                      ref={questionLineRef}
                    >
                      {contactTitleLast}
                    </span>
                  </>
                ) : (
                  <span className="studio-question-line" ref={questionLineRef}>
                    {contactTitleFirst}
                  </span>
                )}
              </h3>
              <p className="studio-contact-body-copy">{contactBody}</p>
              {!formSent ? (
                <form
                  ref={formRef}
                  className="studio-contact-form"
                  onSubmit={submitContact}
                >
                  <select
                    name="inquiryType"
                    aria-label={formCopy.inquiry}
                    required
                    defaultValue=""
                  >
                    <option value="" disabled>
                      {formCopy.inquiry}
                    </option>
                    <option>{formCopy.product}</option>
                    <option>{formCopy.collaboration}</option>
                    <option>{formCopy.other}</option>
                  </select>
                  <input name="name" required placeholder={formCopy.name} />
                  <input
                    name="email"
                    required
                    type="email"
                    placeholder={formCopy.email}
                  />
                  <textarea
                    name="message"
                    required
                    placeholder={formCopy.message}
                  />
                  <input
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="studio-honeypot"
                  />
                  <label>
                    <input required type="checkbox" /> {formCopy.consent}
                  </label>
                  <button
                    className="studio-submit"
                    type="submit"
                    disabled={formSending}
                  >
                    {formSending ? "…" : formCopy.submit}
                  </button>
                  {formError ? <p role="alert">{formError}</p> : null}
                </form>
              ) : null}
              {formSent ? (
                <div className="studio-sent">
                  <h4>{formCopy.sent}</h4>
                  <p>{formCopy.sentBody}</p>
                </div>
              ) : null}
            </div>
          </div>
          <footer className="studio-footer">
            <div>
              {localized(
                copy.copyright,
                locale,
                "© 2026 logUs Studio. All rights reserved.",
              )}
            </div>
            <div>
              {localized(copy.cinema?.footerLegal, locale, locale === "ko"
                ? "이용약관 · 개인정보처리방침"
                : "Terms · Privacy")}
              {" · "}<a href="/analytics-info">{locale === "ko" ? "방문 통계 안내" : "Visit analytics"}</a>
            </div>
            <div>
              {localized(copy.cinema?.footerBusiness, locale, locale === "ko" ? "사업자정보 확인" : "Business information")}
            </div>
            <div className="studio-footer-social">
              {socialLinks.map((link) => (
                <a
                  key={link._id}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {link.label || link.platform}
                </a>
              ))}
            </div>
          </footer>
        </section>
      </main>
    </div>
  );
}

function formatFilmTime(seconds: number) {
  const whole = Math.max(0, Math.floor(seconds));
  return `${String(Math.floor(whole / 60)).padStart(2, "0")}:${String(whole % 60).padStart(2, "0")}`;
}
