export type Service = {
  id: string;
  name: string;
  line: string;
  options: string[];
};

export const services: Service[] = [
  {
    id: "moe",
    name: "Moe",
    line: "An AI receptionist that answers, books and quotes.",
    options: ["Answer calls", "Calls + bookings", "Not sure yet"],
  },
  {
    id: "websites",
    name: "Websites",
    line: "From one page to a full online store.",
    options: ["Landing page", "Business website", "Bookings & galleries", "Online store"],
  },
  {
    id: "branding",
    name: "Branding & design",
    line: "Logos, profiles, posters and more.",
    options: ["Logo", "Logo + landing page", "Company profile", "CI manual", "Posters & social graphics"],
  },
  {
    id: "social",
    name: "Social media",
    line: "Monthly content, handled.",
    options: ["Social Starter", "Social Growth"],
  },
  {
    id: "apps",
    name: "Apps",
    line: "Web apps and iOS + Android.",
    options: ["Web app / PWA", "iOS + Android app", "Not sure yet"],
  },
  {
    id: "care",
    name: "Website care",
    line: "Hosting, SSL, backups and small edits.",
    options: ["Basic", "Plus"],
  },
];

export const timings = ["As soon as possible", "This month", "Just exploring"];
