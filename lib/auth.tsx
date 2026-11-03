import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE = "sc_admin";
const MAX_AGE = 60 * 60 * 8; // 8 цаг

const password = () => process.env.ADMIN_PASSWORD ?? "";

export const isAdminConfigured = () => password().length >= 8;

const sign = (value: string) =>
  createHmac("sha256", `${password()}:${process.env.SUPABASE_SECRET_KEY ?? ""}`)
    .update(value)
    .digest("hex");

// Урт нь ялгаатай байсан ч хугацааны ялгаагаар нууц үг таагдахгүй
function safeEqual(a: string, b: string) {
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
}

export function checkPassword(input: string) {
  return isAdminConfigured() && safeEqual(input, password());
}

export async function startSession() {
  const exp = String(Date.now() + MAX_AGE * 1000);
  (await cookies()).set(COOKIE, `${exp}.${sign(exp)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function endSession() {
  (await cookies()).delete(COOKIE);
}

export async function isAdmin() {
  if (!isAdminConfigured()) return false;
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig || !safeEqual(sig, sign(exp))) return false;
  return Number(exp) > Date.now();
}

// Админ хуудас, үйлдэл бүрийн эхэнд дуудна
export async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}
