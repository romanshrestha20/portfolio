import Link from "next/link";
import { redirect } from "next/navigation";
import {
  FolderKanban,
  Gauge,
  ImageIcon,
  Inbox,
  LogOut,
  Settings,
} from "lucide-react";
import { getAdminUser } from "@/lib/auth";
import { hasSupabaseAdminConfig } from "@/lib/supabase/config";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { signOut } from "../actions";
import AdminThemeToggle from "@/components/admin/AdminThemeToggle";
import { getPortfolioSettings } from "@/lib/site-settings";

const nav = [
  ["Overview", "/admin", Gauge],
  ["Projects", "/admin/projects", FolderKanban],
  ["Media", "/admin/media", ImageIcon],
  ["Messages", "/admin/messages", Inbox],
  ["Settings", "/admin/settings", Settings],
] as const;

export default async function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!hasSupabaseAdminConfig) redirect("/admin/login");
  const user = await getAdminUser();
  if (!user) redirect("/admin/login");
  const db = createSupabaseAdminClient();
  const [{ count: unreadCount = 0 }, settings] = await Promise.all([
    db ? db
        .from("messages")
        .select("id", { count: "exact", head: true })
        .eq("read", false)
      : Promise.resolve({ count: 0 }),
    getPortfolioSettings(),
  ]);

  return (
    <div className="admin-shell min-h-screen lg:grid lg:grid-cols-[240px_1fr]">
      <aside className="p-5 border-b admin-sidebar backdrop-blur-sm lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r lg:p-6">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-3 group"
            aria-label={`Return to ${settings.personalDetails.name} portfolio`}
          >
            <span className="size-9 shrink-0" aria-hidden="true">
              <img
                src="/favicon-light.svg"
                alt=""
                className="size-9 dark:hidden"
              />
              <img
                src="/favicon-dark.svg"
                alt=""
                className="hidden size-9 dark:block"
              />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[.13em] text-signal-text">
              {settings.personalDetails.name}
            </span>
          </Link>
          <AdminThemeToggle />
        </div>
        <p className="mt-5 border-t border-signal-line pt-4 text-[8px] uppercase tracking-[.18em] text-signal">
          [Workspace / online]
        </p>
        <nav
          className="flex gap-2 overflow-x-auto mt-9 lg:flex-col"
          aria-label="Admin navigation"
        >
          {nav.map(([label, href, Icon]) => (
            <Link key={href} href={href} className="admin-nav">
              <Icon className="w-4 h-4" />
              <span>{label}</span>
              {href === "/admin/messages" && Boolean(unreadCount) && (
                <span
                  className="admin-nav-badge"
                  aria-label={`${unreadCount} unread ${unreadCount === 1 ? "message" : "messages"}`}
                >
                  {unreadCount! > 99 ? "99+" : unreadCount}
                </span>
              )}
            </Link>
          ))}
        </nav>
        <div className="pt-5 mt-8 border-t border-signal-line">
          <p className="hidden truncate text-[10px] text-signal-muted lg:block">
            {user.email}
          </p>
          <form action={signOut}>
            <button className="flex items-center gap-2 text-[10px] uppercase tracking-[.1em] text-signal-muted hover:text-signal lg:mt-4">
              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          </form>
        </div>
      </aside>
      <main className="relative min-w-0 p-5 sm:p-8 lg:p-10">
        <div className="pointer-events-none absolute right-6 top-5 hidden text-[8px] uppercase tracking-[.18em] text-signal lg:block">
          SYS / HEL-01 / STABLE
        </div>
        {children}
      </main>
    </div>
  );
}
