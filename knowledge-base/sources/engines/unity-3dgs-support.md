---
# === 通用必填 ===
slug: unity-3dgs-support
type: engine-support
title-zh: Unity
title-en: Unity

# === 引擎/软件特定字段 ===
engine-name: Unity
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
  - spz
splat-export: true
splat-render: plugin
splat-edit: true
splat-render-method: rasterization

# === 实现方式 ===
implementation: community-plugin
plugin-name: UnityGaussianSplatting (org.nesnausk.gaussian-splatting)
plugin-url: https://github.com/aras-p/UnityGaussianSplatting
plugin-author: Aras Pranckevicius
first-supported: null
latest-tested-version: null

# === 来源与抓取 ===
source-url: https://github.com/aras-p/UnityGaussianSplatting
source-author: null
captured-at: 2026-04-29
captured-by: auto
language: en
verification: pending
verified-by: null
verified-at: null

# === 反幻觉 ===
quote-en: |
  that is really cool! Check out their website, source code repository, data sets and so on. I've decided to try to implement the realtime visualization part (i.e. the one that takes already-produced
  gaussian splat "model" file) in Unity.
quote-zh: null
sources:
  - https://raw.githubusercontent.com/aras-p/UnityGaussianSplatting/main/readme.md
  - https://raw.githubusercontent.com/aras-p/UnityGaussianSplatting/main/package/package.json
  - https://raw.githubusercontent.com/aras-p/UnityGaussianSplatting/main/package/Editor/GaussianSplatRendererEditor.cs
  - https://raw.githubusercontent.com/aras-p/UnityGaussianSplatting/main/docs/splat-editing.md
  - https://github.com/aras-p/UnityGaussianSplatting/commit/2c6fed37da67a217367261fcfcd3316d34c73e76

license: 引用合理使用
notes: |
  - `engine-vendor` / `engine-pricing: null`：本条所引 readme、package.json 未对 Unity 编辑器商业条款或厂商名给出可逐字支撑的句子。
  - `plugin-author` 与 `org.nesnausk.gaussian-splatting` 版本信息：摘自 sources 第 2 条 package.json 字段 `"author": "Aras Pranckevicius"` 与 `"version": "1.1.1"`。
  - `splat-import: true` 与格式列表：readme 写明从「OG」论文 PLY 与 Scaniverse SPZ 创建 GaussianSplat 资产，并指向 `GaussianSplatRenderer` 渲染；非 Unity 引擎通用 Mesh 导入器。
  - `splat-export: true`：依据 sources 第 3 条 C# 中 `ExportPlyFile` 写入含 `f_dc_*`、`f_rest_*`、`opacity`、`scale_*`、`rot_*` 的 PLY 头与顶点数据（非 manifest 权限句）。
  - `splat-edit: true`：sources 第 4 条文档描述矩形选择、删除、移动及 `Export modified PLY`。
  - `first-supported` / `latest-tested-version`：readme 未给出首次发布日期；未本地跑 Unity，填 null。维护时间：sources 第 5 条 merge 提交日期 2025-10-17（UTC）。
  - Unity 引擎本体不含 3DGS；本条记录的是 Aras Pranckevičius 仓库插件路径，故 `splat-render: plugin`。
---

# 原文摘录 / 链接证据

自 sources 第 1 条（readme.md）：

> that is really cool! Check out their website, source code repository, data sets and so on. I've decided to try to implement the realtime visualization part (i.e. the one that takes already-produced
> gaussian splat "model" file) in Unity.

同文件关于输入格式与菜单：

> In the dialog, point `Input PLY/SPZ File` to your Gaussian Splat file. Currently two
> file formats are supported:
> - PLY format from the original 3DGS paper

自 sources 第 2 条（package.json）：

> "author": "Aras Pranckevicius"

自 sources 第 3 条（GaussianSplatRendererEditor.cs，`ExportPlyFile` 内 PLY 头字符串片段，证明写出 f_dc / f_rest 等属性名）：

> property float f_dc_0
> property float f_dc_1
> property float f_dc_2
> property float f_rest_0

（同一函数内对 `FileStream` 写入二进制顶点数据，略。）

自 sources 第 4 条（splat-editing.md）：

> If you have edited the splats, or have created any cutout objects, there's `Export modified PLY`
> button in the inspector to export the result back into regular Gaussian Splat `.ply` file.

自 sources 第 5 条（GitHub commit 元数据）：

> Date: 2025-10-17T07:21:37Z

## 工作流速记

在 Unity 2022.3 类版本打开示例工程，通过菜单 `Tools -> Gaussian Splats -> Create GaussianSplatAsset` 指向 3DGS PLY 或 SPZ，生成资产后挂到带 `GaussianSplatRenderer` 的对象上在 Editor/Player 中实时渲染；需 D3D12/Metal/Vulkan。导出编辑后的 splat 用 Inspector 中 `Export PLY`（见源码 `ExportPlyFile`）。此为第三方包，非 Unity 自带功能。
