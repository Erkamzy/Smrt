import { Suspense } from "react";
import NewsList from "@/components/NewsLists";
import { newsList } from "@/lib/news";
import { getAllNews } from "@/lib/rss";

export const metadata = { title: "Мэдээ | Смарткарт" };

async function AllNews() {
  const external = await getAllNews();
  const items = external.length > 0 ? external : newsList;
  return <NewsList items={items} />;
}

export default function NewsPage() {
  return (
    <main className="u-bg u-fg min-h-screen px-6 pb-24 pt-32">
      <section className="mx-auto max-w-6xl">
        <p className="sc-eyebrow animate-fade-up">Мэдээ</p>
        <h1 className="animate-fade-up mb-3 mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
          Мэдээ мэдээлэл
        </h1>
        <p
          style={{ "--delay": "0.1s" } as React.CSSProperties}
          className="u-soft animate-fade-up mb-10 max-w-2xl text-lg"
        >
          Цахим хөгжил, технологийн салбарын сүүлийн үеийн мэдээ, шинэчлэл, арга хэмжээ.
        </p>
        <Suspense fallback={<p className="u-soft">Мэдээ ачаалж байна...</p>}>
          <AllNews />
        </Suspense>
      </section>
    </main>
  );
}