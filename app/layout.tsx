import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "./components/Header";
import { SiteFooter } from "./components/SiteFooter";

const inter = Inter({
  variable: "--font-inter",
  // latin-ext covers the dotless ı used by the wordmark's green tittle
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://moemedia.co.za"),
  title: {
    default: "MOE Media — Create · Connect · Grow",
    template: "%s — MOE Media",
  },
  description:
    "Websites, apps, branding, social media and Moe, the AI receptionist. South Africa.",
  openGraph: {
    title: "MOE Media",
    description: "Websites, apps, branding and Moe, the AI receptionist.",
    siteName: "MOE Media",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-canvas text-ink">
        <Header />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
