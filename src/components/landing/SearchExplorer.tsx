"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/components/shared/LanguageProvider";
import {
  groupHitsByType,
  searchAll,
  searchTypeLabels,
  type SearchEntryType,
} from "@/lib/search";

const copy = {
  zh: {
    eyebrow: "全站搜索",
    title: "搜你想知道的：工具、术语、案例、动态。",
    description:
      "覆盖工具表、术语库、动态、行业洞察、学习路径与延伸笔记、案例与画廊。客户端实时匹配，支持中英文混搜。",
    placeholder: "搜索工具、术语、案例、教程……",
    searchBtn: "搜索",
    clear: "清除",
    emptyHint: "试试 ：3DGS、SuperSplat、COLMAP、PLY、SuperSplat、3D Gaussian Splatting……",
    quickPicks: "快速入口",
    noResults: (q: string) => `没有匹配「${q}」的结果。`,
    resultsCount: (n: number) => `找到 ${n} 条结果`,
    typing: "输入关键词后按回车开始搜索。",
  },
  en: {
    eyebrow: "Search",
    title: "Find anything: tools, terms, cases, news.",
    description:
      "Searches across tools, glossary, news, insights, learning paths, articles, cases and gallery. Client-side, mixed Chinese / English.",
    placeholder: "Search tools, terms, cases, tutorials…",
    searchBtn: "Search",
    clear: "Clear",
    emptyHint: "Try: 3DGS, SuperSplat, COLMAP, PLY, NeRF, splat compression…",
    quickPicks: "Quick picks",
    noResults: (q: string) => `No results for "${q}".`,
    resultsCount: (n: number) => `${n} results`,
    typing: "Type keywords and press enter to search.",
  },
} as const;

const QUICK_PICKS = [
  "SuperSplat",
  "3DGS",
  "COLMAP",
  "PLY",
  "Polycam",
  "WebXR",
  "Postshot",
  "SPZ",
];

export function SearchExplorer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { language } = useLanguage();
  const t = copy[language];
  const queryParam = searchParams.get("q") ?? "";
  const [input, setInput] = useState(queryParam);

  useEffect(() => {
    setInput(queryParam);
  }, [queryParam]);

  const hits = useMemo(() => {
    if (!queryParam.trim()) return [];
    return searchAll(queryParam);
  }, [queryParam]);

  const grouped = useMemo(() => groupHitsByType(hits), [hits]);

  const submit = (next: string) => {
    const value = next.trim();
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("q", value);
    } else {
      params.delete("q");
    }
    const qs = params.toString();
    router.replace(qs ? `/search?${qs}` : "/search", { scroll: false });
  };

  return (
    <main className="min-h-screen bg-[#050505] px-5 pb-24 pt-28 text-[#f7f4ed] sm:px-10 sm:pt-32 lg:px-16 lg:pt-36">
      <section className="mx-auto max-w-5xl">
        <p className="text-[0.62rem] uppercase tracking-[0.42em] text-white/38">
          {t.eyebrow}
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
          {t.title}
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-white/56 sm:text-base">
          {t.description}
        </p>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            submit(input);
          }}
          className="mt-8 flex items-center gap-3 rounded-full border border-white/12 bg-white/[0.05] p-2 backdrop-blur-2xl"
          role="search"
        >
          <span aria-hidden className="pl-4 text-white/45">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </span>
          <input
            type="search"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={t.placeholder}
            aria-label={t.placeholder}
            autoFocus
            className="flex-1 bg-transparent px-2 py-3 text-sm text-white outline-none placeholder:text-white/35 sm:text-base"
          />
          {input && (
            <button
              type="button"
              onClick={() => {
                setInput("");
                submit("");
              }}
              className="rounded-full px-3 py-2 text-xs uppercase tracking-[0.24em] text-white/55 hover:text-white"
            >
              {t.clear}
            </button>
          )}
          <button
            type="submit"
            className="rounded-full bg-[#f7f4ed] px-5 py-3 text-sm font-medium text-black"
          >
            {t.searchBtn}
          </button>
        </form>

        {!queryParam && (
          <div className="mt-8">
            <p className="text-[0.62rem] uppercase tracking-[0.32em] text-white/36">
              {t.quickPicks}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {QUICK_PICKS.map((q) => (
                <button
                  type="button"
                  key={q}
                  onClick={() => {
                    setInput(q);
                    submit(q);
                  }}
                  className="rounded-full border border-white/12 bg-white/[0.045] px-3 py-1.5 text-xs text-white/70 transition hover:border-white/30 hover:text-white"
                >
                  {q}
                </button>
              ))}
            </div>
            <p className="mt-6 text-xs text-white/40">{t.emptyHint}</p>
          </div>
        )}

        {queryParam && (
          <div className="mt-8">
            <p className="text-[0.62rem] uppercase tracking-[0.32em] text-white/40">
              {hits.length === 0 ? t.noResults(queryParam) : t.resultsCount(hits.length)}
            </p>

            <div className="mt-6 space-y-10">
              {grouped.map(([type, list]) => (
                <SearchGroup key={type} type={type} hits={list} language={language} />
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

function SearchGroup({
  type,
  hits,
  language,
}: {
  type: SearchEntryType;
  hits: ReturnType<typeof searchAll>;
  language: "zh" | "en";
}) {
  const label = searchTypeLabels[type][language];
  return (
    <section>
      <header className="flex items-center gap-3">
        <h2 className="text-base font-semibold tracking-[-0.02em] text-white">
          {label}
        </h2>
        <span className="rounded-full bg-white/[0.06] px-2 py-0.5 text-[0.62rem] text-white/55">
          {hits.length}
        </span>
      </header>
      <ul className="mt-4 grid gap-3 md:grid-cols-2">
        {hits.map((hit) => (
          <li key={hit.id}>
            <Link
              href={hit.href}
              className="group flex h-full flex-col rounded-[1.25rem] border border-white/10 bg-white/[0.035] p-4 transition hover:border-white/24 hover:bg-white/[0.06]"
            >
              <p className="text-[0.58rem] uppercase tracking-[0.28em] text-white/38">
                {hit.badge?.[language] ?? searchTypeLabels[hit.type][language]}
                {hit.publishedAt ? ` · ${hit.publishedAt}` : ""}
              </p>
              <h3 className="mt-2 text-base font-semibold tracking-[-0.02em] text-white group-hover:text-white">
                {hit.title[language] || hit.title.zh || hit.title.en}
              </h3>
              <p className="mt-2 line-clamp-3 text-sm leading-6 text-white/60">
                {hit.summary[language] || hit.summary.zh || hit.summary.en}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
