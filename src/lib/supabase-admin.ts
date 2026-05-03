import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cached: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (cached) return cached;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url) {
    throw new Error(
      "Supabase: NEXT_PUBLIC_SUPABASE_URL is not set in the environment.",
    );
  }
  if (!serviceRoleKey) {
    throw new Error(
      "Supabase: SUPABASE_SERVICE_ROLE_KEY is not set in the environment.",
    );
  }

  cached = createClient(url, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  return cached;
}
