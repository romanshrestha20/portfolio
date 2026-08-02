import "server-only";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { mediaRowToAsset, type MediaAssetRow } from "@/types/media";
import type { PersonalDetails, PersonalDetailsVersion } from "@/types/site-settings";

export type PortfolioProfile = {
  assetId: string | null;
  imageUrl: string;
  altText: string;
};

export type PortfolioSettings = {
  profile: PortfolioProfile;
  resumeUrl: string;
  personalDetails: PersonalDetails;
};

const FALLBACK_RESUME_URL = "https://tinyurl.com/ycyjhkbk";

const fallbackProfile: PortfolioProfile = {
  assetId: null,
  imageUrl: "/profile-portrait.png",
  altText: "Roman Shrestha",
};

export const DEFAULT_PERSONAL_DETAILS: PersonalDetails = {
  name: "Roman Shrestha",
  role: "Software Engineer",
  location: "Helsinki, Finland",
  availability: "Available for internship",
  heroIntro: "Full-stack web and mobile products—engineered for clear flows, dependable systems, and actual people.",
  aboutIntro: "I’m Roman, a software engineering student who likes turning complex flows into products that feel direct and dependable.",
  aboutBody: "My recent work spans React interfaces, Django backends, API-driven products, and mobile applications. I care about readable code, calm interfaces, and understanding the reason behind every feature I build.",
  study: "Software Engineering · 2023—2027",
  focus: "Frontend and full-stack product work",
  outsideCode: "Football, travel, strong team environments",
  email: "stha.roman20@outlook.com",
  linkedinUrl: "https://www.linkedin.com/in/romanshrr/",
  githubUrl: "https://github.com/romanshrestha20",
  coordinates: "60.1699° N, 24.9384° E",
  contactPrompt: "Have a role, collaboration, or product idea in mind?",
  responseTime: "Send a short note. I usually respond within a couple of days.",
  footerNote: "Built in Helsinki",
};

export function normalizePersonalDetails(value: unknown): PersonalDetails {
  if (!value || typeof value !== "object" || Array.isArray(value)) return DEFAULT_PERSONAL_DETAILS;
  const record = value as Record<string, unknown>;
  return Object.fromEntries(
    Object.entries(DEFAULT_PERSONAL_DETAILS).map(([key, fallback]) => [
      key,
      typeof record[key] === "string" && record[key].trim() ? record[key] : fallback,
    ])
  ) as PersonalDetails;
}

export async function getPortfolioSettings(): Promise<PortfolioSettings> {
  const db = createSupabaseAdminClient();
  if (!db) return { profile: fallbackProfile, resumeUrl: FALLBACK_RESUME_URL, personalDetails: DEFAULT_PERSONAL_DETAILS };

  const { data: settings } = await db
    .from("site_settings")
    .select("content")
    .eq("id", "main")
    .maybeSingle();

  const content = settings?.content as { profileImageId?: unknown; resumeAssetId?: unknown; personalDetails?: unknown } | undefined;
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
    personalDetails: normalizePersonalDetails(content?.personalDetails),
  };
}

export async function getPortfolioProfile(): Promise<PortfolioProfile> {
  return (await getPortfolioSettings()).profile;
}

export async function getPersonalDetailsHistory(): Promise<{
  versions: PersonalDetailsVersion[];
  error: string | null;
}> {
  const db = createSupabaseAdminClient();
  if (!db) return { versions: [], error: "Supabase is not configured." };

  const { data, error } = await db
    .from("personal_details_history")
    .select("id,details,created_at")
    .order("created_at", { ascending: false })
    .limit(25);

  if (error) {
    return {
      versions: [],
      error: error.message.includes("personal_details_history")
        ? "Run the personal-details history migration to begin recording versions."
        : error.message,
    };
  }

  return {
    versions: (data ?? []).map((row) => ({
      id: row.id as string,
      details: normalizePersonalDetails(row.details),
      createdAt: row.created_at as string,
    })),
    error: null,
  };
}
