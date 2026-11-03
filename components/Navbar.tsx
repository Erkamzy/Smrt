"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";

const links = [
  { href: "/", label: "Нүүр" },
  { href: "/news", label: "Мэдээ" },
  { href: "/about", label: "Бидний тухай" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Хуудас солигдоход утасны цэсийг хаана
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      style={{ "--delay": pathname === "/" ? "2s" : "0s" } as React.CSSProperties}
      className={`animate-slide-down fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "bg-[#1a0b3d]/80 shadow-lg shadow-purple-950/40 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link href="/" className="rounded-xl bg-white px-3 py-1.5 shadow-md">
          <Image
            src="/image002.png"
            alt="Smartcard"
            width={620}
            height={200}
            className="h-8 w-auto"
          />
        </Link>

        <div className="flex items-center gap-4">
          {/* Компьютер дээрх цэс */}
          <ul className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`group relative text-sm font-medium transition hover:text-white ${
                    isActive(link.href) ? "text-white" : "text-purple-200"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-[#9440C4] transition-all duration-300 group-hover:w-full ${
                      isActive(link.href) ? "w-full" : "w-0"
                    }`}
                  />
                </Link>
              </li>
            ))}
          </ul>

          {/* Харанхуй / цайвар горим */}
          <ThemeToggle />

          {/* Утасны цэсний товч */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Цэс нээх"
            aria-expanded={open}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span className={`h-0.5 w-6 bg-white transition duration-300 ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`h-0.5 w-6 bg-white transition duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-6 bg-white transition duration-300 ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Утасны цэс */}
      {open && (
        <ul className="flex flex-col gap-1 px-6 pb-4 md:hidden">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`block rounded-lg px-3 py-3 transition hover:bg-white/10 hover:text-white ${
                  isActive(link.href) ? "bg-white/10 text-white" : "text-purple-100"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}