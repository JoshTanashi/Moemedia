"use client";

import { useEffect } from "react";

// Sets --moe (0 → 1) to how far the nav has travelled into Moe's dark
// section, so the nav blends with the sunset/sunrise bridges beneath it.
export function MoeMode({ targetId = "moe" }: { targetId?: string }) {
  useEffect(() => {
    const section = document.getElementById(targetId);
    const into = section?.querySelector<HTMLElement>(".moe-bridge--in");
    const outOf = section?.querySelector<HTMLElement>(".moe-bridge--out");
    const nav = document.querySelector<HTMLElement>(".nav");
    if (!into || !outOf || !nav) return;
    const root = document.documentElement;
    const clamp = (n: number) => Math.min(1, Math.max(0, n));
    let frame = 0;

    const update = () => {
      frame = 0;
      const line = nav.offsetHeight;
      const a = into.getBoundingClientRect();
      const b = outOf.getBoundingClientRect();
      const entering = clamp((line - a.top) / a.height);
      const leaving = 1 - clamp((line - b.top) / b.height);
      root.style.setProperty("--moe", Math.min(entering, leaving).toFixed(3));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      root.style.removeProperty("--moe");
    };
  }, [targetId]);

  return null;
}
