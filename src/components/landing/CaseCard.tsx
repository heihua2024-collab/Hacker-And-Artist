"use client";

import Link from "next/link";
import { useLanguage } from "@/components/shared/LanguageProvider";
import type { CaseEntry } from "@/lib/data/cases";
import { tagsById } from "@/lib/taxonomy";

const copy = {
  zh: {
    milestone: "研究里程碑",
    production: "空间案例",
    pendingVerify: "信息待核实",
    enter: "查看",
    by: "by",
  },
  en: {
    milestone: "Research Milestone",
    production: "Spatial Case",
    pendingVerify: "Pending verification",
    enter: "View",
    by: "by",
  },
} as const;

export function CaseCard({
  entry,
  variant = "default",
}: {
  entry: CaseEntry;
  variant?: "default" | "compact";
}) {
  const { language } = useLanguage();
  const t = copy[language];
  const isCompact = variant === "compact";

  const kindLabel = entry.kind === "milestone" ? t.milestone : t.production;
  const firstCreator = entry.creators[0];

  return (
    <Link
      href={`/cases/${entry.slug}`}
      className="group flex h-full flex-col rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl transition hover:border-white/30 hover:bg-white/[0.075]"
    >
      <div className="flex items-center justify-between">
        <span className="rounded-full border border-white/14 px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.28em] text-white/68">
          {kindLabel}
        </span>
        {!entry.verified && (
          <span className="rounded-full border border-amber-300/40 px-2 py-0.5 text-[0.58rem] uppercase tracking-[0.22em] text-amber-200/86">
            {t.pendingVerify}
          </span>
        )}
      </div>

      <h3
        className={`mt-8 font-semibold tracking-[-0.04em] text-white ${
          isCompact ? "text-xl" : "text-2xl sm:text-[1.7rem]"
        }`}
      >
        {entry.title[language]}
      </h3>

      <p
        className={`mt-3 leading-7 text-white/68 ${
          isCompact ? "text-sm line-clamp-3" : "text-base"
        }`}
      >
        {entry.summary[language]}
      </p>

      {firstCreator && (
        <p className="mt-5 text-xs uppercase tracking-[0.26em] text-white/42">
          {t.by} {firstCreator.name}
          {entry.location.country
            ? ` · ${entry.location.country}`
            : ""}
        </p>
      )}

      {entry.tags.length > 0 && !isCompact && (
        <div className="mt-5 flex flex-wrap gap-1.5">
          {entry.tags.slice(0, 4).map((id) => {
            const tag = tagsById[id];
            return (
              <span
                key={id}
                className="rounded-full bg-white/[0.05] px-2.5 py-0.5 text-[0.62rem] uppercase tracking-[0.22em] text-white/56"
              >
                {tag?.label[language] ?? id}
              </span>
            );
          })}
        </div>
      )}

      <span className="mt-auto pt-6 text-[0.62rem] uppercase tracking-[0.32em] text-white/56 transition group-hover:text-white">
        {t.enter} →
      </span>
    </Link>
  );
}
