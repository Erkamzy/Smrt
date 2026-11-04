/* eslint-disable @next/next/no-img-element -- зургууд smrt.mn-ээс шууд ачаалагдана */
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { breadcrumbs, childrenOf, getPage, preview, type Block } from "@/lib/pages";

function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-5">
      {blocks.map((b, i) => {
        switch (b.t) {
          case "h":
            return b.l <= 2 ? (
              <h2 key={i} className="pt-6 text-2xl font-extrabold tracking-tight sm:text-3xl">{b.x}</h2>
            ) : (
              <h3 key={i} className="pt-3 text-lg font-bold">{b.x}</h3>
            );
          case "p":
            return <p key={i} className="u-soft text-lg leading-relaxed">{b.x}</p>;
          case "ul":
            return (
              <ul key={i} className="grid gap-3 sm:grid-cols-2">
                {b.items.map((item, j) => (
                  <li key={j} className="sc-card flex gap-3 p-4 text-sm leading-relaxed">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );
          case "img":
            return (
              <figure key={i} className="sc-card overflow-hidden bg-white">
                <img src={b.src} alt={b.alt} loading="lazy" className="mx-auto max-h-[28rem] w-auto object-contain" />
              </figure>
            );
        }
      })}
    </div>
  );
}

export default function ContentPage({ path }: { path: string }) {
  const page = getPage(path);
  if (!page) notFound();

  const trail = breadcrumbs(page);
  const children = childrenOf(page.path);
  // Дэд хуудастай бол эхний зургаас өмнөх танилцуулгыг л харуулж, үлдсэнийг картаар солино
  const firstImg = page.blocks.findIndex((b) => b.t === "img");
  const blocks = children.length && firstImg >= 0 ? page.blocks.slice(0, firstImg) : page.blocks;

  return (
    <main className="u-bg u-fg min-h-screen px-6 pb-24 pt-32">
      <div className="mx-auto max-w-4xl">
        <nav aria-label="Breadcrumb" className="u-soft flex flex-wrap items-center gap-1 text-sm">
          <Link href="/" className="hover:text-[var(--fg)]">Нүүр</Link>
          {trail.map((p) => (
            <span key={p.path} className="flex items-center gap-1">
              <ChevronRight className="h-4 w-4" />
              <Link href={p.path} className="hover:text-[var(--fg)]">{p.title}</Link>
            </span>
          ))}
        </nav>

        <h1 className="animate-fade-up mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">{page.title}</h1>

        <div className="mt-10">
          <Blocks blocks={blocks} />
        </div>
      </div>

      {children.length > 0 && (
        <section className="mx-auto mt-16 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {children.map((c) => {
            const { image, summary } = preview(c);
            return (
              <Link key={c.path} href={c.path} className="group block h-full">
                <article className="sc-card sc-card-hover h-full overflow-hidden">
                  {image && (
                    <div className="h-44 overflow-hidden bg-white">
                      <img src={image} alt="" loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                    </div>
                  )}
                  <div className="p-5">
                    <h2 className="text-lg font-bold">{c.title}</h2>
                    {summary && <p className="u-soft mt-2 line-clamp-3 text-sm leading-relaxed">{summary}</p>}
                    <span className="u-accent mt-3 inline-flex items-center gap-1 text-sm font-semibold">
                      Дэлгэрэнгүй <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </article>
              </Link>
            );
          })}
        </section>
      )}

      <section className="sc-card mx-auto mt-20 flex max-w-4xl flex-col items-start gap-4 p-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold">Энэ шийдлийн талаар илүү ихийг мэдэх үү?</h2>
          <p className="u-soft mt-1 text-sm">Манай мэргэжилтнүүд танд тохирох шийдлийг санал болгоно.</p>
        </div>
        <Link href="/#contact" className="sc-btn sc-btn-primary">Холбоо барих</Link>
      </section>
    </main>
  );
}
