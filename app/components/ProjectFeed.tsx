"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import type Lenis from "lenis";
import type { Project } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { getLenis } from "@/lib/lenis";

export function ProjectFeed({ projects }: { projects: Project[] }) {
  const listRef = useRef<HTMLUListElement>(null);
  const copyHeightRef = useRef(0);

  useLayoutEffect(() => {
    const lenis = getLenis();
    const list = listRef.current;
    if (!lenis || !list) return;

    copyHeightRef.current = list.scrollHeight / 3;
    lenis.scrollTo(copyHeightRef.current, { immediate: true });
  }, [projects]);

  useEffect(() => {
    const lenis = getLenis();
    const list = listRef.current;
    if (!lenis || !list) return;

    const measure = () => {
      copyHeightRef.current = list.scrollHeight / 3;
    };

    const handleResize = () => measure();
    window.addEventListener("resize", handleResize);

    const handleScroll = (instance: Lenis) => {
      const copyHeight = copyHeightRef.current;
      if (copyHeight <= 0) return;
      const scroll = instance.scroll;
      if (scroll >= copyHeight * 2) {
        lenis.scrollTo(scroll - copyHeight, { immediate: true });
      } else if (scroll < copyHeight) {
        lenis.scrollTo(scroll + copyHeight, { immediate: true });
      }
    };

    lenis.on("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      lenis.off("scroll", handleScroll);
    };
  }, [projects]);

  const tripled = [...projects, ...projects, ...projects];

  return (
    <section
      className="w-full px-6 pt-28 pb-24 md:px-10 md:pt-36"
      style={{ perspective: "1000px" }}
    >
      <ul
        ref={listRef}
        className="mx-auto max-w-lg md:max-w-3xl"
        style={{ transformStyle: "preserve-3d" }}
      >
        {tripled.map((project, i) => (
          <ProjectCard key={`${project.title}-${i}`} project={project} />
        ))}
      </ul>
    </section>
  );
}
