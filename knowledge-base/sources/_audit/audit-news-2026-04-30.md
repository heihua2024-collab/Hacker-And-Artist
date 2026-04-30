# news Snippet 审计报告（2026-04-30）

## 摘要

| 指标 | 数量 |
|------|------|
| 总 snippet 数 | 25 |
| 直接入库（NEW，无 taxonomy/字符串/sources/quote 问题） | 0 |
| 覆盖现有（DUPLICATE_OVERWRITE） | 25 |
| 疑似重复（SUSPECT_DUPLICATE） | 0 |
| 跨类错放（MISCATEGORIZED） | 0（本摊未启用） |
| drop 候选（DROP_CANDIDATE） | 0 |
| 字段合规问题 | 0 |
| 硬约束违规（中文 zh） | 0 |
| 弱 sources（&lt;2） | 0 |


**对照文件**：`src/lib/data/news.ts（id）`；**taxonomy**：`src/lib/taxonomy.ts`。

## 决策表（全量 25 条）

| id | 状态 | 字段问题 | 硬约束违规 | 建议动作 |
|------|------|----------|------------|----------|
| babylon-js-9-advanced-gaussian-splat | DUPLICATE_OVERWRITE | - | - | 覆盖现有 src/lib/data 同 id |
| cesium-3dgs-hierarchical-lod-3d-tiles | DUPLICATE_OVERWRITE | - | - | 覆盖现有 src/lib/data 同 id |
| cn-bilibili-3dgeer-iclr | DUPLICATE_OVERWRITE | - | - | 覆盖现有 src/lib/data 同 id |
| cn-bytedance-seed3d2-release | DUPLICATE_OVERWRITE | - | - | 覆盖现有 src/lib/data 同 id |
| cn-gsprior-tsinghua-surface | DUPLICATE_OVERWRITE | - | - | 覆盖现有 src/lib/data 同 id |
| cn-habitat-gs-zju-simulator | DUPLICATE_OVERWRITE | - | - | 覆盖现有 src/lib/data 同 id |
| cn-moore-litgs-opensource | DUPLICATE_OVERWRITE | - | - | 覆盖现有 src/lib/data 同 id |
| cn-parkgaussian-parking | DUPLICATE_OVERWRITE | - | - | 覆盖现有 src/lib/data 同 id |
| cn-techwalker-habitat-gs-report | DUPLICATE_OVERWRITE | - | - | 覆盖现有 src/lib/data 同 id |
| cn-xgrids-lcc2-infra | DUPLICATE_OVERWRITE | - | - | 覆盖现有 src/lib/data 同 id |
| cn-xgrids-nab-product-2026 | DUPLICATE_OVERWRITE | - | - | 覆盖现有 src/lib/data 同 id |
| cn-zhuma-innovation-angel-round | DUPLICATE_OVERWRITE | - | - | 覆盖现有 src/lib/data 同 id |
| dne-gracia-4dgs-streaming-performance | DUPLICATE_OVERWRITE | - | - | 覆盖现有 src/lib/data 同 id |
| fastgs-training-100-seconds | DUPLICATE_OVERWRITE | - | - | 覆盖现有 src/lib/data 同 id |
| gaussian-blending-intra-pixel-alpha | DUPLICATE_OVERWRITE | - | - | 覆盖现有 src/lib/data 同 id |
| geo-week-2026-gaussian-sessions | DUPLICATE_OVERWRITE | - | - | 覆盖现有 src/lib/data 同 id |
| ibgs-image-based-gaussian-splatting | DUPLICATE_OVERWRITE | - | - | 覆盖现有 src/lib/data 同 id |
| khronos-gltf-gaussian-uploadvr | DUPLICATE_OVERWRITE | - | - | 覆盖现有 src/lib/data 同 id |
| milan-clubhouse-26-gaussian-archive | DUPLICATE_OVERWRITE | - | - | 覆盖现有 src/lib/data 同 id |
| nuke-17-native-gaussian-splats | DUPLICATE_OVERWRITE | - | - | 覆盖现有 src/lib/data 同 id |
| playcanvas-supersplat-studio-launch | DUPLICATE_OVERWRITE | - | - | 覆盖现有 src/lib/data 同 id |
| radiancefields-newsletter-mar-2026 | DUPLICATE_OVERWRITE | - | - | 覆盖现有 src/lib/data 同 id |
| world-labs-autodesk-200m-partnership | DUPLICATE_OVERWRITE | - | - | 覆盖现有 src/lib/data 同 id |
| world-labs-spark-2-streaming-3dgs | DUPLICATE_OVERWRITE | - | - | 覆盖现有 src/lib/data 同 id |
| yonosplat-feedforward-model | DUPLICATE_OVERWRITE | - | - | 覆盖现有 src/lib/data 同 id |

## 详细问题清单

### INVALID_TAXONOMY

- （无）

### STRING_CONSTRAINT_VIOLATION

- （无）



### WEAK_SOURCES

- （无）

---

*机器扫描：`_audit/_run-cng-audit.mjs` + 本脚本；原始 JSON：`_cng-audit-raw.json`。只读审计，未修改 `src/` 与 snippet。*
