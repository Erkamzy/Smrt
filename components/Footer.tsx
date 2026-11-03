"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { company } from "@/lib/content";

export default function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="border-t border-white/10 bg-[#12072b] px-6 py-10 text-purple-200/80">
      <div className="mx-auto grid max-w-6xl gap-8 text-sm md:grid-cols-3">
        <div>
          <p className="font-semibold text-white">{company.name}</p>
          <p className="mt-2">Digital Identity and Security</p>
        </div>

        <div className="flex flex-col gap-2">
          <Link href="/" className="hover:text-white">Нүүр</Link>
          <Link href="/news" className="hover:text-white">Мэдээ</Link>
          <Link href="/about" className="hover:text-white">Бидний тухай</Link>
        </div>

        <div className="flex flex-col gap-2">
          <a href={company.phoneHref} className="hover:text-white">{company.phone}</a>
          <a href={`mailto:${company.email}`} className="hover:text-white">{company.email}</a>
        </div>
      </div>

      <p className="mx-auto mt-8 max-w-6xl border-t border-white/10 pt-6 text-center text-xs">
        © {year ?? ""} {company.name}. Бүх эрх хуулиар хамгаалагдсан.
      </p>
    </footer>
  );
}