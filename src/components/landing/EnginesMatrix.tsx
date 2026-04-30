"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useLanguage } from "@/components/shared/LanguageProvider";
import {
  engines,
  engineCategoryLabels,
  engineCategoryOrder,
  splatRenderLabels,
  getEngineStats,
  type EngineCategory,
  type EngineSupport,
  type SplatRenderSupport,
} from "@/lib/data/engines";

type CategoryFilter = "all" | EngineCategory;
type RenderFilter = "all" | SplatRenderSupport;

const copy = {
  zh: {
    eyebrow: "兼容性矩阵",
    title: "软件 × 高斯泼溅 支持矩阵",
    description:
      "印刻万物维护的「我手上这款软件能不能渲染高斯泼溅文件」的客观速查表。每一格都来源于源码或官方文档，每一条都附带可追溯的引用。",
    legendTitle: "覆盖范围",
    legendStatTotal: (n: number) => `已审核 ${n} 款`,
    legendNative: "原生支持",
    legendPlugin: "插件支持",
    legendExternal: "外部桥接",
    legendNone: "不支持",
    filterAll: "全部",
    filterByCategory: "按类别",
    filterByRender: "按渲染支持",
    columnEngine: "软件",
    columnCategory: "类别",
    columnRender: "3DGS 渲染",
    columnFormats: "支持格式",
    columnEdit: "可编辑",
    columnPlugin: "实现",
    columnLastUpdate: "维护",
    columnSources: "来源",
    yes: "是",
    no: "否",
    apiOnly: "仅 API 级",
    none: "—",
    pluginNative: "引擎原生",
    pluginVia: (name: string) => `插件：${name}`,
    pluginExternal: "外部桥接",
    pluginNoSupport: "无可用路径",
    sourcesLabel: (n: number) => `${n} 条引用`,
    verifiedBy: "已审核",
    pendingReview: "待审核",
    inDataIssues: "数据缺口",
    inDataIssuesDesc:
      "标注为「不接受外部 splat」的工具是闭环生产管线，不会出现在「能查看任意 splat」名单里——这是有意区分。",
    transparencyTitle: "数据透明度",
    transparencyDesc:
      "本矩阵所有字段均要求：1) verbatim 英文原文引用；2) 至少一条可访问的 sources URL；3) 找不到证据的字段一律填 null/false/none——保守的「否」比错误的「是」更有价值。",
    workflowSteps: [
      "知识库的 .md 源文件由 Auto 模型按强约束采集，禁止编造、禁止自盖章。",
      "Opus 审核员逐字段核对原文与代码，通过的标记为 verified。",
      "本表格仅展示 verified 状态的条目，pending/rejected 不会渲染。",
    ],
  },
  en: {
    eyebrow: "Compatibility Matrix",
    title: "Software × Gaussian Splatting Support Matrix",
    description:
      "An objective look-up table from TOP3DGS: 'Can the software I have actually render Gaussian Splatting files?' Every cell is sourced from real code or official docs, with traceable citations.",
    legendTitle: "Coverage",
    legendStatTotal: (n: number) => `${n} verified`,
    legendNative: "Native",
    legendPlugin: "Plugin",
    legendExternal: "External",
    legendNone: "Unsupported",
    filterAll: "All",
    filterByCategory: "By Category",
    filterByRender: "By Render Support",
    columnEngine: "Software",
    columnCategory: "Category",
    columnRender: "3DGS Render",
    columnFormats: "Formats",
    columnEdit: "Editable",
    columnPlugin: "How",
    columnLastUpdate: "Maintained",
    columnSources: "Sources",
    yes: "Yes",
    no: "No",
    apiOnly: "API-level only",
    none: "—",
    pluginNative: "Engine native",
    pluginVia: (name: string) => `Plugin: ${name}`,
    pluginExternal: "External bridge",
    pluginNoSupport: "No supported path",
    sourcesLabel: (n: number) => `${n} citations`,
    verifiedBy: "Verified",
    pendingReview: "Pending",
    inDataIssues: "Caveat",
    inDataIssuesDesc:
      "Tools marked as 'does not accept external splat' are closed-loop production pipelines — they aren't viewers for arbitrary splat files. This is an intentional distinction.",
    transparencyTitle: "Data Transparency",
    transparencyDesc:
      "Every field follows three rules: 1) verbatim English source quote; 2) at least one accessible sources URL; 3) any unverifiable field is null/false/none — a conservative 'no' beats a wrong 'yes'.",
    workflowSteps: [
      "Markdown source files are gathered by the Auto model under strict constraints — no fabrication, no self-stamping.",
      "Opus reviewer cross-checks every field against original text and code, marking 'verified' only after manual review.",
      "This matrix only renders verified entries; pending/rejected items are excluded.",
    ],
  },
};

type CopyT = (typeof copy)["zh"];

const renderBadgeClass: Record<SplatRenderSupport, string> = {
  native: "bg-emerald-400/15 text-emerald-200 ring-emerald-300/30",
  plugin: "bg-sky-400/15 text-sky-200 ring-sky-300/30",
  external: "bg-amber-400/15 text-amber-200 ring-amber-300/30",
  none: "bg-white/5 text-white/40 ring-white/10",
};

function pickNotes(
  notes: EngineSupport["notes"],
  language: "zh" | "en",
): string {
  if (typeof notes === "string") return notes;
  return notes[language];
}

function formatDateLabel(date: string | null): string {
  if (!date) return "—";
  return date;
}

export function EnginesMatrix() {
  const { language } = useLanguage();
  const t = copy[language];
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [renderFilter, setRenderFilter] = useState<RenderFilter>("all");
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);

  const stats = useMemo(() => getEngineStats(), []);

  const filtered = useMemo(() => {
    return engines.filter((engine) => {
      if (engine.verification !== "verified") return false;
      if (
        categoryFilter !== "all" &&
        engine.engineCategory !== categoryFilter
      ) {
        return false;
      }
      if (renderFilter !== "all" && engine.splatRender !== renderFilter) {
        return false;
      }
      return true;
    });
  }, [categoryFilter, renderFilter]);

  const grouped = useMemo(() => {
    const map = new Map<EngineCategory, EngineSupport[]>();
    filtered.forEach((engine) => {
      const list = map.get(engine.engineCategory) ?? [];
      list.push(engine);
      map.set(engine.engineCategory, list);
    });
    return engineCategoryOrder
      .map((cat) => ({ category: cat, items: map.get(cat) ?? [] }))
      .filter((group) => group.items.length > 0);
  }, [filtered]);

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

        {/* Stats / Legend */}
        <div className="mt-12 grid gap-4 rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:grid-cols-5 sm:p-8">
          <div className="sm:col-span-1">
            <p className="text-[11px] uppercase tracking-[0.32em] text-white/40">
              {t.legendTitle}
            </p>
            <p className="mt-3 text-3xl font-semibold tracking-tight">
              {t.legendStatTotal(stats.total)}
            </p>
          </div>
          <LegendCell
            label={t.legendNative}
            value={stats.byRender.native}
            tone="emerald"
          />
          <LegendCell
            label={t.legendPlugin}
            value={stats.byRender.plugin}
            tone="sky"
          />
          <LegendCell
            label={t.legendExternal}
            value={stats.byRender.external}
            tone="amber"
          />
          <LegendCell
            label={t.legendNone}
            value={stats.byRender.none}
            tone="muted"
          />
        </div>

        {/* Filters */}
        <div className="mt-10 flex flex-col gap-6">
          <FilterRow
            label={t.filterByCategory}
            allLabel={t.filterAll}
            options={engineCategoryOrder.map((cat) => ({
              id: cat,
              label: engineCategoryLabels[cat][language],
            }))}
            value={categoryFilter}
            onChange={setCategoryFilter}
          />
          <FilterRow
            label={t.filterByRender}
            allLabel={t.filterAll}
            options={(["native", "plugin", "external", "none"] as const).map(
              (r) => ({ id: r, label: splatRenderLabels[r][language] }),
            )}
            value={renderFilter}
            onChange={setRenderFilter}
          />
        </div>

        {/* Table */}
        <div className="mt-10 overflow-x-auto rounded-3xl border border-white/10 bg-white/[0.02]">
          <table className="w-full min-w-[820px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left text-[11px] uppercase tracking-[0.24em] text-white/35">
                <th className="px-5 py-4 font-normal">{t.columnEngine}</th>
                <th className="px-5 py-4 font-normal">{t.columnRender}</th>
                <th className="px-5 py-4 font-normal">{t.columnFormats}</th>
                <th className="px-5 py-4 font-normal">{t.columnEdit}</th>
                <th className="px-5 py-4 font-normal">{t.columnPlugin}</th>
                <th className="px-5 py-4 font-normal">
                  {t.columnLastUpdate}
                </th>
              </tr>
            </thead>
            <tbody>
              {grouped.map((group) => (
                <CategoryGroup
                  key={group.category}
                  category={group.category}
                  items={group.items}
                  language={language}
                  expandedSlug={expandedSlug}
                  onToggle={(slug) =>
                    setExpandedSlug((prev) => (prev === slug ? null : slug))
                  }
                  copy={t}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* Caveats */}
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
            <p className="text-[11px] uppercase tracking-[0.32em] text-amber-200/70">
              {t.inDataIssues}
            </p>
            <p className="mt-3 text-sm leading-7 text-white/65">
              {t.inDataIssuesDesc}
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
            <p className="text-[11px] uppercase tracking-[0.32em] text-emerald-200/70">
              {t.transparencyTitle}
            </p>
            <p className="mt-3 text-sm leading-7 text-white/65">
              {t.transparencyDesc}
            </p>
            <ol className="mt-4 space-y-2 text-xs leading-6 text-white/45">
              {t.workflowSteps.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10 text-[10px] text-white/55">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </main>
  );
}

function LegendCell({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "emerald" | "sky" | "amber" | "muted";
}) {
  const dotClass = {
    emerald: "bg-emerald-300/80",
    sky: "bg-sky-300/80",
    amber: "bg-amber-300/80",
    muted: "bg-white/30",
  }[tone];
  return (
    <div className="sm:col-span-1">
      <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-white/40">
        <span className={`h-1.5 w-1.5 rounded-full ${dotClass}`} />
        {label}
      </div>
      <p className="mt-3 text-3xl font-semibold tracking-tight tabular-nums">
        {value}
      </p>
    </div>
  );
}

function FilterRow<T extends string>({
  label,
  allLabel,
  options,
  value,
  onChange,
}: {
  label: string;
  allLabel: string;
  options: { id: T; label: string }[];
  value: T | "all";
  onChange: (next: T | "all") => void;
}) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.32em] text-white/40">
        {label}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <FilterChip
          active={value === "all"}
          onClick={() => onChange("all")}
          label={allLabel}
        />
        {options.map((option) => (
          <FilterChip
            key={option.id}
            active={value === option.id}
            onClick={() => onChange(option.id)}
            label={option.label}
          />
        ))}
      </div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-1.5 text-xs uppercase tracking-[0.18em] transition ${
        active
          ? "border-white/40 bg-white/12 text-white"
          : "border-white/10 bg-transparent text-white/55 hover:border-white/25 hover:text-white"
      }`}
    >
      {label}
    </button>
  );
}

function CategoryGroup({
  category,
  items,
  language,
  expandedSlug,
  onToggle,
  copy: t,
}: {
  category: EngineCategory;
  items: EngineSupport[];
  language: "zh" | "en";
  expandedSlug: string | null;
  onToggle: (slug: string) => void;
  copy: CopyT;
}) {
  return (
    <>
      <tr className="bg-white/[0.025]">
        <td
          colSpan={6}
          className="px-5 py-3 text-[11px] uppercase tracking-[0.3em] text-white/45"
        >
          {engineCategoryLabels[category][language]}
        </td>
      </tr>
      {items.map((engine) => {
        const isExpanded = expandedSlug === engine.slug;
        return (
          <EngineRow
            key={engine.slug}
            engine={engine}
            language={language}
            isExpanded={isExpanded}
            onToggle={() => onToggle(engine.slug)}
            copy={t}
          />
        );
      })}
    </>
  );
}

function EngineRow({
  engine,
  language,
  isExpanded,
  onToggle,
  copy: t,
}: {
  engine: EngineSupport;
  language: "zh" | "en";
  isExpanded: boolean;
  onToggle: () => void;
  copy: CopyT;
}) {
  const renderBadge = (
    <div className="flex flex-wrap items-center gap-1.5">
      <span
        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.14em] ring-1 ring-inset ${renderBadgeClass[engine.splatRender]}`}
      >
        {splatRenderLabels[engine.splatRender][language]}
      </span>
      {engine.splatRenderMethod === "path-tracing" ? (
        <span className="inline-flex items-center rounded-full bg-fuchsia-400/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-fuchsia-200 ring-1 ring-inset ring-fuchsia-300/30">
          {language === "zh" ? "路径追踪" : "Path-traced"}
        </span>
      ) : null}
    </div>
  );

  let editLabel: string;
  if (engine.splatEdit === null) {
    editLabel = t.none;
  } else if (
    engine.splatEdit &&
    typeof engine.notes !== "string" &&
    /API/.test(engine.notes.en)
  ) {
    editLabel = t.apiOnly;
  } else if (engine.splatEdit) {
    editLabel = t.yes;
  } else {
    editLabel = t.no;
  }

  let pluginLabel: string;
  if (engine.splatRender === "native") {
    pluginLabel = t.pluginNative;
  } else if (engine.splatRender === "plugin" && engine.pluginName) {
    pluginLabel = t.pluginVia(engine.pluginName);
  } else if (engine.splatRender === "external") {
    pluginLabel = t.pluginExternal;
  } else {
    pluginLabel = t.pluginNoSupport;
  }

  const formats =
    engine.splatImportFormats.length === 0
      ? t.none
      : engine.splatImportFormats.join(" · ");

  return (
    <>
      <tr
        onClick={onToggle}
        className="cursor-pointer border-t border-white/[0.06] align-top transition hover:bg-white/[0.03]"
      >
        <td className="px-5 py-4">
          <div className="font-medium text-white">{engine.engineName}</div>
          {engine.engineVendor ? (
            <div className="mt-0.5 text-xs text-white/40">
              {engine.engineVendor}
            </div>
          ) : null}
        </td>
        <td className="px-5 py-4">{renderBadge}</td>
        <td className="px-5 py-4 text-xs uppercase tracking-[0.12em] text-white/55">
          {formats}
        </td>
        <td className="px-5 py-4 text-xs text-white/55">{editLabel}</td>
        <td className="px-5 py-4 text-xs text-white/55">
          {engine.pluginUrl ? (
            <a
              href={engine.pluginUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="underline-offset-4 hover:text-white hover:underline"
            >
              {pluginLabel}
            </a>
          ) : (
            <span>{pluginLabel}</span>
          )}
        </td>
        <td className="px-5 py-4 text-xs text-white/45 tabular-nums">
          {formatDateLabel(engine.pluginLastCommitAt)}
        </td>
      </tr>
      {isExpanded ? (
        <tr className="border-t border-white/[0.06] bg-black/40">
          <td colSpan={6} className="px-5 py-6">
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.3em] text-white/40">
                    {language === "zh" ? "审核备注" : "Review notes"}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-white/75">
                    {pickNotes(engine.notes, language)}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.3em] text-white/40">
                    {language === "zh" ? "原文证据" : "Verbatim evidence"}
                  </p>
                  <blockquote className="mt-2 border-l border-white/15 pl-4 text-sm italic leading-7 text-white/55">
                    “{engine.quoteEn}”
                  </blockquote>
                </div>
              </div>
              <div className="space-y-4">
                <DetailField
                  label={language === "zh" ? "首次支持" : "First supported"}
                  value={engine.firstSupported}
                />
                <DetailField
                  label={language === "zh" ? "维护方" : "Maintainer"}
                  value={engine.pluginAuthor ?? engine.engineVendor}
                />
                <DetailField
                  label={language === "zh" ? "审核状态" : "Status"}
                  value={
                    engine.verification === "verified"
                      ? `${t.verifiedBy} (${engine.verifiedBy ?? "—"})`
                      : t.pendingReview
                  }
                />
                <div>
                  <p className="text-[11px] uppercase tracking-[0.3em] text-white/40">
                    {t.columnSources} · {t.sourcesLabel(engine.sources.length)}
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {engine.sources.map((url) => (
                      <li key={url} className="text-xs">
                        <Link
                          href={url}
                          target="_blank"
                          rel="noreferrer"
                          className="break-all text-white/55 underline-offset-4 hover:text-white hover:underline"
                        >
                          {url.replace(/^https?:\/\//, "")}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </td>
        </tr>
      ) : null}
    </>
  );
}

function DetailField({
  label,
  value,
}: {
  label: string;
  value: string | null;
}) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.3em] text-white/40">
        {label}
      </p>
      <p className="mt-1.5 text-sm text-white/75">{value ?? "—"}</p>
    </div>
  );
}
