import "server-only";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getAdminUser() {
  const client = await createSupabaseServerClient();
  if (!client) return null;
  const { data: { user } } = await client.auth.getUser();
  if (!user) return null;
  const allowedEmail = process.env.ADMIN_EMAIL?.toLowerCase();
  if (allowedEmail && user.email?.toLowerCase() !== allowedEmail) return null;
  return user;
}

export async function requireAdmin() {
  const user = await getAdminUser();
  if (!user) throw new Error("Unauthorized");
  return user;
}
