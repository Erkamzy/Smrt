import { cacheLife, cacheTag } from "next/cache";
import { db } from "@/lib/supabase";
import { newsList, type News } from "@/lib/news";
import { getAllNews } from "@/lib/rss";

export type NewsRow = {
  id: number;
  category: string;
  title: string;
  summary: string;
  content: string[];
  image: string | null;
  published: boolean;
  published_at: string;
  created_at: string;
};

export type ContactMessage = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
};

export const NEWS_TAG = "news";

const toNews = (r: NewsRow): News => ({
  id: r.id,
  category: r.category,
  title: r.title,
  summary: r.summary,
  content: r.content,
  date: r.published_at,
  image: r.image ?? undefined,
});

// ========== Нийтийн хуудас (кэштэй) ==========

// Компанийн өөрийн мэдээ. Өгөгдлийн сан тохируулаагүй бол статик жишээ мэдээ.
export async function getCompanyNews(): Promise<News[]> {
  "use cache";
  cacheTag(NEWS_TAG);
  cacheLife("hours");
  return queryPublishedNews();
}

// Кэшгүй: устгасан/нуусан мэдээ хэзээ ч харагдахгүй байх шаардлагатай газарт ашиглана
export async function queryPublishedNews(): Promise<News[]> {
  const client = db();
  if (!client) return newsList;

  const { data, error } = await client
    .from("news")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false })
    .order("id", { ascending: false });

  if (error) {
    console.error("Мэдээ уншихад алдаа:", error.message);
    return [];
  }
  return (data as NewsRow[]).map(toNews);
}

export async function getCompanyNewsById(id: number): Promise<News | null> {
  "use cache";
  cacheTag(NEWS_TAG);
  cacheLife("hours");

  if (!Number.isInteger(id) || id <= 0) return null;

  const client = db();
  if (!client) return newsList.find((n) => n.id === id) ?? null;

  const { data } = await client
    .from("news")
    .select("*")
    .eq("id", id)
    .eq("published", true)
    .maybeSingle();

  return data ? toNews(data as NewsRow) : null;
}

// Компанийн мэдээ + гадаад RSS мэдээг огноогоор нь холино
export async function getNewsFeed(): Promise<News[]> {
  const [own, external] = await Promise.all([getCompanyNews(), getAllNews()]);
  return [...own, ...external].sort((a, b) => b.date.localeCompare(a.date));
}

// ========== Админ (кэшгүй) ==========

export async function listAllNews(): Promise<NewsRow[]> {
  const client = db();
  if (!client) return [];
  const { data, error } = await client
    .from("news")
    .select("*")
    .order("published_at", { ascending: false })
    .order("id", { ascending: false });
  if (error) throw new Error(error.message);
  return data as NewsRow[];
}

export async function getNewsRow(id: number): Promise<NewsRow | null> {
  const client = db();
  if (!client || !Number.isInteger(id)) return null;
  const { data } = await client.from("news").select("*").eq("id", id).maybeSingle();
  return (data as NewsRow) ?? null;
}

export async function listMessages(): Promise<ContactMessage[]> {
  const client = db();
  if (!client) return [];
  const { data, error } = await client
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);
  if (error) throw new Error(error.message);
  return data as ContactMessage[];
}
