"use client";

import Link from "next/link";
import { useLanguage } from "@/components/shared/LanguageProvider";
import type { CaseEntry } from "@/lib/data/cases";
import { creatorRolesById, tagsById } from "@/lib/taxonomy";

const copy = {
  zh: {
    eyebrow: "案例",
    backToIndex: "返回案例库",
    milestoneLabel: "研究里程碑",
    productionLabel: "空间案例",
    pendingVerify: "信息待核实",
    creators: "作者 / 团队",
    location: "地点",
    year: "年份",
    captureDevice: "拍摄设备",
    captureMethod: "拍摄方式",
    trainingPipeline: "训练管线",
    trainingTime: "训练耗时",
    splatCount: "高斯数量",
    viewerStack: "查看技术栈",
    client: "客户",
    summary: "项目概览",
    description: "深入解读",
    lessons: "我们能从中学到什么",
    tags: "标签",
    links: "相关链接",
    quote: "原文摘录",
    sources: "信息来源",
    openViewer: "打开 Web Viewer",
    openVideo: "观看视频",
  },
  en: {
    eyebrow: "Case",
    backToIndex: "Back to Cases",
    milestoneLabel: "Research Milestone",
    productionLabel: "Spatial Case",
    pendingVerify: "Pending verification",
    creators: "Authors / Team",
    location: "Location",
    year: "Year",
    captureDevice: "Capture Device",
    captureMethod: "Capture Method",
    trainingPipeline: "Training Pipeline",
    trainingTime: "Training Time",
    splatCount: "Splat Count",
    viewerStack: "Viewer Stack",
    client: "Client",
    summary: "Overview",
    description: "Deep Dive",
    lessons: "What we learn",
    tags: "Tags",
    links: "Links",
    quote: "Verbatim quote",
    sources: "Sources",
    openViewer: "Open Web Viewer",
    openVideo: "Watch video",
  },
} as const;

export function CaseDetail({ entry }: { entry: CaseEntry }) {
  const { language } = useLanguage();
  const t = copy[language];
  const kindLabel =
    entry.kind === "milestone" ? t.milestoneLabel : t.productionLabel;

  // 收集存在的"硬指标"字段，用来决定是否渲染 spec block
  const specs: Array<[string, string]> = [];
  if (entry.captureDevice) specs.push([t.captureDevice, entry.captureDevice]);
  if (entry.captureMethod) specs.push([t.captureMethod, entry.captureMethod]);
  if (entry.trainingPipeline)
    specs.push([t.trainingPipeline, entry.trainingPipeline]);
  if (entry.trainingTime) specs.push([t.trainingTime, entry.trainingTime]);
  if (entry.splatCount) specs.push([t.splatCount, entry.splatCount]);
  if (entry.viewerStack) specs.push([t.viewerStack, entry.viewerStack]);
  if (entry.client) specs.push([t.client, entry.client]);

  return (
    <main className="min-h-screen bg-[#050505] px-5 pb-24 pt-28 text-[#f7f4ed] sm:px-10 sm:pt-32 lg:px-16 lg:pt-36">
      <section className="mx-auto max-w-5xl">
        <Link
          href="/cases"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.32em] text-white/50 transition hover:text-white"
        >
          <span aria-hidden>←</span>
          {t.backToIndex}
        </Link>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-white/14 px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.28em] text-white/68">
            {kindLabel}
          </span>
          {!entry.verified && (
            <span className="rounded-full border border-amber-300/40 px-2 py-0.5 text-[0.58rem] uppercase tracking-[0.22em] text-amber-200/86">
              {t.pendingVerify}
            </span>
          )}
        </div>

        <h1 className="mt-6 text-5xl font-semibold leading-[0.96] tracking-[-0.07em] sm:text-7xl">
          {entry.title[language]}
        </h1>
        <p className="mt-6 max-w-3xl text-xl leading-8 text-white/68">
          {entry.summary[language]}
        </p>

        <div className="mt-10 grid gap-3 text-sm text-white/68 sm:grid-cols-3">
          {entry.creators[0] && (
            <MetaCell
              label={t.creators}
              value={entry.creators
                .map((c) => {
                  const role = creatorRolesById[c.role];
                  return `${c.name}${role ? ` · ${role.label[language]}` : ""}`;
                })
                .join(" / ")}
            />
          )}
          {(entry.location.country || entry.location.city) && (
            <MetaCell
              label={t.location}
              value={[entry.location.country, entry.location.city, entry.location.site]
                .filter(Boolean)
                .join(" · ")}
            />
          )}
          {entry.year && <MetaCell label={t.year} value={String(entry.year)} />}
        </div>

        {(entry.splatViewerUrl || entry.videoUrl) && (
          <div className="mt-8 flex flex-wrap gap-3">
            {entry.splatViewerUrl && (
              <a
                href={entry.splatViewerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#f7f4ed] px-5 py-2.5 text-xs font-medium uppercase tracking-[0.22em] text-[#050505] transition hover:bg-white"
              >
                {t.openViewer}
                <span aria-hidden>↗</span>
              </a>
            )}
            {entry.videoUrl && (
              <a
                href={entry.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-xs font-medium uppercase tracking-[0.22em] text-white/82 transition hover:border-white/45"
              >
                {t.openVideo}
                <span aria-hidden>↗</span>
              </a>
            )}
          </div>
        )}
      </section>

      <section className="mx-auto mt-16 max-w-5xl">
        <p className="text-xs uppercase tracking-[0.42em] text-white/36">
          {t.description}
        </p>
        <div className="mt-5 max-w-3xl space-y-5 text-base leading-8 text-white/72 sm:text-lg">
          {entry.description[language]
            .split(/\n+/)
            .map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
        </div>
      </section>

      {specs.length > 0 && (
        <section className="mx-auto mt-16 max-w-5xl">
          <p className="text-xs uppercase tracking-[0.42em] text-white/36">
            {language === "zh" ? "技术指标" : "Tech Specs"}
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

      {entry.lessons.length > 0 && (
        <section className="mx-auto mt-16 max-w-5xl">
          <p className="text-xs uppercase tracking-[0.42em] text-white/36">
            {t.lessons}
          </p>
          <ol className="mt-5 space-y-4">
            {entry.lessons.map((l, idx) => (
              <li
                key={idx}
                className="flex gap-4 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl"
              >
                <span className="text-sm uppercase tracking-[0.32em] text-white/36">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <p className="text-base leading-7 text-white/78">
                  {l[language]}
                </p>
              </li>
            ))}
          </ol>
        </section>
      )}

      {entry.quote?.en && (
        <section className="mx-auto mt-16 max-w-5xl">
          <p className="text-xs uppercase tracking-[0.42em] text-white/36">
            {t.quote}
          </p>
          <blockquote className="mt-5 border-l-2 border-white/22 pl-5 text-lg italic leading-8 text-white/72">
            "{entry.quote.en}"
            {entry.sources[0] && (
              <a
                href={entry.sources[0]}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 block text-xs not-italic uppercase tracking-[0.28em] text-white/50 transition hover:text-white"
              >
                — source ↗
              </a>
            )}
          </blockquote>
        </section>
      )}

      {entry.tags.length > 0 && (
        <section className="mx-auto mt-16 max-w-5xl">
          <p className="text-xs uppercase tracking-[0.42em] text-white/36">
            {t.tags}
          </p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {entry.tags.map((id) => {
              const tag = tagsById[id];
              return (
                <span
                  key={id}
                  className="rounded-full bg-white/[0.05] px-3 py-1 text-xs text-white/72"
                >
                  {tag?.label[language] ?? id}
                </span>
              );
            })}
          </div>
        </section>
      )}

      {entry.links.length > 0 && (
        <section className="mx-auto mt-16 max-w-5xl">
          <p className="text-xs uppercase tracking-[0.42em] text-white/36">
            {t.links}
          </p>
          <ul className="mt-4 space-y-2">
            {entry.links.map((l) => (
              <li key={l.url}>
                <a
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-baseline gap-3 text-sm text-white/72 transition hover:text-white"
                >
                  <span className="border-b border-dashed border-white/22 group-hover:border-white/40">
                    {l.label}
                  </span>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
                    <path d="M1 9L9 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                    <path d="M3 1H9V7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {entry.sources.length > 0 && (
        <section className="mx-auto mt-16 max-w-5xl">
          <p className="text-xs uppercase tracking-[0.42em] text-white/36">
            {t.sources}
          </p>
          <ul className="mt-4 space-y-1.5 text-sm text-white/56">
            {entry.sources.map((s) => (
              <li key={s} className="break-all">
                <a
                  href={s}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}

function MetaCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] px-5 py-4 backdrop-blur-xl">
      <p className="text-[0.62rem] uppercase tracking-[0.32em] text-white/36">
        {label}
      </p>
      <p className="mt-2 text-base text-white">{value}</p>
    </div>
  );
}
