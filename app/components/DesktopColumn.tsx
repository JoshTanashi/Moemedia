"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import type { Project } from "@/data/projects";
import { ProjectCardVisual } from "./ProjectCardVisual";
import { cardTiltAt } from "./cardTilt";

const COPIES = 4;

export type DesktopColumnHandle = {
  applyOffset: (virtualScroll: number) => void;
};

export const DesktopColumn = forwardRef<
  DesktopColumnHandle,
  { projects: Project[]; speed: number; offsetFraction: number }
>(function DesktopColumn({ projects, speed, offsetFraction }, ref) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const cycleHeightRef = useRef(0);

  const repeated = Array.from({ length: COPIES }, () => projects).flat();

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      cycleHeightRef.current = track.scrollHeight / COPIES;
    };
    measure();

    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [projects]);

  useImperativeHandle(
    ref,
    () => ({
      applyOffset(virtualScroll: number) {
        const track = trackRef.current;
        const container = containerRef.current;
        const cycle = cycleHeightRef.current;
        if (!track || !container || cycle <= 0) return;

        const raw = virtualScroll * speed + offsetFraction * cycle;
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
      },
    }),
    [speed, offsetFraction],
  );

  return (
    <div
      ref={containerRef}
      className="relative h-full flex-1 overflow-hidden"
      style={{ transformStyle: "preserve-3d" }}
    >
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
});
