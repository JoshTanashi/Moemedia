import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "./components/Header";
import { LoadingScreen } from "./components/LoadingScreen";
import { PageTransition } from "./components/PageTransition";
import { SiteFooter } from "./components/SiteFooter";
import { GrainOverlay } from "./components/ui/GrainOverlay";

const inter = Inter({
  variable: "--font-inter",
  // latin-ext covers the dotless ı used by the wordmark's green tittle
  subsets: ["latin", "latin-ext"],
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
  themeColor: "#f5f5f7",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-canvas text-ink">
        <LoadingScreen />
        <div className="site-shell">
          <Header />
          <main>
            <PageTransition>{children}</PageTransition>
          </main>
          <SiteFooter />
        </div>
        <GrainOverlay />
      </body>
    </html>
  );
}
