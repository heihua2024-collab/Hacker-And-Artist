---
slug: rasterization
type: glossary
title-zh: 光栅化
title-en: Rasterization

abbreviation: null
category: concept
level: intermediate
also-known-as:
  - rasterisation

short-zh: |
  光栅化就像把剪纸窗花按到方格本上描格子：三角形、高斯点这些几何先被「压平」成屏幕上的像素格子，再决定每个格子涂什么颜色；游戏实时渲染多半走这条路，而不是慢慢追光线。
short-en: |
  Rasterization is the assembly-line step that stamps triangles—or splats—onto a pixel grid: geometry becomes screen-space coverage, then shaders pick colors. Real-time engines lean on it because it is predictable and fast compared with brute-force light simulation.

long-zh: |
  光栅化把几何图元映射到离散像素，并调用着色器决定片元颜色；与路径追踪相比，它不天然给出全局光照，但可通过阴影贴图、屏幕空间技巧等堆效果。3D 高斯泼溅的可微光栅化在 GPU 上排序、混合椭球，本质仍属光栅化管线上的特化实现。
long-en: |
  Rasterization determines which pixels a primitive covers and shades those fragments. It powers most real-time graphics APIs. Differentiable splat rasterizers extend the same idea: sort Gaussians per tile, alpha-blend, and backpropagate screen-space error—still a rasterization mindset, not path tracing.

prerequisite-terms:
  - real-time-rendering
advanced-terms:
  - differentiable-rasterization

introduced-in: null
introduced-by: null
introduced-source-url: null
introduced-quote-en: null

related-tools: null
related-engines:
  - webgl-webgpu
  - threejs
related-papers: null

source-url: https://en.wikipedia.org/wiki/Rasterisation
source-author: null
captured-at: 2026-04-29
captured-by: auto
language: en
verification: pending
verified-by: null
verified-at: null

quote-en: |
  In computer graphics, rasterisation (British English) or rasterization (American English) is the task of taking an image described in a vector graphics format (shapes) and converting it into a raster image (a series of pixels, dots or lines, which, when displayed together, create the image which was represented via shapes).
quote-zh: null
sources:
  - https://en.wikipedia.org/wiki/Rasterisation
  - https://en.wikipedia.org/wiki/Graphics_pipeline

license: 引用合理使用
notes: |
  - 第二来源说明光栅化在图形管线中的位置（维基 *Graphics pipeline*）。
---

# 来源原文 / 整理

自 sources 第 1 条（*Rasterisation* 首段）：

> In computer graphics, rasterisation (British English) or rasterization (American English) is the task of taking an image described in a vector graphics format (shapes) and converting it into a raster image (a series of pixels, dots or lines, which, when displayed together, create the image which was represented via shapes).

同页 3D 小节（节选）：

> Rasterization is one of the typical techniques of rendering 3D models. Compared with other rendering techniques such as ray tracing, rasterization is extremely fast and therefore used in most realtime 3D engines.

自 sources 第 2 条（*Graphics pipeline*）：

> A graphics pipeline can be divided into three main parts: Application, Geometry, and Rasterization.
