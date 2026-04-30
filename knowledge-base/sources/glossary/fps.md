---
slug: fps
type: glossary
title-zh: 帧率（FPS）
title-en: Frames Per Second (FPS)

abbreviation: FPS
category: metric
level: beginner
also-known-as:
  - frame rate

short-zh: |
  FPS 就像数动画片一秒翻过多少张胶片：在 3DGS 里既可以是「显卡一秒画多少帧交互画面」，也可以是论文表格里「训练好后射线追踪/光栅化跑多快」——数字越高越流畅，但记得分清测的是训练还是推理。
short-en: |
  FPS counts how many full images a pipeline produces each second—either realtime splat rendering in a browser or the throughput numbers quoted beside PSNR tables. Higher feels smoother, but always ask which stage was timed.

long-zh: |
  维基将帧率与刷新率、GPU 生成速率区分开。评估 splat 查看器时，应在目标分辨率与相机运动下记录 1% low 与平均 FPS，并披露硬件与浏览器。论文中的 FPS 常指训练后高斯模型的实时渲染速度。
long-en: |
  Benchmarks should specify resolution, MSAA settings, and whether WebGPU/WebGL paths were used. Academic tables often list FPS next to memory footprint to compare explicit radiance methods.

prerequisite-terms:
  - real-time-rendering
advanced-terms:
  - webgl-webgpu

introduced-in: null
introduced-by: null
introduced-source-url: null
introduced-quote-en: null

related-tools: null
related-engines:
  - playcanvas
  - godot
related-papers:
  - https://arxiv.org/abs/2308.04079

source-url: https://en.wikipedia.org/wiki/Frame_rate
source-author: null
captured-at: 2026-04-29
captured-by: auto
language: en
verification: pending
verified-by: null
verified-at: null

quote-en: |
  Frame rate, commonly expressed in frame/s, frames per second, or FPS, is typically the frequency (rate) at which consecutive images (frames) are captured or displayed.
quote-zh: null
sources:
  - https://en.wikipedia.org/wiki/Frame_rate
  - https://arxiv.org/abs/2308.04079

license: 引用合理使用
notes: |
  - 第二来源 3DGS 论文表格列出各方法的 FPS/Mem 指标（见 Results）。
---

# 来源原文 / 整理

自 sources 第 1 条（*Frame rate* 首段）：

> Frame rate, commonly expressed in frame/s, frames per second, or FPS, is typically the frequency (rate) at which consecutive images (frames) are captured or displayed.

同段续：

> Additionally, in the context of computer graphics performance, FPS is the rate at which a system, particularly a GPU, is able to generate frames, and refresh rate is the frequency at which a display shows completed frames.

自 sources 第 2 条（3DGS 论文 Results，方法对比表中的 FPS/Mem 列）。
