"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { CARD_TILT_ENTER } from "./cardTilt";
import { useIntroContext } from "./IntroContext";

export { IntroProvider } from "./IntroContext";

const INTRO_CARD_COUNT = 10;

export function IntroPlayer() {
  const ctx = useIntroContext();

  useEffect(() => {
    if (!ctx) return;

    const onScreen = Array.from(ctx.elementsRef.current)
      .map((el) => ({ el, rect: el.getBoundingClientRect() }))
      .filter(({ rect }) => rect.bottom > 0 && rect.top < window.innerHeight && rect.width > 0);
    if (onScreen.length === 0) return;

    const sorted = onScreen
      .sort((a, b) => a.rect.top - b.rect.top)
      .slice(0, INTRO_CARD_COUNT)
      .map(({ el }) => el);

    const phaseA = sorted.filter((_, i) => i % 2 === 0);
    const phaseB = sorted.filter((_, i) => i % 2 === 1);

    let tl: gsap.core.Timeline;
    const gsapCtx = gsap.context(() => {
      tl = gsap.timeline();

      tl.from(
        phaseA,
        {
          yPercent: (i) => gsap.utils.random(140, 220) * (i % 2 === 0 ? 1 : -1),
          rotateX: CARD_TILT_ENTER.rotateX,
          scale: CARD_TILT_ENTER.scale,
          opacity: CARD_TILT_ENTER.opacity,
          duration: 0.9,
          stagger: { each: 0.045 },
        },
        0,
      );

      tl.from(
        phaseB,
        {
          xPercent: (i) => (i % 2 === 0 ? -160 : 160),
          rotateX: 30,
          scale: 0.8,
          opacity: 0.3,
          duration: 0.75,
          stagger: { each: 0.04, from: "center" },
        },
        0.5,
      );
    });

    const interrupt = () => {
      tl.progress(1);
    };

    window.addEventListener("wheel", interrupt, { once: true });
    window.addEventListener("touchstart", interrupt, { once: true });
    window.addEventListener("keydown", interrupt, { once: true });

    return () => {
      window.removeEventListener("wheel", interrupt);
      window.removeEventListener("touchstart", interrupt);
      window.removeEventListener("keydown", interrupt);
      gsapCtx.revert();
    };
  }, [ctx]);

  return null;
}
