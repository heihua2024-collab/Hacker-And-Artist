"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/shared/LanguageProvider";
import { NewsCard } from "@/components/landing/NewsCard";
import {
  dailySignal,
  featuredHero,
  trendingPicks,
} from "@/lib/data/news";
import {
  featuredSplats,
  featuredSplatsHero,
  featuredCategoriesById,
} from "@/lib/data/featured-splats";
import {
  featuredStudioWork,
  studioWorks,
} from "@/lib/data/studio-works";
import { EMBED_PLATFORM_LABEL } from "@/lib/data/splat-embed";
import { learningPathStubs } from "@/lib/data/learning-paths";
import {
  toolCategories,
  tools,
  type ToolCategory,
} from "@/lib/data/tools";
import { SplatPoster } from "@/components/landing/SplatEmbed";

const BridgeScene = dynamic(
  () =>
    import("@/components/webgl/SceneCanvas").then((module) => module.SceneCanvas),
  {
    loading: () => null,
    ssr: false,
  },
);

const navItems = [
  ["学习", "Learn", "/learn"],
  ["工具", "Tools", "/tools"],
  ["画廊", "Gallery", "/gallery"],
  ["动态", "News", "/news"],
  ["媒体", "Media", "/media"],
  ["社区", "Community", "/community"],
] as const;

const featuredSlots = [
  ["精选文章", "Featured Article"],
  ["工具聚焦", "Tool Spotlight"],
  ["案例研究", "Case Study"],
  ["创作者访谈", "Creator Interview"],
] as const;

const copy = {
  zh: {
    about: "关于我们",
    eyebrow: "高斯泼溅内容社区",
    heroTitle: "探索高斯泼溅的内容、工具与空间媒体趋势",
    heroDescription:
      "印刻万物聚合高斯泼溅领域的工具、案例、教程与趋势，帮助创作者理解媒体的下一种表达方式。",
    searchPlaceholder: "搜索工具、案例、教程...",
    search: "搜索",
    leadStory: "头条内容",
    latestTool: "最新工具",
    editorPick: "编辑精选",
    latest: "最新内容",
    allPosts: "全部内容",
    trending: "正在被关注",
    trendingTopic: "热门话题",
    hotWorkflow: "热门工作流",
    communityPick: "社区精选",
    learn: "学习路径",
    learningAction: "进入路径",
    toolsEyebrow: "工具与资源",
    tools: "工具索引",
    toolsAction: "查看工具",
    toolCount: (n: number) => `${n} 个工具`,
    cases: "画廊：创作者精选的高斯泼溅",
    galleryHint: "进入画廊 · 浏览器内直接交互",
    galleryAll: "查看全部",
    galleryStat: `${featuredSplats.length} 件精选 · 建筑 / 室内 / 自然 / 物件 / 学术 / 互动`,
    galleryPreview: "本期精选",
    mediaEyebrow: "Media",
    mediaTitle: "媒体：印刻万物自家的展览与视频",
    mediaDesc: "20 件工作室采集的展览空间，另含筹备中的视频、访谈与讲座。",
    mediaAction: "进入媒体",
    mediaStat: `${studioWorks.length} 件展览作品 · 视频内容筹备中`,
    footer: "高斯泼溅内容社区框架",
    menu: "菜单",
    close: "关闭",
    quickAccess: "快速入口",
  },
  en: {
    about: "About Us",
    eyebrow: "Gaussian Splatting Community",
    heroTitle:
      "Explore Gaussian Splatting content, tools, and spatial media trends",
    heroDescription:
      "TOP3DGS (印刻万物) aggregates tools, cases, tutorials, and trends in Gaussian Splatting to help creators understand the next expressive form of media.",
    searchPlaceholder: "Search tools, cases, tutorials...",
    search: "Search",
    leadStory: "Lead Story",
    latestTool: "Latest Tool",
    editorPick: "Editor Pick",
    latest: "Latest Content",
    allPosts: "All Posts",
    trending: "Trending",
    trendingTopic: "Trending Topic",
    hotWorkflow: "Hot Workflow",
    communityPick: "Community Pick",
    learn: "Learning Paths",
    learningAction: "Enter path",
    toolsEyebrow: "Tools & Resources",
    tools: "Tool Index",
    toolsAction: "View tools",
    toolCount: (n: number) => `${n} tools`,
    cases: "Gallery: Creator-Picked Gaussian Splats",
    galleryHint: "Enter the gallery · interact in-browser",
    galleryAll: "View all",
    galleryStat: `${featuredSplats.length} picks · Architecture / Interior / Nature / Objects / Academic / Interactive`,
    galleryPreview: "Featured pick",
    mediaEyebrow: "Media",
    mediaTitle: "Media: TOP3DGS' Own Exhibitions & Videos",
    mediaDesc: "Twenty exhibition spaces captured in-house, plus upcoming videos, interviews, and talks.",
    mediaAction: "Open media",
    mediaStat: `${studioWorks.length} exhibition captures · Video content in progress`,
    footer: "Gaussian Splatting Community Framework",
    menu: "Menu",
    close: "Close",
    quickAccess: "Quick Access",
  },
} as const;

function SectionHeader({
  eyebrow,
  title,
  action = "Coming soon",
  actionHref,
}: {
  eyebrow: string;
  title: string;
  action?: string;
  actionHref?: string;
}) {
  return (
    <div className="mb-8 flex items-end justify-between gap-6">
      <div>
        <p className="text-xs uppercase tracking-[0.42em] text-white/36">
          {eyebrow}
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
          {title}
        </h2>
      </div>
      {actionHref ? (
        <Link
          href={actionHref}
          className="hidden rounded-full border border-white/14 px-4 py-2 text-xs uppercase tracking-[0.26em] text-white/68 transition hover:border-white/32 hover:text-white sm:inline-flex"
        >
          {action} →
        </Link>
      ) : (
        <span className="hidden rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.26em] text-white/38 sm:inline-flex">
          {action}
        </span>
      )}
    </div>
  );
}

function EmptyCard({
  label,
  large = false,
}: {
  label: string;
  large?: boolean;
}) {
  return (
    <article
      className={`group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl transition hover:border-white/24 hover:bg-white/[0.075] ${
        large ? "min-h-[24rem]" : "min-h-[15rem]"
      }`}
    >
      <div className="absolute inset-x-8 top-8 h-24 rounded-full bg-white/[0.045] blur-3xl transition group-hover:bg-[#1e88e5]/10" />
      <div className="relative flex h-full flex-col justify-between">
        <p className="text-xs uppercase tracking-[0.32em] text-white/35">
          {label}
        </p>
        <div>
          <div className="mb-5 h-2 w-20 rounded-full bg-white/12" />
          <div className="space-y-3">
            <div className="h-3 w-4/5 rounded-full bg-white/10" />
            <div className="h-3 w-2/3 rounded-full bg-white/[0.075]" />
            <div className="h-3 w-1/2 rounded-full bg-white/[0.06]" />
          </div>
        </div>
      </div>
    </article>
  );
}

export function CommunityHome() {
  const { language } = useLanguage();
  const t = copy[language];
  const isZh = language === "zh";
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const submitSearch = (value: string) => {
    const v = value.trim();
    router.push(v ? `/search?q=${encodeURIComponent(v)}` : "/search");
  };
  const toolCounts = tools.reduce(
    (acc, tool) => {
      acc[tool.category] += 1;
      return acc;
    },
    {
      capture: 0,
      training: 0,
      editing: 0,
      viewing: 0,
      publishing: 0,
    } as Record<ToolCategory, number>,
  );

  return (
    <main className="min-h-screen overflow-hidden bg-[#050505] text-[#f7f4ed]">
      <section className="relative border-b border-white/10 px-5 pb-14 pt-24 sm:px-10 sm:pt-28 lg:px-16 lg:pt-32">
        <div className="pointer-events-none absolute left-1/2 top-6 z-0 h-[38rem] w-[150vw] -translate-x-1/2 touch-none opacity-100 sm:top-0 sm:h-[48rem] sm:w-[124vw] sm:opacity-95 lg:top-4 lg:h-[54rem]">
          <div aria-hidden className="particle-bridge-fallback">
            <span className="particle-bridge-dot" />
          </div>
          <BridgeScene />
        </div>
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_54%_36%,rgba(255,255,255,0.1),transparent_42%),linear-gradient(180deg,rgba(5,5,5,0.04)_0%,rgba(5,5,5,0.48)_64%,#050505_94%)] sm:bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.09),transparent_38%),linear-gradient(180deg,rgba(5,5,5,0.04)_0%,rgba(5,5,5,0.42)_68%,#050505_94%)]" />
        <div className="relative z-10">
          <div className="grid min-w-0 gap-10 pt-6 lg:grid-cols-[0.95fr_1.05fr] lg:pt-10">
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-[0.5em] text-white/42">
                {t.eyebrow}
              </p>
              <h1 className="mt-7 max-w-4xl break-words text-[3.15rem] font-semibold leading-[0.96] tracking-[-0.075em] text-white sm:text-7xl lg:text-8xl">
                {t.heroTitle}
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/62">
                {t.heroDescription}
              </p>
              <form
                role="search"
                onSubmit={(event) => {
                  event.preventDefault();
                  submitSearch(searchInput);
                }}
                className="mt-8 flex max-w-2xl items-center gap-2 rounded-full border border-white/12 bg-white/[0.07] p-2 backdrop-blur-2xl sm:gap-3"
              >
                <span aria-hidden className="pl-5 text-white/55">
                  <svg
                    width="16"
                    height="16"
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
                  value={searchInput}
                  onChange={(event) => setSearchInput(event.target.value)}
                  placeholder={t.searchPlaceholder}
                  aria-label={t.searchPlaceholder}
                  className="min-w-0 flex-1 bg-transparent px-1 py-2 text-sm text-white outline-none placeholder:text-white/35"
                />
                <button
                  type="submit"
                  className="ml-auto shrink-0 rounded-full bg-[#f7f4ed] px-4 py-3 text-sm font-medium text-black sm:px-5"
                >
                  {t.search}
                </button>
              </form>
              <div className="relative z-20 mt-5 sm:hidden">
                <p className="mb-3 text-xs uppercase tracking-[0.32em] text-white/32">
                  {t.quickAccess}
                </p>
                <div className="flex flex-wrap gap-2 pb-3">
                  {navItems.map(([zh, en, href]) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={(event) => {
                        event.preventDefault();
                        router.push(href);
                      }}
                      className="relative z-20 rounded-full border border-white/12 bg-white/[0.06] px-4 py-3 text-sm text-white/70 backdrop-blur-xl transition active:scale-[0.98] active:border-white/28 active:text-white"
                    >
                      {isZh ? zh : en}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid min-w-0 gap-4 sm:grid-cols-2">
              {featuredHero[0] ? (
                <NewsCard item={featuredHero[0]} variant="hero" />
              ) : (
                <EmptyCard label={t.leadStory} large />
              )}
              <div className="grid min-w-0 gap-4">
                {featuredHero[1] ? (
                  <NewsCard item={featuredHero[1]} variant="compact" />
                ) : (
                  <EmptyCard label={t.latestTool} />
                )}
                {featuredHero[2] ? (
                  <NewsCard item={featuredHero[2]} variant="compact" />
                ) : (
                  <EmptyCard label={t.editorPick} />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="news" className="px-5 py-16 sm:px-10 lg:px-16">
        <SectionHeader
          eyebrow="Daily Signal"
          title={t.latest}
          action={t.allPosts}
          actionHref="/news"
        />
        <div className="grid gap-4 lg:grid-cols-4">
          {dailySignal.length > 0
            ? dailySignal.map((item) => (
                <NewsCard key={item.id} item={item} variant="compact" />
              ))
            : featuredSlots.map(([zh, en]) => (
                <EmptyCard key={en} label={isZh ? zh : en} />
              ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025] px-5 py-16 sm:px-10 lg:px-16">
        <SectionHeader eyebrow="Trending" title={t.trending} />
        <div className="grid gap-4 lg:grid-cols-3">
          {trendingPicks.length > 0
            ? trendingPicks.map((item) => (
                <NewsCard key={item.id} item={item} variant="featured" />
              ))
            : (
              <>
                <EmptyCard label={t.trendingTopic} large />
                <EmptyCard label={t.hotWorkflow} large />
                <EmptyCard label={t.communityPick} large />
              </>
            )}
        </div>
      </section>

      <section id="learn" className="px-5 py-16 sm:px-10 lg:px-16">
        <SectionHeader
          eyebrow="Learn"
          title={t.learn}
          action={t.learningAction}
          actionHref="/learn"
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {learningPathStubs.map((path) => (
            <Link
              key={path.slug}
              href={`/learn/${path.slug}`}
              className="group rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl transition hover:border-white/28 hover:bg-white/[0.075]"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/32">{path.index}</span>
                <span className="rounded-full border border-emerald-200/18 bg-emerald-300/10 px-2.5 py-1 text-[0.58rem] uppercase tracking-[0.24em] text-emerald-100/74">
                  LIVE
                </span>
              </div>
              <h3 className="mt-16 text-2xl font-medium tracking-[-0.04em] text-white">
                {path.title[language]}
              </h3>
              <p className="mt-3 text-xs uppercase tracking-[0.24em] text-white/38">
                {path.meta[language]}
              </p>
              <p className="mt-4 text-sm leading-6 text-white/42">
                {path.summary[language]}
              </p>
              <span className="mt-8 inline-flex text-[0.62rem] uppercase tracking-[0.3em] text-white/52 transition group-hover:text-white">
                {t.learningAction} →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section id="tools" className="bg-[#f5f3ee] px-5 py-16 text-[#111] sm:px-10 lg:px-16">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.42em] text-black/36">
              {t.toolsEyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] sm:text-5xl">
              {t.tools}
            </h2>
          </div>
          <Link
            href="/tools"
            className="hidden rounded-full border border-black/10 px-4 py-2 text-xs uppercase tracking-[0.26em] text-black/58 transition hover:border-black/24 hover:text-black sm:inline-flex"
          >
            {t.toolsAction} →
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-5">
          {toolCategories.map((cat) => (
            <Link
              key={cat.id}
              href={`/tools?category=${cat.id}`}
              className="group rounded-[1.5rem] border border-black/8 bg-white/70 p-5 shadow-[0_20px_70px_rgba(17,17,17,0.06)] transition hover:-translate-y-0.5 hover:bg-white"
            >
              <div className="flex items-start justify-between gap-4">
                <p className="text-xs uppercase tracking-[0.26em] text-black/36">
                  {cat.label[language]}
                </p>
                <span className="rounded-full bg-black/[0.06] px-2 py-1 text-[0.62rem] font-medium text-black/46">
                  {toolCounts[cat.id]}
                </span>
              </div>
              <p className="mt-10 min-h-12 text-sm leading-6 text-black/58">
                {cat.description[language]}
              </p>
              <div className="mt-7 flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.24em] text-black/40">
                  {t.toolCount(toolCounts[cat.id])}
                </span>
                <span className="text-sm text-black/38 transition group-hover:translate-x-1 group-hover:text-black">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section id="gallery" className="px-5 py-16 sm:px-10 lg:px-16">
        <SectionHeader
          eyebrow="Gallery"
          title={t.cases}
          action={t.galleryAll}
          actionHref="/gallery"
        />
        {featuredSplatsHero && (
          <Link
            href={`/gallery/${featuredSplatsHero.slug}`}
            className="group relative block overflow-hidden rounded-[2.25rem] border border-white/10"
          >
            <div className="relative aspect-[21/9] w-full bg-black sm:aspect-[16/7]">
              <SplatPoster
                slug={featuredSplatsHero.slug}
                thumbnailUrl={featuredSplatsHero.thumbnailUrl}
                dense
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 lg:p-14">
                <p className="text-[0.62rem] uppercase tracking-[0.32em] text-white/52">
                  {featuredCategoriesById[featuredSplatsHero.category].label[language]}
                  {" · "}
                  {EMBED_PLATFORM_LABEL[featuredSplatsHero.platform][language]}
                  {" · "}
                  {t.galleryPreview}
                </p>
                <h3 className="mt-4 max-w-3xl break-words text-3xl font-semibold leading-tight tracking-[-0.05em] text-white [overflow-wrap:anywhere] sm:text-5xl lg:text-6xl">
                  {featuredSplatsHero.title[language]}
                </h3>
                <p className="mt-5 text-xs uppercase tracking-[0.36em] text-white/60 sm:text-sm">
                  {t.galleryStat}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-white/82 transition group-hover:text-white">
                  {t.galleryHint} →
                </span>
              </div>
            </div>
          </Link>
        )}
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {featuredSplats
            .filter((w) => w.slug !== featuredSplatsHero?.slug)
            .slice(0, 4)
            .map((work) => (
              <Link
                key={work.slug}
                href={`/gallery/${work.slug}`}
                className="group relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-white/10 bg-black transition hover:border-white/30"
              >
                <SplatPoster slug={work.slug} thumbnailUrl={work.thumbnailUrl} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                <div className="absolute inset-x-3 bottom-3 min-w-0">
                  <p className="text-[0.55rem] uppercase tracking-[0.28em] text-white/48">
                    {featuredCategoriesById[work.category].label[language]}
                    {" · "}
                    {EMBED_PLATFORM_LABEL[work.platform][language]}
                  </p>
                  <p className="mt-1 break-words text-xs font-medium tracking-[-0.02em] text-white [overflow-wrap:anywhere] sm:text-sm">
                    {work.title[language]}
                  </p>
                </div>
              </Link>
            ))}
        </div>
      </section>

      <section id="media" className="px-5 py-16 sm:px-10 lg:px-16">
        <SectionHeader
          eyebrow={t.mediaEyebrow}
          title={t.mediaTitle}
          action={t.mediaAction}
          actionHref="/media"
        />
        {featuredStudioWork && (
          <Link
            href={`/media/${featuredStudioWork.slug}`}
            className="group relative block overflow-hidden rounded-[2.25rem] border border-white/10"
          >
            <div className="relative aspect-[21/9] w-full bg-black sm:aspect-[16/7]">
              <SplatPoster
                slug={featuredStudioWork.slug}
                thumbnailUrl={featuredStudioWork.thumbnailUrl}
                dense
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 lg:p-14">
                {featuredStudioWork.exhibition && (
                  <p className="text-[0.62rem] uppercase tracking-[0.32em] text-white/52">
                    {featuredStudioWork.exhibition.gallery[language]}
                  </p>
                )}
                <h3 className="mt-4 max-w-3xl break-words text-3xl font-semibold leading-tight tracking-[-0.05em] text-white [overflow-wrap:anywhere] sm:text-5xl lg:text-6xl">
                  {featuredStudioWork.exhibition
                    ? featuredStudioWork.exhibition.name[language]
                    : featuredStudioWork.title[language]}
                </h3>
                <p className="mt-5 max-w-2xl break-words text-sm leading-7 text-white/60 [overflow-wrap:anywhere]">
                  {t.mediaDesc}
                </p>
                <p className="mt-3 text-xs uppercase tracking-[0.36em] text-white/48 sm:text-sm">
                  {t.mediaStat}
                </p>
              </div>
            </div>
          </Link>
        )}
      </section>

      <footer className="border-t border-white/10 px-5 py-10 text-sm text-white/38 sm:px-10 lg:px-16">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <span>TOP3DGS / 印刻万物</span>
          <span>{t.footer}</span>
        </div>
      </footer>
    </main>
  );
}
