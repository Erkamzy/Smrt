import Image from "next/image";
import { Handshake, Mail, Phone, ShieldCheck, Zap, type LucideIcon } from "lucide-react";
import Counter from "@/components/Counter";
import Reveal from "@/components/Reveal";
import { company } from "@/lib/content";

export const metadata = { title: "Бидний тухай | Смарткарт" };

const stats = [
  { text: String(company.founded), label: "Байгуулагдсан он" },
  { to: 25, suffix: "+", label: "Жилийн туршлага" },
  { to: 6, label: "Мэргэшсэн салбар" },
] as { text?: string; to?: number; suffix?: string; label: string }[];

const values: { Icon: LucideIcon; title: string; text: string }[] = [
  { Icon: ShieldCheck, title: "Аюулгүй байдал", text: "Хэрэглэгчийн мэдээллийг хамгийн өндөр түвшинд хамгаална." },
  { Icon: Zap, title: "Шуурхай байдал", text: "Хурдан, найдвартай, саадгүй үйлчилгээ үзүүлнэ." },
  { Icon: Handshake, title: "Итгэлцэл", text: "Хамтрагч бүртэй урт хугацааны харилцаа бүтээнэ." },
];

const dl = (s: number) => ({ "--delay": `${s}s` } as React.CSSProperties);

export default function AboutPage() {
  return (
    <main className="u-bg u-fg min-h-screen px-6 pb-24 pt-32">
      {/* Танилцуулга */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="sc-eyebrow animate-fade-up">Бидний тухай</p>
          <h1
            style={dl(0.05)}
            className="animate-fade-up mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl"
          >
            {company.founded} оноос Монголын зах зээлд
          </h1>
          <p style={dl(0.12)} className="u-soft animate-fade-up mt-6 text-lg leading-relaxed">
            {company.name} нь {company.founded} онд үүсгэн байгуулагдсан бөгөөд төлбөр
            тооцооны шийдэл, өгөгдөл хамгааллын систем болон хувь хүний мэдээллийн
            бүртгэлийн цахим системийг Монголын зах зээлд анхлан нэвтрүүлсэн.
          </p>
          <p style={dl(0.2)} className="u-soft animate-fade-up mt-4 text-lg leading-relaxed">
            Бид 25 жилийн турш засгийн газар, харилцаа холбоо болон банк санхүүгийн
            салбарт аюулгүй байдлын шийдэл, төлбөр тооцооны бүтээгдэхүүнийг нийлүүлж,
            Монгол Улсад мэдээллийн технологийн салбарыг хөгжүүлэхэд хувь нэмэр оруулж байна.
          </p>
        </div>

        <div style={dl(0.15)} className="animate-fade-up sc-card flex items-center justify-center bg-white p-10">
          <Image
            src="/image002.png"
            alt="Smartcard"
            width={620}
            height={200}
            className="h-auto w-full max-w-sm"
          />
        </div>
      </section>

      {/* Тоон үзүүлэлт */}
      <section className="mx-auto mt-20 max-w-6xl">
        <Reveal>
          <div className="sc-card sc-divide grid grid-cols-1 sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label} className="p-8 text-center">
                <div className="u-accent text-4xl font-extrabold tabular-nums">
                  {s.to !== undefined ? <Counter to={s.to} suffix={s.suffix} /> : s.text}
                </div>
                <div className="u-soft mt-1.5 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Үнэт зүйлс */}
      <section className="mx-auto mt-24 max-w-6xl">
        <p className="sc-eyebrow">Үнэт зүйлс</p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Бидний үнэт зүйлс</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {values.map(({ Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 0.1} className="h-full">
              <div className="sc-card sc-card-hover h-full p-7">
                <span className="sc-icon">
                  <Icon className="h-6 w-6" strokeWidth={1.75} />
                </span>
                <h3 className="mt-5 text-xl font-bold">{title}</h3>
                <p className="u-soft mt-2 leading-relaxed">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Холбоо барих */}
      <section className="mx-auto mt-24 max-w-6xl">
        <Reveal>
          <div className="rounded-3xl bg-gradient-to-br from-[#5a1f80] to-[#2e1a66] px-8 py-14 text-center text-white">
            <h2 className="text-3xl font-extrabold tracking-tight">Холбоо барих</h2>
            <p className="sc-on-dark-soft mt-3">Асуулт, санал хүсэлтээ бидэнд илгээгээрэй.</p>
            <div className="mt-7 flex flex-wrap justify-center gap-4">
              <a href={company.phoneHref} className="sc-btn bg-white text-[#2e1a66] hover:bg-[#f3ebfd]">
                <Phone className="h-4 w-4" /> {company.phone}
              </a>
              <a href={`mailto:${company.email}`} className="sc-btn sc-btn-on-dark">
                <Mail className="h-4 w-4" /> {company.email}
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}