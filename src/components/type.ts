/** Shared type scale: 대 / 중 / 소 (대 기준 +2 step) */
export const type = {
  large:
    "text-5xl font-semibold tracking-[-0.04em] text-[var(--ink)] sm:text-6xl",
  medium:
    "text-2xl leading-relaxed tracking-[-0.02em] text-[var(--ink)] sm:text-3xl",
  small: "text-lg leading-relaxed text-[var(--ink-muted)] sm:text-xl",
  smallItalic:
    "text-lg italic leading-relaxed text-[var(--ink-muted)] sm:text-xl",
  label: "text-base tracking-[0.04em] text-[var(--ink-muted)] sm:text-lg",
  labelUnderline:
    "text-base tracking-[0.04em] text-[var(--ink-muted)] underline underline-offset-4 sm:text-lg",
} as const;

export const contentShell = "mx-auto w-full max-w-3xl px-6 sm:px-10";
