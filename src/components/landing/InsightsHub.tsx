"use client";

import Link from "next/link";
import { useLanguage } from "@/components/shared/LanguageProvider";
import {
  insightCategoryLabels,
  type InsightEntry,
} from "@/lib/data/insights";

const copy = {
  zh: {
    eyebrow: "行业洞察",
    title: "从研究、产品和现场中观察 3DGS 的真实走势",
    intro:
      "这里收纳长文解读、技术深读与产业观察。每篇都保留来源链路，并把营销化表达改写成可复核的工程判断。",
    all: "全部",
    minutes: "分钟阅读",
    sourceCount: (n: number) => `${n} 条来源`,
    verified: "已核对",
    unverified: "待补硬源",
    read: "阅读全文",
  },
  en: {
    eyebrow: "Insights",
    title: "Reading the real direction of 3DGS through research, products, and field reports",
    intro:
      "A home for long-form analysis, technical deep dives, and industry observations. Each piece keeps source links and rewrites hype into checkable engineering judgment.",
    all: "All",
    minutes: "min read",
    sourceCount: (n: number) => `${n} sources`,
    verified: "Verified",
    unverified: "Needs stronger sources",
    read: "Read insight",
  },
} as const;

export function InsightsHub({ insights }: { insights: InsightEntry[] }) {
  const { language } = useLanguage();
  const t = copy[language];
  const categories = [...new Set(insights.map((item) => item.category))];

  return (
    <main className="min-h-screen bg-[#050505] px-5 pb-24 pt-28 text-[#f7f4ed] sm:px-10 sm:pt-32 lg:px-16 lg:pt-36">
      <section className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[0.52em] text-white/38">{t.eyebrow}</p>
        <div className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <h1 className="text-4xl font-semibold leading-[1.03] tracking-[-0.07em] text-white sm:text-6xl lg:text-7xl">
            {t.title}
          </h1>
          <p className="max-w-2xl text-base leading-8 text-white/64 sm:text-lg">{t.intro}</p>
        </div>
      </section>

      <section className="mx-auto mt-14 max-w-6xl">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full border border-white/14 bg-white/[0.06] px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/70">
            {t.all} · {insights.length}
          </span>
          {categories.map((category) => (
            <span
              key={category}
              className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/44"
            >
              {insightCategoryLabels[category][language]}
            </span>
          ))}
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {insights.map((insight) => {
            const label = insightCategoryLabels[insight.category][language];
            return (
              <Link
                key={insight.slug}
                href={`/insights/${insight.slug}`}
                className="group rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 transition hover:-translate-y-1 hover:border-white/24 hover:bg-white/[0.07] sm:p-7"
              >
                <div className="flex flex-wrap items-center gap-2 text-[0.64rem] uppercase tracking-[0.28em] text-white/38">
                  <span>{label}</span>
                  <span aria-hidden>·</span>
                  <span>{insight.readingMinutes} {t.minutes}</span>
                  <span aria-hidden>·</span>
                  <span>{t.sourceCount(insight.sources.length)}</span>
                  <span aria-hidden>·</span>
                  <span>{insight.verified ? t.verified : t.unverified}</span>
                </div>
                <h2 className="mt-5 text-2xl font-semibold leading-tight tracking-[-0.04em] text-white sm:text-3xl">
                  {insight.title[language]}
                </h2>
                <p className="mt-4 text-sm leading-7 text-white/58">{insight.summary[language]}</p>
                <div className="mt-7 flex items-center justify-between gap-4 text-xs uppercase tracking-[0.24em] text-white/44">
                  <span>{insight.publishedAt}</span>
                  <span className="text-white/70 transition group-hover:text-white">{t.read}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
