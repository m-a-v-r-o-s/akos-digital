import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicesIndex from "@/components/ServicesIndex";
import { isLang } from "@/lib/i18n";
import { staticPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return staticPageMetadata("services", lang);
}

export default async function Services({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  return <ServicesIndex />;
}
