"use client";

import { memo, useEffect, useRef, useState } from "react";
import type { Project } from "@/data/projects";

export const ProjectCard = memo(function ProjectCard({
  project,
  eager = false,
  forceActive = false,
}: {
  project: Project;
  eager?: boolean;
  forceActive?: boolean;
}) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [iframeSrc, setIframeSrc] = useState<string | null>(null);
  const hasLiveUrl = project.href !== "#";

  // Keep --preview-scale in sync with the card's actual rendered width so the
  // iframe (rendered at 1280px) scales down to fill the card precisely.
  useEffect(() => {
    const card = cardRef.current;
    if (!card || !hasLiveUrl) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0].contentRect.width;
      card.style.setProperty("--preview-scale", String(w / 1280));
    });
    ro.observe(card);
    return () => ro.disconnect();
  }, [hasLiveUrl]);

  // Mobile: auto-load preview when this card is snapped to center.
  useEffect(() => {
    if (forceActive && hasLiveUrl && !iframeSrc) setIframeSrc(project.href);
  }, [forceActive, hasLiveUrl, iframeSrc, project.href]);

  useEffect(() => {
    const el = imageRef.current;
    if (!el) return;

    el.dataset.loaded = "";
    el.style.opacity = "0";

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
  }, [eager, project.thumbnailSrc]);

  return (
    <a
      ref={cardRef}
      href={project.href}
      target="_blank"
      rel="noreferrer noopener"
      className={`browser-card${forceActive ? " browser-card--active" : ""}`}
      onMouseEnter={() => {
        if (hasLiveUrl && !iframeSrc) setIframeSrc(project.href);
      }}
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
      <div className="browser-body">
        <div ref={imageRef} className="browser-image" data-image={project.thumbnailSrc} />
        {iframeSrc && (
          <iframe
            src={iframeSrc}
            className="browser-preview"
            title={project.title}
            tabIndex={-1}
          />
        )}
      </div>
    </a>
  );
});
