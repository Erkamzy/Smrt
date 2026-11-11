import Image from "next/image";

type Logo = { name: string; logo: string };

// Логонууд тасралтгүй гулсана. Жагсаалтыг хоёр давтаж, -50% хүртэл гүйлгэснээр завсаргүй эргэлдэнэ.
export default function LogoMarquee({
  items,
  reverse = false,
  duration = 40,
}: {
  items: Logo[];
  reverse?: boolean;
  duration?: number;
}) {
  const tile = (p: Logo, hidden: boolean) => (
    <div
      key={(hidden ? "b-" : "a-") + p.name}
      title={p.name}
      aria-hidden={hidden || undefined}
      className="flex h-20 w-44 shrink-0 items-center justify-center rounded-2xl bg-white p-4 ring-1 ring-[var(--line)] transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:h-24 sm:w-52"
    >
      <span className="relative block h-full w-full">
        <Image src={p.logo} alt={hidden ? "" : p.name} fill sizes="208px" className="object-contain" />
      </span>
    </div>
  );

  return (
    <div
      className="sc-marquee py-2"
      data-reverse={reverse || undefined}
      style={{ "--duration": `${duration}s` } as React.CSSProperties}
    >
      <div className="sc-marquee-track">
        {items.map((p) => tile(p, false))}
        {items.map((p) => tile(p, true))}
      </div>
    </div>
  );
}
