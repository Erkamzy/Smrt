import NewsCard from "@/components/NewsCard";
import Reveal from "@/components/Reveal";
import { getNewsFeed } from "@/lib/db";

export default async function LatestNews() {
  const feed = await getNewsFeed();

  // Зурагтай мэдээг түрүүлж гаргана
  const withImage = feed.filter((n) => n.image);
  const items = (withImage.length >= 3 ? withImage : feed).slice(0, 3);

  if (items.length === 0) {
    return <p className="u-soft">Одоогоор мэдээ алга.</p>;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => (
        <Reveal key={item.url ?? item.id} delay={i * 0.15}>
          <NewsCard {...item} />
        </Reveal>
      ))}
    </div>
  );
}
