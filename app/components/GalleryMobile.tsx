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

  // Appends a fresh randomized batch as the sentinel nears the viewport,
  // so the feed never runs out instead of stopping at the real project list.
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

  return (
    <div className="gallery-mobile SP md:hidden" ref={containerRef}>
      {items.map((project, i) => (
        <div className="gallery-card-wrap" key={`${project.title}-${i}`}>
          <ProjectCard project={project} />
        </div>
      ))}
      <div ref={sentinelRef} aria-hidden="true" />
    </div>
  );
}
