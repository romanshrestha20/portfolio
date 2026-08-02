import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import LoginForm from "./LoginForm";
import { getAdminUser } from "@/lib/auth";
import { hasSupabaseConfig } from "@/lib/supabase/config";
import AdminThemeToggle from "@/components/admin/AdminThemeToggle";

export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
};

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
    <main className="admin-shell min-h-[100svh] overflow-x-hidden">
      <div className="mx-auto flex min-h-[100svh] w-full max-w-[1600px] flex-col px-5 sm:px-8 lg:px-12">
        <header className="flex h-20 shrink-0 items-center justify-between border-b border-signal-line">
          <Link href="/" className="group flex min-w-0 items-center gap-3" aria-label="Return to Roman Shrestha portfolio">
            <span className="size-9 shrink-0" aria-hidden="true">
              <img src="/favicon-light.svg" alt="" className="size-9 dark:hidden" />
              <img src="/favicon-dark.svg" alt="" className="hidden size-9 dark:block" />
            </span>
            <span className="truncate text-[10px] font-bold uppercase tracking-[.13em] text-signal-text">Roman Shrestha</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="hidden font-mono text-[9px] uppercase tracking-[.16em] text-signal-muted sm:block">Secure access / OTP</span>
            <AdminThemeToggle />
          </div>
        </header>

        <div className="grid flex-1 items-center gap-12 py-12 lg:grid-cols-[minmax(0,38rem)_1fr] lg:gap-24 lg:py-16">
          <section className="min-w-0" aria-labelledby="admin-login-title">
            <p className="admin-kicker">Portfolio control / authorized personnel</p>
            <h1 id="admin-login-title" className="mt-5 max-w-[9ch] font-display text-[clamp(3rem,10vw,5.5rem)] font-bold uppercase leading-[.84] tracking-[-.065em] text-white">Admin access</h1>
            <p className="mt-6 max-w-lg text-sm leading-7 text-zinc-400">Sign in with the six-digit code sent to the configured administrator email.</p>
            {hasSupabaseConfig ? (
              <LoginForm initialError={initialError} next={params.next} />
            ) : (
              <div className="mt-10 border-l-2 border-amber-400 px-5 py-2 text-sm leading-6 text-amber-200">
                Add the Supabase variables from <code>.env.example</code> to{" "}
                <code>.env.local</code>, then configure the admin email.
              </div>
            )}
          </section>

          <aside className="hidden self-stretch border-l border-signal-line pl-10 lg:flex lg:flex-col lg:justify-between lg:py-8" aria-label="Authentication status">
            <div>
              <p className="admin-kicker">Authentication protocol</p>
              <p className="mt-5 max-w-sm text-2xl font-semibold leading-tight tracking-[-.04em] text-signal-text">Passwordless access for portfolio administration.</p>
            </div>
            <dl className="space-y-5 border-t border-signal-line pt-6 text-[10px] uppercase tracking-[.14em]">
              <div className="flex justify-between gap-8"><dt className="text-signal-muted">Code length</dt><dd className="text-signal-text">6 digits</dd></div>
              <div className="flex justify-between gap-8"><dt className="text-signal-muted">Code use</dt><dd className="text-signal-text">Single session</dd></div>
              <div className="flex justify-between gap-8"><dt className="text-signal-muted">Status</dt><dd className="text-signal">Ready</dd></div>
            </dl>
          </aside>
        </div>
      </div>
    </main>
  );
}
