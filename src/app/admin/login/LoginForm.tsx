"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export default function LoginForm() {
  const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [error, setError] = useState(""); const [loading, setLoading] = useState(false);
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
      <label className="admin-label">Email<input className="admin-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></label>
      <label className="admin-label">Password<input className="admin-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></label>
      {error && <p className="text-sm text-red-400" role="alert">{error}</p>}
      <button className="admin-primary" disabled={loading}>{loading ? "Checking…" : "Open workspace"}<ArrowRight className="w-4 h-4" /></button>
    </form>
  );
}
