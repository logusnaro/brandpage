"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { urlFor } from "@/sanity/lib/image";
import type { Locale, Product, SiteSettings, SocialLink } from "@/sanity/lib/types";

type Props = { settings: SiteSettings; products: Product[]; socialLinks: SocialLink[] };

const introArtwork = {
  wake: "/story/daily/daily-01-wake-v1.webp",
  family: "/story/life/life-02-kindergarten-v1.webp",
  commute: "/story/life/life-08-later-v1.webp",
  later: "/story/life/life-07-family-v1.webp",
  night: "/story/daily/daily-08-night-v1.webp",
} as const;
const introArtworkCycle = Object.values(introArtwork);

const productFallbackImages = [
  "/story/life/life-01-baby-v1.webp",
  "/story/daily/daily-04-work-v1.webp",
  "/story/life/life-07-family-v1.webp",
];

function localized(value: Partial<{ ko: string; en: string }> | undefined, locale: Locale, fallback = "") {
  return value?.[locale]?.trim() || fallback;
}

const pointPattern = /(logUs|logi|(?<![A-Za-z])i(?![A-Za-z])|(?<![A-Za-z])I(?![A-Za-z]))/g;

function emphasizePoints(value: string) {
  return value.split(pointPattern).map((part, index) => index % 2 === 1
    ? <span className="studio-point" key={`${part}-${index}`}>{part}</span>
    : part);
}

function productName(product: Product) {
  const name = product.displayName.replace(/^\[:\]\s*/, "").trim();
  return `logUs: ${name}`;
}

function productImage(product: Product, index: number) {
  const image = product.homeScreen || product.screenshot;
  return image ? urlFor(image).width(1000).height(700).fit("crop").url() : productFallbackImages[index % productFallbackImages.length];
}

function productGallery(product: Product, index: number) {
  if (product.screenshots?.length) return product.screenshots.map((image) => urlFor(image).width(900).height(1400).fit("crop").url());
  const image = product.homeScreen || product.screenshot;
  return image ? [urlFor(image).width(900).height(1400).fit("crop").url()] : [productFallbackImages[index % productFallbackImages.length]];
}

export function StudioHomepage({ settings, products, socialLinks }: Props) {
  const [locale, setLocale] = useState<Locale>("ko");
  const [languageOpen, setLanguageOpen] = useState(false);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [activeProduct, setActiveProduct] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState("intro");
  const [formSent, setFormSent] = useState(false);
  const contactCopyRef = useRef<HTMLDivElement>(null);
  const questionLineRef = useRef<HTMLSpanElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const introScenes = settings.intro.scenes.map((item) => ({
    ...item,
    titleText: localized(item.title, locale),
    bodyText: localized(item.body, locale),
    image: introArtwork[item.visual],
    alt: localized(item.title, locale) || item.symbol,
  }));
  const sceneCount = introScenes.length;
  const scene = introScenes[sceneIndex];

  useEffect(() => { document.documentElement.lang = locale; }, [locale]);

  useEffect(() => {
    if (paused) return;
    const duration = sceneIndex === sceneCount - 1 ? 7700 : 5700;
    const timer = window.setTimeout(() => setSceneIndex((current) => (current + 1) % sceneCount), duration);
    return () => window.clearTimeout(timer);
  }, [paused, sceneIndex, sceneCount]);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => setImageIndex((current) => (current + 1) % introArtworkCycle.length), 4200);
    return () => window.clearInterval(timer);
  }, [paused]);

  useEffect(() => {
    const sections = ["intro", "product", "contact"].map((id) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    }, { threshold: 0.46 });
    sections.forEach((section) => section && observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const active = activeProduct === null ? null : products[activeProduct] ?? null;
  const activeGallery = useMemo(() => active ? productGallery(active, activeProduct ?? 0) : [], [active, activeProduct]);
  const productOverview = localized(settings.products.support, locale, "우리의 곁에 있는 logi를 만나보세요.");
  const productGuide = localized(settings.products.guide, locale, "이미지 속 logi를 클릭하면 앱 소개가 열립니다.");
  const contactBody = localized(settings.contact.body, locale, "서비스, 협업 또는 logUs Studio에 관해 함께 나누고 싶은 이야기를 남겨주세요.");
  const formCopy = locale === "ko"
    ? { eyebrow: "Talk with us", inquiry: "문의 유형을 선택하세요", product: "서비스 문의", collaboration: "협업 문의", other: "기타", name: "이름 또는 닉네임", email: "답변받을 이메일", message: "문의 내용을 입력하세요", consent: "개인정보 수집 및 이용에 동의합니다.", submit: "메시지 보내기", sent: "메시지가 담겼습니다.", sentBody: "문의 내용을 확인한 뒤 답변드리겠습니다." }
    : { eyebrow: "Talk with us", inquiry: "Choose an inquiry type", product: "Service inquiry", collaboration: "Collaboration inquiry", other: "Other", name: "Name or nickname", email: "Reply-to email", message: "Write your message", consent: "I agree to the collection and use of personal information.", submit: "Send message", sent: "Your message is in.", sentBody: "We will get back to you after reviewing it." };
  const contactTitle = localized(settings.contact.title, locale, "함께 남기고 싶은\n이야기가 있나요?");
  const [contactTitleFirst, ...contactTitleRest] = contactTitle.split("\n");
  const contactTitleLast = contactTitleRest.join("\n");

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

  return (
    <div className="studio-home">
      <header className="studio-topbar">
        <a href="#intro" className="studio-wordmark"><strong>logUs:</strong> Studio</a>
        <div className="studio-language">
          <button type="button" className="studio-language-trigger" onClick={() => setLanguageOpen((open) => !open)}>Language⌄</button>
          {languageOpen ? <div className="studio-language-popover"><button type="button" onClick={() => { setLocale("ko"); setLanguageOpen(false); }} className={locale === "ko" ? "active" : ""}>● 한국어</button><button type="button" onClick={() => { setLocale("en"); setLanguageOpen(false); }} className={locale === "en" ? "active" : ""}>○ English</button></div> : null}
        </div>
      </header>

      <nav className="studio-rail" aria-label="페이지 이동">
        {[{ id: "intro", label: localized(settings.pageLabels.intro, locale, "Intro") }, { id: "product", label: localized(settings.pageLabels.product, locale, "Product") }, { id: "contact", label: localized(settings.pageLabels.contact, locale, "Contact") }].map((item, index) => (
          <span key={item.id} className="studio-rail-row">
            {index > 0 ? <i /> : null}
            <a className={activeSection === item.id ? "active" : ""} href={`#${item.id}`}><b>○</b><span>{item.label}</span><em>›</em></a>
          </span>
        ))}
      </nav>

      <main>
        <section id="intro" className="studio-intro">
          <h1 className="studio-intro-heading visible">Intro</h1>
          <div className="studio-intro-copy" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            <div className={`studio-symbol ${scene.symbol.replace("logUs : Studio", "logUs: Studio") === "logUs: Studio" ? "studio-brand-symbol" : ""}`}>{scene.symbol.replace("logUs : Studio", "logUs: Studio")}</div>
            <h2 key={`title-${sceneIndex}`}>{emphasizePoints(scene.titleText)}</h2>
            {scene.bodyText ? <p key={`body-${sceneIndex}`}>{emphasizePoints(scene.bodyText)}</p> : null}
            <div className="studio-progress" aria-label="Intro 진행">
              {introScenes.map((item, index) => <button key={item.symbol} type="button" aria-label={`${index + 1}번째 장면`} className={index === sceneIndex ? "active" : ""} onClick={() => setSceneIndex(index)} />)}
            </div>
          </div>
          <button className="studio-intro-image" type="button" aria-label="다음 Intro 장면" onClick={() => setSceneIndex((current) => (current + 1) % introScenes.length)} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            <Image key={introArtworkCycle[imageIndex]} src={introArtworkCycle[imageIndex]} alt={scene.alt} fill priority={imageIndex === 0} sizes="(max-width: 800px) 92vw, 54vw" className="studio-cover" />
          </button>
        </section>

        <section id="product" className="studio-product">
          <div className="studio-section-heading"><h2>{localized(settings.pageLabels.product, locale, "Product")}</h2><p>{productOverview}</p></div>
          <p className="studio-product-guide">{productGuide}</p>
          <div className="studio-product-track">
            {products.map((product, index) => {
              const title = productName(product);
              return <button type="button" className="studio-product-card" key={product._id} onClick={() => setActiveProduct(index)}>
                <span className="studio-product-image"><Image src={productImage(product, index)} alt={product.screenshotAlt || title} fill sizes="(max-width: 700px) 78vw, 30vw" className="studio-cover" /></span>
                <span className="studio-product-title">{title}</span><span className="studio-product-status">{product.appStoreUrl || product.webUrl ? "Available" : "Coming soon"}</span>
              </button>;
            })}
          </div>
          {!products.length ? <p className="studio-empty">새 서비스를 준비하고 있습니다.</p> : null}
        </section>

        <section id="contact" className="studio-contact">
          <div className="studio-contact-head"><h2>{localized(settings.pageLabels.contact, locale, "Contact")}</h2><p>{contactBody}</p></div>
          <div className="studio-contact-body"><div className="studio-contact-image"><Image src="/story/intro/intro-05-family-dinner-v2.webp" alt="가족의 이야기를 함께 바라보는 logi" fill sizes="(max-width: 800px) 92vw, 43vw" className="studio-cover" /></div>
          <div className="studio-contact-copy" ref={contactCopyRef}><p className="studio-contact-label">{formCopy.eyebrow}</p><h3>{contactTitleFirst}{contactTitleLast ? <><br /><span className="studio-question-line" ref={questionLineRef}>{contactTitleLast}</span></> : <span className="studio-question-line" ref={questionLineRef}>{contactTitleFirst}</span>}</h3>{!formSent ? <form ref={formRef} className="studio-contact-form" onSubmit={(event) => { event.preventDefault(); setFormSent(true); }}><select aria-label={formCopy.inquiry} required defaultValue=""><option value="" disabled>{formCopy.inquiry}</option><option>{formCopy.product}</option><option>{formCopy.collaboration}</option><option>{formCopy.other}</option></select><input required placeholder={formCopy.name} /><input required type="email" placeholder={formCopy.email} /><textarea required placeholder={formCopy.message} /><label><input required type="checkbox" /> {formCopy.consent}</label><button className="studio-submit" type="submit">{formCopy.submit}</button></form> : null}{formSent ? <div className="studio-sent"><h4>{formCopy.sent}</h4><p>{formCopy.sentBody}</p></div> : null}</div></div>
          <footer className="studio-footer"><div>{localized(settings.contact.copyright, locale, "© 2026 logUs Studio. All rights reserved.")}</div><div>이용약관 · 개인정보처리방침</div><div>사업자정보 확인</div><div className="studio-footer-social">{socialLinks.map((link) => <a key={link._id} href={link.url} target="_blank" rel="noreferrer">{link.label || link.platform}</a>)}</div></footer>
        </section>
      </main>

      {active ? <div className="studio-modal" role="dialog" aria-modal="true" aria-label={productName(active)} onClick={() => setActiveProduct(null)}><div className="studio-modal-card" onClick={(event) => event.stopPropagation()}><button type="button" className="studio-modal-close" onClick={() => setActiveProduct(null)} aria-label="닫기">×</button><div className="studio-modal-gallery">{activeGallery.map((image, index) => <Image key={`${image}-${index}`} src={image} alt={`${productName(active)} 화면 ${index + 1}`} width={360} height={560} className="studio-modal-shot" />)}</div><div className="studio-modal-copy"><p>{localized(active.categoryI18n, locale, "Service")}</p><h2>{productName(active)}</h2><div>{localized(active.descriptionI18n, locale, active.description)}</div>{active.appStoreUrl || active.webUrl ? <a href={active.appStoreUrl || active.webUrl} target="_blank" rel="noreferrer">서비스 보기 ↗</a> : <span>Coming soon</span>}</div></div></div> : null}
    </div>
  );
}
