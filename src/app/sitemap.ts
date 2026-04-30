import type { MetadataRoute } from "next";
import { cases } from "@/lib/data/cases";
import { splatWorks } from "@/lib/data/gallery";
import { insights } from "@/lib/data/insights";
import { learningArticles } from "@/lib/data/learning-articles";
import { learningPaths } from "@/lib/data/learning-paths";
import { SITE_URL } from "@/lib/seo-metadata";

export const dynamic = "force-static";

const staticRoutes = [
  "",
  "/about",
  "/cases",
  "/community",
  "/gallery",
  "/glossary",
  "/insights",
  "/learn",
  "/media",
  "/news",
  "/tools",
  "/tools/engines",
];

const toUrl = (path: string) => `${SITE_URL}${path}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    ...staticRoutes.map((route) => ({
      url: toUrl(route),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.7,
    })),
    ...learningPaths.map((path) => ({
      url: toUrl(`/learn/${path.slug}`),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...learningArticles.map((article) => ({
      url: toUrl(`/learn/articles/${article.slug}`),
      lastModified: article.publishedAt,
      changeFrequency: "monthly" as const,
      priority: 0.55,
    })),
    ...cases.map((entry) => ({
      url: toUrl(`/cases/${entry.slug}`),
      lastModified: entry.publishedAt,
      changeFrequency: "monthly" as const,
      priority: 0.55,
    })),
    ...splatWorks.map((item) => ({
      url: toUrl(`/gallery/${item.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.45,
    })),
    ...insights.map((insight) => ({
      url: toUrl(`/insights/${insight.slug}`),
      lastModified: insight.publishedAt,
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
  ];
}
