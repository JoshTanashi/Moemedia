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
  { title: "Sandstorm Group", role: "Brand Site", thumbnailSrc: "/projects/sandstorm.jpg", href: "https://sandstormgroup.co.za" },
  { title: "Lewis Tutoring", role: "Client Site", thumbnailSrc: "/projects/lewis-tutoring.jpg", href: "https://lewis-tutoring.vercel.app" },
  { title: "JML Photography Studios", role: "Photography", thumbnailSrc: "/projects/jml-photography.jpg", href: "https://jml-photograghy.vercel.app" },
];
