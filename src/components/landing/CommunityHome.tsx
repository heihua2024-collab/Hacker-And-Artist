"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useLanguage } from "@/components/shared/LanguageProvider";
import { NewsCard } from "@/components/landing/NewsCard";
import {
  dailySignal,
  featuredHero,
  trendingPicks,
} from "@/lib/data/news";
import { featuredSplatWork, splatWorks } from "@/lib/data/gallery";
import { learningPathStubs } from "@/lib/data/learning-paths";
import {
  toolCategories,
  tools,
  type ToolCategory,
} from "@/lib/data/tools";
import { SplatPoster } from "@/components/landing/SplatEmbed";

const AmbientScene = dynamic(
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
    cases: "画廊：印刻万物拍的高斯泼溅",
    galleryHint: "进入画廊 · 浏览器内 360° 把玩",
    galleryAll: "查看全部",
    galleryStat: "20 件作品 · 8 家画廊 · 10 场展览",
    galleryPreview: "本期作品节选",
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
      "INKTOYS aggregates tools, cases, tutorials, and trends in Gaussian Splatting to help creators understand the next expressive form of media.",
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
    cases: "Gallery: Splats Captured In-House",
    galleryHint: "Enter the gallery · spin them in-browser",
    galleryAll: "View all",
    galleryStat: "20 pieces · 8 galleries · 10 exhibitions",
    galleryPreview: "Featured selection",
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
        <div className="instant-bridge pointer-events-none absolute inset-0 z-0" />
        <div className="pointer-events-none absolute inset-0 z-0 touch-none opacity-55 sm:opacity-35">
          <AmbientScene mode="ambient" />
        </div>
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_72%_18%,rgba(30,136,229,0.18),transparent_28%),linear-gradient(180deg,rgba(5,5,5,0.48),#050505_78%)]" />
        <div className="relative z-10">
          <div className="grid gap-10 pt-6 lg:grid-cols-[0.95fr_1.05fr] lg:pt-10">
            <div>
              <p className="text-xs uppercase tracking-[0.5em] text-white/42">
                {t.eyebrow}
              </p>
              <h1 className="mt-7 max-w-4xl text-5xl font-semibold leading-[0.96] tracking-[-0.07em] text-white sm:text-7xl lg:text-8xl">
                {t.heroTitle}
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/62">
                {t.heroDescription}
              </p>
              <div className="mt-8 flex max-w-2xl items-center gap-3 rounded-full border border-white/12 bg-white/[0.07] p-2 backdrop-blur-2xl">
                <span className="pl-5 text-sm text-white/35">
                  {t.searchPlaceholder}
                </span>
                <span className="ml-auto rounded-full bg-[#f7f4ed] px-5 py-3 text-sm font-medium text-black">
                  {t.search}
                </span>
              </div>
              <div className="mt-5 sm:hidden">
                <p className="mb-3 text-xs uppercase tracking-[0.32em] text-white/32">
                  {t.quickAccess}
                </p>
                <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2">
                  {navItems.map(([zh, en, href]) => (
                    <Link
                      key={href}
                      href={href}
                      className="shrink-0 rounded-full border border-white/12 bg-white/[0.06] px-4 py-3 text-sm text-white/70 backdrop-blur-xl"
                    >
                      {isZh ? zh : en}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {featuredHero[0] ? (
                <NewsCard item={featuredHero[0]} variant="hero" />
              ) : (
                <EmptyCard label={t.leadStory} large />
              )}
              <div className="grid gap-4">
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
        {featuredSplatWork && (
          <Link
            href="/gallery"
            className="group relative block overflow-hidden rounded-[2.25rem] border border-white/10"
          >
            <div className="relative aspect-[21/9] w-full bg-black sm:aspect-[16/7]">
              <SplatPoster slug={featuredSplatWork.slug} dense />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 lg:p-14">
                {featuredSplatWork.exhibition && (
                  <p className="text-[0.62rem] uppercase tracking-[0.32em] text-white/52">
                    {featuredSplatWork.exhibition.gallery[language]} ·{" "}
                    {t.galleryPreview}
                  </p>
                )}
                <h3 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
                  {featuredSplatWork.exhibition
                    ? featuredSplatWork.exhibition.name[language]
                    : featuredSplatWork.title[language]}
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
          {splatWorks.slice(1, 5).map((work) => (
            <Link
              key={work.slug}
              href={`/gallery/${work.slug}`}
              className="group relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-white/10 bg-black transition hover:border-white/30"
            >
              <SplatPoster slug={work.slug} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
              <div className="absolute inset-x-3 bottom-3">
                {work.exhibition && (
                  <p className="text-[0.55rem] uppercase tracking-[0.28em] text-white/48">
                    {work.exhibition.gallery[language]}
                  </p>
                )}
                <p className="mt-1 text-xs font-medium tracking-[-0.02em] text-white sm:text-sm">
                  {work.exhibition
                    ? `${work.exhibition.name[language]}${work.exhibition.part ? ` · ${work.exhibition.part}` : ""}`
                    : work.title[language]}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/10 px-5 py-10 text-sm text-white/38 sm:px-10 lg:px-16">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <span>INKTOYS / 印刻万物</span>
          <span>{t.footer}</span>
        </div>
      </footer>
    </main>
  );
}
