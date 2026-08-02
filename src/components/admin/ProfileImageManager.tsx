"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, ImageIcon, LoaderCircle, Search, UserRound, X } from "lucide-react";
import type { MediaAsset } from "@/types/media";

type Profile = {
  assetId: string | null;
  imageUrl: string;
  altText: string;
};

type Notice = { tone: "success" | "error"; message: string } | null;

export default function ProfileImageManager({ initialProfile, assets, libraryError }: {
  initialProfile: Profile;
  assets: MediaAsset[];
  libraryError: string | null;
}) {
  const router = useRouter();
  const [profile, setProfile] = useState(initialProfile);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [savingId, setSavingId] = useState<string | null>(null);
  const [clearing, setClearing] = useState(false);
  const [notice, setNotice] = useState<Notice>(null);
  const filteredAssets = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return assets;
    return assets.filter((asset) =>
      [asset.originalName, asset.altText, ...asset.tags].join(" ").toLowerCase().includes(normalized)
    );
  }, [assets, query]);

  async function choose(asset: MediaAsset) {
    setSavingId(asset.id);
    setNotice(null);
    const response = await fetch("/api/admin/profile-image", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ assetId: asset.id }),
    });
    const result = await response.json();
    setSavingId(null);
    if (!response.ok) {
      setNotice({ tone: "error", message: result.error ?? "The portrait could not be updated." });
      return;
    }
    setProfile({ assetId: asset.id, imageUrl: result.imageUrl, altText: asset.altText || asset.originalName });
    setOpen(false);
    setQuery("");
    setNotice({ tone: "success", message: "Homepage portrait updated." });
    router.refresh();
  }

  async function useDefault() {
    setClearing(true);
    setNotice(null);
    const response = await fetch("/api/admin/profile-image", { method: "DELETE" });
    const result = await response.json();
    setClearing(false);
    if (!response.ok) {
      setNotice({ tone: "error", message: result.error ?? "The managed portrait could not be removed." });
      return;
    }
    setProfile({ assetId: null, imageUrl: result.imageUrl, altText: "Default portfolio portrait" });
    setNotice({ tone: "success", message: "The homepage is using the default portrait." });
    router.refresh();
  }

  return (
    <div className="mt-8">
      <div className="grid gap-6 border-y border-white/10 py-6 sm:grid-cols-[160px_1fr] sm:items-center">
        <div className="relative aspect-square w-full max-w-40 overflow-hidden bg-black/40">
          <img src={profile.imageUrl} alt={profile.altText} className="h-full w-full object-cover" />
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-2 bg-black/75 px-2.5 py-1.5 font-mono text-[8px] uppercase tracking-[.14em] text-signal backdrop-blur">
            <span className="admin-live-dot h-1.5 w-1.5" /> Live
          </span>
        </div>
        <div>
          <p className="admin-kicker">Homepage portrait</p>
          <h3 className="mt-2 text-xl font-semibold tracking-[-.03em] text-white">
            {profile.assetId ? "Managed media selected" : "Default portrait active"}
          </h3>
          <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-500">
            Choose an optimized image from the media library. Its alt text will be used for accessibility.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <button type="button" onClick={() => setOpen(true)} disabled={Boolean(libraryError)} className="signal-button signal-button-primary">
              <ImageIcon className="h-4 w-4" /> {profile.assetId ? "Change portrait" : "Choose portrait"}
            </button>
            {profile.assetId && (
              <button type="button" onClick={useDefault} disabled={clearing} className="signal-button">
                {clearing ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <UserRound className="h-4 w-4" />}
                Use default
              </button>
            )}
            <Link href="/admin/media" className="signal-button">Open media library</Link>
          </div>
        </div>
      </div>

      {notice && (
        <div className={`mt-5 flex items-start justify-between gap-4 border px-4 py-3 text-sm ${notice.tone === "success" ? "admin-notice-success" : "border-red-400/30 bg-red-400/5 text-red-200"}`} role="status">
          <span>{notice.message}</span>
          <button type="button" onClick={() => setNotice(null)} aria-label="Dismiss message"><X className="h-4 w-4" /></button>
        </div>
      )}
      {libraryError && <p className="mt-4 text-sm text-amber-300">{libraryError} Open Media to finish setup.</p>}

      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm sm:p-8" onMouseDown={() => !savingId && setOpen(false)}>
          <section role="dialog" aria-modal="true" aria-labelledby="profile-image-title" className="admin-dialog flex max-h-[88vh] w-full max-w-4xl flex-col border shadow-2xl" onMouseDown={(event) => event.stopPropagation()}>
            <header className="flex items-start justify-between gap-5 border-b border-white/10 p-5 sm:p-6">
              <div>
                <p className="admin-kicker">Media library</p>
                <h2 id="profile-image-title" className="mt-2 text-2xl font-semibold tracking-[-.04em] text-white">Choose homepage portrait</h2>
              </div>
              <button type="button" onClick={() => setOpen(false)} disabled={Boolean(savingId)} className="signal-icon-button" aria-label="Close portrait picker"><X className="h-4 w-4" /></button>
            </header>
            <div className="border-b border-white/10 p-4 sm:p-5">
              <label className="relative block">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" />
                <input className="signal-control !pl-10" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search filename, alt text, or tag" aria-label="Search media library" autoFocus />
              </label>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-5">
              {filteredAssets.length ? (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                  {filteredAssets.map((asset) => {
                    const selected = asset.id === profile.assetId;
                    const saving = asset.id === savingId;
                    return (
                      <button key={asset.id} type="button" onClick={() => choose(asset)} disabled={Boolean(savingId)} className={`group overflow-hidden border text-left transition ${selected ? "admin-selected" : "border-white/10 hover:border-white/30"}`}>
                        <div className="relative aspect-square overflow-hidden bg-black/40">
                          <img src={asset.thumbnailUrl} alt={asset.altText || asset.originalName} className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]" />
                          {(selected || saving) && (
                            <span className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center bg-signal text-signal-bg">
                              {saving ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                            </span>
                          )}
                        </div>
                        <div className="p-3"><p className="truncate text-xs font-medium text-white">{asset.originalName}</p><p className="mt-1 truncate text-[10px] text-zinc-600">{asset.width}×{asset.height}</p></div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="flex min-h-56 flex-col items-center justify-center text-center">
                  <ImageIcon className="h-7 w-7 text-zinc-700" />
                  <p className="mt-4 text-sm text-zinc-500">{assets.length ? "No images match that search." : "The media library is empty."}</p>
                  <Link href="/admin/media" className="signal-button mt-5">Upload in media library</Link>
                </div>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
