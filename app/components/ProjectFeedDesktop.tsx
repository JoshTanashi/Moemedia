"use client";

import type { Project } from "@/data/projects";
import { DesktopColumn } from "./DesktopColumn";

const COLUMN_CONFIG = [
  { speed: 0.82, offsetFraction: 0 },
  { speed: 1.22, offsetFraction: 1 / 3 },
  { speed: 1.0, offsetFraction: 2 / 3 },
];

export function ProjectFeedDesktop({ projects }: { projects: Project[] }) {
  return (
    <section className="relative hidden h-[400vh] md:block">
      <div className="sticky top-0 h-screen overflow-hidden bg-cream">
        <div
          className="absolute flex gap-10 px-20 py-16"
          style={{
            top: "-12%",
            left: "-10%",
            width: "120%",
            height: "124%",
            transform: "rotate(5deg)",
            transformOrigin: "70% 10%",
            perspective: "900px",
          }}
        >
          {COLUMN_CONFIG.map((cfg, i) => (
            <DesktopColumn
              key={i}
              projects={projects}
              speed={cfg.speed}
              offsetFraction={cfg.offsetFraction}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
