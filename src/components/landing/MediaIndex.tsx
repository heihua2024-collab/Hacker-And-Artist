"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useLanguage } from "@/components/shared/LanguageProvider";
import {
  featuredStudioWork,
  listStudioGalleries,
  studioCategories,
  studioCategoriesById,
  studioWorks,
  type StudioCategoryId,
  type StudioWork,
} from "@/lib/data/studio-works";
import { SplatEmbed } from "@/components/landing/SplatEmbed";

const copy = {
  zh: {
    eyebrow: "媒体 / Media",
    title: "印刻万物自家的媒体库。",
    description:
      "从工作室自己采集、训练的展览空间出发，慢慢扩展到视频、访谈、演示与讲座。这里收的是「我们自己做的东西」——工作流、素材库、原始记录，以及未来的影像内容。",
    worksEyebrow: "工作室作品",
    worksTitle: "展览空间与空间记录",
    worksDescription:
      "20 件由印刻万物自己采集、训练并通过 SuperSplat 发布的高斯泼溅空间记录，涵盖 8 家画廊的 10 场展览。",
    countLabel: "件作品",
    galleriesLabel: "家画廊",
    exhibitionsLabel: "场展览",
    all: "全部",
    allGalleries: "全部画廊",
    featured: "本期推荐",
    enter: "进入",
    comingSoonTitle: "视频 · 访谈 · 讲座 · 空间影像",
    comingSoonDescription:
      "视频频道正在筹备中：包括工作流讲解、创作者访谈、项目现场记录以及空间媒体短文。准备好之后会在这里陆续放出。",
    comingSoonBadge: "即将上线",
    sections: {
      videos: "视频 · Videos",
      interviews: "访谈 · Interviews",
      demos: "演示 · Demos",
      talks: "讲座 · Talks",
    },
    galleryLink: "看创作者精选的公开案例 →",
  },
  en: {
    eyebrow: "Media",
    title: "TOP3DGS' own media library.",
    description:
      "It starts with exhibitions we captured and trained ourselves, and will grow into videos, interviews, demos, and talks. This is the corner for work we made — workflows, source stock, raw field records, and upcoming moving-image content.",
    worksEyebrow: "Studio Works",
    worksTitle: "Exhibitions & spatial captures",
    worksDescription:
      "Twenty Gaussian Splatting scenes captured, trained, and published by TOP3DGS — spanning ten exhibitions at eight galleries.",
    countLabel: "pieces",
    galleriesLabel: "galleries",
    exhibitionsLabel: "exhibitions",
    all: "All",
    allGalleries: "All galleries",
    featured: "Featured",
    enter: "Enter",
    comingSoonTitle: "Videos · Interviews · Talks · Spatial essays",
    comingSoonDescription:
      "The video channel is in the works: workflow walkthroughs, creator interviews, on-site project records, and short spatial-media essays. We'll ship them here once they're ready.",
    comingSoonBadge: "Coming soon",
    sections: {
      videos: "Videos",
      interviews: "Interviews",
      demos: "Demos",
      talks: "Talks",
    },
    galleryLink: "See the creator-picks gallery →",
  },
} as const;

type CatFilter = StudioCategoryId | "all";

export function MediaIndex() {
  const { language } = useLanguage();
  const t = copy[language];
  const [catFilter, setCatFilter] = useState<CatFilter>("all");
  const [galleryFilter, setGalleryFilter] = useState<string>("all");

  const galleries = useMemo(() => listStudioGalleries(), []);

  const exhibitionCount = useMemo(() => {
    const set = new Set<string>();
    for (const w of studioWorks) {
      if (w.exhibition) {
        set.add(`${w.exhibition.gallery.zh}::${w.exhibition.name.zh}`);
      }
    }
    return set.size;
  }, []);

  const filtered = useMemo(() => {
    return studioWorks.filter((w) => {
      if (catFilter !== "all" && w.category !== catFilter) return false;
      if (
        galleryFilter !== "all" &&
        w.exhibition?.gallery.zh !== galleryFilter
      )
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
        <h1 className="mt-6 max-w-4xl break-words text-5xl font-semibold leading-[0.96] tracking-[-0.07em] [overflow-wrap:anywhere] sm:text-7xl">
          {t.title}
        </h1>
        <p className="mt-7 max-w-3xl break-words text-lg leading-8 text-white/62 [overflow-wrap:anywhere]">
          {t.description}
        </p>
        <Link
          href="/gallery"
          className="mt-6 inline-flex text-[0.68rem] uppercase tracking-[0.26em] text-white/52 transition hover:text-white"
        >
          {t.galleryLink}
        </Link>
      </section>

      <section className="mx-auto mt-20 max-w-6xl">
        <p className="text-xs uppercase tracking-[0.5em] text-white/40">
          {t.worksEyebrow}
        </p>
        <h2 className="mt-5 max-w-4xl break-words text-4xl font-semibold leading-[0.96] tracking-[-0.05em] [overflow-wrap:anywhere] sm:text-6xl">
          {t.worksTitle}
        </h2>
        <p className="mt-5 max-w-3xl break-words text-base leading-7 text-white/58 [overflow-wrap:anywhere]">
          {t.worksDescription}
        </p>
        <p className="mt-4 text-xs uppercase tracking-[0.28em] text-white/36">
          {studioWorks.length} {t.countLabel} · {galleries.length}{" "}
          {t.galleriesLabel} · {exhibitionCount} {t.exhibitionsLabel}
        </p>
      </section>

      {featuredStudioWork && (
        <section className="mx-auto mt-12 max-w-6xl">
          <p className="mb-5 text-xs uppercase tracking-[0.42em] text-white/36">
            {t.featured}
          </p>
          <div className="overflow-hidden rounded-[2.25rem] border border-white/10 bg-black">
            <div className="aspect-[16/9] w-full bg-black">
              <SplatEmbed
                url={featuredStudioWork.embedUrl}
                title={featuredStudioWork.title[language]}
                slug={featuredStudioWork.slug}
                thumbnailUrl={featuredStudioWork.thumbnailUrl}
                mode="click-to-load"
              />
            </div>
            <Link
              href={`/media/${featuredStudioWork.slug}`}
              className="group block border-t border-white/10 p-6 transition hover:bg-white/[0.04] sm:p-8"
            >
              {featuredStudioWork.exhibition && (
                <p className="text-xs uppercase tracking-[0.32em] text-white/42">
                  {featuredStudioWork.exhibition.gallery[language]}
                </p>
              )}
              <h3 className="mt-3 break-words text-3xl font-semibold tracking-[-0.04em] text-white [overflow-wrap:anywhere] sm:text-4xl">
                {featuredStudioWork.title[language]}
              </h3>
              <p className="mt-3 max-w-2xl break-words text-base leading-7 text-white/68 [overflow-wrap:anywhere]">
                {featuredStudioWork.description[language]}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-white/56 transition group-hover:text-white">
                {t.enter} →
              </span>
            </Link>
          </div>
        </section>
      )}

      <section className="mx-auto mt-16 max-w-6xl">
        <div className="mb-3 flex flex-wrap gap-2">
          <FilterChip
            active={catFilter === "all"}
            onClick={() => setCatFilter("all")}
            label={t.all}
            count={studioWorks.length}
          />
          {studioCategories.map((c) => {
            const count = studioWorks.filter((w) => w.category === c.id).length;
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

        {galleries.length > 1 && (
          <div className="mb-6 flex flex-wrap gap-2 border-t border-white/10 pt-3">
            <FilterChip
              active={galleryFilter === "all"}
              onClick={() => setGalleryFilter("all")}
              label={t.allGalleries}
              count={studioWorks.length}
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
            <StudioCard key={work.slug} work={work} t={t} language={language} />
          ))}
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-6xl">
        <p className="text-xs uppercase tracking-[0.5em] text-white/40">
          {t.comingSoonBadge}
        </p>
        <h2 className="mt-5 max-w-4xl break-words text-3xl font-semibold leading-[1.04] tracking-[-0.05em] [overflow-wrap:anywhere] sm:text-5xl">
          {t.comingSoonTitle}
        </h2>
        <p className="mt-5 max-w-3xl break-words text-base leading-7 text-white/52 [overflow-wrap:anywhere]">
          {t.comingSoonDescription}
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {Object.values(t.sections).map((name) => (
            <div
              key={name}
              className="min-h-[14rem] rounded-[2rem] border border-dashed border-white/10 bg-white/[0.025] p-6 backdrop-blur-xl"
            >
              <p className="text-xs uppercase tracking-[0.32em] text-white/42">
                {name}
              </p>
              <div className="mt-20 space-y-3">
                <div className="h-3 w-4/5 rounded-full bg-white/10" />
                <div className="h-3 w-2/3 rounded-full bg-white/[0.075]" />
                <div className="h-3 w-1/2 rounded-full bg-white/[0.06]" />
              </div>
            </div>
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

function StudioCard({
  work,
  t,
  language,
}: {
  work: StudioWork;
  t: (typeof copy)[keyof typeof copy];
  language: "zh" | "en";
}) {
  const category = studioCategoriesById[work.category];
  return (
    <Link
      href={`/media/${work.slug}`}
      className="group flex min-w-0 flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] transition hover:border-white/30 hover:bg-white/[0.075]"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <StudioCardPoster slug={work.slug} thumbnailUrl={work.thumbnailUrl} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
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
        <h3 className="mt-2 break-words text-lg font-semibold tracking-[-0.03em] text-white [overflow-wrap:anywhere]">
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

function StudioCardPoster({
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
