import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies } from "@/lib/data";
import { LANGS, isLang } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import CaseStudyDetail from "@/components/CaseStudyDetail";
import InternationalDetail from "@/components/InternationalDetail";

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
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!isLang(lang) || !cs) notFound();
  // One study is a build with no live site to open, so it carries its own
  // layout instead of the challenge/approach/outcome shape.
  return cs.bespoke ? <InternationalDetail /> : <CaseStudyDetail slug={slug} />;
}
