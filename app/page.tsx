import { ProjectFeed } from "./components/ProjectFeed";
import { ProjectFeedDesktop } from "./components/ProjectFeedDesktop";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <>
      <div className="md:hidden">
        <ProjectFeed projects={projects} />
      </div>
      <ProjectFeedDesktop projects={projects} />
    </>
  );
}
