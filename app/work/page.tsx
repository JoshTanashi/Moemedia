import type { Metadata } from "next";
import { work } from "@/data/work";
import { WorkTile } from "../components/WorkTile";

export const metadata: Metadata = {
  title: "Work",
  description: "Sites, products and apps built by MOE Media.",
};

export default function WorkPage() {
  return (
    <div className="tiles">
      <header className="page-head">
        <h1 className="tile-title">Work.</h1>
      </header>
      <div className="tile-grid">
        {work.map((item) => (
          <WorkTile key={item.slug} item={item} />
        ))}
      </div>
    </div>
  );
}
