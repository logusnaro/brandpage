import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AppDetail } from "@/components/AppPages";
import { productSlug } from "@/lib/productLinks";
import { fetchPageData } from "@/sanity/lib/fetchPageData";
import "../../cinema-homepage.css";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ lang?: string }> };

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const [{ slug }, { lang }, { products }] = await Promise.all([params, searchParams, fetchPageData()]);
  const product = products.find((item) => productSlug(item) === slug);
  if (!product) return { title: "App not found | logUs Studio", robots: { index: false } };
  const locale = lang === "en" ? "en" : "ko";
  return { title: `${product.displayNameI18n?.[locale] || product.displayName} | logUs Studio`, description: product.descriptionI18n?.[locale] || product.description };
}

export default async function AppPage({ params, searchParams }: Props) {
  const [{ slug }, { lang }, { products }] = await Promise.all([params, searchParams, fetchPageData()]);
  const product = products.find((item) => productSlug(item) === slug);
  if (!product) notFound();
  return <AppDetail product={product} products={products} locale={lang === "en" ? "en" : "ko"} />;
}
