# TASK-03 阶段 2 · Track C（Reddit r/GaussianSplatting）

继续阶段 1 工作。本轨道阶段 1 共产出 26 条候选，但 Reddit 板块大量重复阶段 A/B 的工具，且许多学术项目无持续维护。Opus 审核保留 **3 条进入 keep 列表**。

## 主 brief（必读）
请先阅读：`knowledge-base/TASK-03-tools-stage-2.md`

## 本轨道 keep 列表（共 3 条）

```
C1   gaussiansplatting-app     # iOS/Android 移动 viewer（独立产品，不与其他重复）
C5   splatfacto-w              # Nerfstudio 内的官方训练方法（已被纳入 nerfstudio 但作为独立 method 也可以建条）
C24  glassbox-rs               # 一个开源项目（请验证 GitHub 是否仍活跃）
```

## 本轨道特别说明

1. **本轨道 keep 列表很短，主因是 Reddit 候选大量与 Track A 重复**。Opus 审核结论：阶段 2 只抓这 3 条独立产品，其余 23 条要么并入 Track A 主条目，要么归 cases.ts（学术项目无维护），要么直接 drop（用户 fork 玩具项目）。

2. **C5 splatfacto-w**：这是 nerfstudio 的官方训练 method（"w" = "in the wild"，专为非控制环境拍摄的图集设计）。如果发现它本质上只是 nerfstudio 的一个子模块，请在 .md notes 写明"建议作为 nerfstudio 的子条目而非独立 tool"，由 Opus 决定。**.ts.snippet 仍按工具产出**。

3. **C24 glassbox-rs**：阶段 1 时已发现 freshnessSignal 不明朗，请重新核查 GitHub 最近 6 个月 commit 情况。如果完全没有 commit，把 priceNote 改为"github-no-commits-12m，建议降低优先级"，并在 cons 中加"近 12 个月 GitHub 无更新"。

4. **重要 — 处理 Reddit 上发现但实际是其他工具营销的条目**：阶段 1 有大量 Reddit 帖子推荐已经存在的商业工具（如 Polycam / Luma），这些**不在本轨道 keep 列表**中，请勿重复抓取。如果你在执行过程中发现有遗漏的优秀独立工具，请在自检报告中提出"建议补加 X，理由 Y"，但**先不要直接抓**。

## 跨轨道合并提醒

| slug | 主轨道 | 也出现于 |
|---|---|---|
| nerfstudio | A | 本轨 C2（已合并） |
| colmap | A | 本轨 C2（已合并） |

## 进度自检

完成后请在 `_stage-1/track-C.md` 末尾补"阶段 2 完成报告"。

**特别项**：请额外回答"在执行 .ts.snippet 抓取过程中，是否发现 Reddit 上有遗漏的高价值独立工具未进入阶段 1 候选池"？如有，列出 1-3 条建议（slug + 1 句话理由），由 Opus 决定是否补抓。

## 开始执行

按 keep 列表产出 .md + .ts.snippet。
