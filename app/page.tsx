import { work } from "@/data/work";
import { contact } from "@/data/contact";
import { MoeCallCard } from "./components/MoeCallCard";
import { Pill } from "./components/Pill";
import { Reveal } from "./components/Reveal";
import { ServicesStrip } from "./components/ServicesStrip";
import { WorkTile } from "./components/WorkTile";

export default function Home() {
  return (
    <div className="tiles">
      <section className="tile tile--hero" id="moe">
        <p className="tile-kicker">AI receptionist</p>
        <h1 className="tile-title">Moe.</h1>
        <p className="tile-sub">The receptionist that never sleeps.</p>
        <div className="tile-actions">
          <Pill href={contact.tel}>Hear Moe</Pill>
          <Pill href="/start?s=moe" variant="secondary">
            Get Moe
          </Pill>
        </div>
        <MoeCallCard />
      </section>

      <Reveal as="section" className="tile tile--dark">
        <h2 className="tile-title">Tell us what you need.</h2>
        <p className="tile-sub">Four taps. No forms.</p>
        <div className="tile-actions">
          <Pill href="/start">Start</Pill>
        </div>
      </Reveal>

      <div className="tile-grid" id="work">
        {work.map((item) => (
          <WorkTile key={item.slug} item={item} />
        ))}
      </div>

      <ServicesStrip />
    </div>
  );
}
