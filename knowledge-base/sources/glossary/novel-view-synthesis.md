---
slug: novel-view-synthesis
type: glossary
title-zh: 新视角合成
title-en: Novel View Synthesis

abbreviation: null
category: concept
level: beginner
also-known-as:
  - view synthesis

short-zh: |
  想象你只在婚礼相册里见过新娘的正面和侧面——新视角合成就像让摄影师「再按一次快门」，但这次快门是电脑假装的：给你一张从没真正拍过的角度的照片，而且看起来还像真的。
short-en: |
  Imagine you only have vacation photos of a statue from the left and right—novel view synthesis is the trick of asking the computer to snap a picture from a viewpoint no camera ever held, while keeping lighting and geometry believable.

long-zh: |
  新视角合成从一组已拍图像与对应相机参数出发，预测任意新相机姿态下的图像。传统 IBMR、光场与 NeRF/3DGS 等路线都落在这条任务名下：差别只在场景表示（网格、隐式场、显式高斯）和渲染器。评估时常与 PSNR/SSIM/LPIPS 及真实新视角采集对比。
long-en: |
  Novel view synthesis generates images from camera poses that were not in the training set. Image-based rendering, light-field methods, NeRF-style neural fields, and explicit Gaussian splats all target the same user-facing goal with different internal representations. Metrics such as PSNR, SSIM, and LPIPS quantify faithfulness to held-out captures.

prerequisite-terms:
  - nerf
  - 3dgs
advanced-terms:
  - splat
  - reconstruction

introduced-in: null
introduced-by: null
introduced-source-url: null
introduced-quote-en: null

related-tools:
  - polycam
  - luma-ai
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
  The NeRF model enables downstream applications of novel view synthesis, scene geometry reconstruction, and obtaining the reflectance properties of the scene.
quote-zh: null
sources:
  - https://en.wikipedia.org/wiki/Neural_radiance_field
  - https://en.wikipedia.org/wiki/Image-based_modeling_and_rendering

license: 引用合理使用
notes: |
  - 主来源为英文维基「Neural radiance field」条目，因其在首段明确写出 *novel view synthesis*；IBMR 条目作补充语境。
---

# 来源原文 / 整理

自 sources 第 1 条（*Neural radiance field*）：

> The NeRF model enables downstream applications of novel view synthesis, scene geometry reconstruction, and obtaining the reflectance properties of the scene.

自 sources 第 2 条（*Image-based modeling and rendering*）：

> IBMR methods rely on a set of two-dimensional images of a scene to generate a three-dimensional model and then render some novel views of this scene.
