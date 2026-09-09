import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sectors } from "@/lib/data";
import { LANGS, isLang } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import SectorDetail from "@/components/SectorDetail";

export function generateStaticParams() {
  return LANGS.flatMap((lang) => sectors.map((s) => ({ lang, slug: s.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const sec = sectors.find((s) => s.slug === slug);
  if (!sec || !isLang(lang)) return {};
  return buildMetadata({
    lang,
    path: `/sectors/${slug}`,
    name: sec.seoTitle,
    description: sec.hook,
  });
}

export default async function SectorPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLang(lang) || !sectors.some((s) => s.slug === slug)) notFound();
  return <SectorDetail slug={slug} />;
}
