import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import LatestNews from "@/components/LatestNews";

const delay = (s: number) => ({ "--delay": `${s}s` } as React.CSSProperties);

export default function Home() {
  return (
    <>
      {/* Эхлэх animation (splash) */}
      <div className="splash fixed inset-0 z-[100] flex flex-col items-center justify-center gap-8 bg-gradient-to-br from-[#1a0b3d] via-[#2E1A66] to-[#1a0b3d]">
        <div className="animate-logo-pop rounded-3xl bg-white p-6 shadow-2xl shadow-purple-950/60">
          <Image
            src="/image002.png"
            alt="Smartcard"
            width={620}
            height={200}
            priority
            className="h-auto w-64 sm:w-80"
          />
        </div>
        <div className="h-1 w-48 overflow-hidden rounded-full bg-white/10">
          <div className="animate-load-bar h-full rounded-full bg-[#9440C4]" />
        </div>
      </div>

      <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#1a0b3d] via-[#2E1A66] to-[#1a0b3d] px-6 pb-16 pt-28 text-white">
        {/* Дэвсгэрийн хөвөгч бөмбөлөг */}
        <div className="animate-float pointer-events-none absolute -left-20 top-20 h-72 w-72 rounded-full bg-[#7B2FA8]/30 blur-3xl" />
        <div
          style={{ animationDelay: "-4s" }}
          className="animate-float pointer-events-none absolute -right-20 top-1/2 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl"
        />

        {/* Толгой хэсэг */}
        <section className="relative mx-auto flex max-w-5xl flex-col items-center gap-8 text-center">
          <h1 className="text-gradient text-4xl font-extrabold tracking-tight sm:text-6xl">
            Мэдээллийн сайт загвар
          </h1>
          <div
            style={delay(2.3)}
            className="animate-fade-up rounded-3xl bg-white p-6 shadow-2xl shadow-purple-950/60 ring-4 ring-[#7B2FA8]/40 sm:p-10"
          >
            <Image
              src="/image002.png"
              alt="Smartcard - Digital Identity and Security"
              width={620}
              height={200}
              priority
              className="h-auto w-full max-w-md"
            />
          </div>

          <a
            href="https://smrt.mn"
            target="_blank"
            rel="noopener noreferrer"
            style={delay(2.5)}
            className="animate-fade-up rounded-full bg-[#7B2FA8] px-8 py-3 text-lg font-semibold shadow-lg shadow-purple-950/50 transition duration-200 hover:scale-105 hover:bg-[#9440C4] active:scale-95"
          >
            SmartCard
          </a>
        </section>

        {/* Сүүлийн мэдээ (эхний 3) */}
        {/* Сүүлийн мэдээ (эхний 3) */}
<section className="relative mx-auto mt-20 max-w-6xl">
  <div className="mb-8 flex items-end justify-between border-b border-white/10 pb-4">
    <h2 className="text-3xl font-bold">Сүүлийн мэдээ</h2>
    <Link href="/news" className="text-sm text-purple-300 hover:text-purple-200">
      Бүгдийг харах →
    </Link>
  </div>

  <Suspense
    fallback={<p className="text-purple-200/70">Мэдээ ачаалж байна...</p>}
  >
    <LatestNews />
  </Suspense>
</section>
      </main>
    </>
  );
}