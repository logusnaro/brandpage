import type { Metadata } from "next";
import { VideoHomepage } from "@/components/VideoHomepage";
import { fetchPageData } from "@/sanity/lib/fetchPageData";
import "./cinema-homepage.css";

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
  const copy = {
    cinema: settings.cinema,
    pageLabels: settings.pageLabels,
    introSubtitle: settings.intro.scenes.at(-1)?.body,
    productLead: settings.products.support,
    contactTitle: settings.contact.title,
    contactBody: settings.contact.body,
    copyright: settings.contact.copyright,
  };

  return (
    <VideoHomepage copy={copy} products={products} socialLinks={socialLinks} />
  );
}
