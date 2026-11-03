import NewsCard from "@/components/NewsCard";
import Reveal from "@/components/Reveal";
import { newsList } from "@/lib/news";
import { getAllNews } from "@/lib/rss";

export default async function LatestNews() {
  const external = await getAllNews();

  // Зурагтай мэдээг түрүүлж гаргана
  const withImage = external.filter((n) => n.image);
  const items = (external.length > 0 ? withImage : newsList).slice(0, 3);

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => (
        <Reveal key={item.id} delay={i * 0.15}>
          <NewsCard {...item} />
        </Reveal>
      ))}
    </div>
  );
}