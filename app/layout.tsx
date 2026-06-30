import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Header } from "./components/Header";
import { LoadingScreen } from "./components/LoadingScreen";
import { GlitchCanvas } from "./components/GlitchCanvas";
import { PageTransition } from "./components/PageTransition";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Moemedia",
  description: "Selected work from Moemedia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} h-full antialiased`}>
      <body className="min-h-full bg-cream text-ink">
        <LoadingScreen />
        <GlitchCanvas />
        <Header />
        <main>
          <PageTransition>{children}</PageTransition>
        </main>
      </body>
    </html>
  );
}
