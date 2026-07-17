"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Check, FileImage, ImagePlus, Search, X } from "lucide-react";
import type { MediaAsset } from "@/types/media";

export default function MediaPicker({ assets, initialUrl = "", libraryError }: {
  assets: MediaAsset[];
  initialUrl?: string;
  libraryError?: string | null;
}) {
  const [selectedUrl, setSelectedUrl] = useState(initialUrl);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const selectedAsset = assets.find((asset) => asset.publicUrl === selectedUrl);

  const filteredAssets = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return assets;
    return assets.filter((asset) =>
      [asset.originalName, asset.altText, ...asset.tags].join(" ").toLowerCase().includes(normalized)
    );
  }, [assets, query]);

  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => searchRef.current?.focus());
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  function choose(asset: MediaAsset) {
    setSelectedUrl(asset.publicUrl);
    setOpen(false);
    setQuery("");
  }

  return (
    <div className="sm:col-span-2">
      <input className="sr-only" name="image" value={selectedUrl} onChange={() => undefined} required aria-label="Selected project image URL" />
      <div className="flex items-center justify-between gap-4">
        <span className="signal-label">Project image</span>
        <Link href="/admin/media" className="text-xs text-zinc-500 hover:text-white">Manage library</Link>
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
          <button type="button" onClick={() => setOpen(true)} className="signal-button w-fit"><ImagePlus className="h-4 w-4" />{selectedUrl ? "Change image" : "Choose image"}</button>
        </div>
      </div>

      {libraryError && <p className="mt-3 text-xs text-amber-300">{libraryError} Open Media to finish setup.</p>}

      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm sm:p-8" onMouseDown={() => setOpen(false)}>
          <section role="dialog" aria-modal="true" aria-labelledby="media-picker-title" className="admin-dialog flex max-h-[88vh] w-full max-w-5xl flex-col border shadow-2xl" onMouseDown={(event) => event.stopPropagation()}>
            <header className="flex items-start justify-between gap-5 border-b border-white/10 p-5 sm:p-6">
              <div><p className="admin-kicker">Media library</p><h2 id="media-picker-title" className="mt-2 text-2xl font-semibold tracking-[-.04em] text-white">Choose project image</h2></div>
              <button type="button" onClick={() => setOpen(false)} className="signal-icon-button" aria-label="Close media picker"><X className="h-4 w-4" /></button>
            </header>

            <div className="border-b border-white/10 p-4 sm:p-5">
              <label className="relative block"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" /><input ref={searchRef} className="signal-control pl-10" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search filename, alt text, or tag" aria-label="Search media library" /></label>
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
                <div className="flex min-h-64 flex-col items-center justify-center text-center"><FileImage className="h-7 w-7 text-zinc-700" /><p className="mt-4 text-sm text-zinc-500">{assets.length ? "No images match that search." : "The media library is empty."}</p><Link href="/admin/media" className="signal-button signal-button-primary mt-5">Upload an image</Link></div>
              )}
            </div>

            <footer className="flex items-center justify-between border-t border-white/10 px-5 py-4 text-xs text-zinc-500"><span>{filteredAssets.length} {filteredAssets.length === 1 ? "asset" : "assets"}</span><span>Escape to close</span></footer>
          </section>
        </div>
      )}
    </div>
  );
}
