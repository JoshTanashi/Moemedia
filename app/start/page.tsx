import type { Metadata } from "next";
import { Suspense } from "react";
import { ServiceFinder } from "../components/ServiceFinder";

export const metadata: Metadata = {
  title: "Start",
  description: "Tell MOE Media what you need in four taps.",
};

export default function StartPage() {
  return (
    <section className="finder-page">
      <Suspense fallback={<div className="finder" />}>
        <ServiceFinder />
      </Suspense>
    </section>
  );
}
