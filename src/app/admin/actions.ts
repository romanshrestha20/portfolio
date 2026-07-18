"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { projects as fallbackProjects } from "@/data/projects";

const text = z.string().trim().min(1);
const projectSchema = z.object({
  id: text, name: text, slug: text.regex(/^[a-z0-9-]+$/), issue: text, dek: text,
  image: text, tags: text, role: text, focus: text, format: text,
  kicker: text, headline: text, sections: text,
  liveUrl: z.string(), codeUrl: z.string(), status: z.enum(["draft", "published"]),
  featured: z.boolean(), displayOrder: z.coerce.number().int().min(0),
});

export type SaveProjectState = { status: "idle" | "success" | "error"; message?: string };

export async function saveProject(_previousState: SaveProjectState, formData: FormData): Promise<SaveProjectState> {
  try {
    await requireAdmin();
    const parsed = projectSchema.parse({
      ...Object.fromEntries(formData),
      featured: formData.get("featured") === "on",
    });
    const db = createSupabaseAdminClient();
    if (!db) return { status: "error", message: "Supabase is not configured." };
    const payload = {
      id: parsed.id, name: parsed.name, slug: parsed.slug, issue: parsed.issue, dek: parsed.dek, image: parsed.image,
      tags: parsed.tags.split(",").map((item) => item.trim()).filter(Boolean),
      links: { ...(parsed.liveUrl && { live: parsed.liveUrl }), ...(parsed.codeUrl && { code: parsed.codeUrl }) },
      facts: [{ label: "Role", value: parsed.role }, { label: "Focus", value: parsed.focus }, { label: "Format", value: parsed.format }],
      case_study: { kicker: parsed.kicker, headline: parsed.headline, sections: parsed.sections.split("\n").map((item) => item.trim()).filter(Boolean) },
      status: parsed.status, featured: parsed.featured, display_order: parsed.displayOrder, updated_at: new Date().toISOString(),
    };
    const { error } = await db.from("projects").upsert(payload);
    if (error) return { status: "error", message: error.message };
    revalidatePath("/"); revalidatePath("/admin/projects");
    return { status: "success" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { status: "error", message: "Check the required fields and use a lowercase, hyphenated slug." };
    }
    return { status: "error", message: error instanceof Error ? error.message : "The project could not be saved." };
  }
}

export async function deleteProject(formData: FormData) {
  await requireAdmin();
  const id = text.parse(formData.get("id"));
  const db = createSupabaseAdminClient();
  if (!db) throw new Error("Supabase is not configured");
  const { error } = await db.from("projects").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/"); revalidatePath("/admin/projects");
}

export async function markMessageRead(formData: FormData) {
  await requireAdmin();
  const id = text.parse(formData.get("id"));
  const db = createSupabaseAdminClient();
  if (!db) throw new Error("Supabase is not configured");
  const { error } = await db.from("messages").update({ read: true }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
  revalidatePath("/admin/messages");
}

export async function markAllMessagesRead() {
  await requireAdmin();
  const db = createSupabaseAdminClient();
  if (!db) throw new Error("Supabase is not configured");
  const { error } = await db.from("messages").update({ read: true }).eq("read", false);
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
  revalidatePath("/admin/messages");
}

export async function deleteMessage(formData: FormData) {
  await requireAdmin();
  const id = z.string().uuid().parse(formData.get("id"));
  const db = createSupabaseAdminClient();
  if (!db) throw new Error("Supabase is not configured");
  const { error } = await db.from("messages").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
  revalidatePath("/admin/messages");
}

export async function clearMessages() {
  await requireAdmin();
  const db = createSupabaseAdminClient();
  if (!db) throw new Error("Supabase is not configured");
  const { error } = await db.from("messages").delete().not("id", "is", null);
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
  revalidatePath("/admin/messages");
}

export async function signOut() {
  const client = await createSupabaseServerClient();
  await client?.auth.signOut();
  redirect("/admin/login");
}

export async function seedProjects() {
  await requireAdmin();
  const db = createSupabaseAdminClient();
  if (!db) throw new Error("Supabase is not configured");
  const rows = fallbackProjects.map((project, index) => ({
    id: project.id, name: project.name, slug: project.id, issue: project.issue, dek: project.dek,
    image: project.image, tags: project.tags, links: project.links, facts: project.facts,
    case_study: project.caseStudy, featured: index < 3, status: "published", display_order: index,
  }));
  const { error } = await db.from("projects").upsert(rows);
  if (error) throw new Error(error.message);
  revalidatePath("/"); revalidatePath("/admin"); revalidatePath("/admin/projects");
}
