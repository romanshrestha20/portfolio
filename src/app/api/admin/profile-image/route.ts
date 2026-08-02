import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

const selectionSchema = z.object({ assetId: z.string().uuid() });

async function authorize() {
  try {
    await requireAdmin();
    return true;
  } catch {
    return false;
  }
}

export async function PATCH(request: Request) {
  if (!(await authorize())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = selectionSchema.safeParse(await request.json().catch(() => null));
  if (!body.success) return NextResponse.json({ error: "Choose a valid media asset." }, { status: 400 });

  const db = createSupabaseAdminClient();
  if (!db) return NextResponse.json({ error: "Database is not configured." }, { status: 503 });

  const { data: asset } = await db
    .from("media_assets")
    .select("id,public_url")
    .eq("id", body.data.assetId)
    .maybeSingle();
  if (!asset) return NextResponse.json({ error: "That media asset no longer exists." }, { status: 404 });

  const { data: current } = await db.from("site_settings").select("content").eq("id", "main").maybeSingle();
  const content = current?.content && typeof current.content === "object" ? current.content : {};
  const { error } = await db.from("site_settings").upsert({
    id: "main",
    content: { ...content, profileImageId: asset.id },
    updated_at: new Date().toISOString(),
  });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidatePath("/");
  revalidatePath("/admin/media");
  revalidatePath("/admin/settings");
  return NextResponse.json({ assetId: asset.id, imageUrl: asset.public_url });
}

export async function DELETE() {
  if (!(await authorize())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = createSupabaseAdminClient();
  if (!db) return NextResponse.json({ error: "Database is not configured." }, { status: 503 });

  const { data: current } = await db.from("site_settings").select("content").eq("id", "main").maybeSingle();
  const content = current?.content && typeof current.content === "object"
    ? { ...(current.content as Record<string, unknown>) }
    : {};
  delete content.profileImageId;

  const { error } = await db.from("site_settings").upsert({
    id: "main",
    content,
    updated_at: new Date().toISOString(),
  });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidatePath("/");
  revalidatePath("/admin/media");
  revalidatePath("/admin/settings");
  return NextResponse.json({ imageUrl: "/profile-portrait.png" });
}
