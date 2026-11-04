import { XMLParser } from "fast-xml-parser";
import { cacheLife } from "next/cache";
import type { News } from "@/lib/news";
import { translateTexts } from "@/lib/translate";

const xml = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "@_" });
const HEADERS = { "User-Agent": "Mozilla/5.0 (compatible; SmartcardBot/1.0)" };

function decode(text: string) {
  return text
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&nbsp;/g, " ")
    .replace(/&ldquo;|&rdquo;|&quot;/g, '"')
    .replace(/&lsquo;|&rsquo;|&#39;/g, "'")
    .replace(/&ndash;|&mdash;/g, "-")
    .replace(/&amp;/g, "&");
}

// Товчлол, онцгой нэрийг том үсгээр хэвээр үлдээнэ
const KEEP = [
  "AI", "ЦХИХХЯ", "УИХ", "НҮБ", "ХХК", "GPU", "E-MONGOLIA", "MDDIC", "BRT",
  "Монгол", "Улсын", "Улс", "Казахстан", "Истанбул", "Астана", "Говь-Алтай",
  "Улаанбаатар", "Төв", "Ази",
];

// Бүх том үсгээр бичсэн гарчгийг жижиг болгоно
function fixCaps(s: string) {
  const letters = s.replace(/[^A-Za-zА-Яа-яӨөҮү]/g, "");
  if (letters.length < 8) return s;
  const upper = letters.replace(/[^A-ZА-ЯӨҮ]/g, "").length;
  if (upper / letters.length < 0.7) return s;

  const out = s
    .toLowerCase()
    .split(/(\s+)/)
    .map((w) => {
      const core = w.replace(/[^\p{L}\d-]/gu, "");
      const hit = KEEP.find((k) => k.toLowerCase() === core);
      return hit ? w.replace(core, hit) : w;
    })
    .join("");
  return out.charAt(0).toUpperCase() + out.slice(1);
}

// HTML-ийг цэвэрлэж, эхний догол мөрийг богино хураангуй болгоно
function summarize(html = "", max = 150) {
  const first = html.match(/<p[^>]*>([\s\S]*?)<\/p>/)?.[1] ?? html;
  const plain = decode(first.replace(/<[^>]*>/g, ""))
    .replace(/\s+/g, " ")
    .trim();
  return plain.length > max ? plain.slice(0, max).trimEnd() + "…" : plain;
}

function firstImage(html = ""): string {
  return (
    html.match(/data-src="(https?:\/\/[^"]+)"/)?.[1] ??
    html.match(/<img[^>]+src="(https?:\/\/[^"]+)"/)?.[1] ??
    ""
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function feedImage(item: any, html: string): string {
  const media = item["media:content"];
  const m = Array.isArray(media) ? media[0] : media;
  return (
    m?.["@_url"] ??
    item.enclosure?.["@_url"] ??
    firstImage(String(item["content:encoded"] ?? "")) ??
    firstImage(html)
  );
}

async function getOgImage(url?: string): Promise<string> {
  if (!url) return "";
  try {
    const res = await fetch(url, {
      headers: HEADERS,
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return "";
    const html = await res.text();
    const m =
      html.match(
        /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i
      ) ??
      html.match(
        /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i
      );
    return m?.[1] ?? "";
  } catch {
    return "";
  }
}

async function withImages(list: News[]): Promise<News[]> {
  return Promise.all(
    list.map(async (n) =>
      n.image ? n : { ...n, image: await getOgImage(n.url) }
    )
  );
}

export async function getRssNews(
  feedUrl: string,
  category = "Мэдээ"
): Promise<News[]> {
  "use cache";
  cacheLife("hours");

  try {
    const res = await fetch(feedUrl, { headers: HEADERS });
    if (!res.ok) return [];

    const data = xml.parse(await res.text());
    const raw = data?.rss?.channel?.item ?? [];
    const items = Array.isArray(raw) ? raw : [raw];

    const list: News[] = items
      .slice(0, 12)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((item: any, i: number) => {
        const html = String(item.description ?? "");
        const summary = summarize(html);
        const date = item.pubDate
          ? new Date(item.pubDate).toISOString().slice(0, 10)
          : "";

        return {
          id: i + 1,
          category,
          title: fixCaps(decode(String(item.title ?? "Гарчиггүй").trim())),
          summary,
          content: [summary],
          date,
          image: feedImage(item, html) || "",
          url: item.link ? String(item.link) : undefined,
        };
      });

    return withImages(list);
  } catch (err) {
    console.error("RSS алдаа:", err);
    return [];
  }
}

// Англи feed-ийг татаад MyMemory-оор монгол руу орчуулна.
// Орчуулга амжилтгүй бол англиар харуулахгүйн тулд энэ feed-ийг алгасна.
async function getTranslatedRss(feedUrl: string, category: string, limit = 6): Promise<News[]> {
  const list = (await getRssNews(feedUrl, category)).slice(0, limit);
  if (list.length === 0) return [];
  try {
    const tr = await translateTexts(list.map((n) => ({ title: n.title, summary: n.summary })));
    return list.map((n, i) => ({
      ...n,
      title: tr[i].title,
      summary: tr[i].summary,
      content: [tr[i].summary],
      translated: true,
    }));
  } catch (err) {
    console.error("Орчуулгын алдаа:", feedUrl, err);
    return [];
  }
}

export async function getAllNews(): Promise<News[]> {
  "use cache";
  cacheLife("hours");

  const results = await Promise.all([
    getRssNews("https://mddic.gov.mn/mn/feed/", "Цахим хөгжил"),
    getTranslatedRss("https://www.technologyreview.com/feed", "Дэлхийн технологи"),
  ]);

  return results
    .flat()
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((n, i) => ({ ...n, id: i + 1 }));
}