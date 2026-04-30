"use client";

import Link from "next/link";
import { useLanguage } from "@/components/shared/LanguageProvider";
import type { LearningArticle } from "@/lib/data/learning-articles";

const copy = {
  zh: {
    eyebrow: "延伸笔记",
    crumbs: ["印刻万物", "学习", "文章"],
    relatedPath: "关联学习路径",
    module: "模块",
    sources: "来源",
    verified: "已核对公开来源",
    unverified: "含待核实陈述",
  },
  en: {
    eyebrow: "Extended notes",
    crumbs: ["TOP3DGS", "Learn", "Article"],
    relatedPath: "Related learning path",
    module: "Module",
    sources: "Sources",
    verified: "Cross-checked against public sources",
    unverified: "Contains statements marked for verification",
  },
} as const;

const categoryLabel: Record<
  LearningArticle["category"],
  { zh: string; en: string }
> = {
  capture: { zh: "采集", en: "Capture" },
  training: { zh: "训练", en: "Training" },
  export: { zh: "导出", en: "Export" },
  tooling: { zh: "工具链", en: "Tooling" },
};

export function LearningArticleDetail({ article }: { article: LearningArticle }) {
  const { language } = useLanguage();
  const t = copy[language];
  const cat = categoryLabel[article.category];

  return (
    <main className="min-h-screen bg-[#050505] px-5 pb-24 pt-28 text-[#f7f4ed] sm:px-10 sm:pt-32 lg:px-16 lg:pt-36">
      <section className="mx-auto max-w-3xl">
        <nav className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.28em] text-white/45">
          <Link href="/" className="transition hover:text-white">
            {t.crumbs[0]}
          </Link>
          <span aria-hidden>/</span>
          <Link href="/learn" className="transition hover:text-white">
            {t.crumbs[1]}
          </Link>
          <span aria-hidden>/</span>
          <span className="text-white/30">{t.crumbs[2]}</span>
          <span aria-hidden>/</span>
          <span className="max-w-[min(100%,14rem)] truncate text-white/70 normal-case tracking-normal">
            {article.title[language]}
          </span>
        </nav>

        <p className="mt-10 text-xs uppercase tracking-[0.5em] text-white/40">
          {t.eyebrow} · {cat[language]}
        </p>
        <h1 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-[-0.06em] text-white sm:text-6xl">
          {article.title[language]}
        </h1>
        <p className="mt-6 text-lg leading-8 text-white/68">{article.summary[language]}</p>
        <p className="mt-4 text-sm text-white/45">
          {article.verified ? t.verified : t.unverified}
        </p>
      </section>

      <article className="mx-auto mt-16 max-w-3xl space-y-14">
        {article.sections.map((sec, idx) => (
          <section key={idx}>
            <h2 className="text-xl font-semibold tracking-[-0.03em] text-white sm:text-2xl">
              {sec.heading[language]}
            </h2>
            <div className="mt-5 space-y-5 text-base leading-8 text-white/72">
              {sec.paragraphs.map((p, j) => (
                <p key={j}>{p[language]}</p>
              ))}
            </div>
          </section>
        ))}
      </article>

      <section className="mx-auto mt-20 max-w-3xl space-y-10 rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl sm:p-10">
        {article.relatedPathSlug && (
          <div>
            <p className="text-[0.62rem] uppercase tracking-[0.32em] text-white/36">
              {t.relatedPath}
            </p>
            <Link
              href={`/learn/${article.relatedPathSlug}${article.relatedModuleIndex ? `#module-${article.relatedModuleIndex}` : ""}`}
              className="mt-3 inline-flex text-base text-white/80 underline decoration-white/25 decoration-dashed underline-offset-4 transition hover:text-white"
            >
              {article.relatedModuleIndex
                ? `${article.relatedPathSlug} · ${t.module} ${article.relatedModuleIndex}`
                : article.relatedPathSlug}
            </Link>
          </div>
        )}
        <div>
          <p className="text-[0.62rem] uppercase tracking-[0.32em] text-white/36">{t.sources}</p>
          <ul className="mt-4 space-y-2">
            {article.sources.map((url) => (
              <li key={url}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-all text-sm text-white/70 underline decoration-white/20 underline-offset-2 transition hover:text-white"
                >
                  {url}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
