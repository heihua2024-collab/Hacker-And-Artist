---
# === 通用必填 ===
slug: blender-3dgs-support
type: engine-support
title-zh: Blender
title-en: Blender

# === 引擎/软件特定字段 ===
engine-name: Blender                       # 软件名称
engine-vendor: Blender Foundation          # 厂商/维护方
engine-category: 3d-software               # 见下方枚举
engine-platforms:                          # 操作系统
  - windows
  - macos
  - linux
engine-pricing: free                       # free | freemium | paid | open-source

# === 3DGS 兼容性 ===
splat-import: true                         # 能否导入 .splat / .ply / .ksplat
splat-import-formats:                      # 支持哪些格式
  - ply
  - splat
splat-export: false                        # 能否导出
splat-render: native                       # native | plugin | external | none
splat-edit: false                          # 能否在引擎内编辑高斯体
splat-render-method: rasterization         # rasterization | path-tracing | hybrid

# === 实现方式 ===
implementation: official-plugin            # official | official-plugin | community-plugin | manual-import
plugin-name: KIRI Engine Plugin            # 如果是 plugin，名称
plugin-url: https://...
plugin-author: KIRI Innovations
first-supported: 2024-03                   # 首次支持的版本/日期
latest-tested-version: 4.1.0               # 你测试过的最新版本

# === 来源与抓取 ===
source-url: https://...
source-author: KIRI Innovations
captured-at: 2026-04-29
captured-by: auto
language: en
verification: pending
verified-by: null
verified-at: null

# === 反幻觉 ===
quote-en: |
  Verbatim quote 30-60 chars confirming this software supports 3DGS.
quote-zh: null
sources:
  - https://...
  - https://...

license: 引用合理使用
notes: |
  -
---

# 原文摘录 / 链接证据

（贴你访问过的页面里"这个软件支持/不支持 3DGS"的相关原文。）

> 原文摘录...

## 工作流速记

（一句话讲：用户怎么把一个 .splat 文件加载进这个软件？）

---

## engine-category 枚举

- `3d-software` — Blender / Maya / 3ds Max / Cinema 4D / Houdini
- `game-engine` — Unity / Unreal / Godot
- `web-engine` — three.js / babylon.js / PlayCanvas
- `xr-platform` — Vision Pro / Quest / Pico SDK
- `viewer-only` — SuperSplat / Niantic Studio / Splat Viewer
- `cad` — SolidWorks / Rhino / Fusion 360
- `mobile-platform` — iOS / Android native runtime
- `compositing` — After Effects / Nuke / DaVinci Resolve
