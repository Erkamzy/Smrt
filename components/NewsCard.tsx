import Image from "next/image";
import Link from "next/link";
import type { News } from "@/lib/news";

export default function NewsCard({
  id,
  category,
  title,
  summary,
  date,
  image,
  url,
}: News) {
  const card = (
    <article className="h-full overflow-hidden rounded-2xl bg-white/10 shadow-lg ring-1 ring-white/10 backdrop-blur transition duration-300 group-hover:-translate-y-1 group-hover:bg-white/15 group-hover:shadow-2xl group-hover:shadow-purple-900/50">
      <div className="relative h-48 w-full overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#7B2FA8]/60 to-[#2E1A66]">
            <span className="text-5xl opacity-60">📰</span>
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-[#7B2FA8] px-3 py-1 text-xs font-semibold">
          {category}
        </span>
      </div>

      <div className="flex flex-col gap-3 p-5">
        <time className="text-xs text-purple-200/70">{date}</time>
        <h3 className="line-clamp-3 text-lg font-bold leading-snug">{title}</h3>
        <p className="line-clamp-3 text-sm text-purple-100/80">{summary}</p>
        <span className="mt-2 text-sm font-semibold text-purple-300 transition group-hover:text-purple-200">
          {url ? "Эх сайтаас унших ↗" : "Дэлгэрэнгүй →"}
        </span>
      </div>
    </article>
  );

  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block h-full"
      >
        {card}
      </a>
    );
  }

  return (
    <Link href={`/news/${id}`} className="group block h-full">
      {card}
    </Link>
  );
}