import { ApiError, GoogleGenAI, ThinkingLevel, type Content } from "@google/genai";
import { company, solutions } from "@/lib/content";

// Туршилтын хувилбар: Google Gemini (үнэгүй түвшин). GEMINI_MODEL-оор өөрчилж болно.
const MODEL = process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";

const SYSTEM = `Та бол ${company.name}-ийн (Smartcard) вэбсайтын туслах чатбот.
Компани ${company.founded} онд байгуулагдсан, 25+ жилийн туршлагатай. Уриа: "Digital Identity and Security".

Шийдлүүд:
${solutions
  .map((s) => `- ${s.title}: ${s.text}${s.items.length ? ` (${s.items.join(", ")})` : ""}. ${s.href}`)
  .join("\n")}
- Онцлох бүтээгдэхүүн: Entrust Sigma DS4 — өнгөт картыг 78 секундэд хэвлэнэ; VISA, Mastercard, UnionPay, ₮ карт хэвлэх боломжтой.

Мэргэшсэн салбарууд: банк санхүү, засгийн газар, технологи, үүрэн холбоо (сим, е-сим), уул уурхай, худалдаа үйлчилгээ (гишүүнчлэл, хөнгөлөлтийн карт).

Холбоо барих: утас ${company.phone}, имэйл ${company.email}, вэб ${company.site}. Сайт дээр "Холбоо барих" маягт бас бий.

Дүрэм:
- Хэрэглэгчийн бичсэн хэлээр (ихэвчлэн монголоор) товч, найрсаг хариулна. 2-5 өгүүлбэр хангалттай.
- Үнэ, хугацаа, гэрээ зэрэг дээрх мэдээлэлд байхгүй зүйлийг зохиож хэлэхгүй — борлуулалтын багтай холбогдохыг санал болгоно.
- Компанитай холбоогүй асуултад товч хариулаад, Smartcard-ийн үйлчилгээ рүү эелдгээр чиглүүлнэ.`;

const MAX_TURNS = 20;
const MAX_CHARS = 2000;

// Энгийн IP тутмын хязгаар (serverless instance тус бүрт тусдаа)
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 10;
}

type Msg = { role: "user" | "assistant"; content: string };

function parse(body: unknown): Msg[] | null {
  const list = (body as { messages?: unknown })?.messages;
  if (!Array.isArray(list) || list.length === 0) return null;
  const out: Msg[] = [];
  for (const m of list.slice(-MAX_TURNS)) {
    const role = (m as { role?: unknown })?.role;
    const content = (m as { content?: unknown })?.content;
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") return null;
    const text = content.trim().slice(0, MAX_CHARS);
    if (text) out.push({ role, content: text });
  }
  while (out[0]?.role === "assistant") out.shift();
  return out.length && out[out.length - 1].role === "user" ? out : null;
}

// Gemini "assistant"-ийн оронд "model" гэсэн role ашигладаг
const toGemini = (msgs: Msg[]): Content[] =>
  msgs.map((m) => ({ role: m.role === "assistant" ? "model" : "user", parts: [{ text: m.content }] }));

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return new Response("Чатбот одоогоор тохируулагдаагүй байна.", { status: 503 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "local";
  if (limited(ip)) {
    return new Response("Хэт олон хүсэлт илгээлээ. Түр хүлээгээд дахин оролдоно уу.", { status: 429 });
  }

  const messages = parse(await req.json().catch(() => null));
  if (!messages) return new Response("Буруу хүсэлт.", { status: 400 });

  const ai = new GoogleGenAI({ apiKey });
  const abort = new AbortController();
  const encoder = new TextEncoder();

  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        const stream = await ai.models.generateContentStream({
          model: MODEL,
          contents: toGemini(messages),
          config: {
            systemInstruction: SYSTEM,
            maxOutputTokens: 1024,
            thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
            abortSignal: abort.signal,
          },
        });
        for await (const chunk of stream) {
          if (chunk.text) controller.enqueue(encoder.encode(chunk.text));
        }
      } catch (err) {
        if (abort.signal.aborted) return;
        console.error("Chat алдаа:", err);
        const msg =
          err instanceof ApiError && err.status === 429
            ? "Үнэгүй хязгаар түр хэтэрлээ. Хэсэг хүлээгээд дахин оролдоно уу."
            : "Алдаа гарлаа. Дахин оролдоно уу.";
        controller.enqueue(encoder.encode(msg));
      } finally {
        try {
          controller.close();
        } catch {}
      }
    },
    cancel() {
      abort.abort();
    },
  });

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
  });
}
