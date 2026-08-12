"use client";

import { useEffect, useState } from "react";

type NavItem = {
  id: string;
  label: string;
};

type SiteNavProps = {
  items: NavItem[];
};

export function SiteNav({ items }: SiteNavProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0),
          );

        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        // Favor the section near the middle of the viewport under the fixed nav
        root: null,
        rootMargin: "-35% 0px -45% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--ink)]/8 bg-[var(--background)]/90 backdrop-blur-sm">
      <nav
        className="mx-auto flex max-w-3xl items-center gap-5 overflow-x-auto px-6 py-3 sm:gap-6 sm:px-10"
        aria-label="Section"
      >
        {items.map((item) => {
          const active = item.id === activeId;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={active ? "true" : undefined}
              className={`shrink-0 py-1 text-xs font-medium tracking-[0.04em] transition-colors sm:text-sm ${
                active
                  ? "text-[var(--ink)] underline underline-offset-4 decoration-[var(--ink)]"
                  : "text-[var(--ink-muted)] hover:text-[var(--ink)]"
              }`}
            >
              {item.label}
            </a>
          );
        })}
      </nav>
    </header>
  );
}
