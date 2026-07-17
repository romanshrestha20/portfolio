export type ResumeAsset = {
  id: string;
  originalName: string;
  storagePath: string;
  publicUrl: string;
  sizeBytes: number;
  createdAt: string;
};

export type ResumeAssetRow = {
  id: string;
  original_name: string;
  storage_path: string;
  public_url: string;
  size_bytes: number;
  created_at: string;
};

export function resumeRowToAsset(row: ResumeAssetRow): ResumeAsset {
  return {
    id: row.id,
    originalName: row.original_name,
    storagePath: row.storage_path,
    publicUrl: row.public_url,
    sizeBytes: row.size_bytes,
    createdAt: row.created_at,
  };
}
