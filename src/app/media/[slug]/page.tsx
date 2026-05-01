import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MediaDetail } from "@/components/landing/MediaDetail";
import { studioWorks, studioWorksBySlug } from "@/lib/data/studio-works";
import { dynamicPageMetadata, notFoundMetadata } from "@/lib/seo-metadata";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return studioWorks.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<Params> },
): Promise<Metadata> {
  const { slug } = await params;
  const work = studioWorksBySlug[slug];
  if (!work) return notFoundMetadata;
  return dynamicPageMetadata(work.title.zh, work.description.zh);
}

export default async function MediaWorkPage(
  { params }: { params: Promise<Params> },
) {
  const { slug } = await params;
  const work = studioWorksBySlug[slug];
  if (!work) notFound();
  return <MediaDetail work={work} />;
}
