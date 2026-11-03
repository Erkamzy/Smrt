import Image from "next/image";
import Counter from "@/components/Counter";

export const metadata = { title: "Бидний тухай | Smartcard" };

const stats = [
  { to: 25, suffix: "+", label: "Жилийн туршлага" },
  { to: 100, suffix: "+", label: "Хамтрагч байгууллага" },
  { text: "24/7", label: "Дэмжлэг" },
];

const values = [
  { icon: "🔒", title: "Харилцагч", text: "Бид харилцагч бүрийн хэрэгцээ шаардлагыг ойлгож, түүнд нь тохирсон шийдэл хүргэдэг." },
  { icon: "⚡", title: "Найдвартай байдал", text: "Бидний мэргэжлийн түвшин хариуцлага, найдвартай ажиллагаагаар тодорхойлогддог." },
  { icon: "🤝", title: "Туршлага", text: "Бидний хуримтлуулсан туршлага харилцагчдад маань үнэ цэнийг нэмдэг." },
];

const d = (s: number) => ({ "--delay": `${s}s` } as React.CSSProperties);

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#1a0b3d] via-[#2E1A66] to-[#1a0b3d] px-6 pb-16 pt-28 text-white">
      {/* Танилцуулга */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
        <div>
          <h1 className="animate-fade-up text-4xl font-extrabold sm:text-5xl">
            Бидний тухай
          </h1>
          <p style={d(0.1)} className="animate-fade-up mt-6 text-lg leading-relaxed text-purple-100/90">
            Смарткарт ХХК нь 1998 онд үүсгэн байгуулагдсан бөгөөд төлбөр тооцооны шийдэл, өгөгдөл хамгааллын систем болон хувь хүний мэдээллийн бүртгэлийн цахим системийг Монголын зах зээлд анхлан нэвтрүүлсэн.

            Бид 25 жилийн турш хувь хүний мэдээллийн цахим бүртгэл, аюулгүй байдлын шийдэл, аюулгүй төлбөр тооцооны бүтээгдэхүүн болон шийдлийг засгийн газар, харилцаа холбоо болон банк санхүүгийн салбарт нийлүүлж, Монгол Улсад мэдээллийн технологийн салбарыг хөгжүүлэхэд хувь нэмэр оруулж байна. Бид салбартаа мэргэшсэн байгууллагын хувиар Thales, Entrust зэрэг олон улсын технологийн тэргүүлэх компаниудын хамтаар найдвартай үйлчилгээ үзүүлж, харилцагч нартаа онцгой үнэ цэн үүсгэсээр ирсэн.

            Бид Монгол улсын ирээдүйн цахим шилжилтийг дэмжиж, иргэн бүрийн мэдээллийн аюулгүй байдлыг хангахад хувь нэмрээ оруулсаар ирсэн билээ.
          </p>
          <p style={d(0.2)} className="animate-fade-up mt-4 text-lg leading-relaxed text-purple-100/90">
            Бид шинэ технологийг байнга судалж, үйлчилгээгээ тасралтгүй
            сайжруулдаг.
          </p>
        </div>

        <div
          style={d(0.2)}
          className="animate-fade-up rounded-3xl bg-white p-8 shadow-2xl shadow-purple-950/60 ring-4 ring-[#7B2FA8]/40"
        >
          <Image
            src="/image002.png"
            alt="Smartcard"
            width={620}
            height={200}
            className="h-auto w-full"
          />
        </div>
      </section>

      {/* Тоон үзүүлэлт */}
{/* Тоон үзүүлэлт */}
<section className="mx-auto mt-20 grid max-w-6xl gap-6 sm:grid-cols-3">
  {stats.map((s, i) => (
    <div
      key={s.label}
      style={d(0.3 + i * 0.1)}
      className="animate-fade-up rounded-2xl bg-white/10 p-8 text-center ring-1 ring-white/10 backdrop-blur"
    >
      <div className="text-4xl font-extrabold text-purple-300">
        {s.to !== undefined ? (
          <Counter to={s.to} suffix={s.suffix} />
        ) : (
          s.text
        )}
      </div>
      <div className="mt-2 text-sm text-purple-100/80">{s.label}</div>
    </div>
  ))}
</section>
      {/* Үнэт зүйлс */}
      <section className="mx-auto mt-20 max-w-6xl">
        <h2 className="mb-8 text-3xl font-bold">Бидний үнэт зүйлс</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {values.map((v, i) => (
            <div
              key={v.title}
              style={d(0.5 + i * 0.1)}
              className="animate-fade-up rounded-2xl bg-white/10 p-6 ring-1 ring-white/10 backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white/15"
            >
              <div className="text-3xl">{v.icon}</div>
              <h3 className="mt-4 text-xl font-bold">{v.title}</h3>
              <p className="mt-2 text-sm text-purple-100/80">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Холбоо барих */}
      <section className="mx-auto mt-20 max-w-6xl rounded-3xl bg-[#7B2FA8]/30 p-10 text-center ring-1 ring-white/10">
        <h2 className="text-2xl font-bold">Холбоо барих</h2>
        <p className="mt-3 text-purple-100/90">
          Асуулт, санал хүсэлтээ бидэнд илгээгээрэй.
        </p>
        <a
          href="https://smrt.mn"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block rounded-full bg-[#7B2FA8] px-8 py-3 font-semibold shadow-lg transition hover:scale-105 hover:bg-[#9440C4]"
        >
          smrt.mn руу очих
        </a>
      </section>
    </main>
  );
}