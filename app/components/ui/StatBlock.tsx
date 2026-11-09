"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import type { BusinessStat } from "@/data/businesses";

// Animates a leading numeric value (e.g. "5", "100%") from 0 up when it first
// scrolls into view. Non-numeric values (e.g. "Owner & builder") are left as
// plain static text — nothing to count, nothing invented.
function StatValue({ value }: { value: string }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
    if (!match) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const target = parseFloat(match[1]);
    const suffix = match[2];
    const decimals = match[1].includes(".") ? match[1].split(".")[1].length : 0;

    el.textContent = `0${suffix}`;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();
        const counter = { n: 0 };
        gsap.to(counter, {
          n: target,
          duration: 1.1,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = `${counter.n.toFixed(decimals)}${suffix}`;
          },
        });
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return <dd ref={ref}>{value}</dd>;
}

export function StatBlock({ stats }: { stats: BusinessStat[] }) {
  return (
    <dl className="chapter-stats">
      {stats.map((stat) => (
        <div key={stat.label} className="stat-block">
          <dt>{stat.label}</dt>
          <StatValue value={stat.value} />
        </div>
      ))}
    </dl>
  );
}
