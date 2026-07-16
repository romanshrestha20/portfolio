import "server-only";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { mediaRowToAsset, type MediaAssetRow } from "@/types/media";

export type PortfolioProfile = {
  assetId: string | null;
  imageUrl: string;
  altText: string;
};

const fallbackProfile: PortfolioProfile = {
  assetId: null,
  imageUrl: "/profile-portrait.png",
  altText: "Roman Shrestha",
};

export async function getPortfolioProfile(): Promise<PortfolioProfile> {
  const db = createSupabaseAdminClient();
  if (!db) return fallbackProfile;

  const { data: settings } = await db
    .from("site_settings")
    .select("content")
    .eq("id", "main")
    .maybeSingle();

  const content = settings?.content as { profileImageId?: unknown } | undefined;
  if (typeof content?.profileImageId !== "string") return fallbackProfile;

  const { data: media } = await db
    .from("media_assets")
    .select("*")
    .eq("id", content.profileImageId)
    .maybeSingle();

  if (!media) return fallbackProfile;
  const asset = mediaRowToAsset(media as MediaAssetRow);
  return {
    assetId: asset.id,
    imageUrl: asset.publicUrl,
    altText: asset.altText || fallbackProfile.altText,
  };
}
