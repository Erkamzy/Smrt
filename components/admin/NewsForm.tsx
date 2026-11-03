"use client";

import { useActionState } from "react";
import Link from "next/link";
import { saveNews, type FormState } from "@/app/admin/actions";
import type { NewsRow } from "@/lib/db";

const CATEGORIES = ["Мэдээ", "Технологи", "Арга хэмжээ", "Хамтын ажиллагаа", "Бүтээгдэхүүн"];

export default function NewsForm({ news, today }: { news?: NewsRow; today: string }) {
  const [state, action, pending] = useActionState<FormState, FormData>(saveNews, {});

  return (
    <form action={action} className="sc-card grid gap-5 p-7" style={{ boxShadow: "none" }}>
      {news && <input type="hidden" name="id" value={news.id} />}

      <div>
        <label htmlFor="title" className="sc-label">Гарчиг *</label>
        <input id="title" name="title" required minLength={3} defaultValue={news?.title} className="sc-input" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="category" className="sc-label">Ангилал</label>
          <input
            id="category"
            name="category"
            list="categories"
            defaultValue={news?.category ?? "Мэдээ"}
            className="sc-input"
          />
          <datalist id="categories">
            {CATEGORIES.map((c) => <option key={c} value={c} />)}
          </datalist>
        </div>
        <div>
          <label htmlFor="published_at" className="sc-label">Огноо *</label>
          <input
            id="published_at"
            name="published_at"
            type="date"
            required
            defaultValue={news?.published_at ?? today}
            className="sc-input"
          />
        </div>
      </div>

      <div>
        <label htmlFor="summary" className="sc-label">Товч агуулга (хоосон бол эхний догол мөрөөс авна)</label>
        <textarea id="summary" name="summary" rows={2} maxLength={300} defaultValue={news?.summary} className="sc-input" />
      </div>

      <div>
        <label htmlFor="content" className="sc-label">Агуулга * (догол мөрийг хоосон мөрөөр тусгаарлана)</label>
        <textarea
          id="content"
          name="content"
          required
          rows={10}
          defaultValue={news?.content.join("\n\n")}
          className="sc-input resize-y"
        />
      </div>

      <div>
        <label htmlFor="image" className="sc-label">Зураг (JPG, PNG, WEBP · ≤4MB)</label>
        {news?.image && (
          <div className="mb-3 flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={news.image} alt="" className="h-20 w-32 rounded-lg object-cover" />
            <label className="u-soft flex items-center gap-2 text-sm">
              <input type="checkbox" name="remove_image" /> Зургийг хасах
            </label>
          </div>
        )}
        <input type="hidden" name="image_url" value={news?.image ?? ""} />
        <input
          id="image"
          name="image"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="sc-input file:mr-3 file:rounded-md file:border-0 file:bg-[var(--surface-2)] file:px-3 file:py-1 file:text-sm file:font-semibold"
        />
      </div>

      <label className="flex items-center gap-2 text-sm font-medium">
        <input type="checkbox" name="published" defaultChecked={news?.published ?? true} className="h-4 w-4 accent-[#7b2fa8]" />
        Сайт дээр нийтлэх
      </label>

      {state.error && <p role="alert" className="text-sm font-medium text-red-500">{state.error}</p>}

      <div className="flex gap-3">
        <button type="submit" disabled={pending} className="sc-btn sc-btn-primary">
          {pending ? "Хадгалж байна..." : "Хадгалах"}
        </button>
        <Link href="/admin?tab=news" className="sc-btn sc-btn-ghost">Болих</Link>
      </div>
    </form>
  );
}
