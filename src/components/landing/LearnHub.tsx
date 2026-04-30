"use client";

import Link from "next/link";
import { useLanguage } from "@/components/shared/LanguageProvider";
import { GlossaryExplorer } from "@/components/landing/GlossaryExplorer";
import type { LearningArticle } from "@/lib/data/learning-articles";
import { learningPathStubs } from "@/lib/data/learning-paths";
import { milestoneCases } from "@/lib/data/cases";

const copy = {
  zh: {
    eyebrow: "学习路径 / Learn",
    title: "为不同起点，铺一条到达高斯泼溅的路。",
    description:
      "四条结构化学习路径已经成形，从「零基础理解」到「空间叙事实验」。下方配套延伸笔记与术语图谱，让路线、概念和工具互相对齐。",
    pathsHeading: "首批学习路径",
    pathsSubheading: "四条路径，一张地图",
    pathsNote: "四条路径均可进入，按起点选择。",
    enter: "进入路径",
    comingSoon: "敬请期待",
    moduleSuffix: "模块",
    milestonesEyebrow: "延伸阅读 · 研究里程碑",
    milestonesTitle: "塑造了 3DGS 范式的论文与工具",
    milestonesNote: "想读源头？这里是当代高斯泼溅工程范式的几篇关键论文与开源工具。",
    milestoneRead: "查看",
    articlesEyebrow: "延伸笔记",
    articlesTitle: "与路径配套的短文",
    articlesNote: "由历史外链整理并重写，便于站内阅读与检索。",
    articlesRead: "阅读",
    pathLabel: "路径",
    moduleLabel: "模块",
    sourceCount: (n: number) => `${n} 条来源`,
    verified: "已核对",
    unverified: "待补源",
  },
  en: {
    eyebrow: "Learn",
    title: "Make a path to Gaussian Splatting from any starting point.",
    description:
      "Four structured learning paths are now shaped, from first principles to spatial narrative experiments, paired with notes and a glossary.",
    pathsHeading: "Learning Paths",
    pathsSubheading: "Four paths, one map",
    pathsNote: "All four paths are available.",
    enter: "Enter Path",
    comingSoon: "Coming soon",
    moduleSuffix: "modules",
    milestonesEyebrow: "Further Reading · Research Milestones",
    milestonesTitle: "Papers & tools that shaped the 3DGS paradigm",
    milestonesNote:
      "Want to read the source? Here are the key papers and open-source tools defining today's Gaussian Splatting engineering.",
    milestoneRead: "View",
    articlesEyebrow: "Extended notes",
    articlesTitle: "Short reads aligned to paths",
    articlesNote: "Forked from legacy links, rewritten for on-site reading.",
    articlesRead: "Read",
    pathLabel: "Path",
    moduleLabel: "Module",
    sourceCount: (n: number) => `${n} sources`,
    verified: "Verified",
    unverified: "Needs sources",
  },
} as const;

export function LearnHub({ articles }: { articles: LearningArticle[] }) {
  const { language } = useLanguage();
  const t = copy[language];
  const pathsBySlug = new Map(learningPathStubs.map((path) => [path.slug, path]));

  return (
    <main className="min-h-screen bg-[#050505] px-5 pb-24 pt-28 text-[#f7f4ed] sm:px-10 sm:pt-32 lg:px-16 lg:pt-36">
      <section className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[0.5em] text-white/40">
          {t.eyebrow}
        </p>
        <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[0.96] tracking-[-0.07em] sm:text-7xl">
          {t.title}
        </h1>
        <p className="mt-7 max-w-3xl text-lg leading-8 text-white/62">
          {t.description}
        </p>
      </section>

      <section className="mx-auto mt-20 max-w-6xl">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.42em] text-white/36">
              {t.pathsHeading}
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
              {t.pathsSubheading}
            </h2>
          </div>
          <span className="hidden rounded-full border border-white/12 px-4 py-2 text-xs uppercase tracking-[0.26em] text-white/42 sm:inline-flex">
            {t.pathsNote}
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {learningPathStubs.map((path) => {
            const isLive = path.status === "live";
            const card = (
              <article
                className={`relative flex h-full min-h-[20rem] flex-col rounded-[2rem] border p-6 backdrop-blur-xl transition ${
                  isLive
                    ? "border-white/16 bg-white/[0.07] hover:border-white/32 hover:bg-white/[0.1]"
                    : "border-white/10 bg-white/[0.04]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/32">{path.index}</span>
                  {isLive && (
                    <span className="rounded-full bg-emerald-300/14 px-2.5 py-0.5 text-[0.6rem] uppercase tracking-[0.28em] text-emerald-200/86">
                      LIVE
                    </span>
                  )}
                </div>
                <h3 className="mt-12 text-2xl font-medium tracking-[-0.04em] text-white">
                  {path.title[language]}
                </h3>
                <p className="mt-3 text-xs uppercase tracking-[0.26em] text-white/42">
                  {path.meta[language]}
                </p>
                <p className="mt-5 text-sm leading-6 text-white/62">
                  {path.summary[language]}
                </p>
                <span
                  className={`mt-auto pt-6 text-[0.62rem] uppercase tracking-[0.32em] ${
                    isLive ? "text-white/82" : "text-white/36"
                  }`}
                >
                  {isLive ? `${t.enter} →` : t.comingSoon}
                </span>
              </article>
            );

            return isLive ? (
              <Link key={path.slug} href={`/learn/${path.slug}`} className="block">
                {card}
              </Link>
            ) : (
              <div key={path.slug}>{card}</div>
            );
          })}
        </div>
      </section>

      {articles.length > 0 && (
        <section className="mx-auto mt-24 max-w-6xl">
          <header className="mb-8">
            <p className="text-xs uppercase tracking-[0.42em] text-white/36">
              {t.articlesEyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
              {t.articlesTitle}
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-white/56">{t.articlesNote}</p>
          </header>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/learn/articles/${a.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl transition hover:border-white/28 hover:bg-white/[0.075]"
                >
                  <span className="text-[0.58rem] uppercase tracking-[0.28em] text-white/38">
                    {a.publishedAt} · {t.sourceCount(a.sources.length)}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold tracking-[-0.03em] text-white group-hover:text-white">
                    {a.title[language]}
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2 text-[0.58rem] uppercase tracking-[0.22em] text-white/48">
                    <span className="rounded-full border border-white/12 px-2 py-1">
                      {a.category}
                    </span>
                    {a.relatedPathSlug && (
                      <span className="rounded-full border border-white/12 px-2 py-1">
                        {t.pathLabel}: {pathsBySlug.get(a.relatedPathSlug)?.title[language] ?? a.relatedPathSlug}
                      </span>
                    )}
                    {a.relatedModuleIndex && (
                      <span className="rounded-full border border-white/12 px-2 py-1">
                        {t.moduleLabel} {a.relatedModuleIndex}
                      </span>
                    )}
                    <span className={`rounded-full px-2 py-1 ${a.verified ? "bg-emerald-300/12 text-emerald-100/78" : "bg-amber-300/12 text-amber-100/78"}`}>
                      {a.verified ? t.verified : t.unverified}
                    </span>
                  </div>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-white/58">
                    {a.summary[language]}
                  </p>
                  <span className="mt-auto pt-4 text-[0.62rem] uppercase tracking-[0.3em] text-white/50 transition group-hover:text-white">
                    {t.articlesRead} →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {milestoneCases.length > 0 && (
        <section className="mx-auto mt-24 max-w-6xl">
          <header className="mb-8">
            <p className="text-xs uppercase tracking-[0.42em] text-white/36">
              {t.milestonesEyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
              {t.milestonesTitle}
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-white/56">
              {t.milestonesNote}
            </p>
          </header>
          <div className="grid gap-4 md:grid-cols-2">
            {milestoneCases.map((m) => (
              <Link
                key={m.slug}
                href={`/cases/${m.slug}`}
                className="group flex h-full flex-col rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl transition hover:border-white/30 hover:bg-white/[0.075]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.28em] text-white/42">
                    {m.year ?? ""}
                  </span>
                  <span className="rounded-full border border-white/14 px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.28em] text-white/68">
                    {m.creators[0]?.name ?? ""}
                  </span>
                </div>
                <h3 className="mt-6 text-2xl font-semibold tracking-[-0.04em] text-white">
                  {m.title[language]}
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/62">
                  {m.summary[language]}
                </p>
                <span className="mt-auto pt-6 text-[0.62rem] uppercase tracking-[0.32em] text-white/56 transition group-hover:text-white">
                  {t.milestoneRead} →
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto mt-24 max-w-6xl">
        <GlossaryExplorer />
      </section>
    </main>
  );
}
