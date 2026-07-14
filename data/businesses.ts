export type BusinessStat = {
  label: string;
  value: string;
};

export type Business = {
  /** Anchor id on the landing page, e.g. /#red-batch */
  slug: string;
  name: string;
  /** Short category label shown in the eyebrow, e.g. "E-commerce brand" */
  kind: string;
  tagline: string;
  /** Founder-voice paragraphs — keep them honest, no invented metrics */
  story: string[];
  /** Hex color driving this chapter's accent world */
  accent: string;
  liveUrl?: string;
  thumbnailSrc?: string;
  /** Real logo asset; when absent the Monogram placeholder renders instead */
  logoSrc?: string;
  stats?: BusinessStat[];
  status: "live" | "in-progress" | "coming-soon";
};

export const statusLabel: Record<Business["status"], string> = {
  live: "Live",
  "in-progress": "In progress",
  "coming-soon": "Coming soon",
};

// Adding a business = appending one object here. The landing page,
// mobile menu, chapter rail, and footer all render from this array.
export const businesses: Business[] = [
  {
    slug: "red-batch",
    name: "Red-Batch",
    kind: "E-commerce brand",
    tagline: "My own store, run end to end.",
    story: [
      "Red-Batch is the brand I own outright — product, site, fulfilment, support, all of it.",
      "It's where I learn what actually sells instead of what looks good in a deck. It's live right now; go poke it.",
    ],
    accent: "#e14b3b",
    liveUrl: "https://redbatch.store",
    thumbnailSrc: "/projects/redbatch.jpg",
    stats: [
      { label: "Role", value: "Owner & builder" },
      { label: "Status", value: "Trading" },
    ],
    status: "live",
  },
  {
    slug: "sandstorm-group",
    name: "Sandstorm Group",
    kind: "Brand site",
    tagline: "Making a young company feel established.",
    story: [
      "Sandstorm Group needed to look like it had history before it had much of one. My job was the digital front door: structure, tone, and a site that earns trust on the first visit.",
      "Built — the URL lands here the moment it ships.",
    ],
    accent: "#d9a441",
    stats: [
      { label: "Role", value: "Design & build" },
      { label: "Status", value: "Pre-launch" },
    ],
    status: "in-progress",
  },
  {
    slug: "workdesk",
    name: "Workdesk",
    kind: "Web app",
    tagline: "A focused workspace tool, designed and built solo.",
    story: [
      "Workdesk is a web app I took from blank file to deployed product on my own.",
      "It matters less as a feature list and more as proof of range: product thinking, interface, and engineering from one pair of hands.",
    ],
    accent: "#55a08e",
    liveUrl: "https://workdesk-flame.vercel.app",
    thumbnailSrc: "/projects/workdesk.jpg",
    stats: [
      { label: "Role", value: "Everything" },
      { label: "Status", value: "Deployed" },
    ],
    status: "live",
  },
  {
    slug: "lewis-tutoring",
    name: "Lewis Tutoring",
    kind: "Client site",
    tagline: "A front door that earns a parent's trust in ten seconds.",
    story: [
      "Lewis Tutoring is a one-person business, and its website has one job: make a parent feel they've found the right tutor before they've finished scrolling.",
      "Built and in the owner's hands; going live soon.",
    ],
    accent: "#6f9cd6",
    stats: [
      { label: "Role", value: "Design & build" },
      { label: "Status", value: "Handover" },
    ],
    status: "in-progress",
  },
  {
    slug: "jml-photography",
    name: "JML Photography Studios",
    kind: "Photography brand",
    tagline: "Nothing between the work and the viewer.",
    story: [
      "JML Photography Studios is a photography brand I'm building the online home for. The brief I set myself: image-first, interface-last.",
      "In progress — when it ships, the shots do the talking.",
    ],
    accent: "#c8c3ba",
    stats: [
      { label: "Role", value: "Design & build" },
      { label: "Status", value: "In studio" },
    ],
    status: "in-progress",
  },
];
