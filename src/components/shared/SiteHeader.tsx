"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
    search: "搜索",
    searchPlaceholder: "搜索工具、术语、案例……",
    searchBtn: "搜索",
  },
  en: {
    about: "About",
    home: "Home",
    menu: "Menu",
    close: "Close",
    search: "Search",
    searchPlaceholder: "Search tools, terms, cases…",
    searchBtn: "Search",
  },
} as const;

export function SiteHeader() {
  const { language } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const isAbout = pathname?.startsWith("/about") ?? false;
  const isZh = language === "zh";
  const t = labels[language];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");

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
    setIsSearchOpen(false);
  }, [pathname]);

  const submitSearch = (value: string) => {
    const v = value.trim();
    if (!v) {
      router.push("/search");
    } else {
      router.push(`/search?q=${encodeURIComponent(v)}`);
    }
    setIsSearchOpen(false);
    setIsMenuOpen(false);
  };

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-20 bg-gradient-to-b from-[#050505]/80 via-[#050505]/40 to-transparent" />
      <header className="fixed inset-x-0 top-0 z-[70] grid grid-cols-[auto_1fr_auto] items-center gap-2 px-3 pt-4 sm:gap-3 sm:px-8 sm:pt-5 lg:px-10 xl:px-12">
        <BrandMark />
        <nav className="hidden min-w-0 items-center justify-center gap-4 px-4 text-[0.68rem] font-medium uppercase tracking-[0.22em] text-white/52 lg:flex xl:gap-6 xl:text-xs xl:tracking-[0.28em]">
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
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            aria-label={t.search}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/14 bg-black/30 text-white/82 backdrop-blur-xl transition hover:border-white/30 hover:text-white sm:h-12 sm:w-12"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </button>
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
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/14 bg-black/30 text-white/82 backdrop-blur-xl transition hover:border-white/30 hover:text-white sm:h-12 sm:w-12 lg:hidden"
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

      {isSearchOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[80] flex items-start justify-center bg-[#050505]/80 px-4 pt-24 backdrop-blur-md"
          onClick={() => setIsSearchOpen(false)}
        >
          <form
            role="search"
            onClick={(event) => event.stopPropagation()}
            onSubmit={(event) => {
              event.preventDefault();
              submitSearch(searchInput);
            }}
            className="flex w-full max-w-2xl items-center gap-3 rounded-full border border-white/14 bg-white/[0.07] p-2 backdrop-blur-2xl"
          >
            <span aria-hidden className="pl-4 text-white/55">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </span>
            <input
              autoFocus
              type="search"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder={t.searchPlaceholder}
              aria-label={t.searchPlaceholder}
              className="flex-1 bg-transparent px-2 py-3 text-base text-white outline-none placeholder:text-white/40"
            />
            <button
              type="button"
              onClick={() => setIsSearchOpen(false)}
              className="rounded-full px-3 py-2 text-xs uppercase tracking-[0.24em] text-white/55 hover:text-white"
            >
              {t.close}
            </button>
            <button
              type="submit"
              className="rounded-full bg-[#f7f4ed] px-5 py-3 text-sm font-medium text-black"
            >
              {t.searchBtn}
            </button>
          </form>
        </div>
      )}

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

          <form
            role="search"
            onSubmit={(event) => {
              event.preventDefault();
              submitSearch(searchInput);
            }}
            className="mt-6 flex items-center gap-2 rounded-full border border-white/14 bg-white/[0.06] p-1.5"
          >
            <span aria-hidden className="pl-3 text-white/55">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </span>
            <input
              type="search"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder={t.searchPlaceholder}
              aria-label={t.searchPlaceholder}
              className="flex-1 bg-transparent px-2 py-2 text-sm text-white outline-none placeholder:text-white/40"
            />
            <button
              type="submit"
              className="rounded-full bg-[#f7f4ed] px-4 py-2 text-xs font-medium text-black"
            >
              {t.searchBtn}
            </button>
          </form>

          <nav className="mt-6 grid gap-3 overflow-y-auto pb-4">
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
            <span>TOP3DGS / 印刻万物</span>
            <LanguageToggle />
          </div>
        </div>
      )}
    </>
  );
}
