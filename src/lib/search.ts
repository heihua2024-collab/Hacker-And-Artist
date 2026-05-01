/**
 * 全站静态搜索索引（构建期生成，客户端做关键词匹配）
 * 覆盖：tools / glossary / news / insights / cases / learning-paths / learning-articles / gallery / 静态页面
 */

import type { Bilingual } from "@/lib/taxonomy";
import { tools } from "@/lib/data/tools";
import { glossary } from "@/lib/data/glossary";
import { news } from "@/lib/data/news";
import { insights } from "@/lib/data/insights";
import { cases } from "@/lib/data/cases";
import { learningPaths, learningPathStubs } from "@/lib/data/learning-paths";
import { learningArticles } from "@/lib/data/learning-articles";
import { featuredSplats } from "@/lib/data/featured-splats";
import { studioWorks } from "@/lib/data/studio-works";

export type SearchEntryType =
  | "tool"
  | "glossary"
  | "news"
  | "insight"
  | "case"
  | "learning-path"
  | "learning-article"
  | "gallery"
  | "media"
  | "page";

export type SearchEntry = {
  id: string;
  type: SearchEntryType;
  title: Bilingual;
  summary: Bilingual;
  href: string;
  /** 用于打分 / 匹配的额外文本（不展示） */
  keywords: string[];
  /** 可选：分类徽标，用于展示 */
  badge?: Bilingual;
  /** 可选：日期 */
  publishedAt?: string;
};

export const searchTypeLabels: Record<SearchEntryType, Bilingual> = {
  tool: { zh: "工具", en: "Tool" },
  glossary: { zh: "术语", en: "Term" },
  news: { zh: "动态", en: "News" },
  insight: { zh: "行业洞察", en: "Insight" },
  case: { zh: "案例", en: "Case" },
  "learning-path": { zh: "学习路径", en: "Path" },
  "learning-article": { zh: "学习笔记", en: "Article" },
  gallery: { zh: "画廊", en: "Gallery" },
  media: { zh: "媒体", en: "Media" },
  page: { zh: "页面", en: "Page" },
};

function compact(values: (string | undefined | null)[]): string[] {
  return values.filter((value): value is string => Boolean(value));
}

const toolEntries: SearchEntry[] = tools.map((tool) => ({
  id: `tool:${tool.slug}`,
  type: "tool",
  title: { zh: tool.name, en: tool.name },
  summary: tool.tagline,
  href: `/tools?category=${tool.category}`,
  keywords: compact([
    tool.name,
    tool.tagline.zh,
    tool.tagline.en,
    tool.description.zh,
    tool.description.en,
    ...tool.tags,
    ...tool.platforms,
    tool.category,
    tool.region,
    tool.pricing,
  ]),
  badge: { zh: "工具", en: "Tool" },
}));

const glossaryEntries: SearchEntry[] = glossary.map((g) => ({
  id: `glossary:${g.id}`,
  type: "glossary",
  title: g.term,
  summary: g.short ?? g.definition,
  href: `/glossary#${g.id}`,
  keywords: [
    g.term.zh,
    g.term.en,
    ...g.aliases,
    g.definition.zh,
    g.definition.en,
    g.short?.zh ?? "",
    g.short?.en ?? "",
    g.category,
    ...(g.relatedTerms ?? []),
  ],
  badge: { zh: "术语", en: "Term" },
}));

const newsEntries: SearchEntry[] = news.map((n) => ({
  id: `news:${n.id}`,
  type: "news",
  title: n.title,
  summary: n.summary,
  href: `/news#${n.id}`,
  keywords: [
    n.title.zh,
    n.title.en,
    n.summary.zh,
    n.summary.en,
    n.editorialNote.zh,
    n.editorialNote.en,
    n.source.name,
    n.category,
    ...n.tags,
  ],
  publishedAt: n.publishedAt,
  badge: { zh: "动态", en: "News" },
}));

const insightEntries: SearchEntry[] = insights.map((i) => ({
  id: `insight:${i.slug}`,
  type: "insight",
  title: i.title,
  summary: i.summary,
  href: `/insights/${i.slug}`,
  keywords: [
    i.title.zh,
    i.title.en,
    i.subtitle.zh,
    i.subtitle.en,
    i.summary.zh,
    i.summary.en,
    i.category,
    ...i.tags,
    ...i.body.flatMap((sec) => [
      sec.heading.zh,
      sec.heading.en,
      ...sec.paragraphs.flatMap((p) => [p.zh, p.en]),
    ]),
  ],
  publishedAt: i.publishedAt,
  badge: { zh: "行业洞察", en: "Insight" },
}));

const caseEntries: SearchEntry[] = cases.map((c) => ({
  id: `case:${c.slug}`,
  type: "case",
  title: c.title,
  summary: c.summary,
  href: `/cases/${c.slug}`,
  keywords: [
    c.title.zh,
    c.title.en,
    c.summary.zh,
    c.summary.en,
    c.description.zh,
    c.description.en,
    c.kind,
    c.spaceType ?? "",
    c.location.country ?? "",
    c.location.city ?? "",
    c.location.site ?? "",
    ...c.creators.map((cr) => cr.name),
    ...c.tags,
  ],
  publishedAt: c.publishedAt,
  badge: { zh: "案例", en: "Case" },
}));

const learningPathEntries: SearchEntry[] = learningPaths.map((p) => ({
  id: `learning-path:${p.slug}`,
  type: "learning-path",
  title: p.title,
  summary: p.subtitle,
  href: `/learn/${p.slug}`,
  keywords: [
    p.title.zh,
    p.title.en,
    p.subtitle.zh,
    p.subtitle.en,
    p.audience.zh,
    p.audience.en,
    p.level,
    ...p.modules.flatMap((m) => [
      m.title.zh,
      m.title.en,
      m.summary.zh,
      m.summary.en,
      ...m.keyConcepts,
    ]),
  ],
  badge: { zh: "学习路径", en: "Path" },
}));

// learningPathStubs 用于补充存在但还没有满血对象的占位（按当前数据已对齐，但保留以防）
const seenPaths = new Set(learningPaths.map((p) => p.slug));
for (const stub of learningPathStubs) {
  if (seenPaths.has(stub.slug)) continue;
  learningPathEntries.push({
    id: `learning-path:${stub.slug}`,
    type: "learning-path",
    title: stub.title,
    summary: stub.summary,
    href: `/learn/${stub.slug}`,
    keywords: [
      stub.title.zh,
      stub.title.en,
      stub.summary.zh,
      stub.summary.en,
      stub.meta.zh,
      stub.meta.en,
    ],
    badge: { zh: "学习路径", en: "Path" },
  });
}

const learningArticleEntries: SearchEntry[] = learningArticles.map((a) => ({
  id: `learning-article:${a.slug}`,
  type: "learning-article",
  title: a.title,
  summary: a.summary,
  href: `/learn/articles/${a.slug}`,
  keywords: [
    a.title.zh,
    a.title.en,
    a.summary.zh,
    a.summary.en,
    a.category,
    a.relatedPathSlug ?? "",
    ...a.sections.flatMap((sec) => [
      sec.heading.zh,
      sec.heading.en,
      ...sec.paragraphs.flatMap((p) => [p.zh, p.en]),
    ]),
  ],
  publishedAt: a.publishedAt,
  badge: { zh: "学习笔记", en: "Article" },
}));

const galleryEntries: SearchEntry[] = featuredSplats.map((work) => ({
  id: `gallery:${work.slug}`,
  type: "gallery",
  title: work.title,
  summary: work.description,
  href: `/gallery/${work.slug}`,
  keywords: [
    work.title.zh,
    work.title.en,
    work.description.zh,
    work.description.en,
    work.category,
    work.platform,
    work.author?.name ?? "",
    work.sourceUrl,
  ],
  badge: { zh: "画廊", en: "Gallery" },
}));

const mediaEntries: SearchEntry[] = studioWorks.map((work) => ({
  id: `media:${work.slug}`,
  type: "media",
  title: work.title,
  summary: work.description,
  href: `/media/${work.slug}`,
  keywords: [
    work.title.zh,
    work.title.en,
    work.description.zh,
    work.description.en,
    work.category,
    work.exhibition?.gallery.zh ?? "",
    work.exhibition?.gallery.en ?? "",
    work.exhibition?.name.zh ?? "",
    work.exhibition?.name.en ?? "",
    work.location?.city ?? "",
    work.device ?? "",
  ],
  badge: { zh: "媒体", en: "Media" },
}));

const pageEntries: SearchEntry[] = [
  {
    id: "page:about",
    type: "page",
    title: { zh: "关于印刻万物 TOP3DGS", en: "About TOP3DGS" },
    summary: {
      zh: "印刻万物的品牌叙事页：我们如何理解高斯泼溅、空间媒体与场所记忆。",
      en: "Brand narrative of TOP3DGS: how we read Gaussian Splatting, spatial media, and place memory.",
    },
    href: "/about",
    keywords: ["about", "印刻万物", "TOP3DGS", "Gaussian Splatting"],
  },
  {
    id: "page:learn",
    type: "page",
    title: { zh: "学习路径索引", en: "Learn" },
    summary: {
      zh: "四条学习路径与延伸笔记，从零基础到空间叙事实验。",
      en: "Four learning paths plus extended notes, from first principles to spatial narrative.",
    },
    href: "/learn",
    keywords: ["learn", "学习", "学习路径", "tutorial"],
  },
  {
    id: "page:tools",
    type: "page",
    title: { zh: "工具索引", en: "Tools" },
    summary: {
      zh: "按采集 → 训练 → 编辑 → 查看 → 发布维度梳理的工具表。",
      en: "Tools mapped along capture → training → editing → viewing → publishing.",
    },
    href: "/tools",
    keywords: ["tool", "工具", "tools", "matrix"],
  },
  {
    id: "page:tools-engines",
    type: "page",
    title: { zh: "引擎兼容矩阵", en: "Engines Matrix" },
    summary: {
      zh: "引擎能否原生渲染 3DGS 文件的客观速查表。",
      en: "Objective lookup table on which engines can render 3DGS natively.",
    },
    href: "/tools/engines",
    keywords: ["engine", "matrix", "兼容", "渲染"],
  },
  {
    id: "page:cases",
    type: "page",
    title: { zh: "案例与里程碑", en: "Cases & Milestones" },
    summary: {
      zh: "学术里程碑论文与真实空间案例。",
      en: "Milestone papers and real spatial cases.",
    },
    href: "/cases",
    keywords: ["case", "milestone", "案例", "论文"],
  },
  {
    id: "page:gallery",
    type: "page",
    title: { zh: "画廊 · 创作者精选", en: "Gallery · Creator Picks" },
    summary: {
      zh: "社区与研究团队的高斯泼溅精选案例合集，按建筑、室内、自然、物件、学术 Demo 和互动查看器分组。",
      en: "Curated community and research Gaussian Splatting scenes, grouped by architecture, interior, nature, objects, academic demos, and interactive viewers.",
    },
    href: "/gallery",
    keywords: ["gallery", "画廊", "splat", "featured", "creator picks"],
  },
  {
    id: "page:news",
    type: "page",
    title: { zh: "动态", en: "News" },
    summary: {
      zh: "论文、工具、行业、社区与艺术五维动态聚合。",
      en: "Aggregated updates across papers, tools, industry, community, and art.",
    },
    href: "/news",
    keywords: ["news", "动态", "industry"],
  },
  {
    id: "page:insights",
    type: "page",
    title: { zh: "行业洞察", en: "Insights" },
    summary: {
      zh: "技术深读、产品信号、现场报道与中国市场观察。",
      en: "Tech deep-dives, product signals, field reports, China market observations.",
    },
    href: "/insights",
    keywords: ["insight", "行业洞察", "deep-dive"],
  },
  {
    id: "page:glossary",
    type: "page",
    title: { zh: "术语库", en: "Glossary" },
    summary: {
      zh: "辐射场、3DGS、空间媒体相关术语索引。",
      en: "Glossary index for radiance fields, 3DGS, and spatial media.",
    },
    href: "/glossary",
    keywords: ["glossary", "术语", "term"],
  },
  {
    id: "page:community",
    type: "page",
    title: { zh: "社区", en: "Community" },
    summary: {
      zh: "印刻万物社区入口（建设中）。",
      en: "Community entry for TOP3DGS (in progress).",
    },
    href: "/community",
    keywords: ["community", "社区"],
  },
  {
    id: "page:media",
    type: "page",
    title: { zh: "媒体", en: "Media" },
    summary: {
      zh: "印刻万物自己采集的展览作品，未来将加入视频、访谈与讲座等原创内容。",
      en: "TOP3DGS' own exhibition captures, plus upcoming videos, interviews, and talks.",
    },
    href: "/media",
    keywords: ["media", "媒体", "studio", "工作室"],
  },
];

export const searchIndex: SearchEntry[] = [
  ...toolEntries,
  ...glossaryEntries,
  ...newsEntries,
  ...insightEntries,
  ...caseEntries,
  ...learningPathEntries,
  ...learningArticleEntries,
  ...galleryEntries,
  ...mediaEntries,
  ...pageEntries,
];

const SCORE = {
  titleExact: 200,
  titleStart: 120,
  titleContain: 80,
  summary: 30,
  keywords: 18,
};

function normalize(text: string): string {
  return text.toLowerCase().normalize("NFKC");
}

function tokenize(query: string): string[] {
  return Array.from(
    new Set(
      normalize(query)
        .split(/[\s,，、；;]+/)
        .filter(Boolean),
    ),
  );
}

function entryHaystack(entry: SearchEntry) {
  return {
    title: normalize(`${entry.title.zh} ${entry.title.en}`),
    summary: normalize(`${entry.summary.zh} ${entry.summary.en}`),
    keywords: normalize(entry.keywords.filter(Boolean).join(" ")),
  };
}

export type SearchHit = SearchEntry & { score: number };

export function searchAll(query: string, limit = 80): SearchHit[] {
  const tokens = tokenize(query);
  if (tokens.length === 0) return [];

  const hits: SearchHit[] = [];

  for (const entry of searchIndex) {
    const hay = entryHaystack(entry);
    let score = 0;
    let matchedAll = true;

    for (const token of tokens) {
      let tokenScore = 0;
      if (hay.title === token) tokenScore += SCORE.titleExact;
      else if (hay.title.startsWith(token)) tokenScore += SCORE.titleStart;
      else if (hay.title.includes(token)) tokenScore += SCORE.titleContain;

      if (hay.summary.includes(token)) tokenScore += SCORE.summary;
      if (hay.keywords.includes(token)) tokenScore += SCORE.keywords;

      if (tokenScore === 0) {
        matchedAll = false;
        break;
      }
      score += tokenScore;
    }

    if (matchedAll && score > 0) {
      hits.push({ ...entry, score });
    }
  }

  hits.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (a.publishedAt && b.publishedAt) {
      return b.publishedAt.localeCompare(a.publishedAt);
    }
    return 0;
  });
  return hits.slice(0, limit);
}

export function groupHitsByType(hits: SearchHit[]) {
  const groups = new Map<SearchEntryType, SearchHit[]>();
  for (const hit of hits) {
    const list = groups.get(hit.type) ?? [];
    list.push(hit);
    groups.set(hit.type, list);
  }
  return Array.from(groups.entries());
}
