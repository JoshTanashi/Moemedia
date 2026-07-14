import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";
export const alt = "Moemedia — A Founder's Studio";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0a0a0b",
          color: "#ede7dc",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#9c968b",
            display: "flex",
            alignItems: "center",
            gap: 24,
          }}
        >
          <div style={{ width: 48, height: 2, background: "#c9a16b" }} />
          A Founder&apos;s Studio
        </div>
        <div
          style={{
            fontSize: 132,
            fontStyle: "italic",
            marginTop: 32,
          }}
        >
          Moemedia
        </div>
        <div
          style={{
            fontSize: 34,
            marginTop: 28,
            color: "#9c968b",
          }}
        >
          Small companies — and the software that runs them.
        </div>
        <div
          style={{
            width: 1040,
            height: 2,
            background: "#c9a16b",
            marginTop: 64,
          }}
        />
      </div>
    ),
    size,
  );
}
