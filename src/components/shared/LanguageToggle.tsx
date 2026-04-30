"use client";

import { useLanguage } from "@/components/shared/LanguageProvider";

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();
  const nextLabel = language === "zh" ? "EN" : "中文";

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className="rounded-full border border-white/12 px-4 py-3 text-xs font-medium uppercase tracking-[0.24em] text-white/70 backdrop-blur-xl transition hover:border-white/28 hover:text-white"
      aria-label={language === "zh" ? "Switch to English" : "切换到中文"}
    >
      {nextLabel}
    </button>
  );
}
