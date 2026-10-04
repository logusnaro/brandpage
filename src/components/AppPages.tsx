import Link from "next/link";
import Image from "next/image";
import {
  ProductCollection,
  ProductCollectionHeader,
  ProductShowcase,
} from "./AppProducts";
import { productPath } from "@/lib/productLinks";
import type { Locale, Product } from "@/sanity/lib/types";
import type { ReactNode } from "react";
import { urlFor } from "@/sanity/lib/image";
import { appRoom } from "@/lib/appDetailContent";
import "./app-products.css";
import "./app-room.css";

function AppShell({
  locale,
  path,
  children,
  detail = false,
}: {
  locale: Locale;
  path: string;
  children: ReactNode;
  detail?: boolean;
}) {
  return (
    <div
      className={`cinema-site app-directory-site${detail ? " app-room-site" : ""}`}
      lang={locale}
    >
      <header className="app-directory-header">
        <Link href="/" className="cinema-wordmark">
          logUs{detail ? " " : <span>•</span>} Studio
        </Link>
        <nav aria-label={locale === "ko" ? "페이지 이동" : "Navigation"}>
          {detail ? <Link href="/#studio">Studio</Link> : null}
          <Link
            href={`/apps?lang=${locale}`}
            className={detail ? "is-active" : undefined}
          >
            Apps
          </Link>
          <Link href="/#contact">Contact</Link>
        </nav>
        {detail ? (
          <details className="app-room-language">
            <summary>
              <span aria-hidden="true">◎</span> Language{" "}
              <span aria-hidden="true">⌄</span>
            </summary>
            <div>
              <Link
                href={`${path}?lang=ko`}
                aria-current={locale === "ko" ? "page" : undefined}
              >
                한국어
              </Link>
              <Link
                href={`${path}?lang=en`}
                aria-current={locale === "en" ? "page" : undefined}
              >
                English
              </Link>
            </div>
          </details>
        ) : (
          <div className="app-language">
            <Link
              href={`${path}?lang=ko`}
              aria-current={locale === "ko" ? "page" : undefined}
            >
              한국어
            </Link>
            <Link
              href={`${path}?lang=en`}
              aria-current={locale === "en" ? "page" : undefined}
            >
              English
            </Link>
          </div>
        )}
      </header>
      <main className="app-directory-main">{children}</main>
      <footer className="app-directory-footer">
        <span>© {new Date().getFullYear()} logUs Studio</span>
        <Link href="/#contact">
          {locale === "ko" ? "함께 나눌 이야기" : "Get in touch"} ↗
        </Link>
      </footer>
    </div>
  );
}

export function AppDirectory({
  products,
  locale,
}: {
  products: Product[];
  locale: Locale;
}) {
  return (
    <AppShell locale={locale} path="/apps">
      <ProductCollectionHeader locale={locale} directory />
      {products.length ? (
        <ProductCollection products={products} locale={locale} village />
      ) : (
        <p>
          {locale === "ko"
            ? "새로운 앱을 준비하고 있습니다."
            : "New apps are on their way."}
        </p>
      )}
    </AppShell>
  );
}

export function AppDetail({
  product,
  products,
  locale,
}: {
  product: Product;
  products: Product[];
  locale: Locale;
}) {
  const others = products.filter((item) => item._id !== product._id);
  return (
    <AppShell
      locale={locale}
      path={productPath(product, locale).split("?")[0]}
      detail
    >
      <ProductShowcase
        key={product._id}
        product={product}
        index={0}
        locale={locale}
      />
      {others.length ? (
        <section className="app-room-related">
          <h2>
            {locale === "ko"
              ? "이웃의 logU도 만나보세요."
              : "Meet the neighbors."}
          </h2>
          <div className="app-room-neighbors">
            {others.slice(0, 3).map((item) => (
              <Link key={item._id} href={productPath(item, locale)}>
                <Image
                  src={
                    item.appIcon?.asset
                      ? urlFor(item.appIcon).width(160).height(160).url()
                      : appRoom(item).hero
                  }
                  alt=""
                  width={80}
                  height={80}
                />
                <span>
                  <strong>
                    {item.displayNameI18n?.[locale] || item.displayName}
                  </strong>
                  <small>
                    {item.shortDescriptionI18n?.[locale] ||
                      item.categoryI18n?.[locale] ||
                      item.descriptionI18n?.[locale] ||
                      item.description}
                  </small>
                </span>
                <span aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
          <Link className="app-room-all" href={`/apps?lang=${locale}`}>
            {locale === "ko"
              ? "logU의 마을로 돌아가기"
              : "Back to the logU neighborhood"}{" "}
            ↗
          </Link>
        </section>
      ) : (
        <div className="app-related-note">
          <span>ONE OF MANY LITTLE WORLDS</span>
          <p>
            {locale === "ko"
              ? "작은 순간에서 시작해, 더 다양한 하루의 곁으로."
              : "Starting with little moments. Growing into more everyday lives."}
          </p>
          <Link href={`/apps?lang=${locale}`}>
            {locale === "ko"
              ? "logU의 마을로 돌아가기"
              : "Back to the logU neighborhood"}{" "}
            ↗
          </Link>
        </div>
      )}
    </AppShell>
  );
}
