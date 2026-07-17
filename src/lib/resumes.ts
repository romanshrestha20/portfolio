import "server-only";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { resumeRowToAsset, type ResumeAsset, type ResumeAssetRow } from "@/types/resume";

export async function getResumeAssets(): Promise<{ assets: ResumeAsset[]; activeId: string | null; error: string | null }> {
  const db = createSupabaseAdminClient();
  if (!db) return { assets: [], activeId: null, error: "Supabase is not configured." };

  const [{ data: rows, error }, { data: settings }] = await Promise.all([
    db.from("resume_assets").select("*").order("created_at", { ascending: false }),
    db.from("site_settings").select("content").eq("id", "main").maybeSingle(),
  ]);

  if (error) {
    return {
      assets: [],
      activeId: null,
      error: error.message.includes("resume_assets")
        ? "The résumé storage migration has not been run yet."
        : error.message,
    };
  }

  const content = settings?.content as { resumeAssetId?: unknown } | undefined;
  return {
    assets: ((rows ?? []) as ResumeAssetRow[]).map(resumeRowToAsset),
    activeId: typeof content?.resumeAssetId === "string" ? content.resumeAssetId : null,
    error: null,
  };
}
