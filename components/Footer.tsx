"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { company, solutions } from "@/lib/content";

const companyLinks = [
  { href: "/about", label: "Бидний тухай" },
  { href: "/news", label: "Мэдээ" },
  { href: "/partners", label: "Хамтрагчид" },
  { href: "/industry", label: "Салбарууд" },
];

export default function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="relative mt-10 overflow-hidden border-t border-[var(--line)]">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 pb-10 pt-20 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-display text-2xl font-semibold leading-tight">
            Дижитал итгэлцлийг<br />
            <span className="text-gradient">{company.founded} оноос</span> бүтээж байна.
          </p>
          <div className="mt-8 flex flex-col gap-3 text-sm">
            <a href={company.phoneHref} className="u-soft inline-flex items-center gap-2 transition hover:text-[var(--fg)]">
              <Phone className="h-4 w-4" /> {company.phone}
            </a>
            <a href={`mailto:${company.email}`} className="u-soft inline-flex items-center gap-2 transition hover:text-[var(--fg)]">
              <Mail className="h-4 w-4" /> {company.email}
            </a>
          </div>
        </div>

        <div className="md:col-span-4">
          <p className="sc-eyebrow">Шийдэл</p>
          <ul className="mt-5 space-y-3 text-sm">
            {solutions.map((s) => (
              <li key={s.href}>
                <Link href={s.href} className="u-soft group inline-flex items-center gap-1 transition hover:text-[var(--fg)]">
                  {s.title}
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <p className="sc-eyebrow">Компани</p>
          <ul className="mt-5 space-y-3 text-sm">
            {companyLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="u-soft group inline-flex items-center gap-1 transition hover:text-[var(--fg)]">
                  {l.label}
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Том үсгэн лого */}
      <div className="pointer-events-none select-none px-4" aria-hidden="true">
        <p
          className="font-display mx-auto max-w-7xl overflow-hidden whitespace-nowrap text-center text-[min(10.5vw,8.5rem)] font-bold leading-[0.85] tracking-tighter"
          style={{
            background: "linear-gradient(180deg, color-mix(in srgb, var(--fg) 16%, transparent), transparent 85%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          SMARTCARD
        </p>
      </div>

      <div className="border-t border-[var(--line)]">
        <div className="u-mute mx-auto flex max-w-6xl flex-col gap-2 px-6 py-6 font-mono text-xs sm:flex-row sm:items-center sm:justify-between">
          <span>© {year ?? ""} {company.name}. Бүх эрх хуулиар хамгаалагдсан.</span>
          <span>Digital Identity and Security</span>
        </div>
      </div>
    </footer>
  );
}
