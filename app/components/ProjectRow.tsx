"use client";

import { useState } from "react";
import type { Project } from "@/data/projects";

export function ProjectRow({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const [thumbY, setThumbY] = useState(0);

  return (
    <li
      data-row
      className="group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setThumbY(e.clientY - rect.top);
      }}
    >
      {/* Mobile: thumb + title always visible, no hover state on touch */}
      <a
        href={project.href}
        target="_blank"
        rel="noreferrer noopener"
        className="flex items-center gap-4 py-4 md:hidden"
      >
        <span className="block h-14 w-14 shrink-0 overflow-hidden bg-cream-deep">
          <img
            src={project.thumbnailSrc}
            alt=""
            className="h-full w-full object-cover"
          />
        </span>
        <span className="text-lg font-medium text-ink">{project.title}</span>
      </a>

      {/* Desktop: text-only row, thumbnail floats in on hover */}
      <a
        href={project.href}
        target="_blank"
        rel="noreferrer noopener"
        className="hidden items-baseline justify-between gap-6 py-7 md:flex"
      >
        <span className="text-3xl font-medium tracking-tight text-ink transition-colors duration-300 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:text-accent md:text-4xl">
          {project.title}
        </span>
        <span className="text-sm tracking-widest text-ink-soft">
          {String(index + 1).padStart(2, "0")}
        </span>
      </a>

      <div
        aria-hidden
        className="pointer-events-none absolute right-[14%] hidden w-44 overflow-hidden bg-cream-deep md:block"
        style={{
          top: thumbY,
          transform: "translateY(-50%)",
          height: hovered ? 140 : 0,
          opacity: hovered ? 1 : 0,
          transition:
            "opacity 200ms ease, height 650ms cubic-bezier(0.19, 1, 0.22, 1)",
        }}
      >
        <img
          src={project.thumbnailSrc}
          alt=""
          className="h-[140px] w-full object-cover"
        />
      </div>
    </li>
  );
}
