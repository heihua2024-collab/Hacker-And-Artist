---
# === 通用必填 ===
slug: godot-3dgs-support
type: engine-support
title-zh: Godot Engine
title-en: Godot Engine

# === 引擎/软件特定字段 ===
engine-name: Godot Engine
engine-vendor: null
engine-category: game-engine
engine-platforms:
  - windows
  - macos
  - linux
engine-pricing: null

# === 3DGS 兼容性 ===
splat-import: true
splat-import-formats:
  - ply
  - compressed.ply
  - splat
  - sog
splat-export: false
splat-render: plugin
splat-edit: false
splat-render-method: rasterization

# === 实现方式 ===
implementation: community-plugin
plugin-name: gdgs (godot-gaussian-splatting / ReconWorldLab)
plugin-url: https://github.com/ReconWorldLab/godot-gaussian-splatting
plugin-author: mianzhi
first-supported: null
latest-tested-version: null

# === 来源与抓取 ===
source-url: https://github.com/ReconWorldLab/godot-gaussian-splatting
source-author: null
captured-at: 2026-04-29
captured-by: auto
language: en
verification: pending
verified-by: null
verified-at: null

# === 反幻觉 ===
quote-en: |
  3DGS does not follow Godot's native mesh rendering pipeline, and Godot does not currently provide built-in support for importing, rendering, and compositing 3D Gaussian Splatting content.
quote-zh: null
sources:
  - https://raw.githubusercontent.com/ReconWorldLab/godot-gaussian-splatting/main/README.md
  - https://raw.githubusercontent.com/ReconWorldLab/godot-gaussian-splatting/main/addons/gdgs/plugin.cfg

license: 引用合理使用
notes: |
  - `plugin-author`：sources 第 2 条 `plugin.cfg` 中 `author="mianzhi"`（README 亦可能列出组织名 Maintainer，以 cfg 为准）。
  - `splat-import: true` 与格式列表：README「0x07 Supported Formats」列出 `f_dc_*`、`f_rest_*`、`opacity`、`scale_*`、`rot_*` 等 3DGS PLY 属性及 `.splat`/`.sog`。
  - `splat-render: plugin`：同上引用表明核心 Godot **无**内建 3DGS，依赖 `addons/gdgs`。
  - `splat-export: false`：已读 README 未描述将编辑后场景写回标准 3DGS PLY 的导出路径；无已引用源码证据。
  - `splat-edit: false`：README 强调渲染与合成，未描述 TASK 定义的单高斯删除/调色等编辑 UI。
  - `engine-vendor`：Godot 官方基金会名称未在所引 README 句中出现，填 null。
  - `plugin.cfg` 作为来源第 2 条仅用于核对插件元数据（抓取时若路径需随仓库布局调整）。
---

# 原文摘录 / 链接证据

自 sources 第 1 条：

> 3DGS does not follow Godot's native mesh rendering pipeline, and Godot does not currently provide built-in support for importing, rendering, and compositing 3D Gaussian Splatting content.

格式说明（节选）：

> - Position: `x`, `y`, `z`
> - DC color coefficients: `f_dc_0`, `f_dc_1`, `f_dc_2`

自 sources 第 2 条（`plugin.cfg`）：

> author="mianzhi"

## 工作流速记

在 Godot 4.4+ 启用 Forward Plus，安装 `addons/gdgs` 插件，导入 `.ply`/`.compressed.ply`/`.splat`/`.sog`，用 `GaussianSplatNode` + `CompositorEffect` 与场景深度合成渲染。
