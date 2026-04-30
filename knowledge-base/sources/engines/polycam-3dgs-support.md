---
# === 通用必填 ===
slug: polycam-3dgs-support
type: engine-support
title-zh: Polycam
title-en: Polycam

# === 引擎/软件特定字段 ===
engine-name: Polycam
engine-vendor: Polycam Inc.
engine-category: mobile-platform
engine-platforms:
  - ios
  - android
  - web
engine-pricing: freemium

# === 3DGS 兼容性 ===
splat-import: false
splat-import-formats: []
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
source-url: https://poly.cam/tools/gaussian-splatting
source-author: null
captured-at: 2026-04-29
captured-by: auto
language: en
verification: pending
verified-by: null
verified-at: null

# === 反幻觉 ===
quote-en: |
  Gaussian splatting can effectively render shiny, reflective objects as well as long and thin details. Splatting also excels at capturing large, expansive spaces without sacrificing smaller details.
quote-zh: null
sources:
  - https://poly.cam/tools/gaussian-splatting
  - https://poly.cam/object-capture
  - https://apps.apple.com/us/app/polycam-3d-scanner-lidar-360/id1532482376

license: 引用合理使用
notes: |
  - `engine-vendor`：App Store 信息区写「The developer, Polycam Inc.」及 Seller「Polycam Inc.」。
  - `engine-pricing: freemium`：同页「Free · In‑App Purchases」。
  - `splat-import: false`：已访问的 poly.cam 工具页说明通过上传 PNG/JPG/mp4 **创建** Gaussian Splat，未描述「导入任意第三方已训练 .ply/.splat 作为唯一输入并在应用内仅做查看」；TASK 所问「外来 ReshotAI 输出」在此来源集合中**无**支持声明。
  - `splat-export: true` 与 `.ply`：App Store 文案写 Pro 功能可「Export ... color point clouds (.ply)」；属产品导出能力描述，非权限声明。
  - `splat-import-formats: []`：未在已访问页面找到「导入外部 splat 文件格式列表」明文。
  - `splat-render: native`：工具页写「Rotate, pan, and zoom」及上文对 splat 渲染能力的描述，指向 Polycam 产品内查看由本平台处理链生成的 splat。
  - `splat-edit: true`：工具页「Fully featured suite of splat editing tools」。
  - learn.poly.cam 帮助中心 URL 在本环境请求返回 403，未作为来源；若需官方导出工作流细则请人工在可访问网络下补抓。
  - `first-supported` / `latest-tested-version: null`。
---

# 原文摘录 / 链接证据

自 sources 第 1 条（poly.cam/tools/gaussian-splatting）：

> Gaussian splatting can effectively render shiny, reflective objects as well as long and thin details. Splatting also excels at capturing large, expansive spaces without sacrificing smaller details.

同页交互与编辑：

> Rotate, pan, and zoom in on finer details

> Fully featured suite of splat editing tools

> Downloadable mesh for any Gaussian Splat

创建流程（输入为图像/视频，而非外来 splat 文件）：

> Your image set should be between 20 and 200 images in either PNG or JPG format, and your video field should be in the mp4 format.

自 sources 第 2 条（poly.cam/object-capture）：

> Unmatched export compatibility

> 2.6M
>
> File exports generated in 2024 – Delivering seamless integration into CAD, BIM, and visualization software.

自 sources 第 3 条（App Store 应用描述，节选）：

> Convert everyday photos into stunning 3D models with photogrammetry and Gaussian splats

> Export detailed 3D models (.obj, .dae, .fbx, .stl) and color point clouds (.dxf, .ply) directly into your favorite 3D software

> The developer, Polycam Inc., indicated that the app’s privacy practices may include handling of data as described below.

## 工作流速记

在 iOS/Android 或 poly.cam 网页按工具页流程上传照片或视频生成 Gaussian Splat，于应用或 Web 中旋转/平移/缩放查看；导出含 `.ply` 的点云等格式见 App Store 所列 Pro 导出能力。若持第三方已训练 splat 文件希望仅导入查看，本条所引公开页**未**承诺该路径。
