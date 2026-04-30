---
# === 通用必填 ===
slug: nvidia-omniverse-3dgs-support
type: engine-support
title-zh: NVIDIA Omniverse
title-en: NVIDIA Omniverse

# === 引擎/软件特定字段 ===
engine-name: Omniverse (Kit / RTX)
engine-vendor: NVIDIA
engine-category: dcc
engine-platforms:
  - windows
  - linux
engine-pricing: null

# === 3DGS 兼容性 ===
splat-import: true
splat-import-formats:
  - ply
splat-export: null
splat-render: native
splat-edit: null
splat-render-method: rasterization

# === 实现方式 ===
implementation: official
plugin-name: null
plugin-url: null
plugin-author: null
first-supported: null
latest-tested-version: null

# === 来源与抓取 ===
source-url: https://docs.omniverse.nvidia.com/materials-and-rendering/latest/particle-fields.html
source-author: null
captured-at: 2026-04-29
captured-by: auto
language: en
verification: pending
verified-by: null
verified-at: null

# === 反幻觉 ===
quote-en: |
  Particle Fields are a new geometry type in OpenUSD for rendering 3D Gaussian Splats (3DGS) and other radiance fields such as 3D Gaussian Unscented Transforms (3DGUT). Omniverse RTX renders these fields natively, with full path-tracing.
quote-zh: null
sources:
  - https://docs.omniverse.nvidia.com/materials-and-rendering/latest/particle-fields.html
  - https://openusd.org/release/user_guides/schemas/usdVol/ParticleField.html

license: 引用合理使用
notes: |
  - `splat-import: true`：官方文档「Importing 3D Gaussian Splats into Omniverse」写明需先将 `.ply` 转为 OpenUSD（示例脚本 `py3dgsPlyToUsd.py`），再拖入场景；导入路径存在但非「直接吃任意二进制无需转换」。
  - `splat-export: null`：已引页面描述导入与渲染；未在同一摘录中给出将编辑后场景导出回标准 3DGS `.ply` 的官方流程句。
  - `splat-edit: null`：文档聚焦渲染与光照/阴影行为，未描述 TASK 定义的单高斯编辑 UI。
  - sources 第 2 条为 OpenUSD `ParticleField` 模式说明，佐证 Omniverse 文档中「新几何类型」表述与标准一致。
  - `engine-pricing: null`：未在引文中抓取许可证价格句。
---

# 原文摘录 / 链接证据

自 sources 第 1 条：

> Particle Fields are a [new geometry type in OpenUSD](https://openusd.org/release/user_guides/schemas/usdVol/ParticleField.html) for rendering 3D Gaussian Splats (3DGS) and other radiance fields such as 3D Gaussian Unscented Transforms (3DGUT).
>
> Omniverse RTX renders these fields natively, with full path-tracing.

导入流程：

> To import a 3D Gaussian Splat into Omniverse, you must first convert it from a .ply to OpenUSD format.

命令行示例：

> python py3dgsPlyToUsd.py --input path/to/your/model.ply --output path/to/output.usd

## 工作流速记

将训练好的 3DGS `.ply` 用 OpenUSD 仓库示例脚本转为 USD，再在 Omniverse Kit 内容浏览器拖入舞台；RTX 以 Particle Field 原语路径追踪渲染，可与网格等互相投影阴影（文档另有阴影/颜色管线说明）。
