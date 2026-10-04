import Link from "next/link";
import { ProductCollection, ProductShowcase } from "./AppProducts";
import { productPath } from "@/lib/productLinks";
import type { Locale, Product } from "@/sanity/lib/types";
import type { ReactNode } from "react";
import "./app-products.css";

function AppShell({ locale, path, children }: { locale: Locale; path: string; children: ReactNode }) {
  return (
    <div className="cinema-site app-directory-site" lang={locale}>
      <header className="app-directory-header">
        <Link href="/" className="cinema-wordmark">logUs<span>•</span> Studio</Link>
        <nav aria-label={locale === "ko" ? "페이지 이동" : "Navigation"}>
          <Link href={`/apps?lang=${locale}`}>Apps</Link>
          <Link href="/#contact">Contact</Link>
        </nav>
        <div className="app-language">
          <Link href={`${path}?lang=ko`} aria-current={locale === "ko" ? "page" : undefined}>한국어</Link>
          <Link href={`${path}?lang=en`} aria-current={locale === "en" ? "page" : undefined}>English</Link>
        </div>
      </header>
      <main className="app-directory-main">{children}</main>
      <footer className="app-directory-footer">
        <span>© {new Date().getFullYear()} logUs Studio</span>
        <Link href="/#contact">{locale === "ko" ? "함께 나눌 이야기" : "Get in touch"} ↗</Link>
      </footer>
    </div>
  );
}

export function AppDirectory({ products, locale }: { products: Product[]; locale: Locale }) {
  return (
    <AppShell locale={locale} path="/apps">
      <div className="app-directory-heading">
        <span className="app-eyebrow">THE logU NEIGHBORHOOD</span>
        <h1>Apps<span>.</span></h1>
        <p>{locale === "ko" ? "저마다의 하루에 어울리는, 서로 다른 logU와 앱들." : "Different logU and apps, for different everyday lives."}</p>
      </div>
      {products.length ? <ProductCollection products={products} locale={locale} /> : <p>{locale === "ko" ? "새로운 앱을 준비하고 있습니다." : "New apps are on their way."}</p>}
    </AppShell>
  );
}

export function AppDetail({ product, products, locale }: { product: Product; products: Product[]; locale: Locale }) {
  const others = products.filter((item) => item._id !== product._id);
  return (
    <AppShell locale={locale} path={productPath(product, locale).split("?")[0]}>
      <Link className="app-back" href={`/apps?lang=${locale}`}>← {locale === "ko" ? "모든 앱" : "All apps"}</Link>
      <ProductShowcase key={product._id} product={product} index={0} locale={locale} />
      {others.length ? (
        <section className="app-related">
          <h2>{locale === "ko" ? "이웃의 logU도 만나보세요." : "Meet the neighbors."}</h2>
          <ProductCollection products={others} locale={locale} limit={3} />
        </section>
      ) : (
        <div className="app-related-note">
          <span>ONE OF MANY LITTLE WORLDS</span>
          <p>{locale === "ko" ? "작은 순간에서 시작해, 더 다양한 하루의 곁으로." : "Starting with little moments. Growing into more everyday lives."}</p>
          <Link href={`/apps?lang=${locale}`}>{locale === "ko" ? "logU의 마을로 돌아가기" : "Back to the logU neighborhood"} ↗</Link>
        </div>
      )}
    </AppShell>
  );
}
