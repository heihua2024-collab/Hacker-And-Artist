---
slug: training-loss
type: glossary
title-zh: 训练损失（3DGS）
title-en: Training loss (3D Gaussian Splatting)

abbreviation: null
category: workflow
level: intermediate
also-known-as: null

short-zh: |
  训练损失就像裁判给「渲染图 vs 实拍图」打分：分越高说明越不像，优化器就根据这个分数往回拽每个高斯的位置和颜色；3DGS 里最常用的配方是 L1 加上一块结构相似项（D-SSIM），再按固定比例搅在一起。
short-en: |
  The training loss scores how far splat renders drift from captured photos; optimizers push Gaussians to lower that score. The canonical 3DGS recipe blends an L1 photometric term with a D-SSIM structural term, weighted by a λ you pick once and reuse.

long-zh: |
  原论文将损失写为 \((1-\lambda)\mathcal{L}_1 + \lambda \mathcal{L}_{\textrm{D-SSIM}}\)，并在实验中取 \(\lambda=0.2\)。额外正则（如 SuGaR 的表面对齐项）属于扩展工作。监控损失曲线时，应同时查看 PSNR/SSIM/LPIPS，以免单一标量掩盖几何伪影。
long-en: |
  Kerbl et al. combine L1 and D-SSIM to encourage pixel accuracy and structural agreement. Other projects append regularizers for anti-aliasing, opacity control, or mesh-friendly alignment. Always relate scalar loss trends to perceptual metrics and qualitative renders.

prerequisite-terms:
  - 3dgs
  - metrics
advanced-terms:
  - mip-splat

introduced-in: null
introduced-by: null
introduced-source-url: null
introduced-quote-en: null

related-tools:
  - inria-gaussian-splatting
  - gsplat
related-engines:
  - playcanvas
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
  The loss function is L1 combined with a D-SSIM term:
quote-zh: null
sources:
  - https://arxiv.org/abs/2308.04079
  - https://en.wikipedia.org/wiki/Structural_similarity_index_measure

license: 引用合理使用
notes: |
  - `quote-en` 为论文正文对损失组成的直接陈述；完整公式见论文式 (7)。
  - SSIM 维基条目补充 D-SSIM/结构相似度背景。
---

# 来源原文 / 整理

自 sources 第 1 条（Kerbl et al., §5.1）：

> The loss function is $\mathcal{L}_{1}$ combined with a D-SSIM term:
>
> | (7) | $$\mathcal{L}=(1-\lambda)\mathcal{L}_{1}+\lambda\mathcal{L_{\textrm{D-SSIM}}}$$ |

> We use $\lambda = 0.2$ in all our tests.

自 sources 第 2 条（*Structural similarity index measure* 首段）：

> The structural similarity index measure (SSIM) is a method for predicting the perceived quality of digital television and cinematic pictures, as well as other kinds of digital images and videos.
