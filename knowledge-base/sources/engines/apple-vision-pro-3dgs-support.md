---
# === 通用必填 ===
slug: apple-vision-pro-3dgs-support
type: engine-support
title-zh: Apple Vision Pro / visionOS 生态
title-en: Apple Vision Pro (visionOS ecosystem)

# === 引擎/软件特定字段 ===
engine-name: visionOS / RealityKit
engine-vendor: Apple
engine-category: xr-platform
engine-platforms:
  - visionos
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
source-url: https://developer.apple.com/documentation/realitykit
source-author: null
captured-at: 2026-04-29
captured-by: auto
language: en
verification: pending
verified-by: null
verified-at: null

# === 反幻觉 ===
quote-en: |
  RealityKit provides high-performance 3D simulation and rendering capabilities you can use to create apps with 3D or augmented reality (AR) for iOS, iPadOS, macOS, tvOS, and visionOS.
quote-zh: null
sources:
  - https://developer.apple.com/documentation/realitykit
  - https://developer.apple.com/documentation/visionOS

license: 引用合理使用
notes: |
  - `quote-en` 摘自 RealityKit 文档 Overview；该 Overview 与已抓取 visionOS 文档导航页在正文中 **未出现** “Gaussian”“splatting” 关键词。
  - `splat-render: external`：平台提供 RealityKit/Metal 渲染栈，**未发现**官方「ParticleField / 3DGS」同级 API 的已引句；若 App 内嵌自研或第三方 Metal/Web 视图渲染 splat，属应用层集成，非系统内置 splat 原语。
  - `splat-import: false`：无已引用证据表明系统相册或 RealityKit 一键导入任意第三方 3DGS `.ply` 作为一等资产类型。
  - 社区方案（Swift、Unity on visionOS 等）需单独建条目并附源码/README。
---

# 原文摘录 / 链接证据

自 sources 第 1 条：

> RealityKit provides high-performance 3D simulation and rendering capabilities you can use to create apps with 3D or augmented reality (AR) for iOS, iPadOS, macOS, tvOS, and visionOS.

## 工作流速记

在 visionOS 上交付 3DGS 通常通过自定义渲染（Metal、或封装 WebKit/Unity）完成会话与合成；RealityKit 公开概述未列 Gaussian splat 为内置场景原语。
