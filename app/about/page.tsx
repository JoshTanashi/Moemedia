import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "../components/ui/Eyebrow";

export const metadata: Metadata = {
  title: "About",
  description:
    "Who is behind Moemedia — one founder building small companies and the software that runs them.",
};

export default function AboutPage() {
  return (
    <section className="inner-page">
      <Eyebrow>About</Eyebrow>
      <h1 className="inner-title font-display">
        One founder, <em className="text-gold">several front doors.</em>
      </h1>
      <div className="inner-copy">
        <p>
          Moemedia is not an agency — it&apos;s the name over the door for
          everything I build: my own brands like Red-Batch, tools like Workdesk
          and Reken, and sites for businesses that trust me with their front
          door. Each one is small on purpose. Small means I can own the whole
          thing — the product, the design, the code, and the consequences.
        </p>
        <p>
          If you want the full picture,{" "}
          <Link href="/" className="text-bone underline underline-offset-4 hover:text-gold">
            read the story
          </Link>{" "}
          or{" "}
          <Link href="/work" className="text-bone underline underline-offset-4 hover:text-gold">
            click through the work
          </Link>
          . Everything shown is real and reachable.
        </p>
      </div>
    </section>
  );
}
