import { XMLParser } from "fast-xml-parser";
import { cacheLife } from "next/cache";
import type { News } from "@/lib/news";

const xml = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "@_" });
const HEADERS = { "User-Agent": "Mozilla/5.0 (compatible; SmartcardBot/1.0)" };

function decode(text: string) {
  return text
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n))) // &#8220; гэх мэт
    .replace(/&nbsp;/g, " ")
    .replace(/&ldquo;|&rdquo;|&quot;/g, '"')
    .replace(/&lsquo;|&rsquo;|&#39;/g, "'")
    .replace(/&ndash;|&mdash;/g, "-")
    .replace(/&amp;/g, "&");
}

// HTML-ийг цэвэрлэж, эхний догол мөрийг богино хураангуй болгоно
function summarize(html = "", max = 150) {
  const first = html.match(/<p[^>]*>([\s\S]*?)<\/p>/)?.[1] ?? html;
  const plain = decode(first.replace(/<[^>]*>/g, ""))
    .replace(/\s+/g, " ")
    .trim();
  return plain.length > max ? plain.slice(0, max).trimEnd() + "…" : plain;
}

// HTML доторх эхний зургийг олно
function firstImage(html = ""): string {
  return (
    html.match(/data-src="(https?:\/\/[^"]+)"/)?.[1] ??
    html.match(/<img[^>]+src="(https?:\/\/[^"]+)"/)?.[1] ??
    ""
  );
}

// Зургийг олно: media:content, enclosure, content:encoded, description
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

// Мэдээний хуудаснаас og:image авна (feed-д зураг байхгүй үед)
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
          title: decode(String(item.title ?? "Гарчиггүй").trim()),
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

export async function getAllNews(): Promise<News[]> {
  "use cache";
  cacheLife("hours");

  const results = await Promise.all([
    getRssNews("https://mddic.gov.mn/mn/feed/", "Цахим хөгжил"),
  ]);

  return results
    .flat()
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((n, i) => ({ ...n, id: i + 1 }));
}