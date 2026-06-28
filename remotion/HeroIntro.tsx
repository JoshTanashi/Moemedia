import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

const COLORS = {
  cream: "#f3ece0",
  ink: "#231f1a",
  accent: "#b9542f",
};

export function HeroIntro() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, config: { damping: 200 } });
  const scale = interpolate(entrance, [0, 1], [0.9, 1]);
  const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const underlineWidth = interpolate(frame, [20, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.cream, alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", opacity, transform: `scale(${scale})` }}>
        <span style={{ fontSize: 120, fontWeight: 600, letterSpacing: -2, color: COLORS.ink }}>
          moemedia
        </span>
        <div
          style={{
            marginTop: 24,
            height: 6,
            width: 400 * underlineWidth,
            backgroundColor: COLORS.accent,
          }}
        />
      </div>
    </AbsoluteFill>
  );
}
