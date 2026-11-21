"use client";

import { useEffect, useRef } from "react";

// One-time fade-up on first view. Content is visible by default; the
// hidden state is only applied once JS confirms motion is allowed.
export function Reveal({
  children,
  className = "",
  as: Tag = "div",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "article";
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) return;
    el.classList.add("reveal-pending");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("reveal-in");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref as React.Ref<HTMLDivElement>} className={className} id={id}>
      {children}
    </Tag>
  );
}
