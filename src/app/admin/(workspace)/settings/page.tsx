import { CheckCircle2 } from "lucide-react";
import ResumeManager from "@/components/admin/ResumeManager";
import PersonalDetailsEditor from "@/components/admin/PersonalDetailsEditor";
import { getResumeAssets } from "@/lib/resumes";
import { getPersonalDetailsHistory, getPortfolioSettings } from "@/lib/site-settings";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const [resumes, settings, history] = await Promise.all([
    getResumeAssets(),
    getPortfolioSettings(),
    getPersonalDetailsHistory(),
  ]);
  const items = [
    ["Database", Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL)],
    ["Server authorization", Boolean(process.env.SUPABASE_SECRET_KEY)],
    ["Admin allowlist", Boolean(process.env.ADMIN_EMAIL)],
    [
      "Email notifications",
      Boolean(
        process.env.RESEND_API_KEY &&
        process.env.CONTACT_EMAIL_FROM &&
        (process.env.CONTACT_EMAIL_TO || process.env.ADMIN_EMAIL)
      ),
    ],
  ] as const;

  return (
    <div className="mx-auto max-w-4xl">
      <p className="admin-kicker">04 / Portfolio settings</p>
      <h1 className="admin-title">Settings</h1>
      <p className="admin-subtitle">Manage the personal details shown across the portfolio, publish résumé versions, and review production readiness.</p>

      <section className="mt-12 border-t border-white/10 pt-8">
        <p className="admin-kicker">Public profile</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-[-.04em] text-white">Personal details</h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-500">These values power the navigation, hero, about, contact, and footer sections of the live site.</p>
        <PersonalDetailsEditor
          details={settings.personalDetails}
          history={history.versions}
          historyError={history.error}
        />
      </section>

      {resumes.error ? (
        <div className="mt-10 border border-amber-400/30 bg-amber-400/5 p-6 text-sm leading-7 text-amber-100">
          <strong className="block text-white">Résumé storage setup required</strong>
          {resumes.error} Run <code>supabase/migrations/20260718_resume_assets.sql</code> in the Supabase SQL Editor, then refresh this page.
        </div>
      ) : (
        <ResumeManager initialAssets={resumes.assets} initialActiveId={resumes.activeId} />
      )}

      <section className="mt-16">
        <p className="admin-kicker">Environment</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-[-.04em] text-white">Production readiness</h2>
        <div className="mt-6 border-t border-white/10">
          {items.map(([label, ready]) => (
            <div key={label} className="flex items-center justify-between border-b border-white/10 py-5">
              <span className="text-sm text-zinc-300">{label}</span>
              <span className={ready ? "text-signal" : "text-amber-300"}>{ready ? <CheckCircle2 className="h-5 w-5" /> : "Missing"}</span>
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm leading-7 text-zinc-500">Secrets are read from the deployment environment and are never exposed through this interface.</p>
      </section>
    </div>
  );
}
