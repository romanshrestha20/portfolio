import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { resumeRowToAsset, type ResumeAssetRow } from "@/types/resume";

export const runtime = "nodejs";

const BUCKET = "portfolio-media";
const MAX_INPUT_BYTES = 12_000_000;

function isPdf(buffer: Buffer) {
  if (buffer.length < 12 || !/^%PDF-(?:1\.[0-7]|2\.0)/.test(buffer.subarray(0, 8).toString("ascii"))) {
    return false;
  }
  const trailer = buffer.subarray(Math.max(0, buffer.length - 4096)).toString("latin1");
  return trailer.includes("%%EOF");
}

export async function POST(request: Request) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await request.formData();
  const file = form.get("file");
  if (
    !(file instanceof File) ||
    file.type !== "application/pdf" ||
    !file.name.toLowerCase().endsWith(".pdf") ||
    file.size === 0 ||
    file.size > MAX_INPUT_BYTES
  ) {
    return NextResponse.json({ error: "Choose a PDF file under 12 MB." }, { status: 400 });
  }

  const db = createSupabaseAdminClient();
  if (!db) return NextResponse.json({ error: "Storage is not configured." }, { status: 503 });

  const input = Buffer.from(await file.arrayBuffer());
  if (!isPdf(input)) {
    return NextResponse.json({ error: "The selected file is not a valid PDF." }, { status: 400 });
  }

  const id = crypto.randomUUID();
  const storagePath = `resumes/${id}.pdf`;
  const upload = await db.storage.from(BUCKET).upload(storagePath, input, {
    contentType: "application/pdf",
    cacheControl: "31536000",
    upsert: false,
  });
  if (upload.error) return NextResponse.json({ error: upload.error.message }, { status: 500 });

  const publicUrl = db.storage.from(BUCKET).getPublicUrl(storagePath).data.publicUrl;
  const { data, error: insertError } = await db
    .from("resume_assets")
    .insert({
      id,
      original_name: file.name.slice(0, 255),
      storage_path: storagePath,
      public_url: publicUrl,
      size_bytes: file.size,
    })
    .select("*")
    .single();

  if (insertError) {
    await db.storage.from(BUCKET).remove([storagePath]);
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  const { data: current } = await db.from("site_settings").select("content").eq("id", "main").maybeSingle();
  const content = current?.content && typeof current.content === "object" ? current.content : {};
  const { error: settingsError } = await db.from("site_settings").upsert({
    id: "main",
    content: { ...content, resumeAssetId: id },
    updated_at: new Date().toISOString(),
  });

  if (settingsError) {
    return NextResponse.json(
      { error: `The PDF was saved, but could not be made active: ${settingsError.message}` },
      { status: 500 }
    );
  }

  revalidatePath("/");
  revalidatePath("/admin/settings");
  return NextResponse.json({ asset: resumeRowToAsset(data as ResumeAssetRow) }, { status: 201 });
}
