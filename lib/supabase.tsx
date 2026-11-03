import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SECRET_KEY;

let client: SupabaseClient | null = null;

export const isDbConfigured = Boolean(url && key);

// Зөвхөн сервер дээр ажиллана: secret key нь RLS-ийг тойрдог тул browser руу хэзээ ч гаргахгүй.
// Тохиргоо хийгдээгүй үед null буцааж, сайт статик өгөгдлөөр ажилласаар байна.
export function db(): SupabaseClient | null {
  if (typeof window !== "undefined") {
    throw new Error("Supabase secret client-ийг browser дээр ашиглах боломжгүй");
  }
  if (!url || !key) return null;
  client ??= createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return client;
}

export const NEWS_BUCKET = "news-images";
