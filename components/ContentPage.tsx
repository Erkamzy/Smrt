/* eslint-disable @next/next/no-img-element -- зургууд smrt.mn-ээс шууд ачаалагдана */
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check, ChevronRight } from "lucide-react";
import { breadcrumbs, childrenOf, getPage, groupBlocks, preview, type Block } from "@/lib/pages";

function BlockView({ b }: { b: Block }) {
  switch (b.t) {
    case "h":
      return b.l <= 2 ? (
        <h2 className="pt-6 text-2xl font-extrabold tracking-tight sm:text-3xl">{b.x}</h2>
      ) : (
        <h3 className="pt-3 text-lg font-bold">{b.x}</h3>
      );
    case "p":
      return <p className="u-soft text-lg leading-relaxed">{b.x}</p>;
    case "ul":
      return (
        <ul className="grid gap-3 sm:grid-cols-2">
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
        <figure className="sc-card flex justify-center overflow-hidden bg-white p-4">
          <img src={b.src} alt={b.alt} loading="lazy" className="max-h-80 w-auto object-contain" />
        </figure>
      );
  }
}

function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-5">
      {groupBlocks(blocks).map((g, i) => {
        switch (g.k) {
          case "block":
            return <BlockView key={i} b={g.b} />;
          case "chips":
            return (
              <div key={i} className="flex flex-wrap gap-3 pt-6">
                {g.items.map((x) => (
                  <span key={x} className="rounded-full bg-[var(--accent-strong)] px-4 py-2 text-sm font-bold text-white">
                    {x}
                  </span>
                ))}
              </div>
            );
          case "tiles":
            return (
              <div key={i} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {g.items.map((x) => (
                  <div key={x} className="sc-card flex items-center gap-3 p-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--surface-2)] text-[var(--accent)]">
                      <Check className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-semibold leading-snug">{x}</span>
                  </div>
                ))}
              </div>
            );
          case "stats":
            return (
              <div key={i} className="grid grid-cols-2 gap-4 pt-6 sm:grid-cols-3 lg:grid-cols-4">
                {g.items.map((s) => (
                  <div key={s.n + s.label} className="sc-card p-5">
                    <div className="u-accent text-3xl font-extrabold tabular-nums">{s.n}</div>
                    <div className="u-soft mt-1.5 text-sm leading-snug">{s.label}</div>
                  </div>
                ))}
              </div>
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
  let blocks = children.length && firstImg >= 0 ? page.blocks.slice(0, firstImg) : page.blocks;

  // Хамтрагчийн хуудас: эхний зураг нь лого тул танилцуулгын хажууд жижиг картанд харуулна
  let logo: Extract<Block, { t: "img" }> | null = null;
  let intro: Block[] = [];
  if (page.path.startsWith("/partners/") && firstImg >= 0) {
    logo = page.blocks[firstImg] as Extract<Block, { t: "img" }>;
    const rest = page.blocks.filter((_, i) => i !== firstImg);
    const firstH = rest.findIndex((b) => b.t === "h");
    const cut = firstH < 0 ? rest.length : firstH;
    intro = rest.slice(0, cut);
    blocks = rest.slice(cut);
  }

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

        {logo ? (
          <div className="mt-4 grid items-center gap-8 md:grid-cols-[1fr_16rem]">
            <div>
              <h1 className="animate-fade-up text-4xl font-extrabold tracking-tight sm:text-5xl">{page.title}</h1>
              <div className="mt-6 space-y-4">
                {intro.map((b, i) => (
                  <BlockView key={i} b={b} />
                ))}
              </div>
            </div>
            <div className="sc-card order-first flex h-40 items-center justify-center bg-white p-6 md:order-none">
              <img src={logo.src} alt={page.title} className="max-h-full w-auto object-contain" />
            </div>
          </div>
        ) : (
          <h1 className="animate-fade-up mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">{page.title}</h1>
        )}

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
