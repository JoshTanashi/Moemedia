"use client";

import { useEffect, useRef } from "react";
import type Lenis from "lenis";
import type { Project } from "@/data/projects";
import { ProjectCardVisual } from "./ProjectCardVisual";
import { cardTiltAt } from "./cardTilt";
import { getLenis } from "@/lib/lenis";

const COPIES = 4;

export function DesktopColumn({
  projects,
  speed,
  offsetFraction,
}: {
  projects: Project[];
  speed: number;
  offsetFraction: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const cycleHeightRef = useRef(0);

  const repeated = Array.from({ length: COPIES }, () => projects).flat();

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const measure = () => {
      cycleHeightRef.current = track.scrollHeight / COPIES;
    };
    measure();

    const lenis = getLenis();
    if (!lenis) return;

    const update = (scroll: number) => {
      const cycle = cycleHeightRef.current;
      if (cycle <= 0) return;

      const raw = scroll * speed + offsetFraction * cycle;
      const wrapped = ((raw % cycle) + cycle) % cycle;
      track.style.transform = `translate3d(0, ${-wrapped}px, 0)`;

      const containerHeight = container.clientHeight;
      cardRefs.current.forEach((cardEl) => {
        if (!cardEl) return;
        const cardTop = cardEl.offsetTop - wrapped;
        const cardCenter = cardTop + cardEl.offsetHeight / 2;
        const { rotateX, scale, opacity } = cardTiltAt(cardCenter / containerHeight);
        cardEl.style.transform = `rotateX(${rotateX}deg) scale(${scale})`;
        cardEl.style.opacity = String(opacity);
      });
    };

    update(lenis.scroll);
    const handleScroll = (instance: Lenis) => update(instance.scroll);
    lenis.on("scroll", handleScroll);
    window.addEventListener("resize", measure);

    return () => {
      lenis.off("scroll", handleScroll);
      window.removeEventListener("resize", measure);
    };
  }, [projects, speed, offsetFraction]);

  return (
    <div ref={containerRef} className="relative h-full flex-1 overflow-hidden">
      <ul
        ref={trackRef}
        className="absolute inset-x-0 top-0"
        style={{ transformStyle: "preserve-3d" }}
      >
        {repeated.map((project, i) => (
          <ProjectCardVisual
            key={`${project.title}-${i}`}
            project={project}
            ref={(el) => {
              if (el) cardRefs.current[i] = el;
            }}
          />
        ))}
      </ul>
    </div>
  );
}
