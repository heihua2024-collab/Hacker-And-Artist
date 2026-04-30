"use client";

import { useLanguage } from "@/components/shared/LanguageProvider";

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();
  const nextLabel = language === "zh" ? "EN" : "中文";

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className="inline-flex h-10 min-w-10 items-center justify-center rounded-full border border-white/12 px-2.5 text-[0.68rem] font-medium uppercase tracking-[0.14em] text-white/70 backdrop-blur-xl transition hover:border-white/28 hover:text-white sm:h-12 sm:px-4 sm:text-xs sm:tracking-[0.24em]"
      aria-label={language === "zh" ? "Switch to English" : "切换到中文"}
    >
      {nextLabel}
    </button>
  );
}
