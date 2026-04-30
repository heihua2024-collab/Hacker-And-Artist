import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LearningArticleDetail } from "@/components/landing/LearningArticleDetail";
import {
  learningArticles,
  learningArticlesBySlug,
} from "@/lib/data/learning-articles";
import { dynamicPageMetadata, notFoundMetadata } from "@/lib/seo-metadata";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return learningArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<Params> },
): Promise<Metadata> {
  const { slug } = await params;
  const article = learningArticlesBySlug[slug];
  if (!article) return notFoundMetadata;
  return dynamicPageMetadata(article.title.zh, article.summary.zh);
}

export default async function LearningArticlePage(
  { params }: { params: Promise<Params> },
) {
  const { slug } = await params;
  const article = learningArticlesBySlug[slug];
  if (!article) notFound();
  return <LearningArticleDetail article={article} />;
}
