"use server";

import { db } from "@/lib/supabase";

export type ContactState = {
  ok?: boolean;
  error?: string;
  values?: Record<string, string>;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendContact(
  _prev: ContactState,
  form: FormData
): Promise<ContactState> {
  const get = (k: string, max: number) => String(form.get(k) ?? "").trim().slice(0, max);

  const values = {
    name: get("name", 120),
    email: get("email", 160),
    phone: get("phone", 40),
    company: get("company", 160),
    message: get("message", 4000),
  };

  // Spam хамгаалалт: хүн харахгүй талбарыг бот бөглөдөг
  if (get("website", 200)) return { ok: true };

  if (values.name.length < 2) return { error: "Нэрээ оруулна уу.", values };
  if (!EMAIL.test(values.email)) return { error: "Имэйл хаяг буруу байна.", values };
  if (values.message.length < 10)
    return { error: "Мессеж хамгийн багадаа 10 тэмдэгт байна.", values };

  const client = db();
  if (!client) {
    return { error: "Одоогоор хүсэлт хүлээн авах боломжгүй байна. Утсаар холбогдоно уу.", values };
  }

  const { error } = await client.from("contact_messages").insert({
    ...values,
    phone: values.phone || null,
    company: values.company || null,
  });

  if (error) {
    console.error("Холбоо барих хүсэлт хадгалахад алдаа:", error.message);
    return { error: "Илгээхэд алдаа гарлаа. Дахин оролдоно уу.", values };
  }

  return { ok: true };
}
