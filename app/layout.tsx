import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { contact } from "@/data/contact";
import { Header } from "./components/Header";
import { SiteFooter } from "./components/SiteFooter";

const inter = Inter({
  variable: "--font-inter",
  // latin-ext covers the dotless ı used by the wordmark's green tittle
  subsets: ["latin", "latin-ext"],
});

const TITLE = "MOE Media | Websites, apps & AI receptionist, South Africa";
const DESCRIPTION =
  "Websites from R3,500, apps and custom software, and Moe, the AI receptionist that answers your calls from R3,500/month. South Africa.";

export const metadata: Metadata = {
  metadataBase: new URL("https://moemedia.co.za"),
  title: {
    default: TITLE,
    template: "%s | MOE Media",
  },
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: "Websites, apps & Moe, the AI receptionist.",
    siteName: "MOE Media",
    url: "https://moemedia.co.za",
    locale: "en_ZA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: "Websites, apps & Moe, the AI receptionist.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "MOE Media",
  url: "https://moemedia.co.za",
  telephone: "+27735692335",
  email: contact.email,
  areaServed: { "@type": "Country", name: "South Africa" },
  sameAs: [contact.facebook],
  description: DESCRIPTION,
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Analytics />
      </body>
    </html>
  );
}
