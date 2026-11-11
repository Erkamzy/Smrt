import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Building2,
  CalendarDays,
  Check,
  Cpu,
  CreditCard,
  Fingerprint,
  Landmark,
  Layers,
  LifeBuoy,
  Lightbulb,
  Mail,
  MessagesSquare,
  Mountain,
  Phone,
  RadioTower,
  Rocket,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import ContactForm from "@/components/ContactForm";
import Counter from "@/components/Counter";
import LatestNews from "@/components/LatestNews";
import LogoMarquee from "@/components/LogoMarquee";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import { company, localPartners, partners } from "@/lib/content";

const d = (s: number) => ({ "--delay": `${s}s` } as React.CSSProperties);

const stats: { Icon: LucideIcon; text?: string; to?: number; suffix?: string; label: string }[] = [
  { Icon: CalendarDays, text: String(company.founded), label: "Байгуулагдсан он" },
  { Icon: Award, to: 25, suffix: "+", label: "Жилийн туршлага" },
  { Icon: Layers, to: 6, label: "Мэргэшсэн салбар" },
  { Icon: Sparkles, to: 3, label: "Шийдлийн чиглэл" },
];

const industries: { Icon: LucideIcon; title: string; text: string; href: string }[] = [
  { Icon: Landmark, title: "Банк санхүү", text: "Төлбөрийн карт хэвлэл, бэлдэц, аюулгүй төлбөр тооцооны шийдэл", href: "/industry/financial" },
  { Icon: Building2, title: "Засгийн газар", text: "Биет болон цахим бичиг баримтын шийдэл", href: "/industry/government" },
  { Icon: Cpu, title: "Технологи", text: "Мэдээллийн аюулгүй байдал, интернет төлбөр тооцооны шийдэл", href: "/industry/it" },
  { Icon: RadioTower, title: "Үүрэн холбоо", text: "Сим карт, е-сим картын шийдэл", href: "/industry/telecommunications" },
  { Icon: Mountain, title: "Уул уурхай", text: "Тээврийн хэрэгслийн удирдлага, аюулгүй байдлын систем", href: "/industry/mining" },
  { Icon: ShoppingBag, title: "Худалдаа, үйлчилгээ", text: "Гишүүнчлэл, хөнгөлөлтийн карт, интернет төлбөр тооцооны шийдэл", href: "/industry/retail" },
];

const steps: { Icon: LucideIcon; title: string; text: string }[] = [
  { Icon: MessagesSquare, title: "Зөвлөгөө", text: "Танай байгууллагын хэрэгцээ, одоогийн системийг судална." },
  { Icon: Lightbulb, title: "Шийдэл", text: "Дэлхийн тэргүүлэх хамтрагчдын технологиос тохирохыг санал болгоно." },
  { Icon: Rocket, title: "Нэвтрүүлэлт", text: "Төхөөрөмж, программыг суурилуулж, ажилтнуудыг сургана." },
  { Icon: LifeBuoy, title: "Дэмжлэг", text: "Нэвтрүүлсний дараа ч засвар үйлчилгээ, техникийн дэмжлэг үзүүлнэ." },
];

function Head({
  eyebrow,
  title,
  highlight,
  text,
  center = false,
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  text?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className={`sc-eyebrow inline-flex items-center gap-2 ${center ? "justify-center" : ""}`}>
        <span className="h-px w-6 bg-current opacity-60" />
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl">
        {title}
        {highlight && (
          <>
            {" "}
            <span className="text-gradient">{highlight}</span>
          </>
        )}
      </h2>
      {text && <p className="u-soft mt-5 text-lg leading-relaxed">{text}</p>}
    </div>
  );
}

function SolutionCard({
  Icon,
  title,
  text,
  href,
  chips = [],
  featured = false,
}: {
  Icon: LucideIcon;
  title: string;
  text: string;
  href: string;
  chips?: string[];
  featured?: boolean;
}) {
  return (
    <Link href={href} className="sc-card sc-glow group relative flex h-full flex-col overflow-hidden p-7 sm:p-8">
      {/* Арын том icon */}
      <Icon
        aria-hidden="true"
        strokeWidth={1}
        className={`pointer-events-none absolute -bottom-6 -right-6 text-[var(--accent)] opacity-[0.07] transition duration-700 group-hover:-rotate-6 group-hover:scale-110 group-hover:opacity-[0.12] ${
          featured ? "h-64 w-64" : "h-40 w-40"
        }`}
      />
      {featured && <span className="sc-halo -right-24 -top-24 h-64 w-64 opacity-25" />}

      <span className="sc-icon relative transition duration-500 group-hover:scale-110 group-hover:-rotate-6">
        <Icon className="h-6 w-6" strokeWidth={1.75} />
      </span>
      <h3 className={`relative mt-5 font-bold ${featured ? "text-2xl sm:text-3xl" : "text-xl"}`}>{title}</h3>
      <p className="u-soft relative mt-2 text-[15px] leading-relaxed">{text}</p>
      {chips.length > 0 && (
        <div className="relative mt-6 flex flex-wrap gap-2">
          {chips.map((c) => (
            <span key={c} className="sc-chip">{c}</span>
          ))}
        </div>
      )}
      <span className="u-accent relative mt-auto flex items-center gap-1 pt-6 text-sm font-semibold">
        Дэлгэрэнгүй
        <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

export default function Home() {
  return (
    <main className="u-bg u-fg relative overflow-hidden">
      {/* ===== Hero ===== */}
      <section className="relative">
        <div className="sc-grid-bg pointer-events-none absolute inset-0" />
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[28rem] w-[56rem] -translate-x-1/2 -translate-y-1/3 rounded-full blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgba(148,64,196,0.35), transparent)" }}
        />

        <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 pb-20 pt-36 lg:grid-cols-2 lg:pt-40">
          <div>
            <span style={d(0.05)} className="sc-chip animate-fade-up inline-flex items-center gap-2">
              <span className="sc-pulse h-2 w-2 rounded-full bg-[#a855f7]" />
              {company.founded} оноос · Digital Identity and Security
            </span>

            <h1
              style={d(0.12)}
              className="animate-fade-up mt-6 text-[2.75rem] font-extrabold leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl"
            >
              Өсөлтийг хурдасгах <span className="text-gradient">дижитал шийдэл</span>
            </h1>

            <p style={d(0.2)} className="u-soft animate-fade-up mt-6 max-w-xl text-lg leading-relaxed">
              Дэлхийд итгэгдсэн шийдэл, инновац, хамтын ажиллагааг хослуулан мэдээллийн
              технологийн салбарын хөгжлийг манлайлна.
            </p>

            <div style={d(0.28)} className="animate-fade-up mt-9 flex flex-wrap gap-4">
              <a href="#solutions" className="sc-btn sc-btn-primary px-7 py-4 text-base">
                Манай шийдэл <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#contact" className="sc-btn sc-btn-ghost px-7 py-4 text-base">Холбоо барих</a>
            </div>

            <div style={d(0.36)} className="animate-fade-up mt-10 flex items-center gap-4">
              <div className="flex -space-x-3">
                {partners.slice(0, 3).map((p) => (
                  <span
                    key={p.name}
                    title={p.name}
                    className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-white p-1.5 shadow-md ring-2 ring-[var(--bg)]"
                  >
                    <span className="relative block h-full w-full">
                      <Image src={p.logo} alt={p.name} fill sizes="44px" className="object-contain" />
                    </span>
                  </span>
                ))}
              </div>
              <p className="u-soft text-sm leading-snug">
                <span className="u-fg font-semibold">{partners.slice(0, 3).map((p) => p.name).join(", ")}</span>
                <br />
                зэрэг дэлхийн тэргүүлэгчдийн албан ёсны түнш
              </p>
            </div>
          </div>

          {/* Бүтээгдэхүүний дүрс (CSS-ээр) — хулганаар хөдөлгөхөд 3D-ээр эргэлдэнэ */}
          <div style={d(0.2)} className="animate-fade-up relative mx-auto h-[24rem] w-full max-w-md sm:h-[27rem]">
            <span className="sc-halo left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2" />

            <div className="sc-glass absolute left-0 top-6 aspect-[1.6] w-[82%] -rotate-6 rounded-2xl" aria-hidden="true" />

            <TiltCard className="absolute right-0 top-28 aspect-[1.6] w-[86%] rotate-3 rounded-2xl">
              <div
                className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-[#9440c4] via-[#7b2fa8] to-[#2e1a66] p-6 text-white"
                style={{ boxShadow: "0 30px 60px -20px rgba(76,29,149,0.6), inset 0 1px 0 rgba(255,255,255,0.45)", border: "1px solid rgba(255,255,255,0.3)" }}
                aria-hidden="true"
              >
                <span
                  className="pointer-events-none absolute inset-0 rounded-2xl"
                  style={{ background: "linear-gradient(125deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.08) 32%, transparent 52%)" }}
                />
                <span className="sc-tilt-glare" />
                <div className="relative flex items-start justify-between">
                  <div
                    className="h-9 w-12 rounded-md"
                    style={{ background: "linear-gradient(135deg, #f5e9ff, #c9a8ef)", boxShadow: "inset 0 0 0 1px rgba(76,29,149,0.25)" }}
                  />
                  <span className="text-xs font-bold tracking-[0.2em]">SMARTCARD</span>
                </div>
                <div className="relative">
                  <p className="text-lg tracking-[0.22em] tabular-nums">•••• •••• •••• 1998</p>
                  <div className="mt-1.5 flex items-end justify-between">
                    <p className="sc-on-dark-accent text-xs">Digital Identity and Security</p>
                    <span className="flex">
                      <span className="h-6 w-6 rounded-full bg-white/70" />
                      <span className="-ml-2.5 h-6 w-6 rounded-full bg-white/35" />
                    </span>
                  </div>
                </div>
              </div>
            </TiltCard>

            <div
              className="sc-card sc-float absolute right-0 top-0 flex items-center gap-3 px-4 py-3"
              style={{ animationDelay: "-2s" }}
            >
              <span className="sc-icon"><Check className="h-5 w-5" /></span>
              <div>
                <p className="text-lg font-extrabold leading-none">78 сек</p>
                <p className="u-soft mt-1 text-xs">Өнгөт карт хэвлэх хугацаа</p>
              </div>
            </div>

            <div
              className="sc-card sc-float absolute bottom-2 left-0 flex items-center gap-3 px-4 py-3"
              style={{ animationDelay: "-4s" }}
            >
              <span className="sc-icon"><CreditCard className="h-5 w-5" /></span>
              <div>
                <p className="text-sm font-bold leading-none">Visa · Mastercard</p>
                <p className="u-soft mt-1 text-xs">UnionPay · ₮ карт</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Тоон үзүүлэлт ===== */}
      <section className="relative mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {stats.map(({ Icon, ...s }, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="h-full">
              <div className="sc-card sc-glow sc-card-hover h-full p-6 text-center sm:p-7">
                <span className="sc-icon mx-auto !h-10 !w-10 !rounded-xl">
                  <Icon className="h-5 w-5" strokeWidth={1.9} />
                </span>
                <div className="text-gradient mt-4 text-4xl font-extrabold tabular-nums sm:text-5xl">
                  {s.to !== undefined ? <Counter to={s.to} suffix={s.suffix} /> : s.text}
                </div>
                <div className="u-soft mt-1.5 text-sm">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== Шийдэл ===== */}
      <section id="solutions" className="relative mx-auto max-w-6xl px-6 py-28">
        <Head
          eyebrow="Шийдэл"
          title="Танай байгууллагад тохирох"
          highlight="цогц шийдэл"
          text="Бид танай байгууллагыг биет болон дижитал ертөнцөд бүрэн аюулгүй ажиллаж, цахим шилжилтийн боломжийг өсөлт болгон хувиргахад туслах шийдлүүдийг санал болгож байна."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-5">
          <Reveal className="lg:col-span-3 lg:row-span-2">
            <SolutionCard
              featured
              Icon={CreditCard}
              title="Төлбөр тооцоо"
              text="Аюулгүй, хялбар төлбөр тооцооны боломжийг нээнэ. Картын бэлдэцээс эхлээд шуурхай хэвлэл, киоск, дижитал карт хүртэл."
              href="/solution/payment"
              chips={["Төвлөрсөн карт хэвлэл", "Шуурхай хэвлэл", "Киоск", "Аюулгүй гүйлгээ, токен", "Дижитал карт", "Картын бэлдэц"]}
            />
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-2">
            <SolutionCard
              Icon={Fingerprint}
              title="Цахим бүртгэл, аюулгүй байдал"
              text="Дэлхийн улс орнуудын засгийн газруудад итгэгдсэн шийдэл"
              href="/solution/digital-identity"
            />
          </Reveal>
          <Reveal delay={0.2} className="lg:col-span-2">
            <SolutionCard
              Icon={ShieldCheck}
              title="Биет аюулгүй байдлын бүтээгдэхүүн"
              text="Аюулгүй байдлын хамгийн орчин үеийн цогц шийдэл"
              href="/solution/physical-security"
            />
          </Reveal>
        </div>
      </section>

      {/* ===== Онцлох бүтээгдэхүүн ===== */}
      <section className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="relative grid items-center gap-10 overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#2e1a66] via-[#4a1d7a] to-[#7b2fa8] p-8 text-white shadow-[0_40px_80px_-30px_rgba(76,29,149,0.7)] md:grid-cols-2 md:p-14">
            <span className="sc-halo -right-32 -top-32 h-96 w-96" />
            <div className="sc-grid-bg pointer-events-none absolute inset-0 opacity-10" />

            <div className="relative">
              <span
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold tracking-wider"
                style={{ background: "rgba(255,255,255,0.16)" }}
              >
                <Sparkles className="h-3.5 w-3.5" /> ОНЦЛОХ БҮТЭЭГДЭХҮҮН
              </span>
              <h2 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl">Entrust Sigma DS4</h2>
              <p className="sc-on-dark-soft mt-4 text-lg leading-relaxed">
                Санхүүгийн байгууллага хэрэглэгчиддээ илүү хурдан шуурхай, өндөр чанартай,
                тусгайлсан картыг ердөө хоёрхон минутанд хэвлэх боломжтой боллоо.
              </p>
              <Link
                href="/solution/payment/issuance/instant-issuance"
                className="sc-btn mt-8 bg-white px-7 py-4 text-[#2e1a66] hover:bg-[#f3ebfd]"
              >
                Дэлгэрэнгүй <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="relative">
              <div className="mb-5 flex items-end gap-3">
                <span className="text-7xl font-extrabold leading-none tracking-tight sm:text-8xl">78</span>
                <span className="sc-on-dark-soft pb-2 text-lg leading-tight">секундэд<br />өнгөт карт</span>
              </div>
              <ul className="space-y-3">
                {[
                  "Төлбөр тооцооны картын бүх стандарт хангасан, өндөр нууцлалтай",
                  "VISA, Mastercard, UnionPay, ₮ картуудыг хэвлэх боломжтой",
                ].map((t) => (
                  <li
                    key={t}
                    className="flex items-start gap-3 rounded-2xl p-4 backdrop-blur-sm transition hover:bg-white/15"
                    style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.16)" }}
                  >
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full" style={{ background: "rgba(255,255,255,0.18)" }}>
                      <Check className="h-4 w-4" />
                    </span>
                    <span className="sc-on-dark-soft">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ===== Салбар ===== */}
      <section id="industries" className="relative mx-auto max-w-6xl px-6 py-28">
        <Head
          eyebrow="Салбар"
          title="Мэргэшсэн"
          highlight="салбарууд"
          text="Банк санхүү, төрийн үйлчилгээ, мэдээллийн технологи, харилцаа холбооны салбарт төлбөрийн карт, биет болон цахим бичиг баримт, бүртгэл-баталгаажуулалт, аюулгүй байдлын шийдлийн цогцыг санал болгодог."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map(({ Icon, title, text, href }, i) => (
            <Reveal key={title} delay={(i % 3) * 0.1} className="h-full">
              <Link href={href} className="sc-card sc-glow sc-card-hover group flex h-full gap-4 p-6">
                <span className="sc-icon transition duration-500 group-hover:scale-110 group-hover:-rotate-6">
                  <Icon className="h-6 w-6" strokeWidth={1.75} />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="flex items-center justify-between gap-2 text-lg font-bold">
                    {title}
                    <ArrowUpRight className="u-accent h-4 w-4 shrink-0 -translate-x-1 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" />
                  </h3>
                  <p className="u-soft mt-1.5 text-[15px] leading-relaxed">{text}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== Хэрхэн ажилладаг ===== */}
      <section className="relative mx-auto max-w-6xl px-6 pb-28">
        <Head
          center
          eyebrow="Хамтын ажиллагаа"
          title="Санаанаас"
          highlight="хэрэгжилт хүртэл"
          text="Шийдлээ сонгохоос эхлээд нэвтрүүлсний дараах дэмжлэг хүртэл бид тантай хамт байна."
        />
        <div className="relative mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Алхмуудыг холбох шугам */}
          <div
            aria-hidden="true"
            className="absolute left-[12.5%] right-[12.5%] top-8 hidden h-px lg:block"
            style={{ background: "linear-gradient(90deg, transparent, var(--accent), #ec4899, var(--accent), transparent)" }}
          />
          {steps.map(({ Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 0.12} className="h-full">
              <div className="relative flex h-full flex-col items-center text-center">
                <span className="sc-icon relative z-10 !h-16 !w-16 !rounded-2xl">
                  <Icon className="h-7 w-7" strokeWidth={1.75} />
                  <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-extrabold text-[#7b2fa8] shadow-md">
                    {i + 1}
                  </span>
                </span>
                <h3 className="mt-5 text-lg font-bold">{title}</h3>
                <p className="u-soft mt-2 max-w-[16rem] text-[15px] leading-relaxed">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== Бидний тухай + Хамтрагчид ===== */}
      <section id="about" className="relative mx-auto max-w-6xl px-6 pb-28">
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="sc-eyebrow inline-flex items-center gap-2">
              <span className="h-px w-6 bg-current opacity-60" />
              Бидний тухай
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl">
              {company.founded} оноос <span className="text-gradient">Монголын зах зээлд</span>
            </h2>
            <p className="u-soft mt-5 text-[17px] leading-relaxed">
              {company.name} нь {company.founded} онд үүсгэн байгуулагдсан бөгөөд төлбөр
              тооцооны шийдэл, өгөгдөл хамгааллын систем болон хувь хүний мэдээллийн
              бүртгэлийн цахим системийг Монголын зах зээлд анхлан нэвтрүүлсэн.
            </p>
            <p className="u-soft mt-4 text-[17px] leading-relaxed">
              Бид 25 жилийн турш засгийн газар, харилцаа холбоо болон банк санхүүгийн
              салбарт аюулгүй байдлын шийдэл, төлбөр тооцооны бүтээгдэхүүнийг нийлүүлж,
              Монгол Улсад мэдээллийн технологийн салбарыг хөгжүүлэхэд хувь нэмэр оруулж байна.
            </p>
            <Link href="/about" className="sc-btn sc-btn-ghost mt-8">
              Бидний тухай дэлгэрэнгүй <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="sc-card p-8">
              <p className="sc-eyebrow">Бизнесийн хамтрагчид</p>
              <p className="u-soft mt-3 leading-relaxed">
                Бид дэлхийн цахим аюулгүй байдал, нууцлалын технологийн тэргүүлэгч
                компаниудын Монгол Улс дахь албан ёсны төлөөлөгчөөр сүүлийн 20 гаруй жил
                хамтран ажиллаж байна.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {partners.map((p) => {
                  const logo = (
                    <span className="relative block h-full w-full">
                      <Image src={p.logo} alt={p.name} fill sizes="160px" className="object-contain" />
                    </span>
                  );
                  const cls =
                    "flex h-20 items-center justify-center rounded-2xl bg-white p-4 ring-1 ring-[var(--line)] transition duration-300";
                  return p.href ? (
                    <Link key={p.name} href={p.href} title={p.name} className={`${cls} hover:-translate-y-1 hover:shadow-lg hover:ring-[var(--accent)]`}>
                      {logo}
                    </Link>
                  ) : (
                    <div key={p.name} title={p.name} className={`${cls} hover:-translate-y-1 hover:shadow-lg`}>
                      {logo}
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== Монголын хамтрагчид ===== */}
      <section id="clients" className="relative pb-28">
        <div className="mx-auto max-w-6xl px-6">
          <Head
            center
            eyebrow="Монголын хамтрагчид"
            title="Бидэнд итгэдэг"
            highlight="байгууллагууд"
            text="Төрийн байгууллагууд болон тэргүүлэх банкуудтай олон жил хамтран ажиллаж байна."
          />
        </div>
        <div className="mx-auto mt-12 max-w-7xl space-y-4">
          <LogoMarquee items={localPartners.slice(0, 6)} duration={36} />
          <LogoMarquee items={localPartners.slice(6)} reverse duration={30} />
        </div>
      </section>

      {/* ===== Мэдээ ===== */}
      <section className="relative mx-auto max-w-6xl px-6 pb-28">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <Head eyebrow="Мэдээ" title="Технологийн" highlight="мэдээ" />
          <Link href="/news" className="sc-btn sc-btn-ghost">
            Бүгдийг харах <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <Suspense fallback={<p className="u-soft">Мэдээ ачаалж байна...</p>}>
          <LatestNews />
        </Suspense>
      </section>

      {/* ===== Холбоо барих ===== */}
      <section id="contact" className="relative mx-auto max-w-6xl px-6 pb-28">
        <Reveal>
          <div className="relative grid items-stretch gap-8 overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#5a1f80] via-[#3d1a70] to-[#2e1a66] p-8 text-white shadow-[0_40px_80px_-30px_rgba(76,29,149,0.7)] md:p-12 lg:grid-cols-5">
            <span className="sc-halo -bottom-40 -left-32 h-96 w-96" />
            <div className="relative lg:col-span-2">
              <span
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold tracking-wider"
                style={{ background: "rgba(255,255,255,0.16)" }}
              >
                <span className="sc-pulse h-2 w-2 rounded-full bg-[#4ade80]" /> БИД ТАНЫГ ХҮЛЭЭЖ БАЙНА
              </span>
              <h2 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl">
                Цахим шилжилтээ хамтдаа эхлүүлье
              </h2>
              <p className="sc-on-dark-soft mt-4 text-lg">
                Асуулт, санал хүсэлтээ бидэнд илгээгээрэй. Манай мэргэжилтнүүд тантай
                эргэн холбогдоно.
              </p>
              <div className="mt-8 flex flex-col items-start gap-4">
                <a href={company.phoneHref} className="sc-btn bg-white text-[#2e1a66] hover:bg-[#f3ebfd]">
                  <Phone className="h-4 w-4" /> {company.phone}
                </a>
                <a href={`mailto:${company.email}`} className="sc-btn sc-btn-on-dark">
                  <Mail className="h-4 w-4" /> {company.email}
                </a>
              </div>
            </div>
            <div className="sc-solid u-fg relative lg:col-span-3">
              <ContactForm />
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
