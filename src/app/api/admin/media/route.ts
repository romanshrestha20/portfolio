import { NextResponse } from "next/server";
import sharp from "sharp";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { mediaRowToAsset, type MediaAssetRow } from "@/types/media";

export const runtime = "nodejs";

const BUCKET = "portfolio-media";
const MAX_INPUT_BYTES = 12_000_000;
const allowedTypes = new Set(["image/png", "image/jpeg", "image/webp", "image/avif"]);
const metadataSchema = z.object({
  altText: z.string().trim().max(240).default(""),
  tags: z.string().max(500).default(""),
});

function parseTags(value: string) {
  return [...new Set(value.split(",").map((tag) => tag.trim().toLowerCase()).filter(Boolean))].slice(0, 20);
}

export async function POST(request: Request) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await request.formData();
  const file = form.get("file");
  const parsedMetadata = metadataSchema.safeParse({
    altText: form.get("altText") ?? "",
    tags: form.get("tags") ?? "",
  });

  if (!parsedMetadata.success) {
    return NextResponse.json({ error: "Alt text or tags are too long." }, { status: 400 });
  }

  if (!(file instanceof File) || !allowedTypes.has(file.type) || file.size > MAX_INPUT_BYTES) {
    return NextResponse.json(
      { error: "Choose a PNG, JPEG, WebP, or AVIF image under 12 MB." },
      { status: 400 }
    );
  }

  const db = createSupabaseAdminClient();
  if (!db) return NextResponse.json({ error: "Storage is not configured." }, { status: 503 });

  try {
    const input = Buffer.from(await file.arrayBuffer());
    const image = sharp(input, { failOn: "error", limitInputPixels: 50_000_000 }).rotate();
    const metadata = await image.metadata();

    if (!metadata.width || !metadata.height) {
      return NextResponse.json({ error: "The image dimensions could not be read." }, { status: 400 });
    }

    const optimized = await image
      .clone()
      .resize({ width: 2400, height: 2400, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 82, effort: 4 })
      .toBuffer({ resolveWithObject: true });

    const thumbnail = await image
      .clone()
      .resize({ width: 640, height: 420, fit: "cover", position: "attention", withoutEnlargement: true })
      .webp({ quality: 74, effort: 3 })
      .toBuffer();

    const id = crypto.randomUUID();
    const storagePath = `projects/${id}/image.webp`;
    const thumbnailPath = `projects/${id}/thumbnail.webp`;
    const uploadedPaths: string[] = [];

    const fullUpload = await db.storage.from(BUCKET).upload(storagePath, optimized.data, {
      contentType: "image/webp",
      cacheControl: "31536000",
      upsert: false,
    });
    if (fullUpload.error) throw fullUpload.error;
    uploadedPaths.push(storagePath);

    const thumbnailUpload = await db.storage.from(BUCKET).upload(thumbnailPath, thumbnail, {
      contentType: "image/webp",
      cacheControl: "31536000",
      upsert: false,
    });
    if (thumbnailUpload.error) {
      await db.storage.from(BUCKET).remove(uploadedPaths);
      throw thumbnailUpload.error;
    }
    uploadedPaths.push(thumbnailPath);

    const publicUrl = db.storage.from(BUCKET).getPublicUrl(storagePath).data.publicUrl;
    const thumbnailUrl = db.storage.from(BUCKET).getPublicUrl(thumbnailPath).data.publicUrl;
    const row = {
      id,
      original_name: file.name.slice(0, 255),
      storage_path: storagePath,
      thumbnail_path: thumbnailPath,
      public_url: publicUrl,
      thumbnail_url: thumbnailUrl,
      mime_type: "image/webp",
      size_bytes: optimized.data.length,
      original_size_bytes: file.size,
      width: optimized.info.width,
      height: optimized.info.height,
      alt_text: parsedMetadata.data.altText,
      tags: parseTags(parsedMetadata.data.tags),
    };

    const { data, error } = await db.from("media_assets").insert(row).select("*").single();
    if (error) {
      await db.storage.from(BUCKET).remove(uploadedPaths);
      throw error;
    }

    return NextResponse.json({ asset: mediaRowToAsset(data as MediaAssetRow) }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "The image could not be processed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
