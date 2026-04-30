# TASK-03 阶段 2 · Track B（SuperSplat 生态）

继续阶段 1 工作。本轨道阶段 1 共产出 16 条候选，Opus 审核保留 **11 条进入 keep 列表**。

## 主 brief（必读）
请先阅读：`knowledge-base/TASK-03-tools-stage-2.md`

## 本轨道 keep 列表（共 11 条）

```
B1   supersplat
B2   superspl-at                # SuperSplat 托管平台（与 B1 区别：B1 是编辑器，B2 是托管/分享平台）
B3   playcanvas-engine          # 引擎（注意与 engines.ts 协调）
B4   spz-format                 # Niantic 的格式标准（如不是工具是格式，请在 .md notes 中说明，可能由 Opus 移到 glossary）
B5   gsplat-js                  # mkkellogg 的 web viewer
B6   threejs-gaussian-splatting # antimatter15 的 viewer
B7   3dgs-mcmc                  # 中科大的训练算法（可能由 Opus 移到 cases.ts）
B12  niantic-scaniverse-pro
B13  ply-format                 # 同 B4，可能是格式不是工具
B14  webxr-splats               # 浏览器 WebXR + Splat 集成示范
B15  octobits-splat-viewer      # 第三方 viewer
```

## 本轨道特别说明

1. **B3 playcanvas-engine 与 engines.ts 协调**：PlayCanvas 同时是引擎（已在 engines.ts）和孵化 SuperSplat 的母体。本条 .ts.snippet 中 `tags` 加上 `"engine"`，并在 description 里说明它和 engines.ts 中条目的关系。**不要重复创建** —— 本条作为"工具视角"补充。

2. **B4 spz-format / B13 ply-format 可能不是工具而是格式标准**：如果产生 .md 时发现这是文件格式而非软件，请在 .md `notes` 字段明确写"建议归类为 glossary 而非 tool"，并照常产出 .ts.snippet（Opus 会决定是否真的归 glossary）。

3. **B7 3dgs-mcmc 是论文配套代码**：如果发现它没有持续维护、纯学术，请标 `freshnessSignal: "github-no-commits-12m"` 并在 notes 建议"考虑归 cases.ts (milestone)"。

4. **B5 / B6 / B14 / B15 都是 web viewer**：category 全部填 `viewing`，platforms 全部填 `["Web"]`。注意区分它们的差异点（在 description 中体现）。

## 跨轨道合并提醒

| slug | 主轨道 | 也出现于 |
|---|---|---|
| supersplat | B | C（GitHub 上 PlayCanvas/supersplat repo） |
| nerfstudio | A（已分配主轨）| 本轨道勿重复抓 |

## 进度自检

完成后请在 `_stage-1/track-B.md` 末尾补"阶段 2 完成报告"。

## 开始执行

按 keep 列表产出 .md + .ts.snippet。
