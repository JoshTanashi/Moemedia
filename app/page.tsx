import { ProjectList } from "./components/ProjectList";
import { projects } from "@/data/projects";

export default function Home() {
  return <ProjectList projects={projects} />;
}
