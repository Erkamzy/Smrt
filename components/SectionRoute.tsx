import { Suspense } from "react";
import ContentPage from "@/components/ContentPage";
import { getPage, slugsUnder } from "@/lib/pages";

type Props = { params: Promise<{ slug?: string[] }> };

// /solution, /industry, /partners хуудсуудын нийтлэг route
export function sectionRoute(section: string) {
  const toPath = (slug?: string[]) => [section, ...(slug ?? [])].join("/");

  async function Content({ params }: Props) {
    return <ContentPage path={toPath((await params).slug)} />;
  }

  return {
    generateStaticParams: () => slugsUnder(section),

    generateMetadata: async ({ params }: Props) => {
      const page = getPage(toPath((await params).slug));
      return { title: page ? `${page.title} | Смарткарт` : "Смарткарт" };
    },

    Page: function SectionPage({ params }: Props) {
      return (
        <Suspense fallback={<main className="u-bg min-h-screen" />}>
          <Content params={params} />
        </Suspense>
      );
    },
  };
}
