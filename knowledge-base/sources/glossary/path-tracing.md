---
slug: path-tracing
type: glossary
title-zh: 路径追踪
title-en: Path Tracing

abbreviation: null
category: concept
level: expert
also-known-as:
  - path tracing

short-zh: |
  把路径追踪想成「让光线在房间里乱弹几次再回相机」：每次只认真走一条随机路线，多试几万次取平均，画面就越来越像真照片；它跟实时里常用的光栅化不是一条路——后者像流水线贴三角形，前者像用物理骰子慢慢摇出全局光照。
short-en: |
  Think of path tracing as sending a pinball of light through the scene: each sample bounces randomly until it hits a light, you average thousands of those stories per pixel, and the photo slowly converges. That Monte Carlo story differs from rasterization, which streams triangles through a fast pipeline but usually needs extra tricks for soft shadows or color bleeding.

long-zh: |
  路径追踪以渲染方程为对象，用蒙特卡洛积分估计沿随机路径到达相机的辐射；单路径不随意在镜面处无限分叉（与经典 Whitted 射线树不同），因此与双向路径、光子映射等变体相比更“朴素”但通用。与**光栅化**相比：光栅化把几何投影到屏幕并靠着色器近似光照，适合实时；路径追踪追求物理上更一致的全局光照，代价是噪声与采样成本——去噪与硬件 RT 让它慢慢进入实时产品。3D Gaussian Splat 本身常走可微光栅化，但若把 splat 放进 Omniverse 等路径追踪框架，就能与网格一起参与阴影、反射等全局效果（见 NVIDIA Particle Fields 文档）。
long-en: |
  Path tracing estimates the rendering equation by Monte Carlo sampling complete light paths from the camera, averaging many independent samples per pixel to reduce variance. Rasterization projects primitives and shades fragments in a single forward pass—fast, but indirect lighting needs approximations or separate passes. Path tracing trades cost for physical consistency (global illumination, complex materials). When Gaussian splats are represented as particle fields in Omniverse RTX, the documentation states they can participate in path-traced lighting alongside meshes.

prerequisite-terms:
  - real-time-rendering
advanced-terms:
  - differentiable-rasterization
  - nerf

introduced-in: 1986-08
introduced-by: James T. Kajiya
introduced-source-url: http://www.cse.chalmers.se/edu/year/2011/course/TDA361/2007/rend_eq.pdf
introduced-quote-en: |
  We present an integral equation which generallzes a variety of known rendering algorithms.

related-tools: null
related-engines:
  - nvidia-omniverse
related-papers:
  - https://doi.org/10.1145/15922.15902

source-url: https://en.wikipedia.org/wiki/Path_tracing
source-author: null
captured-at: 2026-04-29
captured-by: auto
language: en
verification: pending
verified-by: null
verified-at: null

quote-en: |
  Path tracing is a rendering algorithm in computer graphics that simulates how light interacts with objects and participating media to generate realistic (physically plausible) images.
quote-zh: null
sources:
  - https://en.wikipedia.org/wiki/Path_tracing
  - https://docs.omniverse.nvidia.com/materials-and-rendering/latest/particle-fields.html

license: 引用合理使用
notes: |
  - `introduced-quote-en` 摘自 Kajiya SIGGRAPH 1986 论文 PDF 摘要 OCR 文本，其中 “generallzes” 为原文 OCR 拼写形态，人工可对照正式出版物改正。
  - `related-engines` 仅列 `nvidia-omniverse`：任务要求矩阵内 path-traced 3DGS 案例；其他引擎多为光栅化 splat。
  - `related-papers` 使用 DOI 链接至 ACM Digital Library 上《The Rendering Equation》正式记录。
---

# 来源原文 / 整理

自 sources 第 1 条（Wikipedia *Path tracing*，首段）：

> Path tracing is a rendering algorithm in computer graphics that simulates how light interacts with objects and participating media to generate realistic (physically plausible) images.

自 sources 第 2 条（NVIDIA Omniverse *Gaussian Splats (Particle Fields)*）：

> Omniverse RTX renders these fields natively, with full path-tracing.

Kajiya 1986 摘要（introduced 来源 PDF）：

> ABSTRACT. We present an integral equation which generallzes a variety of known rendering algorithms.
