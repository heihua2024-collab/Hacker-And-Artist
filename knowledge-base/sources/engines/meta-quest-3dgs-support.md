---
# === 通用必填 ===
slug: meta-quest-3dgs-support
type: engine-support
title-zh: Meta Quest 平台
title-en: Meta Quest platform

# === 引擎/软件特定字段 ===
engine-name: Meta Quest (OpenXR runtime)
engine-vendor: Meta
engine-category: xr-platform
engine-platforms:
  - android
engine-pricing: null

# === 3DGS 兼容性 ===
splat-import: false
splat-import-formats: null
splat-export: false
splat-render: external
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
source-url: https://www.khronos.org/openxr/
source-author: null
captured-at: 2026-04-29
captured-by: auto
language: en
verification: pending
verified-by: null
verified-at: null

# === 反幻觉 ===
quote-en: |
  OpenXR is a royalty-free, open standard that provides a common set of APIs for developing XR applications that run across a wide range of AR and VR devices.
quote-zh: null
sources:
  - https://www.khronos.org/openxr/
  - https://www.w3.org/TR/webxr/

license: 引用合理使用
notes: |
  - Meta Quest 运行时以 OpenXR 等 API 向应用暴露姿态、合成与输入；**Khronos OpenXR 页面**与 **W3C WebXR** 摘要均未定义 3D Gaussian Splatting 渲染对象。`splat-render: external` 表示 splat 由应用内引擎（Unity、自研 Vulkan/WebGL 等）实现，非平台内建 splat 管线。
  - 抓取时 `developer.oculus.com` 长文档曾超时，本条证据链仅用可稳定抓取的公开规范/行业页；Quest 专有特性未逐条核验。
  - `splat-import: false`：指「头显 OS 级导入任意第三方 3DGS 文件并原生回放」无已引证据；应用可自行分发资产。
---

# 原文摘录 / 链接证据

自 sources 第 1 条：

> OpenXR is a royalty-free, open standard that provides a common set of APIs for developing XR applications that run across a wide range of AR and VR devices.

自 sources 第 2 条（WebXR Abstract）：

> This specification describes support for accessing virtual reality (VR) and augmented reality (AR) devices, including sensors and head-mounted displays, on the Web.

## 工作流速记

在 Quest 上运行 3DGS 内容通常与在其它 OpenXR 设备上类似：由游戏引擎或自定义渲染器在帧循环内绘制 splat，再通过 OpenXR 交换链提交；平台层不提供与 Omniverse Particle Field 同级的官方 splat 基元说明。
