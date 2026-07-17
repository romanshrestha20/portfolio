import Link from "next/link";
import { redirect } from "next/navigation";
import LoginForm from "./LoginForm";
import { getAdminUser } from "@/lib/auth";
import { hasSupabaseConfig } from "@/lib/supabase/config";
import AdminThemeToggle from "@/components/admin/AdminThemeToggle";

export default async function AdminLoginPage() {
  if (await getAdminUser()) redirect("/admin");
  return (
    <main className="admin-shell flex min-h-screen items-center justify-center p-5">
      <div className="absolute right-5 top-5"><AdminThemeToggle /></div>
      <div className="w-full max-w-md">
        <Link href="/" className="group flex items-center gap-3" aria-label="Return to Roman Shrestha portfolio"><span className="studio-monogram">RS</span><span className="text-[10px] font-bold uppercase tracking-[.13em] text-signal-text">Roman Shrestha</span></Link>
        <p className="mt-14 admin-kicker">Portfolio control / authorized personnel</p>
        <h1 className="mt-4 font-display text-5xl font-bold uppercase tracking-[-.06em] text-white">Admin access</h1>
        <p className="mt-4 text-sm leading-6 text-zinc-400">Manage published work, incoming messages, and portfolio content.</p>
        {hasSupabaseConfig ? <LoginForm /> : <div className="mt-10 border border-amber-400/30 bg-amber-400/5 p-5 text-sm leading-6 text-amber-200">Add the Supabase variables from <code>.env.example</code> to <code>.env.local</code>, then create your admin user.</div>}
      </div>
    </main>
  );
}
