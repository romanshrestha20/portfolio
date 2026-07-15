export type MediaAsset = {
  id: string;
  originalName: string;
  storagePath: string;
  thumbnailPath: string;
  publicUrl: string;
  thumbnailUrl: string;
  mimeType: string;
  sizeBytes: number;
  originalSizeBytes: number;
  width: number;
  height: number;
  altText: string;
  tags: string[];
  createdAt: string;
};

export type MediaAssetRow = {
  id: string;
  original_name: string;
  storage_path: string;
  thumbnail_path: string;
  public_url: string;
  thumbnail_url: string;
  mime_type: string;
  size_bytes: number;
  original_size_bytes: number;
  width: number;
  height: number;
  alt_text: string;
  tags: string[];
  created_at: string;
};

export function mediaRowToAsset(row: MediaAssetRow): MediaAsset {
  return {
    id: row.id,
    originalName: row.original_name,
    storagePath: row.storage_path,
    thumbnailPath: row.thumbnail_path,
    publicUrl: row.public_url,
    thumbnailUrl: row.thumbnail_url,
    mimeType: row.mime_type,
    sizeBytes: row.size_bytes,
    originalSizeBytes: row.original_size_bytes,
    width: row.width,
    height: row.height,
    altText: row.alt_text,
    tags: row.tags ?? [],
    createdAt: row.created_at,
  };
}
