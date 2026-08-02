"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { sendAdminOtpEmail } from "@/lib/admin-login-email";
import { isAdminEmail, safeAdminRedirect } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const emailSchema = z.string().trim().email().max(254);
const otpSchema = z.string().trim().regex(/^\d{6}$/, "Enter the six-digit code.");

export type LoginState = {
  status: "idle" | "sent" | "error";
  message?: string;
  email?: string;
};

export type VerifyLoginState = {
  status: "idle" | "error";
  message?: string;
};

export async function requestAdminOtp(
  _previousState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const parsedEmail = emailSchema.safeParse(formData.get("email"));
  if (!parsedEmail.success) {
    return { status: "error", message: "Enter a valid email address." };
  }

  if (!process.env.ADMIN_EMAIL) {
    return {
      status: "error",
      message: "Admin access is not configured.",
    };
  }

  const client = createSupabaseAdminClient();
  if (!client) {
    return {
      status: "error",
      message: "Authentication is temporarily unavailable.",
    };
  }

  // Always return the same success state for a well-formed email. This avoids
  // exposing the private admin allowlist through the login form.
  if (!isAdminEmail(parsedEmail.data)) return { status: "sent", email: parsedEmail.data };

  const { data, error } = await client.auth.admin.generateLink({
    type: "magiclink",
    email: parsedEmail.data,
  });

  const otp = data?.properties?.email_otp;
  if (error || !otp) {
    console.error(
      "Unable to generate the admin OTP:",
      JSON.stringify({
        code: error?.code,
        status: error?.status,
        message: error?.message ?? "Supabase did not return an email OTP.",
      })
    );
    return { status: "sent", email: parsedEmail.data };
  }

  await sendAdminOtpEmail(parsedEmail.data, otp);

  return { status: "sent", email: parsedEmail.data };
}

export async function verifyAdminOtp(
  _previousState: VerifyLoginState,
  formData: FormData
): Promise<VerifyLoginState> {
  const email = emailSchema.safeParse(formData.get("email"));
  const otp = otpSchema.safeParse(formData.get("otp"));
  if (!email.success || !otp.success) {
    return { status: "error", message: "Enter the six-digit code from your email." };
  }

  const client = await createSupabaseServerClient();
  if (!client) return { status: "error", message: "Authentication is temporarily unavailable." };

  const { error } = await client.auth.verifyOtp({
    email: email.data,
    token: otp.data,
    type: "email",
  });
  if (error) {
    return { status: "error", message: "That code is invalid or has expired. Request a new one." };
  }

  const { data: { user } } = await client.auth.getUser();
  if (!user || !isAdminEmail(user.email)) {
    await client.auth.signOut();
    return { status: "error", message: "This account is not authorized for the admin workspace." };
  }

  redirect(safeAdminRedirect(formData.get("next")?.toString()));
}
