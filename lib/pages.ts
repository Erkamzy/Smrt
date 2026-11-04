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
