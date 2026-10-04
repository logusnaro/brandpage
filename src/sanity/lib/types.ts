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
  visual:
    | "wake"
    | "meal"
    | "commute"
    | "work"
    | "lunch"
    | "home"
    | "family"
    | "night";
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
  visual:
    | "baby"
    | "kindergarten"
    | "school"
    | "teen"
    | "university"
    | "work"
    | "family"
    | "later";
};

export type CinemaCopy = Partial<
  Record<
    | "heroSubtitle"
    | "filmLabel"
    | "studioNav"
    | "appsNav"
    | "storyTitle"
    | "storyBody"
    | "worldsTitle"
    | "worldsBody"
    | "productTitle"
    | "growingCaption"
    | "togetherCaption"
    | "lookingBackCaption",
    Partial<LocalizedText>
  >
>;

export type SiteSettings = {
  cinema?: CinemaCopy;
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

export type ProductVideo = {
  _key: string;
  titleI18n?: Partial<LocalizedText>;
  url: string;
  aspect?: "landscape" | "portrait";
  duration?: string;
  poster?: SanityImage;
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
  googlePlayUrl?: string;
  androidStatus?: "planned" | "available" | "none";
  iosStatus?: "planned" | "available" | "none";
  shortDescriptionI18n?: Partial<LocalizedText>;
  appIcon?: SanityImage;
  platforms?: Array<{
    _key: string;
    platform: "android" | "ios" | "toss" | "web";
    status: "planned" | "available" | "hidden";
    url?: string;
    noteI18n?: Partial<LocalizedText>;
  }>;
  localImage?: string;
  webUrl?: string;
  homeScreen?: SanityImage;
  mascotImage?: SanityImage;
  detail?: {
    headlineI18n?: Partial<LocalizedText>;
    introI18n?: Partial<LocalizedText>;
    heroImage?: SanityImage;
    videoHeadingI18n?: Partial<LocalizedText>;
    videoBodyI18n?: Partial<LocalizedText>;
    featureHeadingI18n?: Partial<LocalizedText>;
  };
  highlights?: Array<{ _key: string; label?: Partial<LocalizedText>; description?: Partial<LocalizedText>; image?: SanityImage }>;
  videos?: ProductVideo[];
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
