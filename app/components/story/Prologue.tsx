import { Eyebrow } from "../ui/Eyebrow";
import { RibbonArrowDown, RibbonUnderline } from "../ui/RibbonStroke";

// The headline is split into manual line wrappers so each line can rise
// out of its own overflow-hidden mask — no SplitText dependency.
export function Prologue() {
  return (
    <section className="story-section prologue" data-prologue>
      <Eyebrow>Moemedia — Create · Connect · Grow</Eyebrow>
      <h1 className="prologue-title font-display" data-prologue-title>
        <span className="hero-line">
          <span>I build</span>
        </span>
        <span className="hero-line">
          <span>small companies</span>
        </span>
        <span className="hero-line">
          <span className="text-gradient">— and the software</span>
        </span>
        {/* background-clip:text breaks across positioned children, so the
            gradient is applied to leaf spans only */}
        <span className="hero-line">
          <span>
            <span className="text-gradient">that </span>
            <span className="hero-underline">
              <span className="text-gradient">runs them.</span>
              <RibbonUnderline />
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
        <RibbonArrowDown />
      </span>
    </section>
  );
}
