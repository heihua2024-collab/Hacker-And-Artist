# TASK-08 · SUPERSPLAT 窗口 · B 轨补抓 + 边缘核查

**目标**：B 轨阶段 2 自检报告里 Auto 主动建议补抓 3 条 + flag 了 3 条边缘条目需核查。本批次共 6 个动作。

---

## A. 补抓 3 条新工具

这三条都是 Auto 在阶段 2 自检中明确推荐的高价值工具，Opus 审核认可。请按 tools.ts schema 产出 .md + .ts.snippet。

```
spark                       # World Labs 推出的 THREE.js 渲染器（sparkjsdev/spark），社区帖讨论 2.0 版本
splat-transform             # PlayCanvas 的 CLI 多格式互转工具，与 SuperSplat 生态强相关
niantic-spz-reference       # Niantic 官方 SPZ 压缩格式参考实现（nianticlabs/spz）
```

### 字段填充指引

复用 TASK-03 阶段 2 的 schema（参见 `TASK-03-tools-stage-2.md` A 节）：

| slug | category | tags 提示 | discoverySource |
|---|---|---|---|
| `spark` | viewing | `["web_rendering"]` | `"supersplat"` |
| `splat-transform` | editing | `[]` 留空 | `"supersplat"` |
| `niantic-spz-reference` | publishing | `[]` 留空 | `"supersplat"` |

每条 sources ≥ 2 条（GitHub README + 至少一条社区/官方公告）。

---

## B. 边缘核查 3 条（仅产 .md，不必产 .ts.snippet）

这三条不是补抓，而是请你**给出明确判断**让 Opus 决策。每条产出一个简短 .md（≤ 200 字），放在 `knowledge-base/sources/tools/_audit/` 目录下。

### 核查 1：`gsplat-js` 是否与 `three-gaussian-splatting` 重复

- 阶段 2 报告中 Auto 自己 flag："`gsplat-js` 与 tools.ts 中 `three-gaussian-splatting` 可能同指 `mkkellogg/GaussianSplats3D`"
- 请打开两个 GitHub repo 对照 owner/repo 路径，给出明确判断：是 / 否 / 部分重复
- 如确认重复，建议保留哪个 slug、丢弃哪个 slug，并说明理由
- 输出文件：`_audit/gsplat-js-dedup.md`

### 核查 2：`octobits-splat-viewer` 真实产品名

- 阶段 2 报告中 Auto 自己 flag："公开名疑为 StorySplat Viewer，与 slug 不一致"
- 请访问其官网 / GitHub README，确认产品官方品牌名
- 输出明确建议：slug 改为什么、homepage 改为什么、是否与 storysplat（已存在）合并
- 输出文件：`_audit/octobits-splat-viewer-rename.md`

### 核查 3：`spz-format` / `ply-format` 是否应迁 glossary

- 阶段 2 报告中 Auto 自己 flag："二者本质是文件格式而非软件，建议归 glossary"
- 请重新审视：
  - SPZ 是 Niantic 公司在 2024 推出的压缩格式（已有官方参考实现，本批次正在补抓）
  - PLY 是 1994 年斯坦福大学推出的通用点云/网格格式
- 给出明确建议：保留在 tools.ts / 迁到 glossary.ts / 双重存在（一个 tool slug 指向参考实现，一个 glossary id 解释格式本身）
- 输出文件：`_audit/spz-ply-format-classification.md`

---

## C. TS 字符串硬约束

复用 TASK-03 阶段 2 的 C 节：中文字符串内禁用英文 `"` `'` `` ` `` `\`，英文用 `\"` 转义。

---

## D. 完成报告

完成后回复：
1. 补抓 3 条状态：each ✅ / ❌（理由）
2. 边缘核查 3 个，给出的判断分别是什么
3. 是否在补抓过程中又发现新的"应进入工具池"的高价值条目？列 1-3 条建议
