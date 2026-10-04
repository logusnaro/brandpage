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
  const dayByBaby = /^(?:bebe|daybybaby)$/i.test(product.name || "");
  const androidStatus = product.androidStatus || (dayByBaby && !product.googlePlayUrl ? "planned" : undefined);
  const iosStatus = product.iosStatus || (dayByBaby && !product.appStoreUrl ? "planned" : undefined);
  return [
    { platform: "android", label: "Google Play", url: androidStatus === "none" || androidStatus === "planned" ? undefined : httpsUrl(product.googlePlayUrl), planned: androidStatus === "planned" },
    { platform: "ios", label: "App Store", url: iosStatus === "none" || iosStatus === "planned" ? undefined : httpsUrl(product.appStoreUrl), planned: iosStatus === "planned" },
    { platform: "web", label: "Web", url: httpsUrl(product.webUrl), planned: false },
  ].filter((item) => item.url || item.planned);
}
