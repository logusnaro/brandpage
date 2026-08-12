import type { ReactNode } from "react";
import { type as t } from "./type";

/** Renders inline **point color** spans and [:] blink symbol. */
export function richText(input: string): ReactNode {
  const tokens = input.split(/(\*\*[^*]+\*\*|\[:\])/g).filter(Boolean);

  return tokens.map((token, index) => {
    const point = token.match(/^\*\*([^*]+)\*\*$/);
    if (point) {
      return (
        <span key={index} className="text-[var(--point)]">
          {point[1]}
        </span>
      );
    }

    if (token === "[:]") {
      return (
        <span key={index}>
          [<span className="colon-blink">:</span>]
        </span>
      );
    }

    return <span key={index}>{token}</span>;
  });
}

export function line(text: string, className: string) {
  return { className, content: richText(text) };
}

/** 대자 기준 한 칸 (제목 ↔ 본문, 블록 사이) */
export function blankLarge() {
  return { text: "", className: t.large };
}

/** 소 간격 한 칸 (라벨 ↔ 제목, 연/문단 사이) */
export function blankSoft() {
  return "";
}
