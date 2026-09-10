import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { servicePages } from "@/lib/data";
import { LANGS, isLang } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import ServiceDetail from "@/components/ServiceDetail";

export function generateStaticParams() {
  return LANGS.flatMap((lang) =>
    servicePages.map((s) => ({ lang, slug: s.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const svc = servicePages.find((s) => s.slug === slug);
  if (!svc || !isLang(lang)) return {};
  return buildMetadata({
    lang,
    path: `/services/${slug}`,
    name: svc.seoTitle,
    description: svc.hook,
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLang(lang) || !servicePages.some((s) => s.slug === slug)) notFound();
  return <ServiceDetail slug={slug} />;
}
