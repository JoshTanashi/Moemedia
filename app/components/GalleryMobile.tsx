import type { Project } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";

export function GalleryMobile({ projects }: { projects: Project[] }) {
  return (
    <div className="gallery-mobile SP md:hidden">
      {projects.map((project) => (
        <div className="gallery-card-wrap" key={project.title}>
          <ProjectCard project={project} />
        </div>
      ))}
    </div>
  );
}
