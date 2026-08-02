"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, History, LoaderCircle, RotateCcw, XCircle } from "lucide-react";
import {
  restorePersonalDetails,
  savePersonalDetails,
  type RestorePersonalDetailsState,
  type SavePersonalDetailsState,
} from "@/app/admin/actions";
import type { PersonalDetails, PersonalDetailsVersion } from "@/types/site-settings";

const initialState: SavePersonalDetailsState = { status: "idle" };
const initialRestoreState: RestorePersonalDetailsState = { status: "idle" };

function Field({ label, name, value, maxLength, type = "text", wide = false }: {
  label: string;
  name: keyof PersonalDetails;
  value: string;
  maxLength: number;
  type?: "text" | "email" | "url";
  wide?: boolean;
}) {
  return (
    <label className={`signal-label flex flex-col gap-2 ${wide ? "sm:col-span-2" : ""}`}>
      {label}
      <input className="signal-control" type={type} name={name} defaultValue={value} maxLength={maxLength} required />
    </label>
  );
}

function TextArea({ label, name, value, maxLength }: {
  label: string;
  name: keyof PersonalDetails;
  value: string;
  maxLength: number;
}) {
  return (
    <label className="signal-label flex flex-col gap-2 sm:col-span-2">
      {label}
      <textarea className="signal-control min-h-28 resize-y" name={name} defaultValue={value} maxLength={maxLength} required />
    </label>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

function RestoreVersion({ version }: { version: PersonalDetailsVersion }) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(restorePersonalDetails, initialRestoreState);

  useEffect(() => {
    if (state.status === "success") router.refresh();
  }, [router, state.status]);

  return (
    <form action={formAction} className="grid gap-4 border-b border-white/10 py-5 sm:grid-cols-[1fr_auto] sm:items-center">
      <input type="hidden" name="versionId" value={version.id} />
      <div className="min-w-0">
        <p className="text-sm font-medium text-white">{version.details.name} · {version.details.role}</p>
        <p className="mt-1 text-xs text-zinc-500">{version.details.location} · {formatDate(version.createdAt)}</p>
        {state.message && (
          <p className={`mt-2 text-xs ${state.status === "success" ? "text-signal" : "text-red-300"}`} role="status">
            {state.message}
          </p>
        )}
      </div>
      <button className="signal-button" disabled={pending}>
        {pending ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <RotateCcw className="h-4 w-4" />}
        {pending ? "Restoring…" : "Restore"}
      </button>
    </form>
  );
}

export default function PersonalDetailsEditor({ details, history, historyError }: {
  details: PersonalDetails;
  history: PersonalDetailsVersion[];
  historyError: string | null;
}) {
  const [state, formAction, pending] = useActionState(savePersonalDetails, initialState);

  return (
    <div className="mt-10">
      <form action={formAction} className="space-y-10">
        {state.status !== "idle" && (
          <div
            className={`flex items-center gap-3 border px-4 py-3 text-sm ${state.status === "success" ? "admin-notice-success" : "border-red-400/30 bg-red-400/5 text-red-200"}`}
            role={state.status === "error" ? "alert" : "status"}
          >
            {state.status === "success" ? <CheckCircle2 className="h-4 w-4 shrink-0" /> : <XCircle className="h-4 w-4 shrink-0" />}
            {state.message}
          </div>
        )}

        <section>
          <h2 className="admin-section-title">Identity</h2>
          <div className="admin-form-grid">
            <Field label="Full name" name="name" value={details.name} maxLength={80} />
            <Field label="Professional title" name="role" value={details.role} maxLength={100} />
            <Field label="Location" name="location" value={details.location} maxLength={100} />
            <Field label="Availability" name="availability" value={details.availability} maxLength={120} />
            <TextArea label="Homepage introduction" name="heroIntro" value={details.heroIntro} maxLength={320} />
          </div>
        </section>

        <section>
          <h2 className="admin-section-title">About</h2>
          <div className="admin-form-grid">
            <TextArea label="Opening biography" name="aboutIntro" value={details.aboutIntro} maxLength={500} />
            <TextArea label="Extended biography" name="aboutBody" value={details.aboutBody} maxLength={1200} />
            <Field label="Study" name="study" value={details.study} maxLength={160} />
            <Field label="Focus" name="focus" value={details.focus} maxLength={160} />
            <Field label="Outside code" name="outsideCode" value={details.outsideCode} maxLength={200} wide />
          </div>
        </section>

        <section>
          <h2 className="admin-section-title">Contact & profiles</h2>
          <div className="admin-form-grid">
            <Field label="Email" name="email" value={details.email} maxLength={160} type="email" />
            <Field label="Coordinates" name="coordinates" value={details.coordinates} maxLength={100} />
            <Field label="LinkedIn URL" name="linkedinUrl" value={details.linkedinUrl} maxLength={300} type="url" />
            <Field label="GitHub URL" name="githubUrl" value={details.githubUrl} maxLength={300} type="url" />
            <TextArea label="Contact prompt" name="contactPrompt" value={details.contactPrompt} maxLength={240} />
            <TextArea label="Response note" name="responseTime" value={details.responseTime} maxLength={300} />
            <Field label="Footer note" name="footerNote" value={details.footerNote} maxLength={120} wide />
          </div>
        </section>

        <div className="flex items-center gap-4 border-t border-white/10 pt-6">
          <button className="signal-button signal-button-primary" disabled={pending}>
            {pending ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
            {pending ? "Publishing…" : "Publish personal details"}
          </button>
          <span className="text-[10px] uppercase tracking-[.12em] text-signal-muted">Updates the live portfolio</span>
        </div>
      </form>

      <section className="pt-16">
        <div className="flex items-end justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <p className="admin-kicker">Revision archive</p>
            <h2 className="mt-2 flex items-center gap-3 text-2xl font-semibold tracking-[-.04em] text-white">
              <History className="h-5 w-5 text-signal" /> Personal detail history
            </h2>
          </div>
          <span className="text-[9px] uppercase tracking-[.12em] text-zinc-500">Latest 25</span>
        </div>
        {historyError ? (
          <div className="mt-5 border border-amber-400/30 bg-amber-400/5 p-4 text-sm leading-6 text-amber-100">
            {historyError} Run <code>supabase/migrations/20260802_personal_details_history.sql</code>, then refresh.
          </div>
        ) : history.length ? (
          <div>{history.map((version) => <RestoreVersion key={version.id} version={version} />)}</div>
        ) : (
          <p className="py-7 text-sm text-zinc-500">No saved revisions yet. Publishing the next update will create one.</p>
        )}
      </section>
    </div>
  );
}
