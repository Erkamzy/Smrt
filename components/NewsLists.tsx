"use client";

import { useState } from "react";
import NewsCard from "@/components/NewsCard";
import Reveal from "@/components/Reveal";
import type { News } from "@/lib/news";

export default function NewsList({ items }: { items: News[] }) {
  const [active, setActive] = useState("Бүгд");

  const categories = ["Бүгд", ...Array.from(new Set(items.map((n) => n.category)))];
  const filtered =
    active === "Бүгд" ? items : items.filter((n) => n.category === active);

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              active === cat
                ? "bg-[#7B2FA8] text-white shadow-lg shadow-purple-950/50"
                : "bg-white/10 text-purple-100 hover:bg-white/20"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item, i) => (
          <Reveal key={`${active}-${item.id}`} delay={(i % 3) * 0.1}>
            <NewsCard {...item} />
          </Reveal>
        ))}
      </div>
    </>
  );
}