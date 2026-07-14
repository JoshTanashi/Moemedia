import type { Metadata, Viewport } from "next";
import { Fraunces, Montserrat } from "next/font/google";
import "./globals.css";
import { Header } from "./components/Header";
import { LoadingScreen } from "./components/LoadingScreen";
import { PageTransition } from "./components/PageTransition";
import { SiteFooter } from "./components/SiteFooter";
import { GrainOverlay } from "./components/ui/GrainOverlay";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://moemedia.vercel.app"),
  title: {
    default: "Moemedia — A Founder's Studio",
    template: "%s — Moemedia",
  },
  description:
    "Moemedia is the studio of one founder building small companies and the software that runs them: Red-Batch, Sandstorm Group, Workdesk, Lewis Tutoring, JML Photography and Reken.",
  openGraph: {
    title: "Moemedia — A Founder's Studio",
    description:
      "One founder, several small companies, and software a real business runs on every day.",
    siteName: "Moemedia",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-night text-bone">
        <LoadingScreen />
        <Header />
        <main>
          <PageTransition>{children}</PageTransition>
        </main>
        <SiteFooter />
        <GrainOverlay />
      </body>
    </html>
  );
}
