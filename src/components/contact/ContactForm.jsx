"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const update = ({ target }) => setFormData((current) => ({ ...current, [target.name]: target.value }));

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true); setStatus("Sending signal…");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Message request failed");
      setFormData({ name: "", email: "", message: "" });
      setStatus("Message received. I’ll be in touch.");
    } catch (error) {
      console.error("Contact form failed:", error);
      setStatus("The signal dropped. Please email me directly.");
    } finally { setLoading(false); }
  };

  return (
    <form onSubmit={submit} className="space-y-7">
      <div className="grid gap-7 sm:grid-cols-2">
        <label className="signal-label">Your name<input className="field-input" name="name" value={formData.name} onChange={update} placeholder="Name" required /></label>
        <label className="signal-label">Email address<input className="field-input" type="email" name="email" value={formData.email} onChange={update} placeholder="you@example.com" required /></label>
      </div>
      <label className="signal-label block">Message<textarea className="field-input min-h-[130px] resize-y" name="message" value={formData.message} onChange={update} placeholder="Tell me a little about the opportunity…" required /></label>
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <button type="submit" disabled={loading} className="signal-button signal-button-primary disabled:cursor-wait disabled:opacity-60">{loading ? "Sending…" : "Send message"}<ArrowUpRight className="h-4 w-4" /></button>
        {status && <p aria-live="polite" className="text-sm text-signal-muted">{status}</p>}
      </div>
    </form>
  );
}
