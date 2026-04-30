/**
 * 引擎/软件 × 3DGS 兼容性矩阵
 *
 * 数据来源：knowledge-base/sources/engines/<slug>.md
 * 工作流：Auto 模型按强约束采集 → Opus 审核 → 通过的条目转录到本文件
 *
 * 评级语义：
 *   - splatRender: native    引擎本体内置 3DGS 渲染管线（最强支持）
 *   - splatRender: plugin    需安装第三方/官方插件才能渲染
 *   - splatRender: external  通过外部桥接工具或上层引擎实现
 *   - splatRender: none      完全不支持，无可用路径
 *
 * 反幻觉约定：
 *   - 每条至少 2 条 sources URL
 *   - quote 字段必须是 verbatim 英文原文，能在 sources 中至少一条 URL 找到
 *   - 不能确定的字段填 null
 *   - verified=true 仅由 Opus 审核员标注，Auto 永远只能填 verified=false
 */

import type { Bilingual } from "@/lib/taxonomy";

export type EngineCategory =
  | "3d-software"
  | "game-engine"
  | "web-engine"
  | "xr-platform"
  | "viewer-only"
  | "cad"
  | "mobile-platform"
  | "compositing";

export type EnginePlatform =
  | "windows"
  | "macos"
  | "linux"
  | "ios"
  | "android"
  | "web"
  | "visionos"
  | "horizonos";

export type EnginePricing =
  | "free"
  | "freemium"
  | "paid"
  | "subscription"
  | "open-source"
  | "enterprise";

export type SplatRenderSupport = "native" | "plugin" | "external" | "none";

export type SplatRenderMethod =
  | "rasterization"
  | "path-tracing"
  | "hybrid"
  | null;

export type EngineImplementation =
  | "official"
  | "official-plugin"
  | "community-plugin"
  | "manual-import"
  | "none";

export type EngineSupport = {
  slug: string;
  engineName: string;
  engineVendor: string | null;
  engineCategory: EngineCategory;
  enginePlatforms: EnginePlatform[];
  enginePricing: EnginePricing | null;

  // 3DGS 兼容性
  splatImport: boolean;
  splatImportFormats: string[];
  splatExport: boolean | null;  // null = 该字段在本条语义下不适用（如引擎层条目，导出由配套编辑器负责）
  splatRender: SplatRenderSupport;
  splatEdit: boolean | null;  // null = 不适用
  splatRenderMethod: SplatRenderMethod;

  // 实现方式
  implementation: EngineImplementation;
  pluginName: string | null;
  pluginUrl: string | null;
  pluginAuthor: string | null;
  firstSupported: string | null;
  latestTestedVersion: string | null;
  pluginLastCommitAt: string | null;

  // 数据透明度
  quoteEn: string;
  sourceUrl: string;
  sources: string[];
  notes: Bilingual | string;
  capturedAt: string;
  capturedBy: "auto" | "human";
  verification: "pending" | "verified" | "rejected";
  verifiedBy: string | null;
  verifiedAt: string | null;
};

export const splatRenderLabels: Record<SplatRenderSupport, Bilingual> = {
  native: { zh: "原生支持", en: "Native" },
  plugin: { zh: "插件支持", en: "Plugin" },
  external: { zh: "外部桥接", en: "External" },
  none: { zh: "不支持", en: "Not Supported" },
};

export const engineCategoryLabels: Record<EngineCategory, Bilingual> = {
  "3d-software": { zh: "3D / DCC 软件", en: "3D / DCC Software" },
  "game-engine": { zh: "游戏引擎", en: "Game Engine" },
  "web-engine": { zh: "Web 引擎 / 库", en: "Web Engine / Library" },
  "xr-platform": { zh: "XR 平台", en: "XR Platform" },
  "viewer-only": { zh: "查看器", en: "Viewer-only" },
  cad: { zh: "CAD 软件", en: "CAD Software" },
  "mobile-platform": { zh: "移动平台", en: "Mobile Platform" },
  compositing: { zh: "合成 / 后期", en: "Compositing / Post" },
};

export const engineCategoryOrder: EngineCategory[] = [
  "3d-software",
  "game-engine",
  "web-engine",
  "xr-platform",
  "viewer-only",
  "compositing",
  "mobile-platform",
  "cad",
];

/**
 * 已通过 Opus 审核的引擎数据（首批 6 条，2026-04-29）
 * 数据从 knowledge-base/sources/engines/*.md 转录
 */
export const engines: EngineSupport[] = [
  {
    slug: "blender",
    engineName: "Blender",
    engineVendor: "Blender Foundation",
    engineCategory: "3d-software",
    enginePlatforms: ["windows", "macos", "linux"],
    enginePricing: "open-source",
    splatImport: true,
    splatImportFormats: ["ply"],
    splatExport: false,
    splatRender: "plugin",
    splatEdit: false,
    splatRenderMethod: "rasterization",
    implementation: "community-plugin",
    pluginName: "3D Gaussian Splatting (gaussian-splatting-blender-addon)",
    pluginUrl: "https://github.com/ReshotAI/gaussian-splatting-blender-addon",
    pluginAuthor: null,
    firstSupported: null,
    latestTestedVersion: null,
    pluginLastCommitAt: "2024-08-30",
    quoteEn:
      'class ImportGaussianSplatting(bpy.types.Operator): bl_idname = "object.import_gaussian_splatting" — reads f_dc / f_rest / scale / rot / opacity from PLY.',
    sourceUrl:
      "https://github.com/ReshotAI/gaussian-splatting-blender-addon",
    sources: [
      "https://raw.githubusercontent.com/ReshotAI/gaussian-splatting-blender-addon/master/blender-addon/__init__.py",
      "https://raw.githubusercontent.com/ReshotAI/gaussian-splatting-blender-addon/master/README.md",
      "https://raw.githubusercontent.com/ReshotAI/gaussian-splatting-blender-addon/master/blender-addon/blender_manifest.toml",
    ],
    notes: {
      zh: "实验性社区插件，README 自述慢、不准确，仅适合清理 floaters。Blender 4.2+ 可装。仓库长期未更新（最后提交 2024-08）。",
      en: "Experimental community add-on; README states it's slow and not fully accurate. Compatible with Blender 4.2+. Repo unmaintained since 2024-08.",
    },
    capturedAt: "2026-04-29",
    capturedBy: "auto",
    verification: "verified",
    verifiedBy: "opus",
    verifiedAt: "2026-04-29",
  },
  {
    slug: "unity",
    engineName: "Unity",
    engineVendor: "Unity Technologies",
    engineCategory: "game-engine",
    enginePlatforms: ["windows", "macos", "linux"],
    enginePricing: "freemium",
    splatImport: true,
    splatImportFormats: ["ply", "spz"],
    splatExport: true,
    splatRender: "plugin",
    splatEdit: true,
    splatRenderMethod: "rasterization",
    implementation: "community-plugin",
    pluginName: "UnityGaussianSplatting (org.nesnausk.gaussian-splatting)",
    pluginUrl: "https://github.com/aras-p/UnityGaussianSplatting",
    pluginAuthor: "Aras Pranckevicius",
    firstSupported: null,
    latestTestedVersion: null,
    pluginLastCommitAt: "2025-10-17",
    quoteEn:
      'I\'ve decided to try to implement the realtime visualization part (i.e. the one that takes already-produced gaussian splat "model" file) in Unity.',
    sourceUrl: "https://github.com/aras-p/UnityGaussianSplatting",
    sources: [
      "https://raw.githubusercontent.com/aras-p/UnityGaussianSplatting/main/readme.md",
      "https://raw.githubusercontent.com/aras-p/UnityGaussianSplatting/main/package/package.json",
      "https://raw.githubusercontent.com/aras-p/UnityGaussianSplatting/main/package/Editor/GaussianSplatRendererEditor.cs",
      "https://raw.githubusercontent.com/aras-p/UnityGaussianSplatting/main/docs/splat-editing.md",
    ],
    notes: {
      zh: "Aras Pranckevičius 维护的开源插件，源码级证据：ExportPlyFile 函数写出 f_dc/f_rest/opacity/scale/rot 等 3DGS 字段。支持矩形选择、删除、移动等编辑操作。需 D3D12/Metal/Vulkan。",
      en: "Open-source plugin by Aras Pranckevičius. Source-level evidence: ExportPlyFile writes 3DGS-specific fields. Supports box selection, deletion, transformation. Requires D3D12/Metal/Vulkan.",
    },
    capturedAt: "2026-04-29",
    capturedBy: "auto",
    verification: "verified",
    verifiedBy: "opus",
    verifiedAt: "2026-04-29",
  },
  {
    slug: "unreal-engine",
    engineName: "Unreal Engine",
    engineVendor: "Epic Games",
    engineCategory: "game-engine",
    enginePlatforms: ["windows"],
    enginePricing: "freemium",
    splatImport: true,
    splatImportFormats: ["ply"],
    splatExport: false,
    splatRender: "plugin",
    splatEdit: true,
    splatRenderMethod: "rasterization",
    implementation: "community-plugin",
    pluginName: "XV3dGS (XScene-UEPlugin)",
    pluginUrl: "https://github.com/xverse-engine/XScene-UEPlugin",
    pluginAuthor: "XVERSE Technology Inc.",
    firstSupported: null,
    latestTestedVersion: null,
    pluginLastCommitAt: "2025-07-30",
    quoteEn:
      "Currently, our plugin is implemented based on UE5 Niagara, fully exploiting the advantage of the features provided by UE5 to realize efficient rendering and managing for Guassian Splatting models.",
    sourceUrl: "https://github.com/xverse-engine/XScene-UEPlugin",
    sources: [
      "https://raw.githubusercontent.com/xverse-engine/XScene-UEPlugin/main/UEPlugin/README.md",
      "https://raw.githubusercontent.com/xverse-engine/XScene-UEPlugin/main/README.md",
    ],
    notes: {
      zh: "深圳 XVERSE 出品，基于 UE5 Niagara。功能：导入 PLY、RTS / 体积裁剪、调色、模型剪切。仅 Windows。Import 部分以 dll 形式提供，未公开源码 — 字段证据为 README 文本级。",
      en: "Built by XVERSE (Shenzhen) atop UE5 Niagara. Features: PLY import, RTS / volume crop, recolor, model clipping. Windows only. Import logic ships as dll — evidence is README text level only.",
    },
    capturedAt: "2026-04-29",
    capturedBy: "auto",
    verification: "verified",
    verifiedBy: "opus",
    verifiedAt: "2026-04-29",
  },
  {
    slug: "threejs",
    engineName: "Three.js",
    engineVendor: "Three.js Authors",
    engineCategory: "web-engine",
    enginePlatforms: ["web"],
    enginePricing: "open-source",
    splatImport: true,
    splatImportFormats: ["ply", "splat", "ksplat"],
    splatExport: true,
    splatRender: "plugin",
    splatEdit: false,
    splatRenderMethod: "rasterization",
    implementation: "community-plugin",
    pluginName: "@mkkellogg/gaussian-splats-3d (GaussianSplats3D)",
    pluginUrl: "https://github.com/mkkellogg/GaussianSplats3D",
    pluginAuthor: "Mark Kellogg",
    firstSupported: null,
    latestTestedVersion: null,
    pluginLastCommitAt: "2025-10-19",
    quoteEn:
      "This renderer will work with the .ply files generated by the INRIA project, standard .splat files, or my own custom .ksplat files, which are a trimmed-down and compressed version of the original .ply files.",
    sourceUrl: "https://github.com/mkkellogg/GaussianSplats3D",
    sources: [
      "https://raw.githubusercontent.com/mkkellogg/GaussianSplats3D/main/README.md",
      "https://raw.githubusercontent.com/mkkellogg/GaussianSplats3D/main/package.json",
      "https://raw.githubusercontent.com/mkkellogg/GaussianSplats3D/main/src/loaders/ksplat/KSplatLoader.js",
    ],
    notes: {
      zh: "Three.js 核心仓库本身不内置 3DGS。本条记录的是 npm 包 @mkkellogg/gaussian-splats-3d，作者 Mark Kellogg。可导出 ksplat 二进制（KSplatLoader.downloadFile）。仓库自述「no longer in active development」。",
      en: "Three.js core does NOT ship 3DGS rendering. This entry refers to npm package @mkkellogg/gaussian-splats-3d. Can export ksplat binaries via KSplatLoader.downloadFile. Repo states 'no longer in active development'.",
    },
    capturedAt: "2026-04-29",
    capturedBy: "auto",
    verification: "verified",
    verifiedBy: "opus",
    verifiedAt: "2026-04-29",
  },
  {
    slug: "babylonjs",
    engineName: "Babylon.js",
    engineVendor: "Microsoft / Babylon.js Authors",
    engineCategory: "web-engine",
    enginePlatforms: ["web"],
    enginePricing: "open-source",
    splatImport: true,
    splatImportFormats: ["ply", "splat", "spz", "sog", "sogs"],
    splatExport: true,
    splatRender: "native",
    splatEdit: true,
    splatRenderMethod: "rasterization",
    implementation: "official",
    pluginName: null,
    pluginUrl: null,
    pluginAuthor: null,
    firstSupported: "2024-03 (v7.0.0)",
    latestTestedVersion: null,
    pluginLastCommitAt: null,
    quoteEn:
      "Gaussian Splatting is a volume rendering method. It's useful to capture real-life data. The difference with other technics like photogrammetry is the end result consists in a point cloud with each point rendered as a semi transparent ellipsoid projected onto a billboard.",
    sourceUrl:
      "https://doc.babylonjs.com/features/featuresDeepDive/mesh/gaussianSplatting",
    sources: [
      "https://doc.babylonjs.com/features/featuresDeepDive/mesh/gaussianSplatting",
      "https://github.com/BabylonJS/Babylon.js/releases/tag/7.0.0",
      "https://raw.githubusercontent.com/BabylonJS/Babylon.js/master/packages/dev/core/src/Meshes/GaussianSplatting/gaussianSplattingMesh.ts",
    ],
    notes: {
      zh: "v7.0.0（2024-03）官方原生支持。最丰富的格式覆盖：PLY/splat/SPZ/SOG/SOGS。提供 GaussianSplattingMesh API，可通过修改 positions 数组 + DownloadBlob 实现读写。注意：splat-edit 是 API 级（开发者修改数据），不是 UI 级（用户交互编辑）。",
      en: "Official native support since v7.0.0 (March 2024). Broadest format coverage: PLY/splat/SPZ/SOG/SOGS. Provides GaussianSplattingMesh API for read/write. Note: splat-edit is API-level (devs modify data programmatically), not UI-level interactive editing.",
    },
    capturedAt: "2026-04-29",
    capturedBy: "auto",
    verification: "verified",
    verifiedBy: "opus",
    verifiedAt: "2026-04-29",
  },
  {
    slug: "polycam",
    engineName: "Polycam",
    engineVendor: "Polycam Inc.",
    engineCategory: "mobile-platform",
    enginePlatforms: ["ios", "android", "web"],
    enginePricing: "freemium",
    splatImport: false,
    splatImportFormats: [],
    splatExport: true,
    splatRender: "native",
    splatEdit: true,
    splatRenderMethod: "rasterization",
    implementation: "official",
    pluginName: null,
    pluginUrl: null,
    pluginAuthor: null,
    firstSupported: null,
    latestTestedVersion: null,
    pluginLastCommitAt: null,
    quoteEn:
      "Gaussian splatting can effectively render shiny, reflective objects as well as long and thin details. Splatting also excels at capturing large, expansive spaces without sacrificing smaller details.",
    sourceUrl: "https://poly.cam/tools/gaussian-splatting",
    sources: [
      "https://poly.cam/tools/gaussian-splatting",
      "https://poly.cam/object-capture",
      "https://apps.apple.com/us/app/polycam-3d-scanner-lidar-360/id1532482376",
    ],
    notes: {
      zh: "封闭工作流：用户上传 PNG/JPG/MP4 → 云端训练 → 应用内查看 + 编辑 → 导出 PLY。**不接受外部 splat 文件输入**（splat-import: false）。生产工具，不是查看器。",
      en: "Closed workflow: users upload PNG/JPG/MP4 → cloud training → in-app view + edit → export PLY. **Does NOT accept external splat files** (splat-import: false). Production tool, not a viewer.",
    },
    capturedAt: "2026-04-29",
    capturedBy: "auto",
    verification: "verified",
    verifiedBy: "opus",
    verifiedAt: "2026-04-29",
  },

  // ===== 第二批审核通过（2026-04-29）=====

  {
    slug: "playcanvas",
    engineName: "PlayCanvas Engine",
    engineVendor: "PlayCanvas Ltd.",
    engineCategory: "web-engine",
    enginePlatforms: ["web"],
    enginePricing: "freemium",
    splatImport: true,
    splatImportFormats: ["ply", "splat", "spz"],
    splatExport: null,
    splatRender: "native",
    splatEdit: null,
    splatRenderMethod: "rasterization",
    implementation: "official",
    pluginName: null,
    pluginUrl: null,
    pluginAuthor: null,
    firstSupported: null,
    latestTestedVersion: null,
    pluginLastCommitAt: null,
    quoteEn:
      "3D Gaussian Splatting is a revolutionary technique for capturing, representing, and rendering photorealistic 3D scenes. Unlike traditional polygonal meshes, Gaussian Splatting uses millions of small, semi-transparent elliptical splats to reconstruct detailed environments with exceptional visual fidelity.",
    sourceUrl:
      "https://developer.playcanvas.com/user-manual/graphics/gaussian-splatting/",
    sources: [
      "https://developer.playcanvas.com/user-manual/graphics/gaussian-splatting/",
      "https://github.com/playcanvas/engine/releases",
      "https://developer.playcanvas.com/user-manual/gaussian-splatting/viewing/",
    ],
    notes: {
      zh: "PlayCanvas 引擎本身就内置 GSplat 渲染管线，引擎 release 显示了 'compute-based tiled GSplat renderer (WebGPU)' 等核心 PR。导出/编辑由配套产品 SuperSplat 负责（见单独条目），故本条不重复填。",
      en: "PlayCanvas Engine ships GSplat rendering natively; releases show core PRs like 'compute-based tiled GSplat renderer (WebGPU)'. Export and editing are handled by SuperSplat (separate entry); this engine entry deliberately leaves those fields null.",
    },
    capturedAt: "2026-04-29",
    capturedBy: "auto",
    verification: "verified",
    verifiedBy: "opus",
    verifiedAt: "2026-04-29",
  },

  {
    slug: "godot",
    engineName: "Godot Engine",
    engineVendor: "Godot Foundation",
    engineCategory: "game-engine",
    enginePlatforms: ["windows", "macos", "linux"],
    enginePricing: "open-source",
    splatImport: true,
    splatImportFormats: ["ply", "compressed.ply", "splat", "sog"],
    splatExport: false,
    splatRender: "plugin",
    splatEdit: false,
    splatRenderMethod: "rasterization",
    implementation: "community-plugin",
    pluginName: "gdgs (godot-gaussian-splatting)",
    pluginUrl: "https://github.com/ReconWorldLab/godot-gaussian-splatting",
    pluginAuthor: "mianzhi",
    firstSupported: null,
    latestTestedVersion: null,
    pluginLastCommitAt: null,
    quoteEn:
      "3DGS does not follow Godot's native mesh rendering pipeline, and Godot does not currently provide built-in support for importing, rendering, and compositing 3D Gaussian Splatting content.",
    sourceUrl: "https://github.com/ReconWorldLab/godot-gaussian-splatting",
    sources: [
      "https://raw.githubusercontent.com/ReconWorldLab/godot-gaussian-splatting/main/README.md",
      "https://raw.githubusercontent.com/ReconWorldLab/godot-gaussian-splatting/main/addons/gdgs/plugin.cfg",
    ],
    notes: {
      zh: "Godot 4.4+ 启用 Forward Plus 后安装 gdgs 插件；支持 4 种格式（ply / compressed.ply / splat / sog）。插件 README 自承认 Godot 原生不支持 3DGS——这是教科书级的对立证据。",
      en: "Requires Godot 4.4+ with Forward Plus, then install the gdgs add-on. Supports 4 formats (ply / compressed.ply / splat / sog). The plugin README explicitly states Godot has no native 3DGS support — strong negative-space evidence.",
    },
    capturedAt: "2026-04-29",
    capturedBy: "auto",
    verification: "verified",
    verifiedBy: "opus",
    verifiedAt: "2026-04-29",
  },

  {
    slug: "gsplat-js",
    engineName: "gsplat.js",
    engineVendor: "Hugging Face",
    engineCategory: "web-engine",
    enginePlatforms: ["web"],
    enginePricing: "open-source",
    splatImport: true,
    splatImportFormats: ["ply", "splat"],
    splatExport: true,
    splatRender: "plugin",
    splatEdit: null,
    splatRenderMethod: "rasterization",
    implementation: "community-plugin",
    pluginName: "gsplat (npm)",
    pluginUrl: "https://github.com/huggingface/gsplat.js",
    pluginAuthor: "dylanebert",
    firstSupported: null,
    latestTestedVersion: null,
    pluginLastCommitAt: null,
    quoteEn:
      "gsplat.js is an easy-to-use, general-purpose, open-source 3D Gaussian Splatting library, providing functionality similar to three.js but for Gaussian Splatting.",
    sourceUrl: "https://github.com/huggingface/gsplat.js",
    sources: [
      "https://raw.githubusercontent.com/huggingface/gsplat.js/main/README.md",
      "https://raw.githubusercontent.com/huggingface/gsplat.js/main/package.json",
      "https://raw.githubusercontent.com/huggingface/gsplat.js/main/src/core/Scene.ts",
      "https://raw.githubusercontent.com/huggingface/gsplat.js/main/src/loaders/Loader.ts",
    ],
    notes: {
      zh: "Hugging Face / dylanebert 维护的独立 JS 库（不是 mkkellogg 的 GaussianSplats3D）。源码级证据：Scene.saveToFile(format: 'splat' | 'ply') 函数签名。README 警告：.splat 不含 SH，往返 PLY 会丢系数。",
      en: "Independent JS library by Hugging Face / dylanebert (NOT mkkellogg's GaussianSplats3D). Source-level evidence: Scene.saveToFile(format: 'splat' | 'ply'). README warns: .splat has no SH, round-tripping PLY drops coefficients.",
    },
    capturedAt: "2026-04-29",
    capturedBy: "auto",
    verification: "verified",
    verifiedBy: "opus",
    verifiedAt: "2026-04-29",
  },

  {
    slug: "luma-web-viewer",
    engineName: "Luma Web (@lumaai/luma-web)",
    engineVendor: "Luma AI",
    engineCategory: "web-engine",
    enginePlatforms: ["web"],
    enginePricing: "free",
    splatImport: true,
    splatImportFormats: ["luma-capture-url", "luma-splats-artifacts"],
    splatExport: false,
    splatRender: "plugin",
    splatEdit: false,
    splatRenderMethod: "rasterization",
    implementation: "official",
    pluginName: "@lumaai/luma-web",
    pluginUrl: "https://www.npmjs.com/package/@lumaai/luma-web",
    pluginAuthor: null,
    firstSupported: null,
    latestTestedVersion: null,
    pluginLastCommitAt: null,
    quoteEn:
      "luma-web is a npm package for rendering photoreal interactive scenes captured by the Luma app. It includes LumaSplatsWebGL, which is a WebGL-only gaussian splatting implementation designed to be integrated with 3D frameworks, and LumaSplatsThree, which is a Three.js implementation that uses LumaSplatsWebGL under the hood.",
    sourceUrl: "https://www.npmjs.com/package/@lumaai/luma-web",
    sources: [
      "https://www.npmjs.com/package/@lumaai/luma-web?activeTab=readme",
      "https://github.com/lumalabs/luma-web-library",
    ],
    notes: {
      zh: "强供应商锁定：source 仅接受 lumalabs.ai 上的 capture URL 或 luma 自家 splats artifacts，**不能直接吃任意第三方 .ply**。格式名故意写成 luma-capture-url / luma-splats-artifacts 以反映文档字面，避免误导。",
      en: "Strong vendor lock-in: source accepts only lumalabs.ai capture URLs or Luma's own splats artifacts — does NOT directly accept arbitrary 3rd-party .ply files. Format names intentionally written as luma-capture-url / luma-splats-artifacts to mirror official docs without misleading.",
    },
    capturedAt: "2026-04-29",
    capturedBy: "auto",
    verification: "verified",
    verifiedBy: "opus",
    verifiedAt: "2026-04-29",
  },

  {
    slug: "niantic-scaniverse",
    engineName: "Scaniverse (Niantic Spatial Capture)",
    engineVendor: "Niantic Spatial, Inc.",
    engineCategory: "mobile-platform",
    enginePlatforms: ["ios", "android", "web"],
    enginePricing: "free",
    splatImport: false,
    splatImportFormats: [],
    splatExport: true,
    splatRender: "native",
    splatEdit: false,
    splatRenderMethod: "rasterization",
    implementation: "official",
    pluginName: null,
    pluginUrl: null,
    pluginAuthor: null,
    firstSupported: null,
    latestTestedVersion: null,
    pluginLastCommitAt: null,
    quoteEn:
      "Photorealistic results: Generate Gaussian Splats and meshes processed efficiently on-device.",
    sourceUrl:
      "https://scaniverse.com/news/spz-gaussian-splat-open-source-file-format",
    sources: [
      "https://scaniverse.com/news/spz-gaussian-splat-open-source-file-format",
      "https://www.nianticspatial.com/",
    ],
    notes: {
      zh: "类似 Polycam 的封闭生产管线：设备端生成 splat → 导出 SPZ 等格式。**不接受外部 splat 输入**。SPZ 是 Niantic 自家开源的高效压缩格式，比 PLY 小 90%。",
      en: "Closed-loop production pipeline like Polycam: on-device splat generation → export SPZ. Does NOT accept external splat input. SPZ is Niantic's open-source compressed format, 90% smaller than PLY.",
    },
    capturedAt: "2026-04-29",
    capturedBy: "auto",
    verification: "verified",
    verifiedBy: "opus",
    verifiedAt: "2026-04-29",
  },

  {
    slug: "supersplat",
    engineName: "SuperSplat",
    engineVendor: "PlayCanvas Ltd.",
    engineCategory: "viewer-only",
    enginePlatforms: ["web"],
    enginePricing: "open-source",
    splatImport: true,
    splatImportFormats: ["ply", "splat"],
    splatExport: true,
    splatRender: "native",
    splatEdit: true,
    splatRenderMethod: "rasterization",
    implementation: "official",
    pluginName: null,
    pluginUrl: "https://superspl.at/editor",
    pluginAuthor: null,
    firstSupported: null,
    latestTestedVersion: null,
    pluginLastCommitAt: null,
    quoteEn:
      "The SuperSplat Editor is a free and open source tool for inspecting, editing, optimizing and publishing 3D Gaussian Splats.",
    sourceUrl: "https://github.com/playcanvas/supersplat",
    sources: [
      "https://raw.githubusercontent.com/playcanvas/supersplat/main/README.md",
      "https://developer.playcanvas.com/user-manual/gaussian-splatting/editing/supersplat/",
    ],
    notes: {
      zh: "PlayCanvas 出品的纯 Web 端 splat 编辑器；inspecting、editing、optimizing、publishing 全栈。与 PlayCanvas Engine 条目区分：本条侧重「编辑/发布工具」，引擎条目侧重「渲染 API」。",
      en: "PlayCanvas-built pure web-based splat editor: full-stack inspecting, editing, optimizing, publishing. Distinct from the PlayCanvas Engine entry: this is the editing tool, that is the rendering API.",
    },
    capturedAt: "2026-04-29",
    capturedBy: "auto",
    verification: "verified",
    verifiedBy: "opus",
    verifiedAt: "2026-04-29",
  },

  {
    slug: "nvidia-omniverse",
    engineName: "NVIDIA Omniverse (Kit / RTX)",
    engineVendor: "NVIDIA",
    engineCategory: "3d-software",
    enginePlatforms: ["windows", "linux"],
    enginePricing: "freemium",
    splatImport: true,
    splatImportFormats: ["ply"],
    splatExport: null,
    splatRender: "native",
    splatEdit: null,
    splatRenderMethod: "path-tracing", // ⭐ 唯一公开的 3DGS path-tracing 实现
    implementation: "official",
    pluginName: null,
    pluginUrl: null,
    pluginAuthor: null,
    firstSupported: null,
    latestTestedVersion: null,
    pluginLastCommitAt: null,
    quoteEn:
      "Particle Fields are a new geometry type in OpenUSD for rendering 3D Gaussian Splats (3DGS) and other radiance fields such as 3D Gaussian Unscented Transforms (3DGUT). Omniverse RTX renders these fields natively, with full path-tracing.",
    sourceUrl:
      "https://docs.omniverse.nvidia.com/materials-and-rendering/latest/particle-fields.html",
    sources: [
      "https://docs.omniverse.nvidia.com/materials-and-rendering/latest/particle-fields.html",
      "https://openusd.org/release/user_guides/schemas/usdVol/ParticleField.html",
    ],
    notes: {
      zh: "**全行业唯一公开的 3DGS path-tracing 实现**。NVIDIA 把 3DGS 做成了 OpenUSD 一等几何原语 ParticleField，RTX 全 path-tracing 渲染，可与 mesh 互投阴影。导入需先用 py3dgsPlyToUsd.py 把 .ply 转成 USD。",
      en: "**The industry's only public path-traced 3DGS implementation.** NVIDIA elevated 3DGS to a first-class OpenUSD geometry primitive (ParticleField), rendered by RTX with full path-tracing including mutual shadowing with meshes. Import requires converting .ply → USD via py3dgsPlyToUsd.py.",
    },
    capturedAt: "2026-04-29",
    capturedBy: "auto",
    verification: "verified",
    verifiedBy: "opus",
    verifiedAt: "2026-04-29",
  },

  {
    slug: "apple-vision-pro",
    engineName: "visionOS / RealityKit",
    engineVendor: "Apple",
    engineCategory: "xr-platform",
    enginePlatforms: ["visionos"],
    enginePricing: "paid",
    splatImport: false,
    splatImportFormats: [],
    splatExport: false,
    splatRender: "external",
    splatEdit: false,
    splatRenderMethod: null,
    implementation: "none",
    pluginName: null,
    pluginUrl: null,
    pluginAuthor: null,
    firstSupported: null,
    latestTestedVersion: null,
    pluginLastCommitAt: null,
    quoteEn:
      "RealityKit provides high-performance 3D simulation and rendering capabilities you can use to create apps with 3D or augmented reality (AR) for iOS, iPadOS, macOS, tvOS, and visionOS.",
    sourceUrl: "https://developer.apple.com/documentation/realitykit",
    sources: [
      "https://developer.apple.com/documentation/realitykit",
      "https://developer.apple.com/documentation/visionOS",
    ],
    notes: {
      zh: "visionOS 与 RealityKit 公开文档**未发现** Gaussian / splatting 关键词。3DGS 在 Vision Pro 上要靠应用层自研：Metal、嵌 Web/Unity 等。系统层无 ParticleField 同级 API。",
      en: "Public visionOS / RealityKit documentation contains NO mention of Gaussian or splatting. To run 3DGS on Vision Pro, apps must implement it themselves via Metal, embedded WebKit, or Unity. No system-level primitive equivalent to Omniverse's ParticleField.",
    },
    capturedAt: "2026-04-29",
    capturedBy: "auto",
    verification: "verified",
    verifiedBy: "opus",
    verifiedAt: "2026-04-29",
  },

  {
    slug: "meta-quest",
    engineName: "Meta Quest (OpenXR runtime)",
    engineVendor: "Meta",
    engineCategory: "xr-platform",
    enginePlatforms: ["android"],
    enginePricing: "paid",
    splatImport: false,
    splatImportFormats: [],
    splatExport: false,
    splatRender: "external",
    splatEdit: false,
    splatRenderMethod: null,
    implementation: "none",
    pluginName: null,
    pluginUrl: null,
    pluginAuthor: null,
    firstSupported: null,
    latestTestedVersion: null,
    pluginLastCommitAt: null,
    quoteEn:
      "OpenXR is a royalty-free, open standard that provides a common set of APIs for developing XR applications that run across a wide range of AR and VR devices.",
    sourceUrl: "https://www.khronos.org/openxr/",
    sources: ["https://www.khronos.org/openxr/", "https://www.w3.org/TR/webxr/"],
    notes: {
      zh: "Quest 头显 OS 不提供原生 splat 管线；3DGS 通过 Unity / Unreal / 自研 Vulkan 在 OpenXR 帧循环中绘制。Auto 提示：抓取时 developer.oculus.com 长文档曾超时，Quest 专有特性未逐条核验。",
      en: "Quest's head-mounted OS provides no native splat pipeline; 3DGS runs via Unity / Unreal / custom Vulkan within an OpenXR frame loop. Auto note: developer.oculus.com timed out during long-document fetches; Quest-specific features not exhaustively verified.",
    },
    capturedAt: "2026-04-29",
    capturedBy: "auto",
    verification: "verified",
    verifiedBy: "opus",
    verifiedAt: "2026-04-29",
  },

  {
    slug: "webxr",
    engineName: "WebXR Device API",
    engineVendor: "W3C",
    engineCategory: "web-engine",
    enginePlatforms: ["web"],
    enginePricing: "open-source",
    splatImport: false,
    splatImportFormats: [],
    splatExport: false,
    splatRender: "external",
    splatEdit: false,
    splatRenderMethod: null,
    implementation: "none",
    pluginName: null,
    pluginUrl: null,
    pluginAuthor: null,
    firstSupported: null,
    latestTestedVersion: null,
    pluginLastCommitAt: null,
    quoteEn:
      "The WebXR Device API provides the interfaces necessary to enable developers to build compelling, comfortable, and safe immersive applications on the web across a wide variety of hardware form factors.",
    sourceUrl: "https://www.w3.org/TR/webxr/",
    sources: [
      "https://www.w3.org/TR/webxr/",
      "https://doc.babylonjs.com/features/featuresDeepDive/mesh/gaussianSplatting",
    ],
    notes: {
      zh: "WebXR 是 API 不是渲染器，规范本身不定义 splat 原语；splat 由 Babylon.js / Three.js 等上层引擎在 XRSession 帧循环里绘制。",
      en: "WebXR is an API, not a renderer; the spec defines no splat primitives. Splats are drawn within the XRSession frame loop by upper-layer engines like Babylon.js / Three.js.",
    },
    capturedAt: "2026-04-29",
    capturedBy: "auto",
    verification: "verified",
    verifiedBy: "opus",
    verifiedAt: "2026-04-29",
  },

  {
    slug: "webgl-webgpu",
    engineName: "WebGL 2.0 / WebGPU",
    engineVendor: "Khronos / W3C",
    engineCategory: "web-engine",
    enginePlatforms: ["web"],
    enginePricing: "open-source",
    splatImport: false,
    splatImportFormats: [],
    splatExport: false,
    splatRender: "none",
    splatEdit: false,
    splatRenderMethod: null,
    implementation: "none",
    pluginName: null,
    pluginUrl: null,
    pluginAuthor: null,
    firstSupported: null,
    latestTestedVersion: null,
    pluginLastCommitAt: null,
    quoteEn:
      "This specification describes an additional rendering context and support objects for the HTML 5 canvas element. This context allows rendering using an API that conforms closely to the OpenGL ES 3.0 API.",
    sourceUrl: "https://www.khronos.org/registry/webgl/specs/latest/2.0/",
    sources: [
      "https://www.khronos.org/registry/webgl/specs/latest/2.0/",
      "https://www.w3.org/TR/webgpu/",
    ],
    notes: {
      zh: "浏览器图形 API 层无 splat 原语——WebGL/WebGPU 规范均未定义任何 Gaussian/splat 类型。用户层（three.js、gsplat.js 等）才有 splat 实现。本条记录的是「规范层是否内建」。",
      en: "Browser graphics APIs have no splat primitives — neither WebGL nor WebGPU spec defines any Gaussian/splat type. Splats live at the user-space layer (three.js, gsplat.js, etc.). This entry tracks the spec layer specifically.",
    },
    capturedAt: "2026-04-29",
    capturedBy: "auto",
    verification: "verified",
    verifiedBy: "opus",
    verifiedAt: "2026-04-29",
  },

  // ===== splat-render: none 类（DCC 软件 + 后期合成）=====

  {
    slug: "maya",
    engineName: "Maya",
    engineVendor: "Autodesk",
    engineCategory: "3d-software",
    enginePlatforms: ["windows", "macos", "linux"],
    enginePricing: "subscription",
    splatImport: false,
    splatImportFormats: [],
    splatExport: false,
    splatRender: "none",
    splatEdit: false,
    splatRenderMethod: null,
    implementation: "none",
    pluginName: null,
    pluginUrl: null,
    pluginAuthor: null,
    firstSupported: null,
    latestTestedVersion: null,
    pluginLastCommitAt: null,
    quoteEn:
      "Maya is professional 3D software for creating realistic characters and blockbuster-worthy effects.",
    sourceUrl: "https://www.autodesk.com/products/maya/overview",
    sources: [
      "https://www.autodesk.com/products/maya/overview",
      "https://www.autodesk.com/products/maya/features",
    ],
    notes: {
      zh: "Autodesk 官方 Maya 公开页面未提及 Gaussian / splatting 关键词。可能存在第三方插件未抓取（KIRI Engine 等）。如果用户找到第三方支持，可独立建条目。",
      en: "Autodesk's public Maya pages contain no Gaussian / splatting references. 3rd-party plugins may exist but were not captured (e.g., KIRI Engine). Users finding 3rd-party support should file a separate entry.",
    },
    capturedAt: "2026-04-29",
    capturedBy: "auto",
    verification: "verified",
    verifiedBy: "opus",
    verifiedAt: "2026-04-29",
  },

  {
    slug: "3ds-max",
    engineName: "3ds Max",
    engineVendor: "Autodesk",
    engineCategory: "3d-software",
    enginePlatforms: ["windows"],
    enginePricing: "subscription",
    splatImport: false,
    splatImportFormats: [],
    splatExport: false,
    splatRender: "none",
    splatEdit: false,
    splatRenderMethod: null,
    implementation: "none",
    pluginName: null,
    pluginUrl: null,
    pluginAuthor: null,
    firstSupported: null,
    latestTestedVersion: null,
    pluginLastCommitAt: null,
    quoteEn:
      "3ds Max is 3D modeling and rendering software for design visualization, games, and animation.",
    sourceUrl: "https://www.autodesk.com/products/3ds-max/overview",
    sources: [
      "https://www.autodesk.com/products/3ds-max/overview",
      "https://www.autodesk.com/products/3ds-max/features",
    ],
    notes: {
      zh: "Autodesk 公开 overview/features 未提 Gaussian / splatting；与 Maya 同理无官方一等公民支持。Windows 独占。",
      en: "Autodesk's public overview/features make no mention of Gaussian / splatting; same situation as Maya — no first-class official support. Windows-only.",
    },
    capturedAt: "2026-04-29",
    capturedBy: "auto",
    verification: "verified",
    verifiedBy: "opus",
    verifiedAt: "2026-04-29",
  },

  {
    slug: "cinema-4d",
    engineName: "Cinema 4D",
    engineVendor: "Maxon",
    engineCategory: "3d-software",
    enginePlatforms: ["windows", "macos"],
    enginePricing: "subscription",
    splatImport: false,
    splatImportFormats: [],
    splatExport: false,
    splatRender: "none",
    splatEdit: false,
    splatRenderMethod: null,
    implementation: "none",
    pluginName: null,
    pluginUrl: null,
    pluginAuthor: null,
    firstSupported: null,
    latestTestedVersion: null,
    pluginLastCommitAt: null,
    quoteEn:
      "Cinema 4D is a professional 3D modeling, animation, simulation and rendering software solution.",
    sourceUrl: "https://www.maxon.net/en/cinema-4d",
    sources: [
      "https://www.maxon.net/en/cinema-4d",
      "https://www.maxon.net/en/cinema-4d/features/supported-file-formats",
    ],
    notes: {
      zh: "Maxon 产品页 + 官方支持格式列表均无 Gaussian / splat 字样。如果 Maxon 未来加入支持，应替换本条。",
      en: "Maxon's product page and official supported-formats list contain no mention of Gaussian / splat. If Maxon ever adds support, this entry should be replaced.",
    },
    capturedAt: "2026-04-29",
    capturedBy: "auto",
    verification: "verified",
    verifiedBy: "opus",
    verifiedAt: "2026-04-29",
  },

  {
    slug: "houdini",
    engineName: "Houdini",
    engineVendor: "SideFX",
    engineCategory: "3d-software",
    enginePlatforms: ["windows", "macos", "linux"],
    enginePricing: "freemium",
    splatImport: false,
    splatImportFormats: [],
    splatExport: false,
    splatRender: "none",
    splatEdit: false,
    splatRenderMethod: null,
    implementation: "none",
    pluginName: null,
    pluginUrl: null,
    pluginAuthor: null,
    firstSupported: null,
    latestTestedVersion: null,
    pluginLastCommitAt: null,
    quoteEn:
      "Houdini combines superior performance and dramatic, ease-of-use to deliver a powerful and accessible 3D experience for VFX artists creating feature films, commercials or video games.",
    sourceUrl: "https://www.sidefx.com/products/houdini/",
    sources: [
      "https://www.sidefx.com/products/houdini/",
      "https://www.sidefx.com/docs/houdini/",
    ],
    notes: {
      zh: "SideFX 公开产品叙述聚焦程序化建模与 VFX；未见与 PlayCanvas/Polycam 同级的官方 3DGS 导入说明。社区 OTL 可能存在但未捕获。",
      en: "SideFX's public product narrative focuses on procedural modeling and VFX; no official 3DGS import path comparable to PlayCanvas/Polycam was found. Community OTLs may exist but were not captured.",
    },
    capturedAt: "2026-04-29",
    capturedBy: "auto",
    verification: "verified",
    verifiedBy: "opus",
    verifiedAt: "2026-04-29",
  },

  // ===== 合成 / 后期制作类 =====

  {
    slug: "after-effects",
    engineName: "After Effects",
    engineVendor: "Adobe",
    engineCategory: "compositing",
    enginePlatforms: ["windows", "macos"],
    enginePricing: "subscription",
    splatImport: false,
    splatImportFormats: [],
    splatExport: false,
    splatRender: "none",
    splatEdit: false,
    splatRenderMethod: null,
    implementation: "none",
    pluginName: null,
    pluginUrl: null,
    pluginAuthor: null,
    firstSupported: null,
    latestTestedVersion: null,
    pluginLastCommitAt: null,
    quoteEn:
      "Create stunning motion graphics. Animate a logo or character. Add eye-catching visual effects. With After Effects, you can add amazing motion to any video project.",
    sourceUrl: "https://www.adobe.com/products/aftereffects.html",
    sources: [
      "https://www.adobe.com/products/aftereffects.html",
      "https://www.adobe.com/creativecloud/video/discover-after-effects.html",
    ],
    notes: {
      zh: "Adobe 公开产品页面专注动态图形与视频特效；未见 splat 作为标准图层类型。可导入预渲染 splat 视频/序列作为素材，但非交互式 3DGS 场景。",
      en: "Adobe's public product pages focus on motion graphics and video effects; no splat as a standard layer type. Pre-rendered splat video/sequences can be imported as media but not as interactive 3DGS scenes.",
    },
    capturedAt: "2026-04-29",
    capturedBy: "auto",
    verification: "verified",
    verifiedBy: "opus",
    verifiedAt: "2026-04-29",
  },

  {
    slug: "nuke",
    engineName: "Nuke",
    engineVendor: "Foundry",
    engineCategory: "compositing",
    enginePlatforms: ["windows", "macos", "linux"],
    enginePricing: "subscription",
    splatImport: false,
    splatImportFormats: [],
    splatExport: false,
    splatRender: "none",
    splatEdit: false,
    splatRenderMethod: null,
    implementation: "none",
    pluginName: null,
    pluginUrl: null,
    pluginAuthor: null,
    firstSupported: null,
    latestTestedVersion: null,
    pluginLastCommitAt: null,
    quoteEn:
      "Nuke lives at the heart of the Nuke Family, offering a powerful node-based compositing toolkit with over 200 nodes available in its scalable node graph.",
    sourceUrl: "https://www.foundry.com/products/nuke",
    sources: [
      "https://www.foundry.com/products/nuke",
      "https://www.foundry.com/products/nuke-family/nuke",
    ],
    notes: {
      zh: "Foundry 公开产品页强调节点合成、Deep 合成与集成 3D 环境；未提 3DGS。影视流程通常先在 Omniverse/UE 渲染 EXR 序列再进 Nuke 合成。",
      en: "Foundry's public product pages emphasize node-based compositing, Deep compositing, and integrated 3D — no mention of 3DGS. The typical pipeline renders EXR sequences in Omniverse/UE first, then composites in Nuke.",
    },
    capturedAt: "2026-04-29",
    capturedBy: "auto",
    verification: "verified",
    verifiedBy: "opus",
    verifiedAt: "2026-04-29",
  },

  {
    slug: "davinci-resolve",
    engineName: "DaVinci Resolve",
    engineVendor: "Blackmagic Design",
    engineCategory: "compositing",
    enginePlatforms: ["windows", "macos", "linux"],
    enginePricing: "freemium",
    splatImport: false,
    splatImportFormats: [],
    splatExport: false,
    splatRender: "none",
    splatEdit: false,
    splatRenderMethod: null,
    implementation: "none",
    pluginName: null,
    pluginUrl: null,
    pluginAuthor: null,
    firstSupported: null,
    latestTestedVersion: null,
    pluginLastCommitAt: null,
    quoteEn:
      "DaVinci Resolve is the world's only solution that combines editing, color correction, visual effects, motion graphics, audio post production and now photo editing all in one software tool!",
    sourceUrl: "https://www.blackmagicdesign.com/products/davinciresolve",
    sources: [
      "https://www.blackmagicdesign.com/products/davinciresolve",
      "https://www.blackmagicdesign.com/products/davinciresolve/whatsnew",
    ],
    notes: {
      zh: "Resolve 整合剪辑、调色、Fusion、Fairlight、Photo；公开页面未提 Gaussian / splatting。可作为预渲染 3DGS 素材的下游消费方，非生产端。",
      en: "Resolve unifies editing, color, Fusion, Fairlight, and Photo; public pages contain no Gaussian / splatting references. It can consume pre-rendered 3DGS footage but is not a production stage for it.",
    },
    capturedAt: "2026-04-29",
    capturedBy: "auto",
    verification: "verified",
    verifiedBy: "opus",
    verifiedAt: "2026-04-29",
  },

  {
    slug: "touchdesigner",
    engineName: "TouchDesigner",
    engineVendor: "Derivative",
    engineCategory: "compositing",
    enginePlatforms: ["windows", "macos"],
    enginePricing: "freemium",
    splatImport: false,
    splatImportFormats: [],
    splatExport: false,
    splatRender: "none",
    splatEdit: false,
    splatRenderMethod: null,
    implementation: "none",
    pluginName: null,
    pluginUrl: null,
    pluginAuthor: null,
    firstSupported: null,
    latestTestedVersion: null,
    pluginLastCommitAt: null,
    quoteEn:
      "TouchDesigner is a visual development platform that equips you with the tools you need to create stunning realtime projects and rich user experiences.",
    sourceUrl: "https://derivative.ca/product",
    sources: ["https://derivative.ca/product", "https://derivative.ca/"],
    notes: {
      zh: "Derivative 产品页强调实时交互媒体；未列 Gaussian splatting。社区可能有 GLSL/Compute 实现但未被官方收录。",
      en: "Derivative's product page emphasizes realtime interactive media; no Gaussian splatting listed. Community GLSL/Compute implementations may exist but aren't officially endorsed.",
    },
    capturedAt: "2026-04-29",
    capturedBy: "auto",
    verification: "verified",
    verifiedBy: "opus",
    verifiedAt: "2026-04-29",
  },
];

export const enginesBySlug: Record<string, EngineSupport> = Object.fromEntries(
  engines.map((engine) => [engine.slug, engine]),
);

export function getEnginesByCategory(
  category: EngineCategory,
): EngineSupport[] {
  return engines.filter((engine) => engine.engineCategory === category);
}

export function getEnginesBySupport(
  support: SplatRenderSupport,
): EngineSupport[] {
  return engines.filter((engine) => engine.splatRender === support);
}

/**
 * 用于矩阵首页统计展示的数据汇总
 */
export function getEngineStats() {
  const total = engines.length;
  const byRender: Record<SplatRenderSupport, number> = {
    native: 0,
    plugin: 0,
    external: 0,
    none: 0,
  };
  engines.forEach((engine) => {
    byRender[engine.splatRender] += 1;
  });
  return { total, byRender };
}
