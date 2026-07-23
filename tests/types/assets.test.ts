import { describe, expect, it } from "vitest";
import { mediaRowToAsset, type MediaAssetRow } from "@/types/media";
import { resumeRowToAsset, type ResumeAssetRow } from "@/types/resume";

describe("asset row converters", () => {
  it("converts a database media row to the application shape", () => {
    const row: MediaAssetRow = {
      id: "media-1",
      original_name: "portrait.png",
      storage_path: "media/portrait.png",
      thumbnail_path: "media/thumb-portrait.webp",
      public_url: "https://cdn.example.com/portrait.png",
      thumbnail_url: "https://cdn.example.com/thumb-portrait.webp",
      mime_type: "image/png",
      size_bytes: 120_000,
      original_size_bytes: 480_000,
      width: 1200,
      height: 1600,
      alt_text: "A portrait",
      tags: ["profile", "portrait"],
      created_at: "2026-07-23T10:00:00.000Z",
    };

    expect(mediaRowToAsset(row)).toEqual({
      id: "media-1",
      originalName: "portrait.png",
      storagePath: "media/portrait.png",
      thumbnailPath: "media/thumb-portrait.webp",
      publicUrl: "https://cdn.example.com/portrait.png",
      thumbnailUrl: "https://cdn.example.com/thumb-portrait.webp",
      mimeType: "image/png",
      sizeBytes: 120_000,
      originalSizeBytes: 480_000,
      width: 1200,
      height: 1600,
      altText: "A portrait",
      tags: ["profile", "portrait"],
      createdAt: "2026-07-23T10:00:00.000Z",
    });
  });

  it("uses an empty tag list when a legacy media row has null tags", () => {
    const row = {
      id: "legacy",
      original_name: "legacy.jpg",
      storage_path: "media/legacy.jpg",
      thumbnail_path: "media/thumb-legacy.webp",
      public_url: "/legacy.jpg",
      thumbnail_url: "/thumb-legacy.webp",
      mime_type: "image/jpeg",
      size_bytes: 1,
      original_size_bytes: 2,
      width: 10,
      height: 10,
      alt_text: "",
      tags: null,
      created_at: "2026-01-01T00:00:00.000Z",
    } as unknown as MediaAssetRow;

    expect(mediaRowToAsset(row).tags).toEqual([]);
  });

  it("converts a database résumé row to the application shape", () => {
    const row: ResumeAssetRow = {
      id: "resume-1",
      original_name: "roman-resume.pdf",
      storage_path: "resumes/roman-resume.pdf",
      public_url: "https://cdn.example.com/roman-resume.pdf",
      size_bytes: 42_000,
      created_at: "2026-07-23T10:00:00.000Z",
    };

    expect(resumeRowToAsset(row)).toEqual({
      id: "resume-1",
      originalName: "roman-resume.pdf",
      storagePath: "resumes/roman-resume.pdf",
      publicUrl: "https://cdn.example.com/roman-resume.pdf",
      sizeBytes: 42_000,
      createdAt: "2026-07-23T10:00:00.000Z",
    });
  });
});
