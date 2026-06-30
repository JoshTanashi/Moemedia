"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import type { Project } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";

const COLUMN_SPEEDS = [1.2, 0.82, 1.2, 0.82];
const CARDS_PER_COLUMN = 9;
const COPIES = 3;
const PAN_RANGE = 0.08;
const SCROLL_LERP = 0.12;
const MAX_WHEEL_DELTA = 120;

function buildColumn(projects: Project[], colIndex: number, count: number) {
  const out: Project[] = [];
  for (let i = 0; i < count; i++) {
    out.push(projects[(colIndex * 3 + i) % projects.length]);
  }
  return out;
}

function pickReplacement(pool: Project[], exclude: Set<string>) {
  const candidates = pool.filter((p) => !exclude.has(p.title));
  const choices = candidates.length > 0 ? candidates : pool;
  return choices[Math.floor(Math.random() * choices.length)];
}

export function GalleryDesktop({ projects }: { projects: Project[] }) {
  const columnRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rowRef = useRef<HTMLDivElement>(null);
  const cycleHeights = useRef<number[]>([0, 0, 0, 0]);
  const displayedRaw = useRef<number[]>([0, 0, 0, 0]);
  const scrollProgress = useRef(0);

  const [columns, setColumns] = useState<Project[][]>(() =>
    COLUMN_SPEEDS.map((_, i) => buildColumn(projects, i, CARDS_PER_COLUMN)),
  );

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    if (!media.matches) return;

    const measure = () => {
      columnRefs.current.forEach((col, i) => {
        if (!col) return;
        cycleHeights.current[i] = col.scrollHeight / COPIES;
      });
    };
    measure();
    window.addEventListener("resize", measure);

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = Math.max(-MAX_WHEEL_DELTA, Math.min(MAX_WHEEL_DELTA, e.deltaY));
      scrollProgress.current += delta;
    };
    window.addEventListener("wheel", handleWheel, { passive: false });

    // The column scroll is driven entirely by this rAF loop: target/displayed
    // positions live in continuous (unbounded) space and are lerped there,
    // with `% cycle` wrapping applied only at the final DOM write. That keeps
    // every written frame visually seamless (content repeats every `cycle`
    // px) and avoids the jump/rebound glitch you get from snapping a value
    // that a GSAP tween is still actively interpolating toward.
    let rafId = 0;
    const tick = () => {
      for (let i = 0; i < COLUMN_SPEEDS.length; i++) {
        const col = columnRefs.current[i];
        const cycle = cycleHeights.current[i];
        if (!col || cycle <= 0) continue;
        const target = scrollProgress.current * COLUMN_SPEEDS[i];
        displayedRaw.current[i] += (target - displayedRaw.current[i]) * SCROLL_LERP;
        if (!gsap.isTweening(col)) {
          const wrapped = ((displayedRaw.current[i] % cycle) + cycle) % cycle;
          gsap.set(col, { y: -wrapped });
        }
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const rowEl = rowRef.current;
    const panX = rowEl ? gsap.quickTo(rowEl, "x", { duration: 0.8, ease: "power3.out" }) : null;

    const handleMouseMove = (e: MouseEvent) => {
      if (!panX) return;
      const normalized = e.clientX / window.innerWidth - 0.5;
      panX(-normalized * 2 * PAN_RANGE * window.innerWidth);
    };
    window.addEventListener("mousemove", handleMouseMove);

    const handleReady = () => {
      gsap.fromTo(
        columnRefs.current.filter(Boolean),
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "expo.out", stagger: 0.1 },
      );
    };
    window.addEventListener("app:ready", handleReady);

    // Cards never resize when their content swaps (fixed image aspect-ratio,
    // single-line title), so reshuffling never invalidates cycleHeights or
    // the wrap math above. A card only swaps once it has fully left the
    // viewport (tracked via `seen`, so cards never visited yet are left
    // alone), so the wrap loop never has to render a swap mid-frame.
    const seen = new WeakSet<Element>();
    const cardEls = rowEl ? Array.from(rowEl.querySelectorAll<HTMLElement>(".gallery-card-wrap")) : [];
    const reshuffleObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            seen.add(entry.target);
            return;
          }
          if (!seen.has(entry.target)) return;

          const el = entry.target as HTMLElement;
          const colIndex = Number(el.dataset.col);
          const slotIndex = Number(el.dataset.slot);
          if (Number.isNaN(colIndex) || Number.isNaN(slotIndex)) return;

          setColumns((prev) => {
            const slotArr = prev[colIndex];
            const total = slotArr.length;
            const before = slotArr[(slotIndex - 1 + total) % total];
            const current = slotArr[slotIndex];
            const after = slotArr[(slotIndex + 1) % total];
            const exclude = new Set([before.title, current.title, after.title]);
            const replacement = pickReplacement(projects, exclude);
            if (replacement.title === current.title) return prev;

            const nextSlotArr = slotArr.slice();
            nextSlotArr[slotIndex] = replacement;
            const next = prev.slice();
            next[colIndex] = nextSlotArr;
            return next;
          });
        });
      },
      { threshold: 0 },
    );
    cardEls.forEach((el) => reshuffleObserver.observe(el));

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", measure);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("app:ready", handleReady);
      reshuffleObserver.disconnect();
    };
  }, [projects]);

  return (
    <div className="gallery-pc PC hidden md:block">
      <div className="gallery-row" ref={rowRef}>
        {COLUMN_SPEEDS.map((_, i) => {
          const repeated = Array.from({ length: COPIES }, () => columns[i]).flat();
          return (
            <div
              key={i}
              className={`gallery-col ${i % 2 === 0 ? "gallery-col--offset" : ""}`}
              ref={(el) => {
                columnRefs.current[i] = el;
              }}
            >
              {repeated.map((project, j) => (
                <div
                  className="gallery-card-wrap"
                  key={`${i}-${j}`}
                  data-col={i}
                  data-slot={j % CARDS_PER_COLUMN}
                >
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
