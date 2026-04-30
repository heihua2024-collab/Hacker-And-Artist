import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LearningPathDetail } from "@/components/landing/LearningPathDetail";
import { learningPaths, learningPathsBySlug } from "@/lib/data/learning-paths";
import { dynamicPageMetadata, notFoundMetadata } from "@/lib/seo-metadata";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return learningPaths.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<Params> },
): Promise<Metadata> {
  const { slug } = await params;
  const path = learningPathsBySlug[slug];
  if (!path) return notFoundMetadata;
  return dynamicPageMetadata(path.title.zh, path.subtitle.zh);
}

export default async function LearningPathPage(
  { params }: { params: Promise<Params> },
) {
  const { slug } = await params;
  const path = learningPathsBySlug[slug];
  if (!path) notFound();
  return <LearningPathDetail path={path} />;
}
