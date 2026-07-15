import "server-only";
import { createClient } from "@supabase/supabase-js";
import { hasSupabaseAdminConfig } from "./config";

export function createSupabaseAdminClient() {
  if (!hasSupabaseAdminConfig) return null;
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SECRET_KEY!, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
