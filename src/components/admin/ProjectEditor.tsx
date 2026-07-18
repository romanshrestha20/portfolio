"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, LoaderCircle, RotateCcw, X } from "lucide-react";
import type { Project } from "@/types/project";
import type { MediaAsset } from "@/types/media";
import { saveProject, type SaveProjectState } from "@/app/admin/actions";
import MediaPicker from "@/components/admin/MediaPicker";

const DRAFT_KEY = "portfolio:new-project-draft:v1";

type ProjectDraft = {
  name: string;
  id: string;
  slug: string;
  issue: string;
  dek: string;
  image: string;
  tags: string;
  role: string;
  focus: string;
  format: string;
  kicker: string;
  headline: string;
  sections: string;
  liveUrl: string;
  codeUrl: string;
  status: "draft" | "published";
  displayOrder: string;
  featured: boolean;
  updatedAt: string;
};

const initialSaveState: SaveProjectState = { status: "idle" };

function createInitialDraft(project?: Project): ProjectDraft {
  const facts = Object.fromEntries((project?.facts ?? []).map((fact) => [fact.label.toLowerCase(), fact.value]));
  return {
    name: project?.name ?? "",
    id: project?.id ?? "",
    slug: project?.slug ?? project?.id ?? "",
    issue: project?.issue ?? "01",
    dek: project?.dek ?? "",
    image: project?.image ?? "",
    tags: project?.tags.join(", ") ?? "",
    role: facts.role ?? "",
    focus: facts.focus ?? "",
    format: facts.format ?? "",
    kicker: project?.caseStudy.kicker ?? "",
    headline: project?.caseStudy.headline ?? "",
    sections: project?.caseStudy.sections.join("\n") ?? "",
    liveUrl: project?.links.live ?? "",
    codeUrl: project?.links.code ?? "",
    status: project?.status ?? "draft",
    displayOrder: String(project?.displayOrder ?? 0),
    featured: project?.featured ?? false,
    updatedAt: new Date().toISOString(),
  };
}

function readDraft(fallback: ProjectDraft): ProjectDraft | null {
  try {
    const stored = localStorage.getItem(DRAFT_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored) as Partial<ProjectDraft>;
    if (!parsed || typeof parsed !== "object") return null;
    return {
      ...fallback,
      ...parsed,
      status: parsed.status === "published" ? "published" : "draft",
      featured: Boolean(parsed.featured),
    };
  } catch {
    return null;
  }
}

export default function ProjectEditor({ project, mediaAssets, mediaError }: {
  project?: Project;
  mediaAssets: MediaAsset[];
  mediaError?: string | null;
}) {
  const router = useRouter();
  const isNewProject = !project;
  const defaults = createInitialDraft(project);
  const [draft, setDraft] = useState<ProjectDraft>(defaults);
  const [hydrated, setHydrated] = useState(!isNewProject);
  const [autosaveEnabled, setAutosaveEnabled] = useState(false);
  const [restored, setRestored] = useState(false);
  const draftRef = useRef(draft);
  const autosaveEnabledRef = useRef(autosaveEnabled);
  const [saveState, formAction, saving] = useActionState(saveProject, initialSaveState);

  useEffect(() => {
    draftRef.current = draft;
  }, [draft]);

  useEffect(() => {
    autosaveEnabledRef.current = autosaveEnabled;
  }, [autosaveEnabled]);

  useEffect(() => {
    if (!isNewProject) return;
    const saved = readDraft(defaults);
    if (saved) {
      setDraft(saved);
      setRestored(true);
      setAutosaveEnabled(true);
    }
    setHydrated(true);
    // The defaults are fixed for the lifetime of this editor instance.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNewProject]);

  useEffect(() => {
    if (!isNewProject || !hydrated || !autosaveEnabled) return;
    const timer = window.setTimeout(() => {
      try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
      } catch {
        // Storage can be unavailable in privacy modes; editing must still work.
      }
    }, 350);
    return () => window.clearTimeout(timer);
  }, [autosaveEnabled, draft, hydrated, isNewProject]);

  useEffect(() => {
    if (!isNewProject) return;
    const flushDraft = () => {
      if (!autosaveEnabledRef.current) return;
      try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(draftRef.current));
      } catch {
        // Ignore unavailable browser storage.
      }
    };
    window.addEventListener("pagehide", flushDraft);
    return () => window.removeEventListener("pagehide", flushDraft);
  }, [isNewProject]);

  useEffect(() => {
    if (saveState.status !== "success") return;
    if (isNewProject) {
      try { localStorage.removeItem(DRAFT_KEY); } catch { /* Continue to the saved project list. */ }
    }
    router.push("/admin/projects?saved=1");
    router.refresh();
  }, [isNewProject, router, saveState.status]);

  function update<K extends keyof ProjectDraft>(field: K, value: ProjectDraft[K]) {
    setDraft((current) => ({ ...current, [field]: value, updatedAt: new Date().toISOString() }));
    if (isNewProject) setAutosaveEnabled(true);
  }

  function discardDraft() {
    if (!window.confirm("Discard this unsaved project draft and reset every field?")) return;
    try { localStorage.removeItem(DRAFT_KEY); } catch { /* The in-memory draft can still be reset. */ }
    setDraft(createInitialDraft());
    setAutosaveEnabled(false);
    setRestored(false);
  }

  return (
    <form action={formAction} className="mt-10 space-y-10">
      {isNewProject && restored && (
        <div className="admin-notice-success flex flex-col gap-4 border px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between" role="status">
          <span className="flex items-center gap-2"><RotateCcw className="h-4 w-4" />Unsaved project draft restored from this browser.</span>
          <div className="flex items-center gap-3">
            <button type="button" onClick={discardDraft} className="text-[10px] font-bold uppercase tracking-[.12em] hover:text-white">Discard draft</button>
            <button type="button" onClick={() => setRestored(false)} aria-label="Dismiss draft notice"><X className="h-4 w-4" /></button>
          </div>
        </div>
      )}

      {saveState.status === "error" && (
        <div className="border border-red-400/30 bg-red-400/5 px-4 py-3 text-sm text-red-200" role="alert">{saveState.message}</div>
      )}

      <section><h2 className="admin-section-title">Project identity</h2><div className="admin-form-grid">
        <label className="signal-label flex flex-col gap-2">Name<input className="signal-control" name="name" value={draft.name} onChange={(event) => update("name", event.target.value)} required /></label>
        <label className="signal-label flex flex-col gap-2">ID<input className="signal-control" name="id" value={draft.id} onChange={(event) => update("id", event.target.value)} required /></label>
        <label className="signal-label flex flex-col gap-2">Slug<input className="signal-control" name="slug" value={draft.slug} onChange={(event) => update("slug", event.target.value)} pattern="[a-z0-9-]+" required /></label>
        <label className="signal-label flex flex-col gap-2">Issue<input className="signal-control" name="issue" value={draft.issue} onChange={(event) => update("issue", event.target.value)} required /></label>
        <label className="signal-label flex flex-col gap-2 sm:col-span-2">Summary<textarea className="signal-control min-h-24" name="dek" value={draft.dek} onChange={(event) => update("dek", event.target.value)} required /></label>
        <MediaPicker assets={mediaAssets} selectedUrl={draft.image} onSelect={(url) => update("image", url)} libraryError={mediaError} />
        <label className="signal-label flex flex-col gap-2 sm:col-span-2">Tags, comma separated<input className="signal-control" name="tags" value={draft.tags} onChange={(event) => update("tags", event.target.value)} required /></label>
      </div></section>
      <section><h2 className="admin-section-title">Project facts</h2><div className="admin-form-grid">
        <label className="signal-label flex flex-col gap-2">Role<input className="signal-control" name="role" value={draft.role} onChange={(event) => update("role", event.target.value)} required /></label>
        <label className="signal-label flex flex-col gap-2">Focus<input className="signal-control" name="focus" value={draft.focus} onChange={(event) => update("focus", event.target.value)} required /></label>
        <label className="signal-label flex flex-col gap-2 sm:col-span-2">Format<input className="signal-control" name="format" value={draft.format} onChange={(event) => update("format", event.target.value)} required /></label>
      </div></section>
      <section><h2 className="admin-section-title">Case study</h2><div className="admin-form-grid">
        <label className="signal-label flex flex-col gap-2">Kicker<input className="signal-control" name="kicker" value={draft.kicker} onChange={(event) => update("kicker", event.target.value)} required /></label>
        <label className="signal-label flex flex-col gap-2">Headline<input className="signal-control" name="headline" value={draft.headline} onChange={(event) => update("headline", event.target.value)} required /></label>
        <label className="signal-label flex flex-col gap-2 sm:col-span-2">Sections, one paragraph per line<textarea className="signal-control min-h-52" name="sections" value={draft.sections} onChange={(event) => update("sections", event.target.value)} required /></label>
      </div></section>
      <section><h2 className="admin-section-title">Publishing</h2><div className="admin-form-grid">
        <label className="signal-label flex flex-col gap-2">Live URL<input className="signal-control" name="liveUrl" value={draft.liveUrl} onChange={(event) => update("liveUrl", event.target.value)} /></label>
        <label className="signal-label flex flex-col gap-2">Repository URL<input className="signal-control" name="codeUrl" value={draft.codeUrl} onChange={(event) => update("codeUrl", event.target.value)} /></label>
        <label className="signal-label flex flex-col gap-2">Status<select className="signal-control" name="status" value={draft.status} onChange={(event) => update("status", event.target.value as ProjectDraft["status"])}><option value="draft">Draft</option><option value="published">Published</option></select></label>
        <label className="signal-label flex flex-col gap-2">Display order<input className="signal-control" type="number" min="0" name="displayOrder" value={draft.displayOrder} onChange={(event) => update("displayOrder", event.target.value)} /></label>
        <label className="flex items-center gap-3 text-sm text-zinc-300"><input type="checkbox" name="featured" checked={draft.featured} onChange={(event) => update("featured", event.target.checked)} className="admin-checkbox h-4 w-4" />Featured project</label>
      </div></section>
      <div className="flex flex-wrap items-center gap-4">
        <button disabled={saving || !hydrated} className="signal-button signal-button-primary">
          {saving ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
          {saving ? "Saving project…" : "Save project"}
        </button>
        {isNewProject && autosaveEnabled && <span className="text-[10px] uppercase tracking-[.12em] text-signal-muted">Draft autosaves locally</span>}
      </div>
    </form>
  );
}
