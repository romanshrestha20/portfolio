import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { mediaRowToAsset, type MediaAssetRow } from "@/types/media";

const BUCKET = "portfolio-media";
const updateSchema = z.object({
  altText: z.string().trim().max(240),
  tags: z.array(z.string().trim().min(1).max(40)).max(20),
});

async function authorize() {
  try {
    await requireAdmin();
    return true;
  } catch {
    return false;
  }
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!(await authorize())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = updateSchema.safeParse(await request.json().catch(() => null));
  if (!body.success) return NextResponse.json({ error: "Invalid media metadata." }, { status: 400 });

  const db = createSupabaseAdminClient();
  if (!db) return NextResponse.json({ error: "Database is not configured." }, { status: 503 });
  const { id } = await context.params;
  const tags = [...new Set(body.data.tags.map((tag) => tag.toLowerCase()))];
  const { data, error } = await db
    .from("media_assets")
    .update({ alt_text: body.data.altText, tags, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select("*")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  revalidatePath("/");
  revalidatePath("/admin/media");
  return NextResponse.json({ asset: mediaRowToAsset(data as MediaAssetRow) });
}

export async function DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
  if (!(await authorize())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = createSupabaseAdminClient();
  if (!db) return NextResponse.json({ error: "Database is not configured." }, { status: 503 });
  const { id } = await context.params;

  const { data, error } = await db.from("media_assets").select("*").eq("id", id).single();
  if (error || !data) return NextResponse.json({ error: "Media asset was not found." }, { status: 404 });
  const asset = data as MediaAssetRow;

  const { data: settings } = await db
    .from("site_settings")
    .select("content")
    .eq("id", "main")
    .maybeSingle();
  const content = settings?.content as { profileImageId?: unknown } | undefined;
  if (content?.profileImageId === asset.id) {
    return NextResponse.json(
      { error: "This image is your active portfolio portrait. Remove or replace it before deleting it." },
      { status: 409 }
    );
  }

  const { data: projectUsingAsset } = await db
    .from("projects")
    .select("id,name")
    .eq("image", asset.public_url)
    .limit(1)
    .maybeSingle();

  if (projectUsingAsset) {
    return NextResponse.json(
      { error: `This image is used by ${projectUsingAsset.name}. Replace that project image before deleting it.` },
      { status: 409 }
    );
  }

  const storageDelete = await db.storage
    .from(BUCKET)
    .remove([asset.storage_path, asset.thumbnail_path]);
  if (storageDelete.error) return NextResponse.json({ error: storageDelete.error.message }, { status: 500 });

  const databaseDelete = await db.from("media_assets").delete().eq("id", id);
  if (databaseDelete.error) return NextResponse.json({ error: databaseDelete.error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
