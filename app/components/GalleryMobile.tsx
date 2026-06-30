"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import type { Project } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";

export function GalleryMobile({ projects }: { projects: Project[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cards = Array.from(container.querySelectorAll<HTMLElement>(".gallery-card-wrap"));

    if (reduceMotion) {
      cards.forEach((card) => gsap.set(card, { y: 0, opacity: 1 }));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          gsap.to(entry.target, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" });
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [projects]);

  return (
    <div className="gallery-mobile SP md:hidden" ref={containerRef}>
      {projects.map((project) => (
        <div className="gallery-card-wrap" key={project.title}>
          <ProjectCard project={project} />
        </div>
      ))}
    </div>
  );
}
