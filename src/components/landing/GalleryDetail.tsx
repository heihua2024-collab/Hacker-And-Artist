"use client";

import Link from "next/link";
import { useLanguage } from "@/components/shared/LanguageProvider";
import {
  splatCategoriesById,
  splatWorks,
  toSplatSceneUrl,
  type SplatWork,
} from "@/lib/data/gallery";
import { SplatEmbed } from "@/components/landing/SplatEmbed";

const copy = {
  zh: {
    eyebrow: "画廊",
    backToIndex: "返回画廊",
    locationLabel: "拍摄地点",
    deviceLabel: "拍摄设备",
    capturedLabel: "拍摄时间",
    splatCountLabel: "高斯数量",
    trainingTimeLabel: "训练耗时",
    pipelineLabel: "训练管线",
    categoryLabel: "类别",
    fullscreen: "全屏查看",
    openInSuperSplat: "在 SuperSplat 打开",
    interactionHint: "拖动查看 · 滚轮缩放 · 点击进入沉浸",
    siblings: "本场展览其他空间",
    galleryLabel: "画廊",
    exhibitionLabel: "展览",
    partLabel: "分集",
  },
  en: {
    eyebrow: "Gallery",
    backToIndex: "Back to Gallery",
    locationLabel: "Location",
    deviceLabel: "Device",
    capturedLabel: "Captured",
    splatCountLabel: "Splat count",
    trainingTimeLabel: "Training time",
    pipelineLabel: "Pipeline",
    categoryLabel: "Category",
    fullscreen: "Fullscreen",
    openInSuperSplat: "Open in SuperSplat",
    interactionHint: "Drag to look · scroll to zoom · click to immerse",
    siblings: "Other spaces in this exhibition",
    galleryLabel: "Gallery",
    exhibitionLabel: "Exhibition",
    partLabel: "Part",
  },
} as const;

export function GalleryDetail({ work }: { work: SplatWork }) {
  const { language } = useLanguage();
  const t = copy[language];
  const category = splatCategoriesById[work.category];

  // 找出同一画廊+同一展览的其他分集
  const siblings = work.exhibition
    ? splatWorks.filter(
        (w) =>
          w.slug !== work.slug &&
          w.exhibition?.gallery.zh === work.exhibition?.gallery.zh &&
          w.exhibition?.name.zh === work.exhibition?.name.zh,
      )
    : [];

  const specs: Array<[string, string]> = [];
  if (work.exhibition)
    specs.push([t.galleryLabel, work.exhibition.gallery[language]]);
  if (work.exhibition)
    specs.push([t.exhibitionLabel, work.exhibition.name[language]]);
  if (work.exhibition?.part)
    specs.push([t.partLabel, `PART ${work.exhibition.part}`]);
  if (work.location?.city || work.location?.country)
    specs.push([
      t.locationLabel,
      [work.location.country, work.location.city, work.location.site]
        .filter(Boolean)
        .join(" · "),
    ]);
  if (work.device) specs.push([t.deviceLabel, work.device]);
  if (work.capturedAt) specs.push([t.capturedLabel, work.capturedAt]);
  if (work.splatCount) specs.push([t.splatCountLabel, work.splatCount]);
  if (work.trainingTime) specs.push([t.trainingTimeLabel, work.trainingTime]);
  if (work.trainingPipeline) specs.push([t.pipelineLabel, work.trainingPipeline]);

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
              title={work.title[language]}
              slug={work.slug}
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
          {category && (
            <span className="rounded-full border border-white/14 px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.28em] text-white/68">
              {category.label[language]}
            </span>
          )}
          {work.exhibition?.part && (
            <span className="rounded-full border border-white/14 px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.28em] text-white/68">
              PART {work.exhibition.part}
            </span>
          )}
        </div>
        {work.exhibition && (
          <p className="mt-6 text-xs uppercase tracking-[0.36em] text-white/42">
            {work.exhibition.gallery[language]}
          </p>
        )}
        <h1 className="mt-3 text-5xl font-semibold leading-[0.96] tracking-[-0.06em] sm:text-7xl">
          {work.exhibition
            ? work.exhibition.name[language]
            : work.title[language]}
        </h1>
        <p className="mt-6 max-w-3xl text-xl leading-8 text-white/68">
          {work.description[language]}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={toSplatSceneUrl(work.embedUrl)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#f7f4ed] px-5 py-2.5 text-xs font-medium uppercase tracking-[0.22em] text-[#050505] transition hover:bg-white"
          >
            {t.openInSuperSplat}
            <span aria-hidden>↗</span>
          </a>
        </div>
      </section>

      {specs.length > 0 && (
        <section className="mx-auto mt-16 max-w-6xl">
          <p className="text-xs uppercase tracking-[0.42em] text-white/36">
            {language === "zh" ? "拍摄信息" : "Capture Info"}
          </p>
          <dl className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {specs.map(([label, value]) => (
              <div
                key={label}
                className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] px-5 py-4 backdrop-blur-xl"
              >
                <dt className="text-[0.62rem] uppercase tracking-[0.32em] text-white/36">
                  {label}
                </dt>
                <dd className="mt-2 text-base text-white">{value}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

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
                className="group flex items-center justify-between rounded-[1.5rem] border border-white/10 bg-white/[0.045] px-5 py-4 backdrop-blur-xl transition hover:border-white/30 hover:bg-white/[0.075]"
              >
                <div>
                  <p className="text-[0.6rem] uppercase tracking-[0.28em] text-white/42">
                    {s.exhibition?.part ? `PART ${s.exhibition.part}` : ""}
                  </p>
                  <p className="mt-1 text-base text-white">
                    {s.exhibition
                      ? s.exhibition.name[language]
                      : s.title[language]}
                  </p>
                </div>
                <span className="text-xs uppercase tracking-[0.28em] text-white/42 transition group-hover:text-white">
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
