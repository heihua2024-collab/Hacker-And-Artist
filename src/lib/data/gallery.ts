/**
 * 印刻万物画廊（Inktoys Splat Gallery）
 *
 * 这里是工作室自有 3DGS 作品库 —— 类似影视飓风的素材库形态。
 * 模型托管在 superspl.at（PlayCanvas 维护的官方 3DGS viewer），
 * 通过 iframe 嵌入展示。已确认该域无 X-Frame-Options / CSP frame-ancestors 限制。
 *
 * 关于 SuperSplat 的两种 URL：
 *   /s?id=<id>      纯嵌入 viewer（无 UI chrome，用作 iframe src）
 *   /scene/<id>     带 UI 的分享页（用作"在 SuperSplat 打开"的外链）
 * 数据里 embedUrl 字段两种都接受，由下方 helper 自动归一化。
 */

const SUPERSPLAT_HOST = "https://superspl.at";

function extractSplatId(url: string): string | null {
  const m =
    url.match(/superspl\.at\/s\?id=([^&]+)/i) ||
    url.match(/superspl\.at\/scene\/([^/?#]+)/i);
  return m ? m[1] : null;
}

/** 用于 iframe src — 纯 viewer，无 UI chrome */
export function toSplatEmbedSrc(url: string): string {
  const id = extractSplatId(url);
  return id ? `${SUPERSPLAT_HOST}/s?id=${id}` : url;
}

/** 用于"在 SuperSplat 打开"外链 — 带完整 UI */
export function toSplatSceneUrl(url: string): string {
  const id = extractSplatId(url);
  return id ? `${SUPERSPLAT_HOST}/scene/${id}` : url;
}

export type SplatCategoryId =
  | "object"
  | "interior"
  | "exterior"
  | "heritage"
  | "experimental";

export type SplatCategory = {
  id: SplatCategoryId;
  label: { zh: string; en: string };
};

export const splatCategories: SplatCategory[] = [
  { id: "object", label: { zh: "物件", en: "Object" } },
  { id: "interior", label: { zh: "室内", en: "Interior" } },
  { id: "exterior", label: { zh: "室外", en: "Exterior" } },
  { id: "heritage", label: { zh: "文化", en: "Heritage" } },
  { id: "experimental", label: { zh: "实验", en: "Experimental" } },
];

export const splatCategoriesById: Record<SplatCategoryId, SplatCategory> =
  Object.fromEntries(splatCategories.map((c) => [c.id, c])) as Record<
    SplatCategoryId,
    SplatCategory
  >;

export type SplatLocation = {
  country?: string;
  city?: string;
  site?: string;
};

/** 展览/画廊元数据 —— 把"画廊·展览·分集"这个层级带进来 */
export type Exhibition = {
  gallery: { zh: string; en: string };
  name: { zh: string; en: string };
  part?: string;
};

export type SplatWork = {
  slug: string;
  title: { zh: string; en: string };
  description: { zh: string; en: string };
  embedUrl: string;
  thumbnailUrl?: string;
  category: SplatCategoryId;
  capturedAt?: string;
  location?: SplatLocation;
  device?: string;
  splatCount?: string;
  trainingTime?: string;
  trainingPipeline?: string;
  exhibition?: Exhibition;
  featured?: boolean;
};

/**
 * 工厂函数：基于"画廊·展览·分集"自动展开 title + description + embedUrl，
 * 让 20 件数据写得紧凑、类型安全。
 *
 * 等作者后续给具体描述时，可以直接覆盖 description 字段。
 */
function exhibitionWork(args: {
  slug: string;
  splatId: string;
  gallery: { zh: string; en: string };
  exhibition: { zh: string; en: string };
  part?: string;
  city?: string;
  category?: SplatCategoryId;
  featured?: boolean;
}): SplatWork {
  const titleZh = args.part ? `${args.exhibition.zh} PART ${args.part}` : args.exhibition.zh;
  const titleEn = args.part
    ? `${args.exhibition.en} · Part ${args.part}`
    : args.exhibition.en;

  const partNoteZh = args.part
    ? ` 本场展览以多个空间分集呈现，本件为 PART ${args.part}。`
    : "";
  const partNoteEn = args.part
    ? ` This show spans multiple spatial segments; this is Part ${args.part}.`
    : "";

  const descZh =
    `印刻万物在${args.gallery.zh}为「${args.exhibition.zh}」展期所做的高斯泼溅空间记录。` +
    `访客可以在浏览器内 360° 漫游展览现场，重温作品布展、灯光与空间气场。${partNoteZh}`;

  const descEn =
    `INKTOYS' Gaussian Splatting record of «${args.exhibition.en}» at ${args.gallery.en}. ` +
    `Drag, zoom, and walk through the exhibition right in your browser — artwork placement, lighting, and spatial atmosphere intact.${partNoteEn}`;

  return {
    slug: args.slug,
    title: { zh: titleZh, en: titleEn },
    description: { zh: descZh, en: descEn },
    embedUrl: `${SUPERSPLAT_HOST}/s?id=${args.splatId}`,
    category: args.category ?? "interior",
    location: args.city ? { city: args.city } : undefined,
    exhibition: {
      gallery: args.gallery,
      name: args.exhibition,
      part: args.part,
    },
    featured: args.featured,
  };
}

const KENNAXU_NANSHAN = {
  zh: "KennaXu 画廊（南山）",
  en: "KennaXu Gallery, Nanshan",
};
const KENNAXU_FUTIAN = {
  zh: "KennaXu 画廊（福田）",
  en: "KennaXu Gallery, Futian",
};
const KCCA = { zh: "科纳艺术中心 KCCA", en: "KCCA — Kena Center" };
const SUMMIT = { zh: "登顶计划", en: "Summit Project" };

/**
 * 首批 20 件作品 —— 来自 8 家画廊的 10 场展览，
 * 全部由作者本人采集、训练并通过 SuperSplat 公开发布。
 */
export const splatWorks: SplatWork[] = [
  exhibitionWork({
    slug: "wanyi-wanli-tiyi",
    splatId: "c3e918ce",
    gallery: { zh: "万一空间", en: "Wanyi Space" },
    exhibition: { zh: "万里挑一", en: "One in Ten Thousand" },
  }),
  exhibitionWork({
    slug: "qiange-qianhu",
    splatId: "ef23324f",
    gallery: { zh: "千格空间", en: "Qiange Space" },
    exhibition: { zh: "千惚之橘", en: "A Tangerine in Reverie" },
  }),
  exhibitionWork({
    slug: "suoluo-shadow-play-a",
    splatId: "2da3a7f2",
    gallery: { zh: "所落", en: "Suoluo" },
    exhibition: { zh: "影子剧", en: "Shadow Play" },
    part: "A",
  }),
  exhibitionWork({
    slug: "suoluo-shadow-play-b",
    splatId: "013e52ae",
    gallery: { zh: "所落", en: "Suoluo" },
    exhibition: { zh: "影子剧", en: "Shadow Play" },
    part: "B",
  }),
  exhibitionWork({
    slug: "suoluo-shadow-play-c",
    splatId: "11d36034",
    gallery: { zh: "所落", en: "Suoluo" },
    exhibition: { zh: "影子剧", en: "Shadow Play" },
    part: "C",
  }),
  exhibitionWork({
    slug: "kennaxu-nanshan-summit-a",
    splatId: "45650cb6",
    gallery: KENNAXU_NANSHAN,
    exhibition: SUMMIT,
    part: "A",
    city: "深圳",
  }),
  exhibitionWork({
    slug: "kennaxu-nanshan-summit-b",
    splatId: "7699b306",
    gallery: KENNAXU_NANSHAN,
    exhibition: SUMMIT,
    part: "B",
    city: "深圳",
  }),
  exhibitionWork({
    slug: "kennaxu-nanshan-summit-c",
    splatId: "369ccea8",
    gallery: KENNAXU_NANSHAN,
    exhibition: SUMMIT,
    part: "C",
    city: "深圳",
  }),
  exhibitionWork({
    slug: "kennaxu-nanshan-summit-d",
    splatId: "bf43db88",
    gallery: KENNAXU_NANSHAN,
    exhibition: SUMMIT,
    part: "D",
    city: "深圳",
  }),
  exhibitionWork({
    slug: "kcca-summit-a",
    splatId: "194b7971",
    gallery: KCCA,
    exhibition: SUMMIT,
    part: "A",
    city: "深圳",
  }),
  exhibitionWork({
    slug: "kcca-summit-b",
    splatId: "053dcc54",
    gallery: KCCA,
    exhibition: SUMMIT,
    part: "B",
    city: "深圳",
  }),
  exhibitionWork({
    slug: "kennaxu-futian-summit-a",
    splatId: "8d84374b",
    gallery: KENNAXU_FUTIAN,
    exhibition: SUMMIT,
    part: "A",
    city: "深圳",
  }),
  exhibitionWork({
    slug: "kennaxu-futian-summit-b",
    splatId: "d592fc44",
    gallery: KENNAXU_FUTIAN,
    exhibition: SUMMIT,
    part: "B",
    city: "深圳",
  }),
  exhibitionWork({
    slug: "kcca-mystery-a",
    splatId: "9dbb1ec7",
    gallery: KCCA,
    exhibition: { zh: "秘境", en: "Mysterious Wonders" },
    part: "A",
    city: "深圳",
  }),
  exhibitionWork({
    slug: "kcca-mystery-b",
    splatId: "bcd1597f",
    gallery: KCCA,
    exhibition: { zh: "秘境", en: "Mysterious Wonders" },
    part: "B",
    city: "深圳",
  }),
  exhibitionWork({
    slug: "kcca-vip-room",
    splatId: "ab7d0085",
    gallery: KCCA,
    exhibition: { zh: "VIP 会客室", en: "VIP Lounge" },
    city: "深圳",
  }),
  exhibitionWork({
    slug: "yisen-relax",
    splatId: "4a211213",
    gallery: { zh: "艺森画廊", en: "Yisen Gallery" },
    exhibition: { zh: "「放轻松」", en: "Take It Easy" },
  }),
  exhibitionWork({
    slug: "maling-play-gravity-a",
    splatId: "a4d1a4b7",
    gallery: { zh: "馬凌畫廊", en: "Edouard Malingue Gallery" },
    exhibition: { zh: "PLAY GRAVITY 潑賴引力", en: "Play Gravity" },
    part: "A",
    featured: true,
  }),
  exhibitionWork({
    slug: "maling-play-gravity-b",
    splatId: "3ed75459",
    gallery: { zh: "馬凌畫廊", en: "Edouard Malingue Gallery" },
    exhibition: { zh: "PLAY GRAVITY 潑賴引力", en: "Play Gravity" },
    part: "B",
  }),
  exhibitionWork({
    slug: "maling-play-gravity-c",
    splatId: "ff251d7c",
    gallery: { zh: "馬凌畫廊", en: "Edouard Malingue Gallery" },
    exhibition: { zh: "PLAY GRAVITY 潑賴引力", en: "Play Gravity" },
    part: "C",
  }),
];

export const splatWorksBySlug: Record<string, SplatWork> = Object.fromEntries(
  splatWorks.map((w) => [w.slug, w]),
);

export const featuredSplatWork =
  splatWorks.find((w) => w.featured) ?? splatWorks[0];

/**
 * 用于按"画廊"筛选 —— 返回去重后的画廊名（中文优先），
 * 同名画廊可能会有多场展览/多个分馆。
 */
export function listGalleries(): { zh: string; en: string; count: number }[] {
  const map = new Map<string, { zh: string; en: string; count: number }>();
  for (const w of splatWorks) {
    if (!w.exhibition) continue;
    const key = w.exhibition.gallery.zh;
    const existing = map.get(key);
    if (existing) {
      existing.count++;
    } else {
      map.set(key, {
        zh: w.exhibition.gallery.zh,
        en: w.exhibition.gallery.en,
        count: 1,
      });
    }
  }
  return Array.from(map.values());
}
