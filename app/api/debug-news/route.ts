export async function GET() {
  const UA = { "User-Agent": "Mozilla/5.0 (compatible; SmartcardBot/1.0)" };
  const out: Record<string, unknown> = {
    mymemoryEmailSet: Boolean(process.env.MYMEMORY_EMAIL),
  };

  async function check(name: string, url: string) {
    try {
      const res = await fetch(url, { headers: UA, signal: AbortSignal.timeout(10000) });
      const text = await res.text();
      out[name] = {
        status: res.status,
        items: (text.match(/<item[\s>]/g) ?? []).length,
        start: text.slice(0, 120),
      };
    } catch (e) {
      out[name] = { error: String(e) };
    }
  }

  await check("mddic", "https://mddic.gov.mn/mn/feed/");
  await check("mit", "https://www.technologyreview.com/feed");

  try {
    const params = new URLSearchParams({ q: "Artificial intelligence", langpair: "en|mn" });
    if (process.env.MYMEMORY_EMAIL) params.set("de", process.env.MYMEMORY_EMAIL);
    const r = await fetch(`https://api.mymemory.translated.net/get?${params}`);
    const d = await r.json();
    out.translate = { http: r.status, status: d?.responseStatus, text: d?.responseData?.translatedText, details: d?.responseDetails };
  } catch (e) {
    out.translate = { error: String(e) };
  }

  return Response.json(out);
}