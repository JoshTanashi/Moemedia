import type { Business } from "@/data/businesses";

// Desktop-only fixed dot navigation. The active dot is toggled by the
// ScrollTriggers in StoryPage, so this stays purely presentational.
export function ChapterRail({ businesses }: { businesses: Business[] }) {
  return (
    <nav className="chapter-rail" aria-label="Chapters">
      {businesses.map((business) => (
        <a
          key={business.slug}
          href={`#${business.slug}`}
          data-rail-dot={business.slug}
          aria-label={business.name}
        />
      ))}
      <a href="#reken" data-rail-dot="reken" aria-label="Reken" />
    </nav>
  );
}
