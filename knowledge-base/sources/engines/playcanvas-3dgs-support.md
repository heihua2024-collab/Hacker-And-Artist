---
# === 通用必填 ===
slug: playcanvas-3dgs-support
type: engine-support
title-zh: PlayCanvas 引擎
title-en: PlayCanvas Engine

# === 引擎/软件特定字段 ===
engine-name: PlayCanvas Engine
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
  - spz
splat-export: null
splat-render: native
splat-edit: null
splat-render-method: rasterization

# === 实现方式 ===
implementation: official
plugin-name: null
plugin-url: null
plugin-author: null
first-supported: null
latest-tested-version: null

# === 来源与抓取 ===
source-url: https://developer.playcanvas.com/user-manual/graphics/gaussian-splatting/
source-author: null
captured-at: 2026-04-29
captured-by: auto
language: en
verification: pending
verified-by: null
verified-at: null

# === 反幻觉 ===
quote-en: |
  3D Gaussian Splatting is a revolutionary technique for capturing, representing, and rendering photorealistic 3D scenes. Unlike traditional polygonal meshes, Gaussian Splatting uses millions of small, semi-transparent elliptical splats to reconstruct detailed environments with exceptional visual fidelity.
quote-zh: null
sources:
  - https://developer.playcanvas.com/user-manual/graphics/gaussian-splatting/
  - https://github.com/playcanvas/engine/releases
  - https://developer.playcanvas.com/user-manual/gaussian-splatting/viewing/

license: 引用合理使用
notes: |
  - `engine-vendor` / `engine-pricing: null`：已访问开发者站点摘录未出现公司法人注册名或价格句。
  - `splat-render: native`：官方用户手册将 Gaussian Splatting 列为 PlayCanvas 图形能力，并描述工作流；GitHub `playcanvas/engine` Release 说明含多项 `GSplat` 渲染器与运行时 PR（见 sources 第 2 条页面文本），表明引擎内建 GSplat 管线而非仅外部脚本包装。
  - `splat-import-formats`：手册「Viewing Splats」等子文档与生态页面描述加载/查看 splat 资源；未在 frontmatter 逐条列出超过手册明文的扩展名时保守只列手册与常见官方示例中出现的类型，余下由人工补全。
  - `splat-export` / `splat-edit`：`null`——本条仅针对 **PlayCanvas Engine** 运行时；导出/编辑 splat 的主产品为 SuperSplat 编辑器（另条 `supersplat-3dgs-support`），避免与引擎条目混淆。
  - 若需「仅引擎、无 SuperSplat」下的导出能力，需另找 Import/Export API 源码级证据；当前未在引文中落盘。
---

# 原文摘录 / 链接证据

自 sources 第 1 条：

> 3D Gaussian Splatting is a revolutionary technique for capturing, representing, and rendering photorealistic 3D scenes. Unlike traditional polygonal meshes, Gaussian Splatting uses millions of small, semi-transparent elliptical splats to reconstruct detailed environments with exceptional visual fidelity.

工作流列表：

> 1. Creating Splats
> 2. Viewing Splats
> 3. Editing Splats
> 4. Building Splat-based Apps

自 sources 第 2 条（engine Releases 页面正文节选，证明引擎级 GSplat 开发）：

> Add compute-based tiled GSplat renderer (WebGPU)

自 sources 第 3 条（Viewing 子文档入口由手册链接；若需完整 URL 以实际抓取为准）。

## 工作流速记

在 PlayCanvas 项目中使用官方手册的 Gaussian Splatting 工作流创建/查看/集成 splat；渲染由引擎内 GSplat 相关模块完成。编辑与发布可使用同生态的 SuperSplat（另见独立条目）。
