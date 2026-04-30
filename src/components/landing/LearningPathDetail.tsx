"use client";

import Link from "next/link";
import { useLanguage } from "@/components/shared/LanguageProvider";
import { glossaryById } from "@/lib/data/glossary";
import type {
  LearningModule,
  LearningPath,
  LearningResource,
} from "@/lib/data/learning-paths";
import { formatsById, levelsById } from "@/lib/taxonomy";

const copy = {
  zh: {
    eyebrow: "学习路径",
    backToHub: "返回学习总览",
    audience: "面向",
    duration: "时长",
    level: "难度",
    prerequisites: "前置准备",
    outcomes: "学完之后你能",
    modules: "模块",
    outlineTitle: "本模块要讲什么",
    keyConceptsTitle: "关联术语",
    resourcesTitle: "资料",
    cta: "把它用起来",
    visitTools: "去工具索引",
    formatLabel: "形式",
    durationLabel: "时长",
    moduleAnchor: "Module",
    resourceTypes: {
      paper: "论文",
      github: "GitHub",
      video: "视频",
      article: "文章",
      website: "站点",
      tool: "工具",
    },
  },
  en: {
    eyebrow: "Learning Path",
    backToHub: "Back to Learn",
    audience: "Audience",
    duration: "Duration",
    level: "Level",
    prerequisites: "Prerequisites",
    outcomes: "After this path you can",
    modules: "Modules",
    outlineTitle: "What's inside",
    keyConceptsTitle: "Related Terms",
    resourcesTitle: "Resources",
    cta: "Put it to work",
    visitTools: "Browse Tools Index",
    formatLabel: "Format",
    durationLabel: "Duration",
    moduleAnchor: "Module",
    resourceTypes: {
      paper: "Paper",
      github: "GitHub",
      video: "Video",
      article: "Article",
      website: "Website",
      tool: "Tool",
    },
  },
} as const;

export function LearningPathDetail({ path }: { path: LearningPath }) {
  const { language } = useLanguage();
  const t = copy[language];
  const level = levelsById[path.level];

  return (
    <main className="min-h-screen bg-[#050505] px-5 pb-24 pt-28 text-[#f7f4ed] sm:px-10 sm:pt-32 lg:px-16 lg:pt-36">
      <section className="mx-auto max-w-5xl">
        <Link
          href="/learn"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.32em] text-white/50 transition hover:text-white"
        >
          <span aria-hidden>←</span>
          {t.backToHub}
        </Link>

        <p className="mt-10 text-xs uppercase tracking-[0.5em] text-white/40">
          {t.eyebrow}
        </p>
        <h1 className="mt-5 text-5xl font-semibold leading-[0.96] tracking-[-0.07em] sm:text-7xl">
          {path.title[language]}
        </h1>
        <p className="mt-6 max-w-3xl text-xl leading-8 text-white/68">
          {path.subtitle[language]}
        </p>

        <div className="mt-10 grid gap-3 text-sm text-white/68 sm:grid-cols-3">
          <MetaCell label={t.level} value={level?.label[language] ?? path.level} />
          <MetaCell label={t.duration} value={path.duration} />
          <MetaCell label={t.audience} value={path.audience[language]} />
        </div>
      </section>

      <section className="mx-auto mt-20 grid max-w-5xl gap-10 lg:grid-cols-2">
        <Block title={t.prerequisites}>
          <ul className="space-y-3">
            {path.prerequisites.map((item, idx) => (
              <li key={idx} className="flex gap-3 text-base text-white/72">
                <span className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-white/40" />
                <span>{item[language]}</span>
              </li>
            ))}
          </ul>
        </Block>
        <Block title={t.outcomes}>
          <ul className="space-y-3">
            {path.outcomes.map((item, idx) => (
              <li key={idx} className="flex gap-3 text-base text-white/72">
                <span className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-white/40" />
                <span>{item[language]}</span>
              </li>
            ))}
          </ul>
        </Block>
      </section>

      <section className="mx-auto mt-24 max-w-5xl">
        <p className="text-xs uppercase tracking-[0.42em] text-white/36">
          {t.modules}
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] sm:text-5xl">
          {language === "zh"
            ? "七个模块，循序渐进"
            : "Seven modules, layered understanding"}
        </h2>

        <ol className="mt-12 space-y-5">
          {path.modules.map((m) => (
            <ModuleCard key={m.index} module={m} language={language} t={t} />
          ))}
        </ol>
      </section>

      <section className="mx-auto mt-24 max-w-5xl">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl sm:p-12">
          <p className="text-xs uppercase tracking-[0.42em] text-white/36">
            {t.cta}
          </p>
          <p className="mt-5 text-2xl leading-snug tracking-[-0.04em] text-white sm:text-3xl">
            {path.callToAction[language]}
          </p>
          <Link
            href="/tools"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#f7f4ed] px-6 py-3 text-sm font-medium uppercase tracking-[0.24em] text-[#050505] transition hover:bg-white"
          >
            {t.visitTools}
            <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
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

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.42em] text-white/36">
        {title}
      </p>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function ModuleCard({
  module,
  language,
  t,
}: {
  module: LearningModule;
  language: "zh" | "en";
  t: (typeof copy)[keyof typeof copy];
}) {
  const format = formatsById[module.format];

  return (
    <li
      id={`module-${module.index}`}
      className="scroll-mt-32 rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl sm:p-8"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-baseline gap-4">
          <span className="text-sm uppercase tracking-[0.36em] text-white/36">
            {t.moduleAnchor} {module.index}
          </span>
          {format && (
            <span className="rounded-full border border-white/12 px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.24em] text-white/68">
              {format.label[language]}
            </span>
          )}
        </div>
        <span className="text-xs uppercase tracking-[0.28em] text-white/50">
          {module.duration}
        </span>
      </div>

      <h3 className="mt-6 text-2xl font-semibold leading-snug tracking-[-0.04em] text-white sm:text-3xl">
        {module.title[language]}
      </h3>

      <p className="mt-5 text-base leading-7 text-white/72 sm:text-lg">
        {module.summary[language]}
      </p>

      {module.outline.length > 0 && (
        <div className="mt-8">
          <p className="text-[0.62rem] uppercase tracking-[0.32em] text-white/36">
            {t.outlineTitle}
          </p>
          <ol className="mt-4 grid gap-2 sm:grid-cols-2">
            {module.outline.map((item, idx) => (
              <li
                key={idx}
                className="flex items-baseline gap-3 text-sm text-white/72"
              >
                <span className="text-white/30">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span>{item[language]}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {module.keyConcepts.length > 0 && (
        <div className="mt-8">
          <p className="text-[0.62rem] uppercase tracking-[0.32em] text-white/36">
            {t.keyConceptsTitle}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {module.keyConcepts.map((id) => {
              const term = glossaryById[id];
              if (!term) {
                return (
                  <span
                    key={id}
                    className="rounded-full bg-white/[0.04] px-3 py-1 text-xs text-white/36"
                  >
                    {id}
                  </span>
                );
              }
              return (
                <Link
                  key={id}
                  href={`/learn?term=${id}#term-${id}`}
                  className="rounded-full border border-white/12 bg-white/[0.05] px-3 py-1 text-xs text-white/72 transition hover:border-white/30 hover:text-white"
                >
                  {term.term[language]}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {module.resources.length > 0 && (
        <div className="mt-8">
          <p className="text-[0.62rem] uppercase tracking-[0.32em] text-white/36">
            {t.resourcesTitle}
          </p>
          <ul className="mt-3 space-y-2">
            {module.resources.map((r, idx) => (
              <ResourceLink key={`${r.url}-${idx}`} resource={r} t={t} />
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}

function ResourceLink({
  resource,
  t,
}: {
  resource: LearningResource;
  t: (typeof copy)[keyof typeof copy];
}) {
  const typeLabel = t.resourceTypes[resource.type] ?? resource.type;
  const isInternal = resource.url.startsWith("/");
  const inner = (
    <>
      <span className="rounded-full border border-white/12 px-2 py-0.5 text-[0.6rem] uppercase tracking-[0.22em] text-white/56">
        {typeLabel}
      </span>
      <span className="border-b border-dashed border-white/22 group-hover:border-white/40">
        {resource.title}
      </span>
      {!isInternal && (
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          aria-hidden="true"
        >
          <path d="M1 9L9 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M3 1H9V7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </>
  );
  return (
    <li>
      {isInternal ? (
        <Link
          href={resource.url}
          className="group flex items-baseline gap-3 text-sm text-white/72 transition hover:text-white"
        >
          {inner}
        </Link>
      ) : (
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-baseline gap-3 text-sm text-white/72 transition hover:text-white"
        >
          {inner}
        </a>
      )}
    </li>
  );
}
