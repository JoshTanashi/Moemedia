// Hand-authored SVG strokes — the paths wobble on purpose. They are drawn
// (stroke-dashoffset) by GSAP where motion is allowed, and render complete
// otherwise, so every variant must look finished as a static stroke.

type StrokeProps = {
  className?: string;
};

export function UnderlineStroke({ className = "" }: StrokeProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 220 14"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        className="hand-drawn"
        data-draw
        d="M3 9.5 C 38 5.5, 74 4, 108 6.5 C 142 9, 172 10.5, 216 6 M 14 12 C 52 9.5, 96 8.5, 138 10"
      />
    </svg>
  );
}

export function CircleScribble({ className = "" }: StrokeProps) {
  return (
    <svg className={className} viewBox="0 0 240 90" preserveAspectRatio="none" aria-hidden>
      <path
        className="hand-drawn"
        data-draw
        d="M120 8 C 46 4, 8 22, 10 46 C 12 72, 62 86, 124 84 C 188 82, 232 66, 230 42 C 228 18, 172 4, 96 9 C 72 11, 50 16, 36 22"
      />
    </svg>
  );
}

export function ArrowDown({ className = "" }: StrokeProps) {
  return (
    <svg className={className} viewBox="0 0 36 44" aria-hidden>
      <path
        className="hand-drawn"
        data-draw
        d="M16 3 C 19 12, 21 22, 19.5 37 M 9 29 C 12.5 32.5, 16.5 36.5, 19.5 39.5 C 22.5 35, 26 31.5, 29.5 28.5"
      />
    </svg>
  );
}

export function ArrowLoop({ className = "" }: StrokeProps) {
  return (
    <svg className={className} viewBox="0 0 64 40" aria-hidden>
      <path
        className="hand-drawn"
        data-draw
        d="M4 30 C 14 12, 28 6, 36 12 C 43 17, 38 26, 31 24 C 24 22, 28 12, 40 11 C 48 10.5, 55 14, 60 19 M 52 12 C 55 14.5, 58 17, 60.5 19.5 C 57.5 21, 54 23, 51.5 25.5"
      />
    </svg>
  );
}
