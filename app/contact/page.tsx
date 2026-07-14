import type { Metadata } from "next";
import { CTAButton } from "../components/ui/CTAButton";
import { Eyebrow } from "../components/ui/Eyebrow";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Moemedia — I answer my own email.",
};

export default function ContactPage() {
  return (
    <section className="inner-page">
      <Eyebrow>Contact</Eyebrow>
      <h1 className="inner-title font-display">
        Talk to the person <em className="text-gold">who built it.</em>
      </h1>
      <div className="inner-copy">
        <p>
          Investor questions, project enquiries, or a straight &quot;how did you
          make this?&quot; — all of it lands in the same inbox, and I answer my
          own email.
        </p>
      </div>
      <CTAButton href="mailto:hello@moemedia.com">hello@moemedia.com</CTAButton>
    </section>
  );
}
