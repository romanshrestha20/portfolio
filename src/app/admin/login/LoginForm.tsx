"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export default function LoginForm() {
  const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [showPassword, setShowPassword] = useState(false); const [error, setError] = useState(""); const [loading, setLoading] = useState(false);
  const router = useRouter();
  async function submit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true); setError("");
    const client = createSupabaseBrowserClient();
    if (!client) { setError("Supabase environment variables are missing."); setLoading(false); return; }
    const result = await client.auth.signInWithPassword({ email, password });
    if (result.error) { setError(result.error.message); setLoading(false); return; }
    router.replace("/admin"); router.refresh();
  }
  return (
    <form onSubmit={submit} className="mt-10 space-y-6">
      <label className="signal-label flex flex-col gap-2">Email<input className="signal-control" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></label>
      <label className="signal-label flex flex-col gap-2">
        Password
        <span className="relative">
          <input
            className="signal-control pr-12"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-signal-muted transition-colors hover:text-signal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-signal"
            onClick={() => setShowPassword((visible) => !visible)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </span>
      </label>
      {error && <p className="text-sm text-red-400" role="alert">{error}</p>}
      <button className="signal-button signal-button-primary" disabled={loading}>{loading ? "Checking…" : "Open workspace"}<ArrowRight className="w-4 h-4" /></button>
    </form>
  );
}
