---
# === 通用必填 ===
slug: davinci-resolve-3dgs-support
type: engine-support
title-zh: DaVinci Resolve
title-en: DaVinci Resolve

# === 引擎/软件特定字段 ===
engine-name: DaVinci Resolve
engine-vendor: Blackmagic Design
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
source-url: https://www.blackmagicdesign.com/products/davinciresolve
source-author: null
captured-at: 2026-04-29
captured-by: auto
language: en
verification: pending
verified-by: null
verified-at: null

# === 反幻觉 ===
quote-en: |
  DaVinci Resolve is the world's only solution that combines editing, color correction, visual effects, motion graphics, audio post production and now photo editing all in one software tool!
quote-zh: null
sources:
  - https://www.blackmagicdesign.com/products/davinciresolve
  - https://www.blackmagicdesign.com/products/davinciresolve/whatsnew

license: 引用合理使用
notes: |
  - 产品页强调剪辑、调色、Fusion、Fairlight、Photo 等合一工作流；已抓取正文 **未出现** “Gaussian”“splatting” 关键词。
  - Fusion 页内若存在 splat 节点需单独抓取并更新本条；当前无已引证据故 `splat-render: none`。
---

# 原文摘录 / 链接证据

自 sources 第 1 条：

> DaVinci Resolve is the world's only solution that combines editing, color correction, visual effects, motion graphics, audio post production and now photo editing all in one software tool!

## 工作流速记

Resolve 面向影视后期与调色；交互式 3DGS 编辑不在已引公开叙述中。可将预渲染片段作为媒体使用，或在外部 DCC 完成 splat 再导入平面合成。
