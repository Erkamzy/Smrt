"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="border-t border-white/10 bg-[#12072b] px-6 py-10 text-purple-200/80">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm sm:flex-row">
        <p>© {year ?? ""} Smartcard. Бүх эрх хуулиар хамгаалагдсан.</p>
        <div className="flex gap-6">
          <Link href="/" className="hover:text-white">Нүүр</Link>
          <Link href="/news" className="hover:text-white">Мэдээ</Link>
          <Link href="/about" className="hover:text-white">Бидний тухай</Link>
        </div>
      </div>
    </footer>
  );
}