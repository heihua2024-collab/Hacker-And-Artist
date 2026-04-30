---
slug: radiance-field
type: glossary
title-zh: 辐射场
title-en: Radiance Field

abbreviation: null
category: concept
level: intermediate
also-known-as: null

short-zh: |
  把辐射场想成「空间里每个点、每个朝外方向上一束光的亮度说明书」——不是一张贴图，而是一张五维（位置+方向）的亮度函数；NeRF 那种用神经网络去近似它，3D 高斯则是用无数颗小椭球去拼出近似效果。
short-en: |
  Think of a radiance field as a giant lookup table: at every 3D spot and every outward direction it tells you how bright light should be. Neural nets can approximate that table (NeRF); Gaussian splats approximate it with millions of tinted ellipsoids you can render fast.

long-zh: |
  在物理渲染里，辐射（radiance）描述沿某方向穿过某点的光强；「场」表示它随位置与方向变化。神经辐射场用 MLP 或网格特征去拟合该函数；3D 高斯泼溅用显式基元与可微光栅化去拟合同一目标。讨论时要说清：经典图形学中的辐射量与深度学习里的「NeRF=辐射场」口语并不完全同义。
long-en: |
  Radiance measures directional light intensity at a point in space. A radiance field assigns such values across positions and directions. NeRF parameterizes the field with networks; 3DGS approximates it with explicit Gaussians and differentiable splatting. Practitioners often say “radiance field” when they mean either the continuous function or its discrete surrogate.

prerequisite-terms:
  - nerf
advanced-terms:
  - 3dgs
  - splat

introduced-in: null
introduced-by: null
introduced-source-url: null
introduced-quote-en: null

related-tools:
  - inria-gaussian-splatting
  - gsplat
related-engines:
  - threejs
related-papers: null

source-url: https://en.wikipedia.org/wiki/Neural_radiance_field
source-author: null
captured-at: 2026-04-29
captured-by: auto
language: en
verification: pending
verified-by: null
verified-at: null

quote-en: |
  The NeRF algorithm represents a scene as a radiance field parametrized by a deep neural network (DNN).
quote-zh: null
sources:
  - https://en.wikipedia.org/wiki/Neural_radiance_field
  - https://en.wikipedia.org/wiki/Rendering_equation

license: 引用合理使用
notes: |
  - 主引文来自 NeRF 维基条目，语境为**神经**辐射场；经典渲染方程中的 radiance 见 sources 第 2 条。
---

# 来源原文 / 整理

自 sources 第 1 条：

> The NeRF algorithm represents a scene as a radiance field parametrized by a deep neural network (DNN).

自 sources 第 2 条（*Rendering equation*，辐射亮度记号语境）：

> The rendering equation describes the amount of light leaving a point x along a particular viewing direction, given functions for incoming light and emitted light, and a BRDF.
