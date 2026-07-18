"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, Check, FileImage, ImagePlus, LoaderCircle, Search, Upload, X } from "lucide-react";
import type { MediaAsset } from "@/types/media";

const MAX_INPUT_BYTES = 12_000_000;
const ALLOWED_TYPES = new Set(["image/png", "image/jpeg", "image/webp", "image/avif"]);

export default function MediaPicker({ assets, selectedUrl, onSelect, libraryError }: {
  assets: MediaAsset[];
  selectedUrl: string;
  onSelect: (url: string) => void;
  libraryError?: string | null;
}) {
  const [availableAssets, setAvailableAssets] = useState(assets);
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"library" | "upload">("library");
  const [query, setQuery] = useState("");
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadPreview, setUploadPreview] = useState("");
  const [uploadAltText, setUploadAltText] = useState("");
  const [uploadTags, setUploadTags] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState("");
  const [dragging, setDragging] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const uploadInputRef = useRef<HTMLInputElement>(null);
  const selectedAsset = availableAssets.find((asset) => asset.publicUrl === selectedUrl);

  const filteredAssets = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return availableAssets;
    return availableAssets.filter((asset) =>
      [asset.originalName, asset.altText, ...asset.tags].join(" ").toLowerCase().includes(normalized)
    );
  }, [availableAssets, query]);

  useEffect(() => {
    if (!uploadFile) {
      setUploadPreview("");
      return undefined;
    }
    const objectUrl = URL.createObjectURL(uploadFile);
    setUploadPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [uploadFile]);

  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (view === "library") requestAnimationFrame(() => searchRef.current?.focus());
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !uploading) closeDialog();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
    // closeDialog intentionally uses the current render state.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, uploading, view]);

  function resetUpload() {
    setUploadFile(null);
    setUploadAltText("");
    setUploadTags("");
    setUploadError("");
    setUploadProgress(0);
    setDragging(false);
    if (uploadInputRef.current) uploadInputRef.current.value = "";
  }

  function openDialog() {
    setQuery("");
    setView("library");
    resetUpload();
    setOpen(true);
  }

  function closeDialog() {
    if (uploading) return;
    setOpen(false);
    setQuery("");
    setView("library");
    resetUpload();
  }

  function showUploader() {
    setQuery("");
    setView("upload");
    setUploadError("");
  }

  function backToLibrary() {
    if (uploading) return;
    resetUpload();
    setView("library");
  }

  function choose(asset: MediaAsset) {
    onSelect(asset.publicUrl);
    closeDialog();
  }

  function chooseUploadFile(file?: File | null) {
    if (!file) return;
    if (!ALLOWED_TYPES.has(file.type)) {
      setUploadError("Choose a PNG, JPEG, WebP, or AVIF image.");
      return;
    }
    if (file.size > MAX_INPUT_BYTES) {
      setUploadError("Choose an image smaller than 12 MB.");
      return;
    }
    setUploadFile(file);
    setUploadError("");
    setUploadProgress(0);
  }

  function uploadAndChoose() {
    if (!uploadFile || uploading) return;
    setUploading(true);
    setUploadProgress(0);
    setUploadError("");

    const body = new FormData();
    body.append("file", uploadFile);
    body.append("altText", uploadAltText);
    body.append("tags", uploadTags);

    const request = new XMLHttpRequest();
    request.open("POST", "/api/admin/media");
    request.upload.onprogress = (event) => {
      if (event.lengthComputable) setUploadProgress(Math.round((event.loaded / event.total) * 100));
    };
    request.onload = () => {
      setUploading(false);
      let result: { asset?: MediaAsset; error?: string } = {};
      try { result = JSON.parse(request.responseText || "{}"); } catch { /* Use the fallback error below. */ }
      if (request.status < 200 || request.status >= 300 || !result.asset) {
        setUploadError(result.error ?? "The image could not be uploaded.");
        return;
      }
      setAvailableAssets((current) => [result.asset!, ...current]);
      onSelect(result.asset.publicUrl);
      setOpen(false);
      setView("library");
      resetUpload();
    };
    request.onerror = () => {
      setUploading(false);
      setUploadError("The network connection interrupted the upload.");
    };
    request.send(body);
  }

  return (
    <div className="sm:col-span-2">
      <input className="sr-only" name="image" value={selectedUrl} readOnly required aria-label="Selected project image URL" />
      <div className="flex items-center justify-between gap-4">
        <span className="signal-label">Project image</span>
        <Link href="/admin/media" target="_blank" rel="noreferrer" className="text-xs text-zinc-500 hover:text-white">Open full library ↗</Link>
      </div>

      <div className="mt-3 grid gap-5 border border-white/10 p-4 sm:grid-cols-[220px_1fr] sm:p-5">
        <div className="flex aspect-[16/11] items-center justify-center overflow-hidden bg-black/40">
          {selectedUrl ? (
            <img src={selectedAsset?.thumbnailUrl ?? selectedUrl} alt={selectedAsset?.altText || "Selected project image"} className="h-full w-full object-cover" />
          ) : (
            <FileImage className="h-7 w-7 text-zinc-700" />
          )}
        </div>
        <div className="flex min-w-0 flex-col justify-between gap-5">
          <div>
            <p className="text-sm font-medium text-white">{selectedAsset?.originalName ?? (selectedUrl ? "Existing project image" : "No image selected")}</p>
            <p className="mt-2 text-xs leading-5 text-zinc-500">
              {selectedAsset
                ? `${selectedAsset.width}×${selectedAsset.height} · ${selectedAsset.tags.join(" · ") || "No tags"}`
                : selectedUrl
                  ? "This image is outside the media library. Select a managed asset to replace it."
                  : "Choose an optimized image from the media library before saving."}
            </p>
          </div>
          <button type="button" onClick={openDialog} className="signal-button w-fit"><ImagePlus className="h-4 w-4" />{selectedUrl ? "Change image" : "Choose image"}</button>
        </div>
      </div>

      {libraryError && <p className="mt-3 text-xs text-amber-300">{libraryError} Open Media to finish setup.</p>}

      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm sm:p-8" onMouseDown={() => { if (!uploading) closeDialog(); }}>
          <section role="dialog" aria-modal="true" aria-labelledby="media-picker-title" className="admin-dialog flex max-h-[90vh] w-full max-w-5xl flex-col border shadow-2xl" onMouseDown={(event) => event.stopPropagation()}>
            <header className="flex items-start justify-between gap-5 border-b border-white/10 p-5 sm:p-6">
              <div className="flex min-w-0 items-start gap-4">
                {view === "upload" && (
                  <button type="button" onClick={backToLibrary} disabled={uploading} className="signal-icon-button" aria-label="Back to media library"><ArrowLeft className="h-4 w-4" /></button>
                )}
                <div><p className="admin-kicker">{view === "library" ? "Media library" : "New media asset"}</p><h2 id="media-picker-title" className="mt-2 text-2xl font-semibold tracking-[-.04em] text-white">{view === "library" ? "Choose project image" : "Upload project image"}</h2></div>
              </div>
              <button type="button" onClick={closeDialog} disabled={uploading} className="signal-icon-button" aria-label="Close media picker"><X className="h-4 w-4" /></button>
            </header>

            {view === "library" ? (
              <>
                <div className="flex flex-col gap-3 border-b border-white/10 p-4 sm:flex-row sm:p-5">
                  <label className="relative block flex-1"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" /><input ref={searchRef} className="signal-control pl-10" value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") event.preventDefault(); }} placeholder="Search filename, alt text, or tag" aria-label="Search media library" /></label>
                  <button type="button" onClick={showUploader} className="signal-button signal-button-primary"><Upload className="h-4 w-4" />Upload new</button>
                </div>
                <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-5">
                  {filteredAssets.length > 0 ? (
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                      {filteredAssets.map((asset) => {
                        const selected = asset.publicUrl === selectedUrl;
                        return (
                          <button key={asset.id} type="button" onClick={() => choose(asset)} className={`group overflow-hidden border text-left transition ${selected ? "admin-selected" : "border-white/10 hover:border-white/30"}`}>
                            <div className="relative aspect-[16/11] overflow-hidden bg-black/40">
                              <img src={asset.thumbnailUrl} alt={asset.altText || asset.originalName} loading="lazy" className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]" />
                              {selected && <span className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center bg-signal text-signal-bg"><Check className="h-4 w-4" /></span>}
                            </div>
                            <div className="p-3"><p className="truncate text-xs font-medium text-white">{asset.originalName}</p><p className="mt-1 truncate text-[10px] text-zinc-600">{asset.width}×{asset.height}{asset.tags.length ? ` · ${asset.tags.join(", ")}` : ""}</p></div>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="flex min-h-64 flex-col items-center justify-center text-center"><FileImage className="h-7 w-7 text-zinc-700" /><p className="mt-4 text-sm text-zinc-500">{availableAssets.length ? "No images match that search." : "The media library is empty."}</p><p className="mt-2 text-xs text-zinc-600">Use Upload new to add the first project image.</p></div>
                  )}
                </div>
                <footer className="flex items-center justify-between border-t border-white/10 px-5 py-4 text-xs text-zinc-500"><span>{filteredAssets.length} {filteredAssets.length === 1 ? "asset" : "assets"}</span><span>Escape to close</span></footer>
              </>
            ) : (
              <>
                <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6">
                  <div className="mx-auto max-w-3xl">
                    <input ref={uploadInputRef} type="file" accept="image/png,image/jpeg,image/webp,image/avif" onChange={(event) => chooseUploadFile(event.target.files?.[0])} className="sr-only" />
                    <div
                      className={`grid min-h-64 gap-5 border border-dashed p-5 transition sm:grid-cols-[240px_1fr] sm:p-6 ${dragging ? "admin-selected" : "border-white/20 bg-white/[.015]"}`}
                      onDragEnter={(event) => { event.preventDefault(); if (!uploading) setDragging(true); }}
                      onDragOver={(event) => event.preventDefault()}
                      onDragLeave={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node)) setDragging(false); }}
                      onDrop={(event) => { event.preventDefault(); setDragging(false); if (!uploading) chooseUploadFile(event.dataTransfer.files[0]); }}
                    >
                      <div className="flex aspect-[16/11] items-center justify-center overflow-hidden bg-black/40">
                        {uploadPreview ? <img src={uploadPreview} alt="New image preview" className="h-full w-full object-contain" /> : <ImagePlus className="h-8 w-8 text-zinc-700" />}
                      </div>
                      <div className="flex flex-col justify-center">
                        <p className="text-base font-medium text-white">{uploadFile?.name ?? "Drop an image here"}</p>
                        <p className="mt-2 text-sm leading-6 text-zinc-500">PNG, JPEG, WebP, or AVIF up to 12 MB. The image will be optimized automatically.</p>
                        <button type="button" onClick={() => uploadInputRef.current?.click()} disabled={uploading} className="signal-button mt-5 w-fit"><ImagePlus className="h-4 w-4" />{uploadFile ? "Choose another file" : "Choose image file"}</button>
                      </div>
                    </div>

                    <div className="mt-6 grid gap-5 sm:grid-cols-2">
                      <label className="signal-label flex flex-col gap-2">Alt text<input className="signal-control" value={uploadAltText} onChange={(event) => setUploadAltText(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") event.preventDefault(); }} placeholder="Describe the image" maxLength={240} disabled={uploading} /></label>
                      <label className="signal-label flex flex-col gap-2">Tags<input className="signal-control" value={uploadTags} onChange={(event) => setUploadTags(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") event.preventDefault(); }} placeholder="web, mobile, dashboard" maxLength={500} disabled={uploading} /></label>
                    </div>
                    {uploadError && <p className="mt-5 border border-red-400/30 bg-red-400/5 px-4 py-3 text-sm text-red-200" role="alert">{uploadError}</p>}
                    {uploading && <div className="mt-6"><div className="flex justify-between text-[10px] uppercase tracking-[.12em] text-signal-muted"><span>Optimizing and storing</span><span>{uploadProgress}%</span></div><div className="mt-2 h-1.5 overflow-hidden bg-white/10"><div className="h-full bg-signal transition-[width]" style={{ width: `${uploadProgress}%` }} /></div></div>}
                  </div>
                </div>
                <footer className="flex flex-col-reverse gap-3 border-t border-white/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-xs text-zinc-500">The uploaded image will be selected automatically.</span>
                  <div className="flex gap-3"><button type="button" onClick={backToLibrary} disabled={uploading} className="signal-button">Cancel</button><button type="button" onClick={uploadAndChoose} disabled={!uploadFile || uploading} className="signal-button signal-button-primary">{uploading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}{uploading ? "Uploading…" : "Upload and choose"}</button></div>
                </footer>
              </>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
