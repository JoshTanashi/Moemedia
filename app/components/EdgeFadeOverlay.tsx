type Props = {
  side: "top" | "bottom";
  variant?: "absolute" | "fixed";
  className?: string;
};

export function EdgeFadeOverlay({ side, variant = "absolute", className }: Props) {
  const gradient =
    side === "top"
      ? "linear-gradient(to bottom, var(--color-cream) 0%, var(--color-cream) 8%, transparent 100%)"
      : "linear-gradient(to top, var(--color-cream) 0%, var(--color-cream) 8%, transparent 100%)";

  return (
    <div
      aria-hidden
      className={`pointer-events-none ${variant} inset-x-0 z-10 ${side === "top" ? "top-0" : "bottom-0"} h-28 md:h-36 ${className ?? ""}`}
      style={{ background: gradient }}
    />
  );
}
