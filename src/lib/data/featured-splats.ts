/**
 * 创作者精选案例（Featured Creator Splats）
 *
 * 本列表用于 /gallery 页面 —— 聚合来自 SuperSplat 公开作品库、PlayCanvas 官方
 * 示例、研究团队 GitHub Pages demo 等来源的 34 条高斯泼溅场景。所有作品都以
 * iframe 形式内嵌交互，并在页面上完整标出"原页面链接 / 作者 / 平台"，
 * 让访客能直接点回原发布页查看完整署名与许可证信息。
 *
 * 法务口径与来源请参考仓库根目录的
 *   `gaussian-splat-cases-low-legal-risk.md`
 *
 * 作者与缩略图：SuperSplat 条目从原页面抓取作者链接与 og:image；
 *               GitHub Pages / PlayCanvas 条目使用页面截图或原站 og:image。
 */

import {
  detectEmbedPlatform,
  toSplatEmbedSrc,
  toSplatSceneUrl,
  type EmbedPlatform,
} from "@/lib/data/splat-embed";

export type FeaturedCategoryId =
  | "architecture"
  | "interior"
  | "nature"
  | "object"
  | "academic"
  | "interactive";

export type FeaturedCategory = {
  id: FeaturedCategoryId;
  label: { zh: string; en: string };
};

export const featuredCategories: FeaturedCategory[] = [
  { id: "architecture", label: { zh: "建筑 · 古迹", en: "Architecture" } },
  { id: "interior", label: { zh: "室内 · 空间", en: "Interior" } },
  { id: "nature", label: { zh: "自然 · 植物", en: "Nature" } },
  { id: "object", label: { zh: "物件 · 特写", en: "Objects" } },
  { id: "academic", label: { zh: "学术 · 论文 Demo", en: "Academic" } },
  { id: "interactive", label: { zh: "互动 · 查看器", en: "Interactive" } },
];

export const featuredCategoriesById: Record<FeaturedCategoryId, FeaturedCategory> =
  Object.fromEntries(featuredCategories.map((c) => [c.id, c])) as Record<
    FeaturedCategoryId,
    FeaturedCategory
  >;

export type FeaturedAuthor = {
  /** 署名（可能是个人昵称或团队名） */
  name: string;
  /** 作者主页 / 团队主页，若有 */
  href?: string;
};

export type FeaturedSplat = {
  slug: string;
  title: { zh: string; en: string };
  description: { zh: string; en: string };
  /** 面向访客的原页面链接（点击后在新标签打开） */
  sourceUrl: string;
  /** iframe src（SuperSplat 会归一化到 /s?id=）*/
  embedUrl: string;
  /** 静态场景图，用于卡片、首屏加载前海报与 iframe 加载骨架 */
  thumbnailUrl?: string;
  platform: EmbedPlatform;
  category: FeaturedCategoryId;
  /** 文档中明确提到 / URL 可推断的作者或团队 */
  author?: FeaturedAuthor;
  /** 是否作为首屏推荐 */
  featured?: boolean;
  /** 单条作品的合规/署名备注 */
  note?: { zh: string; en: string };
};

type SupersplatInput = Omit<FeaturedSplat, "sourceUrl" | "embedUrl" | "platform"> & {
  splatId: string;
};

const SUPERSPLAT_META: Record<
  string,
  { author: FeaturedAuthor; thumbnailUrl: string }
> = {
  "34eb266d": {
    author: { name: "azadbal", href: "https://superspl.at/user?id=azadbal" },
    thumbnailUrl: "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/splat/34eb266d/v1/xl.webp",
  },
  cc32763e: {
    author: { name: "azadbal", href: "https://superspl.at/user?id=azadbal" },
    thumbnailUrl: "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/splat/cc32763e/v1/xl.webp",
  },
  e721ea7c: {
    author: { name: "alexisfranorge", href: "https://superspl.at/user?id=alexisfranorge" },
    thumbnailUrl: "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/splat/e721ea7c/v1/xl.webp",
  },
  "065542ce": {
    author: { name: "azadbal", href: "https://superspl.at/user?id=azadbal" },
    thumbnailUrl: "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/splat/065542ce/v1/xl.webp",
  },
  "7d4842d4": {
    author: { name: "megascapes", href: "https://superspl.at/user?id=megascapes" },
    thumbnailUrl: "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/splat/7d4842d4/v1/xl.webp",
  },
  "581da95b": {
    author: { name: "jeromebg", href: "https://superspl.at/user?id=jeromebg" },
    thumbnailUrl: "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/splat/581da95b/v1/xl.webp",
  },
  "02d69af1": {
    author: { name: "mr3dgs", href: "https://superspl.at/user?id=mr3dgs" },
    thumbnailUrl: "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/splat/02d69af1/v1/xl.webp",
  },
  dcffecfa: {
    author: { name: "megascapes", href: "https://superspl.at/user?id=megascapes" },
    thumbnailUrl: "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/splat/dcffecfa/v1/xl.webp",
  },
  "1a14e1e7": {
    author: { name: "tosolini", href: "https://superspl.at/user?id=tosolini" },
    thumbnailUrl: "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/splat/1a14e1e7/v1/xl.webp",
  },
  "451f400a": {
    author: { name: "gregorya24", href: "https://superspl.at/user?id=gregorya24" },
    thumbnailUrl: "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/splat/451f400a/v1/xl.webp",
  },
  "761588f3": {
    author: { name: "studioduckbill", href: "https://superspl.at/user?id=studioduckbill" },
    thumbnailUrl: "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/splat/761588f3/v1/xl.webp",
  },
  "598e7122": {
    author: { name: "sa3d", href: "https://superspl.at/user?id=sa3d" },
    thumbnailUrl: "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/splat/598e7122/v11/xl.webp",
  },
  e2b36b69: {
    author: { name: "simonbethke", href: "https://superspl.at/user?id=simonbethke" },
    thumbnailUrl: "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/splat/e2b36b69/v1/xl.webp",
  },
  cc026f6a: {
    author: { name: "tmate", href: "https://superspl.at/user?id=tmate" },
    thumbnailUrl: "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/splat/cc026f6a/v1/xl.webp",
  },
  "45877bc9": {
    author: { name: "tosolini", href: "https://superspl.at/user?id=tosolini" },
    thumbnailUrl: "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/splat/45877bc9/v1/xl.webp",
  },
  "65ff2330": {
    author: { name: "macroscans", href: "https://superspl.at/user?id=macroscans" },
    thumbnailUrl: "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/splat/65ff2330/v1/xl.webp",
  },
  "462f292c": {
    author: { name: "macroscans", href: "https://superspl.at/user?id=macroscans" },
    thumbnailUrl: "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/splat/462f292c/v1/xl.webp",
  },
  f899388c: {
    author: { name: "lescan3d", href: "https://superspl.at/user?id=lescan3d" },
    thumbnailUrl: "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/splat/f899388c/v1/xl.webp",
  },
  f592397a: {
    author: { name: "simonbethke", href: "https://superspl.at/user?id=simonbethke" },
    thumbnailUrl: "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/splat/f592397a/v1/xl.webp",
  },
  "2df181fa": {
    author: { name: "scan-studio-iris", href: "https://superspl.at/user?id=scan-studio-iris" },
    thumbnailUrl: "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/splat/2df181fa/v1/xl.webp",
  },
  aba8c704: {
    author: { name: "tosolini", href: "https://superspl.at/user?id=tosolini" },
    thumbnailUrl: "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/splat/aba8c704/v1/xl.webp",
  },
  "208e077f": {
    author: { name: "neilggs", href: "https://superspl.at/user?id=neilggs" },
    thumbnailUrl: "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/splat/208e077f/v1/xl.webp",
  },
  "14bf9022": {
    author: { name: "scan-studio-iris", href: "https://superspl.at/user?id=scan-studio-iris" },
    thumbnailUrl: "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/splat/14bf9022/v1/xl.webp",
  },
  "7d3ee360": {
    author: { name: "scan-studio-iris", href: "https://superspl.at/user?id=scan-studio-iris" },
    thumbnailUrl: "https://s3-eu-west-1.amazonaws.com/images.playcanvas.com/splat/7d3ee360/v1/xl.webp",
  },
};

function supersplat(input: SupersplatInput): FeaturedSplat {
  const url = `https://superspl.at/scene/${input.splatId}`;
  const meta = SUPERSPLAT_META[input.splatId];
  return {
    slug: input.slug,
    title: input.title,
    description: input.description,
    sourceUrl: toSplatSceneUrl(url),
    embedUrl: toSplatEmbedSrc(url),
    thumbnailUrl: input.thumbnailUrl ?? meta?.thumbnailUrl,
    platform: "supersplat",
    category: input.category,
    author: input.author ?? meta?.author ?? { name: "SuperSplat community" },
    featured: input.featured,
    note: input.note,
  };
}

type ExternalInput = Omit<FeaturedSplat, "sourceUrl" | "embedUrl" | "platform"> & {
  url: string;
};

function external(input: ExternalInput): FeaturedSplat {
  return {
    slug: input.slug,
    title: input.title,
    description: input.description,
    sourceUrl: input.url,
    embedUrl: input.url,
    thumbnailUrl: input.thumbnailUrl,
    platform: detectEmbedPlatform(input.url),
    category: input.category,
    author: input.author,
    featured: input.featured,
    note: input.note,
  };
}

const ATTRIBUTION_NOTE_SUPERSPLAT = {
  zh: "画面由 SuperSplat 官方 viewer 实时渲染；作者署名与许可证请以原页面为准。",
  en: "Rendered by the official SuperSplat viewer; original authorship and license live on the source page.",
};

const ATTRIBUTION_NOTE_GITHUB = {
  zh: "嵌入自研究团队 / 作者公开的 demo 页；研究数据与代码许可证以原仓库为准。",
  en: "Embedded from the team / author's public demo page; dataset and code license follow the original repo.",
};

export const featuredSplats: FeaturedSplat[] = [
  // —— 一 · 建筑 · 古迹 ——
  supersplat({
    slug: "church-of-the-holy-apostles",
    splatId: "34eb266d",
    title: { zh: "圣使徒教堂", en: "Church of the Holy Apostles" },
    description: {
      zh: "一座古老拜占庭教堂的外观与拱门空间高斯泼溅记录，能够清楚看到石材质感与浮雕细节。",
      en: "A Byzantine-era church captured in Gaussian Splatting — masonry textures and relief details remain legible as you orbit.",
    },
    category: "architecture",
    featured: true,
    note: ATTRIBUTION_NOTE_SUPERSPLAT,
  }),
  supersplat({
    slug: "monastery-hripsimian-virgins",
    splatId: "cc32763e",
    title: {
      zh: "赫里普西玛修女修道院",
      en: "Monastery of the Hripsimian Virgins",
    },
    description: {
      zh: "亚美尼亚古教堂建筑群的完整空间扫描，从立面到钟塔都可以在浏览器里旋转查看。",
      en: "An Armenian medieval monastery scanned as a single splat scene — walk from the façade to the bell tower in-browser.",
    },
    category: "architecture",
    note: ATTRIBUTION_NOTE_SUPERSPLAT,
  }),
  supersplat({
    slug: "maihaugen-norwegian-house",
    splatId: "e721ea7c",
    title: {
      zh: "Maihaugen 挪威历史民居",
      en: "Maihaugen Historic Norwegian House",
    },
    description: {
      zh: "挪威 Maihaugen 露天博物馆里的一栋历史民居，木质结构和积雪景深层次分明。",
      en: "A historic wooden house from Norway's Maihaugen open-air museum — timber joinery and snowy depth layers read beautifully.",
    },
    category: "architecture",
    note: ATTRIBUTION_NOTE_SUPERSPLAT,
  }),
  supersplat({
    slug: "rumkale-fortress",
    splatId: "065542ce",
    title: { zh: "鲁姆卡莱古堡", en: "Rumkale Fortress" },
    description: {
      zh: "土耳其南部鲁姆卡莱要塞残垣，悬崖与砖砌结构的体积感被高斯点较完整地保留下来。",
      en: "The cliffside ruins of Turkey's Rumkale Fortress — volumetric masonry and terrain read well even from oblique angles.",
    },
    category: "architecture",
    note: ATTRIBUTION_NOTE_SUPERSPLAT,
  }),
  supersplat({
    slug: "london-st-pauls-cathedral",
    splatId: "7d4842d4",
    title: {
      zh: "伦敦圣保罗大教堂 · 外立面",
      en: "London St Paul's Cathedral, Exterior",
    },
    description: {
      zh: "圣保罗大教堂外立面与穹顶的高斯泼溅空间记录，石柱纹理和铜绿屋顶的氧化层都清晰可见。",
      en: "The façade and dome of St Paul's Cathedral — columnar stonework and oxidised copper roofing come through clearly in splat form.",
    },
    category: "architecture",
    note: ATTRIBUTION_NOTE_SUPERSPLAT,
  }),
  supersplat({
    slug: "eglise-de-la-trinite",
    splatId: "581da95b",
    title: { zh: "三一堂", en: "Église de la Trinité" },
    description: {
      zh: "法国三一堂的完整建筑高斯泼溅，玫瑰窗与双钟楼在 360° 转动中层次鲜明。",
      en: "Full-envelope splat of Paris' Église de la Trinité — rose window and twin bell towers hold up under 360° orbit.",
    },
    category: "architecture",
    note: ATTRIBUTION_NOTE_SUPERSPLAT,
  }),

  // —— 二 · 室内 · 空间 ——
  supersplat({
    slug: "hilton-presidential-suite",
    splatId: "02d69af1",
    title: {
      zh: "希尔顿总统套房",
      en: "Presidential Suite, Hilton Hotel",
    },
    description: {
      zh: "奢华酒店总统套房的室内空间高斯扫描，软装布置、灯光氛围与落地窗视野都可浏览。",
      en: "Interior scan of a Hilton presidential suite — soft furnishings, ambient lighting, and window views all preserved.",
    },
    category: "interior",
    note: ATTRIBUTION_NOTE_SUPERSPLAT,
  }),
  supersplat({
    slug: "royal-york-hotel-lobby",
    splatId: "dcffecfa",
    title: { zh: "皇家约克酒店大堂", en: "Royal York Hotel Lobby" },
    description: {
      zh: "多伦多皇家约克酒店大堂，天花雕花与水晶吊灯在高斯点云里保留得相当完整。",
      en: "Lobby of Toronto's Royal York — coffered ceilings and chandeliers hold up remarkably well as splats.",
    },
    category: "interior",
    note: ATTRIBUTION_NOTE_SUPERSPLAT,
  }),
  supersplat({
    slug: "tugboat-bat-engine-room",
    splatId: "1a14e1e7",
    title: { zh: "拖船引擎室", en: "Tugboat, Bat Engine Room" },
    description: {
      zh: "工业拖船引擎舱的高斯空间记录，金属管路、阀门与机舱灯光的方向感都很明确。",
      en: "Inside the engine room of a working tugboat — pipes, valves, and directional engine-room lighting all retained.",
    },
    category: "interior",
    note: ATTRIBUTION_NOTE_SUPERSPLAT,
  }),
  supersplat({
    slug: "studio-lit-capture",
    splatId: "451f400a",
    title: { zh: "棚拍 · 布光样片", en: "Studio-Lit Capture" },
    description: {
      zh: "摄影棚标准布光下的物体拍摄样片，用来测试高斯点云在受控光场下的还原度。",
      en: "A studio-lit reference capture designed to test splat fidelity under controlled photographic lighting.",
    },
    category: "interior",
    note: ATTRIBUTION_NOTE_SUPERSPLAT,
  }),

  // —— 三 · 自然 · 植物 ——
  supersplat({
    slug: "night-cherry-blossoms",
    splatId: "761588f3",
    title: { zh: "夜樱", en: "Night Cherry Blossoms" },
    description: {
      zh: "夜色下盛开的樱花树，高斯点云把花瓣的透光感和月色中的冷调处理得比较好。",
      en: "A cherry tree at night — petal translucency and cool moonlit tonal mapping translate well into splat form.",
    },
    category: "nature",
    note: ATTRIBUTION_NOTE_SUPERSPLAT,
  }),
  supersplat({
    slug: "nessundet-bru-norway",
    splatId: "598e7122",
    title: { zh: "NESSUNDET 大桥 · 挪威", en: "NESSUNDET BRU — Norway" },
    description: {
      zh: "挪威某跨海大桥的空间扫描，远景山体和近景钢结构在一个场景里同时呈现。",
      en: "A Norwegian sea-crossing bridge — distant mountains and nearby steel trusses coexist in the same splat.",
    },
    category: "nature",
    note: ATTRIBUTION_NOTE_SUPERSPLAT,
  }),
  supersplat({
    slug: "botanical-garden-america-v2",
    splatId: "e2b36b69",
    title: { zh: "美式植物园 · v2", en: "Botanical Garden · America v2" },
    description: {
      zh: "某美式植物园室外区段的高斯泼溅，植物层层叠叠的绿色厚度感相当立体。",
      en: "A splat capture of a US botanical garden — layered foliage reads with convincing volumetric depth.",
    },
    category: "nature",
    note: ATTRIBUTION_NOTE_SUPERSPLAT,
  }),

  // —— 四 · 物件 · 特写 ——
  supersplat({
    slug: "iss-synthetic",
    splatId: "cc026f6a",
    title: {
      zh: "国际空间站 · 合成版",
      en: "International Space Station (Synthetic)",
    },
    description: {
      zh: "基于 NASA 公开模型合成的 ISS 高斯泼溅，页面含 NASA 素材署名与 CC 条款。",
      en: "A synthetic ISS splat derived from NASA assets — the source page retains NASA attribution and Creative Commons terms.",
    },
    category: "object",
    note: {
      zh: "ISS 模型来自 NASA 公开素材，请保留原页面署名与链接。",
      en: "ISS model originates from NASA assets; keep original attribution and link.",
    },
  }),
  supersplat({
    slug: "oceanteam-tugboats",
    splatId: "45877bc9",
    title: { zh: "OceanTeam 拖船", en: "OceanTeam Tugboats" },
    description: {
      zh: "停靠的 OceanTeam 拖船群，一次拍完两艘船的姿态，外观漆色与吃水线都有记录。",
      en: "A pair of OceanTeam tugboats captured in one sweep — paintwork, waterlines, and rigging all intact.",
    },
    category: "object",
    note: ATTRIBUTION_NOTE_SUPERSPLAT,
  }),
  supersplat({
    slug: "macroscan-bumblebee",
    splatId: "65ff2330",
    title: {
      zh: "宏观扫描 · 褐带熊蜂",
      en: "Macroscan — Brown-banded Carder Bumblebee",
    },
    description: {
      zh: "褐带熊蜂的宏观高斯扫描，绒毛与翅膀透光的细节展现高斯点云的近距离表达力。",
      en: "A macro splat of a brown-banded carder bumblebee — fuzz and wing translucency showcase splat fidelity up close.",
    },
    category: "object",
    note: ATTRIBUTION_NOTE_SUPERSPLAT,
  }),
  supersplat({
    slug: "mining-bee-macroscan",
    splatId: "462f292c",
    title: { zh: "矿工蜂 · 宏观扫描", en: "Mining Bee Macroscan" },
    description: {
      zh: "矿工蜂的宏观高斯特写，和褐带熊蜂一组，用于对比不同甲壳质感的差异。",
      en: "A matching macro splat of a mining bee — chitinous texture and compound-eye structure readable in detail.",
    },
    category: "object",
    note: ATTRIBUTION_NOTE_SUPERSPLAT,
  }),
  supersplat({
    slug: "the-resurrected-and-the-devil",
    splatId: "f899388c",
    title: {
      zh: "复活者与魔鬼（雕塑）",
      en: "The Resurrected and the Devil (Sculpture)",
    },
    description: {
      zh: "基于石雕作品的高斯泼溅，衣纹与动势在旋转时保持得不错。",
      en: "A splat of a stone-carved sculptural piece — drapery and motion hold up well during orbit.",
    },
    category: "object",
    note: ATTRIBUTION_NOTE_SUPERSPLAT,
  }),
  supersplat({
    slug: "vegetables-hq",
    splatId: "f592397a",
    title: { zh: "高清蔬菜", en: "Vegetables HQ" },
    description: {
      zh: "一组蔬菜静物的高分辨率高斯扫描，颜色分层和表面凹凸都还原得相当干净。",
      en: "A high-resolution splat of vegetable still life — colour layering and surface bump hold up cleanly.",
    },
    category: "object",
    note: ATTRIBUTION_NOTE_SUPERSPLAT,
  }),
  supersplat({
    slug: "antique-vase",
    splatId: "2df181fa",
    title: { zh: "古董花瓶", en: "Antique Vase" },
    description: {
      zh: "一件古董花瓶的四周扫描，釉面反光与纹样在高斯泼溅中呈现得比较稳定。",
      en: "A full orbit of an antique vase — glaze reflections and ornament patterns stay stable across viewpoints.",
    },
    category: "object",
    note: ATTRIBUTION_NOTE_SUPERSPLAT,
  }),
  supersplat({
    slug: "boeing-model-40b",
    splatId: "aba8c704",
    title: { zh: "波音 40B 整机", en: "Boeing Model 40B (Assembled)" },
    description: {
      zh: "博物馆整机陈列的波音 40B 高斯扫描，页面标注 CC BY 4.0 下载条款。",
      en: "A complete museum display of a Boeing Model 40B — the source page notes CC BY 4.0 download terms.",
    },
    category: "object",
    note: {
      zh: "原页面标注 CC BY 4.0，商用请核对博物馆与原作者条款是否冲突。",
      en: "Source page lists CC BY 4.0; commercial use still requires checking against the museum's own terms.",
    },
  }),
  supersplat({
    slug: "kumba-busch-gardens",
    splatId: "208e077f",
    title: { zh: "Kumba · 布希公园过山车", en: "Kumba — Busch Gardens Tampa" },
    description: {
      zh: "坦帕布希花园内 Kumba 过山车的高斯泼溅，钢结构在逆光下呈现得很有雕塑感。",
      en: "A splat of the Kumba coaster at Busch Gardens Tampa — the steel frame reads sculpturally against the Florida sky.",
    },
    category: "object",
    note: {
      zh: "含园区品牌露出。商业推广使用请额外审查。",
      en: "Contains theme-park branding; additional review needed before commercial use.",
    },
  }),

  // —— 五 · 学术 · 论文 Demo ——
  supersplat({
    slug: "gaussian-splatting-samples-bicycles",
    splatId: "14bf9022",
    title: {
      zh: "3DGS 示例 · 自行车场景",
      en: "Gaussian Splatting Samples — Bicycles",
    },
    description: {
      zh: "3DGS 论文作者公开的 Mip-NeRF 360 风格样本之一，自行车场景，常被用作实现验证。",
      en: "One of the canonical 3DGS sample scenes (Mip-NeRF 360 style) — widely used as a benchmark for new implementations.",
    },
    category: "academic",
    note: ATTRIBUTION_NOTE_SUPERSPLAT,
  }),
  supersplat({
    slug: "gaussian-splatting-samples-12m",
    splatId: "7d3ee360",
    title: { zh: "3DGS 示例 · 1.2M 点", en: "Gaussian Splatting Samples · 1.2M" },
    description: {
      zh: "容量 1.2M 量级的高斯泼溅样本，用于对比不同点数下的渲染表现。",
      en: "A 1.2M-Gaussian sample scene used to compare render quality across splat budgets.",
    },
    category: "academic",
    note: ATTRIBUTION_NOTE_SUPERSPLAT,
  }),
  external({
    slug: "mip-splatting-demo",
    url: "https://niujinshuchong.github.io/mip-splatting-demo/",
    thumbnailUrl: "/gallery-thumbnails/mip-splatting-demo.png",
    title: { zh: "Mip-Splatting 在线 Demo", en: "Mip-Splatting Demo" },
    description: {
      zh: "CVPR 2024 Mip-Splatting 的官方交互 demo，演示抗锯齿在不同缩放级别的表现。",
      en: "Official interactive demo for Mip-Splatting (CVPR 2024) — shows anti-aliasing across zoom levels.",
    },
    category: "academic",
    author: { name: "Zehao Yu et al.", href: "https://niujinshuchong.github.io/mip-splatting/" },
    note: ATTRIBUTION_NOTE_GITHUB,
  }),
  external({
    slug: "flod-3dgs-demo",
    url: "https://3dgs-flod.github.io/flod-3dgs-demo/",
    thumbnailUrl: "/gallery-thumbnails/flod-3dgs-demo.png",
    title: { zh: "FLoD-3DGS 在线 Demo", en: "FLoD-3DGS Demo" },
    description: {
      zh: "FLoD-3DGS 项目官方 demo，演示按需细节层次的动态渲染策略。",
      en: "Official FLoD-3DGS demo — showcases on-demand level-of-detail streaming for splats.",
    },
    category: "academic",
    author: { name: "FLoD-3DGS Team", href: "https://3dgs-flod.github.io/" },
    note: ATTRIBUTION_NOTE_GITHUB,
  }),
  external({
    slug: "splatam-s1-demo",
    url: "https://spla-tam.github.io/s1-demo/",
    thumbnailUrl: "/gallery-thumbnails/splatam-s1-demo.png",
    title: { zh: "SplaTAM Demo · S1", en: "SplaTAM · S1 Demo" },
    description: {
      zh: "SplaTAM 官方首段 SLAM demo，基于高斯泼溅做稠密 SLAM 建图。",
      en: "The first SplaTAM SLAM demo — dense SLAM mapping built on top of Gaussian Splatting.",
    },
    category: "academic",
    author: { name: "SplaTAM Team", href: "https://spla-tam.github.io/" },
    note: ATTRIBUTION_NOTE_GITHUB,
  }),
  external({
    slug: "splatam-s2-demo",
    url: "https://spla-tam.github.io/s2-demo/",
    thumbnailUrl: "/gallery-thumbnails/splatam-s2-demo.png",
    title: { zh: "SplaTAM Demo · S2", en: "SplaTAM · S2 Demo" },
    description: {
      zh: "SplaTAM 的第二段 demo，对比不同输入条件下 SLAM 效果的演变。",
      en: "The second SplaTAM demo — compares SLAM quality under varying input conditions.",
    },
    category: "academic",
    author: { name: "SplaTAM Team", href: "https://spla-tam.github.io/" },
    note: ATTRIBUTION_NOTE_GITHUB,
  }),
  external({
    slug: "webgpu-gaussian-viewer-epfl",
    url: "https://jatentaki.github.io/assets/gaussianviewer/index.html",
    thumbnailUrl: "/gallery-thumbnails/webgpu-gaussian-viewer-epfl.png",
    title: { zh: "WebGPU 高斯查看器 · EPFL", en: "WebGPU Gaussian Viewer (EPFL)" },
    description: {
      zh: "EPFL 研究者公开的 WebGPU 高斯泼溅查看器，能够直接运行在支持 WebGPU 的浏览器里。",
      en: "A WebGPU-based splat viewer shared by an EPFL researcher — runs natively in WebGPU-capable browsers.",
    },
    category: "academic",
    author: { name: "jatentaki (EPFL)", href: "https://jatentaki.github.io/" },
    note: ATTRIBUTION_NOTE_GITHUB,
  }),

  // —— 六 · 互动 · 查看器 ——
  external({
    slug: "antimatter15-splat-viewer",
    url: "https://antimatter15.com/splat/",
    thumbnailUrl: "/gallery-thumbnails/antimatter15-splat-viewer.png",
    title: { zh: "antimatter15 查看器", en: "antimatter15 Splat Viewer" },
    description: {
      zh: "antimatter15 编写的开源高斯泼溅查看器，最早被社区广泛使用的 Web 实现之一。",
      en: "antimatter15's open-source splat viewer — one of the earliest widely used Web implementations.",
    },
    category: "interactive",
    author: { name: "antimatter15", href: "https://antimatter15.com/" },
    note: ATTRIBUTION_NOTE_GITHUB,
  }),
  external({
    slug: "kwaldow-gsplats-examples",
    url: "https://kwaldow.github.io/gsplats/index.html",
    thumbnailUrl: "/gallery-thumbnails/kwaldow-gsplats-examples.png",
    title: { zh: "kwaldow 高斯泼溅示例集", en: "kwaldow gsplats Examples" },
    description: {
      zh: "kwaldow 的高斯泼溅实验页面，把多个场景示例放在一起方便快速比对。",
      en: "kwaldow's gathered gallery of splat experiments — multiple scenes in one page for quick comparison.",
    },
    category: "interactive",
    author: { name: "kwaldow", href: "https://kwaldow.github.io/" },
    note: ATTRIBUTION_NOTE_GITHUB,
  }),
  external({
    slug: "aframe-gaussian-splatting",
    url: "https://quadjr.github.io/aframe-gaussian-splatting/",
    thumbnailUrl: "/gallery-thumbnails/aframe-gaussian-splatting.png",
    title: { zh: "A-Frame 高斯泼溅组件", en: "A-Frame Gaussian Splatting" },
    description: {
      zh: "把高斯泼溅接入 A-Frame 的开源组件 demo，便于在 WebXR 页面里直接复用。",
      en: "A demo for the A-Frame Gaussian Splatting component — plug splats directly into WebXR pages.",
    },
    category: "interactive",
    author: { name: "quadjr", href: "https://github.com/quadjr/aframe-gaussian-splatting" },
    note: ATTRIBUTION_NOTE_GITHUB,
  }),
  external({
    slug: "playcanvas-splat-mini-game",
    url: "https://playcanv.as/p/qxGSuzYq/",
    thumbnailUrl: "https://playcanv.as/apps/b466da14/thumbs/360.jpg",
    title: { zh: "PlayCanvas 泼溅小游戏", en: "PlayCanvas Splat Mini-Game" },
    description: {
      zh: "PlayCanvas 官方示例：把高斯泼溅场景做成可以操作的第一人称小游戏。",
      en: "PlayCanvas' official example — a splat scene wrapped into a first-person mini-game.",
    },
    category: "interactive",
    author: { name: "PlayCanvas", href: "https://playcanvas.com/" },
  }),
  external({
    slug: "playcanvas-model-viewer",
    url: "https://playcanvas.com/viewer",
    thumbnailUrl: "/gallery-thumbnails/playcanvas-model-viewer.svg",
    title: { zh: "PlayCanvas 模型查看器", en: "PlayCanvas Model Viewer" },
    description: {
      zh: "PlayCanvas 官方 3D 模型查看器，也支持加载 .ply / .splat 格式的高斯泼溅模型。",
      en: "PlayCanvas' official model viewer — also handles .ply / .splat Gaussian files out of the box.",
    },
    category: "interactive",
    author: { name: "PlayCanvas", href: "https://playcanvas.com/" },
  }),
];

export const featuredSplatsBySlug: Record<string, FeaturedSplat> = Object.fromEntries(
  featuredSplats.map((w) => [w.slug, w]),
);

export const featuredSplatsHero =
  featuredSplats.find((w) => w.featured) ?? featuredSplats[0];

export function featuredSplatsByCategory(): Array<{
  category: FeaturedCategory;
  items: FeaturedSplat[];
}> {
  return featuredCategories
    .map((category) => ({
      category,
      items: featuredSplats.filter((w) => w.category === category.id),
    }))
    .filter((group) => group.items.length > 0);
}
