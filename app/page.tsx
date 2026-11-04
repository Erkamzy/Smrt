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
  Mail,
  Mountain,
  Phone,
  RadioTower,
  ShieldCheck,
  ShoppingBag,
  type LucideIcon,
} from "lucide-react";
import ContactForm from "@/components/ContactForm";
import Counter from "@/components/Counter";
import LatestNews from "@/components/LatestNews";
import Reveal from "@/components/Reveal";
import { company, partners } from "@/lib/content";

const d = (s: number) => ({ "--delay": `${s}s` } as React.CSSProperties);

const stats = [
  { text: String(company.founded), label: "Байгуулагдсан он" },
  { to: 25, suffix: "+", label: "Жилийн туршлага" },
  { to: 6, label: "Мэргэшсэн салбар" },
  { to: 3, label: "Шийдлийн чиглэл" },
] as { text?: string; to?: number; suffix?: string; label: string }[];

const industries: { Icon: LucideIcon; title: string; text: string; href: string }[] = [
  { Icon: Landmark, title: "Банк санхүү", text: "Төлбөрийн карт хэвлэл, бэлдэц, аюулгүй төлбөр тооцооны шийдэл", href: "/industry/financial" },
  { Icon: Building2, title: "Засгийн газар", text: "Биет болон цахим бичиг баримтын шийдэл", href: "/industry/government" },
  { Icon: Cpu, title: "Технологи", text: "Мэдээллийн аюулгүй байдал, интернет төлбөр тооцооны шийдэл", href: "/industry/it" },
  { Icon: RadioTower, title: "Үүрэн холбоо", text: "Сим карт, е-сим картын шийдэл", href: "/industry/telecommunications" },
  { Icon: Mountain, title: "Уул уурхай", text: "Тээврийн хэрэгслийн удирдлага, аюулгүй байдлын систем", href: "/industry/mining" },
  { Icon: ShoppingBag, title: "Худалдаа, үйлчилгээ", text: "Гишүүнчлэл, хөнгөлөлтийн карт, интернет төлбөр тооцооны шийдэл", href: "/industry/retail" },
];

function Head({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="max-w-3xl">
      <p className="sc-eyebrow">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h2>
      {text && <p className="u-soft mt-4 text-lg leading-relaxed">{text}</p>}
    </div>
  );
}

function SolutionCard({
  Icon,
  title,
  text,
  href,
  chips = [],
}: {
  Icon: LucideIcon;
  title: string;
  text: string;
  href: string;
  chips?: string[];
}) {
  return (
    <Link href={href} className="sc-card group flex h-full flex-col p-7">
      <span className="sc-icon">
        <Icon className="h-6 w-6" strokeWidth={1.75} />
      </span>
      <h3 className="mt-5 text-xl font-bold">{title}</h3>
      <p className="u-soft mt-2 text-[15px] leading-relaxed">{text}</p>
      {chips.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {chips.map((c) => (
            <span key={c} className="sc-chip">{c}</span>
          ))}
        </div>
      )}
      <span className="u-accent mt-auto flex items-center gap-1 pt-6 text-sm font-semibold">
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

        <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 pb-24 pt-36 lg:grid-cols-2 lg:pt-40">
          <div>
            <span style={d(0.05)} className="sc-chip animate-fade-up inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--accent-soft)" }} />
              {company.founded} оноос · Digital Identity and Security
            </span>

            <h1
              style={d(0.12)}
              className="animate-fade-up mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl"
            >
              Өсөлтийг хурдасгах <span className="text-gradient">дижитал шийдэл</span>
            </h1>

            <p style={d(0.2)} className="u-soft animate-fade-up mt-6 max-w-xl text-lg leading-relaxed">
              Дэлхийд итгэгдсэн шийдэл, инновац, хамтын ажиллагааг хослуулан мэдээллийн
              технологийн салбарын хөгжлийг манлайлна.
            </p>

            <div style={d(0.28)} className="animate-fade-up mt-9 flex flex-wrap gap-4">
              <a href="#solutions" className="sc-btn sc-btn-primary">
                Манай шийдэл <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#contact" className="sc-btn sc-btn-ghost">Холбоо барих</a>
            </div>

            <p style={d(0.36)} className="u-soft animate-fade-up mt-8 text-sm">
              {partners.slice(0, 3).map((p) => p.name).join(", ")} зэрэг дэлхийн тэргүүлэгч
              компаниудын албан ёсны түнш
            </p>
          </div>

          {/* Бүтээгдэхүүний дүрс (CSS-ээр) */}
          <div
            style={d(0.2)}
            className="animate-fade-up relative mx-auto h-[26rem] w-full max-w-md"
            aria-hidden="true"
          >
            <div
              className="absolute left-0 top-6 aspect-[1.6] w-[82%] -rotate-6 rounded-2xl bg-gradient-to-br from-[#38207a] to-[#1a0b3d]"
              style={{ boxShadow: "var(--shadow)" }}
            />
            <div
              className="absolute right-0 top-28 flex aspect-[1.6] w-[86%] rotate-3 flex-col justify-between rounded-2xl bg-gradient-to-br from-[#9440c4] via-[#7b2fa8] to-[#2e1a66] p-6 text-white"
              style={{ boxShadow: "var(--shadow)", border: "1px solid rgba(255,255,255,0.25)" }}
            >
              <div className="flex items-start justify-between">
                <div className="h-9 w-12 rounded-md" style={{ background: "#e4d7f7" }} />
                <span className="text-xs font-bold tracking-[0.2em]">SMARTCARD</span>
              </div>
              <div>
                <p className="text-lg tracking-[0.22em] tabular-nums">•••• •••• •••• ••••</p>
                <p className="sc-on-dark-accent mt-1.5 text-xs">Digital Identity and Security</p>
              </div>
            </div>

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
        <Reveal>
          <div className="sc-card sc-divide grid grid-cols-2 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="p-7 text-center">
                <div className="u-accent text-4xl font-extrabold tabular-nums">
                  {s.to !== undefined ? <Counter to={s.to} suffix={s.suffix} /> : s.text}
                </div>
                <div className="u-soft mt-1.5 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ===== Шийдэл ===== */}
      <section id="solutions" className="relative mx-auto max-w-6xl px-6 py-24">
        <Head
          eyebrow="Шийдэл"
          title="Манай шийдэл"
          text="Бид танай байгууллагыг биет болон дижитал ертөнцөд бүрэн аюулгүй ажиллаж, цахим шилжилтийн боломжийг өсөлт болгон хувиргахад туслах шийдлүүдийг санал болгож байна."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-5">
          <Reveal className="lg:col-span-3 lg:row-span-2">
            <SolutionCard
              Icon={CreditCard}
              title="Төлбөр тооцоо"
              text="Аюулгүй, хялбар төлбөр тооцооны боломжийг нээнэ"
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
          <div className="grid items-center gap-10 rounded-3xl bg-gradient-to-br from-[#2e1a66] via-[#4a1d7a] to-[#7b2fa8] p-8 text-white md:grid-cols-2 md:p-12">
            <div>
              <span
                className="inline-block rounded-full px-3 py-1 text-xs font-bold tracking-wider"
                style={{ background: "rgba(255,255,255,0.16)" }}
              >
                ОНЦЛОХ БҮТЭЭГДЭХҮҮН
              </span>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">Entrust Sigma DS4</h2>
              <p className="sc-on-dark-soft mt-4 text-lg leading-relaxed">
                Санхүүгийн байгууллага хэрэглэгчиддээ илүү хурдан шуурхай, өндөр чанартай,
                тусгайлсан картыг ердөө хоёрхон минутанд хэвлэх боломжтой боллоо.
              </p>
              <Link
                href="/solution/payment/issuance/instant-issuance"
                className="sc-btn sc-btn-on-dark mt-7"
              >
                Дэлгэрэнгүй <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            <ul className="space-y-3">
              {[
                "Өнгөт картыг ердөө 78 секундэд хэвлэнэ",
                "Төлбөр тооцооны картын бүх стандарт хангасан, өндөр нууцлалтай",
                "VISA, Mastercard, UnionPay, ₮ картуудыг хэвлэх боломжтой",
              ].map((t) => (
                <li
                  key={t}
                  className="flex items-start gap-3 rounded-2xl p-4"
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
        </Reveal>
      </section>

      {/* ===== Салбар ===== */}
      <section id="industries" className="relative mx-auto max-w-6xl px-6 py-24">
        <Head
          eyebrow="Салбар"
          title="Мэргэшсэн салбарууд"
          text="Банк санхүү, төрийн үйлчилгээ, мэдээллийн технологи, харилцаа холбооны салбарт төлбөрийн карт, биет болон цахим бичиг баримт, бүртгэл-баталгаажуулалт, аюулгүй байдлын шийдлийн цогцыг санал болгодог."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map(({ Icon, title, text, href }, i) => (
            <Reveal key={title} delay={(i % 3) * 0.1} className="h-full">
              <Link href={href} className="sc-card sc-card-hover block h-full p-6">
                <span className="sc-icon">
                  <Icon className="h-6 w-6" strokeWidth={1.75} />
                </span>
                <h3 className="mt-4 text-lg font-bold">{title}</h3>
                <p className="u-soft mt-1.5 text-[15px] leading-relaxed">{text}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== Бидний тухай + Хамтрагчид ===== */}
      <section id="about" className="relative mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="sc-eyebrow">Бидний тухай</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              {company.founded} оноос Монголын зах зээлд
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
            <Link href="/about" className="u-accent mt-6 inline-flex items-center gap-1 font-semibold">
              Дэлгэрэнгүй <ArrowRight className="h-4 w-4" />
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
                    "flex h-20 items-center justify-center rounded-2xl bg-white p-4 ring-1 ring-[var(--line)] transition";
                  return p.href ? (
                    <Link key={p.name} href={p.href} title={p.name} className={`${cls} hover:-translate-y-0.5 hover:shadow-md`}>
                      {logo}
                    </Link>
                  ) : (
                    <div key={p.name} title={p.name} className={cls}>
                      {logo}
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== Мэдээ ===== */}
      <section className="relative mx-auto max-w-6xl px-6 pb-24">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <Head eyebrow="Мэдээ" title="Технологийн мэдээ" />
          <Link href="/news" className="u-accent inline-flex items-center gap-1 font-semibold">
            Бүгдийг харах <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <Suspense fallback={<p className="u-soft">Мэдээ ачаалж байна...</p>}>
          <LatestNews />
        </Suspense>
      </section>

      {/* ===== Холбоо барих ===== */}
      <section id="contact" className="relative mx-auto max-w-6xl px-6 pb-24">
        <Reveal>
          <div className="grid items-stretch gap-8 rounded-3xl bg-gradient-to-br from-[#5a1f80] to-[#2e1a66] p-8 text-white md:p-12 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Холбоо барих</h2>
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
            <div className="u-fg lg:col-span-3">
              <ContactForm />
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}