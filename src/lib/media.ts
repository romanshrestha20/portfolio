import "server-only";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { mediaRowToAsset, type MediaAsset, type MediaAssetRow } from "@/types/media";

export async function getMediaAssets(): Promise<{ assets: MediaAsset[]; error: string | null }> {
  const db = createSupabaseAdminClient();
  if (!db) return { assets: [], error: "Supabase is not configured." };

  const { data, error } = await db
    .from("media_assets")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    const migrationMissing = error.message.includes("media_assets");
    return {
      assets: [],
      error: migrationMissing
        ? "The media library migration has not been run yet."
        : error.message,
    };
  }

  return {
    assets: ((data ?? []) as MediaAssetRow[]).map(mediaRowToAsset),
    error: null,
  };
}
