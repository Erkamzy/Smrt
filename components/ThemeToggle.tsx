"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem("theme", next);
    } catch {}
    setTheme(next);
  };

  return (
    <button
      onClick={toggle}
      aria-label={theme === "dark" ? "Цайвар горим" : "Харанхуй горим"}
      className="u-fg flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-[var(--surface-2)]"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5" />
      ) : theme === "light" ? (
        <Moon className="h-5 w-5" />
      ) : null}
    </button>
  );
}