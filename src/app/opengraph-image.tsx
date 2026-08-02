import { ImageResponse } from "next/og";
import { getPortfolioSettings } from "@/lib/site-settings";

export const alt = "Roman Shrestha software engineering portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const { personalDetails: details } = await getPortfolioSettings();

  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#17190f", color: "#eee5ca", padding: "62px 68px", border: "1px solid #494527" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 18, letterSpacing: "0.16em", textTransform: "uppercase" }}>
        <span style={{ color: "#ffa500" }}>Portfolio control / signal online</span>
        <span>{details.location}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", width: 108, height: 7, background: "#ffa500", marginBottom: 34 }} />
        <div style={{ display: "flex", fontSize: 84, fontWeight: 700, lineHeight: 0.92, letterSpacing: "-0.055em", maxWidth: 950 }}>{details.name}</div>
        <div style={{ display: "flex", marginTop: 30, fontSize: 30, color: "#afa88f" }}>{details.role} / Building useful signals.</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 17, color: "#afa88f" }}>
        <span>Selected product work and engineering case studies</span>
        <span>roman-shrestha.info</span>
      </div>
    </div>,
    size,
  );
}
