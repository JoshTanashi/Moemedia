import type { Metadata } from "next";
import { WorkGallery } from "../components/WorkGallery";

export const metadata: Metadata = {
  title: "Selected Work",
  description:
    "Live, clickable previews of the sites and products built under Moemedia.",
};

export default function WorkPage() {
  return <WorkGallery />;
}
