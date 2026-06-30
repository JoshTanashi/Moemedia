"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import type { Project } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";

const COLUMN_SPEEDS = [1.0, 0.92, 1.08, 0.96];
const CARDS_PER_COLUMN = 9;
const COPIES = 3;

function buildColumn(projects: Project[], colIndex: number, count: number) {
  const out: Project[] = [];
  for (let i = 0; i < count; i++) {
    out.push(projects[(colIndex * 3 + i) % projects.length]);
  }
  return out;
}

export function GalleryDesktop({ projects }: { projects: Project[] }) {
  const columnRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cycleHeights = useRef<number[]>([0, 0, 0, 0]);
  const scrollProgress = useRef(0);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    if (!media.matches) return;

    const measure = () => {
      columnRefs.current.forEach((col, i) => {
        if (!col) return;
        cycleHeights.current[i] = col.scrollHeight / COPIES;
      });
    };
    measure();
    window.addEventListener("resize", measure);

    const applyColumn = (i: number) => {
      const col = columnRefs.current[i];
      const cycle = cycleHeights.current[i];
      if (!col || cycle <= 0) return;
      const raw = scrollProgress.current * COLUMN_SPEEDS[i];
      const wrapped = ((raw % cycle) + cycle) % cycle;
      gsap.to(col, { y: -wrapped, duration: 0.9, ease: "power3.out", overwrite: true });
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      scrollProgress.current += e.deltaY;
      for (let i = 0; i < COLUMN_SPEEDS.length; i++) applyColumn(i);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    const handleReady = () => {
      gsap.fromTo(
        columnRefs.current.filter(Boolean),
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "expo.out", stagger: 0.1 },
      );
    };
    window.addEventListener("app:ready", handleReady);

    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("app:ready", handleReady);
    };
  }, [projects]);

  return (
    <div className="gallery-pc PC hidden md:block">
      <div className="gallery-row">
        {COLUMN_SPEEDS.map((_, i) => {
          const colProjects = buildColumn(projects, i, CARDS_PER_COLUMN);
          const repeated = Array.from({ length: COPIES }, () => colProjects).flat();
          return (
            <div
              key={i}
              className={`gallery-col ${i % 2 === 0 ? "gallery-col--offset" : ""}`}
              ref={(el) => {
                columnRefs.current[i] = el;
              }}
            >
              {repeated.map((project, j) => (
                <div className="gallery-card-wrap" key={`${project.title}-${i}-${j}`}>
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
