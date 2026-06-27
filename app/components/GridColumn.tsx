"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Project } from "@/data/projects";
import { ProjectThumb } from "./ProjectThumb";

gsap.registerPlugin(ScrollTrigger);

export function GridColumn({
  items,
  speed,
}: {
  items: Project[];
  speed: number;
}) {
  const colRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = colRef.current;
    if (!el) return;

    const yDistance = 120 * (speed - 1);

    const tween = gsap.fromTo(
      el,
      { y: 0 },
      {
        y: -yDistance * 4,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [speed]);

  return (
    <div
      ref={colRef}
      className="flex flex-col gap-2 pb-24 will-change-transform md:gap-4 md:pb-32"
    >
      {items.map((item, i) => (
        <ProjectThumb key={`${item.title}-${i}`} project={item} />
      ))}
    </div>
  );
}
