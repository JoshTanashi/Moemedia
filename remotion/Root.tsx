import { Composition } from "remotion";
import { HeroIntro } from "./HeroIntro";

export function RemotionRoot() {
  return (
    <Composition
      id="HeroIntro"
      component={HeroIntro}
      durationInFrames={90}
      fps={30}
      width={1920}
      height={1080}
    />
  );
}
