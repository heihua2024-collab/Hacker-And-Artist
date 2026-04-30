---
slug: mesh-extraction
type: glossary
title-zh: 网格提取
title-en: Mesh Extraction

abbreviation: null
category: workflow
level: intermediate
also-known-as:
  - surface extraction

short-zh: |
  网格提取就像把一团橡皮泥（点云或高斯堆）翻模成硬壳手办：算法从数据里「抠」出三角面片，得到可在 Blender、游戏引擎里布尔、加骨骼的网格；3DGS 里常用 Poisson、SuGaR 等路线。
short-en: |
  Mesh extraction turns unstructured splats or points into a triangle soup you can boolean, rig, or ship to game engines. For Gaussian splats, researchers often sample implicit surfaces or aligned Gaussians, then run Poisson reconstruction instead of marching through noisy densities.

long-zh: |
  SuGaR 等工作通过正则让高斯贴面，再用 Poisson 提取网格；经典多视几何则从匹配点与法线估计表面。提取质量与训练噪声、浮游高斯、采样密度强相关，通常与 splat 渲染质量分别评估。
long-en: |
  The task spans Poisson reconstruction, marching cubes on SDFs, and splat-specific pipelines such as SuGaR’s level-set sampling. Triangle meshes remain the interchange currency for DCC tools even when rendering stays on splats.

prerequisite-terms:
  - mesh
  - point-cloud
advanced-terms:
  - reconstruction

introduced-in: null
introduced-by: null
introduced-source-url: null
introduced-quote-en: null

related-tools:
  - blender-3dgs-addon
related-engines:
  - blender
related-papers:
  - https://arxiv.org/abs/2311.12775

source-url: https://arxiv.org/abs/2311.12775
source-author: null
captured-at: 2026-04-29
captured-by: auto
language: en
verification: pending
verified-by: null
verified-at: null

quote-en: |
  We propose a method to allow precise and extremely fast mesh extraction from 3D Gaussian Splatting.
quote-zh: null
sources:
  - https://arxiv.org/abs/2311.12775
  - https://en.wikipedia.org/wiki/3D_reconstruction_from_multiple_images

license: 引用合理使用
notes: |
  - 主引文来自 SuGaR 论文摘要，作为 splat→mesh 文献代表；其他重建路线见第二来源。
---

# 来源原文 / 整理

自 sources 第 1 条（Guédon & Lepetit, SuGaR 摘要）：

> We propose a method to allow precise and extremely fast mesh extraction from 3D Gaussian Splatting.

自 sources 第 2 条（*3D reconstruction from multiple images*）：

> 3D reconstruction from multiple images is the creation of three-dimensional models from a set of images. It is the reverse process of obtaining 2D images from 3D scenes.
