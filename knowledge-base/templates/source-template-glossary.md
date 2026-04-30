---
slug: gaussian-splatting
type: glossary
title-zh: 高斯泼溅
title-en: Gaussian Splatting

# === Glossary 特定字段 ===
abbreviation: 3DGS                          # 缩写；没有就 null
category: technique                         # 见下方枚举（与 src/lib/data/glossary.ts 对齐）
level: beginner                             # beginner | intermediate | expert
also-known-as:                              # 别名（论文/工具里出现过的同义词）
  - 3D Gaussian Splatting

# === 分层定义（核心：服务全光谱用户）===
# short：写给完全没听过的小白，必须用日常类比，禁止学术术语堆砌
short-zh: |
  一种用大量半透明椭球体（叫"高斯"）来表示三维场景的渲染方法，能在保持高画质的同时实现实时帧率。
short-en: |
  A 3D rendering method representing scenes with millions of translucent ellipsoidal Gaussians, achieving photorealistic quality at real-time framerates.

# long：写给从业者/研究者，200-400 字，必须用自己的话重组，不能照抄论文/Wikipedia 原文
long-zh: |
  详细中文解释——必须自己重写，不能照抄任何来源。可以引用论文里的关键短语（10 字内）但要标明出处。
long-en: |
  Detailed English explanation — must be in your own words. Quoting short phrases from papers (under 15 words) is allowed but the origin must be cited.

# === 难度路径（小白学习路径 + 专家延伸路径）===
# prerequisite：要懂这条术语，建议先理解哪些概念
prerequisite-terms:
  - point-cloud
  - rasterization
# advanced：懂了这条之后，可以深入哪些
advanced-terms:
  - mip-splatting
  - 4dgs
  - scaffold-gs

# === 行业溯源（研究者用）===
introduced-in: 2023-07                      # 首次提出/出现的年月（找不到就 null）
introduced-by: Inria / Kerbl, Kopanas et al.
introduced-source-url: https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/
introduced-quote-en: |                       # 首次提出来源的 verbatim 原文（必填，30-80 字）
  We propose 3D Gaussian Splatting, a method for real-time rendering of radiance fields with state-of-the-art quality.

# === 关联到其他模块 ===
# 这些 ID 必须真实存在（slug 与 tools.ts / engines.ts / cases.ts 中的 slug 对齐）
related-tools:                              # 跟这术语强相关的工具/产品
  - inria-gaussian-splatting
  - postshot
related-engines:                            # 跟这术语强相关的引擎
  - babylonjs
  - playcanvas
  - nvidia-omniverse
related-papers:                             # 关键论文 URL（直接 arxiv URL）
  - https://arxiv.org/abs/2308.04079

# === 来源与校验 ===
source-url: https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/
source-author: Inria
captured-at: 2026-04-29
captured-by: auto
language: en
verification: pending
verified-by: null
verified-at: null

quote-en: |                                  # 主要 verbatim 证据（如果跟 introduced-quote-en 相同，可重复）
  Verbatim 30-80 char quote from the canonical source.
quote-zh: null
sources:
  - https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/
  - https://arxiv.org/abs/2308.04079

license: 引用合理使用
notes: |
  - （审核备注、未确认字段、抓取限制等）
---

# 来源原文 / 整理

> 原文摘录...

---

## category 枚举（与 src/lib/data/glossary.ts 完全对齐）

- `concept` — 概念性术语（NeRF, 辐射场, 空间计算）
- `technique` — 技术 / 算法 / 方法（3DGS, SfM, 路径追踪, Mip-Splatting）
- `format` — 文件格式（PLY, .splat, KSplat, SPZ, USD ParticleField）
- `tool` — 工具 / 产品术语（SuperSplat, Polycam, Luma AI, COLMAP）
- `metric` — 评估指标（PSNR, SSIM, LPIPS, FPS）
- `workflow` — 工作流 / 管线（Densification, 训练循环, Pruning）

## level 枚举

- `beginner` — 不懂技术也能听懂大致意思（适合普通爱好者入门）
- `intermediate` — 需要点 3D / 图形学背景（适合从业者）
- `expert` — 需要论文/数学背景（适合研究者）

## 必读：写 short 字段时的"全光谱用户"约束

**INKTOYS 的目标用户横跨四类：行业研究者、行业从业者、技术爱好者、小白爱好者。**
每条术语都要让这四类人在同一页找到自己能消化的层级：

- 小白看 `short` + `prerequisite-terms`（按梯子往上爬）
- 从业者看 `long` + `related-tools` / `related-engines`（接到实际工作）
- 研究者看 `introduced-in` + `introduced-quote-en` + `advanced-terms`（一路追溯到论文）

**`short` 字段的硬约束**：

1. 必须用日常类比（"像...一样"、"想象成..."），禁止"基于...的方法"这类官话
2. 必须 30-60 字内（中文），50-100 字内（英文）
3. 不允许出现 3 个以上未在 `prerequisite-terms` 里出现的术语
4. 如果一定要用专业词，必须放在括号里给中文/英文对照（如"球谐函数 (spherical harmonics)"）
