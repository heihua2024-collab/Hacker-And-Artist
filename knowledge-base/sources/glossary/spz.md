---
slug: spz
type: glossary
title-zh: SPZ 格式
title-en: SPZ format

abbreviation: SPZ
category: format
level: intermediate
also-known-as:
  - Scaniverse PLY zipped

short-zh: |
  把 SPZ 想成给 3D 高斯数据穿的「真空压缩袋」：同样是那一团高斯点，塞进 .spz 往往比傻大粗的 PLY 省掉九成左右体积（产品页说法），带出去和网页里塞模型都轻松些；开源实现和 Scaniverse 工作流里常见它。
short-en: |
  Treat SPZ like vacuum-sealing a closet full of coats: it is Niantic’s packed format for Gaussian splats, often shrinking the same scene to a fraction of the PLY size (marketing copy cites ~90% savings) so mobile capture and web delivery hurt less. The bitstream is open source on GitHub.

long-zh: |
  SPZ 在工程上把高斯属性按属性分块、量化（含球谐系数比特数等），再经 gzip 流封装；`nianticlabs/spz` 的 README 说明典型体积约为等价 PLY 的十分之一且视觉差异很小。Scaniverse / Niantic Capture 产品线将其作为标准导出之一，并与自家重建、定位管线衔接。从业者要注意坐标系：库要求调用方声明保存/加载时的右手坐标约定，否则与 PLY、GLB 等格式混用时会踩坑。
long-en: |
  The reference library describes `.spz` as gzip-compressed streams with a fixed header followed by Gaussian attributes (positions, alphas, colors, scales, rotations, spherical harmonics). Quantization knobs trade size for fidelity. Interop demands explicit coordinate-frame metadata because SPZ stores data in an RUB system aligned with OpenGL/three.js, unlike many PLY files. Engines such as Babylon.js have added loaders, while Scaniverse remains the flagship consumer of the format.

prerequisite-terms:
  - splat
advanced-terms:
  - compressed-gs

introduced-in: null
introduced-by: Niantic
introduced-source-url: https://github.com/nianticlabs/spz
introduced-quote-en: |
  .spz is a file format for compressed 3D gaussian splats.

related-tools:
  - scaniverse
related-engines:
  - niantic-scaniverse
  - babylonjs
related-papers: null

source-url: https://scaniverse.com/news/spz-gaussian-splat-open-source-file-format
source-author: null
captured-at: 2026-04-29
captured-by: auto
language: en
verification: pending
verified-by: null
verified-at: null

quote-en: |
  Export or integrate seamlessly: Export scans in standard 3D formats - including our open-source SPZ format, reducing file size by 90%.
quote-zh: null
sources:
  - https://scaniverse.com/news/spz-gaussian-splat-open-source-file-format
  - https://raw.githubusercontent.com/nianticlabs/spz/main/README.md

license: 引用合理使用
notes: |
  - `introduced-in: null`：新闻页本次抓取未带明确日期元数据；公开开源以 GitHub/README 与新闻为准，精确月份待人工补档。
  - 「约 10×」与「约 90%」来自不同句子（README vs 营销页），`long` 中已并列说明，避免混为一谈。
---

# 来源原文 / 整理

自 sources 第 1 条（Scaniverse / Niantic Spatial 新闻页 *Key Capabilities*）：

> Export or integrate seamlessly: Export scans in standard 3D formats - including our open-source SPZ format, reducing file size by 90%.

自 sources 第 2 条（`nianticlabs/spz` README 开头）：

> `.spz` is a file format for compressed 3D gaussian splats.

> spz encoded splats are typically around 10x smaller than the corresponding .ply files, with minimal visual differences between the two.
