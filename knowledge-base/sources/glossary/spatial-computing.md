---
slug: spatial-computing
type: glossary
title-zh: 空间计算
title-en: Spatial Computing

abbreviation: null
category: concept
level: beginner
also-known-as: null

short-zh: |
  空间计算就像不再把人塞进小屏幕里点鼠标，而是让电脑「看懂」你客厅有多深、手在哪、头往哪转——眼镜、耳机、手机摄像头一起上场，把界面铺在现实世界周围，而不是画在玻璃后面。
short-en: |
  Spatial computing is the shift from peering into flat screens to letting computers reason about real rooms, hands, and headsets: sensors map the world around you, then graphics and audio glue themselves to that map instead of living only inside a monitor bezel.

long-zh: |
  该词涵盖 XR、自然交互、上下文计算等相邻领域，标签使用并不严谨。对 3DGS 从业者而言，空间计算设备提供采集与展示通道：手机/头显扫描场景、WebXR 或原生引擎再把 splat 资产放进混合现实会话。技术栈上常与 SLAM、深度相机、OpenXR/WebXR 并列出现。
long-en: |
  Industry usage bundles AR/VR/MR, embodied UI, and device ecosystems that track pose in physical space. For splat workflows it matters because capture devices and headsets define how reconstructions are gathered and consumed. Interop often routes through OpenXR or WebXR plus game-engine runtimes.

prerequisite-terms:
  - slam
advanced-terms:
  - digital-twin
  - spatial-video

introduced-in: null
introduced-by: null
introduced-source-url: null
introduced-quote-en: null

related-tools: null
related-engines:
  - apple-vision-pro
  - meta-quest
related-papers: null

source-url: https://en.wikipedia.org/wiki/Spatial_computing
source-author: null
captured-at: 2026-04-29
captured-by: auto
language: en
verification: pending
verified-by: null
verified-at: null

quote-en: |
  Spatial computing refers to 3D human–computer interaction techniques that are perceived by users as taking place in the real world, in and around their bodies and physical environments, instead of constrained to and perceptually behind computer screens or in purely virtual worlds.
quote-zh: null
sources:
  - https://en.wikipedia.org/wiki/Spatial_computing
  - https://www.w3.org/TR/webxr/

license: 引用合理使用
notes: |
  - 条目承认术语历史上从 GIS 等用法延伸而来（见维基 *History*），此处聚焦人机尺度含义。
  - sources 第 2 条 WebXR 规范摘要用于衔接「Web 上访问 XR 设备」的工程语境。
---

# 来源原文 / 整理

自 sources 第 1 条（*Spatial computing* 首段）：

> Spatial computing refers to 3D human–computer interaction techniques that are perceived by users as taking place in the real world, in and around their bodies and physical environments, instead of constrained to and perceptually behind computer screens or in purely virtual worlds.

自 sources 第 2 条（W3C *WebXR Device API* Abstract）：

> This specification describes support for accessing virtual reality (VR) and augmented reality (AR) devices, including sensors and head-mounted displays, on the Web.
