import { ProjectFeed } from "./components/ProjectFeed";
import { ProjectFeedDesktop } from "./components/ProjectFeedDesktop";
import { IntroProvider, IntroPlayer } from "./components/IntroSequence";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <IntroProvider>
      <div className="md:hidden">
        <ProjectFeed projects={projects} />
      </div>
      <ProjectFeedDesktop projects={projects} />
      <IntroPlayer />
    </IntroProvider>
  );
}
