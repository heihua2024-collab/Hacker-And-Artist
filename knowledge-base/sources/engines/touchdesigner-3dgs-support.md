---
# === 通用必填 ===
slug: touchdesigner-3dgs-support
type: engine-support
title-zh: TouchDesigner
title-en: TouchDesigner

# === 引擎/软件特定字段 ===
engine-name: TouchDesigner
engine-vendor: Derivative
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
source-url: https://derivative.ca/product
source-author: null
captured-at: 2026-04-29
captured-by: auto
language: en
verification: pending
verified-by: null
verified-at: null

# === 反幻觉 ===
quote-en: |
  TouchDesigner is a visual development platform that equips you with the tools you need to create stunning realtime projects and rich user experiences.
quote-zh: null
sources:
  - https://derivative.ca/product
  - https://derivative.ca/

license: 引用合理使用
notes: |
  - 已访问 `/product` 页首段产品描述；**未出现** “Gaussian splatting”“3D Gaussian” 字面。2025 更新新闻提到 POPs（Point Operators）但未在摘录中将其等同于 3DGS。
  - 社区 GLSL/Compute 实现若存在，应附仓库链接后改 `implementation`；当前保守 `none`。
  - `UserGuide/Introduction` 路径曾 404，故未使用。
---

# 原文摘录 / 链接证据

自 sources 第 1 条：

> TouchDesigner is a visual development platform that equips you with the tools you need to create stunning realtime projects and rich user experiences. Whether you're creating interactive media systems, architectural projections, live music visuals, or rapid-prototyping your latest ideas, TouchDesigner is the platform that can do it all.

## 工作流速记

在 TouchDesigner 中做实时视觉时常用 TOP/CHOP/GLSL；若需 splat，可评估自定义着色器或外部引擎纹理回读，但非产品内置 Gaussian 工作流。
