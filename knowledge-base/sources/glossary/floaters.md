---
slug: floaters
type: glossary
title-zh: 漂浮物（Floaters）
title-en: Floaters (informal 3DGS artifact)

abbreviation: null
category: technique
level: intermediate
also-known-as:
  - stray Gaussians

short-zh: |
  训练好的 3D 高斯场景里，有时会冒出一些不该悬在半空的小团颜色——业内口语叫 floaters，像花粉飘在画面里；多在运动模糊、遮挡不够或动态物体上冒出来，常用 SuperSplat 这类编辑器选中删掉。
short-en: |
  After training, a splat scene can sprout tiny colored smudges that hang in mid-air like pollen—people in the field just call them “floaters.” They often trace back to motion blur, bad coverage, or moving subjects, and editors such as SuperSplat exist mainly to lasso and delete them.

long-zh: |
  “Floaters”不是某篇 SIGGRAPH 论文的正式标题术语，而是社区里对**离群高斯**的昵称：优化为了填洞或解释噪声，会在没有真实表面的位置留下小团高斯，看起来像漂浮杂质。处理手段包括手工选取删除、阈值裁剪、或在训练/后处理里加正则（相关论文常称 *floating artifacts*）。记录本条时应区分：它是现象描述，不是单独算法名。
long-en: |
  “Floaters” is informal jargon for stray Gaussian primitives that survive optimization away from true surfaces, producing visually floating specks. Papers may say “floating artifacts” instead. Mitigation spans interactive cleanup in tools, pruning heuristics, or training-time regularizers. Treat the word as practitioner slang, not a canonical keyword from a single paper title.

prerequisite-terms:
  - splat
  - 3dgs
advanced-terms:
  - pruning
  - densification

introduced-in: null
introduced-by: null
introduced-source-url: null
introduced-quote-en: null

related-tools:
  - supersplat
related-engines: null
related-papers: null

source-url: https://medium.com/@Jamesroha/gaussian-splatting-a-complete-student-guide-to-3d-capture-in-2026-1195a6265870
source-author: null
captured-at: 2026-04-29
captured-by: auto
language: en
verification: pending
verified-by: null
verified-at: null

quote-en: |
  This free, browser-based editor from PlayCanvas lets you clean up “floaters” (stray Gaussians from motion blur or insufficient coverage), crop unwanted background, adjust colors, and compress files.
quote-zh: null
sources:
  - https://medium.com/@Jamesroha/gaussian-splatting-a-complete-student-guide-to-3d-capture-in-2026-1195a6265870
  - https://developer.playcanvas.com/user-manual/gaussian-splatting/editing/supersplat/

license: 引用合理使用
notes: |
  - `introduced-*` 全 null：未找到将该口语词作为学术术语首次定义的单一文献；证据来自行业文章与编辑工具叙述。
  - 第二来源为 PlayCanvas SuperSplat 官方文档页（说明同类编辑语境，但未重复 “floaters” 字面）。
---

# 来源原文 / 整理

自 sources 第 1 条（Medium 指南，关于 SuperSplat）：

> This free, browser-based editor from PlayCanvas lets you clean up “floaters” (stray Gaussians from motion blur or insufficient coverage), crop unwanted background, adjust colors, and compress files.

同文稍后段落：

> Moving objects produce characteristic “floaters” — stray Gaussians floating in space — that require cleanup in SuperSplat.
