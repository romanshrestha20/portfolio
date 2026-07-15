import Link from "next/link";
import { redirect } from "next/navigation";
import LoginForm from "./LoginForm";
import { getAdminUser } from "@/lib/auth";
import { hasSupabaseConfig } from "@/lib/supabase/config";

export default async function AdminLoginPage() {
  if (await getAdminUser()) redirect("/admin");
  return (
    <main className="admin-shell flex min-h-screen items-center justify-center p-5">
      <div className="w-full max-w-md">
        <Link href="/" className="admin-kicker">← Public portfolio</Link>
        <p className="mt-14 admin-kicker">Signal Control</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-[-.06em] text-white">Admin access</h1>
        <p className="mt-4 text-sm leading-6 text-zinc-400">Manage published work, incoming messages, and portfolio content.</p>
        {hasSupabaseConfig ? <LoginForm /> : <div className="mt-10 border border-amber-400/30 bg-amber-400/5 p-5 text-sm leading-6 text-amber-200">Add the Supabase variables from <code>.env.example</code> to <code>.env.local</code>, then create your admin user.</div>}
      </div>
    </main>
  );
}
