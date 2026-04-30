"use client";

import { useLanguage } from "@/components/shared/LanguageProvider";
import { newsCategories, type NewsItem } from "@/lib/data/news";
import { tagsById } from "@/lib/taxonomy";

type Variant = "compact" | "featured" | "hero";

const formatDate = (iso: string, lang: "zh" | "en") => {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString(lang === "zh" ? "zh-CN" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const categoryLabel = (id: NewsItem["category"], lang: "zh" | "en") => {
  return (
    newsCategories.find((c) => c.id === id)?.label[lang] ?? id.toUpperCase()
  );
};

export function NewsCard({
  item,
  variant = "compact",
}: {
  item: NewsItem;
  variant?: Variant;
}) {
  const { language } = useLanguage();
  const lang = language;

  const isHero = variant === "hero";
  const isFeatured = variant === "featured";

  return (
    <a
      href={item.sourceUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl transition hover:border-white/24 hover:bg-white/[0.075] sm:p-7 ${
        isHero ? "min-h-[24rem]" : isFeatured ? "min-h-[22rem]" : "min-h-[16rem]"
      }`}
    >
      <div className="absolute inset-x-8 top-8 h-24 rounded-full bg-white/[0.05] blur-3xl transition group-hover:bg-[#1e88e5]/12" />
      <div className="relative flex flex-1 flex-col">
        <div className="flex items-center justify-between gap-3 text-[0.65rem] uppercase tracking-[0.32em] text-white/42">
          <span className="text-white/56">{categoryLabel(item.category, lang)}</span>
          <span>{formatDate(item.publishedAt, lang)}</span>
        </div>

        <h3
          className={`mt-5 font-semibold tracking-[-0.04em] text-white ${
            isHero
              ? "text-3xl leading-tight sm:text-4xl"
              : isFeatured
                ? "text-2xl leading-snug"
                : "text-xl leading-snug"
          }`}
        >
          {item.title[lang]}
        </h3>

        <p
          className={`mt-4 leading-7 text-white/68 ${
            isHero
              ? "text-base sm:text-lg"
              : isFeatured
                ? "text-base"
                : "text-sm"
          }`}
        >
          {item.summary[lang]}
        </p>

        {(isHero || isFeatured) && item.editorialNote && (
          <p className="mt-4 border-l-2 border-white/14 pl-4 text-sm leading-6 text-white/52">
            {item.editorialNote[lang]}
          </p>
        )}

        <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-6">
          <div className="flex flex-wrap items-center gap-1.5">
            {item.tags.slice(0, 3).map((id) => {
              const tag = tagsById[id];
              if (!tag) return null;
              return (
                <span
                  key={id}
                  className="rounded-full bg-white/[0.05] px-2 py-0.5 text-[0.6rem] uppercase tracking-[0.22em] text-white/56"
                >
                  #{tag.label[lang]}
                </span>
              );
            })}
          </div>
          <span className="inline-flex items-center gap-1.5 text-[0.65rem] uppercase tracking-[0.28em] text-white/56 transition group-hover:text-white">
            <span>{item.source.name}</span>
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M1 9L9 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              <path d="M3 1H9V7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>

        {!item.verified && (
          <span className="absolute right-6 top-6 text-[0.55rem] uppercase tracking-[0.28em] text-amber-300/80">
            {lang === "zh" ? "信息待核实" : "Pending"}
          </span>
        )}
      </div>
    </a>
  );
}
