---
# === 通用必填 ===
slug: gsplat-js-3dgs-support
type: engine-support
title-zh: gsplat.js（Hugging Face）
title-en: gsplat.js (Hugging Face)

# === 引擎/软件特定字段 ===
engine-name: gsplat.js
engine-vendor: null
engine-category: web-engine
engine-platforms:
  - web
engine-pricing: null

# === 3DGS 兼容性 ===
splat-import: true
splat-import-formats:
  - ply
  - splat
splat-export: true
splat-render: plugin
splat-edit: null
splat-render-method: rasterization

# === 实现方式 ===
implementation: community-plugin
plugin-name: gsplat (npm package name)
plugin-url: https://github.com/huggingface/gsplat.js
plugin-author: dylanebert
first-supported: null
latest-tested-version: null

# === 来源与抓取 ===
source-url: https://github.com/huggingface/gsplat.js
source-author: null
captured-at: 2026-04-29
captured-by: auto
language: en
verification: pending
verified-by: null
verified-at: null

# === 反幻觉 ===
quote-en: |
  gsplat.js is an easy-to-use, general-purpose, open-source 3D Gaussian Splatting library, providing functionality similar to three.js but for Gaussian Splatting.
quote-zh: null
sources:
  - https://raw.githubusercontent.com/huggingface/gsplat.js/main/README.md
  - https://raw.githubusercontent.com/huggingface/gsplat.js/main/package.json
  - https://raw.githubusercontent.com/huggingface/gsplat.js/main/src/core/Scene.ts
  - https://raw.githubusercontent.com/huggingface/gsplat.js/main/src/loaders/Loader.ts

license: 引用合理使用
notes: |
  - 本条专指 `https://github.com/huggingface/gsplat.js`，与 mkkellogg/GaussianSplats3D（已在 `threejs-3dgs-support`）区分。
  - `plugin-author`：sources 第 2 条 `"author": "dylanebert"`。
  - `splat-import: true`：README 描述 `Loader.LoadAsync`、`PLYLoader`；sources 第 4 条 `LoadFromArrayBuffer` 调用 `SplatData.Deserialize`。
  - `splat-export: true`：sources 第 3 条 `Scene.saveToFile` / `getMergedSceneDataBuffer` 写入 `splat` 或 `ply` 字节（`Converter.SplatToPLY` 分支）。
  - `splat-edit: null`：README 提到独立「Editor Demo」但未在本条已引正文中定义与 TASK 表格一致的「单高斯编辑」UI 能力；需人工补证据或保持 null。
  - README 警告 `.splat` 不含 SH、往返 PLY 会丢系数；属格式限制非「未渲染」。
---

# 原文摘录 / 链接证据

自 sources 第 1 条（README.md）：

> gsplat.js is an easy-to-use, general-purpose, open-source 3D Gaussian Splatting library, providing functionality similar to three.js but for Gaussian Splatting.

FAQ：

> **Q: Can I use .ply files?**
>
> **A:** Yes, gsplat.js supports `.ply` files.

自 sources 第 2 条（package.json）：

> "author": "dylanebert"

自 sources 第 3 条（Scene.ts，`saveToFile` 节选）：

> saveToFile(name: string | null = null, format: "splat" | "ply" = "splat") {

自 sources 第 4 条（Loader.ts 节选）：

> return this.LoadFromArrayBuffer(arrayBuffer, scene);

## 工作流速记

安装 npm 包 `gsplat`，用 `SPLAT.Loader` / `PLYLoader` 加载远程或本地 `.splat`/`.ply`，用 `SPLAT.WebGLRenderer` 驱动渲染循环；场景合并导出用 `Scene.saveToFile`。这是独立 JS 库，不是浏览器或 three.js 内置功能。
