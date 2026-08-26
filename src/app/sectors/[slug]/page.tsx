import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sectors } from "@/lib/data";
import SectorDetail from "@/components/SectorDetail";

export function generateStaticParams() {
  return sectors.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const sec = sectors.find((s) => s.slug === slug);
  if (!sec) return {};
  const title = `${sec.title.en} | ${sec.title.el} · Akos Digital Services`;
  const description = `${sec.hook.en} // ${sec.hook.el}`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      locale: "el_GR",
      alternateLocale: ["en_US"],
      type: "website",
      images: [{ url: "/og/cover.jpg", width: 1280, height: 720 }],
    },
  };
}

export default async function SectorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!sectors.some((s) => s.slug === slug)) notFound();
  return <SectorDetail slug={slug} />;
}
