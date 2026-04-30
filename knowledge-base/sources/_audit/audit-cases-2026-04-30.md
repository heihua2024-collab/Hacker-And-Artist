# cases Snippet 审计报告（2026-04-30）

## 摘要

| 指标 | 数量 |
|------|------|
| 总 snippet 数 | 12 |
| 直接入库（NEW，无 taxonomy/字符串/sources/quote 问题） | 10 |
| 覆盖现有（DUPLICATE_OVERWRITE） | 0 |
| 疑似重复（SUSPECT_DUPLICATE） | 2 |
| 跨类错放（MISCATEGORIZED） | 0（本摊未启用） |
| drop 候选（DROP_CANDIDATE） | 0 |
| 字段合规问题 | 0 |
| 硬约束违规（中文 zh） | 0 |
| 弱 sources（&lt;2） | 0 |
| 缺 quote 对象或双空（MISSING_QUOTE） | 0 |

**对照文件**：`src/lib/data/cases.ts（slug）`；**taxonomy**：`src/lib/taxonomy.ts`。

## 决策表（全量 12 条）

| slug | 状态 | 字段问题 | 硬约束违规 | 建议动作 |
|------|------|----------|------------|----------|
| 2d-gaussian-splatting | NEW | - | - | 直接拼装 |
| 4d-gaussian-splatting | NEW | - | - | 直接拼装 |
| compact-3d-gaussian | NEW | - | - | 直接拼装 |
| deformable-3d-gaussians | NEW | - | - | 直接拼装 |
| dreamgaussian | NEW | - | - | 直接拼装 |
| gaussian-avatars | NEW | - | - | 直接拼装 |
| gaussian-splatting-slam | NEW | - | - | 直接拼装 |
| hugs | NEW | - | - | 直接拼装 |
| langsplat | NEW | - | - | 直接拼装 |
| mip-splatting | SUSPECT_DUPLICATE(mip-splatting-anti-aliased) | - | - | 等 Opus 决策合并或保留 |
| scaffold-gs | NEW | - | - | 直接拼装 |
| sugar | SUSPECT_DUPLICATE(sugar-surface-aligned-meshes) | - | - | 等 Opus 决策合并或保留 |

## 详细问题清单

### INVALID_TAXONOMY

- （无）

### STRING_CONSTRAINT_VIOLATION

- （无）

### MISSING_QUOTE（quote 块缺失或中英文皆空）

- （无）

### SUSPECT_DUPLICATE 详细（人工标注）

- **mip-splatting** vs **mip-splatting-anti-aliased**（cases.ts 现有）：slug 不同一，但主题均为 Mip-Splatting 论文线，建议 Opus 决定合并 slug 或双开 milestone。
- **sugar** vs **sugar-surface-aligned-meshes**（cases.ts 现有）：短 slug 与长 slug 可能同指 SuGaR 工作，建议核对 arXiv 与项目页后合并。

### WEAK_SOURCES

- （无）

---

*机器扫描：`_audit/_run-cng-audit.mjs` + 本脚本；原始 JSON：`_cng-audit-raw.json`。只读审计，未修改 `src/` 与 snippet。*
