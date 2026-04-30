"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/components/shared/LanguageProvider";
import {
  pricingLabels,
  toolCategories,
  tools,
  type Tool,
  type ToolCategory,
  type ToolDiscoverySource,
  type ToolPricing,
  type ToolRegion,
} from "@/lib/data/tools";
import {
  levelsById,
  spaceTypesById,
  tagsById,
} from "@/lib/taxonomy";

type Filter = "all" | ToolCategory;
type LevelFilter = "beginner" | "intermediate" | "expert";

const REGION_ORDER: ToolRegion[] = [
  "global",
  "china",
  "japan",
  "korea",
  "europe",
  "north-america",
  "other",
];

const REGION_LABEL: Record<ToolRegion, { zh: string; en: string }> = {
  global: { zh: "全球", en: "Global" },
  china: { zh: "中国", en: "China" },
  japan: { zh: "日本", en: "Japan" },
  korea: { zh: "韩国", en: "Korea" },
  europe: { zh: "欧洲", en: "Europe" },
  "north-america": { zh: "北美", en: "North America" },
  other: { zh: "其他", en: "Other" },
};

const SOURCE_ORDER: ToolDiscoverySource[] = [
  "radiance-fields",
  "supersplat",
  "reddit",
  "x-twitter",
  "china-zone",
  "japan-korea-zone",
  "user-feedback",
  "user-workflow",
  "manual",
];

const SOURCE_LABEL: Record<ToolDiscoverySource, { zh: string; en: string }> = {
  "radiance-fields": { zh: "Radiance Fields", en: "Radiance Fields" },
  supersplat: { zh: "SuperSplat 生态", en: "SuperSplat ecosystem" },
  reddit: { zh: "Reddit", en: "Reddit" },
  "x-twitter": { zh: "X / Twitter", en: "X / Twitter" },
  "china-zone": { zh: "中国区", en: "China zone" },
  "japan-korea-zone": { zh: "日韩区", en: "Japan/Korea zone" },
  "user-feedback": { zh: "用户反馈", en: "User feedback" },
  "user-workflow": { zh: "用户工作流", en: "User workflow" },
  manual: { zh: "人工补录", en: "Manual" },
};

const PRICING_ORDER: ToolPricing[] = [
  "free",
  "freemium",
  "subscription",
  "one-time",
  "enterprise",
];

const LEVEL_ORDER: LevelFilter[] = ["beginner", "intermediate", "expert"];

function parseRegionParam(raw: string | null): ToolRegion[] {
  if (!raw) return [];
  const allowed = new Set<string>(REGION_ORDER);
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter((s): s is ToolRegion => allowed.has(s));
}

function parseCategoryParam(raw: string | null): Filter {
  if (!raw) return "all";
  const allowed = new Set<string>(["all", ...toolCategories.map((cat) => cat.id)]);
  return allowed.has(raw) ? (raw as Filter) : "all";
}

const copy = {
  zh: {
    eyebrow: "工具与资源",
    title: "高斯泼溅工具索引",
    description:
      "我们沿采集 → 训练 → 编辑 → 查看 → 发布的工作流维度，整理印刻万物认为值得创作者了解的工具。",
    all: "全部",
    countLabel: (n: number) => `共 ${n} 个工具`,
    visit: "访问",
    repo: "仓库",
    open: "开源",
    closed: "闭源",
    license: "协议",
    pros: "优点",
    cons: "限制",
    useCases: "适用场景",
    platforms: "平台",
    unverified: "信息待核实",
    matrixEyebrow: "新增 · 兼容性矩阵",
    matrixTitle: "我手上这款软件，能直接渲染高斯泼溅文件吗？",
    matrixDesc:
      "针对引擎/软件维度的客观速查表。每一格都附带源码或官方文档级别的引用证据，标注「原生 / 插件 / 外部桥接 / 不支持」四档。",
    matrixCta: "进入兼容性矩阵 →",
    regionEyebrow: "区域（多选）",
    regionClear: "清除区域",
    groupingEyebrow: "分组概览",
    groupingTitle: "按区域、来源、难度与价格快速判断工具池",
    byRegion: "区域",
    bySource: "发现来源",
    byLevel: "难度",
    byPricing: "价格",
  },
  en: {
    eyebrow: "Tools & Resources",
    title: "Gaussian Splatting Tools Index",
    description:
      "Curated along the capture → training → editing → viewing → publishing workflow—tools the INKTOYS community thinks are worth knowing.",
    all: "All",
    countLabel: (n: number) => `${n} tools`,
    visit: "Visit",
    repo: "Repo",
    open: "Open Source",
    closed: "Proprietary",
    license: "License",
    pros: "Strengths",
    cons: "Limitations",
    useCases: "Use Cases",
    platforms: "Platforms",
    unverified: "Pending verification",
    matrixEyebrow: "New · Compatibility Matrix",
    matrixTitle:
      "Can the software I already use actually render Gaussian Splatting files?",
    matrixDesc:
      "An engine-centric look-up table. Every cell is backed by source code or official documentation citations, labeled across four tiers: Native / Plugin / External / Unsupported.",
    matrixCta: "Open the matrix →",
    regionEyebrow: "Region (multi)",
    regionClear: "Clear regions",
    groupingEyebrow: "Grouping",
    groupingTitle: "Read the pool by region, source, level, and pricing",
    byRegion: "Region",
    bySource: "Discovery source",
    byLevel: "Level",
    byPricing: "Pricing",
  },
} as const;

export function ToolsExplorer() {
  const { language } = useLanguage();
  const t = copy[language];
  const isZh = language === "zh";
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const regionParam = searchParams.get("region");
  const categoryParam = searchParams.get("category");

  const [filter, setFilter] = useState<Filter>(() =>
    parseCategoryParam(categoryParam),
  );
  const [regions, setRegions] = useState<ToolRegion[]>(() =>
    parseRegionParam(regionParam),
  );

  useEffect(() => {
    setRegions(parseRegionParam(regionParam));
  }, [regionParam]);

  useEffect(() => {
    setFilter(parseCategoryParam(categoryParam));
  }, [categoryParam]);

  const setFilterInUrl = (next: Filter) => {
    setFilter(next);
    const q = new URLSearchParams(searchParams.toString());
    if (next === "all") q.delete("category");
    else q.set("category", next);
    const qs = q.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const setRegionsInUrl = (next: ToolRegion[]) => {
    setRegions(next);
    const q = new URLSearchParams(searchParams.toString());
    if (next.length) q.set("region", [...next].sort().join(","));
    else q.delete("region");
    const qs = q.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const toggleRegion = (r: ToolRegion) => {
    const next = regions.includes(r)
      ? regions.filter((x) => x !== r)
      : [...regions, r];
    setRegionsInUrl(next);
  };

  const clearRegions = () => setRegionsInUrl([]);

  const filtered = useMemo(() => {
    let list =
      filter === "all"
        ? tools
        : tools.filter((tool) => tool.category === filter);
    if (regions.length > 0) {
      list = list.filter(
        (tool) => tool.region && regions.includes(tool.region),
      );
    }
    return list;
  }, [filter, regions]);

  const counts = useMemo(() => {
    const map: Record<Filter, number> = {
      all: tools.length,
      capture: 0,
      training: 0,
      editing: 0,
      viewing: 0,
      publishing: 0,
    };
    tools.forEach((tool) => {
      map[tool.category] += 1;
    });
    return map;
  }, []);

  const regionCounts = useMemo(() => {
    const base =
      filter === "all"
        ? tools
        : tools.filter((tool) => tool.category === filter);
    const map = {} as Record<ToolRegion, number>;
    REGION_ORDER.forEach((id) => {
      map[id] = 0;
    });
    base.forEach((tool) => {
      if (tool.region) map[tool.region] += 1;
    });
    return map;
  }, [filter]);

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

        <Link
          href="/tools/engines"
          className="group mt-10 flex flex-col gap-3 rounded-3xl border border-white/12 bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-transparent p-6 transition hover:border-white/30 hover:bg-white/[0.04] sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:p-7"
        >
          <div className="max-w-2xl">
            <p className="text-[11px] uppercase tracking-[0.32em] text-emerald-200/70">
              {t.matrixEyebrow}
            </p>
            <h2 className="mt-3 text-xl font-medium leading-snug tracking-[-0.02em] text-white sm:text-2xl">
              {t.matrixTitle}
            </h2>
            <p className="mt-3 text-sm leading-7 text-white/55">
              {t.matrixDesc}
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center self-start rounded-full border border-white/20 bg-black/40 px-5 py-3 text-xs font-medium uppercase tracking-[0.24em] text-white/82 transition group-hover:border-white/50 group-hover:text-white sm:self-center">
            {t.matrixCta}
          </span>
        </Link>

        <div className="mt-12 flex flex-wrap gap-2">
          <FilterChip
            active={filter === "all"}
              onClick={() => setFilterInUrl("all")}
            label={t.all}
            count={counts.all}
          />
          {toolCategories.map((cat) => (
            <FilterChip
              key={cat.id}
              active={filter === cat.id}
              onClick={() => setFilterInUrl(cat.id)}
              label={cat.label[language]}
              count={counts[cat.id]}
            />
          ))}
        </div>

        <div className="mt-8">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-xs uppercase tracking-[0.32em] text-white/36">
              {t.regionEyebrow}
            </p>
            {regions.length > 0 ? (
              <button
                type="button"
                onClick={clearRegions}
                className="text-[11px] uppercase tracking-[0.2em] text-emerald-200/80 underline-offset-4 hover:underline"
              >
                {t.regionClear}
              </button>
            ) : null}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {REGION_ORDER.map((rid) => (
              <FilterChip
                key={rid}
                active={regions.includes(rid)}
                onClick={() => toggleRegion(rid)}
                label={REGION_LABEL[rid][language]}
                count={regionCounts[rid]}
              />
            ))}
          </div>
        </div>

        <p className="mt-6 text-xs uppercase tracking-[0.32em] text-white/36">
          {t.countLabel(filtered.length)}
        </p>

        <ToolGroupingOverview tools={filtered} language={language} t={t} />

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} isZh={isZh} t={t} />
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

function ToolGroupingOverview({
  tools,
  language,
  t,
}: {
  tools: Tool[];
  language: "zh" | "en";
  t: (typeof copy)[keyof typeof copy];
}) {
  const regionItems = REGION_ORDER.map((id) => ({
    id,
    label: REGION_LABEL[id][language],
    count: tools.filter((tool) => tool.region === id).length,
  })).filter((item) => item.count > 0);
  const sourceItems = SOURCE_ORDER.map((id) => ({
    id,
    label: SOURCE_LABEL[id][language],
    count: tools.filter((tool) => tool.discoverySource === id).length,
  })).filter((item) => item.count > 0);
  const levelItems = LEVEL_ORDER.map((id) => ({
    id,
    label: levelsById[id].label[language],
    count: tools.filter((tool) => tool.level === id).length,
  })).filter((item) => item.count > 0);
  const pricingItems = PRICING_ORDER.map((id) => ({
    id,
    label: pricingLabels[id][language],
    count: tools.filter((tool) => tool.pricing === id).length,
  })).filter((item) => item.count > 0);

  return (
    <section className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 sm:p-6">
      <p className="text-[0.62rem] uppercase tracking-[0.34em] text-white/34">
        {t.groupingEyebrow}
      </p>
      <h2 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-white">
        {t.groupingTitle}
      </h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <GroupBlock title={t.byRegion} items={regionItems} />
        <GroupBlock title={t.bySource} items={sourceItems} />
        <GroupBlock title={t.byLevel} items={levelItems} />
        <GroupBlock title={t.byPricing} items={pricingItems} />
      </div>
    </section>
  );
}

function GroupBlock({
  title,
  items,
}: {
  title: string;
  items: { id: string; label: string; count: number }[];
}) {
  return (
    <div className="rounded-[1.35rem] border border-white/10 bg-black/20 p-4">
      <p className="text-[0.62rem] uppercase tracking-[0.28em] text-white/36">{title}</p>
      <div className="mt-3 space-y-2">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between gap-3 text-sm">
            <span className="truncate text-white/68">{item.label}</span>
            <span className="rounded-full bg-white/[0.08] px-2 py-0.5 text-xs text-white/58">
              {item.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ToolCard({
  tool,
  isZh,
  t,
}: {
  tool: Tool;
  isZh: boolean;
  t: (typeof copy)[keyof typeof copy];
}) {
  const language = isZh ? "zh" : "en";
  const level = levelsById[tool.level];
  const pricing = pricingLabels[tool.pricing];
  const initials = tool.name
    .replace(/[^A-Za-z0-9 ]/g, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .filter(Boolean)
    .join("");

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition hover:border-white/24 hover:bg-white/[0.07]">
      <header className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] text-sm font-semibold text-white/72">
          {initials || tool.name.slice(0, 2).toUpperCase()}
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-xl font-semibold tracking-[-0.04em] text-white">
            {tool.name}
          </h2>
          <p className="mt-1 line-clamp-2 text-sm leading-6 text-white/58">
            {tool.tagline[language]}
          </p>
        </div>
      </header>

      <div className="mt-5 flex flex-wrap gap-2">
        <Chip>{pricing[language]}</Chip>
        {level && <Chip>{level.label[language]}</Chip>}
        <Chip>{tool.openSource ? t.open : t.closed}</Chip>
        {tool.license && <Chip>{`${t.license} ${tool.license}`}</Chip>}
      </div>

      <p className="mt-5 line-clamp-4 text-sm leading-6 text-white/68">
        {tool.description[language]}
      </p>

      {tool.pros.length > 0 && (
        <div className="mt-5">
          <p className="text-[0.65rem] uppercase tracking-[0.32em] text-white/35">
            {t.pros}
          </p>
          <ul className="mt-2 space-y-1.5 text-sm leading-6 text-white/72">
            {tool.pros.slice(0, 2).map((pro, idx) => (
              <li key={idx} className="flex gap-2">
                <span className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-white/40" />
                <span>{pro[language]}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-5 grid gap-3 text-[0.7rem] uppercase tracking-[0.26em] text-white/44">
        <div>
          <span className="text-white/30">{t.platforms}: </span>
          <span className="text-white/68">{tool.platforms.join(" · ")}</span>
        </div>
        {tool.useCases.length > 0 && (
          <div className="flex flex-wrap items-center gap-1">
            <span className="text-white/30">{t.useCases}: </span>
            {tool.useCases.map((id) => {
              const item = spaceTypesById[id];
              if (!item) return null;
              return (
                <span
                  key={id}
                  className="rounded-full border border-white/12 px-2 py-0.5 text-[0.6rem] tracking-[0.22em] text-white/72"
                >
                  {item.label[language]}
                </span>
              );
            })}
          </div>
        )}
        {tool.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-1">
            {tool.tags.map((id) => {
              const item = tagsById[id];
              if (!item) return null;
              return (
                <span
                  key={id}
                  className="rounded-full bg-white/[0.05] px-2 py-0.5 text-[0.6rem] tracking-[0.22em] text-white/56"
                >
                  #{item.label[language]}
                </span>
              );
            })}
          </div>
        )}
      </div>

      <footer className="mt-auto flex items-center justify-between gap-3 pt-6">
        <a
          href={tool.homepageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 rounded-full bg-[#f7f4ed] px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-[#050505] transition hover:bg-white"
        >
          {t.visit}
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M1 9L9 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            <path d="M3 1H9V7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
        {tool.repoUrl && (
          <a
            href={tool.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium uppercase tracking-[0.24em] text-white/56 transition hover:text-white"
          >
            {t.repo}
          </a>
        )}
        {!tool.verified && (
          <span className="ml-auto text-[0.6rem] uppercase tracking-[0.28em] text-amber-300/80">
            {t.unverified}
          </span>
        )}
      </footer>
    </article>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/12 bg-white/[0.045] px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.24em] text-white/68">
      {children}
    </span>
  );
}
