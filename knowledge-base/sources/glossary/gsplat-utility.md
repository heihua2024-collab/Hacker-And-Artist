---
slug: gsplat-utility
type: glossary
title-zh: gsplat 库（CUDA 光栅化工具集）
title-en: gsplat library (CUDA splat utilities)

abbreviation: null
category: workflow
level: intermediate
also-known-as:
  - nerfstudio gsplat

short-zh: |
  gsplat 像给官方高斯渲染器换上一台改装引擎：还是把椭球泼到屏幕上，但用 CUDA 写得更省显存、更快，还带 Python 把手——适合接在 PyTorch 训练脚本里反复前向/反向。
short-en: |
  The gsplat project is a CUDA-accelerated Gaussian rasterizer with Python bindings: same splat idea as the Inria reference, but tuned for memory, speed, and extra research features when hooked into PyTorch training loops.

long-zh: |
  仓库自述受 SIGGRAPH 3DGS 论文启发，提供与官方实现可比指标的评测脚本，并扩展批处理、3DGUT 等实验特性。安装可通过 PyPI 或源码构建 CUDA 扩展。与「仅数据格式工具」不同，它覆盖训练/渲染核心算子。
long-en: |
  Maintainers publish evaluation scripts matching PSNR/SSIM/LPIPS and converged Gaussian counts against the official trainer while advertising lower VRAM and faster runtime. Developers integrate it inside Nerfstudio-style stacks or standalone COLMAP examples.

prerequisite-terms:
  - differentiable-rasterization
  - 3dgs
advanced-terms:
  - compressed-gs

introduced-in: null
introduced-by: null
introduced-source-url: null
introduced-quote-en: null

related-tools:
  - gsplat
  - inria-gaussian-splatting
related-engines: null
related-papers:
  - https://arxiv.org/abs/2409.06765

source-url: https://raw.githubusercontent.com/nerfstudio-project/gsplat/main/README.md
source-author: null
captured-at: 2026-04-29
captured-by: auto
language: en
verification: pending
verified-by: null
verified-at: null

quote-en: |
  gsplat is an open-source library for CUDA accelerated rasterization of gaussians with python bindings.
quote-zh: null
sources:
  - https://raw.githubusercontent.com/nerfstudio-project/gsplat/main/README.md
  - https://github.com/nerfstudio-project/gsplat

license: 引用合理使用
notes: |
  - 术语 `gsplat-utility` 对应工程上的 **gsplat** 代码库；与 Hugging Face `gsplat.js`（另一仓库）勿混。
  - JMLR 2025 白皮书链接见 README，可作扩展阅读。
---

# 来源原文 / 整理

自 sources 第 1 条（README 首段产品句）：

> gsplat is an open-source library for CUDA accelerated rasterization of gaussians with python bindings.

续句：

> It is inspired by the SIGGRAPH paper 3D Gaussian Splatting for Real-Time Rendering of Radiance Fields, but we’ve made gsplat even faster, more memory efficient, and with a growing list of new features!
