import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies } from "@/lib/data";
import { LANGS, isLang } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import CaseStudyDetail from "@/components/CaseStudyDetail";

export function generateStaticParams() {
  return LANGS.flatMap((lang) =>
    caseStudies.map((c) => ({ lang, slug: c.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs || !isLang(lang)) return {};
  return buildMetadata({
    lang,
    path: `/work/${slug}`,
    name: cs.seoTitle,
    description: cs.summary,
  });
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLang(lang) || !caseStudies.some((c) => c.slug === slug)) notFound();
  return <CaseStudyDetail slug={slug} />;
}
