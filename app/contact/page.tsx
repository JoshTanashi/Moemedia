import type { Metadata } from "next";
import { CTAButton } from "../components/ui/CTAButton";
import { Eyebrow } from "../components/ui/Eyebrow";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Moemedia — WhatsApp or email, I answer both myself.",
};

export default function ContactPage() {
  return (
    <section className="inner-page">
      <Eyebrow>Contact</Eyebrow>
      <h1 className="inner-title font-display">
        Talk to the person <span className="text-gradient">who built it.</span>
      </h1>
      <div className="inner-copy">
        <p>
          Investor questions, project enquiries, or a straight &quot;how did you
          make this?&quot; — WhatsApp or email, it lands with me either way, and
          I answer both myself.
        </p>
      </div>
      <div className="inner-actions">
        <CTAButton href="https://wa.me/27699384562" target="_blank" rel="noreferrer noopener">
          069 938 4562
        </CTAButton>
        <a href="mailto:joshua@moemedia.co.za" className="text-link">
          joshua@moemedia.co.za
        </a>
      </div>
    </section>
  );
}
