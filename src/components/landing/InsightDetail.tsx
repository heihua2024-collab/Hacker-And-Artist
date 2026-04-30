"use client";

import Link from "next/link";
import { useLanguage } from "@/components/shared/LanguageProvider";
import {
  insightCategoryLabels,
  type InsightEntry,
} from "@/lib/data/insights";
import { cases } from "@/lib/data/cases";
import { news } from "@/lib/data/news";
import { tools } from "@/lib/data/tools";

const copy = {
  zh: {
    crumbs: ["印刻万物", "行业洞察"],
    author: "作者",
    published: "发布",
    minutes: "分钟阅读",
    sources: "来源",
    relatedNews: "关联动态",
    relatedCases: "关联案例",
    relatedTools: "关联工具",
    verified: "已核对公开来源",
    unverified: "含待核实陈述",
    back: "返回行业洞察",
  },
  en: {
    crumbs: ["TOP3DGS", "Insights"],
    author: "Author",
    published: "Published",
    minutes: "min read",
    sources: "Sources",
    relatedNews: "Related news",
    relatedCases: "Related cases",
    relatedTools: "Related tools",
    verified: "Cross-checked against public sources",
    unverified: "Contains statements marked for verification",
    back: "Back to insights",
  },
} as const;

export function InsightDetail({ insight }: { insight: InsightEntry }) {
  const { language } = useLanguage();
  const t = copy[language];
  const label = insightCategoryLabels[insight.category][language];
  const relatedNews = news.filter((item) =>
    insight.relatedNewsIds?.includes(item.id),
  );
  const relatedCases = cases.filter((item) =>
    insight.relatedCaseSlugs?.includes(item.slug),
  );
  const relatedTools = tools.filter((item) =>
    insight.relatedToolSlugs?.includes(item.slug),
  );

  return (
    <main className="min-h-screen bg-[#050505] px-5 pb-24 pt-28 text-[#f7f4ed] sm:px-10 sm:pt-32 lg:px-16 lg:pt-36">
      <section className="mx-auto max-w-3xl">
        <nav className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.28em] text-white/45">
          <Link href="/" className="transition hover:text-white">
            {t.crumbs[0]}
          </Link>
          <span aria-hidden>/</span>
          <Link href="/insights" className="transition hover:text-white">
            {t.crumbs[1]}
          </Link>
          <span aria-hidden>/</span>
          <span className="max-w-[min(100%,14rem)] truncate text-white/70 normal-case tracking-normal">
            {insight.title[language]}
          </span>
        </nav>

        <p className="mt-10 text-xs uppercase tracking-[0.48em] text-white/40">
          {label}
        </p>
        <h1 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-[-0.06em] text-white sm:text-6xl">
          {insight.title[language]}
        </h1>
        <p className="mt-5 text-xl leading-8 text-white/62">{insight.subtitle[language]}</p>
        <p className="mt-6 text-base leading-8 text-white/70">{insight.summary[language]}</p>

        <div className="mt-8 grid gap-3 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 text-sm text-white/58 sm:grid-cols-3">
          <p>
            <span className="block text-[0.62rem] uppercase tracking-[0.26em] text-white/34">{t.author}</span>
            <span className="mt-2 block text-white/76">{insight.author}</span>
          </p>
          <p>
            <span className="block text-[0.62rem] uppercase tracking-[0.26em] text-white/34">{t.published}</span>
            <span className="mt-2 block text-white/76">{insight.publishedAt}</span>
          </p>
          <p>
            <span className="block text-[0.62rem] uppercase tracking-[0.26em] text-white/34">{label}</span>
            <span className="mt-2 block text-white/76">
              {insight.readingMinutes} {t.minutes}
            </span>
          </p>
        </div>
        <p className="mt-4 text-sm text-white/45">
          {insight.verified ? t.verified : t.unverified}
        </p>
      </section>

      <article className="mx-auto mt-16 max-w-3xl space-y-14">
        {insight.body.map((section, index) => (
          <section key={index}>
            <h2 className="text-xl font-semibold tracking-[-0.03em] text-white sm:text-2xl">
              {section.heading[language]}
            </h2>
            <div className="mt-5 space-y-5 text-base leading-8 text-white/72">
              {section.paragraphs.map((paragraph, paragraphIndex) => (
                <p key={paragraphIndex}>{paragraph[language]}</p>
              ))}
            </div>
          </section>
        ))}
      </article>

      <section className="mx-auto mt-20 max-w-3xl space-y-10 rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl sm:p-10">
        {insight.callToAction && (
          <p className="text-base leading-8 text-white/72">{insight.callToAction[language]}</p>
        )}

        {relatedNews.length > 0 && (
          <div>
            <p className="text-[0.62rem] uppercase tracking-[0.32em] text-white/36">{t.relatedNews}</p>
            <div className="mt-4 grid gap-3">
              {relatedNews.map((item) => (
                <Link
                  key={item.id}
                  href="/news"
                  className="rounded-[1.25rem] border border-white/10 bg-white/[0.035] p-4 transition hover:border-white/24 hover:bg-white/[0.06]"
                >
                  <span className="text-sm font-medium text-white/78">{item.title[language]}</span>
                  <span className="mt-2 block text-xs text-white/40">{item.publishedAt}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {relatedCases.length > 0 && (
          <div>
            <p className="text-[0.62rem] uppercase tracking-[0.32em] text-white/36">{t.relatedCases}</p>
            <div className="mt-4 grid gap-3">
              {relatedCases.map((item) => (
                <Link
                  key={item.slug}
                  href={`/cases/${item.slug}`}
                  className="rounded-[1.25rem] border border-white/10 bg-white/[0.035] p-4 transition hover:border-white/24 hover:bg-white/[0.06]"
                >
                  <span className="text-sm font-medium text-white/78">{item.title[language]}</span>
                  <span className="mt-2 block text-xs text-white/40">{item.year ?? item.publishedAt}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {relatedTools.length > 0 && (
          <div>
            <p className="text-[0.62rem] uppercase tracking-[0.32em] text-white/36">{t.relatedTools}</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {relatedTools.map((item) => (
                <Link
                  key={item.slug}
                  href={`/tools?category=${item.category}`}
                  className="rounded-[1.25rem] border border-white/10 bg-white/[0.035] p-4 transition hover:border-white/24 hover:bg-white/[0.06]"
                >
                  <span className="text-sm font-medium text-white/78">{item.name}</span>
                  <span className="mt-2 block text-xs text-white/40">{item.tagline[language]}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div>
          <p className="text-[0.62rem] uppercase tracking-[0.32em] text-white/36">{t.sources}</p>
          <ul className="mt-4 space-y-2">
            {insight.sources.map((url) => (
              <li key={url}>
                {url.startsWith("http") ? (
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="break-all text-sm text-white/70 underline decoration-white/20 underline-offset-2 transition hover:text-white"
                  >
                    {url}
                  </a>
                ) : (
                  <span className="break-all text-sm text-white/58">{url}</span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <Link
          href="/insights"
          className="inline-flex text-sm text-white/70 underline decoration-white/25 decoration-dashed underline-offset-4 transition hover:text-white"
        >
          {t.back}
        </Link>
      </section>
    </main>
  );
}
