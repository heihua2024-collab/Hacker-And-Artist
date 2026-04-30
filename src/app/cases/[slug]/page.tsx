import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseDetail } from "@/components/landing/CaseDetail";
import { cases, casesBySlug } from "@/lib/data/cases";
import { dynamicPageMetadata, notFoundMetadata } from "@/lib/seo-metadata";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<Params> },
): Promise<Metadata> {
  const { slug } = await params;
  const entry = casesBySlug[slug];
  if (!entry) return notFoundMetadata;
  return dynamicPageMetadata(entry.title.zh, entry.summary.zh);
}

export default async function CaseDetailPage(
  { params }: { params: Promise<Params> },
) {
  const { slug } = await params;
  const entry = casesBySlug[slug];
  if (!entry) notFound();
  return <CaseDetail entry={entry} />;
}
