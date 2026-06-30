"use client";

import { useEffect, useRef } from "react";
import type { Project } from "@/data/projects";

export function ProjectCard({ project, eager = false }: { project: Project; eager?: boolean }) {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = imageRef.current;
    if (!el) return;

    const load = () => {
      const src = el.dataset.image;
      if (!src || el.dataset.loaded) return;
      el.dataset.loaded = "true";
      const img = new Image();
      img.onload = () => {
        el.style.backgroundImage = `url(${src})`;
        requestAnimationFrame(() => {
          el.style.opacity = "1";
        });
      };
      img.src = src;
    };

    if (eager) {
      load();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            load();
            observer.disconnect();
          }
        });
      },
      { rootMargin: "200px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [eager]);

  return (
    <a
      href={project.href}
      target="_blank"
      rel="noreferrer noopener"
      className="browser-card"
    >
      <div className="browser-chrome">
        <span className="browser-dots">
          <i style={{ background: "#FF5F57" }} />
          <i style={{ background: "#FEBC2E" }} />
          <i style={{ background: "#28C840" }} />
        </span>
        <span className="browser-url-pill">
          {project.title} <span className="browser-url-role">— {project.role}</span>
        </span>
      </div>
      <div ref={imageRef} className="browser-image" data-image={project.thumbnailSrc} />
    </a>
  );
}
