import type { Metadata } from "next";
import { contact } from "@/data/contact";
import { Pill } from "../components/Pill";

export const metadata: Metadata = {
  title: "Contact",
  description: `Call, WhatsApp or email MOE Media. ${contact.location}.`,
};

export default function ContactPage() {
  return (
    <div className="tiles">
      <section className="tile tile--hero tile--contact">
        <h1 className="tile-title">Say hi.</h1>
        <p className="tile-sub">{contact.location}</p>
        <div className="tile-actions tile-actions--stack">
          <Pill href={contact.whatsapp} external>
            WhatsApp {contact.phoneDisplay}
          </Pill>
          <Pill href={contact.tel} variant="secondary">
            Call {contact.phoneDisplay}
          </Pill>
          <Pill href={`mailto:${contact.email}`} variant="secondary">
            {contact.email}
          </Pill>
          <Pill href={contact.facebook} variant="secondary" external>
            Facebook
          </Pill>
        </div>
      </section>
    </div>
  );
}
