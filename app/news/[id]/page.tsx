import { Suspense } from "react";
import NewsList from "@/components/NewsLists";
import { newsList } from "@/lib/news";
import { getAllNews } from "@/lib/rss";

export const metadata = { title: "Мэдээ | Smartcard" };

async function AllNews() {
  const external = await getAllNews();
  const items = external.length > 0 ? external : newsList;
  return <NewsList items={items} />;
}

export default function NewsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#1a0b3d] via-[#2E1A66] to-[#1a0b3d] px-6 pb-16 pt-28 text-white">
      <section className="mx-auto max-w-6xl">
        <h1 className="animate-fade-up mb-2 text-4xl font-extrabold sm:text-5xl">
          Мэдээ мэдээлэл
        </h1>
        <p
          style={{ "--delay": "0.1s" } as React.CSSProperties}
          className="animate-fade-up mb-10 text-purple-200/80"
        >
          Бидний сүүлийн үеийн мэдээ, шинэчлэлт, арга хэмжээ.
        </p>
        <Suspense fallback={<p className="text-purple-200/70">Мэдээ ачаалж байна...</p>}>
          <AllNews />
        </Suspense>
      </section>
    </main>
  );
}