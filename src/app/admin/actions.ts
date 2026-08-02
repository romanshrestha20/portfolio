"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { projects as fallbackProjects } from "@/data/projects";
import type { PersonalDetails } from "@/types/site-settings";

const text = z.string().trim().min(1);
const webUrl = z.string().trim().url().max(300).refine((value) => {
  const protocol = new URL(value).protocol;
  return protocol === "http:" || protocol === "https:";
}, "Use an http or https URL");
const projectSchema = z.object({
  id: text, name: text, slug: text.regex(/^[a-z0-9-]+$/), issue: text, dek: text,
  image: text, tags: text, role: text, focus: text, format: text,
  kicker: text, headline: text, sections: text,
  liveUrl: z.string(), codeUrl: z.string(), status: z.enum(["draft", "published"]),
  featured: z.boolean(), displayOrder: z.coerce.number().int().min(0),
});

export type SaveProjectState = { status: "idle" | "success" | "error"; message?: string };
export type SavePersonalDetailsState = { status: "idle" | "success" | "error"; message?: string };
export type RestorePersonalDetailsState = { status: "idle" | "success" | "error"; message?: string };

const personalDetailsSchema = z.object({
  name: text.max(80),
  role: text.max(100),
  location: text.max(100),
  availability: text.max(120),
  heroIntro: text.max(320),
  aboutIntro: text.max(500),
  aboutBody: text.max(1200),
  study: text.max(160),
  focus: text.max(160),
  outsideCode: text.max(200),
  email: z.string().trim().email().max(160),
  linkedinUrl: webUrl,
  githubUrl: webUrl,
  coordinates: text.max(100),
  contactPrompt: text.max(240),
  responseTime: text.max(300),
  footerNote: text.max(120),
});

export async function savePersonalDetails(
  _previousState: SavePersonalDetailsState,
  formData: FormData
): Promise<SavePersonalDetailsState> {
  try {
    await requireAdmin();
    const details = personalDetailsSchema.parse(Object.fromEntries(formData)) as PersonalDetails;
    const db = createSupabaseAdminClient();
    if (!db) return { status: "error", message: "Supabase is not configured." };

    const { data: current } = await db.from("site_settings").select("content").eq("id", "main").maybeSingle();
    const content = current?.content && typeof current.content === "object" && !Array.isArray(current.content)
      ? current.content as Record<string, unknown>
      : {};
    const { error } = await db.from("site_settings").upsert({
      id: "main",
      content: { ...content, personalDetails: details },
      updated_at: new Date().toISOString(),
    });
    if (error) return { status: "error", message: error.message };

    revalidatePath("/");
    revalidatePath("/admin/settings");
    return { status: "success", message: "Personal details published." };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { status: "error", message: "Check every field and enter valid email and profile URLs." };
    }
    return { status: "error", message: error instanceof Error ? error.message : "Personal details could not be saved." };
  }
}

export async function restorePersonalDetails(
  _previousState: RestorePersonalDetailsState,
  formData: FormData
): Promise<RestorePersonalDetailsState> {
  try {
    await requireAdmin();
    const versionId = z.string().uuid().parse(formData.get("versionId"));
    const db = createSupabaseAdminClient();
    if (!db) return { status: "error", message: "Supabase is not configured." };

    const [{ data: version, error: versionError }, { data: current }] = await Promise.all([
      db.from("personal_details_history").select("details").eq("id", versionId).maybeSingle(),
      db.from("site_settings").select("content").eq("id", "main").maybeSingle(),
    ]);
    if (versionError || !version) {
      return { status: "error", message: versionError?.message ?? "That version no longer exists." };
    }

    const details = personalDetailsSchema.parse(version.details) as PersonalDetails;
    const content = current?.content && typeof current.content === "object" && !Array.isArray(current.content)
      ? current.content as Record<string, unknown>
      : {};
    const { error } = await db.from("site_settings").upsert({
      id: "main",
      content: { ...content, personalDetails: details },
      updated_at: new Date().toISOString(),
    });
    if (error) return { status: "error", message: error.message };

    revalidatePath("/");
    revalidatePath("/admin/settings");
    return { status: "success", message: "Version restored and published as a new revision." };
  } catch (error) {
    return { status: "error", message: error instanceof Error ? error.message : "The version could not be restored." };
  }
}

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
