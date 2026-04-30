---
# === 通用必填 ===
slug: unreal-engine-3dgs-support
type: engine-support
title-zh: Unreal Engine
title-en: Unreal Engine

# === 引擎/软件特定字段 ===
engine-name: Unreal Engine
engine-vendor: null
engine-category: game-engine
engine-platforms:
  - windows
engine-pricing: null

# === 3DGS 兼容性 ===
splat-import: true
splat-import-formats:
  - ply
splat-export: false
splat-render: plugin
splat-edit: true
splat-render-method: rasterization

# === 实现方式 ===
implementation: community-plugin
plugin-name: XV3dGS (XScene-UEPlugin)
plugin-url: https://github.com/xverse-engine/XScene-UEPlugin
plugin-author: XVERSE Technology Inc.
first-supported: null
latest-tested-version: null

# === 来源与抓取 ===
source-url: https://github.com/xverse-engine/XScene-UEPlugin
source-author: null
captured-at: 2026-04-29
captured-by: auto
language: en
verification: pending
verified-by: null
verified-at: null

# === 反幻觉 ===
quote-en: |
  Currently, our plugin is implemented based on UE5 Niagara, fully exploiting the advantage of the features provided by UE5 to realize efficient rendering and managing for Guassian Splatting models.
quote-zh: null
sources:
  - https://raw.githubusercontent.com/xverse-engine/XScene-UEPlugin/main/UEPlugin/README.md
  - https://raw.githubusercontent.com/xverse-engine/XScene-UEPlugin/main/README.md
  - https://github.com/xverse-engine/XScene-UEPlugin/commit/09833b8dc439db8307785ed777ae80e6a71ce4a9

license: 引用合理使用
notes: |
  - `plugin-author`：与 sources 第 2 条根 README 句子「developed by XVERSE Technology Inc. (Shenzhen, China)」中的组织名一致，摘录为 `XVERSE Technology Inc.`（未含城市后缀）。
  - `splat-import: true` 与 `ply`：依据 UEPlugin README「Easily importing and converting from the original Gaussian Splatting scene (.ply file) to ours」及「Load PLY」流程说明；**未**在公开仓库中找到可引用的 Import 源码 `.cpp`（插件以 `Binaries/...dll` 形式提供），若审核要求与第二批相同的「源码级 Import 证据」，本条应降级为 false 或标为待核验。
  - `splat-export: false`：已读 UEPlugin README 未见将编辑后场景写回标准 3DGS PLY（含球谐/协方差通道）的说明；未检索到可引用的 Export 实现文本或源码。
  - `splat-edit: true`：同 README「RTS and volume based crop」「Change color」「Model Clipping」等面向用户的编辑与裁剪描述。
  - `engine-platforms` 仅列 windows：README「System Requirements」写 Windows 10/11；未声称 macOS 编辑器支持，故不写入。
  - `first-supported` / `latest-tested-version: null`。维护：sources 第 3 条提交日期 2025-07-30（UTC）。
  - Unreal Engine 核心无内置 3DGS 渲染；`splat-render: plugin`。
---

# 原文摘录 / 链接证据

自 sources 第 1 条（UEPlugin/README.md）：

> Currently, our plugin is implemented based on UE5 Niagara, fully exploiting the advantage of the features provided by UE5 to realize efficient rendering and managing for Guassian Splatting models.

同文件功能列表：

> - Easily importing and converting from the original Gaussian Splatting scene (.ply file) to ours

导入操作说明：

> ### **After v1.1.3, this plugin supports dragging multiple ply files directly into the Content Browser and importing them.**

演示数据说明：

> `demo_fox_gs.ply` and `demo_office_gs.ply` are 3DGS models trained by XV3DTools, which can be imported into Unreal Engine (UE) using this plugin for real-time rendering.

自 sources 第 2 条（仓库根 README.md）：

> XScene-UEPlugin is an Unreal Engine 5 (UE5) plugin developed by XVERSE Technology Inc. (Shenzhen, China).

自 sources 第 3 条（GitHub commit 页面元数据）：

> Date: 2025-07-30T02:58:04Z

## 工作流速记

将 Release 中对应 UE 版本的 `XV3dGS` 插件目录放入项目 `Plugins`，启用 Niagara；按 UEPlugin README 在 Window/XV3dgs 或 Content Browser 使用「Load PLY」导入 `.ply`，生成蓝图后拖入关卡实时渲染。训练侧另有 XV3DTools 产出 ply，与本条「已训练文件渲染」相关但属独立可执行工具。
