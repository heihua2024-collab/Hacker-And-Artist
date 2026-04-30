---
slug: psnr
type: glossary
title-zh: 峰值信噪比（PSNR）
title-en: Peak Signal-to-Noise Ratio (PSNR)

abbreviation: PSNR
category: metric
level: beginner
also-known-as: null

short-zh: |
  PSNR 像用分贝表量「原图和生成图差了多少噪声」：数值越高通常表示越接近，但它只管像素层面的平均误差，遇到模糊或结构错位时可能和人眼感受不一致。
short-en: |
  PSNR compares the max possible signal power to the noise energy between two images, expressed in decibels—higher usually means closer pixels, but it can disagree with human perception when blur or structure breaks.

long-zh: |
  定义上由 MSE 与像素动态范围导出；3DGS/NeRF 论文常在 Mip-NeRF360 等基准上报告 PSNR 与 SSIM、LPIPS 并列。对比不同方法时应保持数据集划分与色调映射一致。
long-en: |
  PSNR rewards pixel-wise fidelity. Teams report it alongside SSIM and LPIPS because high PSNR does not guarantee perceptual quality. Use the same train/test splits and bit depth when comparing numbers across papers.

prerequisite-terms:
  - metrics
advanced-terms:
  - 3dgs

introduced-in: null
introduced-by: null
introduced-source-url: null
introduced-quote-en: null

related-tools:
  - gsplat
related-engines: null
related-papers: null

source-url: https://en.wikipedia.org/wiki/Peak_signal-to-noise_ratio
source-author: null
captured-at: 2026-04-29
captured-by: auto
language: en
verification: pending
verified-by: null
verified-at: null

quote-en: |
  Peak signal-to-noise ratio (PSNR) is an engineering term for the ratio between the maximum possible power of a signal and the power of corrupting noise that affects the fidelity of its representation.
quote-zh: null
sources:
  - https://en.wikipedia.org/wiki/Peak_signal-to-noise_ratio
  - https://arxiv.org/abs/2308.04079

license: 引用合理使用
notes: |
  - 与 SSIM、LPIPS 常并列报告；待 `glossary.ts` 收录对应术语 id 后可在 advanced 中互链。
---

# 来源原文 / 整理

自 sources 第 1 条（*Peak signal-to-noise ratio* 首段）：

> Peak signal-to-noise ratio (PSNR) is an engineering term for the ratio between the maximum possible power of a signal and the power of corrupting noise that affects the fidelity of its representation.

自 sources 第 2 条（3DGS 论文表格语境，报告 PSNR 作为基准指标之一；见论文 Table 1 及附录）。
