/* eslint-disable @next/next/no-img-element -- салбарын зургууд smrt.mn-ээс шууд ачаалагдана */
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Check,
  Cpu,
  CreditCard,
  Fingerprint,
  Landmark,
  LifeBuoy,
  Lightbulb,
  Mail,
  MessagesSquare,
  MonitorPlay,
  Mountain,
  Phone,
  RadioTower,
  Rocket,
  ShieldCheck,
  ShoppingBag,
  type LucideIcon,
} from "lucide-react";
import ContactForm from "@/components/ContactForm";
import Counter from "@/components/Counter";
import LatestNews from "@/components/LatestNews";
import LogoMarquee from "@/components/LogoMarquee";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import { company, localPartners, partners } from "@/lib/content";
import { getPage, preview } from "@/lib/pages";

const d = (s: number) => ({ "--delay": `${s}s` } as React.CSSProperties);
const photo = (path: string) => {
  const page = getPage(path);
  return page ? preview(page).image : undefined;
};

const stats: { text?: string; to?: number; suffix?: string; label: string }[] = [
  { text: String(company.founded), label: "Байгуулагдсан он" },
  { to: 28, suffix: "+", label: "Жилийн туршлага" },
  { to: 6, label: "Мэргэшсэн салбар" },
  { to: 20, suffix: "+", label: "Жил олон улсын түнш" },
];

const solutions: { Icon: LucideIcon; title: string; text: string; href: string; chips?: string[] }[] = [
  {
    Icon: CreditCard,
    title: "Төлбөр тооцоо",
    text: "Картын бэлдэцээс эхлээд шуурхай хэвлэл, киоск, дижитал карт хүртэл — аюулгүй, хялбар төлбөр тооцооны цогц шийдэл.",
    href: "/solution/payment",
    chips: ["Төвлөрсөн хэвлэл", "Шуурхай хэвлэл", "Киоск", "Токен", "Дижитал карт"],
  },
  {
    Icon: Fingerprint,
    title: "Цахим бүртгэл, аюулгүй байдал",
    text: "Ухаалаг иргэний үнэмлэх, паспорт, жолооны үнэмлэх, цахим гарын үсэг — 100 гаруй оронд ашиглагдаж буй түншүүдийн технологи.",
    href: "/solution/digital-identity",
    chips: ["Цахим үнэмлэх", "Гадаад паспорт", "Цахим гарын үсэг", "Баталгаажуулалт"],
  },
  {
    Icon: ShieldCheck,
    title: "Биет аюулгүй байдал",
    text: "Банкны хамгаалалтын хаалга, өрөөнөөс эхлээд камерын систем хүртэл — UL 608 стандартад нийцсэн, эд хөрөнгийг найдвартай хамгаалах шийдэл.",
    href: "/solution/physical-security",
    chips: ["Хамгаалалтын хаалга", "Хадгаламжийн хайрцаг", "Камерын систем"],
  },
  {
    Icon: MonitorPlay,
    title: "Хурлын танхимын LED дэлгэц",
    text: "Проектор, олон зурагтын оронд хурал, зөвлөгөөний танхимд заадасгүй, тод LED дэлгэц суурилуулж, видео хурлын системтэй нэгтгэнэ.",
    href: "/solution/led-display",
    chips: ["Хурлын өрөө", "Зөвлөгөөний танхим", "Видео хурал", "Засвар үйлчилгээ"],
  },
];

const industries: { Icon: LucideIcon; title: string; text: string; href: string; span: string }[] = [
  { Icon: Landmark, title: "Банк санхүү", text: "Төлбөрийн карт хэвлэл, бэлдэц, аюулгүй төлбөр тооцооны шийдэл", href: "/industry/financial", span: "lg:col-span-2 lg:row-span-2" },
  { Icon: Building2, title: "Төрийн байгууллага", text: "Биет болон цахим бичиг баримтын шийдэл", href: "/industry/government", span: "lg:col-span-2" },
  { Icon: Cpu, title: "Технологи", text: "Мэдээллийн аюулгүй байдал, интернет төлбөр", href: "/industry/it", span: "" },
  { Icon: RadioTower, title: "Үүрэн холбоо", text: "Сим карт, е-сим картын шийдэл", href: "/industry/telecommunications", span: "" },
  { Icon: Mountain, title: "Уул уурхай", text: "Тээврийн хэрэгслийн удирдлага, аюулгүй байдлын систем", href: "/industry/mining", span: "lg:col-span-2" },
  { Icon: ShoppingBag, title: "Худалдаа, үйлчилгээ", text: "Гишүүнчлэл, хөнгөлөлтийн карт, интернет төлбөр", href: "/industry/retail", span: "lg:col-span-2" },
];

const steps: { Icon: LucideIcon; title: string; text: string }[] = [
  { Icon: MessagesSquare, title: "Зөвлөгөө", text: "Танай байгууллагын хэрэгцээ, одоогийн системийг судална." },
  { Icon: Lightbulb, title: "Шийдэл", text: "Дэлхийн тэргүүлэх хамтрагчдын технологиос тохирохыг санал болгоно." },
  { Icon: Rocket, title: "Нэвтрүүлэлт", text: "Төхөөрөмж, программыг суурилуулж, ажилтнуудыг сургана." },
  { Icon: LifeBuoy, title: "Дэмжлэг", text: "Нэвтрүүлсний дараа ч засвар үйлчилгээ, техникийн дэмжлэг үзүүлнэ." },
];

// Ар талгүй (тунгалаг) лого — нэг өнгийн дүрс болгож харуулахад тохиромжтой
const monoPartners = partners.filter((p) => !/apc|brinks/.test(p.logo));

function Head({ index, eyebrow, title, highlight, text, center = false }: {
  index: string;
  eyebrow: string;
  title: string;
  highlight?: string;
  text?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="sc-eyebrow">
        <span className="u-mute">[{index}]</span> — {eyebrow}
      </p>
      <h2 className="font-display mt-5 text-3xl font-semibold leading-[1.1] sm:text-5xl">
        {title}
        {highlight && (
          <>
            {" "}
            <span className="text-gradient">{highlight}</span>
          </>
        )}
      </h2>
      {text && <p className="u-soft mt-6 text-lg leading-relaxed">{text}</p>}
    </div>
  );
}

// Hero дээрх картын дүрсүүд
function IdCard() {
  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-white/40 bg-gradient-to-br from-[#f7f3ff] to-[#dcd0f2] p-5 text-[#2e1a66] shadow-2xl">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] font-semibold tracking-[0.2em]">MONGOLIA · ID</span>
        <span className="h-5 w-5 rounded-full bg-[#7b2fa8]/25" />
      </div>
      <div className="flex gap-3">
        <div className="h-16 w-12 rounded-md bg-gradient-to-b from-[#b9a6dc] to-[#8d74c0]" />
        <div className="flex flex-1 flex-col justify-center gap-1.5">
          <span className="h-2 w-4/5 rounded bg-[#2e1a66]/30" />
          <span className="h-2 w-3/5 rounded bg-[#2e1a66]/20" />
          <span className="h-2 w-2/3 rounded bg-[#2e1a66]/20" />
        </div>
      </div>
    </div>
  );
}

function PassportCard() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 rounded-2xl border border-white/15 bg-gradient-to-br from-[#1d1442] to-[#0b0820] p-5 text-[#d9bfff] shadow-2xl">
      <Fingerprint className="h-10 w-10" strokeWidth={1.2} />
      <span className="font-mono text-[10px] tracking-[0.25em]">E-PASSPORT</span>
    </div>
  );
}

function PaymentCard() {
  return (
    <div
      className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-[#9a4ce0] via-[#6d28a8] to-[#241052] p-6 text-white"
      style={{ boxShadow: "0 40px 80px -24px rgba(109,40,168,0.75), inset 0 1px 0 rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.25)" }}
      aria-hidden="true"
    >
      <span className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(120deg, rgba(255,255,255,0.3), transparent 40%)" }} />
      <span className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full border border-white/15" />
      <span className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full border border-white/10" />
      <span className="sc-tilt-glare" />
      <div className="relative flex items-start justify-between">
        <div className="h-9 w-12 rounded-md" style={{ background: "linear-gradient(135deg, #fbe9b7, #d6ad55)", boxShadow: "inset 0 0 0 1px rgba(120,80,0,0.3)" }} />
        <span className="font-display text-xs font-semibold tracking-[0.18em]">SMARTCARD</span>
      </div>
      <div className="relative">
        <p className="whitespace-nowrap font-mono text-sm tracking-[0.14em] sm:text-xl sm:tracking-[0.2em]">5412 •••• •••• 1998</p>
        <div className="mt-2 flex items-end justify-between">
          <p className="sc-on-dark-accent font-mono text-[11px] tracking-wider">DIGITAL IDENTITY &amp; SECURITY</p>
          <span className="flex">
            <span className="h-7 w-7 rounded-full bg-white/80" />
            <span className="-ml-3 h-7 w-7 rounded-full bg-white/40" />
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="u-bg u-fg relative overflow-hidden">
      {/* ===== Hero ===== */}
      <section className="relative">
        <div className="relative mx-auto max-w-6xl px-6 pt-36 text-center sm:pt-44">
          <span style={d(0.05)} className="sc-chip animate-fade-up font-mono !text-xs uppercase tracking-wider">
            <span className="sc-pulse h-2 w-2 rounded-full bg-[var(--signal)]" />
            {company.founded} оноос · Digital Identity &amp; Security
          </span>

          <h1
            style={d(0.12)}
            className="font-display animate-fade-up mx-auto mt-8 max-w-5xl text-[2.4rem] font-semibold leading-[1.05] sm:text-6xl lg:text-7xl"
          >
            Өсөлтийг хурдасгах <span className="text-gradient">дижитал шийдэл</span>
          </h1>

          <p style={d(0.22)} className="u-soft animate-fade-up mx-auto mt-7 max-w-2xl text-lg leading-relaxed sm:text-xl">
            Төлбөрийн карт, цахим бүртгэл, аюулгүй байдлын шийдлээр Монголын банк,
            төрийн байгууллагуудыг 25 гаруй жил дижитал ирээдүй рүү хөтөлж байна.
          </p>

          <div style={d(0.3)} className="animate-fade-up mt-10 flex flex-wrap justify-center gap-3">
            <a href="#solutions" className="sc-btn sc-btn-primary !px-7 !py-4">
              Шийдлүүдтэй танилцах <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#contact" className="sc-btn sc-btn-ghost !px-7 !py-4">Холбоо барих</a>
          </div>
        </div>

        {/* Бүтээгдэхүүний тайз: 3 карт + гэрэлт нум */}
        <div style={d(0.35)} className="animate-fade-up relative mx-auto mt-16 h-[19rem] max-w-5xl px-6 sm:mt-20 sm:h-[26rem]">
          {/* Нумыг тайзны доод хэсэгт тасалж, зөөлөн бүдгэрүүлнэ */}
          <div
            className="pointer-events-none absolute inset-x-[-30%] top-0 h-[calc(100%+5rem)] overflow-hidden"
            style={{ maskImage: "linear-gradient(180deg, #000 65%, transparent)", WebkitMaskImage: "linear-gradient(180deg, #000 65%, transparent)" }}
            aria-hidden="true"
          >
            <div className="sc-horizon top-[58%]" />
          </div>

          <div className="absolute left-[2%] top-[18%] hidden aspect-[1.6] w-[30%] -rotate-[14deg] sm:block" aria-hidden="true">
            <div className="sc-float h-full" style={{ animationDelay: "-1s" }}>
              <IdCard />
            </div>
          </div>
          <div className="absolute right-[3%] top-[16%] hidden aspect-[0.72] w-[18%] rotate-[12deg] sm:block" aria-hidden="true">
            <div className="sc-float h-full" style={{ animationDelay: "-3.5s" }}>
              <PassportCard />
            </div>
          </div>

          <TiltCard className="absolute left-1/2 top-0 aspect-[1.6] w-[86%] max-w-[26rem] -translate-x-1/2 rounded-2xl sm:w-[44%]">
            <PaymentCard />
          </TiltCard>

          <div className="sc-card sc-float absolute bottom-[14%] left-[4%] flex items-center gap-3 px-4 py-3 sm:left-[16%]" style={{ animationDelay: "-2s" }}>
            <span className="sc-icon !h-9 !w-9"><Check className="h-4 w-4" /></span>
            <div className="text-left">
              <p className="font-display text-base font-semibold leading-none">78 сек</p>
              <p className="u-soft mt-1 text-xs">Өнгөт карт хэвлэх</p>
            </div>
          </div>
          <div className="sc-card sc-float absolute bottom-[6%] right-[4%] hidden items-center gap-3 px-4 py-3 sm:right-[14%] sm:flex" style={{ animationDelay: "-4.5s" }}>
            <span className="sc-icon !h-9 !w-9"><CreditCard className="h-4 w-4" /></span>
            <div className="text-left">
              <p className="text-sm font-semibold leading-none">Visa · Mastercard</p>
              <p className="u-soft mt-1 text-xs">UnionPay · ₮ карт</p>
            </div>
          </div>
        </div>

        {/* Албан ёсны түншүүд */}
        <div className="relative mx-auto max-w-6xl px-6 pb-10 pt-10">
          <p className="u-mute text-center font-mono text-xs uppercase tracking-[0.2em]">
            Дэлхийн тэргүүлэгчдийн албан ёсны түнш
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-14">
            {monoPartners.map((p) => (
              <span key={p.name} title={p.name} className="relative block h-8 w-28 sm:h-9 sm:w-32">
                <Image src={p.logo} alt={p.name} fill sizes="128px" className="sc-logo-mono object-contain" />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Тоон үзүүлэлт ===== */}
      <section className="relative mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-2 border-y border-[var(--line)] md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className={`px-4 py-10 sm:px-6 ${i % 2 ? "border-l border-[var(--line)]" : ""} ${i > 1 ? "border-t border-[var(--line)] md:border-t-0" : ""} ${i === 2 ? "md:border-l" : ""}`}>
                <p className="u-mute font-mono text-xs">[0{i + 1}]</p>
                <div className="font-display mt-4 text-4xl font-semibold tabular-nums sm:text-6xl">
                  {s.to !== undefined ? <Counter to={s.to} suffix={s.suffix} /> : s.text}
                </div>
                <p className="u-soft mt-2 text-sm">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== Шийдэл ===== */}
      <section id="solutions" className="relative mx-auto max-w-6xl px-6 py-24">
        <Head
          index="01"
          eyebrow="Шийдэл"
          title="Танай байгууллагад тохирох"
          highlight="цогц шийдэл"
          text="Биет болон дижитал ертөнцөд бүрэн аюулгүй ажиллаж, цахим шилжилтийн боломжийг өсөлт болгон хувиргахад тусална."
        />

        <ul className="mt-16 border-b border-[var(--line)]">
          {solutions.map(({ Icon, title, text, href, chips }, i) => {
            const img = photo(href);
            return (
              <li key={href}>
                <Reveal delay={i * 0.08}>
                  <Link
                    href={href}
                    className="group relative grid gap-6 border-t border-[var(--line)] py-10 transition-colors sm:grid-cols-[4rem_1fr_auto] sm:items-center sm:gap-8 md:py-12"
                  >
                    {/* Hover үед доороос дүүрэх өнгө */}
                    <span className="pointer-events-none absolute inset-x-[-1.5rem] inset-y-0 -z-10 origin-bottom scale-y-0 rounded-3xl bg-[var(--surface)] transition-transform duration-500 ease-out group-hover:scale-y-100" />

                    <span className="u-mute font-mono text-sm">0{i + 1}</span>

                    <div className="flex gap-6">
                      {img && (
                        <span className="hidden h-28 w-40 shrink-0 overflow-hidden rounded-2xl border border-[var(--line)] md:block">
                          <img src={img} alt="" loading="lazy" className="h-full w-full object-cover opacity-80 grayscale transition duration-700 group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0" />
                        </span>
                      )}
                      <div>
                        <h3 className="font-display flex items-center gap-3 text-2xl font-semibold transition-transform duration-500 group-hover:translate-x-2 sm:text-4xl">
                          <Icon className="u-accent h-7 w-7 shrink-0 sm:h-8 sm:w-8" strokeWidth={1.5} />
                          {title}
                        </h3>
                        <p className="u-soft mt-3 max-w-2xl leading-relaxed">{text}</p>
                        {chips && (
                          <div className="mt-5 flex flex-wrap gap-2">
                            {chips.map((c) => <span key={c} className="sc-chip">{c}</span>)}
                          </div>
                        )}
                      </div>
                    </div>

                    <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[var(--line-strong)] transition duration-500 group-hover:rotate-45 group-hover:border-transparent group-hover:bg-[var(--accent-strong)] group-hover:text-white">
                      <ArrowUpRight className="h-5 w-5" />
                    </span>
                  </Link>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </section>

      {/* ===== Онцлох бүтээгдэхүүн ===== */}
      <section className="relative mx-auto max-w-6xl px-6 py-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0d0719] p-8 text-white sm:p-12 md:p-16">
            <span className="sc-halo -right-40 -top-40 h-[28rem] w-[28rem]" />
            <div className="sc-grid-bg pointer-events-none absolute inset-0 opacity-40" style={{ "--grid-line": "rgba(255,255,255,0.06)" } as React.CSSProperties} />

            <div className="relative grid items-center gap-12 md:grid-cols-2">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#c9a4ff]">Онцлох бүтээгдэхүүн</p>
                <h2 className="font-display mt-5 text-4xl font-semibold sm:text-5xl">Entrust Sigma DS4</h2>
                <p className="sc-on-dark-soft mt-5 text-lg leading-relaxed">
                  Санхүүгийн байгууллага хэрэглэгчиддээ илүү хурдан шуурхай, өндөр чанартай,
                  тусгайлсан картыг ердөө хоёрхон минутанд хэвлэх боломжтой боллоо.
                </p>
                <ul className="mt-8 space-y-3">
                  {[
                    "Төлбөрийн картын бүх стандарт хангасан, өндөр нууцлалтай",
                    "VISA, Mastercard, UnionPay, ₮ карт хэвлэнэ",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <span className="sc-on-dark-soft">{t}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/solution/payment/issuance/instant-issuance" className="sc-btn sc-btn-light mt-10">
                  Дэлгэрэнгүй <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="text-center md:text-right">
                <p
                  className="font-display text-[8rem] font-bold leading-none tracking-tighter sm:text-[11rem] lg:text-[13rem]"
                  style={{
                    background: "linear-gradient(180deg, #ffffff 20%, #c9a4ff 60%, #ff7ab8)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  78″
                </p>
                <p className="sc-on-dark-soft font-mono text-sm uppercase tracking-[0.2em]">секундэд өнгөт карт</p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ===== Салбар (bento) ===== */}
      <section id="industries" className="relative mx-auto max-w-6xl px-6 py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Head index="02" eyebrow="Салбар" title="Мэргэшсэн" highlight="салбарууд" />
          <Link href="/industry" className="sc-btn sc-btn-ghost">
            Бүх салбар <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-14 grid auto-rows-[16rem] gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map(({ Icon, title, text, href, span }, i) => {
            const img = photo(href);
            const big = i === 0;
            return (
              <Reveal key={href} delay={(i % 4) * 0.08} className={`h-full ${span} ${big ? "sm:col-span-2 sm:row-span-2" : ""}`}>
                <Link href={href} className="group relative block h-full overflow-hidden rounded-[1.5rem] border border-[var(--line)] bg-[#120a20]">
                  {img && (
                    <img src={img} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-70 transition duration-[1.2s] ease-out group-hover:scale-110 group-hover:opacity-90" />
                  )}
                  <span className="sc-photo-fade absolute inset-0" />
                  <span className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white backdrop-blur-md">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <span className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#120a20] opacity-0 transition duration-500 group-hover:rotate-45 group-hover:opacity-100">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                    <h3 className={`font-display font-semibold ${big ? "text-3xl sm:text-4xl" : "text-xl"}`}>{title}</h3>
                    <p className={`mt-2 text-sm leading-relaxed text-white/75 ${big ? "max-w-sm sm:text-base" : ""}`}>{text}</p>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ===== Хэрхэн ажилладаг ===== */}
      <section className="relative mx-auto max-w-6xl px-6 py-24">
        <Head
          index="03"
          eyebrow="Хамтын ажиллагаа"
          title="Санаанаас"
          highlight="хэрэгжилт хүртэл"
          text="Шийдлээ сонгохоос эхлээд нэвтрүүлсний дараах дэмжлэг хүртэл бид тантай хамт байна."
        />
        <div className="mt-16 grid gap-px overflow-hidden rounded-[1.5rem] border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 0.1} className="h-full">
              <div className="group relative h-full bg-[var(--bg)] p-8 transition-colors duration-500 hover:bg-[var(--surface)]">
                <span className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] transition-transform duration-700 group-hover:scale-x-100" />
                <div className="flex items-center justify-between">
                  <span className="font-display text-5xl font-semibold text-[var(--line-strong)] transition-colors duration-500 group-hover:text-[var(--accent)]">
                    0{i + 1}
                  </span>
                  <Icon className="u-accent h-6 w-6" strokeWidth={1.5} />
                </div>
                <h3 className="font-display mt-10 text-xl font-semibold">{title}</h3>
                <p className="u-soft mt-3 text-[15px] leading-relaxed">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== Бидний тухай + Хамтрагчид ===== */}
      <section id="partners" className="relative py-24">
        <div className="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-2">
          <Reveal>
            <Head index="04" eyebrow="Бидний тухай" title={`${company.founded} оноос`} highlight="Монголын зах зээлд" />
            <p className="u-soft mt-6 text-lg leading-relaxed">
              {company.name} нь төлбөр тооцооны шийдэл, өгөгдөл хамгааллын систем болон хувь
              хүний мэдээллийн бүртгэлийн цахим системийг Монголын зах зээлд анхлан нэвтрүүлсэн.
              Дэлхийн цахим аюулгүй байдлын тэргүүлэгч компаниудын албан ёсны төлөөлөгчөөр
              20 гаруй жил ажиллаж байна.
            </p>
            <Link href="/about" className="sc-btn sc-btn-ghost mt-10">
              Бидний тухай <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
              {partners.map((p) => {
                const inner = (
                  <span className="relative block h-full w-full">
                    <Image src={p.logo} alt={p.name} fill sizes="160px" className="object-contain" />
                  </span>
                );
                const cls = "flex aspect-[2/1] items-center justify-center rounded-2xl bg-white p-4 transition duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(139,63,209,0.6)]";
                return p.href ? (
                  <Link key={p.name} href={p.href} title={p.name} className={cls}>{inner}</Link>
                ) : (
                  <div key={p.name} title={p.name} className={cls}>{inner}</div>
                );
              })}
            </div>
          </Reveal>
        </div>

        <div className="mx-auto mt-24 max-w-6xl px-6">
          <p className="u-mute text-center font-mono text-xs uppercase tracking-[0.2em]">Бидэнд итгэдэг Монголын байгууллагууд</p>
        </div>
        <div className="mx-auto mt-8 max-w-7xl space-y-3">
          <LogoMarquee items={localPartners.slice(0, 6)} duration={38} />
          <LogoMarquee items={localPartners.slice(6)} reverse duration={32} />
        </div>
      </section>

      {/* ===== Мэдээ ===== */}
      <section className="relative mx-auto max-w-6xl px-6 py-24">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <Head index="05" eyebrow="Мэдээ" title="Технологийн" highlight="мэдээ" />
          <Link href="/news" className="sc-btn sc-btn-ghost">
            Бүх мэдээ <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <Suspense fallback={<p className="u-soft">Мэдээ ачаалж байна...</p>}>
          <LatestNews />
        </Suspense>
      </section>

      {/* ===== Холбоо барих ===== */}
      <section id="contact" className="relative mx-auto max-w-6xl px-6 py-24">
        <span className="sc-halo -left-40 top-20 h-96 w-96 opacity-20" />
        <div className="relative grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="sc-eyebrow"><span className="u-mute">[06]</span> — Холбоо барих</p>
            <h2 className="font-display mt-5 text-5xl font-semibold leading-none sm:text-7xl lg:text-6xl xl:text-[4.25rem]">
              <span className="text-gradient">Ярилцъя.</span>
            </h2>
            <p className="u-soft mt-8 text-lg leading-relaxed">
              Цахим шилжилтээ хамтдаа эхлүүлье. Асуулт, санал хүсэлтээ үлдээгээрэй — манай
              мэргэжилтнүүд тантай эргэн холбогдоно.
            </p>
            <div className="mt-10 divide-y divide-[var(--line)] border-y border-[var(--line)]">
              <a href={company.phoneHref} className="group flex items-center justify-between py-5">
                <span>
                  <span className="u-mute block font-mono text-xs uppercase tracking-wider">Утас</span>
                  <span className="font-display mt-1 block text-xl font-semibold">{company.phone}</span>
                </span>
                <Phone className="u-accent h-5 w-5 transition group-hover:scale-110" />
              </a>
              <a href={`mailto:${company.email}`} className="group flex items-center justify-between py-5">
                <span>
                  <span className="u-mute block font-mono text-xs uppercase tracking-wider">Имэйл</span>
                  <span className="font-display mt-1 block text-xl font-semibold">{company.email}</span>
                </span>
                <Mail className="u-accent h-5 w-5 transition group-hover:scale-110" />
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.12} className="lg:col-span-7">
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
