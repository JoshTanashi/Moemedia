import Image from "next/image";
import type { WorkItem } from "@/data/work";
import { Pill } from "./Pill";
import { Reveal } from "./Reveal";

export function WorkTile({ item }: { item: WorkItem }) {
  return (
    <Reveal as="article" className="tile tile--grid" id={item.slug}>
      <p className="tile-kicker">
        {item.group}
        {item.status !== "Live" && <span className="tile-status">{item.status}</span>}
      </p>
      <h3 className="tile-title tile-title--sm">{item.name}</h3>
      <p className="tile-sub">{item.line}</p>
      {item.url && (
        <div className="tile-actions">
          <Pill href={item.url} external>
            Visit
          </Pill>
        </div>
      )}
      <div className="window">
        <div className="window-bar">
          <span className="window-dots">
            <i />
            <i />
            <i />
          </span>
        </div>
        <div className="window-body">
          {item.image ? (
            <Image
              src={item.image}
              alt={`${item.name} screenshot`}
              fill
              sizes="(min-width: 768px) 45vw, 92vw"
              className="window-img"
            />
          ) : (
            <span className="window-placeholder">IMAGE</span>
          )}
        </div>
      </div>
    </Reveal>
  );
}
