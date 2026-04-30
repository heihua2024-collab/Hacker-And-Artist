---
# === 通用必填 ===
slug: after-effects-3dgs-support
type: engine-support
title-zh: Adobe After Effects
title-en: Adobe After Effects

# === 引擎/软件特定字段 ===
engine-name: After Effects
engine-vendor: Adobe
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
source-url: https://www.adobe.com/products/aftereffects.html
source-author: null
captured-at: 2026-04-29
captured-by: auto
language: en
verification: pending
verified-by: null
verified-at: null

# === 反幻觉 ===
quote-en: |
  Create stunning motion graphics. Animate a logo or character. Add eye-catching visual effects. With After Effects, you can add amazing motion to any video project.
quote-zh: null
sources:
  - https://www.adobe.com/products/aftereffects.html
  - https://www.adobe.com/creativecloud/video/discover-after-effects.html

license: 引用合理使用
notes: |
  - 已访问 Adobe 产品营销页；正文聚焦动态图形与视频特效，**未出现** “Gaussian splatting”“3D Gaussian” 短语。`splat-render: none`。
  - `helpx.adobe.com` 部分帮助主题在本次环境曾返回 5xx，故未用作主来源。
  - 若存在第三方 AE 插件声称支持 3DGS，应附插件商店/README 链接再升 `implementation`。
---

# 原文摘录 / 链接证据

自 sources 第 1 条：

> Create stunning motion graphics. Animate a logo or character. Add eye-catching visual effects. With After Effects, you can add amazing motion to any video project.

## 工作流速记

After Effects 面向合成与动效；未见官方将 3DGS 点云作为标准图层类型。可将渲染好的视频/序列作为素材导入，但非交互式 splat 场景编辑。
