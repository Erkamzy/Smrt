"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string };

const GREETING: Msg = {
  role: "assistant",
  content: "Сайн байна уу! Би Smartcard-ийн AI туслах. Манай шийдэл, бүтээгдэхүүний талаар асуугаарай.",
};

const SUGGESTIONS = ["Ямар шийдлүүд байдаг вэ?", "Карт хэвлэх төхөөрөмж", "Холбоо барих"];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [msgs]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  async function send(text: string) {
    const q = text.trim();
    if (!q || busy) return;
    setInput("");
    setBusy(true);

    const history = [...msgs, { role: "user" as const, content: q }];
    setMsgs([...history, { role: "assistant", content: "" }]);

    const append = (chunk: string) =>
      setMsgs((m) => {
        const copy = [...m];
        const last = copy[copy.length - 1];
        copy[copy.length - 1] = { ...last, content: last.content + chunk };
        return copy;
      });

    try {
      // Мэндчилгээг API руу илгээхгүй
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history.slice(1) }),
      });
      if (!res.ok || !res.body) {
        append((await res.text()) || "Алдаа гарлаа. Дахин оролдоно уу.");
        return;
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        append(decoder.decode(value, { stream: true }));
      }
    } catch {
      append("Сүлжээний алдаа гарлаа. Дахин оролдоно уу.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Чатыг хаах" : "AI туслахтай чатлах"}
        aria-expanded={open}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center sc-fab rounded-full text-white transition hover:scale-105 active:scale-95"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Smartcard AI туслах"
          className="fixed bottom-24 right-4 z-50 flex h-[min(560px,calc(100dvh-8rem))] w-[calc(100vw-2rem)] max-w-sm flex-col sc-nav-glass overflow-hidden rounded-3xl text-[var(--fg)] sm:right-6"
        >
          <div className="flex items-center gap-3 bg-gradient-to-r from-[#a855f7]/90 to-[#7b2fa8]/90 px-4 py-3 text-white">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
              <MessageCircle className="h-5 w-5" />
            </span>
            <div className="leading-tight">
              <div className="font-semibold">Smartcard AI туслах</div>
              <div className="text-xs text-white/75">Ихэвчлэн хэдхэн секундэд хариулна</div>
            </div>
          </div>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto p-4" aria-live="polite">
            {msgs.map((m, i) => (
              <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                <div
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "rounded-br-sm bg-gradient-to-b from-[#a855f7] to-[#7b2fa8] text-white shadow-md"
                      : "rounded-bl-sm border border-[var(--glass-border)] bg-[var(--glass-bg)]"
                  }`}
                >
                  {m.content || <span className="u-soft animate-pulse">Бичиж байна…</span>}
                </div>
              </div>
            ))}
            {msgs.length === 1 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="sc-chip !px-3 !py-1.5 text-xs transition hover:!border-[var(--accent)]"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-end gap-2 border-t border-[var(--glass-border)] p-3"
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
              rows={1}
              maxLength={2000}
              placeholder="Асуултаа бичнэ үү…"
              aria-label="Мессеж"
              className="sc-input max-h-28 flex-1 resize-none !rounded-2xl !py-2 text-sm"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              aria-label="Илгээх"
              className="sc-fab flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white transition hover:scale-105 disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
