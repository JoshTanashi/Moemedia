import Link from "next/link";
import { extras, priceCards } from "@/data/pricing";
import { VideoButton } from "./VideoButton";

export function PriceGrid() {
  return (
    <section className="section" id="services" aria-labelledby="services-title">
      <h2 id="services-title" className="section-title">
        What we do.
      </h2>
      <div className="price-grid">
        {priceCards.map((card) => (
          <article key={card.service} className="price-card">
            <h3 className="price-name">{card.service}</h3>
            <p className="price-from">
              From <strong>{card.from}</strong>
            </p>
            <p className="price-line">{card.line}</p>
            {card.video && <VideoButton variant="link" {...card.video} />}
            <Link href={`/start?s=${card.finderId}`} className="price-cta">
              Get a quote →
            </Link>
          </article>
        ))}
      </div>
      <ul className="chips chips--extras">
        {extras.map((x) => (
          <li key={x.service}>
            <Link href={`/start?s=${x.finderId}`} className="chip">
              {x.service} <strong>{x.from}</strong>
            </Link>
          </li>
        ))}
      </ul>
      <p className="section-note">
        50% deposit to start, balance on handover. Every quote is fixed and agreed upfront, so
        there are no surprise costs.
      </p>
    </section>
  );
}
