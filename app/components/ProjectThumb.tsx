import type { Project } from "@/data/projects";

export function ProjectThumb({ project }: { project: Project }) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noreferrer noopener"
      className="group relative block aspect-[4/3] overflow-hidden bg-cream-deep"
    >
      <img
        src={project.thumbnailSrc}
        alt={project.title}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-ink/0 transition-colors duration-300 group-hover:bg-ink/70">
        <span className="text-sm uppercase tracking-widest text-cream opacity-0 transition-opacity duration-300 delay-75 group-hover:opacity-100 md:text-base">
          {project.title}
        </span>
      </div>
    </a>
  );
}
