"use client";

import { useEffect, useRef, useState } from "react";
import { projects } from "@/data/projects";
import { BrandMark } from "./ui/BrandMark";
import { Wordmark } from "./ui/Wordmark";

const PRELOAD_COUNT = 4;
const FINISH_DELAY = 900; // let the ribbon animation land before releasing
const HIDE_TRANSITION = 800;

function preloadImage(src: string) {
  return new Promise<void>((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });
}

export function LoadingScreen() {
  const screenRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const [unmounted, setUnmounted] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const fontsReady =
      typeof document !== "undefined" && "fonts" in document
        ? document.fonts.ready
        : Promise.resolve();
    const imagesReady = Promise.all(
      projects.slice(0, PRELOAD_COUNT).map((p) => preloadImage(p.thumbnailSrc)),
    );

    Promise.all([fontsReady, imagesReady]).then(() => {
      if (cancelled) return;
      finish();
    });

    function finish() {
      const screen = screenRef.current;
      const brand = brandRef.current;
      if (!screen || !brand) return;

      window.setTimeout(() => {
        brand.classList.add("is-finish");
        screen.classList.add("is-hidden");
        document.body.classList.add("is-show");
        window.dispatchEvent(new CustomEvent("app:ready"));
      }, FINISH_DELAY);

      window.setTimeout(() => {
        if (!cancelled) setUnmounted(true);
      }, FINISH_DELAY + HIDE_TRANSITION);
    }

    return () => {
      cancelled = true;
    };
  }, []);

  if (unmounted) return null;

  return (
    <div ref={screenRef} className="loading-screen" aria-hidden>
      <div ref={brandRef} className="loading-brand">
        <BrandMark className="loading-mark" />
        <Wordmark className="loading-wordmark" />
        <span className="loading-bar" />
      </div>
    </div>
  );
}
