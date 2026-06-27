"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const SMOKE_BLOBS = [
  { size: 460, top: "12%", left: "8%", color: "var(--color-ink-soft)" },
  { size: 520, top: "55%", left: "62%", color: "var(--color-accent)" },
  { size: 380, top: "75%", left: "20%", color: "var(--color-ink-soft)" },
];

export function AmbientBackground() {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const smokeRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const parallax = parallaxRef.current;
    if (!parallax) return;

    const xTo = gsap.quickTo(parallax, "x", { duration: 1.2, ease: "power3.out" });
    const yTo = gsap.quickTo(parallax, "y", { duration: 1.2, ease: "power3.out" });

    const handleMove = (e: MouseEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      xTo(nx * -36);
      yTo(ny * -36);
    };
    window.addEventListener("mousemove", handleMove);

    const smokeTweens = smokeRefs.current.map((el, i) =>
      gsap.to(el, {
        x: i % 2 === 0 ? 50 : -40,
        y: i % 2 === 0 ? -35 : 45,
        duration: 20 + i * 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      }),
    );

    return () => {
      window.removeEventListener("mousemove", handleMove);
      smokeTweens.forEach((tween) => tween.kill());
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {SMOKE_BLOBS.map((blob, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) smokeRefs.current[i] = el;
          }}
          className="absolute rounded-full opacity-[0.1] blur-3xl"
          style={{
            width: blob.size,
            height: blob.size,
            top: blob.top,
            left: blob.left,
            background: `radial-gradient(circle, ${blob.color}, transparent 70%)`,
          }}
        />
      ))}

      <div ref={parallaxRef} className="absolute -inset-24">
        <div
          className="animate-ambient-drift absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "url('/ambient/grid-pattern.svg')",
            backgroundRepeat: "repeat",
            backgroundSize: "64px 64px",
          }}
        />
      </div>
    </div>
  );
}
