---
# === 通用必填 ===
slug: maya-3dgs-support
type: engine-support
title-zh: Autodesk Maya
title-en: Autodesk Maya

# === 引擎/软件特定字段 ===
engine-name: Maya
engine-vendor: Autodesk
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
source-url: https://www.autodesk.com/products/maya/overview
source-author: null
captured-at: 2026-04-29
captured-by: auto
language: en
verification: pending
verified-by: null
verified-at: null

# === 反幻觉 ===
quote-en: |
  Maya is professional 3D software for creating realistic characters and blockbuster-worthy effects.
quote-zh: null
sources:
  - https://www.autodesk.com/products/maya/overview
  - https://www.autodesk.com/products/maya/features

license: 引用合理使用
notes: |
  - `engine-vendor: Autodesk`：产品页品牌与页脚出现 Autodesk。
  - 已访问 overview/features 公开营销文案中 **未检索到** “3D Gaussian Splatting”“Gaussian splat” 字面；故 splat 相关布尔与 `implementation: none`。
  - 若存在第三方 Maya 插件支持 3DGS，应另开条目或在本条 `notes` 加链接并升 `implementation`——当前无已引用证据。
---

# 原文摘录 / 链接证据

自 sources 第 1 条：

> Maya is professional 3D software for creating realistic characters and blockbuster-worthy effects.

## 工作流速记

Maya 官方公开页面强调角色与特效管线；3DGS 作为新兴表示法未在已引页面声明为一等公民。工作流上多在专用工具生成 splat 后再做转码或在外部引擎查看。
