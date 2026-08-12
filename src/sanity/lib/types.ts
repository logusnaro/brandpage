export type PublishStatus = "draft" | "published" | "unpublished";

export type SiteSettings = {
  hero: {
    tagline: string;
    subline: string;
  };
  philosophy: string;
  studio: string;
  contact: {
    headline: string;
    email: string;
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
