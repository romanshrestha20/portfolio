import "server-only";
import { Resend } from "resend";

type ContactMessage = {
  id: string;
  name: string;
  email: string;
  message: string;
};

export type ContactNotificationResult = "sent" | "skipped" | "failed";

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;",
    };
    return entities[character];
  });
}

export async function sendContactNotification(
  contact: ContactMessage
): Promise<ContactNotificationResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_EMAIL_FROM;
  const to = process.env.CONTACT_EMAIL_TO ?? process.env.ADMIN_EMAIL;

  if (!apiKey || !from || !to) return "skipped";

  const resend = new Resend(apiKey);
  const safeName = escapeHtml(contact.name);
  const safeEmail = escapeHtml(contact.email);
  const safeMessage = escapeHtml(contact.message).replace(/\n/g, "<br />");
  const subjectName = contact.name.replace(/\s+/g, " ").trim();
  const { error } = await resend.emails.send(
    {
      from,
      to,
      replyTo: contact.email,
      subject: `Portfolio message from ${subjectName}`,
      text: [
        "New portfolio contact message",
        "",
        `Name: ${contact.name}`,
        `Email: ${contact.email}`,
        "",
        contact.message,
      ].join("\n"),
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#18181b;max-width:640px">
          <p style="font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#71717a">Portfolio contact</p>
          <h1 style="font-size:24px;margin:8px 0 24px">New message from ${safeName}</h1>
          <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
          <div style="margin-top:24px;padding:20px;border-left:3px solid #84cc16;background:#f4f4f5">${safeMessage}</div>
          <p style="margin-top:24px;font-size:13px;color:#71717a">Reply to this email to respond directly to ${safeName}.</p>
        </div>
      `,
      tags: [{ name: "source", value: "portfolio-contact" }],
    },
    { idempotencyKey: `portfolio-contact-${contact.id}` }
  );

  if (error) {
    console.error("Contact email notification failed", {
      messageId: contact.id,
      error: error.message,
    });
    return "failed";
  }

  return "sent";
}
