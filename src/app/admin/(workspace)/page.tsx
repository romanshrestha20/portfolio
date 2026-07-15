import Link from "next/link";
import { ArrowUpRight, Database, FolderKanban, Inbox } from "lucide-react";
import { getAllProjects } from "@/lib/projects";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { seedProjects } from "../actions";

export default async function AdminOverview() {
  const projects = await getAllProjects();
  const db = createSupabaseAdminClient();
  const { count: unread = 0 } = db ? await db.from("messages").select("*", { count: "exact", head: true }).eq("read", false) : { count: 0 };
  const published = projects.filter((project) => project.status === "published").length;
  return (
    <div className="mx-auto max-w-6xl">
      <p className="admin-kicker">Overview</p><h1 className="admin-title">Workspace status</h1>
      <p className="admin-subtitle">Current portfolio content and publishing state.</p>
      <div className="mt-10 border-t border-white/10">
        <div className="admin-metric"><FolderKanban /><span>Projects</span><strong>{projects.length}</strong></div>
        <div className="admin-metric"><Database /><span>Published</span><strong>{published}</strong></div>
        <div className="admin-metric"><Inbox /><span>Unread messages</span><strong>{unread ?? 0}</strong></div>
      </div>
      {projects.length === 0 && <form action={seedProjects} className="mt-10 border border-[#b8ff47]/30 bg-[#b8ff47]/5 p-6"><p className="text-sm text-zinc-300">The database is connected but has no portfolio projects.</p><button className="admin-primary mt-5">Import existing projects</button></form>}
      <div className="mt-12 flex flex-wrap gap-3"><Link href="/admin/projects" className="admin-primary">Manage projects <ArrowUpRight className="h-4 w-4" /></Link><Link href="/" className="admin-secondary" target="_blank">Open portfolio <ArrowUpRight className="h-4 w-4" /></Link></div>
    </div>
  );
}
