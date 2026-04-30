import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InsightDetail } from "@/components/landing/InsightDetail";
import { insights, insightsBySlug } from "@/lib/data/insights";
import { dynamicPageMetadata, notFoundMetadata } from "@/lib/seo-metadata";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return insights.map((insight) => ({ slug: insight.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<Params> },
): Promise<Metadata> {
  const { slug } = await params;
  const insight = insightsBySlug[slug];
  if (!insight) return notFoundMetadata;
  return dynamicPageMetadata(insight.title.zh, insight.summary.zh);
}

export default async function InsightPage(
  { params }: { params: Promise<Params> },
) {
  const { slug } = await params;
  const insight = insightsBySlug[slug];
  if (!insight) notFound();
  return <InsightDetail insight={insight} />;
}
