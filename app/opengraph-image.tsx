import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "AutomateIT — Reduce Costs. Unlock Growth.";

export default function OgImage() {
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
          background: "#004AAD",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 40,
            fontWeight: 800,
            letterSpacing: -1,
          }}
        >
          <div
            style={{
              display: "flex",
              width: 22,
              height: 22,
              border: "3px solid #8BCFFE",
              borderRadius: 4,
            }}
          />
          Automate it.
        </div>
        <div style={{ display: "flex", fontSize: 84, fontWeight: 800, marginTop: 40, letterSpacing: -2 }}>
          Reduce Costs.
        </div>
        <div style={{ display: "flex", fontSize: 84, fontWeight: 800, letterSpacing: -2 }}>
          Unlock Growth.
        </div>
        <div style={{ display: "flex", fontSize: 30, marginTop: 36, color: "#D8EBFB", maxWidth: 820 }}>
          Uncover hidden costs, automate what matters and deliver measurable savings.
        </div>
      </div>
    ),
    { ...size }
  );
}
