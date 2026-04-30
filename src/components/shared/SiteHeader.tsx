"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandMark } from "@/components/shared/BrandMark";
import { LanguageToggle } from "@/components/shared/LanguageToggle";
import { useLanguage } from "@/components/shared/LanguageProvider";

const navItems = [
  ["学习", "Learn", "/learn"],
  ["术语", "Glossary", "/glossary"],
  ["工具", "Tools", "/tools"],
  ["洞察", "Insights", "/insights"],
  ["画廊", "Gallery", "/gallery"],
  ["动态", "News", "/news"],
  ["媒体", "Media", "/media"],
  ["社区", "Community", "/community"],
] as const;

const labels = {
  zh: {
    about: "关于我们",
    home: "返回首页",
    menu: "菜单",
    close: "关闭",
  },
  en: {
    about: "About",
    home: "Home",
    menu: "Menu",
    close: "Close",
  },
} as const;

export function SiteHeader() {
  const { language } = useLanguage();
  const pathname = usePathname();
  const isAbout = pathname?.startsWith("/about") ?? false;
  const isZh = language === "zh";
  const t = labels[language];
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-20 bg-gradient-to-b from-[#050505]/80 via-[#050505]/40 to-transparent" />
      <header className="fixed inset-x-0 top-0 z-[70] flex items-center justify-between gap-3 px-5 pt-4 sm:px-8 sm:pt-5 lg:px-12">
        <BrandMark />
        <nav className="hidden items-center gap-6 text-xs font-medium uppercase tracking-[0.28em] text-white/52 lg:flex">
          {navItems.map(([zh, en, href]) => (
            <Link
              key={href}
              href={href}
              className="transition hover:text-white"
            >
              {isZh ? zh : en}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href={isAbout ? "/" : "/about"}
            className="hidden rounded-full border border-white/14 bg-black/30 px-4 py-3 text-xs font-medium uppercase tracking-[0.24em] text-white/76 backdrop-blur-xl transition hover:border-white/30 hover:text-white lg:inline-flex"
          >
            {isAbout ? t.home : t.about}
          </Link>
          <LanguageToggle />
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            aria-expanded={isMenuOpen}
            aria-controls="site-mobile-menu"
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/14 bg-black/30 text-white/82 backdrop-blur-xl transition hover:border-white/30 hover:text-white lg:hidden"
          >
            <span className="sr-only">{t.menu}</span>
            <svg
              width="18"
              height="14"
              viewBox="0 0 18 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M1 1H17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              <path d="M1 7H17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              <path d="M1 13H17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </header>

      {isMenuOpen && (
        <div
          id="site-mobile-menu"
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[80] flex flex-col bg-[#050505]/96 px-5 pb-10 pt-4 backdrop-blur-2xl lg:hidden"
        >
          <div className="flex items-center justify-between gap-4">
            <BrandMark />
            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              className="inline-flex h-12 items-center rounded-full border border-white/14 bg-white/[0.06] px-5 text-xs font-medium uppercase tracking-[0.24em] text-white/82"
            >
              {t.close}
            </button>
          </div>
          <nav className="mt-12 grid gap-3 overflow-y-auto pb-4">
            {navItems.map(([zh, en, href]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] px-6 py-5 text-2xl font-medium tracking-[-0.04em] text-white"
              >
                {isZh ? zh : en}
              </Link>
            ))}
            <Link
              href={isAbout ? "/" : "/about"}
              onClick={() => setIsMenuOpen(false)}
              className="rounded-[1.5rem] border border-white/14 bg-white/[0.08] px-6 py-5 text-2xl font-medium tracking-[-0.04em] text-white"
            >
              {isAbout ? t.home : t.about}
            </Link>
          </nav>
          <div className="mt-auto flex items-center justify-between gap-3 pt-6 text-xs uppercase tracking-[0.32em] text-white/42">
            <span>INKTOYS / 印刻万物</span>
            <LanguageToggle />
          </div>
        </div>
      )}
    </>
  );
}
