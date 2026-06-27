"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Project } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

export function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    tl.fromTo(
      el,
      { rotateX: 28, scale: 0.84, opacity: 0.4 },
      { rotateX: 0, scale: 1, opacity: 1, ease: "none", duration: 0.5 },
    ).to(el, {
      rotateX: -16,
      scale: 0.88,
      opacity: 0.55,
      ease: "none",
      duration: 0.5,
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <li className="px-1 py-6 md:px-0 md:py-10">
      <a
        href={project.href}
        target="_blank"
        rel="noreferrer noopener"
        className="block"
      >
        <div
          ref={cardRef}
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
}
