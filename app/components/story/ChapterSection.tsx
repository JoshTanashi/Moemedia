import Image from "next/image";
import { type Business, statusLabel } from "@/data/businesses";
import { ProjectCard } from "../ProjectCard";
import { Eyebrow } from "../ui/Eyebrow";
import { CircleScribble } from "../ui/HandDrawn";
import { Monogram } from "../ui/Monogram";
import { StatBlock } from "../ui/StatBlock";

const PANEL_NOTES: Record<Business["status"], string> = {
  live: "Live and open to visitors.",
  "in-progress": "Being built right now — this space is reserved for the launch.",
  "coming-soon": "On the roadmap — this space is reserved for the launch.",
};

export function ChapterSection({
  business,
  index,
}: {
  business: Business;
  index: number;
}) {
  const numeral = String(index + 1).padStart(2, "0");
  const flip = index % 2 === 1;

  return (
    <section
      id={business.slug}
      className={`story-section chapter ${flip ? "chapter--flip" : ""}`}
      data-chapter
      data-accent={business.accent}
      data-rail={business.slug}
    >
      <span className="chapter-numeral" data-numeral aria-hidden>
        {numeral}
      </span>
      <div className="chapter-inner">
        <div className="chapter-copy">
          <div className="chapter-head" data-reveal>
            <Eyebrow>{business.kind}</Eyebrow>
            <span className={`status-pill ${business.status === "live" ? "status-pill--live" : ""}`}>
              <i aria-hidden />
              {statusLabel[business.status]}
            </span>
          </div>
          <h2 className="chapter-name font-display" data-reveal>
            {index === 0 ? (
              <span className="chapter-scribble">
                {business.name}
                <CircleScribble />
              </span>
            ) : (
              business.name
            )}
          </h2>
          <p className="chapter-tagline" data-reveal>
            {business.tagline}
          </p>
          <div className="chapter-story" data-reveal>
            {business.story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          {business.liveUrl && (
            <a
              href={business.liveUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="text-link"
              data-reveal
            >
              Visit live ↗
            </a>
          )}
        </div>
        <div className="chapter-media" data-reveal>
          <div data-media>
            {business.thumbnailSrc ? (
              <ProjectCard
                project={{
                  title: business.name,
                  role: business.kind,
                  thumbnailSrc: business.thumbnailSrc,
                  href: business.liveUrl ?? "#",
                }}
              />
            ) : (
              <div className="chapter-panel">
                {business.logoSrc ? (
                  <Image src={business.logoSrc} alt={`${business.name} logo`} width={72} height={72} />
                ) : (
                  <Monogram name={business.name} />
                )}
                <p className="chapter-panel-note">{PANEL_NOTES[business.status]}</p>
              </div>
            )}
          </div>
          {business.stats && <StatBlock stats={business.stats} />}
        </div>
      </div>
    </section>
  );
}
