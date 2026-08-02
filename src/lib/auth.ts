import "server-only";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export function isAdminEmail(email: string | null | undefined) {
  const allowedEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  return Boolean(
    allowedEmail && email?.trim().toLowerCase() === allowedEmail
  );
}

export function safeAdminRedirect(
  value: string | null | undefined,
  fallback = "/admin"
) {
  if (!value?.startsWith("/") || value.startsWith("//")) return fallback;

  try {
    const url = new URL(value, "https://portfolio.local");
    if (url.origin !== "https://portfolio.local") return fallback;
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return fallback;
  }
}

export async function getAdminUser() {
  const client = await createSupabaseServerClient();
  if (!client) return null;
  const { data: { user } } = await client.auth.getUser();
  if (!user || !isAdminEmail(user.email)) return null;
  return user;
}

export async function requireAdmin() {
  const user = await getAdminUser();
  if (!user) throw new Error("Unauthorized");
  return user;
}
