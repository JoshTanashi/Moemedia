import Link from "next/link";
import { services } from "@/data/services";

export function ServicesStrip() {
  return (
    <section className="strip" id="services" aria-labelledby="services-title">
      <h2 id="services-title" className="strip-title">
        Services.
      </h2>
      <div className="strip-track">
        {services.map((service) => (
          <Link key={service.id} href={`/start?s=${service.id}`} className="strip-card">
            <span className="strip-card-name">{service.name}</span>
            <span className="strip-card-line">{service.line}</span>
            <span className="strip-card-cta">Start →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
