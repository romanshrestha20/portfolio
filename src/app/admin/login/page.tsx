import Link from "next/link";
import { redirect } from "next/navigation";
import LoginForm from "./LoginForm";
import { getAdminUser } from "@/lib/auth";
import { hasSupabaseConfig } from "@/lib/supabase/config";
import AdminThemeToggle from "@/components/admin/AdminThemeToggle";

const loginErrors: Record<string, string> = {
  unauthorized: "This account is not authorized for the admin workspace.",
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  if (await getAdminUser()) redirect("/admin");
  const params = await searchParams;
  const initialError = params.error ? loginErrors[params.error] : undefined;

  return (
    <main className="relative min-h-[100svh] overflow-y-auto admin-shell">
      <div className="fixed right-5 top-5 z-20"><AdminThemeToggle /></div>
      <div className="mx-auto w-full max-w-md px-5 py-8 sm:py-12 lg:py-16">
        <Link href="/" className="flex items-center gap-3 group" aria-label="Return to Roman Shrestha portfolio">
          <span className="size-9 shrink-0" aria-hidden="true">
            <img src="/favicon-light.svg" alt="" className="size-9 dark:hidden" />
            <img src="/favicon-dark.svg" alt="" className="hidden size-9 dark:block" />
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[.13em] text-signal-text">Roman Shrestha</span>
        </Link>
        <p className="mt-12 admin-kicker sm:mt-14">Portfolio control / authorized personnel</p>
        <h1 className="mt-4 font-display text-[clamp(2.75rem,10vw,4rem)] font-bold uppercase leading-[.9] tracking-[-.06em] text-white">Admin access</h1>
        <p className="mt-4 text-sm leading-6 text-zinc-400">Manage published work, incoming messages, and portfolio content. Access requires the one-time code sent to the configured administrator.</p>
        {hasSupabaseConfig ? (
          <LoginForm initialError={initialError} next={params.next} />
        ) : (
          <div className="p-5 mt-10 text-sm leading-6 border border-amber-400/30 bg-amber-400/5 text-amber-200">
            Add the Supabase variables from <code>.env.example</code> to{" "}
            <code>.env.local</code>, then configure the admin email.
          </div>
        )}
      </div>
    </main>
  );
}
