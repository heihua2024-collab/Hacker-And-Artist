---
slug: colmap
type: glossary
title-zh: COLMAP
title-en: COLMAP

abbreviation: null
category: workflow
level: intermediate
also-known-as: null

short-zh: |
  COLMAP 像照片侦探事务所：你扔进去一叠无序旅游照，它先找共同点算相机在哪，再拼稠密点云——很多 NeRF/3DGS 训练前都用它当「相机位姿 + 稀疏点」的免费包工头。
short-en: |
  COLMAP is the open-source detective for unordered photo sets: it runs structure-from-motion to recover cameras, then multi-view stereo to grow dense geometry—most splat pipelines start by exporting its poses and sparse points.

long-zh: |
  项目集成特征匹配、增量式或全局式 SfM、MVS 与网格纹理化等模块，可通过 GUI 或命令行批处理。引用官方论文时需分别致谢 SfM、MVS、检索等子算法作者。Python 绑定 PyCOLMAP 便于与深度学习训练脚本对接。
long-en: |
  COLMAP bundles established CVPR/ECCV algorithms behind a unified CLI and GUI. Typical splat workflows import `images.bin`/`points3D.bin` or textured meshes as initialization. Global SfM variants (e.g., GLOMAP) require extra citations. Licensing is BSD.

prerequisite-terms:
  - sfm
  - mvs
advanced-terms:
  - reconstruction

introduced-in: null
introduced-by: null
introduced-source-url: null
introduced-quote-en: null

related-tools:
  - inria-gaussian-splatting
  - gsplat
related-engines: null
related-papers: null

source-url: https://colmap.github.io/
source-author: null
captured-at: 2026-04-29
captured-by: auto
language: en
verification: pending
verified-by: null
verified-at: null

quote-en: |
  COLMAP is a general-purpose Structure-from-Motion (SfM) and Multi-View Stereo (MVS) pipeline with a graphical and command-line interface.
quote-zh: null
sources:
  - https://colmap.github.io/
  - https://github.com/colmap/colmap

license: 引用合理使用
notes: |
  - `related-papers` 指向官方文档首页；正式引用应使用页面内 BibTeX（Schönberger & Frahm 2016 等）。
---

# 来源原文 / 整理

自 sources 第 1 条（COLMAP 文档 *About*）：

> COLMAP is a general-purpose Structure-from-Motion (SfM) and Multi-View Stereo (MVS) pipeline with a graphical and command-line interface. It offers a wide range of features for reconstruction of ordered and unordered image collections.
