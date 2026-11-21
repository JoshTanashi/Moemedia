"use client";

import { useEffect } from "react";

// Flips the page into Moe's dark theme while the Moe section owns the screen.
export function MoeMode({ targetId = "moe" }: { targetId?: string }) {
  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;
    const root = document.documentElement;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) root.dataset.theme = "moe";
        else delete root.dataset.theme;
      },
      // A thin trigger line 25% down the screen: flips once Moe is clearly the focus.
      { rootMargin: "-25% 0px -75% 0px" },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      delete root.dataset.theme;
    };
  }, [targetId]);

  return null;
}
