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
    <article className="sc-card sc-card-hover flex h-full flex-col overflow-hidden p-2">
      <div className="relative h-52 w-full overflow-hidden rounded-[0.9rem]">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            unoptimized={image.startsWith("http")}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#6d28a8] to-[#120a20]">
            <Newspaper className="h-12 w-12 text-white/60" strokeWidth={1.25} />
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-black/55 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-white backdrop-blur-md">
          {category}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4 pt-5">
        <time className="u-mute font-mono text-xs">{date}</time>
        <h3 className="font-display u-fg line-clamp-3 text-[1.05rem] font-semibold leading-snug">{title}</h3>
        <p className="u-soft line-clamp-2 text-sm leading-relaxed">{summary}</p>
        <span className="u-accent mt-auto inline-flex items-center gap-1 pt-2 text-sm font-semibold">
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