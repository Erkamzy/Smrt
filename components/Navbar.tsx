"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const links = [
  { href: "/#solutions", label: "Шийдэл" },
  { href: "/#industries", label: "Салбар" },
  { href: "/#partners", label: "Хамтрагчид" },
  { href: "/news", label: "Мэдээ" },
  { href: "/about", label: "Бидний тухай" },
];

export default function Navbar() {
  const pathname = usePathname();
  // Цэсийг аль хуудсан дээр нээснийг санана: хуудас солигдоход автоматаар хаагдана
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (v: boolean) => setOpenOn(v ? pathname : null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Утасны цэс нээлттэй үед ард гүйлгэхгүй
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // "#"-тэй линк идэвхтэй гэж тодрохгүй
  const isActive = (href: string) => {
    if (href.includes("#")) return false;
    return pathname.startsWith(href);
  };

  // "/#contact" гэх мэт хэсэг рүү шилжих линк
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname !== "/") return; // Өөр хуудсанд байвал Next.js нүүр рүү аваачна, HashScroll гүйлгэнэ

    const i = href.indexOf("#");
    if (i !== -1) {
      e.preventDefault();
      document.getElementById(href.slice(i + 1))?.scrollIntoView({ behavior: "smooth", block: "start" });
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
      className="animate-slide-down fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
    >
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full border py-2 pl-4 pr-2 transition-all duration-500 ${
          scrolled || open ? "sc-nav-glass" : "border-transparent"
        }`}
      >
        <Link href="/" onClick={(e) => handleClick(e, "/")} aria-label="Smartcard — нүүр" className="sc-logo-pill flex h-10 shrink-0 items-center">
          {/* Харанхуй горимд цагаан лого руу солигдоно (globals.css: .sc-logo-*) */}
          <Image src="/logo/smartcard-color.png" alt="Smartcard" width={640} height={139} priority className="sc-logo-light h-8 w-auto" />
          <Image src="/logo/smartcard-white.png" alt="" aria-hidden width={640} height={92} priority className="sc-logo-dark h-[22px] w-auto" />
        </Link>

        {/* Компьютер дээрх цэс */}
        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition hover:bg-[var(--surface-2)] hover:text-[var(--fg)] ${
                  isActive(link.href) ? "u-fg bg-[var(--surface-2)]" : "u-soft"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <Link
            href="/#contact"
            onClick={(e) => handleClick(e, "/#contact")}
            className="sc-btn sc-btn-primary hidden !px-5 !py-2.5 text-sm sm:inline-flex"
          >
            Холбогдох <ArrowUpRight className="h-4 w-4" />
          </Link>

          {/* Утасны цэсний товч */}
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? "Цэс хаах" : "Цэс нээх"}
            aria-expanded={open}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full lg:hidden"
          >
            <span className={`h-0.5 w-5 bg-[var(--fg)] transition duration-300 ${open ? "translate-y-1 rotate-45" : ""}`} />
            <span className={`h-0.5 w-5 bg-[var(--fg)] transition duration-300 ${open ? "-translate-y-1 -rotate-45" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Утасны цэс */}
      {open && (
        <div className="sc-nav-glass animate-fade-up mx-auto mt-2 max-w-6xl rounded-3xl p-3 lg:hidden" style={{ "--delay": "0s" } as React.CSSProperties}>
          <ul className="flex flex-col">
            {[{ href: "/", label: "Нүүр" }, ...links, { href: "/#contact", label: "Холбоо барих" }].map((link, i) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className="font-display flex items-center justify-between rounded-2xl px-4 py-3.5 text-xl transition hover:bg-[var(--surface-2)]"
                >
                  {link.label}
                  <span className="u-mute font-mono text-xs">{String(i + 1).padStart(2, "0")}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
