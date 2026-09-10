import type { Metadata } from "next";
import { notFound } from "next/navigation";
import WorkIndex from "@/components/WorkIndex";
import { isLang } from "@/lib/i18n";
import { staticPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return staticPageMetadata("work", lang);
}

export default async function Work({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  return <WorkIndex />;
}
