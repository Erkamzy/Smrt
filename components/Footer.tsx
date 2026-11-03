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
    <footer className="u-soft border-t border-[var(--line)] bg-[var(--bg-alt)] px-6 py-12">
      <div className="mx-auto grid max-w-6xl gap-8 text-sm md:grid-cols-3">
        <div>
          <p className="u-fg text-base font-bold">{company.name}</p>
          <p className="mt-2">Digital Identity and Security</p>
        </div>

        <div className="flex flex-col gap-2">
          <Link href="/" className="transition hover:text-[var(--fg)]">Нүүр</Link>
          <Link href="/news" className="transition hover:text-[var(--fg)]">Мэдээ</Link>
          <Link href="/about" className="transition hover:text-[var(--fg)]">Бидний тухай</Link>
        </div>

        <div className="flex flex-col gap-2">
          <a href={company.phoneHref} className="transition hover:text-[var(--fg)]">{company.phone}</a>
          <a href={`mailto:${company.email}`} className="transition hover:text-[var(--fg)]">{company.email}</a>
        </div>
      </div>

      <p className="mx-auto mt-10 max-w-6xl border-t border-[var(--line)] pt-6 text-center text-xs">
        © {year ?? ""} {company.name}. Бүх эрх хуулиар хамгаалагдсан.
      </p>
    </footer>
  );
}