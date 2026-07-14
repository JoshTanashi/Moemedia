import type { BusinessStat } from "@/data/businesses";

export function StatBlock({ stats }: { stats: BusinessStat[] }) {
  return (
    <dl className="chapter-stats">
      {stats.map((stat) => (
        <div key={stat.label} className="stat-block">
          <dt>{stat.label}</dt>
          <dd>{stat.value}</dd>
        </div>
      ))}
    </dl>
  );
}
