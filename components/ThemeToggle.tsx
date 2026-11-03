"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light" | null>(null);

useEffect(() => {
  let saved: string | null = null;
  try {
    saved = localStorage.getItem("theme");
  } catch {}
  if (saved === "light") document.documentElement.classList.add("light");
  setTheme(saved === "light" ? "light" : "dark");
}, []);

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    document.documentElement.classList.toggle("light", next === "light");
    try {
      localStorage.setItem("theme", next);
    } catch {}
    setTheme(next);
  };

  return (
    <button
      onClick={toggle}
      aria-label={theme === "light" ? "Харанхуй горим" : "Цайвар горим"}
      className="flex h-10 w-10 items-center justify-center rounded-full text-white transition hover:bg-white/10"
    >
      {theme === "light" ? (
        // сар
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      ) : theme === "dark" ? (
        // нар
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : null}
    </button>
  );
}