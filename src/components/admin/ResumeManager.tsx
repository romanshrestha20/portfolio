"use client";

import { useRef, useState } from "react";
import { Check, ExternalLink, FileText, LoaderCircle, RotateCcw, Upload, X } from "lucide-react";
import type { ResumeAsset } from "@/types/resume";

type Notice = { tone: "success" | "error"; message: string } | null;

function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

export default function ResumeManager({ initialAssets, initialActiveId }: {
  initialAssets: ResumeAsset[];
  initialActiveId: string | null;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [assets, setAssets] = useState(initialAssets);
  const [activeId, setActiveId] = useState(initialActiveId);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [restoringId, setRestoringId] = useState<string | null>(null);
  const [notice, setNotice] = useState<Notice>(null);
  const activeAsset = assets.find((asset) => asset.id === activeId) ?? null;

  function chooseFile(nextFile?: File) {
    if (!nextFile) return;
    if (nextFile.type !== "application/pdf" || !nextFile.name.toLowerCase().endsWith(".pdf")) {
      setNotice({ tone: "error", message: "Choose a PDF file." });
      return;
    }
    setFile(nextFile);
    setProgress(0);
    setNotice(null);
  }

  function upload(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!file || uploading) return;
    setUploading(true);
    setNotice(null);

    const body = new FormData();
    body.append("file", file);
    const request = new XMLHttpRequest();
    request.open("POST", "/api/admin/resumes");
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
      setActiveId(result.asset.id);
      setFile(null);
      setProgress(0);
      if (inputRef.current) inputRef.current.value = "";
      setNotice({ tone: "success", message: "Résumé uploaded and published." });
    };
    request.onerror = () => {
      setUploading(false);
      setNotice({ tone: "error", message: "The network connection interrupted the upload." });
    };
    request.send(body);
  }

  async function restore(asset: ResumeAsset) {
    setRestoringId(asset.id);
    setNotice(null);
    const response = await fetch("/api/admin/resumes/current", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ assetId: asset.id }),
    });
    const result = await response.json();
    setRestoringId(null);
    if (!response.ok) {
      setNotice({ tone: "error", message: result.error ?? "The résumé could not be restored." });
      return;
    }
    setActiveId(asset.id);
    setNotice({ tone: "success", message: `${asset.originalName} is now live.` });
  }

  return (
    <section className="mt-10">
      <div className="grid border-y border-white/10 sm:grid-cols-[1fr_auto] sm:items-center">
        <div className="py-6 sm:pr-8">
          <p className="admin-kicker">Live résumé</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-[-.04em] text-white">
            {activeAsset?.originalName ?? "Canva fallback active"}
          </h2>
          <p className="mt-3 text-sm leading-6 text-zinc-500">
            {activeAsset
              ? `Published ${formatDate(activeAsset.createdAt)} · ${formatBytes(activeAsset.sizeBytes)}`
              : "Upload a PDF to replace the temporary Canva link on the homepage."}
          </p>
        </div>
        {activeAsset && (
          <a href={activeAsset.publicUrl} target="_blank" rel="noreferrer" className="signal-button w-fit sm:justify-self-end">
            Preview <ExternalLink className="h-4 w-4" />
          </a>
        )}
      </div>

      {notice && (
        <div className={`mt-6 flex items-start justify-between gap-4 border px-4 py-3 text-sm ${notice.tone === "success" ? "admin-notice-success" : "border-red-400/30 bg-red-400/5 text-red-200"}`} role="status">
          <span>{notice.message}</span>
          <button type="button" onClick={() => setNotice(null)} aria-label="Dismiss message"><X className="h-4 w-4" /></button>
        </div>
      )}

      <form onSubmit={upload} className="mt-8">
        <div className="grid gap-5 border border-dashed border-white/20 bg-white/[.015] p-6 sm:grid-cols-[auto_1fr_auto] sm:items-center">
          <span className="flex h-12 w-12 items-center justify-center border border-white/10 text-signal"><FileText className="h-5 w-5" /></span>
          <div className="min-w-0">
            <strong className="block truncate text-sm text-white">{file?.name ?? "Upload a new PDF"}</strong>
            <span className="mt-1 block text-xs leading-5 text-zinc-500">
              {file ? formatBytes(file.size) : "PDF only, up to 12 MB. Uploading publishes it immediately."}
            </span>
            {uploading && <div className="mt-3 h-1.5 overflow-hidden bg-white/10"><div className="h-full bg-signal transition-[width]" style={{ width: `${progress}%` }} /></div>}
          </div>
          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={() => inputRef.current?.click()} disabled={uploading} className="signal-button">
              Choose PDF
            </button>
            {file && (
              <button type="submit" disabled={uploading} className="signal-button signal-button-primary">
                {uploading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                {uploading ? `${progress}%` : "Upload & publish"}
              </button>
            )}
          </div>
          <input ref={inputRef} type="file" accept="application/pdf,.pdf" className="sr-only" onChange={(event) => chooseFile(event.target.files?.[0])} />
        </div>
      </form>

      <div className="mt-14 border-b border-white/10 pb-5">
        <p className="admin-kicker">Version history</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-[-.04em] text-white">Uploaded résumés</h2>
      </div>
      <div className="divide-y divide-white/10">
        {assets.map((asset) => {
          const active = asset.id === activeId;
          return (
            <div key={asset.id} className="grid gap-4 py-5 sm:grid-cols-[auto_1fr_auto] sm:items-center">
              <span className={`flex h-10 w-10 items-center justify-center border ${active ? "border-signal/40 text-signal" : "border-white/10 text-zinc-600"}`}>
                {active ? <Check className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-white">{asset.originalName}</p>
                <p className="mt-1 text-xs text-zinc-500">{formatDate(asset.createdAt)} · {formatBytes(asset.sizeBytes)}{active ? " · Live" : ""}</p>
              </div>
              <div className="flex gap-2 sm:justify-end">
                <a href={asset.publicUrl} target="_blank" rel="noreferrer" className="signal-icon-button" aria-label={`Open ${asset.originalName}`}><ExternalLink className="h-4 w-4" /></a>
                {!active && (
                  <button type="button" onClick={() => restore(asset)} disabled={restoringId !== null} className="signal-button">
                    {restoringId === asset.id ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <RotateCcw className="h-4 w-4" />}
                    Make active
                  </button>
                )}
              </div>
            </div>
          );
        })}
        {assets.length === 0 && <p className="py-8 text-sm text-zinc-500">No managed résumé versions yet.</p>}
      </div>
    </section>
  );
}
