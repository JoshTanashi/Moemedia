"use client";

import { useEffect, useRef } from "react";
import type Lenis from "lenis";
import type { Project } from "@/data/projects";
import { DesktopColumn, type DesktopColumnHandle } from "./DesktopColumn";
import { getLenis } from "@/lib/lenis";

const COLUMN_CONFIG = [
  { speed: 0.82, offsetFraction: 0 },
  { speed: 1.22, offsetFraction: 1 / 3 },
  { speed: 1.0, offsetFraction: 2 / 3 },
];

const EDGE_MARGIN = 600;

export function ProjectFeedDesktop({ projects }: { projects: Project[] }) {
  const columnRefs = useRef<(DesktopColumnHandle | null)[]>([]);
  const virtualScrollRef = useRef(0);
  const lastScrollRef = useRef(0);

  useEffect(() => {
    const lenis = getLenis();
    if (!lenis) return;

    const media = window.matchMedia("(min-width: 768px)");
    let active = false;

    const update = (scroll: number) => {
      const delta = scroll - lastScrollRef.current;
      lastScrollRef.current = scroll;
      virtualScrollRef.current += delta;

      columnRefs.current.forEach((col) => col?.applyOffset(virtualScrollRef.current));

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= EDGE_MARGIN * 2) return;

      if (scroll < EDGE_MARGIN) {
        const target = scroll + maxScroll / 2;
        lastScrollRef.current = target;
        lenis.scrollTo(target, { immediate: true });
      } else if (scroll > maxScroll - EDGE_MARGIN) {
        const target = scroll - maxScroll / 2;
        lastScrollRef.current = target;
        lenis.scrollTo(target, { immediate: true });
      }
    };

    const handleScroll = (instance: Lenis) => {
      if (!active) return;
      update(instance.scroll);
    };

    const activate = () => {
      active = true;
      lastScrollRef.current = lenis.scroll;
      update(lenis.scroll);
    };

    const handleMediaChange = () => {
      if (media.matches) activate();
      else active = false;
    };

    if (media.matches) activate();
    media.addEventListener("change", handleMediaChange);
    lenis.on("scroll", handleScroll);

    return () => {
      media.removeEventListener("change", handleMediaChange);
      lenis.off("scroll", handleScroll);
    };
  }, [projects]);

  return (
    <section className="relative hidden h-[1000vh] md:block">
      <div className="sticky top-0 h-screen overflow-hidden bg-cream">
        <div
          className="absolute flex gap-10 px-20 py-16"
          style={{
            top: "-12%",
            left: "-10%",
            width: "120%",
            height: "124%",
            transform: "rotate(5deg)",
            transformOrigin: "70% 10%",
            perspective: "500px",
          }}
        >
          {COLUMN_CONFIG.map((cfg, i) => (
            <DesktopColumn
              key={i}
              ref={(el) => {
                columnRefs.current[i] = el;
              }}
              projects={projects}
              speed={cfg.speed}
              offsetFraction={cfg.offsetFraction}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
