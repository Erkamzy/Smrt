// smrt.mn-ээс хуулсан шийдэл, салбар, хамтрагчийн хуудсууд (lib/smrt-pages.json)
import data from "@/lib/smrt-pages.json";

export type Block =
  | { t: "h"; l: number; x: string }
  | { t: "p"; x: string }
  | { t: "ul"; items: string[] }
  | { t: "img"; src: string; alt: string };

export type SitePage = {
  path: string;
  title: string;
  parent: string | null;
  source: string;
  blocks: Block[];
};

const pages = data as SitePage[];
const byPath = new Map(pages.map((p) => [p.path, p]));

export const getPage = (path: string) => byPath.get(path) ?? null;

export const childrenOf = (path: string) => pages.filter((p) => p.parent === path);

export function breadcrumbs(page: SitePage): SitePage[] {
  const trail: SitePage[] = [];
  for (let p = page.parent ? getPage(page.parent) : null; p; p = p.parent ? getPage(p.parent) : null) {
    trail.unshift(p);
  }
  return trail;
}

// Картанд харуулах зураг, товч тайлбар
export function preview(page: SitePage) {
  const img = page.blocks.find((b) => b.t === "img") as Extract<Block, { t: "img" }> | undefined;
  const text = page.blocks.find((b) => b.t === "p" && b.x.length > 40) as Extract<Block, { t: "p" }> | undefined;
  const summary = text ? (text.x.length > 140 ? text.x.slice(0, 140).trimEnd() + "…" : text.x) : "";
  return { image: img?.src, summary };
}

// "/solution" хэсгийн бүх замыг generateStaticParams-д зориулж буцаана
export function slugsUnder(section: string) {
  return pages
    .filter((p) => p.path === section || p.path.startsWith(section + "/"))
    .map((p) => ({ slug: p.path.slice(section.length + 1).split("/").filter(Boolean) }));
}

// ========== Блокуудыг харагдах хэлбэрээр бүлэглэх ==========
export type Group =
  | { k: "block"; b: Block }
  | { k: "stats"; items: { n: string; label: string }[] }
  | { k: "tiles"; items: string[] }
  | { k: "chips"; items: string[] };

const isStatNumber = (x: string) => x.length <= 16 && /^[\d.,]+(\s+\p{L}+)?\+?$/u.test(x);

// smrt.mn дээр icon-той grid, тоон үзүүлэлт байсан хэсгүүд энгийн гарчгийн цуваа болж ирдэг.
// Тэдгээрийг tile / статистик карт болгож харуулна.
export function groupBlocks(blocks: Block[]): Group[] {
  const out: Group[] = [];
  let i = 0;
  while (i < blocks.length) {
    const b = blocks[i];

    // Тоо + тайлбар хос (H1 "20" + P "Улс орон")
    const stats: { n: string; label: string }[] = [];
    let j = i;
    while (j + 1 < blocks.length) {
      const h = blocks[j], p = blocks[j + 1];
      if (h.t === "h" && isStatNumber(h.x) && p.t === "p" && p.x.length <= 140) {
        stats.push({ n: h.x, label: p.x });
        j += 2;
      } else break;
    }
    if (stats.length >= 2) {
      out.push({ k: "stats", items: stats });
      i = j;
      continue;
    }

    // Дараалсан богино гарчгууд
    if (b.t === "h") {
      const big = b.l <= 2;
      let j = i;
      const run: string[] = [];
      while (j < blocks.length) {
        const c = blocks[j];
        if (c.t !== "h" || (c.l <= 2) !== big || c.x.length > 50 || isStatNumber(c.x)) break;
        run.push(c.x);
        j++;
      }
      if (big ? run.length >= 2 : run.length >= 3) {
        out.push({ k: big ? "chips" : "tiles", items: run });
        i = j;
        continue;
      }
    }

    out.push({ k: "block", b });
    i++;
  }
  return out;
}
