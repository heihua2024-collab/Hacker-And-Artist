---
# === 通用必填 ===
slug: nuke-3dgs-support
type: engine-support
title-zh: Foundry Nuke
title-en: Foundry Nuke

# === 引擎/软件特定字段 ===
engine-name: Nuke
engine-vendor: Foundry
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
source-url: https://www.foundry.com/products/nuke
source-author: null
captured-at: 2026-04-29
captured-by: auto
language: en
verification: pending
verified-by: null
verified-at: null

# === 反幻觉 ===
quote-en: |
  Nuke lives at the heart of the Nuke Family, offering a powerful node-based compositing toolkit with over 200 nodes available in its scalable node graph.
quote-zh: null
sources:
  - https://www.foundry.com/products/nuke
  - https://www.foundry.com/products/nuke-family/nuke

license: 引用合理使用
notes: |
  - Foundry 公开产品页描述节点合成、Deep 合成与集成 3D 环境；**未检索到** “3D Gaussian Splatting”“Gaussian splat” 字面。
  - 页面提到传统 Particle System 文章链接，不等同于 3DGS 支持；无已引节点名则保持 `splat-render: none`。
---

# 原文摘录 / 链接证据

自 sources 第 1 条：

> Nuke lives at the heart of the Nuke Family, offering a powerful node-based compositing toolkit with over 200 nodes available in its scalable node graph. Its Deep compositing tools reduce the need to re-render CG elements when content changes whilst its integrated 3D environment and projection workflows offer a limitless workspace, so artists can easily create and render complex 3D scenes.

## 工作流速记

Nuke 擅长合成与投影；若要将 3DGS 用于影视流程，通常需先在游戏引擎或 Omniverse 中渲染为 EXR/序列再进入 Nuke，而非直接 splat 交互编辑。
