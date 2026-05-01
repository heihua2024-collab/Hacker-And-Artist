/**
 * 印刻万物 · 工作室作品（Studio Works）
 *
 * 位于 /media 下的"工作室作品"子栏目 —— 这是印刻万物自己采集、训练、
 * 通过 SuperSplat 公开发布的高斯泼溅空间记录。
 *
 * 历史上这部分内容曾位于 /gallery，从 2026-05 起迁移至 /media，
 * 以便 /gallery 用于展示社区/创作者精选案例。
 */

const SUPERSPLAT_HOST = "https://superspl.at";

const STUDIO_THUMBNAILS: Record<string, string> = {
  c3e918ce: "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/splat/c3e918ce/v1/xl.webp",
  ef23324f: "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/splat/ef23324f/v1/xl.webp",
  "2da3a7f2": "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/splat/2da3a7f2/v1/xl.webp",
  "013e52ae": "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/splat/013e52ae/v1/xl.webp",
  "11d36034": "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/splat/11d36034/v1/xl.webp",
  "45650cb6": "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/splat/45650cb6/v1/xl.webp",
  "7699b306": "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/splat/7699b306/v1/xl.webp",
  "369ccea8": "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/splat/369ccea8/v1/xl.webp",
  bf43db88: "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/splat/bf43db88/v1/xl.webp",
  "194b7971": "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/splat/194b7971/v1/xl.webp",
  "053dcc54": "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/splat/053dcc54/v1/xl.webp",
  "8d84374b": "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/splat/8d84374b/v1/xl.webp",
  d592fc44: "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/splat/d592fc44/v1/xl.webp",
  "9dbb1ec7": "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/splat/9dbb1ec7/v1/xl.webp",
  bcd1597f: "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/splat/bcd1597f/v1/xl.webp",
  ab7d0085: "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/splat/ab7d0085/v1/xl.webp",
  "4a211213": "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/splat/4a211213/v1/xl.webp",
  a4d1a4b7: "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/splat/a4d1a4b7/v1/xl.webp",
  "3ed75459": "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/splat/3ed75459/v1/xl.webp",
  ff251d7c: "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/splat/ff251d7c/v1/xl.webp",
};

export type StudioCategoryId =
  | "object"
  | "interior"
  | "exterior"
  | "heritage"
  | "experimental";

export type StudioCategory = {
  id: StudioCategoryId;
  label: { zh: string; en: string };
};

export const studioCategories: StudioCategory[] = [
  { id: "object", label: { zh: "物件", en: "Object" } },
  { id: "interior", label: { zh: "室内", en: "Interior" } },
  { id: "exterior", label: { zh: "室外", en: "Exterior" } },
  { id: "heritage", label: { zh: "文化", en: "Heritage" } },
  { id: "experimental", label: { zh: "实验", en: "Experimental" } },
];

export const studioCategoriesById: Record<StudioCategoryId, StudioCategory> =
  Object.fromEntries(studioCategories.map((c) => [c.id, c])) as Record<
    StudioCategoryId,
    StudioCategory
  >;

export type StudioLocation = {
  country?: string;
  city?: string;
  site?: string;
};

export type StudioExhibition = {
  gallery: { zh: string; en: string };
  name: { zh: string; en: string };
  part?: string;
};

export type StudioWork = {
  slug: string;
  title: { zh: string; en: string };
  description: { zh: string; en: string };
  embedUrl: string;
  thumbnailUrl?: string;
  category: StudioCategoryId;
  capturedAt?: string;
  location?: StudioLocation;
  device?: string;
  splatCount?: string;
  trainingTime?: string;
  trainingPipeline?: string;
  exhibition?: StudioExhibition;
  featured?: boolean;
};

function exhibitionWork(args: {
  slug: string;
  splatId: string;
  gallery: { zh: string; en: string };
  exhibition: { zh: string; en: string };
  part?: string;
  city?: string;
  category?: StudioCategoryId;
  featured?: boolean;
}): StudioWork {
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
    `TOP3DGS' Gaussian Splatting record of «${args.exhibition.en}» at ${args.gallery.en}. ` +
    `Drag, zoom, and walk through the exhibition right in your browser — artwork placement, lighting, and spatial atmosphere intact.${partNoteEn}`;

  return {
    slug: args.slug,
    title: { zh: titleZh, en: titleEn },
    description: { zh: descZh, en: descEn },
    embedUrl: `${SUPERSPLAT_HOST}/s?id=${args.splatId}`,
    thumbnailUrl: STUDIO_THUMBNAILS[args.splatId],
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

export const studioWorks: StudioWork[] = [
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

export const studioWorksBySlug: Record<string, StudioWork> = Object.fromEntries(
  studioWorks.map((w) => [w.slug, w]),
);

export const featuredStudioWork =
  studioWorks.find((w) => w.featured) ?? studioWorks[0];

export function listStudioGalleries(): { zh: string; en: string; count: number }[] {
  const map = new Map<string, { zh: string; en: string; count: number }>();
  for (const w of studioWorks) {
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
