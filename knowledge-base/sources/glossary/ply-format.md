---
slug: ply-format
type: glossary
title-zh: PLY 文件格式
title-en: PLY file format

abbreviation: PLY
category: format
level: beginner
also-known-as:
  - Polygon File Format
  - Stanford Triangle Format

short-zh: |
  PLY 像带表头的配料清单：先写「有多少顶点、每个顶点有哪些字段」，再往下逐行列数字；3D 高斯训练导出也常用它，因为可以给每个点挂上位置、颜色、球谐系数等自定义属性。
short-en: |
  PLY is a text-or-binary recipe card: a header lists how many vertices exist and which properties (x, y, z, normals, SH bands…) follow, then the data rows stream underneath—exactly why splat trainers love it for rich Gaussian attributes.

long-zh: |
  斯坦福大学 90 年代为扫描数据设计，支持多边形与扩展属性。3DGS 社区在标准属性名（如 `f_dc_*`、`scale_*`）上形成事实标准，但不同工具仍可能扩展字段。ASCII 便于人类检查，二进制更省体积。
long-en: |
  The Stanford PLY spec couples an `element`/`property` header with vertex or face records. Gaussian splat exports piggyback on that extensibility for SH coefficients and covariance data. Always verify endianness and property naming when swapping between trainers and viewers.

prerequisite-terms:
  - point-cloud
advanced-terms:
  - spherical-harmonics

introduced-in: 1994
introduced-by: Greg Turk; Stanford University
introduced-source-url: https://en.wikipedia.org/wiki/PLY_(file_format)
introduced-quote-en: |
  PLY is a computer file format known as the Polygon File Format or the Stanford Triangle Format.

related-tools:
  - supersplat
  - inria-gaussian-splatting
related-engines:
  - supersplat
related-papers: null

source-url: http://graphics.stanford.edu/data/3Dscanrep/
source-author: null
captured-at: 2026-04-29
captured-by: auto
language: en
verification: pending
verified-by: null
verified-at: null

quote-en: |
  Unless otherwise noted, the range data and reconstructed models in this repository are stored in PLY files. This format was developed at Stanford University, and the source code is available for download.
quote-zh: null
sources:
  - http://graphics.stanford.edu/data/3Dscanrep/
  - https://en.wikipedia.org/wiki/PLY_(file_format)

license: 引用合理使用
notes: |
  - `introduced-in` 与 `introduced-by` 取自维基信息框（Initial release 1994, Greg Turk / Stanford）；若需更严谨档案可对照 Greg Turk 原始格式说明 PDF。
---

# 来源原文 / 整理

自 sources 第 1 条（Stanford 3D Scanning Repository，*File format* 段）：

> Unless otherwise noted, the range data and reconstructed models in this repository are stored in PLY files. This format was developed at Stanford University, and the source code is available for download.

自 sources 第 2 条（*PLY (file format)* 首段）：

> PLY is a computer file format known as the Polygon File Format or the Stanford Triangle Format. It was principally designed to store three-dimensional data from 3D scanners.
