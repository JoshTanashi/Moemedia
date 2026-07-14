"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { Eyebrow } from "./ui/Eyebrow";

const IDLE_DELAY = 700;

export function WorkGallery() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Split into two columns for the staggered-wall look on desktop;
  // mobile renders the flat list in source order.
  const left = projects.filter((_, i) => i % 2 === 0);
  const right = projects.filter((_, i) => i % 2 === 1);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = rootRef.current;
    if (!root) return;

    const mm = gsap.matchMedia(root);

    mm.add(
      {
        reduce: "(prefers-reduced-motion: reduce)",
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)",
      },
      (ctx) => {
        const { reduce, isDesktop } = ctx.conditions as {
          reduce: boolean;
          isDesktop: boolean;
        };
        if (reduce) return;

        const cards = root.querySelectorAll(".gallery-card-wrap");
        gsap.set(cards, { autoAlpha: 0, y: 48 });
        ScrollTrigger.batch(cards, {
          start: "top 85%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              duration: 0.9,
              stagger: 0.08,
              ease: "power3.out",
            }),
        });

        if (isDesktop) {
          // Echo of the old auto-scrolling wall: the two columns drift at
          // different speeds under plain native scrolling.
          const cols = root.querySelectorAll(".work-col");
          const speeds = [-60, -20];
          cols.forEach((col, i) => {
            gsap.to(col, {
              y: speeds[i] ?? 0,
              ease: "none",
              scrollTrigger: {
                trigger: root,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
              },
            });
          });
        }
      },
    );

    return () => mm.revert();
  }, []);

  // Mobile: after scrolling settles, activate the live preview of the card
  // nearest the viewport center — without ever moving the page itself.
  useEffect(() => {
    if (window.matchMedia("(min-width: 768px)").matches) return;
    const root = rootRef.current;
    if (!root) return;

    let idleTimer = 0;
    const onScroll = () => {
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        const cards = root.querySelectorAll<HTMLElement>("[data-card-index]");
        const mid = window.innerHeight / 2;
        let best: { index: number; dist: number } | null = null;
        cards.forEach((card) => {
          const rect = card.getBoundingClientRect();
          if (rect.bottom < 0 || rect.top > window.innerHeight) return;
          const dist = Math.abs(rect.top + rect.height / 2 - mid);
          const index = Number(card.dataset.cardIndex);
          if (!best || dist < best.dist) best = { index, dist };
        });
        if (best) setActiveIndex((best as { index: number }).index);
      }, IDLE_DELAY);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(idleTimer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const renderCard = (index: number) => {
    const project = projects[index];
    return (
      <div key={project.title} className="gallery-card-wrap" data-card-index={index}>
        <ProjectCard project={project} forceActive={activeIndex === index} />
      </div>
    );
  };

  return (
    <div ref={rootRef} className="work-page">
      <header className="work-intro">
        <Eyebrow>Selected Work</Eyebrow>
        <h1 className="work-title font-display">
          Things you can <span className="text-gradient">click</span>.
        </h1>
        <p className="work-sub">
          Every card below is a real window — hover or pause on one and the
          live site loads inside it. No mockups, no still frames.
        </p>
      </header>
      {/* Mobile: flat list. Desktop: two drifting columns. */}
      <div className="work-grid md:hidden">
        {projects.map((_, i) => renderCard(i))}
      </div>
      <div className="work-grid hidden md:grid">
        <div className="work-col">{left.map((p) => renderCard(projects.indexOf(p)))}</div>
        <div className="work-col work-col--offset">
          {right.map((p) => renderCard(projects.indexOf(p)))}
        </div>
      </div>
    </div>
  );
}
