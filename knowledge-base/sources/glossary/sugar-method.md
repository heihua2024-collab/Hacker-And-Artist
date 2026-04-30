---
slug: sugar-method
type: glossary
title-zh: SuGaR 方法
title-en: SuGaR (Surface-Aligned Gaussian Splatting)

abbreviation: SuGaR
category: technique
level: expert
also-known-as:
  - Surface-Aligned Gaussian Splatting

short-zh: |
  SuGaR 像给一碗散落的弹珠（训练好的高斯）涂上一层隐形胶水，把它们往真实物体表面轻轻推，让它们排得贴面；贴稳之后就能较快「倒」出一块可编辑的三角网格，而不是永远对着几百万颗乱跑的高斯发呆。
short-en: |
  SuGaR behaves like nudging a bowl of loose marbles—each Gaussian—until they hug the true surfaces; once they stick, Poisson reconstruction can spit out an editable triangle mesh in minutes, so artists can sculpt or relight through a mesh instead of hand-waving millions of splats.

long-zh: |
  Guédon 与 Lepetit 在 SuGaR 中先加**正则项**，鼓励高斯在优化过程中沿场景表面对齐；随后从可见区域的密度水平集上高效采样点，用 Poisson 重建得到三角网格，避免直接在极度稀疏的密度场上跑 Marching Cubes。可选第二步把高斯绑定到网格并联合优化，使渲染仍走 Gaussian splatting，但编辑抓手回到传统网格工具链。它是「3DGS → 网格」路线的代表之一，与纯神经 SDF 提取相比强调速度与可扩展性。
long-en: |
  SuGaR adds a regularizer that aligns Gaussians with the underlying surface, then samples the level set efficiently and runs Poisson surface reconstruction to obtain meshes without relying on marching cubes over a near-zero density field. An optional binding stage co-optimizes mesh and Gaussians for high-quality splat rendering while enabling mesh-based editing. The method targets fast mesh extraction from splats rather than real-time training.

prerequisite-terms:
  - 3dgs
  - mesh
advanced-terms: []

introduced-in: 2023-11
introduced-by: Antoine Guédon, Vincent Lepetit
introduced-source-url: https://arxiv.org/abs/2311.12775
introduced-quote-en: |
  We propose a method to allow precise and extremely fast mesh extraction from 3D Gaussian Splatting.

related-tools: null
related-engines: null
related-papers:
  - https://arxiv.org/abs/2311.12775

source-url: https://arxiv.org/abs/2311.12775
source-author: null
captured-at: 2026-04-29
captured-by: auto
language: en
verification: pending
verified-by: null
verified-at: null

quote-en: |
  We propose a method to allow precise and extremely fast mesh extraction from 3D Gaussian Splatting.
quote-zh: null
sources:
  - https://arxiv.org/abs/2311.12775
  - https://anttwo.github.io/sugar/

license: 引用合理使用
notes: |
  - `advanced-terms: []`：`mesh-extraction` 尚未出现在 `glossary.ts` 的 id 列表中，故不硬造 id。
  - 项目主页 sources 第 2 条用于交叉核对标题与作者信息；摘要句以 arXiv 为准。
---

# 来源原文 / 整理

自 sources 第 1 条（arXiv:2311.12775 摘要开篇）：

> We propose a method to allow precise and extremely fast mesh extraction from 3D Gaussian Splatting.

摘要续句（同页）：

> Our first key contribution is a regularization term that encourages the Gaussians to align well with the surface of the scene.

自 sources 第 2 条（项目主页 `anttwo.github.io/sugar/`，标题与作者行以页面为准）。
