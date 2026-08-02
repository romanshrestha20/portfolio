"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle2, KeyRound, Mail, RotateCcw } from "lucide-react";
import {
  requestAdminOtp,
  verifyAdminOtp,
  type LoginState,
  type VerifyLoginState,
} from "./actions";

const initialLoginState: LoginState = { status: "idle" };
const initialVerifyState: VerifyLoginState = { status: "idle" };

type LoginFormProps = {
  initialError?: string;
  next?: string;
};

export default function LoginForm({ initialError, next = "/admin" }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [requestState, requestAction, requesting] = useActionState(
    requestAdminOtp,
    initialError ? { status: "error" as const, message: initialError } : initialLoginState
  );
  const [verifyState, verifyAction, verifying] = useActionState(verifyAdminOtp, initialVerifyState);
  const [cooldown, setCooldown] = useState(0);
  const otpRef = useRef<HTMLInputElement>(null);
  const codeSent = requestState.status === "sent";
  const submittedEmail = requestState.email ?? email;

  useEffect(() => {
    if (!codeSent) return;
    setCooldown(60);
    otpRef.current?.focus();
  }, [codeSent, requestState]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = window.setTimeout(() => setCooldown((value) => value - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [cooldown]);

  if (!codeSent) {
    return (
      <form action={requestAction} className="mt-8 space-y-5 sm:mt-10 sm:space-y-6">
        <label className="flex flex-col gap-2 signal-label">
          Admin email
          <span className="relative ">
            <Mail className="absolute w-4 h-4 -translate-y-1/2 pointer-events-none left-4 top-1/2 text-signal-muted" aria-hidden="true" />
            <input
              className="signal-control signal-control-icon"
              type="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              placeholder="you@example.com"
              required
            />
          </span>
        </label>
        {requestState.message ? (
          <p className="text-sm text-red-400" role="alert">{requestState.message}</p>
        ) : (
          <p className="text-xs leading-5 text-signal-muted">We will email an eight-digit one-time code. No password is required.</p>
        )}
        <button className="w-full signal-button signal-button-primary sm:w-auto" disabled={requesting}>
          {requesting ? "Sending code…" : "Email verification code"}
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>
    );
  }

  return (
    <div className="mt-8 space-y-5 sm:mt-10 sm:space-y-6">
      <div className="py-1 pl-4 border-l-2 border-signal" role="status" aria-live="polite">
        <p className="flex items-center gap-2 text-sm font-semibold text-signal-text">
          <CheckCircle2 className="w-4 h-4 text-signal" /> Code sent
        </p>
        <p className="mt-2 text-xs leading-5 text-signal-muted">
          Enter the eight-digit code sent to {submittedEmail}. It can only be used once.
        </p>
      </div>

      <form action={verifyAction} className="space-y-5">
        <input type="hidden" name="email" value={submittedEmail} />
        <input type="hidden" name="next" value={next} />
        <label className="flex flex-col gap-2 signal-label">
          Verification code
          <span className="relative">
            <KeyRound className="absolute w-4 h-4 -translate-y-1/2 pointer-events-none left-4 top-1/2 text-signal-muted" aria-hidden="true" />
            <input
              ref={otpRef}
              className="signal-control signal-control-icon font-mono text-lg tracking-[.3em]"
              type="text"
              name="otp"
              inputMode="numeric"
              autoComplete="one-time-code"
              pattern="[0-9]{6}"
              minLength={6}
              maxLength={6}
              placeholder="000000"
              required
            />
          </span>
        </label>
        {verifyState.message && <p className="text-sm text-red-400" role="alert">{verifyState.message}</p>}
        <button className="w-full signal-button signal-button-primary sm:w-auto" disabled={verifying}>
          {verifying ? "Verifying…" : "Verify and open workspace"}
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-signal-line sm:pt-5">
        <form action={requestAction}>
          <input type="hidden" name="email" value={submittedEmail} />
          <button className="w-full signal-button sm:w-auto" disabled={cooldown > 0 || requesting}>
            <RotateCcw className="w-4 h-4" />
            {requesting ? "Sending…" : cooldown > 0 ? `Resend in ${cooldown}s` : "Resend code"}
          </button>
        </form>
        <a href="/admin/login" className="text-[10px] uppercase tracking-[.1em] text-signal-muted hover:text-signal">Use another email</a>
      </div>
    </div>
  );
}
