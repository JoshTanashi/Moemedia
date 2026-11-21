import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";
export const alt = "MOE Media: websites, apps & Moe, the AI receptionist";

const GRADIENT = "linear-gradient(115deg, #3ceb8b, #00cfa7, #00b6e6)";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#ffffff",
          color: "#1d1d1f",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", fontSize: 44, letterSpacing: "-0.02em" }}>
          <span style={{ fontWeight: 800 }}>MOE</span>
          <span style={{ fontWeight: 300, marginLeft: 12 }}>Media</span>
          <div
            style={{ width: 12, height: 12, borderRadius: 6, background: "#3ceb8b", marginLeft: 10 }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 84,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            Websites, apps & Moe, the AI receptionist.
          </div>
          <div style={{ display: "flex", fontSize: 34, color: "#6e6e73", marginTop: 28 }}>
            Websites from R3,500 · Call 073 569 2335 to hear Moe
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ width: 640, height: 8, borderRadius: 4, background: GRADIENT }} />
          <div style={{ display: "flex", fontSize: 30, fontWeight: 600 }}>moemedia.co.za</div>
        </div>
      </div>
    ),
    size,
  );
}
