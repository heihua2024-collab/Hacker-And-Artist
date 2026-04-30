---
# === 通用必填 ===
slug: cinema-4d-3dgs-support
type: engine-support
title-zh: Cinema 4D
title-en: Cinema 4D

# === 引擎/软件特定字段 ===
engine-name: Cinema 4D
engine-vendor: null
engine-category: dcc
engine-platforms:
  - windows
  - macos
engine-pricing: null

# === 3DGS 兼容性 ===
splat-import: false
splat-import-formats: null
splat-export: false
splat-render: none
splat-edit: false
splat-render-method: null

# === 实现方式 ===
implementation: none
plugin-name: null
plugin-url: null
plugin-author: null
first-supported: null
latest-tested-version: null

# === 来源与抓取 ===
source-url: https://www.maxon.net/en/cinema-4d
source-author: null
captured-at: 2026-04-29
captured-by: auto
language: en
verification: pending
verified-by: null
verified-at: null

# === 反幻觉 ===
quote-en: |
  Cinema 4D is a professional 3D modeling, animation, simulation and rendering software solution.
quote-zh: null
sources:
  - https://www.maxon.net/en/cinema-4d
  - https://www.maxon.net/en/cinema-4d/features/supported-file-formats

license: 引用合理使用
notes: |
  - `quote-en` 来自 sources 第 1 条页面可见产品描述；该页与 sources 第 2 条「Supported File Formats」列表在已抓取正文中 **未出现** “Gaussian”“3D Gaussian Splatting”“splat” 等关键词。
  - 因此 `splat-import`/`splat-render`/`splat-edit` 按 TASK 强约束填 `false`/`none`，`splat-import-formats`/`splat-render-method` 为 `null`。
  - `engine-vendor`：页面未在摘录句中写明法人实体全称，填 null。
  - 若日后 Maxon 官方发布原生 3DGS 支持，需替换 quote 与 sources。
---

# 原文摘录 / 链接证据

自 sources 第 1 条：

> Cinema 4D is a professional 3D modeling, animation, simulation and rendering software solution.

自 sources 第 2 条（3D Formats 列表节选，未见 Gaussian splat 专用格式）：

> - GlTF/ GLB .gltf/ .glb (R/W)
> - USD .usd/ .usda/ .usdc/ .usdz (R/W)
> - Wavefront .obj (R/W)

## 工作流速记

在已访问的公开产品页与官方支持格式列表中未发现 3D Gaussian Splatting 作为一等公民工作流；若需使用 splat，通常需在外部工具（如 SuperSplat、专用 Web 查看器）处理后再以通用 3D 交换格式回链（若项目接受）。
