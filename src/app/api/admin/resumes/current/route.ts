import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

const selectionSchema = z.object({ assetId: z.string().uuid() });

export async function PATCH(request: Request) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = selectionSchema.safeParse(await request.json().catch(() => null));
  if (!body.success) return NextResponse.json({ error: "Choose a valid résumé version." }, { status: 400 });

  const db = createSupabaseAdminClient();
  if (!db) return NextResponse.json({ error: "Database is not configured." }, { status: 503 });

  const { data: asset } = await db
    .from("resume_assets")
    .select("id,public_url")
    .eq("id", body.data.assetId)
    .maybeSingle();
  if (!asset) return NextResponse.json({ error: "That résumé version no longer exists." }, { status: 404 });

  const { data: current } = await db.from("site_settings").select("content").eq("id", "main").maybeSingle();
  const content = current?.content && typeof current.content === "object" ? current.content : {};
  const { error } = await db.from("site_settings").upsert({
    id: "main",
    content: { ...content, resumeAssetId: asset.id },
    updated_at: new Date().toISOString(),
  });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidatePath("/");
  revalidatePath("/admin/settings");
  return NextResponse.json({ assetId: asset.id, publicUrl: asset.public_url });
}
