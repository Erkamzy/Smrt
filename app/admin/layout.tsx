import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Админ | Смарткарт",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <main className="u-bg u-fg min-h-screen px-6 pb-24 pt-32">{children}</main>;
}
