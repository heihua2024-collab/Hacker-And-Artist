---
slug: ssim
type: glossary
title-zh: 结构相似度（SSIM）
title-en: Structural Similarity Index Measure (SSIM)

abbreviation: SSIM
category: metric
level: beginner
also-known-as:
  - structural similarity index

short-zh: |
  SSIM 像比较两幅画时不仅看「像素差多少」，还看亮块、对比和结构是不是还像同一物体；比单纯 MSE 更贴近人眼对「糊成一团」的反感，但仍不是万能裁判。
short-en: |
  SSIM scores how well luminance, contrast, and structure match between patches—closer to human annoyance with blur than raw MSE, though it still misses every failure mode.

long-zh: |
  全参考指标，在滑动窗口上聚合。3DGS 论文将 D-SSIM 项与 L1 组合成训练损失。报告数值时应说明窗口大小与通道权重，跨论文比较需谨慎。
long-en: |
  SSIM generalizes Wang–Bovik’s framework; differentiable variants plug into splat optimization. Teams usually log SSIM alongside PSNR and LPIPS on held-out views.

prerequisite-terms:
  - metrics
advanced-terms:
  - nerf

introduced-in: null
introduced-by: null
introduced-source-url: null
introduced-quote-en: null

related-tools:
  - gsplat
related-engines: null
related-papers: null

source-url: https://en.wikipedia.org/wiki/Structural_similarity_index_measure
source-author: null
captured-at: 2026-04-29
captured-by: auto
language: en
verification: pending
verified-by: null
verified-at: null

quote-en: |
  The structural similarity index measure (SSIM) is a method for predicting the perceived quality of digital television and cinematic pictures, as well as other kinds of digital images and videos.
quote-zh: null
sources:
  - https://en.wikipedia.org/wiki/Structural_similarity_index_measure
  - https://arxiv.org/abs/2308.04079

license: 引用合理使用
notes: |
  - 原论文发表于 IEEE TIP 2004；维基首段提供可核对定义。
---

# 来源原文 / 整理

自 sources 第 1 条（*Structural similarity index measure* 首段）：

> The structural similarity index measure (SSIM) is a method for predicting the perceived quality of digital television and cinematic pictures, as well as other kinds of digital images and videos.

自 sources 第 2 条（3DGS 论文，损失中含 D-SSIM 项；见式 (7) 附近）。
