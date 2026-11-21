import { work } from "@/data/work";
import { contact } from "@/data/contact";
import { MoeCallCard } from "./components/MoeCallCard";
import { MoeMode } from "./components/MoeMode";
import { MoeVideo } from "./components/MoeVideo";
import { Pill } from "./components/Pill";
import { PriceGrid } from "./components/PriceGrid";
import { Reveal } from "./components/Reveal";
import { TalkForm } from "./components/TalkForm";
import { WorkTile } from "./components/WorkTile";

const MOE_DOES = [
  "Answers every call, including after hours",
  "Captures name, number and reason, then sends it to you",
  "Books calls and appointments into your calendar",
  "Passes anything she shouldn't handle to a real person",
];

const STEPS = [
  { title: "15-minute call", line: "Zoom or phone. You tell me what's not working." },
  {
    title: "Free draft or demo",
    line: "A draft of your site, or Moe set up on your process with dummy data.",
  },
  {
    title: "Build and launch",
    line: "Fixed quote, 50% deposit. Live in days for websites, weeks for apps and Moe.",
  },
];

export default function Home() {
  return (
    <div className="tiles">
      <section className="tile tile--hero tile--intro">
        <h1 className="tile-title">Websites, apps and AI that growing businesses run on.</h1>
        <p className="tile-sub">
          Websites from R3,500. Moe, our AI receptionist, from R3,500/month.
        </p>
        <div className="tile-actions">
          <Pill href="#talk">Book a 15-min call</Pill>
          <Pill href={contact.tel} variant="secondary">
            Hear Moe: {contact.phoneDisplay}
          </Pill>
        </div>
        <p className="tile-fine">South Africa · Zoom or phone · You deal with me directly</p>
      </section>

      <section className="tile tile--moe" id="moe">
        <div className="moe-bridge moe-bridge--in" aria-hidden />
        <p className="tile-kicker tile-kicker--caps">Meet Moe</p>
        <h2 className="tile-title">She answers our phone. She can answer yours.</h2>
        <p className="tile-body">
          Moe is the AI receptionist we built for MOE Media. She picks up, finds out who&apos;s
          calling and why, answers the questions you&apos;ve approved, books meetings into your
          diary and hands anything unusual to a person, day or night. Every Moe is set up around
          your business, your prices and your rules.
        </p>
        <a href={contact.tel} className="moe-call">
          Don&apos;t take our word for it. Call <strong>{contact.phoneDisplay}</strong> and talk
          to her.
        </a>
        <MoeVideo />
        <MoeCallCard />
        <MoeMode />
        <ul className="moe-does">
          {MOE_DOES.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="tile-honest">
          Moe handles the routine. She doesn&apos;t replace your team; she stops calls from
          slipping through the cracks.
        </p>
        <ul className="chips chips--center">
          <li className="chip chip--static">
            Calls + bookings <strong>from R3,500/month</strong>
          </li>
          <li className="chip chip--static">
            + WhatsApp &amp; email <strong>from R5,500/month</strong>
          </li>
        </ul>
        <div className="moe-bridge moe-bridge--out" aria-hidden />
      </section>

      <PriceGrid />

      <div className="tile-grid" id="work">
        {work.map((item) => (
          <WorkTile key={item.slug} item={item} />
        ))}
      </div>

      <Reveal as="section" className="tile tile--dark" id="proof">
        <p className="tile-kicker tile-kicker--caps">Proof, not promises</p>
        <h2 className="tile-title">Reken runs a real retail business every day.</h2>
        <p className="tile-sub">Stock and sales, built and maintained by me. Internal tool, demo on request.</p>
        <div className="tile-actions">
          <Pill href="#talk">Ask for a demo</Pill>
        </div>
      </Reveal>

      <section className="section" aria-labelledby="how-title">
        <h2 id="how-title" className="section-title">
          How it works.
        </h2>
        <ol className="steps">
          {STEPS.map((step, i) => (
            <li key={step.title} className="step">
              <span className="step-num">{i + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.line}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section talk" id="talk" aria-labelledby="talk-title">
        <div className="talk-head">
          <h2 id="talk-title" className="section-title">
            Let&apos;s talk.
          </h2>
          <p className="section-sub">
            15 minutes on Zoom or a quick call. No pitch deck, just your problem and whether I can
            fix it.
          </p>
          <div className="talk-alt">
            <a href={contact.whatsapp} target="_blank" rel="noreferrer noopener">
              WhatsApp {contact.phoneDisplay}
            </a>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <a href={contact.tel}>Or call Moe: {contact.phoneDisplay}</a>
          </div>
        </div>
        <TalkForm />
      </section>
    </div>
  );
}
