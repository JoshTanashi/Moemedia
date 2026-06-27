"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Project } from "@/data/projects";
import { ProjectRow } from "./ProjectRow";

gsap.registerPlugin(ScrollTrigger);

export function ProjectList({ projects }: { projects: Project[] }) {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const rows = listRef.current?.querySelectorAll("[data-row]");
    if (!rows || rows.length === 0) return;

    gsap.set(rows, { opacity: 0, y: 24 });

    const triggers = ScrollTrigger.batch(rows, {
      start: "top 90%",
      once: true,
      onEnter: (batch) =>
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "expo.out",
          stagger: 0.08,
        }),
    });

    return () => triggers.forEach((t) => t.kill());
  }, [projects]);

  return (
    <section className="w-full px-6 pt-28 pb-24 md:px-10 md:pt-36">
      <ul ref={listRef} className="mx-auto max-w-4xl divide-y divide-line">
        {projects.map((project, i) => (
          <ProjectRow key={project.title} project={project} index={i} />
        ))}
      </ul>
    </section>
  );
}
