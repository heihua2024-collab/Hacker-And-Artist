---
slug: lpips
type: glossary
title-zh: LPIPS（学习感知图像块相似度）
title-en: Learned Perceptual Image Patch Similarity (LPIPS)

abbreviation: LPIPS
category: metric
level: intermediate
also-known-as:
  - perceptual metric LPIPS

short-zh: |
  LPIPS 像请一位看过海量照片的卷积网络当裁判：它不逐像素抠差，而是比较中间层特征，离得越远分数越高；做 3DGS 论文表格时常和 PSNR/SSIM 一起报，用来补「人眼观感」这块短板。
short-en: |
  LPIPS feeds paired images through a pretrained CNN, compares deep features (optionally calibrated), and returns a distance where higher means more different—useful when PSNR looks fine but pictures still feel wrong.

long-zh: |
  Zhang et al. 提供 `pip install lpips` 实现，默认 Alex/VGG 骨干。作为训练损失时需注意梯度行为与归一化区间。引用论文应写明 backbone 与版本号。
long-en: |
  The reference implementation exposes AlexNet/VGG/SqueezeNet variants. Gaussian splat papers cite LPIPS↓ on validation views. Unlike PSNR, it rewards semantic similarity but costs more compute.

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
related-papers:
  - https://arxiv.org/abs/1801.03924

source-url: https://raw.githubusercontent.com/richzhang/PerceptualSimilarity/master/README.md
source-author: null
captured-at: 2026-04-29
captured-by: auto
language: en
verification: pending
verified-by: null
verified-at: null

quote-en: |
  This repository contains our perceptual metric (LPIPS) and dataset (BAPPS).
quote-zh: null
sources:
  - https://raw.githubusercontent.com/richzhang/PerceptualSimilarity/master/README.md
  - https://arxiv.org/abs/1801.03924

license: 引用合理使用
notes: |
  - 全称展开见 README 章节标题 *Learned Perceptual Image Patch Similarity (LPIPS) metric*。
---

# 来源原文 / 整理

自 sources 第 1 条（PerceptualSimilarity README）：

> This repository contains our **perceptual metric (LPIPS)** and **dataset (BAPPS)**.

> Evaluate the distance between image patches. **Higher means further/more different. Lower means more similar.**

自 sources 第 2 条（arXiv:1801.03924 摘要，定义深度特征作为感知距离）。
