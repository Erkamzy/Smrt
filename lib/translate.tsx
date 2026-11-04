import { cacheLife } from "next/cache";

type Item = { title: string; summary: string };

function decode(s: string) {
  return s
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

// MyMemory: нэг хүсэлт хамгийн ихдээ 500 байт
async function tr(text: string): Promise<string> {
  const q = text.trim();
  if (!q) return q;

  const params = new URLSearchParams({ q: q.slice(0, 450), langpair: "en|mn" });
  if (process.env.MYMEMORY_EMAIL) params.set("de", process.env.MYMEMORY_EMAIL);

  const res = await fetch(`https://api.mymemory.translated.net/get?${params}`, {
    signal: AbortSignal.timeout(10000),
  });
  if (!res.ok) throw new Error(`MyMemory ${res.status}`);

  const data = await res.json();
  const out: string = data?.responseData?.translatedText ?? "";

  // Хязгаар хэтэрсэн үед MyMemory энгийн хариугаар сануулга илгээдэг
  if (data?.responseStatus !== 200 || !out || out.includes("MYMEMORY WARNING")) {
    throw new Error(data?.responseDetails || "MyMemory орчуулга амжилтгүй");
  }
  return decode(out);
}

// 1 өдөр кэшлэнэ. Алдаа гарвал шидэх тул буруу үр дүн кэшлэгдэхгүй.
export async function translateTexts(items: Item[]): Promise<Item[]> {
  "use cache";
  cacheLife("days");

  return Promise.all(
    items.map(async (n) => ({
      title: await tr(n.title),
      summary: await tr(n.summary),
    }))
  );
}