---
slug: splat-count
type: glossary
title-zh: 高斯数 / Splat 数量
title-en: Gaussian / splat count

abbreviation: null
category: metric
level: intermediate
also-known-as:
  - number of Gaussians

short-zh: |
  Splat 数量就像场景里塞了多少颗半透明椭球：训练过程中会克隆、分裂、删掉多余的高斯——最后留下来的总数，既影响显存占用，也影响文件体积和加载时间。
short-en: |
  Splat count tracks how many Gaussian primitives survive optimization—think counting marbles in a jar. More splats can capture detail but inflate VRAM, storage, and sort cost; pruning and compression fight the same number.

long-zh: |
  3DGS 论文在自适应控制段落描述根据梯度阈值增删高斯；评测表格常报告收敛后的高斯数量与 FPS、内存。对比不同 pipeline 时应固定随机种子与 densify 规则。
long-en: |
  Densification schedules grow or split splats when view-space gradients spike; opacity pruning removes low-alpha Gaussians. gsplat reproduces official Gaussian counts when benchmarking. SPZ/KSplat formats also hinge on how many primitives remain.

prerequisite-terms:
  - splat
  - densification
advanced-terms:
  - pruning

introduced-in: null
introduced-by: null
introduced-source-url: null
introduced-quote-en: null

related-tools:
  - gsplat
related-engines:
  - supersplat
related-papers:
  - https://arxiv.org/abs/2308.04079

source-url: https://arxiv.org/abs/2308.04079
source-author: null
captured-at: 2026-04-29
captured-by: auto
language: en
verification: pending
verified-by: null
verified-at: null

quote-en: |
  We start with the initial set of sparse points from SfM and then apply our method to adaptively control the number of Gaussians and their density over unit volume
quote-zh: null
sources:
  - https://arxiv.org/abs/2308.04079
  - https://raw.githubusercontent.com/nerfstudio-project/gsplat/main/README.md

license: 引用合理使用
notes: |
  - `quote-en` 摘自 3DGS 论文 §5.2 首句，概述自适应控制如何改变高斯数量。
  - gsplat README 报告与官方实现「converged number of Gaussians」对齐的评测。
---

# 来源原文 / 整理

自 sources 第 1 条（Kerbl et al. §5.2 *Adaptive Control of Gaussians*）：

> We start with the initial set of sparse points from SfM and then apply our method to adaptively control the number of Gaussians and their density over unit volume, allowing us to go from an initial sparse set of Gaussians to a denser set that better represents the scene, and with correct parameters.

自 sources 第 2 条（gsplat README *Evaluation*）：

> This repo comes with a standalone script that reproduces the official Gaussian Splatting with exactly the same performance on PSNR, SSIM, LPIPS, and converged number of Gaussians.
