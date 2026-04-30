"use client";

import { useMemo, useState } from "react";
import { useLanguage } from "@/components/shared/LanguageProvider";
import { NewsCard } from "@/components/landing/NewsCard";
import {
  newsByPublishedDesc,
  newsCategories,
  type NewsCategory,
} from "@/lib/data/news";

type Filter = "all" | NewsCategory;

const copy = {
  zh: {
    eyebrow: "动态 / Daily Signal",
    title: "高斯泼溅与空间媒体动态",
    description:
      "印刻万物每周整理论文、工具、行业、社区与艺术五个维度的动态，让你不用追每一个频道也能跟上节奏。",
    all: "全部",
    countLabel: (n: number) => `共 ${n} 条`,
  },
  en: {
    eyebrow: "Daily Signal",
    title: "Gaussian Splatting & Spatial Media Updates",
    description:
      "TOP3DGS curates weekly updates across papers, tools, industry, community, and art—so you can stay on track without chasing every channel.",
    all: "All",
    countLabel: (n: number) => `${n} updates`,
  },
} as const;

export function NewsExplorer() {
  const { language } = useLanguage();
  const t = copy[language];
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(
    () =>
      filter === "all"
        ? newsByPublishedDesc
        : newsByPublishedDesc.filter((n) => n.category === filter),
    [filter],
  );

  const counts = useMemo(() => {
    const map: Record<Filter, number> = {
      all: newsByPublishedDesc.length,
      paper: 0,
      tool: 0,
      industry: 0,
      community: 0,
      art: 0,
    };
    newsByPublishedDesc.forEach((n) => {
      map[n.category] += 1;
    });
    return map;
  }, []);

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

        <div className="mt-12 flex flex-wrap gap-2">
          <FilterChip
            active={filter === "all"}
            onClick={() => setFilter("all")}
            label={t.all}
            count={counts.all}
          />
          {newsCategories.map((cat) => (
            <FilterChip
              key={cat.id}
              active={filter === cat.id}
              onClick={() => setFilter(cat.id)}
              label={cat.label[language]}
              count={counts[cat.id]}
            />
          ))}
        </div>

        <p className="mt-6 text-xs uppercase tracking-[0.32em] text-white/36">
          {t.countLabel(filtered.length)}
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((item) => (
            <NewsCard key={item.id} item={item} variant="compact" />
          ))}
        </div>
      </section>
    </main>
  );
}

function FilterChip({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] transition ${
        active
          ? "bg-[#f7f4ed] text-[#050505]"
          : "border border-white/14 bg-white/[0.04] text-white/72 hover:border-white/30 hover:text-white"
      }`}
    >
      <span>{label}</span>
      <span
        className={`text-[0.65rem] tracking-[0.2em] ${
          active ? "text-black/52" : "text-white/40"
        }`}
      >
        {count}
      </span>
    </button>
  );
}
