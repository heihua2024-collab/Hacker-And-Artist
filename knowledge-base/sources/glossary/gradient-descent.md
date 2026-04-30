---
slug: gradient-descent
type: glossary
title-zh: 梯度下降
title-en: Gradient Descent

abbreviation: null
category: concept
level: intermediate
also-known-as: null

short-zh: |
  梯度下降像蒙眼下山：你每一步只摸脚底哪边最陡，然后往反方向跨一小步，重复很多次就能走到谷底；训练 3D 高斯时，损失函数就是那个「高度」，高斯参数就是你在山上站的位置。
short-en: |
  Gradient descent is blind hiking: each step walks opposite the slope of the loss landscape. For splat training, that loss compares rendered pixels to photos; autograd tells every Gaussian which way to nudge position, color, or covariance.

long-zh: |
  对可微渲染管线，梯度从屏幕误差回传到各高斯参数；随机梯度下降、学习率调度与自适应控制（克隆/分裂/剪枝）共同决定优化动态。与纯网格优化不同，3DGS 常在迭代中改变基元数量，因此优化问题本身也在演化。
long-en: |
  Iterative first-order optimization updates parameters by stepping along negative gradients of a scalar loss. In 3DGS pipelines the loss blends photometric terms (e.g., L1 plus D-SSIM) and interacts with densification schedules. Stochastic minibatches and GPU kernels make large-scale updates practical.

prerequisite-terms:
  - metrics
advanced-terms:
  - adaptive-density-control
  - densification

introduced-in: null
introduced-by: null
introduced-source-url: null
introduced-quote-en: null

related-tools:
  - inria-gaussian-splatting
  - gsplat
related-engines:
  - playcanvas
related-papers: null

source-url: https://en.wikipedia.org/wiki/Gradient_descent
source-author: null
captured-at: 2026-04-29
captured-by: auto
language: en
verification: pending
verified-by: null
verified-at: null

quote-en: |
  The idea is to take repeated steps in the opposite direction of the gradient (or approximate gradient) of the function at the current point, because this is the direction of steepest descent.
quote-zh: null
sources:
  - https://en.wikipedia.org/wiki/Gradient_descent
  - https://arxiv.org/abs/2308.04079

license: 引用合理使用
notes: |
  - 维基记载 Cauchy 1847 年提出思想；`introduced-in` 不强行压缩为单一年份以免与条目教学目的混淆。
  - sources 第 2 条 3DGS 论文写明使用随机梯度下降优化高斯参数。
---

# 来源原文 / 整理

自 sources 第 1 条（*Gradient descent*，*Description* 节前导句）：

> The idea is to take repeated steps in the opposite direction of the gradient (or approximate gradient) of the function at the current point, because this is the direction of steepest descent.

自 sources 第 2 条（Kerbl et al. 3DGS 论文）：

> We use Stochastic Gradient Descent techniques for optimization, taking full advantage of standard GPU-accelerated frameworks, and the ability to add custom CUDA kernels for some operations, following recent best practice (Fridovich-Keil and Yu et al., 2022; Sun et al., 2022).
