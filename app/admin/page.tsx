import { Suspense } from "react";
import Link from "next/link";
import { ExternalLink, LogOut, Mail, Newspaper, Phone, Plus } from "lucide-react";
import ActionButton from "@/components/admin/ActionButton";
import { logout, deleteMessage, deleteNews, markMessage, toggleNews } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/auth";
import { listAllNews, listMessages } from "@/lib/db";
import { isDbConfigured } from "@/lib/supabase";

const fmt = (iso: string) =>
  new Date(iso).toLocaleString("mn-MN", {
    timeZone: "Asia/Ulaanbaatar",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

async function Messages() {
  const items = await listMessages();
  if (items.length === 0) return <p className="u-soft">Одоогоор хүсэлт ирээгүй байна.</p>;

  return (
    <ul className="space-y-4">
      {items.map((m) => (
        <li
          key={m.id}
          className="sc-card p-5"
          style={m.is_read ? { boxShadow: "none" } : { borderColor: "var(--accent)" }}
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-bold">
                {!m.is_read && <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[var(--accent)]" />}
                {m.name}
                {m.company && <span className="u-soft font-normal"> · {m.company}</span>}
              </p>
              <div className="u-soft mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                <a href={`mailto:${m.email}`} className="inline-flex items-center gap-1 hover:text-[var(--fg)]">
                  <Mail className="h-3.5 w-3.5" /> {m.email}
                </a>
                {m.phone && (
                  <a href={`tel:${m.phone}`} className="inline-flex items-center gap-1 hover:text-[var(--fg)]">
                    <Phone className="h-3.5 w-3.5" /> {m.phone}
                  </a>
                )}
              </div>
            </div>
            <time className="u-soft text-xs">{fmt(m.created_at)}</time>
          </div>

          <p className="mt-4 whitespace-pre-wrap leading-relaxed">{m.message}</p>

          <div className="mt-4 flex gap-2">
            <ActionButton
              action={markMessage.bind(null, m.id, !m.is_read)}
              className="bg-[var(--surface-2)] hover:opacity-80"
            >
              {m.is_read ? "Уншаагүй болгох" : "Уншсан"}
            </ActionButton>
            <ActionButton
              action={deleteMessage.bind(null, m.id)}
              confirm="Энэ хүсэлтийг устгах уу?"
              className="text-red-500 hover:bg-red-500/10"
            >
              Устгах
            </ActionButton>
          </div>
        </li>
      ))}
    </ul>
  );
}

async function NewsTable() {
  const items = await listAllNews();

  return (
    <>
      <div className="mb-5 flex justify-end">
        <Link href="/admin/news/new" className="sc-btn sc-btn-primary py-2.5 text-sm">
          <Plus className="h-4 w-4" /> Шинэ мэдээ
        </Link>
      </div>

      {items.length === 0 ? (
        <p className="u-soft">Мэдээ алга. &ldquo;Шинэ мэдээ&rdquo; товчоор нэмнэ үү.</p>
      ) : (
        <ul className="sc-card divide-y divide-[var(--line)] overflow-hidden" style={{ boxShadow: "none" }}>
          {items.map((n) => (
            <li key={n.id} className="flex flex-wrap items-center gap-4 p-4">
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold">{n.title}</p>
                <p className="u-soft mt-0.5 text-xs">
                  {n.published_at} · {n.category} ·{" "}
                  <span className={n.published ? "text-green-500" : "text-amber-500"}>
                    {n.published ? "Нийтэлсэн" : "Ноорог"}
                  </span>
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {n.published && (
                  <Link
                    href={`/news/${n.id}`}
                    target="_blank"
                    className="u-soft rounded-lg px-2 py-1.5 hover:text-[var(--fg)]"
                    aria-label="Сайт дээр харах"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                )}
                <Link
                  href={`/admin/news/${n.id}`}
                  className="rounded-lg bg-[var(--surface-2)] px-3 py-1.5 text-xs font-semibold hover:opacity-80"
                >
                  Засах
                </Link>
                <ActionButton
                  action={toggleNews.bind(null, n.id, !n.published)}
                  className="bg-[var(--surface-2)] hover:opacity-80"
                >
                  {n.published ? "Нуух" : "Нийтлэх"}
                </ActionButton>
                <ActionButton
                  action={deleteNews.bind(null, n.id)}
                  confirm={`"${n.title}" мэдээг устгах уу?`}
                  className="text-red-500 hover:bg-red-500/10"
                >
                  Устгах
                </ActionButton>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

async function Dashboard({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  await requireAdmin();
  const tab = (await searchParams).tab === "news" ? "news" : "messages";

  const tabs = [
    { id: "messages", label: "Хүсэлтүүд", Icon: Mail },
    { id: "news", label: "Мэдээ", Icon: Newspaper },
  ];

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="sc-eyebrow">Админ</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight">Удирдлагын самбар</h1>
        </div>
        <form action={logout}>
          <button className="sc-btn sc-btn-ghost py-2 text-sm">
            <LogOut className="h-4 w-4" /> Гарах
          </button>
        </form>
      </div>

      {!isDbConfigured && (
        <p className="mt-6 rounded-xl border border-amber-500/40 bg-amber-500/10 p-4 text-sm">
          Supabase тохируулагдаагүй байна. <code>.env.local</code> файлд{" "}
          <code>NEXT_PUBLIC_SUPABASE_URL</code>, <code>SUPABASE_SECRET_KEY</code> нэмээд серверийг дахин асаана уу.
        </p>
      )}

      <nav className="mt-8 flex gap-2 border-b border-[var(--line)]">
        {tabs.map(({ id, label, Icon }) => (
          <Link
            key={id}
            href={`/admin?tab=${id}`}
            className={`-mb-px inline-flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-semibold transition ${
              tab === id ? "border-[var(--accent)] u-fg" : "u-soft border-transparent hover:text-[var(--fg)]"
            }`}
          >
            <Icon className="h-4 w-4" /> {label}
          </Link>
        ))}
      </nav>

      <div className="mt-6">{tab === "news" ? <NewsTable /> : <Messages />}</div>
    </>
  );
}

export default function AdminPage({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  return (
    <section className="mx-auto max-w-5xl">
      <Suspense fallback={<p className="u-soft">Ачаалж байна...</p>}>
        <Dashboard searchParams={searchParams} />
      </Suspense>
    </section>
  );
}
