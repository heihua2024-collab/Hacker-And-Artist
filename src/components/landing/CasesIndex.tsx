"use client";

import { useLanguage } from "@/components/shared/LanguageProvider";
import { CaseCard } from "@/components/landing/CaseCard";
import { milestoneCases, productionCases } from "@/lib/data/cases";

const copy = {
  zh: {
    eyebrow: "案例与创作者 / Cases",
    title: "看见高斯泼溅在世界各地正在做什么。",
    description:
      "首批我们先收录了 4 项重塑了整条空间媒体管线的研究与工具里程碑——它们直接决定了今天我们能扫到什么、清到什么、看到什么。下一批将由编辑部核验后陆续上线真实的空间案例与创作者档案。",
    milestoneTitle: "研究与工具里程碑",
    milestoneSubtitle: "塑造了今天 3DGS 工程范式的论文与开源工具。",
    productionTitle: "空间案例与创作者",
    productionEmpty:
      "案例征集中。我们坚持只发布编辑部已核验、有公开源可追溯的真实项目。",
    sourceNote:
      "所有条目均链接到原始项目主页或论文。我们不引用未经核实的演示。",
  },
  en: {
    eyebrow: "Cases",
    title: "See what Gaussian Splatting is actually doing around the world.",
    description:
      "Our first wave gathers four research and tooling milestones that reshaped the entire spatial-media pipeline — they directly decide what we can capture, clean, and view today. Real spatial cases and creator profiles will roll out as our editors verify them.",
    milestoneTitle: "Research & Tool Milestones",
    milestoneSubtitle:
      "Papers and open-source tools that shaped today's 3DGS engineering paradigm.",
    productionTitle: "Spatial Cases & Creators",
    productionEmpty:
      "Now collecting. We only publish projects our editors have personally verified against public sources.",
    sourceNote:
      "Every entry links to the original project page or paper. We don't cite demos we can't verify.",
  },
} as const;

export function CasesIndex() {
  const { language } = useLanguage();
  const t = copy[language];

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
        <p className="mt-5 text-xs uppercase tracking-[0.28em] text-white/36">
          {t.sourceNote}
        </p>
      </section>

      <section className="mx-auto mt-20 max-w-6xl">
        <header className="mb-8">
          <p className="text-xs uppercase tracking-[0.42em] text-white/36">
            {t.milestoneTitle}
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
            {language === "zh" ? "塑造了 3DGS 范式的研究" : "Research shaping today's 3DGS paradigm"}
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-white/56">
            {t.milestoneSubtitle}
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-2">
          {milestoneCases.map((c) => (
            <CaseCard key={c.slug} entry={c} />
          ))}
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-6xl">
        <header className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.42em] text-white/36">
              {t.productionTitle}
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
              {language === "zh" ? "正在收集中" : "Collecting now"}
            </h2>
          </div>
        </header>

        {productionCases.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {productionCases.map((c) => (
              <CaseCard key={c.slug} entry={c} />
            ))}
          </div>
        ) : (
          <div className="rounded-[2rem] border border-dashed border-white/14 bg-white/[0.02] p-10 text-center text-sm leading-7 text-white/56">
            {t.productionEmpty}
          </div>
        )}
      </section>
    </main>
  );
}
