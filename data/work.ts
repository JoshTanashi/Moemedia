export type WorkItem = {
  slug: string;
  name: string;
  group: "Client" | "Own venture" | "Product" | "App";
  line: string;
  status: "Live" | "In development" | "Coming soon";
  url?: string;
  /** Screenshot at public/projects/<slug>.jpg — omit to show the IMAGE placeholder */
  image?: string;
};

export const work: WorkItem[] = [
  {
    slug: "red-batch",
    name: "Red-Batch",
    group: "Own venture",
    line: "Our own store, run end to end.",
    status: "Live",
    url: "https://redbatch.store",
    image: "/projects/redbatch.jpg",
  },
  {
    slug: "workdesk",
    name: "Workdesk",
    group: "Product",
    line: "Quote it. Build it. Bill it.",
    status: "Live",
    url: "https://workdesk-flame.vercel.app",
    image: "/projects/workdesk.jpg",
  },
  {
    slug: "lewis-tutoring",
    name: "Lewis Tutoring",
    group: "Client",
    line: "Book a tutor in ten seconds.",
    status: "Live",
    url: "https://lewis-tutoring.vercel.app",
    image: "/projects/lewis-tutoring.jpg",
  },
  {
    slug: "jml-photography",
    name: "JML Photography",
    group: "Client",
    line: "Image first. Interface last.",
    status: "Live",
    url: "https://jml-photograghy.vercel.app",
    image: "/projects/jml-photography.jpg",
  },
  {
    slug: "reelroll",
    name: "Reelroll",
    group: "App",
    line: "Tonight's movie, picked in a few taps.",
    status: "In development",
  },
  {
    slug: "seed-archive",
    name: "Seed Archive",
    group: "App",
    line: "Coming soon.",
    status: "Coming soon",
  },
];
