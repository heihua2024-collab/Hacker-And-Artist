---
# === 通用必填 ===
slug: supersplat-3dgs-support
type: engine-support
title-zh: SuperSplat 编辑器
title-en: SuperSplat Editor

# === 引擎/软件特定字段 ===
engine-name: SuperSplat
engine-vendor: null
engine-category: viewer
engine-platforms:
  - web
engine-pricing: null

# === 3DGS 兼容性 ===
splat-import: true
splat-import-formats:
  - ply
  - splat
splat-export: true
splat-render: native
splat-edit: true
splat-render-method: rasterization

# === 实现方式 ===
implementation: official
plugin-name: null
plugin-url: null
plugin-author: null
first-supported: null
latest-tested-version: null

# === 来源与抓取 ===
source-url: https://github.com/playcanvas/supersplat
source-author: null
captured-at: 2026-04-29
captured-by: auto
language: en
verification: pending
verified-by: null
verified-at: null

# === 反幻觉 ===
quote-en: |
  The SuperSplat Editor is a free and open source tool for inspecting, editing, optimizing and publishing 3D Gaussian Splats.
quote-zh: null
sources:
  - https://raw.githubusercontent.com/playcanvas/supersplat/main/README.md
  - https://developer.playcanvas.com/user-manual/gaussian-splatting/editing/supersplat/

license: 引用合理使用
notes: |
  - PlayCanvas 出品的 Web 端 splat 工具链；`splat-edit: true` 直接来自 README「inspecting, editing, optimizing」。
  - `splat-export: true`：README 含「publishing」与优化流程；若需更细粒度导出格式列表，应补抓 User Guide 正文并更新 `splat-import-formats`。
  - `splat-render: native`：基于 PlayCanvas 技术栈的专用编辑器，非「仅挂载第三方插件的裸查看器」；与 `playcanvas-3dgs-support` 区分：本条侧重 **编辑/发布工具**，彼条侧重 **引擎 API**。
  - `engine-vendor`：README 未在摘录句写明法人实体全称，填 null。
---

# 原文摘录 / 链接证据

自 sources 第 1 条：

> The SuperSplat Editor is a free and open source tool for inspecting, editing, optimizing and publishing 3D Gaussian Splats. It is built on web technologies and runs in the browser, so there's nothing to download or install.

> A live version of this tool is available at: https://superspl.at/editor

## 工作流速记

打开 superspl.at 或本地 `npm run develop`，拖放 PLY/splat 资源进行裁剪、优化与发布；详细手势与面板见 PlayCanvas User Guide 的 SuperSplat 章节。
