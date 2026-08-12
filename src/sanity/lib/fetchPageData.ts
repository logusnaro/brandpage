import { client } from "../client";
import { fallbackPageData } from "./fallback";
import {
  productsQuery,
  siteSettingsQuery,
  socialLinksQuery,
} from "./queries";
import type { PageData, Product, SiteSettings, SocialLink } from "./types";

function hasSettings(settings: SiteSettings | null): settings is SiteSettings {
  return Boolean(
    settings?.hero?.tagline &&
      settings?.hero?.subline &&
      settings?.philosophy &&
      settings?.studio &&
      settings?.contact?.headline &&
      settings?.contact?.email,
  );
}

export async function fetchPageData(): Promise<PageData> {
  try {
    const [settings, products, socialLinks] = await Promise.all([
      client.fetch<SiteSettings | null>(siteSettingsQuery),
      client.fetch<Product[]>(productsQuery),
      client.fetch<SocialLink[]>(socialLinksQuery),
    ]);

    if (!hasSettings(settings)) {
      return fallbackPageData;
    }

    return {
      source: "sanity",
      settings,
      products: products ?? [],
      socialLinks: socialLinks ?? [],
    };
  } catch {
    return fallbackPageData;
  }
}
