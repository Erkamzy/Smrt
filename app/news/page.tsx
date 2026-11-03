import { Suspense } from "react";
import NewsList from "@/components/NewsLists";
import { getNewsFeed } from "@/lib/db";

export const metadata = { title: "Мэдээ | Смарткарт" };

async function AllNews() {
  const items = await getNewsFeed();
  if (items.length === 0) return <p className="u-soft">Одоогоор мэдээ алга.</p>;
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