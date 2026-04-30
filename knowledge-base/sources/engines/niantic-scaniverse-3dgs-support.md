---
# === 通用必填 ===
slug: niantic-scaniverse-3dgs-support
type: engine-support
title-zh: Scaniverse（Niantic Spatial Capture）
title-en: Scaniverse (Niantic Spatial Capture)

# === 引擎/软件特定字段 ===
engine-name: Scaniverse
engine-vendor: Niantic Spatial, Inc.
engine-category: mobile-app
engine-platforms:
  - ios
  - android
  - web
engine-pricing: null

# === 3DGS 兼容性 ===
splat-import: false
splat-import-formats: null
splat-export: true
splat-render: native
splat-edit: false
splat-render-method: rasterization

# === 实现方式 ===
implementation: official
plugin-name: null
plugin-url: null
plugin-author: null
first-supported: null
latest-tested-version: null

# === 来源与抓取 ===
source-url: https://scaniverse.com/news/spz-gaussian-splat-open-source-file-format
source-author: null
captured-at: 2026-04-29
captured-by: auto
language: en
verification: pending
verified-by: null
verified-at: null

# === 反幻觉 ===
quote-en: |
  Photorealistic results: Generate Gaussian Splats and meshes processed efficiently on-device.
quote-zh: null
sources:
  - https://scaniverse.com/news/spz-gaussian-splat-open-source-file-format
  - https://www.nianticspatial.com/

license: 引用合理使用
notes: |
  - 与 Polycam 条目类似：**生产型**扫描应用——页面强调设备端生成 Gaussian Splats、导出含开源 **SPZ** 等格式；**未描述**「用户仅持第三方 ReshotAI 已训练 `.ply` 作为唯一输入并仅查看」的专用入口，故 `splat-import: false`（对任意外来 splat 文件）保守处理。
  - `splat-export: true`：同页「Export scans in standard 3D formats - including our open-source SPZ format」。
  - `splat-edit: false`：已引文案未承诺 TASK 定义的单高斯编辑；若有独立编辑功能需另附帮助页。
  - `splat-render: native`：基于「Generate Gaussian Splats … on-device」的已引产品叙述。
---

# 原文摘录 / 链接证据

自 sources 第 1 条：

> Export or integrate seamlessly: Export scans in standard 3D formats - including our open-source SPZ format, reducing file size by 90%.

> Photorealistic results: Generate Gaussian Splats and meshes processed efficiently on-device.

## 工作流速记

使用 Scaniverse / Niantic Spatial Capture 在移动或 Web 端采集环境，在设备上重建并导出 SPZ 等格式；若需合并外部训练的 splat，需核实当前版本是否提供通用 PLY 导入（本条无已引证据）。
