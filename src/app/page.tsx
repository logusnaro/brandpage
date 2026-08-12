import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { Philosophy } from "@/components/Philosophy";
import { Products } from "@/components/Products";
import { SiteNav } from "@/components/SiteNav";
import { Studio } from "@/components/Studio";
import { fetchPageData } from "@/sanity/lib/fetchPageData";

export const revalidate = 60;

export default async function Home() {
  const { products, socialLinks, settings } = await fetchPageData();

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "philosophy", label: "Philosophy" },
    ...(products.length > 0 ? [{ id: "products", label: "Products" }] : []),
    { id: "studio", label: "Studio" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <>
      <SiteNav items={navItems} />
      <main className="flex min-h-full flex-col">
        <Hero />
        <Philosophy />
        <Products products={products} />
        <Studio />
        <Contact
          email={settings.contact.email}
          socialLinks={socialLinks}
        />
      </main>
    </>
  );
}
