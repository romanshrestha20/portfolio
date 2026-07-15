import Link from "next/link";
import { redirect } from "next/navigation";
import { FolderKanban, Gauge, ImageIcon, Inbox, LogOut, Settings } from "lucide-react";
import { getAdminUser } from "@/lib/auth";
import { hasSupabaseAdminConfig } from "@/lib/supabase/config";
import { signOut } from "../actions";

const nav = [
  ["Overview", "/admin", Gauge], ["Projects", "/admin/projects", FolderKanban],
  ["Media", "/admin/media", ImageIcon], ["Messages", "/admin/messages", Inbox],
  ["Settings", "/admin/settings", Settings],
] as const;

export default async function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  if (!hasSupabaseAdminConfig) redirect("/admin/login");
  const user = await getAdminUser();
  if (!user) redirect("/admin/login");
  return (
    <div className="admin-shell min-h-screen lg:grid lg:grid-cols-[240px_1fr]">
      <aside className="border-b border-white/10 p-5 lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r lg:p-6">
        <Link href="/" className="flex items-center gap-3 text-sm font-semibold text-white"><span className="h-2 w-2 rounded-full bg-[#b8ff47] shadow-[0_0_16px_#b8ff47]" />Signal Control</Link>
        <nav className="mt-9 flex gap-2 overflow-x-auto lg:flex-col" aria-label="Admin navigation">
          {nav.map(([label, href, Icon]) => <Link key={href} href={href} className="admin-nav"><Icon className="h-4 w-4" />{label}</Link>)}
        </nav>
        <div className="mt-8 hidden border-t border-white/10 pt-5 lg:block">
          <p className="truncate text-xs text-zinc-500">{user.email}</p>
          <form action={signOut}><button className="mt-4 flex items-center gap-2 text-xs text-zinc-400 hover:text-white"><LogOut className="h-4 w-4" />Sign out</button></form>
        </div>
      </aside>
      <main className="min-w-0 p-5 sm:p-8 lg:p-10">{children}</main>
    </div>
  );
}
