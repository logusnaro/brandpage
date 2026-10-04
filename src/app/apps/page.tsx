import { AppDirectory } from "@/components/AppPages";
import { fetchPageData } from "@/sanity/lib/fetchPageData";
import "../cinema-homepage.css";

export const metadata = { title: "Apps | logUs Studio" };

export default async function AppsPage({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const [{ products }, { lang }] = await Promise.all([fetchPageData(), searchParams]);
  return <AppDirectory products={products} locale={lang === "en" ? "en" : "ko"} />;
}
