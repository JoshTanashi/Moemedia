"use client";

import { useEffect, useRef, useState } from "react";
import { projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";

const PRELOAD_COUNT = 4;
const FINISH_DELAY = 400;
const HIDE_TRANSITION = 2000;

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
  const featuredRef = useRef<HTMLDivElement>(null);
  const [featuredVisible, setFeaturedVisible] = useState(false);
  const [unmounted, setUnmounted] = useState(false);

  useEffect(() => {
    let cancelled = false;

    requestAnimationFrame(() => {
      if (!cancelled) setFeaturedVisible(true);
    });

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
      const featured = featuredRef.current;
      if (!screen || !featured) return;

      featured.classList.add("is-finish");

      window.setTimeout(() => {
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
      <div ref={featuredRef} className={`loading-featured ${featuredVisible ? "is-visible" : ""}`}>
        <ProjectCard project={projects[0]} eager />
        <span className="loading-spinner" />
      </div>
    </div>
  );
}
