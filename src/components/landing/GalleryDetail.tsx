"use client";

import Link from "next/link";
import { useLanguage } from "@/components/shared/LanguageProvider";
import {
  featuredCategoriesById,
  featuredSplats,
  type FeaturedSplat,
} from "@/lib/data/featured-splats";
import { EMBED_PLATFORM_LABEL } from "@/lib/data/splat-embed";
import { SplatEmbed } from "@/components/landing/SplatEmbed";

const copy = {
  zh: {
    eyebrow: "画廊 · 创作者精选",
    backToIndex: "返回画廊",
    openSource: "打开原发布页",
    interactionHint: "拖动查看 · 滚轮缩放 · 点击进入沉浸",
    authorLabel: "作者 · 来源",
    platformLabel: "平台",
    categoryLabel: "分类",
    notice: "署名与许可",
    siblings: "同一主题下的其他精选",
    aboutLabel: "关于作品",
  },
  en: {
    eyebrow: "Gallery · Creator Picks",
    backToIndex: "Back to Gallery",
    openSource: "Open source page",
    interactionHint: "Drag to look · scroll to zoom · click to immerse",
    authorLabel: "Author · Source",
    platformLabel: "Platform",
    categoryLabel: "Category",
    notice: "Credit & License",
    siblings: "More in this theme",
    aboutLabel: "About this piece",
  },
} as const;

export function GalleryDetail({ work }: { work: FeaturedSplat }) {
  const { language } = useLanguage();
  const t = copy[language];
  const category = featuredCategoriesById[work.category];

  const siblings = featuredSplats
    .filter((w) => w.slug !== work.slug && w.category === work.category)
    .slice(0, 6);

  return (
    <main className="min-h-screen bg-[#050505] px-5 pb-24 pt-28 text-[#f7f4ed] sm:px-10 sm:pt-32 lg:px-16 lg:pt-36">
      <section className="mx-auto max-w-6xl">
        <Link
          href="/gallery"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.32em] text-white/50 transition hover:text-white"
        >
          <span aria-hidden>←</span>
          {t.backToIndex}
        </Link>
      </section>

      <section className="mx-auto mt-10 max-w-6xl">
        <div className="overflow-hidden rounded-[2.25rem] border border-white/10 bg-black">
          <div className="aspect-[16/9] w-full bg-black">
            <SplatEmbed
              url={work.embedUrl}
              sourceUrl={work.sourceUrl}
              title={work.title[language]}
              slug={work.slug}
              thumbnailUrl={work.thumbnailUrl}
              mode="auto"
            />
          </div>
        </div>
        <p className="mt-3 text-center text-[0.62rem] uppercase tracking-[0.32em] text-white/36">
          {t.interactionHint}
        </p>
      </section>

      <section className="mx-auto mt-16 max-w-6xl">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-white/14 px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.28em] text-white/68">
            {category.label[language]}
          </span>
          <span className="rounded-full border border-white/14 px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.28em] text-white/68">
            {EMBED_PLATFORM_LABEL[work.platform][language]}
          </span>
        </div>
        <h1 className="mt-6 break-words text-5xl font-semibold leading-[0.96] tracking-[-0.06em] [overflow-wrap:anywhere] sm:text-7xl">
          {work.title[language]}
        </h1>
        <p className="mt-6 max-w-3xl break-words text-xl leading-8 text-white/68 [overflow-wrap:anywhere]">
          {work.description[language]}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={work.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#f7f4ed] px-5 py-2.5 text-xs font-medium uppercase tracking-[0.22em] text-[#050505] transition hover:bg-white"
          >
            {t.openSource}
            <span aria-hidden>↗</span>
          </a>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-6xl">
        <p className="text-xs uppercase tracking-[0.42em] text-white/36">
          {t.aboutLabel}
        </p>
        <dl className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {work.author && (
            <InfoTile
              label={t.authorLabel}
              value={
                work.author.href ? (
                  <a
                    href={work.author.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white underline-offset-4 hover:underline"
                  >
                    {work.author.name} ↗
                  </a>
                ) : (
                  work.author.name
                )
              }
            />
          )}
          <InfoTile
            label={t.platformLabel}
            value={EMBED_PLATFORM_LABEL[work.platform][language]}
          />
          <InfoTile
            label={t.categoryLabel}
            value={category.label[language]}
          />
        </dl>
        {work.note && (
          <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5 text-sm leading-7 text-white/58">
            <p className="text-[0.6rem] uppercase tracking-[0.32em] text-white/36">
              {t.notice}
            </p>
            <p className="mt-2 break-words [overflow-wrap:anywhere]">
              {work.note[language]}
            </p>
          </div>
        )}
      </section>

      {siblings.length > 0 && (
        <section className="mx-auto mt-16 max-w-6xl">
          <p className="text-xs uppercase tracking-[0.42em] text-white/36">
            {t.siblings}
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {siblings.map((s) => (
              <Link
                key={s.slug}
                href={`/gallery/${s.slug}`}
                className="group flex min-w-0 items-center justify-between rounded-[1.5rem] border border-white/10 bg-white/[0.045] px-5 py-4 backdrop-blur-xl transition hover:border-white/30 hover:bg-white/[0.075]"
              >
                <div className="min-w-0">
                  <p className="text-[0.6rem] uppercase tracking-[0.28em] text-white/42">
                    {EMBED_PLATFORM_LABEL[s.platform][language]}
                  </p>
                  <p className="mt-1 break-words text-base text-white [overflow-wrap:anywhere]">
                    {s.title[language]}
                  </p>
                </div>
                <span className="shrink-0 text-xs uppercase tracking-[0.28em] text-white/42 transition group-hover:text-white">
                  →
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

function InfoTile({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] px-5 py-4 backdrop-blur-xl">
      <dt className="text-[0.62rem] uppercase tracking-[0.32em] text-white/36">
        {label}
      </dt>
      <dd className="mt-2 break-words text-base text-white [overflow-wrap:anywhere]">
        {value}
      </dd>
    </div>
  );
}
