"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";

const links = [
  { href: "/", label: "Нүүр" },
  { href: "/#solutions", label: "Шийдэл" },
  { href: "/#industries", label: "Салбар" },
  { href: "/news", label: "Мэдээ" },
  { href: "/about", label: "Бидний тухай" },
  { href: "/#contact", label: "Холбоо барих" },
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

  // "#"-тэй линк идэвхтэй гэж тодрохгүй
  const isActive = (href: string) => {
    if (href.includes("#")) return false;
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  };

  // "/#contact" гэх мэт хэсэг рүү шилжих линк
  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (pathname !== "/") return; // Өөр хуудсанд байвал Next.js нүүр рүү аваачна, HashScroll гүйлгэнэ

    const i = href.indexOf("#");

    if (i !== -1) {
      e.preventDefault();
      const id = href.slice(i + 1);
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
      history.pushState(null, "", href);
      setOpen(false);
    } else if (href === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      history.pushState(null, "", "/");
      setOpen(false);
    }
  };

  return (
    <header
      style={{ "--delay": "0s" } as React.CSSProperties}
      className={`animate-slide-down fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? "sc-nav-solid" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link
          href="/"
          onClick={(e) => handleClick(e, "/")}
          className="sc-logo-pill flex h-11 items-center rounded-xl bg-white px-3 shadow-sm ring-1 ring-black/5"
        >
          {/* Харанхуй горимд цагаан лого руу солигдоно (globals.css: .sc-logo-*) */}
          <Image src="/logo/smartcard-color.png" alt="Smartcard" width={640} height={139} priority className="sc-logo-light h-8 w-auto" />
          {/* Цагаан лого tagline-гүй тул "Smartcard" үсгийн хэмжээ ижил байхаар намхан */}
          <Image src="/logo/smartcard-white.png" alt="" aria-hidden width={640} height={92} priority className="sc-logo-dark h-[21px] w-auto" />
        </Link>

        <div className="flex items-center gap-3">
          {/* Компьютер дээрх цэс */}
          <ul className="hidden items-center gap-6 lg:flex">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className={`group relative text-sm font-medium transition hover:text-[var(--fg)] ${
                    isActive(link.href) ? "u-fg" : "u-soft"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-[var(--accent)] transition-all duration-300 group-hover:w-full ${
                      isActive(link.href) ? "w-full" : "w-0"
                    }`}
                  />
                </Link>
              </li>
            ))}
          </ul>

          <ThemeToggle />

          {/* Утасны цэсний товч */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Цэс нээх"
            aria-expanded={open}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          >
            <span className={`h-0.5 w-6 bg-[var(--fg)] transition duration-300 ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`h-0.5 w-6 bg-[var(--fg)] transition duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-6 bg-[var(--fg)] transition duration-300 ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Утасны цэс */}
      {open && (
        <ul className="flex flex-col gap-1 px-6 pb-4 lg:hidden">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className={`block rounded-lg px-3 py-3 transition hover:bg-[var(--surface-2)] ${
                  isActive(link.href) ? "u-fg bg-[var(--surface-2)]" : "u-soft"
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