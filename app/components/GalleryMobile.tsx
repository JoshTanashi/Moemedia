"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import type { Project } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";

const LOAD_BATCH = 6;

function pickBatch(pool: Project[], avoid: Project | undefined, count: number) {
  const out: Project[] = [];
  let last = avoid;
  for (let i = 0; i < count; i++) {
    const candidates = pool.filter((p) => p.title !== last?.title);
    const choices = candidates.length > 0 ? candidates : pool;
    const pick = choices[Math.floor(Math.random() * choices.length)];
    out.push(pick);
    last = pick;
  }
  return out;
}

export function GalleryMobile({ projects }: { projects: Project[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const revealObserverRef = useRef<IntersectionObserver | null>(null);
  const revealedRef = useRef<WeakSet<Element>>(new WeakSet());
  const [items, setItems] = useState<Project[]>(projects);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Reveal new cards as they're added, without re-animating ones already shown.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cards = Array.from(container.querySelectorAll<HTMLElement>(".gallery-card-wrap"));
    const unseen = cards.filter((card) => !revealedRef.current.has(card));

    if (reduceMotion) {
      unseen.forEach((card) => {
        gsap.set(card, { y: 0, opacity: 1 });
        revealedRef.current.add(card);
      });
      return;
    }

    if (!revealObserverRef.current) {
      revealObserverRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            gsap.to(entry.target, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" });
            revealObserverRef.current?.unobserve(entry.target);
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
      );
    }

    unseen.forEach((card) => {
      revealObserverRef.current?.observe(card);
      revealedRef.current.add(card);
    });
  }, [items]);

  useEffect(() => () => revealObserverRef.current?.disconnect(), []);

  // Appends a fresh randomized batch as the sentinel nears the viewport.
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const loader = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setItems((prev) => [...prev, ...pickBatch(projects, prev[prev.length - 1], LOAD_BATCH)]);
      },
      { rootMargin: "600px 0px" },
    );
    loader.observe(sentinel);
    return () => loader.disconnect();
  }, [projects]);

  // After 1 s of scroll inactivity, snap the nearest-to-center card to the
  // middle of the screen and auto-load its live preview.
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timer: ReturnType<typeof setTimeout>;

    const snapToNearest = () => {
      const container = containerRef.current;
      if (!container) return;

      const viewportMid = window.innerHeight / 2;
      const cards = Array.from(container.querySelectorAll<HTMLElement>(".gallery-card-wrap"));

      let closest: HTMLElement | null = null;
      let minDist = Infinity;
      for (const card of cards) {
        const rect = card.getBoundingClientRect();
        const dist = Math.abs(rect.top + rect.height / 2 - viewportMid);
        if (dist < minDist) { minDist = dist; closest = card; }
      }

      if (!closest) return;

      const rect = closest.getBoundingClientRect();
      const targetY = window.scrollY + rect.top + rect.height / 2 - viewportMid;
      window.scrollTo({ top: Math.max(0, targetY), behavior: reduceMotion ? "instant" : "smooth" });

      const idx = Number(closest.dataset.itemIndex);
      if (!Number.isNaN(idx)) setActiveIndex(idx);
    };

    const onScroll = () => {
      if (window.innerWidth >= 768) return;
      clearTimeout(timer);
      timer = setTimeout(snapToNearest, 1000);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { clearTimeout(timer); window.removeEventListener("scroll", onScroll); };
  }, []);

  return (
    <div className="gallery-mobile SP md:hidden" ref={containerRef}>
      {items.map((project, i) => (
        <div className="gallery-card-wrap" key={`${project.title}-${i}`} data-item-index={i}>
          <ProjectCard project={project} forceActive={i === activeIndex} />
        </div>
      ))}
      <div ref={sentinelRef} aria-hidden="true" />
    </div>
  );
}
