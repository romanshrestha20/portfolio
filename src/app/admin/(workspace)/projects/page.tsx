import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { getAllProjects } from "@/lib/projects";
import { deleteProject, seedProjects } from "../../actions";

export default async function ProjectsAdminPage({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  const projects = await getAllProjects(); const query = await searchParams;
  return <div className="mx-auto max-w-6xl">
    <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"><div><p className="admin-kicker">01 / Content registry</p><h1 className="admin-title">Projects</h1><p className="admin-subtitle">Create, order, draft, and publish portfolio work.</p></div><Link href="/admin/projects/new" className="signal-button signal-button-primary"><Plus className="h-4 w-4" />New project</Link></div>
    {query.saved && <p className="admin-notice-success mt-6 border px-4 py-3 text-sm">Project saved and public cache refreshed.</p>}
    <div className="mt-10 border-t border-white/10">
      {projects.map((project) => <div key={project.id} className="grid gap-4 border-b border-white/10 py-6 sm:grid-cols-[1fr_140px_110px_auto] sm:items-center"><div><p className="text-xl font-semibold tracking-[-.03em] text-white">{project.name}</p><p className="mt-1 text-xs text-zinc-500">{project.tags.join(" · ")}</p></div><span className={`signal-status ${project.status === "published" ? "signal-status-active" : ""}`}>{project.status ?? "published"}</span><span className="text-xs text-zinc-500">Order {project.displayOrder ?? 0}</span><div className="flex gap-2"><Link href={`/admin/projects/${project.id}`} className="signal-icon-button" aria-label={`Edit ${project.name}`}><Pencil className="h-4 w-4" /></Link><form action={deleteProject}><input type="hidden" name="id" value={project.id} /><button className="signal-icon-button hover:text-red-300" aria-label={`Delete ${project.name}`}><Trash2 className="h-4 w-4" /></button></form></div></div>)}
    </div>
    {projects.length === 0 && <form action={seedProjects} className="mt-10"><button className="signal-button">Import existing project data</button></form>}
  </div>;
}
