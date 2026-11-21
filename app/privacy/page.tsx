import type { Metadata } from "next";
import { contact } from "@/data/contact";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How MOE Media collects, uses and protects your personal information (POPIA).",
};

export default function PrivacyPage() {
  return (
    <article className="legal">
      <h1>Privacy Policy</h1>
      <p className="legal-updated">Last updated: 21 November 2026</p>

      <p>
        MOE Media (&quot;we&quot;, &quot;us&quot;) is run by Joshua Lewis in South Africa. This
        policy explains what personal information we collect, why, and your rights under the
        Protection of Personal Information Act (POPIA).
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>
          <strong>Enquiries.</strong> When you use our contact form or service finder, or message
          us on WhatsApp or email: your name, business name, phone number, email address and
          whatever you tell us about your project.
        </li>
        <li>
          <strong>Calls to Moe.</strong> Calls to {contact.phoneDisplay} are answered by Moe, an
          AI receptionist, not a person. Moe records the details you give during the call (such
          as your name, number, reason for calling and any booking) and may keep a transcript of
          the conversation.
        </li>
        <li>
          <strong>Site usage.</strong> Anonymous, aggregated visit statistics (pages viewed,
          device type). We do not use advertising cookies.
        </li>
      </ul>

      <h2>Why we use it</h2>
      <p>
        Only to respond to your enquiry, book and hold calls, prepare quotes, and deliver work you
        ask us for. We do not sell your information or add you to marketing lists without your
        consent.
      </p>

      <h2>Who else handles it</h2>
      <p>
        We share information only with the service providers we need to run the business, such as
        our website host, WhatsApp, our email provider, and the telephony, AI and database
        providers that power Moe. They process it on our behalf and may store it outside South
        Africa, with appropriate safeguards.
      </p>

      <h2>How long we keep it</h2>
      <p>
        Enquiries and Moe call records that don&apos;t become projects are deleted after about 12
        months. Client records are kept for as long as needed for the work and for legal and tax
        requirements.
      </p>

      <h2>Your rights</h2>
      <p>
        You can ask to see, correct or delete the personal information we hold about you, or
        object to us using it, by emailing{" "}
        <a href={`mailto:${contact.email}`}>{contact.email}</a>. If you are unhappy with how we
        handled your information, you can complain to the Information Regulator of South Africa
        (inforegulator.org.za).
      </p>

      <h2>Contact</h2>
      <p>
        {contact.email} · {contact.phoneDisplay} · {contact.location}
      </p>
    </article>
  );
}
