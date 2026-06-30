import { GalleryDesktop } from "./components/GalleryDesktop";
import { GalleryMobile } from "./components/GalleryMobile";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <div className="gallery-root">
      <GalleryDesktop projects={projects} />
      <GalleryMobile projects={projects} />
    </div>
  );
}
