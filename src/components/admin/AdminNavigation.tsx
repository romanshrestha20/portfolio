"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FolderKanban, Gauge, ImageIcon, Inbox, Settings } from "lucide-react";

const nav = [
  ["Overview", "/admin", Gauge],
  ["Projects", "/admin/projects", FolderKanban],
  ["Media", "/admin/media", ImageIcon],
  ["Messages", "/admin/messages", Inbox],
  ["Settings", "/admin/settings", Settings],
] as const;

export default function AdminNavigation({ unreadCount = 0 }: { unreadCount?: number }) {
  const pathname = usePathname();

  return (
    <nav className="mt-9 flex gap-2 overflow-x-auto lg:flex-col" aria-label="Admin navigation">
      {nav.map(([label, href, Icon]) => {
        const active = href === "/admin" ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link
            key={href}
            href={href}
            className={`admin-nav ${active ? "admin-nav-active" : ""}`}
            aria-current={active ? "page" : undefined}
          >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
            {href === "/admin/messages" && Boolean(unreadCount) && (
              <span
                className="admin-nav-badge"
                aria-label={`${unreadCount} unread ${unreadCount === 1 ? "message" : "messages"}`}
              >
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
