export type PriceCard = {
  service: string;
  from: string;
  line: string;
  finderId: string;
  video?: { src: string; poster: string; label: string; title: string };
};

export const priceCards: PriceCard[] = [
  {
    service: "Starter website",
    from: "R3,500",
    line: "One page, mobile-first, call + WhatsApp buttons, Google-ready.",
    finderId: "websites",
  },
  {
    service: "Business website",
    from: "R6,500",
    line: "Multi-page: services, gallery, quote form.",
    finderId: "websites",
  },
  {
    service: "Professional website",
    from: "R9,500",
    line: "Booking and enquiry forms, packages, galleries.",
    finderId: "websites",
  },
  {
    service: "Online store",
    from: "R12,500",
    line: "Products, checkout, payments.",
    finderId: "websites",
  },
  {
    service: "Moe AI receptionist",
    from: "R3,500/month",
    line: "Calls + bookings. From R5,500/month with WhatsApp & email.",
    finderId: "moe",
  },
  {
    service: "Apps & custom software",
    from: "R15,000",
    line: "Web apps from R15,000 · mobile apps from R35,000.",
    finderId: "apps",
    video: {
      src: "/video/napkin-to-pocket.mp4",
      poster: "/video/napkin-to-pocket-poster.jpg",
      label: "Watch: napkin to pocket",
      title: "From napkin to pocket: how MOE Media builds apps",
    },
  },
];

export const extras = [
  { service: "Logo", from: "R1,500", finderId: "branding" },
  { service: "Logo + starter site", from: "R5,000", finderId: "branding" },
  { service: "Social media", from: "R2,000/month", finderId: "social" },
  { service: "Website care", from: "R800/month", finderId: "care" },
];
