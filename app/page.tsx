import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import Counter from "@/components/Counter";
import LatestNews from "@/components/LatestNews";
import Reveal from "@/components/Reveal";
import { company, industries, partners, solutions } from "@/lib/content";

const delay = (s: number) => ({ "--delay": `${s}s` } as React.CSSProperties);

const stats = [
  { text: String(company.founded), label: "Байгуулагдсан он" },
  { to: 25, suffix: "+", label: "Жилийн туршлага" },
  { to: 6, label: "Мэргэшсэн салбар" },
  { to: 3, label: "Шийдлийн чиглэл" },
] as { text?: string; to?: number; suffix?: string; label: string }[];

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

      <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#1a0b3d] via-[#2E1A66] to-[#1a0b3d] px-6 pb-20 pt-32 text-white">
        {/* Дэвсгэрийн хөвөгч бөмбөлөг */}
        <div className="animate-float pointer-events-none absolute -left-20 top-20 h-72 w-72 rounded-full bg-[#7B2FA8]/30 blur-3xl" />
        <div
          style={{ animationDelay: "-4s" }}
          className="animate-float pointer-events-none absolute -right-20 top-1/3 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl"
        />

        {/* ===== Hero ===== */}
        <section className="relative mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
          <span
            style={delay(2.1)}
            className="animate-fade-up rounded-full bg-white/10 px-4 py-1.5 text-sm text-purple-100/80 ring-1 ring-white/10"
          >
            {company.founded} оноос · Digital Identity and Security
          </span>

          <div style={delay(2.2)} className="animate-fade-up">
            <h1 className="text-gradient text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
              Өсөлтийг хурдасгах дижитал шийдэл
            </h1>
          </div>

          <p
            style={delay(2.35)}
            className="animate-fade-up max-w-2xl text-lg text-purple-100/80"
          >
            Дэлхийд итгэгдсэн шийдэл, инновац, хамтын ажиллагааг хослуулан
            мэдээллийн технологийн салбарын хөгжлийг манлайлна.
          </p>

          <div style={delay(2.5)} className="animate-fade-up mt-2 flex flex-wrap justify-center gap-4">
            <a
              href="#solutions"
              className="rounded-full bg-[#7B2FA8] px-8 py-3 text-lg font-semibold text-white shadow-lg shadow-purple-950/50 transition duration-200 hover:scale-105 hover:bg-[#9440C4] active:scale-95"
            >
              Манай шийдэл
            </a>
            <a
              href="#contact"
              className="rounded-full bg-white/10 px-8 py-3 text-lg font-semibold ring-1 ring-white/10 transition duration-200 hover:bg-white/20"
            >
              Холбоо барих
            </a>
          </div>
        </section>

        {/* ===== Тоон үзүүлэлт ===== */}
        <section className="relative mx-auto mt-20 grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1}>
              <div className="rounded-2xl bg-white/10 p-6 text-center ring-1 ring-white/10 backdrop-blur">
                <div className="text-3xl font-extrabold text-purple-300 sm:text-4xl">
                  {s.to !== undefined ? (
                    <Counter to={s.to} suffix={s.suffix} />
                  ) : (
                    s.text
                  )}
                </div>
                <div className="mt-2 text-sm text-purple-100/80">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </section>

        {/* ===== Шийдэл ===== */}
        <section id="solutions" className="relative mx-auto mt-24 max-w-6xl">
          <h2 className="text-3xl font-bold">Манай шийдэл</h2>
          <p className="mt-2 max-w-2xl text-purple-100/80">
            Бид танай байгууллагыг биет болон дижитал ертөнцөд бүрэн аюулгүй
            ажиллаж, цахим шилжилтийн боломжийг өсөлт болгон хувиргахад
            туслах шийдлүүдийг санал болгож байна.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {solutions.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.15} className="h-full">
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col rounded-2xl bg-white/10 p-6 ring-1 ring-white/10 backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white/15 hover:shadow-2xl hover:shadow-purple-900/50"
                >
                  <div className="text-4xl">{s.icon}</div>
                  <h3 className="mt-4 text-xl font-bold">{s.title}</h3>
                  <p className="mt-2 text-sm text-purple-100/80">{s.text}</p>

                  {s.items.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {s.items.map((item) => (
                        <span
                          key={item}
                          className="rounded-full bg-white/10 px-3 py-1 text-xs text-purple-100/80"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  )}

                  <span className="mt-auto pt-5 text-sm font-semibold text-purple-300 transition group-hover:text-purple-200">
                    Дэлгэрэнгүй ↗
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ===== Онцлох бүтээгдэхүүн ===== */}
        <section className="relative mx-auto mt-24 max-w-6xl">
          <Reveal>
            <div className="grid items-center gap-10 rounded-3xl bg-white/10 p-8 ring-1 ring-white/10 backdrop-blur md:grid-cols-2 md:p-12">
              <div>
                <span className="rounded-full bg-[#7B2FA8] px-3 py-1 text-xs font-semibold">
                  ОНЦЛОХ БҮТЭЭГДЭХҮҮН
                </span>
                <h2 className="mt-4 text-3xl font-bold">Entrust Sigma DS4</h2>
                <p className="mt-3 text-purple-100/80">
                  Санхүүгийн байгууллага хэрэглэгчиддээ илүү хурдан шуурхай,
                  өндөр чанартай, тусгайлсан картыг ердөө хоёрхон минутанд
                  хэвлэх боломжтой боллоо.
                </p>
                <ul className="mt-5 space-y-2 text-sm text-purple-100/80">
                  <li>✓ Өнгөт картыг ердөө 78 секундэд хэвлэнэ</li>
                  <li>✓ Төлбөр тооцооны картын бүх стандарт хангасан, өндөр нууцлалтай</li>
                  <li>✓ VISA, Mastercard, UnionPay, ₮ картуудыг хэвлэх боломжтой</li>
                </ul>
                <a
                  href="https://smrt.mn/homepage/solution/payment/issuance/instant-issuance/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-block text-sm font-semibold text-purple-300 transition hover:text-purple-200"
                >
                  Дэлгэрэнгүй ↗
                </a>
              </div>

              {/* Картын дүрс */}
              <div className="flex justify-center">
                <div className="aspect-[1.6] w-full max-w-sm rotate-3 rounded-2xl bg-gradient-to-br from-[#9440C4] via-[#7B2FA8] to-[#2E1A66] p-6 shadow-2xl shadow-purple-950/60 ring-1 ring-white/20 transition duration-500 hover:rotate-0">
                  <div className="flex h-full flex-col justify-between text-white">
                    <div className="flex items-start justify-between">
                      <div className="h-9 w-12 rounded-md bg-gradient-to-br from-yellow-200 to-yellow-500" />
                      <span className="text-sm font-semibold tracking-widest opacity-80">
                        SMARTCARD
                      </span>
                    </div>
                    <div>
                      <div className="text-xl tracking-[0.25em] opacity-90">
                        •••• •••• •••• ••••
                      </div>
                      <div className="mt-2 text-xs opacity-70">
                        Digital Identity and Security
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ===== Салбар ===== */}
        <section id="industries" className="relative mx-auto mt-24 max-w-6xl">
          <h2 className="text-3xl font-bold">Мэргэшсэн салбарууд</h2>
          <p className="mt-2 max-w-2xl text-purple-100/80">
            Банк санхүү, төрийн үйлчилгээ, мэдээллийн технологи, харилцаа
            холбооны салбарт төлбөрийн карт, биет болон цахим бичиг баримт,
            бүртгэл-баталгаажуулалт, аюулгүй байдлын шийдлийн цогцыг санал
            болгодог.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((x, i) => (
              <Reveal key={x.title} delay={(i % 3) * 0.1}>
                <div className="h-full rounded-2xl bg-white/10 p-6 ring-1 ring-white/10 backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white/15">
                  <div className="text-3xl">{x.icon}</div>
                  <h3 className="mt-3 text-lg font-bold">{x.title}</h3>
                  <p className="mt-1 text-sm text-purple-100/80">{x.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ===== Бидний тухай + Хамтрагчид ===== */}
        <section className="relative mx-auto mt-24 grid max-w-6xl gap-10 md:grid-cols-2">
          <Reveal>
            <h2 className="text-3xl font-bold">Бидний тухай</h2>
            <p className="mt-4 leading-relaxed text-purple-100/80">
              {company.name} нь {company.founded} онд үүсгэн байгуулагдсан
              бөгөөд төлбөр тооцооны шийдэл, өгөгдөл хамгааллын систем болон
              хувь хүний мэдээллийн бүртгэлийн цахим системийг Монголын зах
              зээлд анхлан нэвтрүүлсэн.
            </p>
            <p className="mt-3 leading-relaxed text-purple-100/80">
              Бид 25 жилийн турш засгийн газар, харилцаа холбоо болон банк
              санхүүгийн салбарт аюулгүй байдлын шийдэл, төлбөр тооцооны
              бүтээгдэхүүнийг нийлүүлж, Монгол Улсад мэдээллийн технологийн
              салбарыг хөгжүүлэхэд хувь нэмэр оруулж байна.
            </p>
            <Link
              href="/about"
              className="mt-5 inline-block text-sm font-semibold text-purple-300 transition hover:text-purple-200"
            >
              Дэлгэрэнгүй →
            </Link>
          </Reveal>

          <Reveal delay={0.15}>
            <h2 className="text-3xl font-bold">Бизнесийн хамтрагчид</h2>
            <p className="mt-4 leading-relaxed text-purple-100/80">
              Бид дэлхийн цахим аюулгүй байдал, нууцлалын технологийн
              тэргүүлэгч компаниудын Монгол Улс дахь албан ёсны төлөөлөгчөөр
              сүүлийн 20 гаруй жил хамтран ажиллаж байна.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-4">
              {partners.map((p) => (
                <a
                  key={p.name}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-24 items-center justify-center rounded-2xl bg-white/10 text-2xl font-extrabold tracking-wide ring-1 ring-white/10 transition duration-300 hover:-translate-y-1 hover:bg-white/15"
                >
                  {p.name}
                </a>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ===== Мэдээ ===== */}
        <section className="relative mx-auto mt-24 max-w-6xl">
          <div className="mb-8 flex items-end justify-between border-b border-white/10 pb-4">
            <h2 className="text-3xl font-bold">Технологийн мэдээ</h2>
            <Link href="/news" className="text-sm text-purple-300 hover:text-purple-200">
              Бүгдийг харах →
            </Link>
          </div>
          <Suspense fallback={<p className="text-purple-200/70">Мэдээ ачаалж байна...</p>}>
            <LatestNews />
          </Suspense>
        </section>

        {/* ===== Холбоо барих ===== */}
        <section
          id="contact"
          className="relative mx-auto mt-24 max-w-4xl rounded-3xl bg-[#7B2FA8]/30 p-10 text-center ring-1 ring-white/10"
        >
          <h2 className="text-3xl font-bold">Холбоо барих</h2>
          <p className="mt-3 text-purple-100/80">
            Асуулт, санал хүсэлтээ бидэнд илгээгээрэй.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <a
              href={company.phoneHref}
              className="rounded-full bg-[#7B2FA8] px-8 py-3 font-semibold text-white shadow-lg shadow-purple-950/50 transition hover:scale-105 hover:bg-[#9440C4]"
            >
              📞 {company.phone}
            </a>
            <a
              href={`mailto:${company.email}`}
              className="rounded-full bg-white/10 px-8 py-3 font-semibold ring-1 ring-white/10 transition hover:bg-white/20"
            >
              ✉️ {company.email}
            </a>
          </div>
        </section>
      </main>
    </>
  );
}