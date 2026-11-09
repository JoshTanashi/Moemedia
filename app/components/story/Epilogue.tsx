import Link from "next/link";
import { Eyebrow } from "../ui/Eyebrow";
import { CTAButton } from "../ui/CTAButton";
import { RibbonUnderline } from "../ui/RibbonStroke";

export function Epilogue() {
  return (
    <section className="story-section epilogue" data-chapter data-accent="#00cfa7">
      <div data-reveal>
        <Eyebrow>Epilogue</Eyebrow>
      </div>
      <h2 className="epilogue-title font-display" data-reveal>
        <span className="hero-underline">
          Let&apos;s talk.
          <RibbonUnderline />
        </span>
      </h2>
      <p className="epilogue-copy" data-reveal>
        That&apos;s the story so far — five ventures at different stages, one
        product a real business depends on, all of it built by one founder.
        If you&apos;re an investor who backs people who ship, or you want your
        own thing built properly: WhatsApp or email, I answer both myself.
      </p>
      <div className="epilogue-actions" data-reveal>
        <CTAButton href="https://wa.me/27699384562" target="_blank" rel="noreferrer noopener">
          069 938 4562
        </CTAButton>
        <a href="mailto:joshua@moemedia.co.za" className="text-link">
          joshua@moemedia.co.za
        </a>
        <Link href="/work" className="text-link">
          See the work →
        </Link>
      </div>
    </section>
  );
}
