"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useLanguage } from "@/components/shared/LanguageProvider";
import {
  featuredSplatWork,
  listGalleries,
  splatCategories,
  splatCategoriesById,
  splatWorks,
  type SplatCategoryId,
  type SplatWork,
} from "@/lib/data/gallery";
import { SplatEmbed } from "@/components/landing/SplatEmbed";

const copy = {
  zh: {
    eyebrow: "画廊 / Gallery",
    title: "印刻万物自家拍的高斯泼溅。",
    description:
      "我们把每一件扫好的空间整理成可旋转、可拖动的实例，挂在这里。这不是论文展示，是工作室的日常素材库——你可以直接在浏览器里把它转起来。",
    countLabel: "件作品",
    galleriesLabel: "家画廊",
    exhibitionsLabel: "场展览",
    all: "全部",
    allGalleries: "全部画廊",
    featured: "本期推荐",
    enter: "进入",
    note: "全部由作者本人采集、训练并通过 SuperSplat 公开发布。",
  },
  en: {
    eyebrow: "Gallery",
    title: "Gaussian splats captured in-house at TOP3DGS.",
    description:
      "Every scanned space we ship lives here as a rotatable, draggable instance. Not a paper showcase — the studio's working stock library, playable right in your browser.",
    countLabel: "pieces",
    galleriesLabel: "galleries",
    exhibitionsLabel: "exhibitions",
    all: "All",
    allGalleries: "All galleries",
    featured: "Featured",
    enter: "Enter",
    note: "All works captured, trained, and published via SuperSplat by TOP3DGS.",
  },
} as const;

type CatFilter = SplatCategoryId | "all";

export function GalleryIndex() {
  const { language } = useLanguage();
  const t = copy[language];
  const [catFilter, setCatFilter] = useState<CatFilter>("all");
  const [galleryFilter, setGalleryFilter] = useState<string>("all");

  const galleries = useMemo(() => listGalleries(), []);

  // 统计：unique 展览数
  const exhibitionCount = useMemo(() => {
    const set = new Set<string>();
    for (const w of splatWorks) {
      if (w.exhibition) {
        set.add(`${w.exhibition.gallery.zh}::${w.exhibition.name.zh}`);
      }
    }
    return set.size;
  }, []);

  const filtered = useMemo(() => {
    return splatWorks.filter((w) => {
      if (catFilter !== "all" && w.category !== catFilter) return false;
      if (galleryFilter !== "all" && w.exhibition?.gallery.zh !== galleryFilter)
        return false;
      return true;
    });
  }, [catFilter, galleryFilter]);

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
          {splatWorks.length} {t.countLabel} · {galleries.length}{" "}
          {t.galleriesLabel} · {exhibitionCount} {t.exhibitionsLabel}
        </p>
      </section>

      {featuredSplatWork && (
        <section className="mx-auto mt-16 max-w-6xl">
          <p className="mb-5 text-xs uppercase tracking-[0.42em] text-white/36">
            {t.featured}
          </p>
          <div className="overflow-hidden rounded-[2.25rem] border border-white/10 bg-black">
            <div className="aspect-[16/9] w-full bg-black">
              <SplatEmbed
                url={featuredSplatWork.embedUrl}
                title={featuredSplatWork.title[language]}
                slug={featuredSplatWork.slug}
                mode="click-to-load"
              />
            </div>
            <Link
              href={`/gallery/${featuredSplatWork.slug}`}
              className="group block border-t border-white/10 p-6 transition hover:bg-white/[0.04] sm:p-8"
            >
              {featuredSplatWork.exhibition && (
                <p className="text-xs uppercase tracking-[0.32em] text-white/42">
                  {featuredSplatWork.exhibition.gallery[language]}
                </p>
              )}
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
                {featuredSplatWork.title[language]}
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-white/68">
                {featuredSplatWork.description[language]}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-white/56 transition group-hover:text-white">
                {t.enter} →
              </span>
            </Link>
          </div>
        </section>
      )}

      <section className="mx-auto mt-20 max-w-6xl">
        {/* 一级筛选：分类 */}
        <div className="mb-3 flex flex-wrap gap-2">
          <FilterChip
            active={catFilter === "all"}
            onClick={() => setCatFilter("all")}
            label={t.all}
            count={splatWorks.length}
          />
          {splatCategories.map((c) => {
            const count = splatWorks.filter((w) => w.category === c.id).length;
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

        {/* 二级筛选：画廊 */}
        {galleries.length > 1 && (
          <div className="mb-6 flex flex-wrap gap-2 border-t border-white/10 pt-3">
            <FilterChip
              active={galleryFilter === "all"}
              onClick={() => setGalleryFilter("all")}
              label={t.allGalleries}
              count={splatWorks.length}
              tone="subtle"
            />
            {galleries.map((g) => (
              <FilterChip
                key={g.zh}
                active={galleryFilter === g.zh}
                onClick={() => setGalleryFilter(g.zh)}
                label={language === "zh" ? g.zh : g.en}
                count={g.count}
                tone="subtle"
              />
            ))}
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((work) => (
            <SplatCard key={work.slug} work={work} t={t} language={language} />
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
  tone = "default",
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
  tone?: "default" | "subtle";
}) {
  if (tone === "subtle") {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`rounded-full border px-3 py-1 text-[0.68rem] uppercase tracking-[0.22em] transition ${
          active
            ? "border-white/35 bg-white/[0.08] text-white"
            : "border-white/10 text-white/44 hover:border-white/22 hover:text-white/72"
        }`}
      >
        {label}
        <span className="ml-1.5 text-white/35">{count}</span>
      </button>
    );
  }
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
  work: SplatWork;
  t: (typeof copy)[keyof typeof copy];
  language: "zh" | "en";
}) {
  const category = splatCategoriesById[work.category];
  return (
    <Link
      href={`/gallery/${work.slug}`}
      className="group flex flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] transition hover:border-white/30 hover:bg-white/[0.075]"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        {work.thumbnailUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={work.thumbnailUrl}
            alt={work.title[language]}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
            loading="lazy"
          />
        ) : (
          <SplatCardPlaceholder slug={work.slug} />
        )}
        {work.exhibition?.part && (
          <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-[0.58rem] uppercase tracking-[0.28em] text-white/82 backdrop-blur-md">
            PART {work.exhibition.part}
          </span>
        )}
        {category && (
          <span className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-black/55 px-2.5 py-1 text-[0.58rem] uppercase tracking-[0.24em] text-white/82 backdrop-blur-md">
            {category.label[language]}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        {work.exhibition && (
          <p className="text-[0.62rem] uppercase tracking-[0.28em] text-white/42">
            {work.exhibition.gallery[language]}
          </p>
        )}
        <h3 className="mt-2 text-lg font-semibold tracking-[-0.03em] text-white">
          {work.exhibition
            ? work.exhibition.part
              ? `${work.exhibition.name[language]} · ${work.exhibition.part}`
              : work.exhibition.name[language]
            : work.title[language]}
        </h3>
        <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[0.62rem] uppercase tracking-[0.24em] text-white/38">
          {work.location?.city && <span>{work.location.city}</span>}
          {work.device && <span>· {work.device}</span>}
          {work.capturedAt && <span>· {work.capturedAt}</span>}
        </div>
        <span className="mt-auto pt-4 text-[0.62rem] uppercase tracking-[0.32em] text-white/56 transition group-hover:text-white">
          {t.enter} →
        </span>
      </div>
    </Link>
  );
}

/**
 * 没有缩略图时的视觉占位：根据 slug 派生一个稳定的渐变 hue，
 * 加上抽象的 splat 散点，避免列表页同时跑多个 iframe。
 */
function SplatCardPlaceholder({ slug }: { slug: string }) {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
  }
  const hue = hash % 360;
  const dots = Array.from({ length: 14 }).map((_, i) => {
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
