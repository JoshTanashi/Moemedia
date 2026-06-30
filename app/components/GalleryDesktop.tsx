"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import type { Project } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";

const COLUMN_SPEEDS = [1.2, 0.82, 1.2, 0.82];
const CARDS_PER_COLUMN = 9;
const COPIES = 3;
const PAN_RANGE = 0.08;

function buildColumn(projects: Project[], colIndex: number, count: number) {
  const out: Project[] = [];
  for (let i = 0; i < count; i++) {
    out.push(projects[(colIndex * 3 + i) % projects.length]);
  }
  return out;
}

export function GalleryDesktop({ projects }: { projects: Project[] }) {
  const columnRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rowRef = useRef<HTMLDivElement>(null);
  const cycleHeights = useRef<number[]>([0, 0, 0, 0]);
  const lastWrapped = useRef<number[]>([0, 0, 0, 0]);
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

    const columnSetters = columnRefs.current.map((col) =>
      col ? gsap.quickTo(col, "y", { duration: 0.6, ease: "power3.out" }) : null,
    );

    const applyColumn = (i: number) => {
      const col = columnRefs.current[i];
      const cycle = cycleHeights.current[i];
      const setter = columnSetters[i];
      if (!col || !setter || cycle <= 0) return;
      const raw = scrollProgress.current * COLUMN_SPEEDS[i];
      const wrapped = ((raw % cycle) + cycle) % cycle;
      const prev = lastWrapped.current[i];
      if (Math.abs(wrapped - prev) > cycle / 2) {
        gsap.set(col, { y: -wrapped });
      } else {
        setter(-wrapped);
      }
      lastWrapped.current[i] = wrapped;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      scrollProgress.current += e.deltaY;
      for (let i = 0; i < COLUMN_SPEEDS.length; i++) applyColumn(i);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    const rowEl = rowRef.current;
    const panX = rowEl ? gsap.quickTo(rowEl, "x", { duration: 0.8, ease: "power3.out" }) : null;

    const handleMouseMove = (e: MouseEvent) => {
      if (!panX) return;
      const normalized = e.clientX / window.innerWidth - 0.5;
      panX(-normalized * 2 * PAN_RANGE * window.innerWidth);
    };
    window.addEventListener("mousemove", handleMouseMove);

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
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("app:ready", handleReady);
    };
  }, [projects]);

  return (
    <div className="gallery-pc PC hidden md:block">
      <div className="gallery-row" ref={rowRef}>
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
