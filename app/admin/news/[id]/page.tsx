import { Suspense } from "react";
import { notFound } from "next/navigation";
import NewsForm from "@/components/admin/NewsForm";
import { requireAdmin } from "@/lib/auth";
import { getNewsRow } from "@/lib/db";

async function Form({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const news = await getNewsRow(Number((await params).id));
  if (!news) notFound();
  return <NewsForm news={news} today={news.published_at} />;
}

export default function EditNewsPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <section className="mx-auto max-w-3xl">
      <p className="sc-eyebrow">Мэдээ</p>
      <h1 className="mb-8 mt-2 text-3xl font-extrabold tracking-tight">Мэдээ засах</h1>
      <Suspense fallback={<p className="u-soft">Ачаалж байна...</p>}>
        <Form params={params} />
      </Suspense>
    </section>
  );
}
