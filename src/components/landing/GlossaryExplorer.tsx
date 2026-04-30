"use client";

import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/components/shared/LanguageProvider";
import {
  glossary,
  glossaryById,
  glossaryCategories,
  type GlossaryCategory,
  type GlossaryEntry,
} from "@/lib/data/glossary";
import { levelsById, tagsById } from "@/lib/taxonomy";

type Filter = "all" | GlossaryCategory;

const copy = {
  zh: {
    eyebrow: "术语库 / Glossary",
    title: "高斯泼溅术语图谱",
    description:
      "52 条核心概念、技术、格式与工具，分层服务小白爱好者、从业者与研究者——同一条术语，看你需要哪一层。",
    all: "全部",
    countLabel: (n: number) => `共 ${n} 条`,
    searchPlaceholder: "搜索术语、定义...",
    relatedTerms: "相关术语",
    prerequisiteTerms: "前置术语",
    advancedTerms: "进阶延伸",
    seeMore: "延伸阅读",
    aliases: "又称",
    unverified: "信息待核实",
    empty: "没有匹配的术语，试试别的关键词。",
    shortLabel: "一句话理解",
    longLabel: "详细说明",
    introducedLabel: "首次提出",
    quoteLabel: "原始引文",
    relatedToolsLabel: "相关工具",
    relatedEnginesLabel: "相关引擎",
    relatedPapersLabel: "关键论文",
    audience: "受众",
    audienceAll: "全部",
    audienceBeginner: "小白",
    audiencePractitioner: "从业者",
    audienceResearcher: "研究者",
  },
  en: {
    eyebrow: "Glossary",
    title: "A Map of Gaussian Splatting Concepts",
    description:
      "52 cross-linked terms layered for beginners, practitioners, and researchers—same entry, your choice of depth.",
    all: "All",
    countLabel: (n: number) => `${n} entries`,
    searchPlaceholder: "Search terms, definitions...",
    relatedTerms: "Related",
    prerequisiteTerms: "Prerequisites",
    advancedTerms: "Go deeper",
    seeMore: "Further reading",
    aliases: "Also known as",
    unverified: "Pending verification",
    empty: "No matches. Try different keywords.",
    shortLabel: "In plain words",
    longLabel: "Details",
    introducedLabel: "Introduced",
    quoteLabel: "Original quote",
    relatedToolsLabel: "Related tools",
    relatedEnginesLabel: "Related engines",
    relatedPapersLabel: "Key papers",
    audience: "View",
    audienceAll: "All",
    audienceBeginner: "Beginner",
    audiencePractitioner: "Practitioner",
    audienceResearcher: "Researcher",
  },
} as const;

type Audience = "all" | "beginner" | "practitioner" | "researcher";

export function GlossaryExplorer() {
  const { language } = useLanguage();
  const t = copy[language];
  const [filter, setFilter] = useState<Filter>("all");
  const [audience, setAudience] = useState<Audience>("all");
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const term = params.get("term");
    if (!term || !glossaryById[term]) return;
    setFilter("all");
    setQuery("");
    requestAnimationFrame(() => {
      const target = document.getElementById(`term-${term}`);
      if (!target) return;
      target.scrollIntoView({ behavior: "smooth", block: "center" });
      target.classList.add("ring-2", "ring-white/40");
      window.setTimeout(() => {
        target.classList.remove("ring-2", "ring-white/40");
      }, 1800);
    });
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return glossary.filter((entry) => {
      if (filter !== "all" && entry.category !== filter) return false;
      if (!q) return true;
      const haystack = [
        entry.term.zh,
        entry.term.en,
        entry.definition.zh,
        entry.definition.en,
        ...entry.aliases,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [filter, query]);

  const counts = useMemo(() => {
    const map: Record<Filter, number> = {
      all: glossary.length,
      concept: 0,
      technique: 0,
      format: 0,
      tool: 0,
      metric: 0,
      workflow: 0,
    };
    glossary.forEach((entry) => {
      map[entry.category] += 1;
    });
    return map;
  }, []);

  const handleJump = (id: string) => {
    if (filter !== "all") setFilter("all");
    setQuery("");
    requestAnimationFrame(() => {
      const target = document.getElementById(`term-${id}`);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
        target.classList.add("ring-2", "ring-white/40");
        window.setTimeout(() => {
          target.classList.remove("ring-2", "ring-white/40");
        }, 1600);
      }
    });
  };

  return (
    <section className="mx-auto max-w-6xl">
      <p className="text-xs uppercase tracking-[0.42em] text-white/36">
        {t.eyebrow}
      </p>
      <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
        {t.title}
      </h2>
      <p className="mt-5 max-w-3xl text-base leading-7 text-white/62">
        {t.description}
      </p>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          <FilterChip
            active={filter === "all"}
            onClick={() => setFilter("all")}
            label={t.all}
            count={counts.all}
          />
          {glossaryCategories.map((cat) => (
            <FilterChip
              key={cat.id}
              active={filter === cat.id}
              onClick={() => setFilter(cat.id)}
              label={cat.label[language]}
              count={counts[cat.id]}
            />
          ))}
        </div>
        <div className="relative w-full sm:max-w-xs">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full rounded-full border border-white/14 bg-white/[0.04] px-5 py-3 text-sm text-white placeholder:text-white/36 outline-none transition focus:border-white/32 focus:bg-white/[0.07]"
            aria-label={t.searchPlaceholder}
          />
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2 text-[0.62rem] uppercase tracking-[0.32em] text-white/36">
        <span>{t.audience}</span>
        {(
          [
            ["all", t.audienceAll],
            ["beginner", t.audienceBeginner],
            ["practitioner", t.audiencePractitioner],
            ["researcher", t.audienceResearcher],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setAudience(id)}
            className={`rounded-full px-3 py-1 text-[0.62rem] tracking-[0.24em] transition ${
              audience === id
                ? "bg-white text-black"
                : "border border-white/14 bg-white/[0.03] text-white/64 hover:border-white/30 hover:text-white"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <p className="mt-5 text-xs uppercase tracking-[0.32em] text-white/36">
        {t.countLabel(filtered.length)}
      </p>

      {filtered.length === 0 ? (
        <p className="mt-12 rounded-[1.5rem] border border-dashed border-white/14 px-6 py-12 text-center text-sm text-white/56">
          {t.empty}
        </p>
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((entry) => (
            <GlossaryCard
              key={entry.id}
              entry={entry}
              language={language}
              audience={audience}
              t={t}
              onJump={handleJump}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function GlossaryCard({
  entry,
  language,
  audience,
  t,
  onJump,
}: {
  entry: GlossaryEntry;
  language: "zh" | "en";
  audience: Audience;
  t: (typeof copy)[keyof typeof copy];
  onJump: (id: string) => void;
}) {
  const level = levelsById[entry.level];
  const categoryLabel =
    glossaryCategories.find((c) => c.id === entry.category)?.label[language] ??
    entry.category;

  // 不同身份关心的内容层不同——通过 show 控制每段是否展示
  const show = {
    short: audience !== "researcher", // 研究者通常跳过通俗类比
    long: audience !== "beginner", // 小白默认折叠长定义
    context: audience !== "beginner", // 使用场景给从业者看
    introduced: audience === "researcher" || audience === "all", // 行业溯源给研究者
    relatedPapers: audience === "researcher" || audience === "all",
    relatedTools:
      audience === "practitioner" || audience === "researcher" || audience === "all",
    relatedEngines:
      audience === "practitioner" || audience === "researcher" || audience === "all",
    prerequisite: audience === "beginner" || audience === "all",
    advanced: audience === "researcher" || audience === "all",
    relatedTerms: audience === "all", // 全部模式下显示传统的扁平相关术语
  };

  // 用一个集合避免重复显示：在 audience=all 时优先展示分层（pre/adv），所以 relatedTerms 显示在剩余里
  const splitIds = new Set([
    ...(entry.prerequisiteTerms ?? []),
    ...(entry.advancedTerms ?? []),
  ]);
  const remainingRelated = entry.relatedTerms.filter((id) => !splitIds.has(id));

  return (
    <article
      id={`term-${entry.id}`}
      className="relative flex h-full scroll-mt-32 flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl transition"
    >
      <header>
        <div className="flex flex-wrap items-center gap-2 text-[0.62rem] uppercase tracking-[0.28em] text-white/42">
          <span className="rounded-full bg-white/[0.06] px-2 py-0.5 text-white/68">
            {categoryLabel}
          </span>
          {level && (
            <span className="rounded-full border border-white/12 px-2 py-0.5">
              {level.label[language]}
            </span>
          )}
          {!entry.verified && (
            <span className="text-amber-300/80">{t.unverified}</span>
          )}
        </div>
        <h3 className="mt-4 text-2xl font-semibold leading-tight tracking-[-0.04em] text-white">
          {entry.term[language]}
        </h3>
        {entry.aliases.length > 0 && (
          <p className="mt-2 text-xs text-white/42">
            {t.aliases}：{entry.aliases.join(" / ")}
          </p>
        )}
      </header>

      {/* 1. 小白入口：通俗一句话理解 */}
      {entry.short && show.short && (
        <p className="mt-5 rounded-2xl border border-emerald-300/20 bg-emerald-300/[0.04] p-4 text-sm leading-7 text-white/86">
          <span className="mb-1 block text-[0.6rem] uppercase tracking-[0.32em] text-emerald-200/70">
            {t.shortLabel}
          </span>
          {entry.short[language]}
        </p>
      )}

      {/* 2. 详细定义（从业者/研究者要） */}
      {show.long && (
        <p className={`text-sm leading-7 text-white/76 ${entry.short && show.short ? "mt-4" : "mt-5"}`}>
          {entry.short && show.short && (
            <span className="mb-1 block text-[0.6rem] uppercase tracking-[0.32em] text-white/36">
              {t.longLabel}
            </span>
          )}
          {entry.definition[language]}
        </p>
      )}

      {entry.context && show.context && entry.context[language] && (
        <p className="mt-4 border-l-2 border-white/14 pl-4 text-sm leading-6 text-white/52">
          {entry.context[language]}
        </p>
      )}

      {/* 3. 行业溯源（研究者关心：何时何人首次提出 + verbatim 引文） */}
      {show.introduced &&
        (entry.introducedIn || entry.introducedBy || entry.introducedQuoteEn) && (
          <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.025] p-4">
            <p className="text-[0.6rem] uppercase tracking-[0.32em] text-fuchsia-200/70">
              {t.introducedLabel}
            </p>
            <p className="mt-2 text-sm text-white/72">
              {[entry.introducedIn, entry.introducedBy].filter(Boolean).join(" · ")}
            </p>
            {entry.introducedQuoteEn && (
              <blockquote className="mt-3 border-l-2 border-fuchsia-300/30 pl-3 text-xs italic leading-6 text-white/58">
                "{entry.introducedQuoteEn}"
                {entry.introducedSourceUrl && (
                  <a
                    href={entry.introducedSourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 text-fuchsia-200/70 underline-offset-2 hover:underline"
                  >
                    [src]
                  </a>
                )}
              </blockquote>
            )}
          </div>
        )}

      {entry.relatedTagIds.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-1.5">
          {entry.relatedTagIds.map((id) => {
            const tag = tagsById[id];
            if (!tag) return null;
            return (
              <span
                key={id}
                className="rounded-full bg-white/[0.05] px-2 py-0.5 text-[0.6rem] uppercase tracking-[0.22em] text-white/56"
              >
                #{tag.label[language]}
              </span>
            );
          })}
        </div>
      )}

      {/* 4. 学习梯子：前置 / 进阶 */}
      {show.prerequisite &&
        entry.prerequisiteTerms &&
        entry.prerequisiteTerms.length > 0 && (
          <div className="mt-5">
            <p className="text-[0.62rem] uppercase tracking-[0.32em] text-sky-200/70">
              ↓ {t.prerequisiteTerms}
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {entry.prerequisiteTerms.map((id) => {
                const target = glossaryById[id];
                if (!target) return null;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => onJump(id)}
                    className="rounded-full border border-sky-300/20 bg-sky-300/[0.04] px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-sky-100/82 transition hover:border-sky-300/40 hover:text-white"
                  >
                    {target.term[language]}
                  </button>
                );
              })}
            </div>
          </div>
        )}

      {show.advanced &&
        entry.advancedTerms &&
        entry.advancedTerms.length > 0 && (
          <div className="mt-4">
            <p className="text-[0.62rem] uppercase tracking-[0.32em] text-amber-200/70">
              ↑ {t.advancedTerms}
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {entry.advancedTerms.map((id) => {
                const target = glossaryById[id];
                if (!target) return null;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => onJump(id)}
                    className="rounded-full border border-amber-300/20 bg-amber-300/[0.04] px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-amber-100/82 transition hover:border-amber-300/40 hover:text-white"
                  >
                    {target.term[language]}
                  </button>
                );
              })}
            </div>
          </div>
        )}

      {/* 5. 兼容旧字段：showAll 时显示剩余 relatedTerms（不在 pre/adv 里的）*/}
      {show.relatedTerms && remainingRelated.length > 0 && (
        <div className="mt-4">
          <p className="text-[0.62rem] uppercase tracking-[0.32em] text-white/36">
            {t.relatedTerms}
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {remainingRelated.map((id) => {
              const target = glossaryById[id];
              if (!target) return null;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => onJump(id)}
                  className="rounded-full border border-white/12 px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-white/72 transition hover:border-white/30 hover:text-white"
                >
                  {target.term[language]}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 6. 接到实际工作：相关工具/引擎 */}
      {show.relatedTools &&
        entry.relatedTools &&
        entry.relatedTools.length > 0 && (
          <div className="mt-4">
            <p className="text-[0.62rem] uppercase tracking-[0.32em] text-white/36">
              {t.relatedToolsLabel}
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {entry.relatedTools.map((id) => (
                <a
                  key={id}
                  href={`/tools?tool=${encodeURIComponent(id)}`}
                  className="rounded-full border border-white/12 bg-white/[0.03] px-2.5 py-1 text-[0.65rem] tracking-[0.14em] text-white/72 transition hover:border-white/30 hover:text-white"
                >
                  {id}
                </a>
              ))}
            </div>
          </div>
        )}

      {show.relatedEngines &&
        entry.relatedEngines &&
        entry.relatedEngines.length > 0 && (
          <div className="mt-4">
            <p className="text-[0.62rem] uppercase tracking-[0.32em] text-white/36">
              {t.relatedEnginesLabel}
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {entry.relatedEngines.map((id) => (
                <a
                  key={id}
                  href={`/tools/engines?engine=${encodeURIComponent(id)}`}
                  className="rounded-full border border-white/12 bg-white/[0.03] px-2.5 py-1 text-[0.65rem] tracking-[0.14em] text-white/72 transition hover:border-white/30 hover:text-white"
                >
                  {id}
                </a>
              ))}
            </div>
          </div>
        )}

      {/* 7. 研究者：关键论文 */}
      {show.relatedPapers &&
        entry.relatedPapers &&
        entry.relatedPapers.length > 0 && (
          <div className="mt-4">
            <p className="text-[0.62rem] uppercase tracking-[0.32em] text-white/36">
              {t.relatedPapersLabel}
            </p>
            <ul className="mt-2 space-y-1">
              {entry.relatedPapers.map((url) => (
                <li key={url}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 break-all text-xs text-white/64 transition hover:text-white"
                  >
                    {url.replace(/^https?:\/\//, "")}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

      {entry.links.length > 0 && (
        <div className="mt-auto pt-6">
          <p className="text-[0.62rem] uppercase tracking-[0.32em] text-white/36">
            {t.seeMore}
          </p>
          <ul className="mt-2 space-y-1">
            {entry.links.map((link) => (
              <li key={link.url}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-white/72 transition hover:text-white"
                >
                  <span className="border-b border-dashed border-white/22 group-hover:border-white/40">
                    {link.label}
                  </span>
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M1 9L9 1"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                    />
                    <path
                      d="M3 1H9V7"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
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
