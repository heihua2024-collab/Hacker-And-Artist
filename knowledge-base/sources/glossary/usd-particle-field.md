---
slug: usd-particle-field
type: glossary
title-zh: USD ParticleField（含 3DGS）
title-en: USD ParticleField (incl. 3D Gaussian Splats)

abbreviation: null
category: format
level: expert
also-known-as:
  - OpenUSD ParticleField

short-zh: |
  在 USD 里，ParticleField 像给渲染器的一份「粒子场说明书」：写明每个粒子在哪、用什么核函数、长什么样；其中专门有 3D Gaussian Splat 的派生模式，好让 Omniverse 这类 RTX 渲染器把高斯当一等公民接进 USD 场景。
short-en: |
  USD’s ParticleField schema is the paperwork that tells a renderer how to interpret volumetric particles: positions, kernels, radiance, optional scales and orientations. Derived types such as `ParticleField3DGaussianSplat` let pipelines store splats as first-class USD prims instead of ad-hoc blobs.

long-zh: |
  OpenUSD 文档将 ParticleField 定义为具体实现的基类，并要求派生模式提供位置、核、辐射亮度等属性。NVIDIA Omniverse 文档进一步说明如何把 `.ply` 高斯经脚本转成 USD，以便 RTX 路径追踪与网格互动。跨 DCC 传输时需核对属性绑定与色彩空间。
long-en: |
  ParticleField generalizes multiple field types, including 3D Gaussian splats. Tooling converts trained PLY assets into USD stages referencing these prims so RTX can path-trace them alongside meshes. Custom exporters must inherit the schema expectations for validation.

prerequisite-terms:
  - mesh
advanced-terms:
  - voxelization

introduced-in: null
introduced-by: null
introduced-source-url: null
introduced-quote-en: null

related-tools: null
related-engines:
  - nvidia-omniverse
related-papers: null

source-url: https://openusd.org/release/user_guides/schemas/usdVol/ParticleField.html
source-author: null
captured-at: 2026-04-29
captured-by: auto
language: en
verification: pending
verified-by: null
verified-at: null

quote-en: |
  ParticleField is the base schema for describing different types of concrete ParticleField implementations, such as, but not limited to, 3D Gaussian Splats.
quote-zh: null
sources:
  - https://openusd.org/release/user_guides/schemas/usdVol/ParticleField.html
  - https://docs.omniverse.nvidia.com/materials-and-rendering/latest/particle-fields.html

license: 引用合理使用
notes: |
  - Omniverse 文档（sources 第 2 条）描述 `.ply`→USD 与 RTX 渲染路径，实施时需同时阅读 OpenUSD 与 NVIDIA 侧说明。
---

# 来源原文 / 整理

自 sources 第 1 条（OpenUSD *ParticleField*）：

> ParticleField is the base schema for describing different types of concrete ParticleField implementations, such as, but not limited to, 3D Gaussian Splats.

> All ParticleField-derived schemas are required to provide the following attributes, but are free to provide them in any form.

> Position: the local space position of each particle in the field.

> Kernel: the kernel that is instantiated at each particle.

> Radiance: the visual appearance of the particle field.

自 sources 第 2 条（NVIDIA Omniverse *Gaussian Splats (Particle Fields)*）：

> Particle Fields are a new geometry type in OpenUSD for rendering 3D Gaussian Splats (3DGS) and other radiance fields such as 3D Gaussian Unscented Transforms (3DGUT).
