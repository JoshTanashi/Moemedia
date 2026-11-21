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

// On a refresh, start at the top: drop any #section left in the URL by
// in-page links and skip the browser's scroll restore. Runs before paint.
const RESET_ON_RELOAD = `(function(){try{history.scrollRestoration="manual";var n=performance.getEntriesByType("navigation")[0];if(!n||n.type!=="reload")return;if(location.hash)history.replaceState(history.state,"",location.pathname+location.search);var top=function(){window.scrollTo({top:0,left:0,behavior:"instant"});};top();addEventListener("load",function(){top();requestAnimationFrame(top);},{once:true});}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: RESET_ON_RELOAD }} />
      </head>
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
