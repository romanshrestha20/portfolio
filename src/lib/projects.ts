import "server-only";
import { projects as fallbackProjects } from "@/data/projects";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { Project } from "@/types/project";

type ProjectRow = {
  id: string; issue: string; name: string; slug: string; dek: string; image: string;
  tags: string[]; links: Project["links"]; facts: Project["facts"]; case_study: Project["caseStudy"];
  featured: boolean; status: "draft" | "published"; display_order: number;
};

export function rowToProject(row: ProjectRow): Project {
  return { id: row.id, issue: row.issue, name: row.name, slug: row.slug, dek: row.dek, image: row.image, tags: row.tags, links: row.links, facts: row.facts, caseStudy: row.case_study, featured: row.featured, status: row.status, displayOrder: row.display_order };
}

export async function getPublishedProjects(): Promise<Project[]> {
  const db = createSupabaseAdminClient();
  if (!db) return fallbackProjects as Project[];
  const { data, error } = await db.from("projects").select("*").eq("status", "published").order("display_order");
  if (error || !data?.length) return fallbackProjects as Project[];
  return (data as ProjectRow[]).map(rowToProject);
}

export async function getAllProjects(): Promise<Project[]> {
  const db = createSupabaseAdminClient();
  if (!db) return fallbackProjects.map((project, index) => ({ ...project, status: "published" as const, featured: index < 3, displayOrder: index }));
  const { data, error } = await db.from("projects").select("*").order("display_order");
  if (error) throw new Error(error.message);
  return ((data ?? []) as ProjectRow[]).map(rowToProject);
}
