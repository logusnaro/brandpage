"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { urlFor } from "@/sanity/lib/image";
import type { Locale, LocalizedText, Product, ProductVideo, SiteSettings, SocialLink } from "@/sanity/lib/types";

export type HomepageCopy = {
  pageLabels: SiteSettings["pageLabels"];
  introSubtitle?: Partial<LocalizedText>;
  productLead?: Partial<LocalizedText>;
  contactTitle?: Partial<LocalizedText>;
  contactBody?: Partial<LocalizedText>;
  copyright?: Partial<LocalizedText>;
};
type Props = { copy: HomepageCopy; products: Product[]; socialLinks: SocialLink[] };
type FilmClip = ProductVideo & { localPoster?: string };
type ClipSource = { kind: "mp4" | "youtube" | "external"; playbackUrl: string; directUrl: string };

const dayByBabyClips: FilmClip[] = [
  { _key: "ppuri-intro", titleI18n: { ko: "짧은 소개", en: "Short introduction" }, url: "/films/daybybaby-ppuri-intro-20s.mp4", aspect: "landscape", duration: "0:20", localPoster: "/films/daybybaby-intro.webp" },
  { _key: "ppuri-guide", titleI18n: { ko: "기능 가이드", en: "Feature guide" }, url: "/films/daybybaby-ppuri-guide-35s.mp4", aspect: "landscape", duration: "0:35", localPoster: "/films/daybybaby-guide.webp" },
  { _key: "ppuri-full", titleI18n: { ko: "소개 + 가이드", en: "Introduction + guide" }, url: "/films/daybybaby-ppuri-intro-guide-90s.mp4", aspect: "landscape", duration: "1:30", localPoster: "/films/daybybaby-full.webp" },
  { _key: "ppuri-vertical-intro", titleI18n: { ko: "세로 소개", en: "Vertical introduction" }, url: "/films/daybybaby-ppuri-vertical-intro-20s.mp4", aspect: "portrait", duration: "0:20", localPoster: "/films/daybybaby-vertical-intro.webp" },
  { _key: "ppuri-vertical-guide", titleI18n: { ko: "세로 가이드", en: "Vertical guide" }, url: "/films/daybybaby-ppuri-vertical-guide-35s.mp4", aspect: "portrait", duration: "0:35", localPoster: "/films/daybybaby-vertical-guide.webp" },
];

const dayByBabyHighlights: Array<Partial<LocalizedText>> = [
  { ko: "간편 입력", en: "Quick logging" },
  { ko: "응급 연락처", en: "Emergency contacts" },
  { ko: "하루의 기록", en: "Daily memories" },
];

function localized(value: Partial<LocalizedText> | undefined, locale: Locale, fallback = "") {
  return value?.[locale]?.trim() || fallback;
}

function brandCase(value: string) {
  return value.replace(/\blogu\b/gi, "logU");
}

function isDayByBaby(product: Product) {
  return /^(bebe|daybybaby)$/i.test(product.name || "") ||
    /^(?:\[:\]\s*|logUs:\s*)?(bebe|daybybaby)$/i.test(product.displayName.trim());
}

function productName(product: Product) {
  if (isDayByBaby(product)) return "DayByBaby";
  return product.displayName.replace(/^\[:\]\s*/, "").trim();
}

function productImage(product: Product) {
  const image = product.homeScreen?.asset ? product.homeScreen : product.screenshot;
  return image?.asset
    ? urlFor(image).width(1000).height(800).fit("crop").url()
    : "/story/product/product-origin-v1.webp";
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
    if (["youtube.com", "www.youtube.com", "m.youtube.com", "youtube-nocookie.com", "www.youtube-nocookie.com"].includes(host)) {
      youtubeId = url.pathname === "/watch" ? url.searchParams.get("v") || "" : url.pathname.match(/^\/(?:shorts|embed|live)\/([^/]+)/)?.[1] || "";
    }
    if (/^[a-z0-9_-]{11}$/i.test(youtubeId)) {
      return { kind: "youtube", playbackUrl: `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1`, directUrl: raw };
    }
    return { kind: /\.mp4$/i.test(url.pathname) ? "mp4" : "external", playbackUrl: raw, directUrl: raw };
  } catch {
    return null;
  }
}

function ProductShowcase({ product, index, locale }: { product: Product; index: number; locale: Locale }) {
  const [selectedClip, setSelectedClip] = useState(0);
  const [playing, setPlaying] = useState(false);
  const ppuri = isDayByBaby(product);
  const name = productName(product);
  const mascot = product.mascotImage?.asset
    ? urlFor(product.mascotImage).width(900).url()
    : ppuri ? "/films/ppuri.webp" : productImage(product);
  const highlights = product.highlights == null && ppuri
    ? dayByBabyHighlights
    : (product.highlights || []).map((item) => item.label);
  const clips: FilmClip[] = (product.videos == null && ppuri ? dayByBabyClips : product.videos || [])
    .filter((clip) => Boolean(clip.url && resolveClipSource(clip.url)));
  const clip = clips[Math.min(selectedClip, clips.length - 1)];
  const source = clip ? resolveClipSource(clip.url) : null;
  const poster = clip?.poster?.asset
    ? urlFor(clip.poster).width(1280).url()
    : clip?.localPoster || productImage(product);
  const copy = locale === "ko"
    ? { play: "영상 재생", open: "영상 새 창에서 보기", watch: "영상으로 만나보기", visit: "서비스 보기", soon: "곧 만나요" }
    : { play: "Play video", open: "Open video in a new tab", watch: "Watch the story", visit: "Visit service", soon: "Coming soon" };
  const posterContents = clip ? <>
    <Image src={poster} alt="" fill sizes={clip.aspect === "portrait" ? "(max-width: 760px) 80vw, 380px" : "(max-width: 760px) 92vw, 980px"} className="film-player-image" />
    <span className="film-player-play">▶ {copy.play}</span>
  </> : null;

  return (
    <article className="film-service" aria-labelledby={`film-service-${index}`}>
      <div className="film-service-intro">
        <div className={`film-service-art ${ppuri || product.mascotImage?.asset ? "has-mascot" : ""}`}>
          <span className="film-art-caption">logU / {localized(product.categoryI18n, locale, ppuri ? (locale === "ko" ? "육아 기록" : "Parenting journal") : "Service")}</span>
          <Image src={mascot} alt={ppuri ? (locale === "ko" ? "아기 logU 푸리" : "Ppuri, the baby logU") : name} fill sizes="(max-width: 760px) 90vw, 42vw" className="film-service-image" />
        </div>
        <div className="film-service-copy">
          <span className="film-service-number">{String(index + 1).padStart(2, "0")} / logUs Studio</span>
          <h3 id={`film-service-${index}`}>{name}</h3>
          <p>{localized(product.descriptionI18n, locale, product.description)}</p>
          {highlights.length > 0 ? <ul className="film-highlights">{highlights.map((item, highlightIndex) => <li key={product.highlights?.[highlightIndex]?._key || highlightIndex}>{localized(item, locale)}</li>)}</ul> : null}
          {product.appStoreUrl || product.webUrl
            ? <a className="film-service-link" href={product.appStoreUrl || product.webUrl} target="_blank" rel="noreferrer">{copy.visit} ↗</a>
            : <span className="film-coming-soon">{copy.soon}</span>}
        </div>
      </div>
      {clip && source ? <div className="film-video-area">
        <div className="film-video-topline"><h4>{copy.watch}</h4><span>{clips.length} films</span></div>
        <div className="film-video-options" aria-label={copy.watch}>
          {clips.map((item, clipIndex) => <button key={item._key} type="button" aria-pressed={clipIndex === selectedClip} className={clipIndex === selectedClip ? "selected" : ""} onClick={() => { setSelectedClip(clipIndex); setPlaying(false); }}>
            <span>{localized(item.titleI18n, locale, locale === "ko" ? "영상" : "Video")}</span><small>{item.duration || (item.aspect === "portrait" ? "9:16" : "16:9")}</small>
          </button>)}
        </div>
        <div className={`film-player ${clip.aspect === "portrait" ? "is-portrait" : ""}`}>
          {source.kind === "external"
            ? <a className="film-player-poster" href={source.directUrl} target="_blank" rel="noreferrer" aria-label={`${localized(clip.titleI18n, locale, copy.watch)} · ${copy.open}`}>{posterContents}</a>
            : !playing
              ? <button type="button" className="film-player-poster" onClick={() => setPlaying(true)} aria-label={`${localized(clip.titleI18n, locale, copy.watch)} · ${copy.play}`}>{posterContents}</button>
            : source.kind === "youtube"
              ? <iframe key={clip._key} title={localized(clip.titleI18n, locale, name)} src={source.playbackUrl} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
              : <video key={clip._key} controls autoPlay playsInline poster={poster} preload="none" aria-label={localized(clip.titleI18n, locale, copy.watch)}><source src={source.playbackUrl} type="video/mp4" /></video>}
        </div>
        <a className="film-video-direct" href={source.directUrl} target="_blank" rel="noreferrer">{copy.open} ↗</a>
      </div> : null}
    </article>
  );
}

export function VideoHomepage({ copy, products, socialLinks }: Props) {
  const [locale, setLocale] = useState<Locale>("ko");
  const [languageOpen, setLanguageOpen] = useState(false);
  const [heroComplete, setHeroComplete] = useState(false);
  const [activeSection, setActiveSection] = useState("intro");
  const [formSent, setFormSent] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSending, setFormSending] = useState(false);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const contactCopyRef = useRef<HTMLDivElement>(null);
  const questionLineRef = useRef<HTMLSpanElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => { document.documentElement.lang = locale; }, [locale]);
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
    const sections = ["intro", "product", "contact"].map((id) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver((entries) => {
      const current = entries.find((entry) => entry.isIntersecting);
      if (current) setActiveSection(current.target.id);
    }, { rootMargin: "-40% 0px -40% 0px", threshold: 0 });
    sections.forEach((section) => section && observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const introSubtitle = brandCase(localized(copy.introSubtitle, locale, locale === "ko" ? "당신의 순간을 담고 간직하는 logU들의 이야기." : "Stories of logU that hold your moments."));
  const contactBody = localized(copy.contactBody, locale, "서비스, 협업 또는 logUs Studio에 관해 함께 나누고 싶은 이야기를 남겨주세요.");
  const contactTitle = localized(copy.contactTitle, locale, "함께 남기고 싶은\n이야기가 있나요?");
  const [contactTitleFirst, ...contactTitleRest] = contactTitle.split("\n");
  const contactTitleLast = contactTitleRest.join("\n");
  const formCopy = locale === "ko"
    ? { eyebrow: "Talk with us", inquiry: "문의 유형을 선택하세요", product: "서비스 문의", collaboration: "협업 문의", other: "기타", name: "이름 또는 닉네임", email: "답변받을 이메일", message: "문의 내용을 입력하세요", consent: "개인정보 수집 및 이용에 동의합니다.", submit: "메시지 보내기", sent: "메시지가 담겼습니다.", sentBody: "문의 내용을 확인한 뒤 답변드리겠습니다." }
    : { eyebrow: "Talk with us", inquiry: "Choose an inquiry type", product: "Service inquiry", collaboration: "Collaboration inquiry", other: "Other", name: "Name or nickname", email: "Reply-to email", message: "Write your message", consent: "I agree to the collection and use of personal information.", submit: "Send message", sent: "Your message is in.", sentBody: "We will get back to you after reviewing it." };
  const ui = locale === "ko"
    ? { skip: "건너뛰기", replay: "영상 다시 보기", explore: "Product 만나보기", film: "logUs 마을의 이야기", empty: "새 서비스를 준비하고 있습니다." }
    : { skip: "Skip film", replay: "Replay film", explore: "Explore Product", film: "A story from logUs village", empty: "New services are on their way." };

  useEffect(() => {
    const fitContactForm = () => {
      const form = formRef.current;
      const line = questionLineRef.current;
      const copy = contactCopyRef.current;
      if (!form || !line || !copy) return;
      if (window.innerWidth <= 800) { form.style.width = "100%"; return; }
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
        body: JSON.stringify({ inquiryType: formData.get("inquiryType"), name: formData.get("name"), email: formData.get("email"), message: formData.get("message"), website: formData.get("website"), locale }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "문의 전송에 실패했습니다.");
      setFormSent(true);
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "문의 전송에 실패했습니다.");
    } finally {
      setFormSending(false);
    }
  }

  function replayFilm() {
    const video = heroVideoRef.current;
    if (!video) return;
    video.currentTime = 0;
    setHeroComplete(false);
    void video.play().catch(() => setHeroComplete(true));
  }

  return (
    <div className="studio-home film-home">
      <header className="studio-topbar">
        <a href="#intro" className="studio-wordmark"><strong>logUs</strong> Studio</a>
        <div className="studio-language" onKeyDown={(event) => { if (event.key === "Escape") setLanguageOpen(false); }}>
          <button type="button" className="studio-language-trigger" aria-expanded={languageOpen} aria-controls="film-language-options" onClick={() => setLanguageOpen((open) => !open)}>Language⌄</button>
          {languageOpen ? <div id="film-language-options" className="studio-language-popover"><button type="button" onClick={() => { setLocale("ko"); setLanguageOpen(false); }} className={locale === "ko" ? "active" : ""}>● 한국어</button><button type="button" onClick={() => { setLocale("en"); setLanguageOpen(false); }} className={locale === "en" ? "active" : ""}>○ English</button></div> : null}
        </div>
      </header>

      <nav className="studio-rail" aria-label={locale === "ko" ? "페이지 이동" : "Page navigation"}>
        {[{ id: "intro", label: localized(copy.pageLabels.intro, locale, "Intro") }, { id: "product", label: localized(copy.pageLabels.product, locale, "Product") }, { id: "contact", label: localized(copy.pageLabels.contact, locale, "Contact") }].map((item, index) => (
          <span key={item.id} className="studio-rail-row">
            {index > 0 ? <i /> : null}
            <a className={activeSection === item.id ? "active" : ""} aria-current={activeSection === item.id ? "location" : undefined} href={`#${item.id}`}><b>○</b><span>{item.label}</span><em>›</em></a>
          </span>
        ))}
      </nav>

      <main>
        <section id="intro" className="film-hero">
          <h1 className="sr-only">logUs Studio</h1>
          <Image src="/films/logus-village.webp" alt="" fill priority sizes="100vw" className="film-hero-poster" />
          <video ref={heroVideoRef} className="film-hero-video" autoPlay muted playsInline preload="metadata" poster="/films/logus-village.webp" onEnded={() => setHeroComplete(true)} onError={() => setHeroComplete(true)} aria-hidden="true"><source src="/films/logus-intro-15s.mp4" type="video/mp4" /></video>
          <div className="film-hero-shade" />
          <p className="film-hero-label">{ui.film}</p>
          <div className={`film-hero-finale ${heroComplete ? "is-visible" : ""}`}>
            <h2>logUs Studio</h2><p>{introSubtitle}</p>
            <a href="#product" className="film-hero-explore">{ui.explore} <span aria-hidden="true">↓</span></a>
          </div>
          {heroComplete
            ? <button type="button" className="film-hero-control" onClick={replayFilm}>{ui.replay} ↺</button>
            : <button type="button" className="film-hero-control" onClick={() => { heroVideoRef.current?.pause(); setHeroComplete(true); }}>{ui.skip} →</button>}
        </section>

        <section id="product" className="film-products">
          <div className="film-product-bridge">
            <Image src="/films/logus-clouds.webp" alt="" fill sizes="100vw" className="film-clouds" />
            <h2>{localized(copy.pageLabels.product, locale, "Product")}</h2>
          </div>
          <div className="film-products-content">
            <p className="film-products-lead">{brandCase(localized(copy.productLead, locale, "우리의 곁에 있는 logU를 만나보세요."))}</p>
            {products.length > 0 ? products.map((product, index) => <ProductShowcase key={product._id} product={product} index={index} locale={locale} />) : <p className="film-products-empty">{ui.empty}</p>}
          </div>
        </section>

        <section id="contact" className="studio-contact">
          <div className="studio-contact-head"><h2>{localized(copy.pageLabels.contact, locale, "Contact")}</h2></div>
          <div className="studio-contact-body"><div className="studio-contact-image"><Image src="/story/intro/intro-05-family-dinner-v2.webp" alt={locale === "ko" ? "가족의 이야기를 함께 바라보는 logu" : "logU sharing a family evening"} fill sizes="(max-width: 800px) 92vw, 43vw" className="studio-cover" /></div>
          <div className="studio-contact-copy" ref={contactCopyRef}><p className="studio-contact-label">{formCopy.eyebrow}</p><h3>{contactTitleFirst}{contactTitleLast ? <><br /><span className="studio-question-line" ref={questionLineRef}>{contactTitleLast}</span></> : <span className="studio-question-line" ref={questionLineRef}>{contactTitleFirst}</span>}</h3><p className="studio-contact-body-copy">{contactBody}</p>{!formSent ? <form ref={formRef} className="studio-contact-form" onSubmit={submitContact}><select name="inquiryType" aria-label={formCopy.inquiry} required defaultValue=""><option value="" disabled>{formCopy.inquiry}</option><option>{formCopy.product}</option><option>{formCopy.collaboration}</option><option>{formCopy.other}</option></select><input name="name" required placeholder={formCopy.name} /><input name="email" required type="email" placeholder={formCopy.email} /><textarea name="message" required placeholder={formCopy.message} /><input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="studio-honeypot" /><label><input required type="checkbox" /> {formCopy.consent}</label><button className="studio-submit" type="submit" disabled={formSending}>{formSending ? "…" : formCopy.submit}</button>{formError ? <p role="alert">{formError}</p> : null}</form> : null}{formSent ? <div className="studio-sent"><h4>{formCopy.sent}</h4><p>{formCopy.sentBody}</p></div> : null}</div></div>
          <footer className="studio-footer"><div>{localized(copy.copyright, locale, "© 2026 logUs Studio. All rights reserved.")}</div><div>{locale === "ko" ? "이용약관 · 개인정보처리방침" : "Terms · Privacy"}</div><div>{locale === "ko" ? "사업자정보 확인" : "Business information"}</div><div className="studio-footer-social">{socialLinks.map((link) => <a key={link._id} href={link.url} target="_blank" rel="noreferrer">{link.label || link.platform}</a>)}</div></footer>
        </section>
      </main>
    </div>
  );
}
