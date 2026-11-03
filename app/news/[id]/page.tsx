import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import NewsCard from "@/components/NewsCard";
import { getCompanyNews, getCompanyNewsById } from "@/lib/db";
import { newsList } from "@/lib/news";

export async function generateStaticParams() {
  const list = await getCompanyNews();
  // Хоосон жагсаалт build-ийг унагаах тул дор хаяж нэг утга буцаана
  return (list.length > 0 ? list : newsList).map((n) => ({ id: String(n.id) }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const item = await getCompanyNewsById(Number((await params).id));
  return item
    ? { title: `${item.title} | Смарткарт`, description: item.summary }
    : { title: "Мэдээ | Смарткарт" };
}

async function NewsContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await getCompanyNewsById(Number(id));

  if (!item) notFound();

  const others = (await getCompanyNews()).filter((n) => n.id !== item.id).slice(0, 3);

  return (
    <>
      <article className="animate-fade-up mx-auto max-w-3xl">
        <Link
          href="/news"
          className="u-accent mb-6 inline-flex items-center gap-1 text-sm font-semibold"
        >
          <ArrowLeft className="h-4 w-4" /> Бүх мэдээ
        </Link>

        <div>
          <span className="rounded-full bg-[#7b2fa8] px-3 py-1 text-xs font-semibold text-white">
            {item.category}
          </span>
        </div>
        <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">
          {item.title}
        </h1>
        <time className="u-soft mt-3 block text-sm">{item.date}</time>

        {item.image && (
          <div className="sc-card relative mt-8 h-64 w-full overflow-hidden sm:h-96">
            <Image
              src={item.image}
              alt={item.title}
              fill
              priority
              unoptimized={item.image.startsWith("http")}
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>
        )}

        <div className="u-soft mt-8 space-y-5 text-lg leading-relaxed">
          {item.content.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </article>

      {others.length > 0 && (
        <section className="mx-auto mt-20 max-w-6xl">
          <h2 className="mb-6 text-2xl font-bold">Бусад мэдээ</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((n) => (
              <NewsCard key={n.id} {...n} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

export default function NewsDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <main className="u-bg u-fg min-h-screen px-6 pb-24 pt-32">
      <Suspense fallback={<p className="u-soft mx-auto max-w-3xl">Ачаалж байна...</p>}>
        <NewsContent params={params} />
      </Suspense>
    </main>
  );
}