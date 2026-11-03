import { Suspense } from "react";
import NewsForm from "@/components/admin/NewsForm";
import { requireAdmin } from "@/lib/auth";

async function Form() {
  await requireAdmin();
  const today = new Date().toLocaleDateString("sv-SE", { timeZone: "Asia/Ulaanbaatar" });
  return <NewsForm today={today} />;
}

export default function NewNewsPage() {
  return (
    <section className="mx-auto max-w-3xl">
      <p className="sc-eyebrow">Мэдээ</p>
      <h1 className="mb-8 mt-2 text-3xl font-extrabold tracking-tight">Шинэ мэдээ</h1>
      <Suspense fallback={<p className="u-soft">Ачаалж байна...</p>}>
        <Form />
      </Suspense>
    </section>
  );
}
