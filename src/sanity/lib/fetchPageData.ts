import { cache } from "react";
import { client } from "../client";
import { fallbackPageData, fallbackSiteSettings } from "./fallback";
import { productsQuery, siteSettingsQuery, socialLinksQuery } from "./queries";
import type {
  DailyScene,
  LifeStage,
  LocalizedText,
  IntroScene,
  PageData,
  Product,
  SiteSettings,
  SocialLink,
} from "./types";

type RawSettings = Partial<{
  pageLabels: Partial<SiteSettings["pageLabels"]>;
  introScenes: Array<Partial<IntroScene>>;
  navigation: Partial<SiteSettings["navigation"]>;
  language: Partial<SiteSettings["language"]>;
  dailyEyebrow: Partial<LocalizedText>;
  dailyTitle: Partial<LocalizedText>;
  dailyBody: Partial<LocalizedText>;
  dailyCta: Partial<LocalizedText>;
  dailyJourneyLabel: Partial<LocalizedText>;
  dailyScenes: Array<Partial<DailyScene>>;
  dailyClosingTitle: Partial<LocalizedText>;
  dailyClosingBody: Partial<LocalizedText>;
  productsEyebrow: Partial<LocalizedText>;
  productsTitle: Partial<LocalizedText>;
  productsBody: Partial<LocalizedText>;
  productsTransitionTitle: Partial<LocalizedText>;
  productsTransitionBody: Partial<LocalizedText>;
  productsComingSoon: Partial<LocalizedText>;
  productsVisit: Partial<LocalizedText>;
  productsGuide: Partial<LocalizedText>;
  productsLead: Partial<LocalizedText>;
  productsSupport: Partial<LocalizedText>;
  lifeEyebrow: Partial<LocalizedText>;
  lifeTitle: Partial<LocalizedText>;
  lifeBody: Partial<LocalizedText>;
  lifeStages: Array<Partial<LifeStage>>;
  lifeClosingTitle: Partial<LocalizedText>;
  lifeClosingBody: Partial<LocalizedText>;
  contactEyebrow: Partial<LocalizedText>;
  contactLabel: Partial<LocalizedText>;
  contactTitle: Partial<LocalizedText>;
  contactBody: Partial<LocalizedText>;
  contactEmail: string;
  contactLocation: Partial<LocalizedText>;
  copyright: Partial<LocalizedText>;
  metaTitle: Partial<LocalizedText>;
  metaDescription: Partial<LocalizedText>;
  contact: { email?: string };
}>;

function mergeIntroScenes(value: RawSettings["introScenes"]): IntroScene[] {
  if (!value?.length) return fallbackSiteSettings.intro.scenes;
  return value.slice(0, 4).map((scene, index) => {
    const fallback = fallbackSiteSettings.intro.scenes[index % fallbackSiteSettings.intro.scenes.length];
    return {
      _key: scene._key || fallback._key,
      symbol: scene.symbol?.trim() || fallback.symbol,
      title: localized(scene.title, fallback.title),
      body: localized(scene.body, fallback.body),
      visual: scene.visual || fallback.visual,
    };
  });
}

function localized(value: Partial<LocalizedText> | undefined, fallback: LocalizedText): LocalizedText {
  return {
    ko: value?.ko?.trim() || fallback.ko,
    en: value?.en?.trim() || fallback.en,
  };
}

function mergeDailyScenes(value: RawSettings["dailyScenes"]): DailyScene[] {
  if (!value?.length) return fallbackSiteSettings.daily.scenes;

  return value.map((scene, index) => {
    const fallback =
      fallbackSiteSettings.daily.scenes.find((item) => item.visual === scene.visual) ??
      fallbackSiteSettings.daily.scenes[index % fallbackSiteSettings.daily.scenes.length];
    return {
      _key: scene._key || `${scene.visual || "scene"}-${index}`,
      time: scene.time?.trim() || fallback.time,
      title: localized(scene.title, fallback.title),
      copy: localized(scene.copy, fallback.copy),
      visual: scene.visual || fallback.visual,
    };
  });
}

function mergeLifeStages(value: RawSettings["lifeStages"]): LifeStage[] {
  if (!value?.length) return fallbackSiteSettings.life.stages;

  return value.map((stage, index) => {
    const fallback =
      fallbackSiteSettings.life.stages.find((item) => item.visual === stage.visual) ??
      fallbackSiteSettings.life.stages[index % fallbackSiteSettings.life.stages.length];
    return {
      _key: stage._key || `${stage.visual || "stage"}-${index}`,
      age: localized(stage.age, fallback.age),
      title: localized(stage.title, fallback.title),
      copy: localized(stage.copy, fallback.copy),
      visual: stage.visual || fallback.visual,
    };
  });
}

function mergeSettings(raw: RawSettings | null): SiteSettings {
  const fallback = fallbackSiteSettings;
  if (!raw) return fallback;

  return {
    pageLabels: {
      intro: localized(raw.pageLabels?.intro, fallback.pageLabels.intro),
      product: localized(raw.pageLabels?.product, fallback.pageLabels.product),
      contact: localized(raw.pageLabels?.contact, fallback.pageLabels.contact),
    },
    navigation: {
      daily: localized(raw.navigation?.daily, fallback.navigation.daily),
      products: localized(raw.navigation?.products, fallback.navigation.products),
      life: localized(raw.navigation?.life, fallback.navigation.life),
    },
    language: {
      korean: raw.language?.korean?.trim() || fallback.language.korean,
      english: raw.language?.english?.trim() || fallback.language.english,
    },
    intro: { scenes: mergeIntroScenes(raw.introScenes) },
    daily: {
      eyebrow: localized(raw.dailyEyebrow, fallback.daily.eyebrow),
      title: localized(raw.dailyTitle, fallback.daily.title),
      body: localized(raw.dailyBody, fallback.daily.body),
      cta: localized(raw.dailyCta, fallback.daily.cta),
      journeyLabel: localized(raw.dailyJourneyLabel, fallback.daily.journeyLabel),
      scenes: mergeDailyScenes(raw.dailyScenes),
      closingTitle: localized(raw.dailyClosingTitle, fallback.daily.closingTitle),
      closingBody: localized(raw.dailyClosingBody, fallback.daily.closingBody),
    },
    products: {
      eyebrow: localized(raw.productsEyebrow, fallback.products.eyebrow),
      title: localized(raw.productsTitle, fallback.products.title),
      body: localized(raw.productsBody, fallback.products.body),
      transitionTitle: localized(raw.productsTransitionTitle, fallback.products.transitionTitle),
      transitionBody: localized(raw.productsTransitionBody, fallback.products.transitionBody),
      comingSoon: localized(raw.productsComingSoon, fallback.products.comingSoon),
      visitProduct: localized(raw.productsVisit, fallback.products.visitProduct),
      guide: localized(raw.productsGuide, fallback.products.guide),
      lead: localized(raw.productsLead, fallback.products.lead),
      support: localized(raw.productsSupport, fallback.products.support),
    },
    life: {
      eyebrow: localized(raw.lifeEyebrow, fallback.life.eyebrow),
      title: localized(raw.lifeTitle, fallback.life.title),
      body: localized(raw.lifeBody, fallback.life.body),
      stages: mergeLifeStages(raw.lifeStages),
      closingTitle: localized(raw.lifeClosingTitle, fallback.life.closingTitle),
      closingBody: localized(raw.lifeClosingBody, fallback.life.closingBody),
    },
    contact: {
      eyebrow: localized(raw.contactEyebrow, fallback.contact.eyebrow),
      label: localized(raw.contactLabel, fallback.contact.label),
      title: localized(raw.contactTitle, fallback.contact.title),
      body: localized(raw.contactBody, fallback.contact.body),
      email: raw.contactEmail?.trim() || raw.contact?.email?.trim() || fallback.contact.email,
      location: localized(raw.contactLocation, fallback.contact.location),
      copyright: localized(raw.copyright, fallback.contact.copyright),
    },
    metadata: {
      title: localized(raw.metaTitle, fallback.metadata.title),
      description: localized(raw.metaDescription, fallback.metadata.description),
    },
  };
}

async function loadPageData(): Promise<PageData> {
  try {
    const [rawSettings, products, socialLinks] = await Promise.all([
      client.fetch<RawSettings | null>(siteSettingsQuery),
      client.fetch<Product[]>(productsQuery),
      client.fetch<SocialLink[]>(socialLinksQuery),
    ]);

    return {
      source: rawSettings || products?.length || socialLinks?.length ? "sanity" : "fallback",
      settings: mergeSettings(rawSettings),
      products: rawSettings ? products ?? [] : products?.length ? products : fallbackPageData.products,
      socialLinks: rawSettings ? socialLinks ?? [] : socialLinks?.length ? socialLinks : fallbackPageData.socialLinks,
    };
  } catch {
    return fallbackPageData;
  }
}

export const fetchPageData = cache(loadPageData);
