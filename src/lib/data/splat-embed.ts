/**
 * 高斯泼溅外部嵌入辅助
 *
 * 站内同时支持几类来源：
 *   - SuperSplat（PlayCanvas 维护的官方 3DGS viewer，无 X-Frame-Options 限制）
 *   - PlayCanvas 官方 splat 示例（playcanv.as, playcanvas.com/viewer）
 *   - GitHub Pages / 作者个站上的 viewer（antimatter15.com/splat, *.github.io, …）
 *
 * SuperSplat 两种 URL：
 *   /s?id=<id>      纯嵌入 viewer（无 UI chrome，用作 iframe src）
 *   /scene/<id>     带 UI 的分享页（用作"原页面打开"的外链）
 *
 * 其他来源则 URL 本身既是 iframe src，也是"原页面打开"链接。
 */

const SUPERSPLAT_HOST = "https://superspl.at";

export type EmbedPlatform =
  | "supersplat"
  | "playcanvas"
  | "github-pages"
  | "author-site";

function extractSupersplatId(url: string): string | null {
  const m =
    url.match(/superspl\.at\/s\?id=([^&]+)/i) ||
    url.match(/superspl\.at\/scene\/([^/?#]+)/i);
  return m ? m[1] : null;
}

/** iframe src：SuperSplat 会归一化到 /s?id=… 形式 */
export function toSplatEmbedSrc(url: string): string {
  const id = extractSupersplatId(url);
  return id ? `${SUPERSPLAT_HOST}/s?id=${id}` : url;
}

/** "原页面 / 作者页面"外链 */
export function toSplatSceneUrl(url: string): string {
  const id = extractSupersplatId(url);
  return id ? `${SUPERSPLAT_HOST}/scene/${id}` : url;
}

/** 依据 URL 判别平台 */
export function detectEmbedPlatform(url: string): EmbedPlatform {
  if (/superspl\.at/i.test(url)) return "supersplat";
  if (/playcanv(as|\.as)/i.test(url)) return "playcanvas";
  if (/\.github\.io/i.test(url)) return "github-pages";
  return "author-site";
}

export const EMBED_PLATFORM_LABEL: Record<EmbedPlatform, { zh: string; en: string }> = {
  supersplat: { zh: "SuperSplat", en: "SuperSplat" },
  playcanvas: { zh: "PlayCanvas", en: "PlayCanvas" },
  "github-pages": { zh: "GitHub Pages", en: "GitHub Pages" },
  "author-site": { zh: "作者站点", en: "Author site" },
};

/** 直接判断某个 URL 是否可以跑在 iframe 里（目前全部走 click-to-load，返回 true） */
export function isEmbeddable(): boolean {
  return true;
}
