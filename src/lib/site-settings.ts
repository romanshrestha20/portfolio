import "server-only";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { mediaRowToAsset, type MediaAssetRow } from "@/types/media";

export type PortfolioProfile = {
  assetId: string | null;
  imageUrl: string;
  altText: string;
};

export type PortfolioSettings = {
  profile: PortfolioProfile;
  resumeUrl: string;
};

const FALLBACK_RESUME_URL = "https://tinyurl.com/ycyjhkbk";

const fallbackProfile: PortfolioProfile = {
  assetId: null,
  imageUrl: "/profile-portrait.png",
  altText: "Roman Shrestha",
};

export async function getPortfolioSettings(): Promise<PortfolioSettings> {
  const db = createSupabaseAdminClient();
  if (!db) return { profile: fallbackProfile, resumeUrl: FALLBACK_RESUME_URL };

  const { data: settings } = await db
    .from("site_settings")
    .select("content")
    .eq("id", "main")
    .maybeSingle();

  const content = settings?.content as { profileImageId?: unknown; resumeAssetId?: unknown } | undefined;
  const [mediaResult, resumeResult] = await Promise.all([
    typeof content?.profileImageId === "string"
      ? db.from("media_assets").select("*").eq("id", content.profileImageId).maybeSingle()
      : Promise.resolve({ data: null }),
    typeof content?.resumeAssetId === "string"
      ? db.from("resume_assets").select("public_url").eq("id", content.resumeAssetId).maybeSingle()
      : Promise.resolve({ data: null }),
  ]);

  const media = mediaResult.data;
  const profile = media
    ? (() => {
        const asset = mediaRowToAsset(media as MediaAssetRow);
        return { assetId: asset.id, imageUrl: asset.publicUrl, altText: asset.altText || fallbackProfile.altText };
      })()
    : fallbackProfile;

  return {
    profile,
    resumeUrl: resumeResult.data?.public_url ?? FALLBACK_RESUME_URL,
  };
}

export async function getPortfolioProfile(): Promise<PortfolioProfile> {
  return (await getPortfolioSettings()).profile;
}
