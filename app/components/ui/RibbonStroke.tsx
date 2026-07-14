"use client";

import { useId } from "react";

// Smooth ribbon strokes echoing the wave mark — the site's connective motif.
// Same data-draw contract as before: StoryPage prepares stroke-dasharray and
// animates strokeDashoffset where motion is allowed; strokes must read
// complete when rendered statically.

type StrokeProps = {
  className?: string;
};

function useBrandStroke() {
  const id = useId();
  const gradientId = `ribbon-${id}`;
  const defs = (
    <defs>
      <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#3ceb8b" />
        <stop offset="55%" stopColor="#00cfa7" />
        <stop offset="100%" stopColor="#00b6e6" />
      </linearGradient>
    </defs>
  );
  return { defs, stroke: `url(#${gradientId})` };
}

export function RibbonUnderline({ className = "" }: StrokeProps) {
  const { defs, stroke } = useBrandStroke();
  return (
    <svg
      className={className}
      viewBox="0 0 220 14"
      preserveAspectRatio="none"
      aria-hidden
    >
      {defs}
      <path
        className="ribbon-stroke"
        data-draw
        stroke={stroke}
        d="M 4 10 C 60 4, 120 3, 216 7"
      />
    </svg>
  );
}

export function RibbonArrowDown({ className = "" }: StrokeProps) {
  const { defs, stroke } = useBrandStroke();
  return (
    <svg className={className} viewBox="0 0 36 44" aria-hidden>
      {defs}
      <path
        className="ribbon-stroke"
        data-draw
        stroke={stroke}
        d="M 18 3 C 18 14, 18 25, 18 37 M 8 28 C 11 31.5, 14.5 35, 18 38.5 C 21.5 35, 25 31.5, 28 28"
      />
    </svg>
  );
}

export function RibbonSwoosh({ className = "" }: StrokeProps) {
  const { defs, stroke } = useBrandStroke();
  return (
    <svg className={className} viewBox="0 0 64 40" aria-hidden>
      {defs}
      <path
        className="ribbon-stroke"
        data-draw
        stroke={stroke}
        d="M 4 32 C 18 14, 40 10, 60 20 M 50 12 C 53.5 14.5, 57 17, 60.5 20 C 57 22.5, 53.5 25, 50 27.5"
      />
    </svg>
  );
}
