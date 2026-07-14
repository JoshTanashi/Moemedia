import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";
export const alt = "Moemedia — Create · Connect · Grow";

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
          background: "#0f1211",
          color: "#f5f5f5",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 28,
            fontSize: 26,
            letterSpacing: "0.28em",
            color: "#93a09b",
          }}
        >
          <div
            style={{
              width: 48,
              height: 3,
              background: "linear-gradient(115deg, #3ceb8b, #00cfa7, #00b6e6)",
            }}
          />
          A FOUNDER&apos;S STUDIO
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            fontSize: 148,
            marginTop: 36,
            letterSpacing: "-0.02em",
          }}
        >
          <span style={{ fontWeight: 800 }}>Moe</span>
          <span style={{ fontWeight: 300 }}>media</span>
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 9,
              background: "#3ceb8b",
              marginLeft: 14,
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            fontSize: 32,
            marginTop: 32,
            color: "#93a09b",
            letterSpacing: "0.12em",
          }}
        >
          CREATE
          <div style={{ width: 8, height: 8, borderRadius: 4, background: "#3ceb8b" }} />
          CONNECT
          <div style={{ width: 8, height: 8, borderRadius: 4, background: "#3ceb8b" }} />
          GROW
        </div>
        <div
          style={{
            width: 1040,
            height: 3,
            background: "linear-gradient(115deg, #3ceb8b, #00cfa7, #00b6e6)",
            marginTop: 64,
          }}
        />
      </div>
    ),
    size,
  );
}
