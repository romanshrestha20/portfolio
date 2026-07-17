"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Check,
  Copy,
  FileImage,
  ImagePlus,
  LoaderCircle,
  Pencil,
  Search,
  Trash2,
  Upload,
  UserRound,
  X,
} from "lucide-react";
import type { MediaAsset } from "@/types/media";

type Notice = { tone: "success" | "error"; message: string } | null;

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export default function MediaLibrary({ initialAssets, initialProfile }: {
  initialAssets: MediaAsset[];
  initialProfile: { assetId: string | null; imageUrl: string; altText: string };
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [assets, setAssets] = useState(initialAssets);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [altText, setAltText] = useState("");
  const [tags, setTags] = useState("");
  const [query, setQuery] = useState("");
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [notice, setNotice] = useState<Notice>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [profile, setProfile] = useState(initialProfile);
  const [settingProfileId, setSettingProfileId] = useState<string | null>(null);
  const [clearingProfile, setClearingProfile] = useState(false);

  useEffect(() => {
    if (!file) {
      setPreview("");
      return undefined;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const filteredAssets = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return assets;
    return assets.filter((asset) =>
      [asset.originalName, asset.altText, ...asset.tags].join(" ").toLowerCase().includes(normalized)
    );
  }, [assets, query]);

  const totalOptimizedBytes = assets.reduce((sum, asset) => sum + asset.sizeBytes, 0);
  const totalOriginalBytes = assets.reduce((sum, asset) => sum + asset.originalSizeBytes, 0);
  const bytesSaved = Math.max(0, totalOriginalBytes - totalOptimizedBytes);

  function chooseFile(nextFile?: File) {
    if (!nextFile) return;
    if (!nextFile.type.startsWith("image/")) {
      setNotice({ tone: "error", message: "Choose an image file." });
      return;
    }
    setFile(nextFile);
    setAltText("");
    setTags("");
    setNotice(null);
  }

  function resetUpload() {
    setFile(null);
    setAltText("");
    setTags("");
    setProgress(0);
    if (inputRef.current) inputRef.current.value = "";
  }

  function upload(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!file || uploading) return;
    setUploading(true);
    setProgress(0);
    setNotice(null);

    const body = new FormData();
    body.append("file", file);
    body.append("altText", altText);
    body.append("tags", tags);

    const request = new XMLHttpRequest();
    request.open("POST", "/api/admin/media");
    request.upload.onprogress = (progressEvent) => {
      if (progressEvent.lengthComputable) {
        setProgress(Math.round((progressEvent.loaded / progressEvent.total) * 100));
      }
    };
    request.onload = () => {
      setUploading(false);
      const result = JSON.parse(request.responseText || "{}");
      if (request.status < 200 || request.status >= 300) {
        setNotice({ tone: "error", message: result.error ?? "Upload failed." });
        return;
      }
      setAssets((current) => [result.asset, ...current]);
      setNotice({ tone: "success", message: "Image optimized and added to the media library." });
      resetUpload();
    };
    request.onerror = () => {
      setUploading(false);
      setNotice({ tone: "error", message: "The network connection interrupted the upload." });
    };
    request.send(body);
  }

  async function copyUrl(url: string) {
    await navigator.clipboard.writeText(url);
    setNotice({ tone: "success", message: "Public image URL copied." });
  }

  async function saveMetadata(asset: MediaAsset, nextAltText: string, nextTags: string) {
    setNotice(null);
    const response = await fetch(`/api/admin/media/${asset.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        altText: nextAltText,
        tags: nextTags.split(",").map((tag) => tag.trim()).filter(Boolean),
      }),
    });
    const result = await response.json();
    if (!response.ok) {
      setNotice({ tone: "error", message: result.error ?? "Metadata could not be saved." });
      return;
    }
    setAssets((current) => current.map((item) => (item.id === asset.id ? result.asset : item)));
    setEditingId(null);
    setNotice({ tone: "success", message: "Image details updated." });
  }

  async function deleteAsset(asset: MediaAsset) {
    if (!window.confirm(`Delete ${asset.originalName}? This cannot be undone.`)) return;
    setDeletingId(asset.id);
    setNotice(null);
    const response = await fetch(`/api/admin/media/${asset.id}`, { method: "DELETE" });
    const result = await response.json();
    setDeletingId(null);
    if (!response.ok) {
      setNotice({ tone: "error", message: result.error ?? "The image could not be deleted." });
      return;
    }
    setAssets((current) => current.filter((item) => item.id !== asset.id));
    setNotice({ tone: "success", message: "Image and thumbnail deleted." });
  }

  async function useAsProfile(asset: MediaAsset) {
    setSettingProfileId(asset.id);
    setNotice(null);
    const response = await fetch("/api/admin/profile-image", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ assetId: asset.id }),
    });
    const result = await response.json();
    setSettingProfileId(null);
    if (!response.ok) {
      setNotice({ tone: "error", message: result.error ?? "The portfolio portrait could not be updated." });
      return;
    }
    setProfile({
      assetId: asset.id,
      imageUrl: asset.publicUrl,
      altText: asset.altText || "Roman Shrestha",
    });
    setNotice({ tone: "success", message: "Portfolio portrait updated. The homepage now uses this image." });
  }

  async function clearProfile() {
    setClearingProfile(true);
    setNotice(null);
    const response = await fetch("/api/admin/profile-image", { method: "DELETE" });
    const result = await response.json();
    setClearingProfile(false);
    if (!response.ok) {
      setNotice({ tone: "error", message: result.error ?? "The portfolio portrait could not be removed." });
      return;
    }
    setProfile({ assetId: null, imageUrl: result.imageUrl, altText: "Roman Shrestha" });
    setNotice({ tone: "success", message: "Managed portrait removed. The homepage is using the default image." });
  }

  return (
    <div className="mt-10">
      <div className="grid border-y border-white/10 sm:grid-cols-3">
        <div className="media-stat"><span>Assets</span><strong>{assets.length}</strong></div>
        <div className="media-stat"><span>Optimized storage</span><strong>{formatBytes(totalOptimizedBytes)}</strong></div>
        <div className="media-stat"><span>Saved by compression</span><strong>{formatBytes(bytesSaved)}</strong></div>
      </div>

      <section className="mt-10 grid gap-6 border-y border-white/10 py-6 sm:grid-cols-[180px_1fr_auto] sm:items-center">
        <div className="relative aspect-square max-w-[180px] overflow-hidden bg-black/40">
          <img src={profile.imageUrl} alt={profile.altText} className="h-full w-full object-cover" />
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-2 bg-black/75 px-2.5 py-1.5 font-mono text-[8px] uppercase tracking-[.14em] text-signal backdrop-blur">
            <span className="admin-live-dot h-1.5 w-1.5" /> Live
          </span>
        </div>
        <div>
          <p className="admin-kicker">Homepage portrait</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-[-.04em] text-white">
            {profile.assetId ? "Managed in this library" : "Using the default portrait"}
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-500">
            Use the portrait button beside any asset to show it in the homepage hero. Edit that asset to keep its alt text accessible.
          </p>
        </div>
        {profile.assetId && (
          <button type="button" onClick={clearProfile} disabled={clearingProfile} className="signal-button w-fit">
            {clearingProfile ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <X className="h-4 w-4" />}
            Use default
          </button>
        )}
      </section>

      {notice && (
        <div className={`mt-6 flex items-start justify-between gap-4 border px-4 py-3 text-sm ${notice.tone === "success" ? "admin-notice-success" : "border-red-400/30 bg-red-400/5 text-red-200"}`} role="status">
          <span>{notice.message}</span>
          <button type="button" onClick={() => setNotice(null)} aria-label="Dismiss message"><X className="h-4 w-4" /></button>
        </div>
      )}

      <form onSubmit={upload} className="mt-10">
        <div
          className={`relative border border-dashed p-6 transition sm:p-8 ${dragging ? "admin-selected" : "border-white/20 bg-white/[.015]"}`}
          onDragEnter={(event) => { event.preventDefault(); setDragging(true); }}
          onDragOver={(event) => event.preventDefault()}
          onDragLeave={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node)) setDragging(false); }}
          onDrop={(event) => { event.preventDefault(); setDragging(false); chooseFile(event.dataTransfer.files[0]); }}
        >
          {!file ? (
            <button type="button" onClick={() => inputRef.current?.click()} className="flex min-h-44 w-full flex-col items-center justify-center text-center">
              <span className="flex h-12 w-12 items-center justify-center border border-white/10 text-signal"><ImagePlus className="h-5 w-5" /></span>
              <strong className="mt-5 text-base text-white">Drop an image here</strong>
              <span className="mt-2 max-w-md text-sm leading-6 text-zinc-500">PNG, JPEG, WebP, or AVIF up to 12 MB. It will be converted to WebP and resized automatically.</span>
              <span className="signal-button mt-5">Choose image</span>
            </button>
          ) : (
            <div className="grid gap-7 md:grid-cols-[260px_1fr]">
              <div className="relative aspect-[16/11] overflow-hidden bg-black/40">
                {/* Local object URLs are intentionally rendered directly for upload preview. */}
                <img src={preview} alt="Upload preview" className="h-full w-full object-contain" />
              </div>
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div><p className="font-medium text-white">{file.name}</p><p className="mt-1 text-xs text-zinc-500">{formatBytes(file.size)}</p></div>
                  <button type="button" onClick={resetUpload} className="signal-icon-button" aria-label="Remove selected image"><X className="h-4 w-4" /></button>
                </div>
                <div className="mt-6 grid gap-5">
                  <label className="signal-label flex flex-col gap-2">Alt text<input className="signal-control" value={altText} onChange={(event) => setAltText(event.target.value)} placeholder="Describe the image for screen readers" maxLength={240} /></label>
                  <label className="signal-label flex flex-col gap-2">Tags<input className="signal-control" value={tags} onChange={(event) => setTags(event.target.value)} placeholder="project, mobile, dashboard" /></label>
                </div>
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <button className="signal-button signal-button-primary" disabled={uploading}>{uploading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}{uploading ? `Uploading ${progress}%` : "Optimize and upload"}</button>
                  {uploading && <div className="h-1.5 min-w-36 flex-1 overflow-hidden bg-white/10"><div className="h-full bg-signal transition-[width]" style={{ width: `${progress}%` }} /></div>}
                </div>
              </div>
            </div>
          )}
          <input ref={inputRef} className="sr-only" type="file" accept="image/png,image/jpeg,image/webp,image/avif" onChange={(event) => chooseFile(event.target.files?.[0])} />
        </div>
      </form>

      <div className="mt-16 flex flex-col gap-5 border-b border-white/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div><p className="admin-kicker">Library</p><h2 className="mt-2 text-2xl font-semibold tracking-[-.04em] text-white">Uploaded assets</h2></div>
        <label className="relative block w-full sm:max-w-xs"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" /><input className="signal-control pl-10" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search name, alt text, or tag" aria-label="Search media" /></label>
      </div>

      <div className="divide-y divide-white/10">
        {filteredAssets.map((asset) => (
          <MediaRow
            key={asset.id}
            asset={asset}
            editing={editingId === asset.id}
            deleting={deletingId === asset.id}
            activeProfile={profile.assetId === asset.id}
            settingProfile={settingProfileId === asset.id}
            onEdit={() => setEditingId(asset.id)}
            onCancelEdit={() => setEditingId(null)}
            onSave={saveMetadata}
            onCopy={copyUrl}
            onDelete={deleteAsset}
            onUseProfile={useAsProfile}
          />
        ))}
      </div>

      {filteredAssets.length === 0 && (
        <div className="flex min-h-48 flex-col items-center justify-center border-b border-white/10 text-center">
          <FileImage className="h-6 w-6 text-zinc-700" />
          <p className="mt-4 text-sm text-zinc-500">{assets.length ? "No assets match that search." : "No images uploaded yet."}</p>
        </div>
      )}
    </div>
  );
}

function MediaRow({ asset, editing, deleting, activeProfile, settingProfile, onEdit, onCancelEdit, onSave, onCopy, onDelete, onUseProfile }: {
  asset: MediaAsset;
  editing: boolean;
  deleting: boolean;
  activeProfile: boolean;
  settingProfile: boolean;
  onEdit: () => void;
  onCancelEdit: () => void;
  onSave: (asset: MediaAsset, altText: string, tags: string) => Promise<void>;
  onCopy: (url: string) => Promise<void>;
  onDelete: (asset: MediaAsset) => Promise<void>;
  onUseProfile: (asset: MediaAsset) => Promise<void>;
}) {
  const [draftAlt, setDraftAlt] = useState(asset.altText);
  const [draftTags, setDraftTags] = useState(asset.tags.join(", "));
  const [saving, setSaving] = useState(false);
  const reduction = asset.originalSizeBytes > 0
    ? Math.max(0, Math.round((1 - asset.sizeBytes / asset.originalSizeBytes) * 100))
    : 0;

  useEffect(() => { setDraftAlt(asset.altText); setDraftTags(asset.tags.join(", ")); }, [asset]);

  async function handleSave() {
    setSaving(true);
    await onSave(asset, draftAlt, draftTags);
    setSaving(false);
  }

  return (
    <article className="grid gap-5 py-6 md:grid-cols-[180px_1fr_auto] md:items-start">
      <div className="aspect-[16/11] overflow-hidden bg-black/40"><img src={asset.thumbnailUrl} alt={asset.altText || "Media thumbnail"} loading="lazy" className="h-full w-full object-cover" /></div>
      <div className="min-w-0">
        <p className="truncate font-medium text-white">{asset.originalName}</p>
        <p className="mt-2 text-xs text-zinc-500">{asset.width}×{asset.height} · {formatBytes(asset.sizeBytes)} · {reduction}% smaller</p>
        {editing ? (
          <div className="mt-5 grid gap-4">
            <label className="signal-label flex flex-col gap-2">Alt text<input className="signal-control" value={draftAlt} onChange={(event) => setDraftAlt(event.target.value)} maxLength={240} /></label>
            <label className="signal-label flex flex-col gap-2">Tags<input className="signal-control" value={draftTags} onChange={(event) => setDraftTags(event.target.value)} /></label>
            <div className="flex gap-2"><button type="button" disabled={saving} onClick={handleSave} className="signal-button signal-button-primary">{saving ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}Save details</button><button type="button" onClick={onCancelEdit} className="signal-button">Cancel</button></div>
          </div>
        ) : (
          <>
            <p className="mt-4 text-sm leading-6 text-zinc-400">{asset.altText || "No alt text added."}</p>
            {asset.tags.length > 0 && <div className="mt-3 flex flex-wrap gap-2">{asset.tags.map((tag) => <span key={tag} className="border border-white/10 px-2 py-1 font-mono text-[8px] uppercase tracking-[.12em] text-zinc-500">{tag}</span>)}</div>}
          </>
        )}
      </div>
      <div className="flex gap-2 md:justify-end">
        <button
          type="button"
          disabled={activeProfile || settingProfile}
          onClick={() => onUseProfile(asset)}
          className={`signal-icon-button ${activeProfile ? "admin-selected" : ""}`}
          aria-label={activeProfile ? `${asset.originalName} is the active portfolio portrait` : `Use ${asset.originalName} as portfolio portrait`}
          title={activeProfile ? "Active portfolio portrait" : "Use as portfolio portrait"}
        >
          {settingProfile ? <LoaderCircle className="h-4 w-4 animate-spin" /> : activeProfile ? <Check className="h-4 w-4" /> : <UserRound className="h-4 w-4" />}
        </button>
        <button type="button" onClick={() => onCopy(asset.publicUrl)} className="signal-icon-button" aria-label={`Copy URL for ${asset.originalName}`}><Copy className="h-4 w-4" /></button>
        <button type="button" onClick={onEdit} className="signal-icon-button" aria-label={`Edit ${asset.originalName}`}><Pencil className="h-4 w-4" /></button>
        <button type="button" disabled={deleting} onClick={() => onDelete(asset)} className="signal-icon-button hover:text-red-300" aria-label={`Delete ${asset.originalName}`}>{deleting ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}</button>
      </div>
    </article>
  );
}
