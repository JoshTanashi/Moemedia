export type Project = {
  title: string;
  role: string;
  thumbnailSrc: string;
  href: string;
};

// Real work only — filler cards read badly to investors.
export const projects: Project[] = [
  { title: "Redbatch.store", role: "E-commerce", thumbnailSrc: "/projects/redbatch.jpg", href: "https://redbatch.store" },
  { title: "Workdesk", role: "Web App", thumbnailSrc: "/projects/workdesk.jpg", href: "https://workdesk-flame.vercel.app" },
  { title: "Vibrancy", role: "Brand Site", thumbnailSrc: "/projects/vibrancy.jpg", href: "https://vibrancy-tan.vercel.app" },
  { title: "Sandstorm Group", role: "Brand Site", thumbnailSrc: "/projects/placeholder-1.svg", href: "#" },
  { title: "Lewis Tutoring", role: "Client Site", thumbnailSrc: "/projects/placeholder-2.svg", href: "#" },
  { title: "JML Photography Studios", role: "Photography", thumbnailSrc: "/projects/placeholder-3.svg", href: "#" },
];
