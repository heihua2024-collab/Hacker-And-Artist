# tools Snippet 审计报告（2026-04-30）

## 摘要

| 指标 | 数量 |
|------|------|
| 总 snippet 数 | 89 |
| 直接入库（NEW，无 taxonomy/字符串/sources 问题） | 36 |
| 覆盖现有（DUPLICATE_OVERWRITE） | 7 |
| 疑似重复（SUSPECT_DUPLICATE） | 3 |
| 跨类错放（MISCATEGORIZED_TO_GLOSSARY） | 4 |
| drop 候选（DROP_CANDIDATE） | 3 |
| 字段合规问题（INVALID_TAXONOMY 等） | 45 |
| 硬约束违规（中文 zh 含禁字符） | 5 |
| 弱 sources（&lt;2） | 0 |

说明：**直接入库** 指主状态为 NEW、且无 INVALID_TAXONOMY、无 STRING_CONSTRAINT_VIOLATION、无 WEAK_SOURCES。多数条目 `useCases`/`tags` 使用了非 taxonomy 的扩展枚举（如 `education`、`desktop`、`real_estate`），需统一映射后才能无损拼装。

## 决策表（全量 89 条）

| slug | 状态 | 字段问题 | 硬约束违规 | 建议动作 |
|------|------|----------|------------|----------|
| 3dgs-mcmc | MISCATEGORIZED_TO_GLOSSARY | INVALID_TAXONOMY: useCases invalid: ["education"] | STRING_CONSTRAINT_VIOLATION: line 13 含 backtick; line 13 含 backtick; line 13 含 backtick; line 13 含 backtick; line 13 含 backtick; line 13 含 backtick …共 10 处 | 迁 glossary 或改类 |
| adobe-lightroom | NEW | - | - | 直接拼装 |
| adobe-premiere-pro | NEW | - | - | 直接拼装 |
| agisoft-metashape | NEW | INVALID_TAXONOMY: tags invalid: ["desktop","commercial"]; useCases invalid: ["park","real_estate"] | - | 对齐 taxonomy（tags/useCases 等）后入库 |
| annx-studio | NEW | INVALID_TAXONOMY: tags invalid: ["desktop","commercial"]; useCases invalid: ["real_estate","performance"] | - | 对齐 taxonomy（tags/useCases 等）后入库 |
| arrival-space | NEW | INVALID_TAXONOMY: tags invalid: ["web","freemium","commercial"]; useCases invalid: ["event","education","performance"] | - | 对齐 taxonomy（tags/useCases 等）后入库 |
| blurry | NEW | INVALID_TAXONOMY: tags invalid: ["web","commercial"]; useCases invalid: ["real_estate","event"] | - | 对齐 taxonomy（tags/useCases 等）后入库 |
| brush | NEW | INVALID_TAXONOMY: tags invalid: ["desktop","web","opensource"]; useCases invalid: ["education"] | - | 对齐 taxonomy（tags/useCases 等）后入库 |
| bsd-studio | NEW | - | - | 直接拼装 |
| cesium | NEW | INVALID_TAXONOMY: tags invalid: ["web","opensource","commercial"]; useCases invalid: ["real_estate","park"] | - | 对齐 taxonomy（tags/useCases 等）后入库 |
| chaos-v-ray | NEW | INVALID_TAXONOMY: tags invalid: ["desktop","commercial"]; useCases invalid: ["real_estate","performance"] | - | 对齐 taxonomy（tags/useCases 等）后入库 |
| colmap | NEW | INVALID_TAXONOMY: tags invalid: ["desktop","opensource"]; useCases invalid: ["real_estate","park"] | - | 对齐 taxonomy（tags/useCases 等）后入库 |
| davinci-resolve | NEW | - | - | 直接拼装 |
| dioramix | NEW | INVALID_TAXONOMY: tags invalid: ["web","freemium"]; useCases invalid: ["education","performance"] | - | 对齐 taxonomy（tags/useCases 等）后入库 |
| divshot | NEW | INVALID_TAXONOMY: tags invalid: ["opensource"] | - | 对齐 taxonomy（tags/useCases 等）后入库 |
| dji-terra | NEW | - | - | 直接拼装 |
| ffmpeg | NEW | - | - | 直接拼装 |
| gaussiansplatting-app | NEW | - | - | 直接拼装 |
| gauzilla | NEW | INVALID_TAXONOMY: tags invalid: ["web","opensource","freemium"]; useCases invalid: ["education"] | - | 对齐 taxonomy（tags/useCases 等）后入库 |
| glassbox-rs | DROP_CANDIDATE | - | - | drop（待 Opus 确认） |
| gracia | NEW | INVALID_TAXONOMY: tags invalid: ["web","commercial"]; useCases invalid: ["performance","event","park"] | - | 对齐 taxonomy（tags/useCases 等）后入库 |
| gracia-3d-flow | NEW | - | - | 直接拼装 |
| graswald | NEW | INVALID_TAXONOMY: tags invalid: ["web","commercial"]; useCases invalid: ["event","education"] | - | 对齐 taxonomy（tags/useCases 等）后入库 |
| gsplat-js | SUSPECT_DUPLICATE(gsplat) | - | STRING_CONSTRAINT_VIOLATION: line 13 含 backtick; line 13 含 backtick; line 13 含 backtick; line 13 含 backtick; line 13 含 backtick; line 13 含 backtick …共 16 处 | 等 Opus 决策合并或保留 |
| handbrake | NEW | - | - | 直接拼装 |
| huawei-cyberverse | NEW | - | - | 直接拼装 |
| hugin | NEW | - | - | 直接拼装 |
| insta360 | NEW | - | - | 直接拼装 |
| izutsuya | NEW | - | - | 直接拼装 |
| kiri-engine | DUPLICATE_OVERWRITE | INVALID_TAXONOMY: tags invalid: ["mobile","web","commercial"]; useCases invalid: ["education","real_estate"] | - | 覆盖现有 tools.ts 同 slug |
| kiri-remy | NEW | - | - | 直接拼装 |
| lichtfeld-studio | NEW | INVALID_TAXONOMY: tags invalid: ["desktop","opensource"]; useCases invalid: ["education","performance"] | - | 对齐 taxonomy（tags/useCases 等）后入库 |
| lifecast-volurama | NEW | INVALID_TAXONOMY: tags invalid: ["desktop","commercial"]; useCases invalid: ["education","performance","event"] | - | 对齐 taxonomy（tags/useCases 等）后入库 |
| luma-ai | DUPLICATE_OVERWRITE | INVALID_TAXONOMY: tags invalid: ["mobile","commercial","freemium"]; useCases invalid: ["real_estate","event"] | - | 覆盖现有 tools.ts 同 slug |
| lumina3d | NEW | - | - | 直接拼装 |
| mapmost-3dgs | NEW | - | - | 直接拼装 |
| metalsplatter | NEW | INVALID_TAXONOMY: tags invalid: ["mobile","opensource"]; useCases invalid: ["performance","education"] | - | 对齐 taxonomy（tags/useCases 等）后入库 |
| mipmap | NEW | - | - | 直接拼装 |
| monogram-japan | NEW | - | - | 直接拼装 |
| nerfstudio | NEW | INVALID_TAXONOMY: tags invalid: ["desktop","opensource"]; useCases invalid: ["education","performance"] | - | 对齐 taxonomy（tags/useCases 等）后入库 |
| netease-yaotai | NEW | - | - | 直接拼装 |
| niantic-scaniverse-pro | NEW | INVALID_TAXONOMY: useCases invalid: ["real_estate","event"] | - | 对齐 taxonomy（tags/useCases 等）后入库 |
| niantic-spz-reference | MISCATEGORIZED_TO_GLOSSARY | - | - | 迁 glossary 或改类 |
| nubigon | NEW | INVALID_TAXONOMY: tags invalid: ["desktop","commercial"]; useCases invalid: ["real_estate","park"] | - | 对齐 taxonomy（tags/useCases 等）后入库 |
| octobits-splat-viewer | NEW | INVALID_TAXONOMY: useCases invalid: ["event","education"] | - | 对齐 taxonomy（tags/useCases 等）后入库 |
| opencv-camera-calibration | NEW | - | - | 直接拼装 |
| parallax-3d | NEW | INVALID_TAXONOMY: tags invalid: ["web","commercial"]; useCases invalid: ["real_estate","event"] | - | 对齐 taxonomy（tags/useCases 等）后入库 |
| photo-mechanic | NEW | - | - | 直接拼装 |
| playcanvas-engine | NEW | INVALID_TAXONOMY: useCases invalid: ["performance","education"] | - | 对齐 taxonomy（tags/useCases 等）后入库 |
| ply-format | MISCATEGORIZED_TO_GLOSSARY | INVALID_TAXONOMY: useCases invalid: ["education"] | - | 迁 glossary 或改类 |
| pointcosm | NEW | - | - | 直接拼装 |
| polycam | DUPLICATE_OVERWRITE | INVALID_TAXONOMY: tags invalid: ["mobile","commercial","freemium"]; useCases invalid: ["real_estate","education"] | - | 覆盖现有 tools.ts 同 slug |
| portality | NEW | INVALID_TAXONOMY: tags invalid: ["web","commercial"]; useCases invalid: ["education","event"] | - | 对齐 taxonomy（tags/useCases 等）后入库 |
| postshot | DUPLICATE_OVERWRITE | INVALID_TAXONOMY: tags invalid: ["desktop","commercial","freemium"]; useCases invalid: ["performance","real_estate"] | - | 覆盖现有 tools.ts 同 slug |
| ptgui | NEW | - | - | 直接拼装 |
| realitycapture | NEW | INVALID_TAXONOMY: tags invalid: ["desktop","commercial","freemium"]; useCases invalid: ["real_estate","park"] | - | 对齐 taxonomy（tags/useCases 等）后入库 |
| realsee | NEW | - | - | 直接拼装 |
| reflct | NEW | INVALID_TAXONOMY: tags invalid: ["web","freemium","commercial"]; useCases invalid: ["real_estate","event"] | - | 对齐 taxonomy（tags/useCases 等）后入库 |
| ronski-360-splat-pro | NEW | INVALID_TAXONOMY: tags invalid: ["desktop","commercial"]; useCases invalid: ["performance","event"] | - | 对齐 taxonomy（tags/useCases 等）后入库 |
| scaniverse | DUPLICATE_OVERWRITE | INVALID_TAXONOMY: tags invalid: ["mobile","commercial"]; useCases invalid: ["park","event"] | - | 覆盖现有 tools.ts 同 slug |
| seed3d-2 | NEW | - | - | 直接拼装 |
| sensetime-qiongyu | NEW | - | - | 直接拼装 |
| shutter-encoder | NEW | - | - | 直接拼装 |
| spark | NEW | INVALID_TAXONOMY: useCases invalid: ["performance","education"] | - | 对齐 taxonomy（tags/useCases 等）后入库 |
| spatial-com-3d | NEW | - | - | 直接拼装 |
| spatialux | DROP_CANDIDATE | - | - | drop（待 Opus 确认） |
| spectacular-ai | NEW | INVALID_TAXONOMY: tags invalid: ["mobile","desktop","commercial"]; useCases invalid: ["park","real_estate"] | - | 对齐 taxonomy（tags/useCases 等）后入库 |
| splat-transform | NEW | - | - | 直接拼装 |
| splatcam | NEW | - | - | 直接拼装 |
| splatfacto-w | NEW | - | STRING_CONSTRAINT_VIOLATION: line 14 含 backtick; line 14 含 backtick | 修中文 zh 引号/反引号等后入库 |
| splatical | DROP_CANDIDATE | - | - | drop（待 Opus 确认） |
| splatking | NEW | - | - | 直接拼装 |
| spline | DUPLICATE_OVERWRITE | INVALID_TAXONOMY: tags invalid: ["web","freemium","commercial"]; useCases invalid: ["education","event"] | - | 覆盖现有 tools.ts 同 slug |
| spz-format | MISCATEGORIZED_TO_GLOSSARY | - | STRING_CONSTRAINT_VIOLATION: line 13 含 backtick; line 13 含 backtick; line 13 含 backtick; line 13 含 backtick; line 24 含 backtick; line 24 含 backtick …共 10 处 | 迁 glossary 或改类 |
| storysplat | NEW | INVALID_TAXONOMY: tags invalid: ["web","freemium","commercial"]; useCases invalid: ["education","event","performance"] | - | 对齐 taxonomy（tags/useCases 等）后入库 |
| superspl-at | SUSPECT_DUPLICATE(supersplat) | INVALID_TAXONOMY: useCases invalid: ["event"] | - | 等 Opus 决策合并或保留 |
| supersplat | DUPLICATE_OVERWRITE | - | - | 覆盖现有 tools.ts 同 slug |
| tencent-hunyuan-3d-world | NEW | - | - | 直接拼装 |
| threejs-gaussian-splatting | SUSPECT_DUPLICATE(antimatter15-splat) | INVALID_TAXONOMY: useCases invalid: ["education"] | STRING_CONSTRAINT_VIOLATION: line 9 含 backtick; line 9 含 backtick; line 9 含 backtick; line 9 含 backtick; line 28 含 backtick; line 28 含 backtick …共 10 处 | 等 Opus 决策合并或保留 |
| tinyhost | NEW | - | - | 直接拼装 |
| topaz-photo-ai | NEW | - | - | 直接拼装 |
| tripo-ai | NEW | INVALID_TAXONOMY: tags invalid: ["web","freemium","commercial"]; useCases invalid: ["education","performance"] | - | 对齐 taxonomy（tags/useCases 等）后入库 |
| trnio-japan | NEW | - | - | 直接拼装 |
| veesus | NEW | INVALID_TAXONOMY: tags invalid: ["desktop","commercial"]; useCases invalid: ["real_estate","park"] | - | 对齐 taxonomy（tags/useCases 等）后入库 |
| visualcamp | NEW | INVALID_TAXONOMY: useCases invalid: ["education"] | - | 对齐 taxonomy（tags/useCases 等）后入库 |
| volinga | NEW | INVALID_TAXONOMY: tags invalid: ["desktop","commercial"]; useCases invalid: ["performance","event","real_estate"] | - | 对齐 taxonomy（tags/useCases 等）后入库 |
| voluma-ai | NEW | INVALID_TAXONOMY: tags invalid: ["web","commercial","freemium"]; useCases invalid: ["real_estate"] | - | 对齐 taxonomy（tags/useCases 等）后入库 |
| webxr-splats | NEW | INVALID_TAXONOMY: useCases invalid: ["performance"] | - | 对齐 taxonomy（tags/useCases 等）后入库 |
| zhitianxia | NEW | - | - | 直接拼装 |

## 详细问题清单

### INVALID_TAXONOMY（tags / level / useCases / category / pricing / platforms / region / discoverySource）

以下条目 `tags` 含非 `taxonomy.ts` 的 TagId（如 mobile、desktop、opensource、commercial、freemium），和/或 `useCases` 含非 `spaceTypes` 的 id（如 education、event、performance、real_estate、park）。需映射到现有 ID 或扩展 taxonomy（由 Opus 定）。

- **3dgs-mcmc**：useCases invalid: ["education"]
- **agisoft-metashape**：tags invalid: ["desktop","commercial"]；useCases invalid: ["park","real_estate"]
- **annx-studio**：tags invalid: ["desktop","commercial"]；useCases invalid: ["real_estate","performance"]
- **arrival-space**：tags invalid: ["web","freemium","commercial"]；useCases invalid: ["event","education","performance"]
- **blurry**：tags invalid: ["web","commercial"]；useCases invalid: ["real_estate","event"]
- **brush**：tags invalid: ["desktop","web","opensource"]；useCases invalid: ["education"]
- **cesium**：tags invalid: ["web","opensource","commercial"]；useCases invalid: ["real_estate","park"]
- **chaos-v-ray**：tags invalid: ["desktop","commercial"]；useCases invalid: ["real_estate","performance"]
- **colmap**：tags invalid: ["desktop","opensource"]；useCases invalid: ["real_estate","park"]
- **dioramix**：tags invalid: ["web","freemium"]；useCases invalid: ["education","performance"]
- **divshot**：tags invalid: ["opensource"]
- **gauzilla**：tags invalid: ["web","opensource","freemium"]；useCases invalid: ["education"]
- **gracia**：tags invalid: ["web","commercial"]；useCases invalid: ["performance","event","park"]
- **graswald**：tags invalid: ["web","commercial"]；useCases invalid: ["event","education"]
- **kiri-engine**：tags invalid: ["mobile","web","commercial"]；useCases invalid: ["education","real_estate"]
- **lichtfeld-studio**：tags invalid: ["desktop","opensource"]；useCases invalid: ["education","performance"]
- **lifecast-volurama**：tags invalid: ["desktop","commercial"]；useCases invalid: ["education","performance","event"]
- **luma-ai**：tags invalid: ["mobile","commercial","freemium"]；useCases invalid: ["real_estate","event"]
- **metalsplatter**：tags invalid: ["mobile","opensource"]；useCases invalid: ["performance","education"]
- **nerfstudio**：tags invalid: ["desktop","opensource"]；useCases invalid: ["education","performance"]
- **niantic-scaniverse-pro**：useCases invalid: ["real_estate","event"]
- **nubigon**：tags invalid: ["desktop","commercial"]；useCases invalid: ["real_estate","park"]
- **octobits-splat-viewer**：useCases invalid: ["event","education"]
- **parallax-3d**：tags invalid: ["web","commercial"]；useCases invalid: ["real_estate","event"]
- **playcanvas-engine**：useCases invalid: ["performance","education"]
- **ply-format**：useCases invalid: ["education"]
- **polycam**：tags invalid: ["mobile","commercial","freemium"]；useCases invalid: ["real_estate","education"]
- **portality**：tags invalid: ["web","commercial"]；useCases invalid: ["education","event"]
- **postshot**：tags invalid: ["desktop","commercial","freemium"]；useCases invalid: ["performance","real_estate"]
- **realitycapture**：tags invalid: ["desktop","commercial","freemium"]；useCases invalid: ["real_estate","park"]
- **reflct**：tags invalid: ["web","freemium","commercial"]；useCases invalid: ["real_estate","event"]
- **ronski-360-splat-pro**：tags invalid: ["desktop","commercial"]；useCases invalid: ["performance","event"]
- **scaniverse**：tags invalid: ["mobile","commercial"]；useCases invalid: ["park","event"]
- **spark**：useCases invalid: ["performance","education"]
- **spectacular-ai**：tags invalid: ["mobile","desktop","commercial"]；useCases invalid: ["park","real_estate"]
- **spline**：tags invalid: ["web","freemium","commercial"]；useCases invalid: ["education","event"]
- **storysplat**：tags invalid: ["web","freemium","commercial"]；useCases invalid: ["education","event","performance"]
- **superspl-at**：useCases invalid: ["event"]
- **threejs-gaussian-splatting**：useCases invalid: ["education"]
- **tripo-ai**：tags invalid: ["web","freemium","commercial"]；useCases invalid: ["education","performance"]
- **veesus**：tags invalid: ["desktop","commercial"]；useCases invalid: ["real_estate","park"]
- **visualcamp**：useCases invalid: ["education"]
- **volinga**：tags invalid: ["desktop","commercial"]；useCases invalid: ["performance","event","real_estate"]
- **voluma-ai**：tags invalid: ["web","commercial","freemium"]；useCases invalid: ["real_estate"]
- **webxr-splats**：useCases invalid: ["performance"]

### STRING_CONSTRAINT_VIOLATION（中文 zh 字面量）

规则：中文字符串内禁用英文 `"` `'` `` ` `\\` `${`（本批主要为 **反引号** 包裹英文技术词出现在 zh 行）。

- **3dgs-mcmc**：line 13 — backtick, backtick, backtick …
- **gsplat-js**：line 13、line 24、line 32 — backtick, backtick, backtick …
- **splatfacto-w**：line 14 — backtick, backtick
- **spz-format**：line 13、line 24、line 32 — backtick, backtick, backtick …
- **threejs-gaussian-splatting**：line 9、line 28、line 38 — backtick, backtick, backtick …

### SUSPECT_DUPLICATE 详细

- **superspl-at** vs **supersplat**：slug 疑似录入笔误拆字（spl-at）；现有 supersplat 已为 PlayCanvas 官方条目。snippet 与正式条并存 → 极可能重复，建议合并或删重复 slug。

- **gsplat-js** vs **gsplat**：名称子串相似但产品不同（JS 查看/绑定库 vs 训练侧 gsplat）。自动化因 normalize 子串匹配标疑似；建议 Opus 保留两条若仓库不同。

- **threejs-gaussian-splatting** vs **antimatter15-splat**（tools.ts）：GitHub 均为 antimatter15/splat，中文 description 已写明与站内 antimatter15-splat 合并考量 → 高置信同物异名，建议统一 slug。

- **voluma-ai**：曾误标 SUSPECT(luma-ai)；normalize 后 **volumai** 含 **luma** 子串所致，与 Luma AI 无必然关系 → 按 **NEW** 处理。

### DROP_CANDIDATE 说明

- **glassbox-rs**：keep 名与公开仓库名不一致；映射到 LioQing/wgpu-3dgs-viewer；`verified: false`。
- **spatialux**：`homepageUrl: null`，域名停放，无可用产品页。
- **splatical**：`homepageUrl: null`，Chrome Web Store 无同名扩展。

### MISSING_EVIDENCE（evidenceQuote）

全 89 条均含 `evidenceQuote` 字段（含非空内容），**0** 条缺失。

### WEAK_SOURCES

全 89 条 `sources` 数组均 **≥2** 条 URL 字符串，**0** 条弱来源。

---

*生成脚本：`_audit/_run-tools-audit.mjs`、`_emit-tools-audit-md.mjs`；原始 JSON：`_tools-audit-raw.json`。仅只读审计，未修改 `src/` 与 snippet。*
