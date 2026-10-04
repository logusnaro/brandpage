import type { Locale, Product } from "@/sanity/lib/types";

export function productSlug(product: Product) {
  return product.name?.trim() || product._id;
}

export function productPath(product: Product, locale: Locale) {
  return `/apps/${encodeURIComponent(productSlug(product))}?lang=${locale}`;
}

// CMS URLs are public input: do not render javascript:, insecure HTTP or dead buttons.
export function httpsUrl(value?: string) {
  try {
    const url = new URL(value || "");
    return url.protocol === "https:" && !url.username && !url.password ? url.href : undefined;
  } catch {
    return undefined;
  }
}

export function productDownloads(product: Product) {
  if (product.platforms != null) {
    const labels = { android: "Google Play", ios: "App Store", toss: "앱인토스", web: "Web" };
    const seen = new Set<string>();
    return product.platforms.flatMap((item) => {
      if (!(item.platform in labels) || item.status === "hidden" || seen.has(item.platform)) return [];
      seen.add(item.platform);
      const url = item.status === "available" ? httpsUrl(item.url) : undefined;
      return [{ platform: item.platform, label: labels[item.platform], url, planned: !url, noteI18n: item.noteI18n }];
    });
  }
  const dayByBaby = /^(?:bebe|daybybaby)$/i.test(product.name || "");
  const androidStatus = product.androidStatus || (dayByBaby && !product.googlePlayUrl ? "planned" : undefined);
  const iosStatus = product.iosStatus || (dayByBaby && !product.appStoreUrl ? "planned" : undefined);
  return [
    { platform: "android", label: "Google Play", url: androidStatus === "none" || androidStatus === "planned" ? undefined : httpsUrl(product.googlePlayUrl), planned: androidStatus === "planned", noteI18n: undefined },
    { platform: "ios", label: "App Store", url: iosStatus === "none" || iosStatus === "planned" ? undefined : httpsUrl(product.appStoreUrl), planned: iosStatus === "planned", noteI18n: undefined },
    { platform: "web", label: "Web", url: httpsUrl(product.webUrl), planned: false, noteI18n: undefined },
  ].filter((item) => item.url || item.planned);
}

export function platformName(platform: string, locale: Locale) {
  return { android: "Android", ios: "iOS", toss: locale === "ko" ? "앱인토스" : "Apps in Toss", web: locale === "ko" ? "웹" : "Web" }[platform] || platform;
}
