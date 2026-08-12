"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export type RevealLine =
  | string
  | {
      text?: string;
      href?: string;
      external?: boolean;
      className?: string;
      content?: ReactNode;
    };

type RevealLinesProps = {
  lines: RevealLine[];
  className?: string;
  lineClassName?: string;
  staggerMs?: number;
  as?: "div" | "h1" | "h2" | "p" | "span";
};

function lineKey(line: RevealLine, index: number) {
  if (typeof line === "string") return `${index}-${line}`;
  return `${index}-${line.text ?? "node"}`;
}

function isEmpty(line: RevealLine) {
  if (typeof line === "string") return line.trim() === "";
  if (line.content) return false;
  return !line.text || line.text.trim() === "";
}

export function RevealLines({
  lines,
  className = "",
  lineClassName = "",
  staggerMs = 160,
  as = "div",
}: RevealLinesProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStarted(true);
      },
      { threshold: 0.35 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    if (visibleCount >= lines.length) return;

    const id = window.setTimeout(() => {
      setVisibleCount((n) => n + 1);
    }, staggerMs);

    return () => window.clearTimeout(id);
  }, [started, visibleCount, lines.length, staggerMs]);

  const Tag = as;

  return (
    <div ref={ref} className={className}>
      {lines.map((line, index) => {
        const empty = isEmpty(line);
        const shown = index < visibleCount;
        const customClass =
          typeof line === "string" ? "" : (line.className ?? "");
        const href = typeof line === "string" ? undefined : line.href;
        const external = typeof line === "string" ? false : line.external;
        const text = typeof line === "string" ? line : line.text;
        const content =
          typeof line === "string" ? null : (line.content ?? null);

        // Empty lines preserve intentional Enter gaps (one vs two blank lines).
        // Pass className on blanks to size them (e.g. 대자 기준 두 칸).
        const classes = `block transition-[opacity,transform] duration-500 ease-out ${
          shown ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        } ${
          empty
            ? `h-[1.15em] ${customClass}`
            : `${lineClassName} ${customClass}`
        }`;

        const inner = empty ? "\u00A0" : (content ?? text);

        if (href && !empty) {
          return (
            <a
              key={lineKey(line, index)}
              href={href}
              className={classes}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              aria-hidden={!shown}
              tabIndex={shown ? undefined : -1}
            >
              {inner}
            </a>
          );
        }

        return (
          <Tag
            key={lineKey(line, index)}
            className={classes}
            aria-hidden={!shown}
          >
            {inner}
          </Tag>
        );
      })}
    </div>
  );
}

export function splitLines(text: string): string[] {
  return text.replace(/\r\n/g, "\n").split("\n");
}

/** Renders `[:] name` with blinking colon. */
export function SymbolName({ name }: { name: string }) {
  const cleaned = name.replace(/^\[:\]\s*/, "");
  return (
    <span>
      [<span className="colon-blink">:</span>] {cleaned}
    </span>
  );
}
