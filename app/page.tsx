import { businesses } from "@/data/businesses";
import { StoryPage } from "./components/story/StoryPage";

export default function Home() {
  return <StoryPage businesses={businesses} />;
}
