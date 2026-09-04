"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/sanity/lib/types";
import { urlFor } from "@/sanity/lib/image";
import { ProductModal } from "./ProductModal";
import { RevealLines } from "./RevealLines";
import { blankLarge, blankSoft, line, richText } from "./richText";
import { contentShell, type as t } from "./type";

type ProductsProps = {
  products: Product[];
};

function thumbSource(product: Product) {
  return product.homeScreen || product.screenshot;
}

function symbolName(displayName: string) {
  const raw = displayName.replace(/^\[:\]\s*/, "").trim().replace(/\s+/g, "");
  return `[:]${raw}`;
}

export function Products({ products }: ProductsProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = products.find((product) => product._id === activeId) ?? null;

  if (products.length === 0) return null;

  return (
    <section
      id="products"
      className="section-screen flex flex-col justify-center pt-16"
    >
      <div className={`${contentShell} w-full`}>
        <RevealLines
          lines={[
            { text: "PRODUCTS", className: t.label },
            blankSoft(),
            line("Keep little moments", t.large),
            line("**with Us**", t.large),
            blankLarge(),
          ]}
          staggerMs={150}
          as="p"
        />

        <ul className="mt-2 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {products.map((product) => {
            const thumb = thumbSource(product);
            const label = symbolName(product.displayName);

            return (
              <li key={product._id}>
                <button
                  type="button"
                  onClick={() => setActiveId(product._id)}
                  className="group w-full text-left"
                >
                  <div className="relative aspect-[9/16] overflow-hidden bg-[var(--paper)] transition-opacity group-hover:opacity-85">
                    {thumb ? (
                      <Image
                        src={urlFor(thumb)
                          .width(400)
                          .height(720)
                          .fit("crop")
                          .url()}
                        alt={product.screenshotAlt || product.displayName}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 18vw"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center px-3 text-center text-xs text-[var(--ink-muted)] sm:text-sm">
                        {richText(label)}
                      </div>
                    )}
                  </div>
                  <p className={`mt-3 ${t.small}`}>{richText(label)}</p>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {active ? (
        <ProductModal product={active} onClose={() => setActiveId(null)} />
      ) : null}
    </section>
  );
}
