---
# === 通用必填 ===
slug: webxr-3dgs-support
type: engine-support
title-zh: WebXR Device API
title-en: WebXR Device API

# === 引擎/软件特定字段 ===
engine-name: WebXR
engine-vendor: null
engine-category: web-engine
engine-platforms:
  - web
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
source-url: https://www.w3.org/TR/webxr/
source-author: null
captured-at: 2026-04-29
captured-by: auto
language: en
verification: pending
verified-by: null
verified-at: null

# === 反幻觉 ===
quote-en: |
  The WebXR Device API provides the interfaces necessary to enable developers to build compelling, comfortable, and safe immersive applications on the web across a wide variety of hardware form factors.
quote-zh: null
sources:
  - https://www.w3.org/TR/webxr/
  - https://doc.babylonjs.com/features/featuresDeepDive/mesh/gaussianSplatting

license: 引用合理使用
notes: |
  - WebXR 规范 **Abstract** 仅描述访问 VR/AR 设备；**Introduction** 强调会话、帧循环与安全，**未定义** 3DGS 或 splat 原语。`splat-render: external`：典型做法是在 `XRSession` 的 WebGL/WebGPU 帧循环中由 Babylon.js / three.js 等绘制 Gaussian splat（见 sources 第 2 条引擎文档作为「上层实现存在」的旁证，非 WebXR 核心规范内容）。
  - `splat-import: false`：WebXR 作为 API 不「导入」.ply 等文件；文件由应用脚本加载。
---

# 原文摘录 / 链接证据

自 sources 第 1 条（Abstract）：

> This specification describes support for accessing virtual reality (VR) and augmented reality (AR) devices, including sensors and head-mounted displays, on the Web.

Introduction（节选）：

> The WebXR Device API provides the interfaces necessary to enable developers to build compelling, comfortable, and safe immersive applications on the web across a wide variety of hardware form factors.

自 sources 第 2 条（Babylon.js Gaussian Splatting 文档入口，证明「引擎层」而非「WebXR 层」提供 splat）：

> Gaussian Splatting is a volume rendering method.

## 工作流速记

启用 `renderer.xr` 后，在 XR 帧回调里照常更新 splat 场景；WebXR 负责投影矩阵与立体提交，3DGS 仍由所选 3D 引擎的 splat 实现负责。
