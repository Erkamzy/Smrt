"use server";

import { randomUUID } from "node:crypto";
import { refresh, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { checkPassword, endSession, requireAdmin, startSession } from "@/lib/auth";
import { NEWS_TAG } from "@/lib/db";
import { db, NEWS_BUCKET } from "@/lib/supabase";

export type FormState = { error?: string };

// ========== Нэвтрэх ==========

export async function login(_prev: FormState, form: FormData): Promise<FormState> {
  // Нууц үг таах оролдлогыг удаашруулна
  await new Promise((r) => setTimeout(r, 600));
  if (!checkPassword(String(form.get("password") ?? ""))) {
    return { error: "Нууц үг буруу байна." };
  }
  await startSession();
  redirect("/admin");
}

export async function logout() {
  await endSession();
  redirect("/admin/login");
}

// ========== Мэдээ ==========

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_IMAGE = 4 * 1024 * 1024;

async function uploadImage(file: File): Promise<string> {
  if (!IMAGE_TYPES.includes(file.type)) throw new Error("Зөвхөн JPG, PNG, WEBP, GIF зураг оруулна.");
  if (file.size > MAX_IMAGE) throw new Error("Зургийн хэмжээ 4MB-аас ихгүй байна.");

  const client = db()!;
  const ext = file.type.split("/")[1].replace("jpeg", "jpg");
  const path = `${new Date().getFullYear()}/${randomUUID()}.${ext}`;

  const { error } = await client.storage
    .from(NEWS_BUCKET)
    .upload(path, file, { contentType: file.type, upsert: false });
  if (error) throw new Error(`Зураг хуулахад алдаа: ${error.message}`);

  return client.storage.from(NEWS_BUCKET).getPublicUrl(path).data.publicUrl;
}

export async function saveNews(_prev: FormState, form: FormData): Promise<FormState> {
  await requireAdmin();
  const client = db();
  if (!client) return { error: "Өгөгдлийн сан тохируулагдаагүй байна." };

  const id = Number(form.get("id")) || null;
  const title = String(form.get("title") ?? "").trim();
  const category = String(form.get("category") ?? "").trim() || "Мэдээ";
  const body = String(form.get("content") ?? "").trim();
  const date = String(form.get("published_at") ?? "");
  let summary = String(form.get("summary") ?? "").trim();
  let image = String(form.get("image_url") ?? "").trim() || null;

  if (title.length < 3) return { error: "Гарчиг хэт богино байна." };
  if (!body) return { error: "Агуулга хоосон байна." };
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return { error: "Огноо буруу байна." };

  // Хоосон мөрөөр догол мөр тусгаарлана
  const content = body.split(/\n\s*\n/).map((p) => p.replace(/\s+/g, " ").trim()).filter(Boolean);
  if (!summary) summary = content[0].slice(0, 160);

  const file = form.get("image");
  if (file instanceof File && file.size > 0) {
    try {
      image = await uploadImage(file);
    } catch (e) {
      return { error: (e as Error).message };
    }
  }
  if (form.get("remove_image") === "on") image = null;

  const row = {
    title,
    category,
    summary,
    content,
    image,
    published_at: date,
    published: form.get("published") === "on",
  };

  const { error } = id
    ? await client.from("news").update(row).eq("id", id)
    : await client.from("news").insert(row);

  if (error) return { error: error.message };

  updateTag(NEWS_TAG);
  redirect("/admin?tab=news");
}

export async function toggleNews(id: number, published: boolean) {
  await requireAdmin();
  await db()?.from("news").update({ published }).eq("id", id);
  updateTag(NEWS_TAG);
}

export async function deleteNews(id: number) {
  await requireAdmin();
  await db()?.from("news").delete().eq("id", id);
  updateTag(NEWS_TAG);
}

// ========== Хүсэлтүүд ==========

export async function markMessage(id: number, is_read: boolean) {
  await requireAdmin();
  await db()?.from("contact_messages").update({ is_read }).eq("id", id);
  refresh();
}

export async function deleteMessage(id: number) {
  await requireAdmin();
  await db()?.from("contact_messages").delete().eq("id", id);
  refresh();
}
