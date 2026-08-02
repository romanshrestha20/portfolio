import { ImageResponse } from "next/og";
import { getPublishedProjectBySlug } from "@/lib/projects";

export const alt = "Software project case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function ProjectOpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getPublishedProjectBySlug(slug);
  const name = project?.name ?? "Project case study";
  const headline = project?.caseStudy.headline ?? "A software engineering case study by Roman Shrestha.";
  const tags = project?.tags.join(" / ") ?? "Software engineering";

  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#17190f", color: "#eee5ca", padding: "62px 68px", border: "1px solid #494527" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 18, letterSpacing: "0.16em", textTransform: "uppercase" }}>
        <span style={{ color: "#ffa500" }}>Case file / {project?.issue ?? "—"}</span>
        <span>Roman Shrestha / Portfolio</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", color: "#ffa500", fontSize: 20, letterSpacing: "0.13em", textTransform: "uppercase", marginBottom: 26 }}>{tags}</div>
        <div style={{ display: "flex", fontSize: 88, fontWeight: 700, lineHeight: 0.9, letterSpacing: "-0.06em", maxWidth: 1030 }}>{name}</div>
        <div style={{ display: "flex", marginTop: 30, maxWidth: 970, fontSize: 25, lineHeight: 1.35, color: "#afa88f" }}>{headline}</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 17, color: "#afa88f" }}>
        <span>Technical decisions / interface systems / outcomes</span>
        <span>roman-shrestha.info</span>
      </div>
    </div>,
    size,
  );
}
