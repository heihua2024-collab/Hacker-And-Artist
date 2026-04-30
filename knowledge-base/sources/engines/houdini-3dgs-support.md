---
# === 通用必填 ===
slug: houdini-3dgs-support
type: engine-support
title-zh: Houdini
title-en: Houdini

# === 引擎/软件特定字段 ===
engine-name: Houdini
engine-vendor: null
engine-category: dcc
engine-platforms:
  - windows
  - macos
  - linux
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
source-url: https://www.sidefx.com/products/houdini/
source-author: null
captured-at: 2026-04-29
captured-by: auto
language: en
verification: pending
verified-by: null
verified-at: null

# === 反幻觉 ===
quote-en: |
  Houdini combines superior performance and dramatic, ease-of-use to deliver a powerful and accessible 3D experience for VFX artists creating feature films, commercials or video games.
quote-zh: null
sources:
  - https://www.sidefx.com/products/houdini/
  - https://www.sidefx.com/docs/houdini/

license: 引用合理使用
notes: |
  - sources 第 1 条为产品概述页；已读正文未出现 “Gaussian splatting”“3D Gaussian” 等短语。
  - sources 第 2 条为官方文档站点根（作为第二来源占位）；若需更强否定证据，应检索 docs 内具体节点名并更新 quote。
  - 在缺乏官方「导入/渲染 3DGS」句的情况下，`splat-*` 字段按 TASK 填保守值；`implementation: none` 表示未发现 SideFX 官方一等公民 3DGS 管线。
---

# 原文摘录 / 链接证据

自 sources 第 1 条：

> Houdini combines superior performance and dramatic, ease-of-use to deliver a powerful and accessible 3D experience for VFX artists creating feature films, commercials or video games.

## 工作流速记

SideFX 公开产品叙述聚焦程序化建模与 VFX；未见与 Polycam/PlayCanvas 同级的官方 3DGS 导入说明。可在外部生成 splat 后以通用几何/点云管线间接使用（需项目自行验证）。
