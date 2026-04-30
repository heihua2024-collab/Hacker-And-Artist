---
# === 通用必填 ===
slug: 3ds-max-3dgs-support
type: engine-support
title-zh: 3ds Max
title-en: 3ds Max

# === 引擎/软件特定字段 ===
engine-name: 3ds Max
engine-vendor: Autodesk
engine-category: dcc
engine-platforms:
  - windows
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
source-url: https://www.autodesk.com/products/3ds-max/overview
source-author: null
captured-at: 2026-04-29
captured-by: auto
language: en
verification: pending
verified-by: null
verified-at: null

# === 反幻觉 ===
quote-en: |
  3ds Max is 3D modeling and rendering software for design visualization, games, and animation.
quote-zh: null
sources:
  - https://www.autodesk.com/products/3ds-max/overview
  - https://www.autodesk.com/products/3ds-max/features

license: 引用合理使用
notes: |
  - `engine-vendor: Autodesk`：产品页出现 Autodesk 品牌。
  - 公开 overview/features 文案中 **未出现** “Gaussian splatting”“3D Gaussian” 短语；`splat-*` 保守为 false/none/null。
  - Windows 专用 DCC；与 Maya 条目同理，官方一等公民 3DGS 证据缺失。
---

# 原文摘录 / 链接证据

自 sources 第 1 条：

> 3ds Max is 3D modeling and rendering software for design visualization, games, and animation.

## 工作流速记

3ds Max 面向建筑可视化与游戏资产；未见官方页面将 3D Gaussian Splatting 列为原生导入/渲染格式。 splat 内容通常在外部生成与预览。
