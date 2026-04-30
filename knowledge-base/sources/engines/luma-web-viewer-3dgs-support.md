---
# === 通用必填 ===
slug: luma-web-viewer-3dgs-support
type: engine-support
title-zh: Luma Web（@lumaai/luma-web）
title-en: Luma Web (@lumaai/luma-web)

# === 引擎/软件特定字段 ===
engine-name: luma-web
engine-vendor: Luma AI
engine-category: web-engine
engine-platforms:
  - web
engine-pricing: null

# === 3DGS 兼容性 ===
splat-import: true
splat-import-formats:
  - luma-capture-url
  - luma-splats-artifacts
splat-export: false
splat-render: plugin
splat-edit: false
splat-render-method: rasterization

# === 实现方式 ===
implementation: official
plugin-name: "@lumaai/luma-web"
plugin-url: https://www.npmjs.com/package/@lumaai/luma-web
plugin-author: null
first-supported: null
latest-tested-version: null

# === 来源与抓取 ===
source-url: https://www.npmjs.com/package/@lumaai/luma-web
source-author: null
captured-at: 2026-04-29
captured-by: auto
language: en
verification: pending
verified-by: null
verified-at: null

# === 反幻觉 ===
quote-en: |
  luma-web is a npm package for rendering photoreal interactive scenes captured by the Luma app. It includes LumaSplatsWebGL, which is a WebGL-only gaussian splatting implementation designed to be integrated with 3D frameworks, and LumaSplatsThree, which is a Three.js implementation that uses LumaSplatsWebGL under the hood.
quote-zh: null
sources:
  - https://www.npmjs.com/package/@lumaai/luma-web?activeTab=readme
  - https://github.com/lumalabs/luma-web-library

license: 引用合理使用
notes: |
  - `splat-import: true` 但 **限定**：README 写明 `source` 可为 `lumalabs.ai` 上 capture 的 URL **或**「path to a luma splats file or folder containing a luma splats artifacts」——**不是**已验证的「任意 ReshotAI 通用 `.ply` 拖入即渲染」。
  - `splat-import-formats` 使用语义化占位（`luma-capture-url`、`luma-splats-artifacts`）以反映文档字面，避免误标为通用 `ply`。
  - `splat-render: plugin`：相对浏览器而言为 npm 集成库；底层用 WebGL + Three.js。
  - `plugin-author: null`：npm 页未在摘录中给出维护者姓名字符串（仅 Luma 品牌）。
  - `splat-export: false`：已读 README 未描述将场景写回标准 3DGS 文件供外发。
---

# 原文摘录 / 链接证据

自 sources 第 1 条：

> `luma-web` is a [npm package](https://www.npmjs.com/package/@lumaai/luma-web) for rendering photoreal interactive scenes captured by the [Luma app](https://lumalabs.ai/). It includes `LumaSplatsWebGL`, which is a WebGL-only gaussian splatting implementation designed to be integrated with 3D frameworks, and `LumaSplatsThree`, which is a Three.js implementation that uses `LumaSplatsWebGL` under the hood.

`source` 参数说明：

> `source` can be either of:
>
> - URL to a capture on [lumalabs.ai](https://lumalabs.ai)
> - path to a luma splats file or folder containing a luma splats artifacts

## 工作流速记

安装 `@lumaai/luma-web`，在 Three.js 场景中加入 `LumaSplatsThree` 并传入 Luma capture URL 或本地 splat 产物目录；VR 示例通过 three.js WebXR 按钮进入（README VR 节）。
