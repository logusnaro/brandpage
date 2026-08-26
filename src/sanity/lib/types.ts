export type PublishStatus = "draft" | "published" | "unpublished";

export type Locale = "ko" | "en";

export type LocalizedText = {
  ko: string;
  en: string;
};

export type DailyScene = {
  _key: string;
  time: string;
  title: LocalizedText;
  copy: LocalizedText;
  visual: "wake" | "meal" | "commute" | "work" | "lunch" | "home" | "family" | "night";
};

export type IntroScene = {
  _key: string;
  symbol: string;
  title: LocalizedText;
  body: LocalizedText;
  visual: "wake" | "family" | "commute" | "later" | "night";
};

export type LifeStage = {
  _key: string;
  age: LocalizedText;
  title: LocalizedText;
  copy: LocalizedText;
  visual: "baby" | "kindergarten" | "school" | "teen" | "university" | "work" | "family" | "later";
};

export type SiteSettings = {
  pageLabels: {
    intro: LocalizedText;
    product: LocalizedText;
    contact: LocalizedText;
  };
  navigation: {
    daily: LocalizedText;
    products: LocalizedText;
    life: LocalizedText;
  };
  language: {
    korean: string;
    english: string;
  };
  intro: { scenes: IntroScene[] };
  daily: {
    eyebrow: LocalizedText;
    title: LocalizedText;
    body: LocalizedText;
    cta: LocalizedText;
    journeyLabel: LocalizedText;
    scenes: DailyScene[];
    closingTitle: LocalizedText;
    closingBody: LocalizedText;
  };
  products: {
    eyebrow: LocalizedText;
    title: LocalizedText;
    body: LocalizedText;
    transitionTitle: LocalizedText;
    transitionBody: LocalizedText;
    comingSoon: LocalizedText;
    visitProduct: LocalizedText;
    guide: LocalizedText;
    lead: LocalizedText;
    support: LocalizedText;
  };
  life: {
    eyebrow: LocalizedText;
    title: LocalizedText;
    body: LocalizedText;
    stages: LifeStage[];
    closingTitle: LocalizedText;
    closingBody: LocalizedText;
  };
  contact: {
    eyebrow: LocalizedText;
    label: LocalizedText;
    title: LocalizedText;
    body: LocalizedText;
    email: string;
    location: LocalizedText;
    copyright: LocalizedText;
  };
  metadata: {
    title: LocalizedText;
    description: LocalizedText;
  };
};

export type SanityImage = {
  asset?: { _ref: string; _type?: string };
  alt?: string;
};

export type Product = {
  _id: string;
  name?: string;
  displayName: string;
  description: string;
  displayNameI18n?: Partial<LocalizedText>;
  descriptionI18n?: Partial<LocalizedText>;
  categoryI18n?: Partial<LocalizedText>;
  sortOrder: number;
  status: PublishStatus;
  appStoreUrl?: string;
  webUrl?: string;
  homeScreen?: SanityImage;
  screenshots?: SanityImage[];
  /** @deprecated legacy field */
  screenshot?: SanityImage;
  screenshotAlt?: string;
};

export type SocialLink = {
  _id: string;
  platform: "twitter" | "instagram" | "threads" | "youtube" | "other";
  label?: string;
  url: string;
  sortOrder: number;
  status: PublishStatus;
};

export type PageData = {
  settings: SiteSettings;
  products: Product[];
  socialLinks: SocialLink[];
  source: "sanity" | "fallback";
};
