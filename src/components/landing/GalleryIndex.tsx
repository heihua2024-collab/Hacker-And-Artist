"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useLanguage } from "@/components/shared/LanguageProvider";
import {
  featuredCategories,
  featuredCategoriesById,
  featuredSplats,
  featuredSplatsHero,
  type FeaturedCategoryId,
  type FeaturedSplat,
} from "@/lib/data/featured-splats";
import { EMBED_PLATFORM_LABEL } from "@/lib/data/splat-embed";
import { SplatEmbed } from "@/components/landing/SplatEmbed";

const copy = {
  zh: {
    eyebrow: "画廊 / Gallery · 创作者精选",
    title: "可交互的高斯泼溅创作者精选。",
    description:
      "34 个可以在浏览器里直接点开、拖动、缩放的高斯泼溅场景，来自 SuperSplat 公开作品库、PlayCanvas 官方示例和研究团队 GitHub Pages demo，按主题网格排列。每个作品都配有作者署名与原始链接。",
    countLabel: "件精选",
    platformLabel: "来源平台",
    categoriesLabel: "主题分类",
    all: "全部",
    featured: "本期推荐",
    enter: "进入查看",
    sourceHint: "外部链接均指向原作者发布页。",
    mediaLink: "查看印刻万物自己拍的展览 →",
  },
  en: {
    eyebrow: "Gallery · Creator Picks",
    title: "Interactive Gaussian splats, curated for browser.",
    description:
      "Thirty-four splat scenes you can rotate, zoom, and explore directly in the browser — drawn from the SuperSplat public library, PlayCanvas' own samples, and research teams' GitHub Pages demos. Grouped by theme, each piece keeps its author credit and original link.",
    countLabel: "picks",
    platformLabel: "sources",
    categoriesLabel: "themes",
    all: "All",
    featured: "Featured",
    enter: "Enter",
    sourceHint: "All external links point back to the original author's page.",
    mediaLink: "See TOP3DGS' own exhibition captures →",
  },
} as const;

type CatFilter = FeaturedCategoryId | "all";

export function GalleryIndex() {
  const { language } = useLanguage();
  const t = copy[language];
  const [catFilter, setCatFilter] = useState<CatFilter>("all");

  const platformCount = useMemo(() => {
    const set = new Set<string>();
    for (const w of featuredSplats) set.add(w.platform);
    return set.size;
  }, []);

  const filtered = useMemo(() => {
    return featuredSplats.filter((w) => {
      if (catFilter !== "all") return w.category === catFilter;
      return true;
    });
  }, [catFilter]);

  return (
    <main className="min-h-screen bg-[#050505] px-5 pb-24 pt-28 text-[#f7f4ed] sm:px-10 sm:pt-32 lg:px-16 lg:pt-36">
      <section className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[0.5em] text-white/40">
          {t.eyebrow}
        </p>
        <h1 className="mt-6 max-w-4xl break-words text-5xl font-semibold leading-[0.96] tracking-[-0.07em] [overflow-wrap:anywhere] sm:text-7xl">
          {t.title}
        </h1>
        <p className="mt-7 max-w-3xl break-words text-lg leading-8 text-white/62 [overflow-wrap:anywhere]">
          {t.description}
        </p>
        <p className="mt-5 text-xs uppercase tracking-[0.28em] text-white/36">
          {featuredSplats.length} {t.countLabel} · {platformCount}{" "}
          {t.platformLabel} · {featuredCategories.length} {t.categoriesLabel}
        </p>
        <p className="mt-4 text-[0.62rem] uppercase tracking-[0.26em] text-white/32">
          {t.sourceHint}
        </p>
        <Link
          href="/media"
          className="mt-3 inline-flex text-[0.68rem] uppercase tracking-[0.26em] text-white/52 transition hover:text-white"
        >
          {t.mediaLink}
        </Link>
      </section>

      {featuredSplatsHero && (
        <section className="mx-auto mt-16 max-w-6xl">
          <p className="mb-5 text-xs uppercase tracking-[0.42em] text-white/36">
            {t.featured}
          </p>
          <div className="overflow-hidden rounded-[2.25rem] border border-white/10 bg-black">
            <div className="aspect-[16/9] w-full bg-black">
              <SplatEmbed
                url={featuredSplatsHero.embedUrl}
                sourceUrl={featuredSplatsHero.sourceUrl}
                title={featuredSplatsHero.title[language]}
                slug={featuredSplatsHero.slug}
                thumbnailUrl={featuredSplatsHero.thumbnailUrl}
                mode="click-to-load"
              />
            </div>
            <Link
              href={`/gallery/${featuredSplatsHero.slug}`}
              className="group block border-t border-white/10 p-6 transition hover:bg-white/[0.04] sm:p-8"
            >
              <p className="text-xs uppercase tracking-[0.32em] text-white/42">
                {featuredCategoriesById[featuredSplatsHero.category].label[language]}
                {" · "}
                {EMBED_PLATFORM_LABEL[featuredSplatsHero.platform][language]}
              </p>
              <h2 className="mt-3 break-words text-3xl font-semibold tracking-[-0.04em] text-white [overflow-wrap:anywhere] sm:text-4xl">
                {featuredSplatsHero.title[language]}
              </h2>
              <p className="mt-3 max-w-2xl break-words text-base leading-7 text-white/68 [overflow-wrap:anywhere]">
                {featuredSplatsHero.description[language]}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-white/56 transition group-hover:text-white">
                {t.enter} →
              </span>
            </Link>
          </div>
        </section>
      )}

      <section className="mx-auto mt-20 max-w-6xl">
        <div className="mb-6 flex flex-wrap gap-2">
          <FilterChip
            active={catFilter === "all"}
            onClick={() => setCatFilter("all")}
            label={t.all}
            count={featuredSplats.length}
          />
          {featuredCategories.map((c) => {
            const count = featuredSplats.filter((w) => w.category === c.id).length;
            if (count === 0) return null;
            return (
              <FilterChip
                key={c.id}
                active={catFilter === c.id}
                onClick={() => setCatFilter(c.id)}
                label={c.label[language]}
                count={count}
              />
            );
          })}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((work) => (
            <SplatCard
              key={work.slug}
              work={work}
              t={t}
              language={language}
            />
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
      className={`rounded-full border px-3.5 py-1.5 text-xs uppercase tracking-[0.24em] transition ${
        active
          ? "border-white/40 bg-white/10 text-white"
          : "border-white/12 text-white/56 hover:border-white/30 hover:text-white"
      }`}
    >
      {label}
      <span className="ml-1.5 text-white/40">{count}</span>
    </button>
  );
}

function SplatCard({
  work,
  t,
  language,
}: {
  work: FeaturedSplat;
  t: (typeof copy)[keyof typeof copy];
  language: "zh" | "en";
}) {
  const category = featuredCategoriesById[work.category];
  const platform = EMBED_PLATFORM_LABEL[work.platform][language];
  return (
    <Link
      href={`/gallery/${work.slug}`}
      className="group flex min-w-0 flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] transition hover:border-white/30 hover:bg-white/[0.075]"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <SplatCardPoster slug={work.slug} thumbnailUrl={work.thumbnailUrl} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
        <span className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-black/55 px-2.5 py-1 text-[0.58rem] uppercase tracking-[0.24em] text-white/82 backdrop-blur-md">
          {category.label[language]}
        </span>
        <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-[0.58rem] uppercase tracking-[0.24em] text-white/72 backdrop-blur-md">
          {platform}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="break-words text-lg font-semibold tracking-[-0.03em] text-white [overflow-wrap:anywhere]">
          {work.title[language]}
        </h3>
        <p className="mt-2 line-clamp-3 break-words text-xs leading-6 text-white/52 [overflow-wrap:anywhere]">
          {work.description[language]}
        </p>
        <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[0.62rem] uppercase tracking-[0.24em] text-white/38">
          {work.author && <span>{work.author.name}</span>}
        </div>
        <span className="mt-auto pt-4 text-[0.62rem] uppercase tracking-[0.32em] text-white/56 transition group-hover:text-white">
          {t.enter} →
        </span>
      </div>
    </Link>
  );
}

function SplatCardPoster({
  slug,
  thumbnailUrl,
}: {
  slug: string;
  thumbnailUrl?: string;
}) {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
  }
  const hue = hash % 360;
  const dots = Array.from({ length: 18 }).map((_, i) => {
    const seed = (hash >>> (i * 2)) ^ (i * 2654435761);
    const x = (seed >>> 0) % 100;
    const y = (seed >>> 8) % 100;
    const size = 1.5 + (((seed >>> 16) % 28) / 10);
    const opacity = 0.18 + (((seed >>> 4) % 70) / 100) * 0.55;
    return { x, y, size, opacity, key: i };
  });
  return (
    <div
      className="relative h-full w-full"
      style={{
        background: `radial-gradient(circle at 30% 25%, hsl(${hue} 50% 26% / 0.8), hsl(${(hue + 38) % 360} 30% 8%))`,
      }}
    >
      {thumbnailUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={thumbnailUrl}
          alt=""
          className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
          loading="lazy"
          aria-hidden="true"
        />
      )}
      {dots.map((d) => (
        <span
          key={d.key}
          className="pointer-events-none absolute rounded-full bg-white"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: `${d.size}px`,
            height: `${d.size}px`,
            opacity: d.opacity,
            filter: "blur(0.5px)",
          }}
        />
      ))}
    </div>
  );
}
