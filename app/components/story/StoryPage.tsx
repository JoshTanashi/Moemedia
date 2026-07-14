"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Business } from "@/data/businesses";
import { Prologue } from "./Prologue";
import { ChapterSection } from "./ChapterSection";
import { RekenCaseStudy } from "./RekenCaseStudy";
import { Epilogue } from "./Epilogue";
import { ChapterRail } from "./ChapterRail";

const BRAND = "#00cfa7";

function prepareDrawPaths(scope: Element): SVGPathElement[] {
  const paths = Array.from(scope.querySelectorAll<SVGPathElement>("[data-draw]"));
  paths.forEach((path) => {
    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;
  });
  return paths;
}

export function StoryPage({ businesses }: { businesses: Business[] }) {
  const rootRef = useRef<HTMLDivElement>(null);

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
        // Reduced motion: no hidden states are ever applied, so the page
        // simply renders complete and static.
        if (reduce) return;

        const cleanups: Array<() => void> = [];

        /* ---- Prologue entrance (waits for the loading screen) ---- */
        const prologue = root.querySelector("[data-prologue]");
        if (prologue) {
          const heroLines = prologue.querySelectorAll(".hero-line > span");
          const eyebrow = prologue.querySelector(".eyebrow");
          const sub = prologue.querySelector(".prologue-sub");
          const cue = prologue.querySelector(".scroll-cue");
          const cueArrow = cue?.querySelector("svg") ?? null;
          const underline = prepareDrawPaths(prologue);

          gsap.set(heroLines, { yPercent: 130 });
          gsap.set([eyebrow, sub, cue], { autoAlpha: 0, y: 16 });

          const intro = gsap
            .timeline({ paused: true })
            .to(eyebrow, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" })
            .to(
              heroLines,
              { yPercent: 0, duration: 1, ease: "expo.out", stagger: 0.09 },
              "-=0.3",
            )
            .to(underline, { strokeDashoffset: 0, duration: 0.7, ease: "power2.inOut" }, "-=0.5")
            .to(sub, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.5")
            .to(cue, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.35")
            .call(() => {
              if (cueArrow) {
                gsap.to(cueArrow, {
                  y: 6,
                  duration: 0.9,
                  repeat: -1,
                  yoyo: true,
                  ease: "sine.inOut",
                });
              }
            });

          const playIntro = () => intro.play();
          if (document.body.classList.contains("is-show")) {
            playIntro();
          } else {
            window.addEventListener("app:ready", playIntro, { once: true });
            cleanups.push(() => window.removeEventListener("app:ready", playIntro));
          }

          // Gentle drift as the reader leaves the prologue.
          gsap.to(prologue.querySelector("[data-prologue-title]"), {
            y: "-8vh",
            opacity: 0.25,
            ease: "none",
            scrollTrigger: {
              trigger: prologue,
              start: "top top",
              end: "+=60%",
              scrub: true,
            },
          });
        }

        /* ---- Per-section batch reveals ---- */
        root.querySelectorAll("section").forEach((section) => {
          const items = section.querySelectorAll("[data-reveal]");
          if (!items.length) return;
          const strokes = prepareDrawPaths(section);
          gsap.set(items, { autoAlpha: 0, y: 36 });
          const tl = gsap.timeline({
            scrollTrigger: { trigger: section, start: "top 70%" },
          });
          tl.to(items, {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.1,
          });
          if (strokes.length) {
            tl.to(
              strokes,
              { strokeDashoffset: 0, duration: 0.7, ease: "power2.inOut" },
              "-=0.4",
            );
          }
        });

        /* ---- Chapter accent crossfade + rail ---- */
        const railDots = root.querySelectorAll<HTMLElement>("[data-rail-dot]");
        const setAccentWorld = (accent: string, railSlug?: string) => {
          gsap.to(root, {
            "--chapter-accent": accent,
            duration: 0.6,
            ease: "power2.out",
          });
          railDots.forEach((dot) => {
            dot.classList.toggle("is-active", dot.dataset.railDot === railSlug);
          });
        };

        const accentZones: Array<{ el: Element; accent: string; rail?: string }> = [];
        if (prologue) accentZones.push({ el: prologue, accent: BRAND });
        root.querySelectorAll<HTMLElement>("[data-chapter]").forEach((section) => {
          accentZones.push({
            el: section,
            accent: section.dataset.accent ?? BRAND,
            rail: section.dataset.rail,
          });
        });
        accentZones.forEach(({ el, accent, rail }) => {
          ScrollTrigger.create({
            trigger: el,
            start: "top 55%",
            end: "bottom 55%",
            onToggle: (self) => {
              if (self.isActive) setAccentWorld(accent, rail);
            },
          });
        });

        /* ---- Reken proof sequence ---- */
        const reken = root.querySelector("#reken");
        if (reken) {
          const proofs = reken.querySelectorAll(".proof-line");
          const rule = reken.querySelector("[data-rule]");
          gsap.set(rule, { scaleX: 0 });

          if (isDesktop) {
            // The page's single pinned moment: proof lines take the stage
            // one at a time while the gold rule draws across.
            gsap.set(proofs, { opacity: 0.18 });
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: reken,
                start: "top top",
                end: "+=120%",
                pin: true,
                scrub: 1,
              },
            });
            tl.to(rule, { scaleX: 1, duration: 1.2, ease: "none" });
            proofs.forEach((proof, i) => {
              tl.to(proof, { opacity: 1, duration: 0.6 }, ">");
              if (i > 0) {
                tl.to(proofs[i - 1], { opacity: 0.35, duration: 0.6 }, "<");
              }
            });
          } else {
            gsap.set(proofs, { autoAlpha: 0, y: 24 });
            gsap
              .timeline({
                scrollTrigger: { trigger: reken, start: "top 65%" },
              })
              .to(rule, { scaleX: 1, duration: 0.8, ease: "power2.inOut" })
              .to(
                proofs,
                { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.12 },
                "-=0.3",
              );
          }
        }

        /* ---- Desktop-only parallax drift ---- */
        if (isDesktop) {
          root.querySelectorAll("[data-chapter]").forEach((section) => {
            const numeral = section.querySelector("[data-numeral]");
            const media = section.querySelector("[data-media]");
            const drift = (target: Element, fromY: number, toY: number) =>
              gsap.fromTo(
                target,
                { y: fromY },
                {
                  y: toY,
                  ease: "none",
                  scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                  },
                },
              );
            if (numeral) drift(numeral, 60, -60);
            if (media) drift(media, 40, -40);
          });
        }

        /* ---- Keep measurements honest after fonts/loader settle ---- */
        const refresh = () => ScrollTrigger.refresh();
        window.addEventListener("app:ready", refresh);
        cleanups.push(() => window.removeEventListener("app:ready", refresh));

        return () => cleanups.forEach((fn) => fn());
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <div ref={rootRef} className="story-root">
      <Prologue />
      {businesses.map((business, index) => (
        <ChapterSection key={business.slug} business={business} index={index} />
      ))}
      <RekenCaseStudy />
      <Epilogue />
      <ChapterRail businesses={businesses} />
    </div>
  );
}
