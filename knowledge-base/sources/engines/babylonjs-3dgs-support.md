---
# === 通用必填 ===
slug: babylonjs-3dgs-support
type: engine-support
title-zh: Babylon.js
title-en: Babylon.js

# === 引擎/软件特定字段 ===
engine-name: Babylon.js
engine-vendor: null
engine-category: web-engine
engine-platforms:
  - web
engine-pricing: null

# === 3DGS 兼容性 ===
splat-import: true
splat-import-formats:
  - ply
  - splat
  - spz
  - sog
  - sogs
splat-export: true
splat-render: native
splat-edit: true
splat-render-method: rasterization

# === 实现方式 ===
implementation: official
plugin-name: null
plugin-url: null
plugin-author: null
first-supported: null
latest-tested-version: null

# === 来源与抓取 ===
source-url: https://doc.babylonjs.com/features/featuresDeepDive/mesh/gaussianSplatting
source-author: null
captured-at: 2026-04-29
captured-by: auto
language: en
verification: pending
verified-by: null
verified-at: null

# === 反幻觉 ===
quote-en: |
  Gaussian Splatting is a volume rendering method. It's useful to capture real-life data. The difference with other technics like photogrammetry is the end result consists in a point cloud with each point rendered as a semi transparent ellipsoid projected onto a billboard.
quote-zh: null
sources:
  - https://doc.babylonjs.com/features/featuresDeepDive/mesh/gaussianSplatting
  - https://github.com/BabylonJS/Babylon.js/releases/tag/7.0.0
  - https://raw.githubusercontent.com/BabylonJS/Babylon.js/master/packages/dev/core/src/Meshes/GaussianSplatting/gaussianSplattingMesh.ts

license: 引用合理使用
notes: |
  - `splat-render: native`：7.0.0 发行说明 Major updates 列「Gaussian Splatting」链接至官方文档；引擎内置 `GaussianSplattingMesh` 等实现（见 sources 第 3 条路径），非第三方插件。
  - `splat-import-formats`：与官方文档「Supported formats」列表一致（.PLY、.splat、.spz、.SOG/SOGS）；表格内 `sog`/`sogs` 为文件名小写化写法，原文为 `.SOG/SOGS`。
  - `splat-export: true`：官方文档「Updating and downloading datas of a Gaussian Splatting」示例调用 `BABYLON.Tools.DownloadBlob(blob, "newGSplat.splat")`，在修改内存 splat 数据后下载二进制，属功能描述而非权限句。
  - `splat-edit: true`：同节示例对 `positions` 数组循环修改并 `updateData`，属面向用户的数据修改示例。
  - `first-supported`：发行页给出版本 7.0.0 与创建时间 2024-03-28T11:36:31Z；是否写入「首次商业可用」由人工定夺，字段暂 null 以避免过度解读。
  - `engine-vendor` / `engine-pricing: null`：已访问 doc 页面未列 Babylon.js 商业授权主体句子。
---

# 原文摘录 / 链接证据

自 sources 第 1 条（官方文档）：

> Gaussian Splatting is a volume rendering method. It's useful to capture real-life data. The difference with other technics like photogrammetry is the end result consists in a point cloud with each point rendered as a semi transparent ellipsoid projected onto a billboard.

同页 Supported formats：

> - .PLY
> - .splat that is Javascript types serialized version of .PLY datas
> - Niantic Labs .spz format

加载示例：

> Load asynchronously the splat or PLY file like any other supported file format:

> `BABYLON.ImportMeshAsync("https://assets.babylonjs.com/splats/gs_Skull.splat", scene)`

下载修改后数据（节选）：

> `BABYLON.Tools.DownloadBlob(blob, "newGSplat.splat");`

自 sources 第 2 条（GitHub Release 7.0.0 页面）：

> - Gaussian Splatting [Doc](https://aka.ms/babylon7GSplatDoc)

> Created: 2024-03-28T11:36:31Z

自 sources 第 3 条（gaussianSplattingMesh.ts 文件头常量）：

> const _GaussianSplattingBytesPerSplat = 32;

## 工作流速记

在 Babylon.js 7.0 及以上版本使用 `ImportMeshAsync` 或文档示例加载 `.splat`/`.ply`/`.spz` 等；场景内用 `GaussianSplattingMesh` API 更新与下载数据。此为引擎内置能力，无需单独安装社区 splat 插件。
