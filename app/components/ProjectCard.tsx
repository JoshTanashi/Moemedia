"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Project } from "@/data/projects";
import { ProjectCardVisual } from "./ProjectCardVisual";
import { CARD_TILT_ENTER, CARD_TILT_EXIT } from "./cardTilt";
import { useIntroContext } from "./IntroContext";

gsap.registerPlugin(ScrollTrigger);

export function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const introCtx = useIntroContext();
  const unregisterRef = useRef<(() => void) | null>(null);

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
      { rotateX: CARD_TILT_ENTER.rotateX, scale: CARD_TILT_ENTER.scale, opacity: CARD_TILT_ENTER.opacity },
      { rotateX: 0, scale: 1, opacity: 1, ease: "none", duration: 0.5 },
    ).to(el, {
      rotateX: CARD_TILT_EXIT.rotateX,
      scale: CARD_TILT_EXIT.scale,
      opacity: CARD_TILT_EXIT.opacity,
      ease: "none",
      duration: 0.5,
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <ProjectCardVisual
      project={project}
      ref={cardRef}
      introRef={(el) => {
        unregisterRef.current?.();
        unregisterRef.current = el ? introCtx?.register(el) ?? null : null;
      }}
    />
  );
}
