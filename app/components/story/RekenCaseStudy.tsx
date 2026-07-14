import { Eyebrow } from "../ui/Eyebrow";

const PROOF_LINES = [
  "A real business, using it daily",
  "Designed, built and maintained by one person",
  "Kept not by a contract, but because it works",
];

export function RekenCaseStudy() {
  return (
    <section id="reken" className="reken" data-chapter data-accent="#c9a16b" data-rail="reken">
      <div className="reken-inner" data-reken-inner>
        <div data-reveal>
          <Eyebrow>Proof, not promises</Eyebrow>
        </div>
        <h2 className="reken-title font-display" data-reveal>
          <em className="text-gold">Reken</em>
        </h2>
        <p className="reken-copy" data-reveal>
          Reken is an app I built that a small retail business runs on every
          working day — stock, sales, the boring critical stuff. I&apos;m not going
          to name them or dress the numbers up. The point is simpler than that:
          when my software breaks, a real shop feels it the same morning.
          So it doesn&apos;t break.
        </p>
        <div className="reken-rule" data-rule aria-hidden />
        <ol className="proof-list">
          {PROOF_LINES.map((line) => (
            <li key={line} className="proof-line" data-proof>
              {line}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
