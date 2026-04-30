# glossary Snippet 审计报告（2026-04-30）

## 摘要

| 指标 | 数量 |
|------|------|
| 总 snippet 数 | 25 |
| 直接入库（NEW，无 taxonomy/字符串/sources/quote 问题） | 23 |
| 覆盖现有（DUPLICATE_OVERWRITE） | 0 |
| 疑似重复（SUSPECT_DUPLICATE） | 0 |
| 跨类错放（MISCATEGORIZED） | 0（本摊未启用） |
| drop 候选（DROP_CANDIDATE） | 0 |
| 字段合规问题 | 0 |
| 硬约束违规（中文 zh） | 2 |
| 弱 sources（&lt;2） | 0 |


**对照文件**：`src/lib/data/glossary.ts（id）`；**taxonomy**：`src/lib/taxonomy.ts`。

## 决策表（全量 25 条）

| id | 状态 | 字段问题 | 硬约束违规 | 建议动作 |
|------|------|----------|------------|----------|
| anisotropic-gaussian | NEW | - | - | 直接拼装 |
| bundle-adjustment | NEW | - | - | 直接拼装 |
| camera-extrinsics | NEW | - | - | 直接拼装 |
| camera-intrinsics | NEW | - | - | 直接拼装 |
| covariance-matrix | NEW | - | - | 直接拼装 |
| epipolar-geometry | NEW | - | - | 直接拼装 |
| essential-matrix | NEW | - | STRING_CONSTRAINT_VIOLATION: line 10 含 single-quote; line 10 含 single-quote | 修中文 zh 禁字符后入库 |
| exposure-compensation | NEW | - | - | 直接拼装 |
| feature-matching | NEW | - | - | 直接拼装 |
| fps-realtime | NEW | - | - | 直接拼装 |
| fundamental-matrix | NEW | - | STRING_CONSTRAINT_VIOLATION: line 10 含 single-quote; line 10 含 single-quote | 修中文 zh 禁字符后入库 |
| l1-reconstruction-loss | NEW | - | - | 直接拼装 |
| log-scale-parameterization | NEW | - | - | 直接拼装 |
| memory-footprint-metric | NEW | - | - | 直接拼装 |
| multi-view-triangulation | NEW | - | - | 直接拼装 |
| photometric-loss | NEW | - | - | 直接拼装 |
| quaternion-rotation | NEW | - | - | 直接拼装 |
| reprojection-error | NEW | - | - | 直接拼装 |
| screen-space-gradient | NEW | - | - | 直接拼装 |
| splat-clone | NEW | - | - | 直接拼装 |
| splat-compression | NEW | - | - | 直接拼装 |
| splat-split | NEW | - | - | 直接拼装 |
| streaming-splat | NEW | - | - | 直接拼装 |
| temporal-stability-metric | NEW | - | - | 直接拼装 |
| view-dependent-color | NEW | - | - | 直接拼装 |

## 详细问题清单

### INVALID_TAXONOMY

- （无）

### STRING_CONSTRAINT_VIOLATION

- **essential-matrix**：10 — single-quote
- **fundamental-matrix**：10 — single-quote



### WEAK_SOURCES

- （无）

---

*机器扫描：`_audit/_run-cng-audit.mjs` + 本脚本；原始 JSON：`_cng-audit-raw.json`。只读审计，未修改 `src/` 与 snippet。*
