/**
 * 一次性脚本：将 TASK-11 Batch I 的 Radiance Fields 第五批 NewsItem 拼入 src/lib/data/news.ts
 * 用法：node knowledge-base/sources/news/_audit/assemble-news-batch5.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "../../../..");
const newsPath = path.join(root, "src", "lib", "data", "news.ts");

const batch = `  {
    id: "industry-octanerender-2026-roadmap",
    title: {
      zh: "OctaneRender 2026 正式版发布并公布 2027 路线图",
      en: "OctaneRender 2026 Released and 2027 Roadmap Announced",
    },
    summary: {
      zh: "Radiance Fields 报道称 OctaneRender 2026 将高斯泼溅纳入商业路径追踪管线，支持 PLY 与 SPZ 输入，并在 2027 路线图中规划传统 CG 场景导出为高斯与 4D 神经对象。",
      en: "Radiance Fields reports that OctaneRender 2026 brings Gaussian splats into a commercial path-tracing pipeline, with PLY/SPZ ingest and a 2027 roadmap for exporting CG scenes into splats and 4D neural objects.",
    },
    category: "industry",
    tags: ["viewing", "spatial_media"],
    level: "expert",
    source: { name: "Radiance Fields", type: "media" },
    sourceUrl: "https://radiancefields.com/octanerender-2026-released-and-2027-roadmap-announced",
    coverUrl: null,
    publishedAt: "2025-11-28",
    editorialNote: {
      zh: "这条更适合追踪离线渲染管线如何接纳高斯资产，而不是只看单一 Alpha 功能点。",
      en: "Read this as a signal for offline rendering pipelines adopting splat assets, not just as a single alpha-feature update.",
    },
    verified: true,
    sources: [
      "https://radiancefields.com/octanerender-2026-released-and-2027-roadmap-announced",
      "https://home.otoy.com/render/octane-render/news/octane2026/",
    ],
  },
  {
    id: "industry-octanerender-2026-1-alpha-nrc",
    title: {
      zh: "OctaneRender 2026.1 Alpha 引入高斯泼溅与 NRC 缓存",
      en: "OctaneRender 2026.1 Alpha Adds Gaussian Splatting and Neural Radiance Caching",
    },
    summary: {
      zh: "Alpha 版本把高斯泼溅与 Neural Radiance Caching 放入 Octane 测试线，Radiance Fields 记录了 PLY 支持、球谐视角相关效果、路径追踪集成与渲染层限制等早期边界。",
      en: "The alpha build put Gaussian Splatting and Neural Radiance Caching into Octane's test line, with Radiance Fields documenting PLY support, spherical-harmonic view effects, path-traced integration, and early render-layer limits.",
    },
    category: "industry",
    tags: ["viewing", "optimization"],
    level: "expert",
    source: { name: "Radiance Fields", type: "media" },
    sourceUrl: "https://radiancefields.com/otoy-octanerender-2026-1-alpha-features-gaussian-splatting",
    coverUrl: null,
    publishedAt: "2025-01-15",
    editorialNote: {
      zh: "与正式版新闻合看，可以看到 Octane 从实验支持到生产路线图的演进节奏。",
      en: "Pair it with the final-release item to see the progression from experimental support to a production roadmap.",
    },
    verified: true,
    sources: [
      "https://radiancefields.com/otoy-octanerender-2026-1-alpha-features-gaussian-splatting",
      "https://render.otoy.com/forum/viewtopic.php?t=84311",
      "https://docs.otoy.com/standaloneSE/GaussianSplat.html",
    ],
  },
  {
    id: "tool-colmap-3-12-sensor-rig",
    title: {
      zh: "COLMAP 3.12 发布：原生支持多相机 sensor rig",
      en: "COLMAP 3.12 Released with Native Sensor-rig Support",
    },
    summary: {
      zh: "COLMAP 3.12 更新了 SfM 管线，重点加入多相机 rig 描述、经纬度与 UTM 转换、姿态求解器改进和若干 CUDA 与 GUI 修复，对全景、无人机和多机阵列采集更友好。",
      en: "COLMAP 3.12 updates the SfM pipeline with native multi-camera rig descriptions, latitude/longitude to UTM conversion, pose-solver improvements, and CUDA/GUI fixes for panoramas, drones, and multi-camera arrays.",
    },
    category: "tool",
    tags: ["capture", "reconstruction"],
    level: "intermediate",
    source: { name: "Radiance Fields", type: "media" },
    sourceUrl: "https://radiancefields.com/colmap-3-12-released",
    coverUrl: null,
    publishedAt: "2025-06-30",
    editorialNote: {
      zh: "多相机和 GPS 场景的相机位姿稳定性会直接影响后续高斯训练质量，升级前应核对下游解析脚本。",
      en: "Pose stability for multi-camera and GPS captures directly affects downstream splat training, so check parsers before upgrading.",
    },
    verified: true,
    sources: [
      "https://radiancefields.com/colmap-3-12-released",
      "https://colmap.github.io/changelog.html",
    ],
  },
  {
    id: "tool-lichtfeld-studio-v0-4",
    title: {
      zh: "LichtFeld Studio v0.4 发布：深度感知训练与 i18n",
      en: "LichtFeld Studio v0.4 Adds Depth-aware Training and i18n",
    },
    summary: {
      zh: "v0.4 为本地高斯训练工具加入深度感知训练、配置导入导出、镜像与裁剪编辑改进、多语言本地化、Unicode 路径修复以及 CUDA 与显存优化。",
      en: "Version 0.4 adds depth-aware training, import/export for training configs, mirror and crop editing improvements, localization, Unicode path fixes, and CUDA/VRAM tuning for local splat workflows.",
    },
    category: "tool",
    tags: ["training", "editing"],
    level: "intermediate",
    source: { name: "Radiance Fields", type: "media" },
    sourceUrl: "https://radiancefields.com/lichtfeld-studio-releases-v0.4",
    coverUrl: null,
    publishedAt: "2026-01-16",
    editorialNote: {
      zh: "深度先验和 Unicode 路径修复对中文素材目录与复杂室内数据集都更实用。",
      en: "Depth priors and Unicode path fixes are practical for Chinese asset folders and difficult indoor datasets.",
    },
    verified: true,
    sources: [
      "https://radiancefields.com/lichtfeld-studio-releases-v0.4",
      "https://github.com/MrNeRF/LichtFeld-Studio",
    ],
  },
  {
    id: "tool-gaussian-splatking-ios-launch",
    title: {
      zh: "Gaussian SplatKing 上架 iOS：免费高保真采集应用",
      en: "Gaussian SplatKing Launches Free High-fidelity iOS Capture App",
    },
    summary: {
      zh: "Radiance Fields 发布 Gaussian SplatKing，面向 iOS 提供视频、照片与 LiDAR 三种采集模式，支持手动曝光控制、双镜头同步采集、质量预测与文件夹式数据导出。",
      en: "Radiance Fields launched Gaussian SplatKing for iOS with video, photo, and LiDAR capture modes, manual exposure controls, dual-lens capture, quality predictors, and folder-based data export.",
    },
    category: "tool",
    tags: ["capture", "training"],
    level: "beginner",
    source: { name: "Radiance Fields", type: "media" },
    sourceUrl: "https://radiancefields.com/radiancefields.com-announces-gaussian-splatking-for-mobile-capture",
    coverUrl: null,
    publishedAt: "2026-03-13",
    editorialNote: {
      zh: "重点不在云端重建，而在把手机采集数据尽量开放给后续任意训练管线。",
      en: "The important shift is open capture data for any downstream training pipeline, not a cloud reconstruction service.",
    },
    verified: true,
    sources: [
      "https://radiancefields.com/radiancefields.com-announces-gaussian-splatking-for-mobile-capture",
      "https://radiancefields.com/splatking",
    ],
  },
  {
    id: "industry-arrival-space-v077-v079-updates",
    title: {
      zh: "Arrival Space 多版本迭代：碰撞、移动 UX 与 SPZ 加速",
      en: "Arrival Space Iterates: Collision, Mobile UX, and SPZ Speedup",
    },
    summary: {
      zh: "Arrival Space 在 0.77 至 0.79 多个版本中扩展了 Splat 空间碰撞、移动端操控、Dynamic Gates、多 GLB 导入、SPZ 渲染性能、Apple ID 登录和 Unicode 3D 文本。",
      en: "Arrival Space versions 0.77 through 0.79 expanded Splat-space collision, mobile controls, Dynamic Gates, multi-GLB import, faster SPZ rendering, Apple ID sign-in, and Unicode 3D text.",
    },
    category: "industry",
    tags: ["publishing", "web_rendering"],
    level: "beginner",
    source: { name: "Radiance Fields", type: "media" },
    sourceUrl: "https://radiancefields.com/arrival-space-receives-several-updates",
    coverUrl: null,
    publishedAt: "2025-04-28",
    editorialNote: {
      zh: "这类空间托管平台的价值逐渐从单纯展示转向可行走、可链接、可运营的网页空间。",
      en: "Hosted splat spaces are moving from pure display toward walkable, linkable, and operable web environments.",
    },
    verified: true,
    sources: [
      "https://radiancefields.com/arrival-space-receives-several-updates",
      "https://arrival.space/",
    ],
  },
  {
    id: "tool-realityscan-2-0-release",
    title: {
      zh: "Epic Games RealityScan 2.0 正式发布",
      en: "RealityScan 2.0 Officially Released by Epic",
    },
    summary: {
      zh: "RealityScan 2.0 将 RealityCapture 品牌并入 Epic 的 RealityScan 产品线，加入更高质量的特征检测、GPU 对齐、AI 遮罩、覆盖质量分析和空中 LiDAR 数据导入。",
      en: "RealityScan 2.0 folds the former RealityCapture line into Epic's RealityScan family with higher-quality feature detection, GPU alignment, AI masking, coverage-quality analysis, and aerial LiDAR ingest.",
    },
    category: "tool",
    tags: ["capture", "reconstruction"],
    level: "intermediate",
    source: { name: "Radiance Fields", type: "media" },
    sourceUrl: "https://radiancefields.com/realityscan-2-0-released",
    coverUrl: null,
    publishedAt: "2025-06-17",
    editorialNote: {
      zh: "对 3DGS 用户来说，重点是更稳定的相机对齐和遮罩流程能降低后续训练噪声。",
      en: "For 3DGS users, the key is that stronger alignment and masking can reduce noise before training.",
    },
    verified: true,
    sources: [
      "https://radiancefields.com/realityscan-2-0-released",
      "https://www.realityscan.com/",
      "https://www.unrealengine.com/en-US/realityscan",
    ],
  },
  {
    id: "tool-postshot-v0-4-raw-hdr",
    title: {
      zh: "Postshot v0.4 发布：RAW/HDR 与 16/32 位整数色彩支持",
      en: "Postshot v0.4 Adds RAW/HDR and Wide Color Support",
    },
    summary: {
      zh: "Postshot v0.4 增加 RAW、HDR、16 位与 32 位整数颜色、ACES 与 HLG/Rec.2020 等色彩空间，并将训练显存占用降低约 15%，同时补强 UI 与 RealityCapture CSV/PLY 支持。",
      en: "Postshot v0.4 adds RAW, HDR, 16-bit and 32-bit integer color, ACES and HLG/Rec.2020 color spaces, about 15% lower training VRAM use, UI fixes, and RealityCapture CSV/PLY support.",
    },
    category: "tool",
    tags: ["training", "optimization"],
    level: "intermediate",
    source: { name: "Radiance Fields", type: "media" },
    sourceUrl: "https://radiancefields.com/postshot-releases-v-04",
    coverUrl: null,
    publishedAt: "2024-08-23",
    editorialNote: {
      zh: "色彩管理和本地训练资源控制会影响高动态范围素材能否稳定进入重建流程。",
      en: "Color management and local resource controls affect whether HDR capture material can enter reconstruction reliably.",
    },
    verified: true,
    sources: [
      "https://radiancefields.com/postshot-releases-v-04",
      "https://www.jawset.com/postshot/",
    ],
  },
  {
    id: "industry-siggraph-2024-radiance-field-program",
    title: {
      zh: "SIGGRAPH 2024 节目单公布：4 个辐射场专场",
      en: "SIGGRAPH 2024 Program: Four Radiance-field Sessions",
    },
    summary: {
      zh: "SIGGRAPH 2024 目录将辐射场集中放入 Fast Radiance Fields、NeRFs and Lighting、Dynamic Radiance Fields 和 Radiance Field Processing 四组议题，覆盖 RTG-SLAM、2DGS、StopThePop、SMERF 与动态 4DGS 等方向。",
      en: "The SIGGRAPH 2024 catalog groups radiance-field work into Fast Radiance Fields, NeRFs and Lighting, Dynamic Radiance Fields, and Radiance Field Processing, covering RTG-SLAM, 2DGS, StopThePop, SMERF, and dynamic 4DGS.",
    },
    category: "industry",
    tags: ["paper", "dynamic"],
    level: "expert",
    source: { name: "Radiance Fields", type: "media" },
    sourceUrl: "https://radiancefields.com/siggraph-2024-program-announced",
    coverUrl: null,
    publishedAt: "2024-05-14",
    editorialNote: {
      zh: "这份目录适合当作 2024 年辐射场研究主题的横截面索引，而不是单篇论文新闻。",
      en: "Use the program as a cross-section of 2024 radiance-field themes rather than a single-paper announcement.",
    },
    verified: true,
    sources: [
      "https://radiancefields.com/siggraph-2024-program-announced",
      "https://s2024.siggraph.org/program/",
    ],
  },`;

const ids = [...batch.matchAll(/id: "([^"]+)"/g)].map((match) => match[1]);
if (new Set(ids).size !== ids.length) {
  console.error("assemble-news-batch5: duplicate id inside batch, abort");
  process.exit(1);
}

let src = fs.readFileSync(newsPath, "utf8");
const existingIds = new Set([...src.matchAll(/id: "([^"]+)"/g)].map((match) => match[1]));
const collisions = ids.filter((id) => existingIds.has(id));
if (collisions.length > 0) {
  console.error(`assemble-news-batch5: id already exists: ${collisions.join(", ")}`);
  process.exit(1);
}

const markerRe = /\r?\n\];\r?\n\r?\nconst sortedNews/;
const markerMatch = markerRe.exec(src);
if (!markerMatch || markerMatch.index === undefined) {
  console.error("assemble-news-batch5: marker not found, abort");
  process.exit(1);
}

const before = src.slice(0, markerMatch.index);
const after = src.slice(markerMatch.index);
const needsComma = !before.trimEnd().endsWith(",");
src = `${before}${needsComma ? "," : ""}\n${batch}${after}`;
fs.writeFileSync(newsPath, src, "utf8");
console.log(`assemble-news-batch5: patched ${newsPath} with ${ids.length} items`);
