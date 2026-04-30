import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GalleryDetail } from "@/components/landing/GalleryDetail";
import { splatWorks, splatWorksBySlug } from "@/lib/data/gallery";
import { dynamicPageMetadata, notFoundMetadata } from "@/lib/seo-metadata";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return splatWorks.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<Params> },
): Promise<Metadata> {
  const { slug } = await params;
  const work = splatWorksBySlug[slug];
  if (!work) return notFoundMetadata;
  return dynamicPageMetadata(work.title.zh, work.description.zh);
}

export default async function GalleryWorkPage(
  { params }: { params: Promise<Params> },
) {
  const { slug } = await params;
  const work = splatWorksBySlug[slug];
  if (!work) notFound();
  return <GalleryDetail work={work} />;
}
