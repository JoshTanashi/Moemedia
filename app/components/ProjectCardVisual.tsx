import { forwardRef } from "react";
import type { Project } from "@/data/projects";

export const ProjectCardVisual = forwardRef<HTMLDivElement, { project: Project }>(
  function ProjectCardVisual({ project }, ref) {
    return (
      <li className="px-1 py-6 md:px-0 md:py-3">
        <a
          href={project.href}
          target="_blank"
          rel="noreferrer noopener"
          className="block"
        >
          <div
            ref={ref}
            className="origin-bottom will-change-transform"
            style={{ transformOrigin: "50% 100%" }}
          >
            <div className="flex items-center justify-between border border-line bg-cream-deep/60 px-5 py-3.5">
              <span className="text-base font-medium tracking-tight text-ink md:text-lg">
                {project.title}
              </span>
              <span className="text-sm tracking-widest text-ink-soft">↗</span>
            </div>
            <div className="aspect-[4/3] w-full overflow-hidden border border-t-0 border-line bg-cream-deep md:aspect-[16/9]">
              <img
                src={project.thumbnailSrc}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </a>
      </li>
    );
  },
);
