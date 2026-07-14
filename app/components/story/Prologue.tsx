import { Eyebrow } from "../ui/Eyebrow";
import { ArrowDown, UnderlineStroke } from "../ui/HandDrawn";

// The headline is split into manual line wrappers so each line can rise
// out of its own overflow-hidden mask — no SplitText dependency.
export function Prologue() {
  return (
    <section className="story-section prologue" data-prologue>
      <Eyebrow>Moemedia — A Founder&apos;s Studio</Eyebrow>
      <h1 className="prologue-title font-display" data-prologue-title>
        <span className="hero-line">
          <span>I build</span>
        </span>
        <span className="hero-line">
          <span>small companies —</span>
        </span>
        <span className="hero-line">
          <span className="display-italic text-gold">and the software</span>
        </span>
        <span className="hero-line">
          <span className="display-italic text-gold">
            that{" "}
            <span className="hero-underline">
              runs them.
              <UnderlineStroke />
            </span>
          </span>
        </span>
      </h1>
      <p className="prologue-sub">
        Moemedia is the name over the door for everything I make: my own brands,
        tools for other people&apos;s businesses, and the occasional client site.
        No agency gloss, no vision deck. Just shipped things you can click.
      </p>
      <span className="scroll-cue">
        Scroll the story
        <ArrowDown />
      </span>
    </section>
  );
}
