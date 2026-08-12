type LogoProps = {
  size?: "hero" | "footer";
};

export function Logo({ size = "hero" }: LogoProps) {
  const symbolClass =
    size === "hero"
      ? "text-5xl font-semibold tracking-tighter sm:text-6xl"
      : "text-base tracking-tight";
  const wordClass =
    size === "hero"
      ? "text-5xl font-semibold tracking-[-0.04em] sm:text-6xl"
      : "text-sm font-semibold tracking-[-0.04em]";

  return (
    <div className="flex flex-col items-start gap-0 leading-[1.15]">
      <span
        className={`text-[var(--ink)] ${symbolClass}`}
        aria-label="logUs symbol"
      >
        [<span className="colon-blink">:</span>]
      </span>
      <span className={`text-[var(--ink)] ${wordClass}`}>logUs Studio</span>
    </div>
  );
}
