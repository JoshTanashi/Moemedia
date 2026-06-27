import { ProjectFeed } from "./components/ProjectFeed";
import { projects } from "@/data/projects";

export default function Home() {
  return <ProjectFeed projects={projects} />;
}
