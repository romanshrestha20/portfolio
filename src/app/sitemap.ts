import type { MetadataRoute } from "next";
import { getPublishedProjects } from "@/lib/projects";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getPublishedProjects();
  return [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    ...projects.map((project) => ({
      url: `${SITE_URL}/projects/${project.slug ?? project.id}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
