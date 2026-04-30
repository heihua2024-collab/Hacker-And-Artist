---
# === 通用必填 ===
slug: webgl-webgpu-3dgs-support
type: engine-support
title-zh: WebGL / WebGPU（浏览器图形 API）
title-en: WebGL / WebGPU (browser graphics APIs)

# === 引擎/软件特定字段 ===
engine-name: WebGL 2.0 / WebGPU
engine-vendor: null
engine-category: web-engine
engine-platforms:
  - web
engine-pricing: null

# === 3DGS 兼容性 ===
splat-import: false
splat-import-formats: null
splat-export: false
splat-render: none
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
source-url: https://www.khronos.org/registry/webgl/specs/latest/2.0/
source-author: null
captured-at: 2026-04-29
captured-by: auto
language: en
verification: pending
verified-by: null
verified-at: null

# === 反幻觉 ===
quote-en: |
  This specification describes an additional rendering context and support objects for the HTML 5 canvas element. This context allows rendering using an API that conforms closely to the OpenGL ES 3.0 API.
quote-zh: null
sources:
  - https://www.khronos.org/registry/webgl/specs/latest/2.0/
  - https://www.w3.org/TR/webgpu/

license: 引用合理使用
notes: |
  - 本条记录 **W3C WebGPU** 与 **Khronos WebGL 2.0** 规范层：二者摘要分别描述 GPU 通用操作与 OpenGL ES 3.0 风格即时渲染上下文，**均未出现** “Gaussian splatting”“3D Gaussian Splat” 等术语；3DGS 需在用户层着色器/计算管线中实现（如 three.js、gsplat.js），非 API 内建原语。
  - `engine-vendor: null`：标准为多实现方共同维护，不宜写单一厂商。
  - `splat-render: none`：表示规范本身不提供独立的 splat 光栅化对象类型；与「浏览器能否跑 WebGL 实现的 splat」无关。
---

# 原文摘录 / 链接证据

自 sources 第 1 条（WebGL 2.0 Abstract）：

> This specification describes an additional rendering context and support objects for the [HTML 5 canvas element [CANVAS].](http://www.w3.org/TR/html5/the-canvas-element.html) This context allows rendering using an API that conforms closely to the OpenGL ES 3.0 API.

自 sources 第 2 条（WebGPU Abstract）：

> WebGPU exposes an API for performing operations, such as rendering and computation, on a Graphics Processing Unit.

## 工作流速记

在 Canvas/WebGPU 上实现 3DGS 需自行管理高斯参数缓冲、排序与片元着色；选择 WebGL2 或 WebGPU 仅影响底层绑定与计算着色器可用性，与 3DGS 文件格式无关。
