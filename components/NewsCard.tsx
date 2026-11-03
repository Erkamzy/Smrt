import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Newspaper } from "lucide-react";
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
    <article className="sc-card sc-card-hover h-full overflow-hidden">
      <div className="relative h-48 w-full overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            unoptimized={image.startsWith("http")}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#7b2fa8] to-[#2e1a66]">
            <Newspaper className="h-12 w-12 text-white/70" strokeWidth={1.5} />
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-[#7b2fa8] px-3 py-1 text-xs font-semibold text-white">
          {category}
        </span>
      </div>

      <div className="flex flex-col gap-3 p-5">
        <time className="u-soft text-xs">{date}</time>
        <h3 className="u-fg line-clamp-3 text-lg font-bold leading-snug">{title}</h3>
        <p className="u-soft line-clamp-3 text-sm leading-relaxed">{summary}</p>
        <span className="u-accent mt-1 inline-flex items-center gap-1 text-sm font-semibold">
          {url ? "Эх сайтаас унших" : "Дэлгэрэнгүй"}
          <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
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