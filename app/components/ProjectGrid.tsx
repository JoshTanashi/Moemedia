"use client";

import { useEffect, useState } from "react";
import type { Project } from "@/data/projects";
import { GridColumn } from "./GridColumn";

const SPEEDS = [1, 1.35, 0.85, 1.15];
const DESKTOP_COLUMNS = 4;
const MOBILE_COLUMNS = 2;
const BREAKPOINT = "(min-width: 768px)";

function distributeIntoColumns(items: Project[], columnCount: number) {
  const columns: Project[][] = Array.from({ length: columnCount }, () => []);
  items.forEach((item, i) => {
    columns[i % columnCount].push(item);
  });
  return columns;
}

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [columnCount, setColumnCount] = useState(DESKTOP_COLUMNS);

  useEffect(() => {
    const mq = window.matchMedia(BREAKPOINT);
    const update = () =>
      setColumnCount(mq.matches ? DESKTOP_COLUMNS : MOBILE_COLUMNS);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const columns = distributeIntoColumns(projects, columnCount);

  return (
    <section className="relative w-full px-2 pt-20 md:px-4 md:pt-24">
      <div
        className="grid gap-2 md:gap-4"
        style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))` }}
      >
        {columns.map((columnItems, colIndex) => (
          <GridColumn
            key={`${columnCount}-${colIndex}`}
            items={columnItems}
            speed={SPEEDS[colIndex % SPEEDS.length]}
          />
        ))}
      </div>
    </section>
  );
}
