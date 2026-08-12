"use client";

import Image from "next/image";
import { useEffect } from "react";
import type { Product } from "@/sanity/lib/types";
import { urlFor } from "@/sanity/lib/image";
import { richText } from "./richText";
import { type as t } from "./type";

type ProductModalProps = {
  product: Product;
  onClose: () => void;
};

function isComingSoon(product: Product) {
  return !product.appStoreUrl && !product.webUrl;
}

function gallery(product: Product) {
  if (product.screenshots && product.screenshots.length > 0) {
    return product.screenshots;
  }
  if (product.homeScreen) return [product.homeScreen];
  if (product.screenshot) return [product.screenshot];
  return [];
}

function symbolName(displayName: string) {
  const raw = displayName.replace(/^\[:\]\s*/, "").trim().replace(/\s+/g, "");
  return `[:]${raw}`;
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  const images = gallery(product);
  const comingSoon = isComingSoon(product);
  const title = symbolName(product.displayName);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-[var(--ink)]/40 p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label={product.displayName}
      onClick={onClose}
    >
      <div
        className="max-h-[90svh] w-full max-w-lg overflow-y-auto bg-[var(--background)] px-6 py-8 sm:px-8"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <h2 className={`${t.large} !text-3xl sm:!text-4xl`}>
            {richText(title)}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 pt-1 text-sm text-[var(--ink-muted)] hover:text-[var(--ink)]"
            aria-label="Close"
          >
            Close
          </button>
        </div>

        <p className={`mt-6 whitespace-pre-line ${t.small}`}>
          {product.description}
        </p>

        {images.length > 0 ? (
          <div className="mt-8 flex gap-3 overflow-x-auto pb-2">
            {images.map((image, index) => {
              const src = urlFor(image).width(480).height(860).fit("crop").url();
              return (
                <Image
                  key={`${product._id}-shot-${index}`}
                  src={src}
                  alt={
                    image.alt || `${product.displayName} screenshot ${index + 1}`
                  }
                  width={240}
                  height={430}
                  className="h-64 w-auto shrink-0 rounded-sm object-cover sm:h-72"
                />
              );
            })}
          </div>
        ) : (
          <div className="mt-8 flex h-64 items-center justify-center bg-[var(--paper)] text-sm text-[var(--ink-muted)]">
            Screenshots coming soon
          </div>
        )}

        <div className="mt-8 flex flex-wrap gap-4">
          {comingSoon ? (
            <p className={t.medium}>Coming soon.</p>
          ) : (
            <>
              {product.appStoreUrl ? (
                <a
                  href={product.appStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${t.medium} underline underline-offset-4 decoration-[var(--ink)]/30 hover:decoration-[var(--ink)]`}
                >
                  App Store
                </a>
              ) : null}
              {product.webUrl ? (
                <a
                  href={product.webUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${t.medium} underline underline-offset-4 decoration-[var(--ink)]/30 hover:decoration-[var(--ink)]`}
                >
                  Open
                </a>
              ) : null}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
