"use client";

import { useState } from "react";
import { useLanguage } from "@/components/shared/LanguageProvider";
import { toSplatEmbedSrc } from "@/lib/data/gallery";

const copy = {
  zh: {
    clickToLoad: "点击载入交互场景",
    sizeNote: "约 30–80 MB · 浏览器内 360°",
    loading: "正在加载场景…",
  },
  en: {
    clickToLoad: "Click to load interactive scene",
    sizeNote: "~30–80 MB · 360° in browser",
    loading: "Loading scene…",
  },
} as const;

/**
 * 高斯泼溅嵌入组件 —— 三种模式：
 *
 *  - mode="click-to-load" (默认)：先显示静态海报，用户点击才挂 iframe，
 *    避免列表/首页一进入就同时跑多个 WebGL。
 *  - mode="auto"：直接挂 iframe，带深色加载骨架。详情页用。
 *
 * 传入的 url 接受 superspl.at 的两种格式 (/s?id= 或 /scene/)，
 * 内部统一归一化到 embed src。
 */
export function SplatEmbed({
  url,
  title,
  slug,
  mode = "click-to-load",
}: {
  url: string;
  title: string;
  slug: string;
  mode?: "click-to-load" | "auto";
}) {
  const { language } = useLanguage();
  const t = copy[language];
  const [loaded, setLoaded] = useState(mode === "auto");
  const [iframeReady, setIframeReady] = useState(false);

  const embedSrc = toSplatEmbedSrc(url);

  if (mode === "click-to-load" && !loaded) {
    return (
      <button
        type="button"
        onClick={() => setLoaded(true)}
        className="group relative h-full w-full cursor-pointer overflow-hidden bg-black"
        aria-label={t.clickToLoad}
      >
        <SplatPoster slug={slug} dense />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/30 transition group-hover:bg-black/22">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/35 bg-black/55 backdrop-blur-md transition group-hover:border-white/65 group-hover:bg-black/35 sm:h-20 sm:w-20">
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              aria-hidden="true"
              className="ml-1"
            >
              <path
                d="M4 2.5L19 11L4 19.5V2.5Z"
                fill="currentColor"
                className="text-white/90"
              />
            </svg>
          </div>
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.32em] text-white/82 sm:text-sm">
              {t.clickToLoad}
            </p>
            <p className="mt-2 text-[0.6rem] uppercase tracking-[0.28em] text-white/52">
              {t.sizeNote}
            </p>
          </div>
        </div>
      </button>
    );
  }

  return (
    <div className="relative h-full w-full bg-black">
      {!iframeReady && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black">
          <SplatPoster slug={slug} dense />
          <div className="absolute inset-0 flex items-center justify-center bg-black/55">
            <div className="flex flex-col items-center gap-3">
              <div className="h-9 w-9 animate-spin rounded-full border-2 border-white/14 border-t-white/72" />
              <p className="text-[0.6rem] uppercase tracking-[0.32em] text-white/56">
                {t.loading}
              </p>
            </div>
          </div>
        </div>
      )}
      <iframe
        src={embedSrc}
        title={title}
        className="h-full w-full"
        allow="fullscreen; xr-spatial-tracking"
        allowFullScreen
        onLoad={() => setIframeReady(true)}
        style={{ border: 0 }}
      />
    </div>
  );
}

/** 用 slug hash 派生稳定渐变 + splat 散点，作为 iframe 加载前的占位 */
export function SplatPoster({
  slug,
  dense = false,
}: {
  slug: string;
  dense?: boolean;
}) {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
  }
  const hue = hash % 360;
  const dotCount = dense ? 26 : 14;
  const dots = Array.from({ length: dotCount }).map((_, i) => {
    const seed = (hash >>> (i * 2)) ^ (i * 2654435761);
    const x = (seed >>> 0) % 100;
    const y = (seed >>> 8) % 100;
    const size = 1.5 + (((seed >>> 16) % 32) / 10);
    const opacity = 0.16 + (((seed >>> 4) % 70) / 100) * 0.55;
    return { x, y, size, opacity, key: i };
  });
  return (
    <div
      className="absolute inset-0"
      style={{
        background: `radial-gradient(circle at 30% 25%, hsl(${hue} 50% 26% / 0.85), hsl(${(hue + 38) % 360} 30% 6%))`,
      }}
    >
      {dots.map((d) => (
        <span
          key={d.key}
          className="pointer-events-none absolute rounded-full bg-white"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: `${d.size}px`,
            height: `${d.size}px`,
            opacity: d.opacity,
            filter: "blur(0.5px)",
          }}
        />
      ))}
    </div>
  );
}
