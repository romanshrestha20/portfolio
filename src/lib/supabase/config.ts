export const hasSupabaseConfig = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);

export const hasSupabaseAdminConfig = Boolean(
  hasSupabaseConfig && process.env.SUPABASE_SECRET_KEY
);
