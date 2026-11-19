"use client";

import { usePathname } from "next/navigation";
import { useState, useSyncExternalStore } from "react";
import { ArrowUpRight, MonitorPlay, X } from "lucide-react";
import { ledSite } from "@/lib/content";

const KEY = "led-promo-hidden";

// Хаасан эсэхийг sessionStorage-оос уншина (сервер дээр үргэлж харагдана)
const subscribe = (cb: () => void) => {
  window.addEventListener(KEY, cb);
  return () => window.removeEventListener(KEY, cb);
};
const storedHidden = () => {
  try {
    return sessionStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
};

// Бүх хуудсанд зүүн доод буланд гэрэлтэх LED үнийн сайтын товч
export default function LedPromo() {
  const pathname = usePathname();
  const stored = useSyncExternalStore(subscribe, storedHidden, () => false);
  const [closed, setClosed] = useState(false);

  if (stored || closed || pathname.startsWith("/admin")) return null;

  const close = () => {
    setClosed(true);
    try {
      sessionStorage.setItem(KEY, "1");
      window.dispatchEvent(new Event(KEY));
    } catch {}
  };

  return (
    <div className="animate-fade-up fixed bottom-6 left-4 z-40 sm:left-6" style={{ "--delay": "1.2s" } as React.CSSProperties}>
      <div className="sc-promo group relative rounded-full p-[2px]">
        <a
          href={ledSite.href}
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex items-center gap-3 rounded-full bg-[var(--bg)] py-2 pl-2 pr-10 text-[var(--fg)] transition hover:bg-[var(--surface-2)]"
        >
          <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--accent-strong)] to-[var(--accent-2)] text-white">
            <MonitorPlay className="h-5 w-5" strokeWidth={1.8} />
            <span className="sc-pulse absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-[var(--bg)] bg-[#34d399]" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-semibold">
              LED <span className="hidden sm:inline">дэлгэцийн </span>үнэ судлах
            </span>
            <span className="u-soft hidden text-xs sm:block">Бүтээгдэхүүн, үнийн санал авах</span>
          </span>
          <ArrowUpRight className="u-accent h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
        <button
          onClick={close}
          aria-label="Хаах"
          className="u-mute absolute right-2.5 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full transition hover:bg-[var(--surface-2)] hover:text-[var(--fg)]"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
