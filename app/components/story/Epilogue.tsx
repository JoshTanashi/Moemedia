import Link from "next/link";
import { Eyebrow } from "../ui/Eyebrow";
import { CTAButton } from "../ui/CTAButton";
import { UnderlineStroke } from "../ui/HandDrawn";

export function Epilogue() {
  return (
    <section className="story-section epilogue" data-chapter data-accent="#c9a16b">
      <div data-reveal>
        <Eyebrow>Epilogue</Eyebrow>
      </div>
      <h2 className="epilogue-title font-display" data-reveal>
        <span className="hero-underline">
          Let&apos;s talk.
          <UnderlineStroke />
        </span>
      </h2>
      <p className="epilogue-copy" data-reveal>
        That&apos;s the story so far — five ventures at different stages, one
        product a real business depends on, all of it built by one founder.
        If you&apos;re an investor who backs people who ship, or you want your
        own thing built properly: I answer my own email.
      </p>
      <div className="epilogue-actions" data-reveal>
        <CTAButton href="mailto:hello@moemedia.com">hello@moemedia.com</CTAButton>
        <Link href="/work" className="text-link">
          See the work →
        </Link>
      </div>
    </section>
  );
}
