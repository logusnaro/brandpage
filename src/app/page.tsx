import type { Metadata } from "next";
import { StudioHomepage } from "@/components/StudioHomepage";
import { fetchPageData } from "@/sanity/lib/fetchPageData";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const { settings } = await fetchPageData();

  return {
    title: settings.metadata.title.ko,
    description: settings.metadata.description.ko,
    alternates: { canonical: "/" },
    openGraph: {
      title: settings.metadata.title.ko,
      description: settings.metadata.description.ko,
      type: "website",
      locale: "ko_KR",
      alternateLocale: ["en_US"],
      siteName: "logUs Studio",
    },
    twitter: {
      card: "summary_large_image",
      title: settings.metadata.title.ko,
      description: settings.metadata.description.ko,
    },
  };
}

export default async function Home() {
  const { settings, products, socialLinks } = await fetchPageData();

  return <StudioHomepage settings={settings} products={products} socialLinks={socialLinks} />;
}
