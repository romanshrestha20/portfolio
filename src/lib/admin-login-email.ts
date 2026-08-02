import "server-only";
import { createHash } from "node:crypto";
import { Resend } from "resend";

export type AdminLoginEmailResult = "sent" | "skipped" | "failed";

export async function sendAdminOtpEmail(
  to: string,
  otp: string
): Promise<AdminLoginEmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.AUTH_EMAIL_FROM ?? process.env.CONTACT_EMAIL_FROM;
  if (!apiKey || !from) return "skipped";

  const resend = new Resend(apiKey);
  const idempotencyKey = createHash("sha256")
    .update(`${to}:${otp}`)
    .digest("hex")
    .slice(0, 32);

  try {
    const { error } = await resend.emails.send(
      {
        from,
        to,
        subject: "Your Signal Control verification code",
        text: [
          "Sign in to Signal Control",
          "",
          "Enter this one-time code on the admin sign-in screen:",
          otp,
          "",
          "This code can only be used once. If you did not request it, you can ignore this email.",
        ].join("\n"),
        html: `
          <div style="font-family:Arial,sans-serif;line-height:1.6;color:#18181b;max-width:600px">
            <p style="font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#65a30d">Signal Control</p>
            <h1 style="font-size:24px;margin:8px 0 16px">Your verification code</h1>
            <p style="color:#52525b">Enter this one-time code on the admin sign-in screen.</p>
            <p style="margin:28px 0;font-family:monospace;font-size:36px;font-weight:700;letter-spacing:.22em;color:#18181b">${otp}</p>
            <p style="font-size:13px;color:#71717a">This code can only be used once. If you did not request it, you can ignore this email.</p>
          </div>
        `,
        tags: [{ name: "source", value: "portfolio-admin-login" }],
      },
      { idempotencyKey: `admin-login-${idempotencyKey}` }
    );

    if (error) {
      console.error(
        "Admin login email delivery failed:",
        JSON.stringify({ message: error.message })
      );
      return "failed";
    }

    return "sent";
  } catch (error) {
    console.error(
      "Admin login email delivery failed:",
      JSON.stringify({
        message: error instanceof Error ? error.message : String(error),
      })
    );
    return "failed";
  }
}
