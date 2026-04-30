---
slug: photogrammetry
type: glossary
title-zh: 摄影测量
title-en: Photogrammetry

abbreviation: null
category: concept
level: beginner
also-known-as: null

short-zh: |
  想象你攒了一叠同一栋楼的游客照——摄影测量就像用这些从不同角度拍下的平面照片，让电脑算出墙有多长、角在哪，最后捏出一个可以量尺寸、能转着看的立体模型；这是比高斯泼溅早得多的老办法。
short-en: |
  Picture a shoebox full of holiday snapshots of one building—photogrammetry is the workflow where those flat prints are lined up so software can recover real-world distances and spit out a solid model you can spin; splatting is only one newer branch of the same “photos → 3D” family.

long-zh: |
  摄影测量把多张影像里的像素对应关系、相机内外参数和地面控制信息一起丢进平差（bundle adjustment）里，迭代最小化重投影误差，从而得到稀疏或稠密点云、数字表面模型等产品。它和 COLMAP 那类 SfM/MVS 管线是同一棵家族树上的方法：先可靠地估计几何，再谈用什么基元（网格、点云或高斯）去表达外观。对从业者而言，关键是它强调可度量、可复现的摄影几何，而不是某一种特定的神经或泼溅表示。
long-en: |
  Photogrammetry stitches overlapping photographs into consistent 3D geometry by estimating camera poses and 3D tie points through least-squares adjustment. Structure-from-motion and multi-view stereo pipelines are modern instantiations: they output sparse or dense reconstructions that downstream tools may convert into meshes, point clouds, or splatted Gaussians. The discipline predates neural fields; its focus is metrology-grade correspondence and calibration rather than a particular differentiable renderer.

prerequisite-terms:
  - point-cloud
advanced-terms:
  - sfm
  - mvs
  - 3dgs

introduced-in: null
introduced-by: null
introduced-source-url: null
introduced-quote-en: null

related-tools:
  - polycam
  - luma-ai
  - kiri-engine
related-engines: null
related-papers: null

source-url: https://en.wikipedia.org/wiki/Photogrammetry
source-author: null
captured-at: 2026-04-29
captured-by: auto
language: en
verification: pending
verified-by: null
verified-at: null

quote-en: |
  Photogrammetry is the science and technology of obtaining reliable information about physical objects and the environment through the process of recording, measuring and interpreting photographic images and patterns of electromagnetic radiant imagery and other phenomena.
quote-zh: null
sources:
  - https://en.wikipedia.org/wiki/Photogrammetry
  - https://en.wikipedia.org/wiki/Structure_from_motion

license: 引用合理使用
notes: |
  - `introduced-*` 为 null：术语历史上由 Meydenbauer 等逐步命名，单次「首次提出」句与本条工程向定义不易共用一个 introduced 块；若需补 1867 文献链，应单独加档案来源。
  - `related-papers`：未在本次抓取中锁定单一综述 DOI，故 null。
---

# 来源原文 / 整理

自 sources 第 1 条（Wikipedia *Photogrammetry*，首段定义）：

> Photogrammetry is the science and technology of obtaining reliable information about physical objects and the environment through the process of recording, measuring and interpreting photographic images and patterns of electromagnetic radiant imagery and other phenomena.

自 sources 第 2 条（Wikipedia *Structure from motion*，首段）：

> Structure from motion (SfM) is a photogrammetric range imaging technique for estimating three-dimensional structures from two-dimensional image sequences that may be coupled with local motion signals.
