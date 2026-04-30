# TASK-03 阶段 2 · Track A（Radiance Fields 衍生）

继续阶段 1 的工作。本轨道阶段 1 共产出 46 条候选，Opus 已审核确认 **34 条进入 keep 列表**，需要在阶段 2 补充详细字段并产出可粘贴 TS 代码。

## 主 brief（必读）
请先阅读：`knowledge-base/TASK-03-tools-stage-2.md`

重点关注：
- B 节：客观评价硬约束（pros / cons 不能写主观感受）
- C 节：TypeScript 字符串硬约束（中文里禁用英文直引号）
- D 节：taxonomy.ts 已有 ID 清单（useCases / tags 必须从这里选）
- E 节：输出位置（直接放 `sources/tools/<slug>.md` 和 `sources/tools/<slug>.ts.snippet`）

## 本轨道 keep 列表（共 34 条）

按阶段 1 的 ID 排序：

```
A1   polycam
A2   luma-ai
A4   brush
A5   kiri-engine            # 注意：是这家公司的旗舰产品，不是 KIRI Remy（Remy 是它子产品）
A6   scaniverse
A7   postshot
A8   nerfstudio
A9   spline
A10  volinga
A11  blurry
A12  gauzilla
A14  colmap
A17  lichtfeld-studio
A18  metalsplatter
A20  parallax-3d
A21  portality
A22  reflct
A23  storysplat
A26  graswald
A27  voluma-ai
A28  veesus
A29  realitycapture
A30  tripo-ai
A32  arrival-space
A33  spectacular-ai
A34  agisoft-metashape
A35  annx-studio
A37  gracia
A39  chaos-v-ray
A40  cesium
A41  ronski-360-splat-pro
A42  dioramix                # 标 priceNote: "公开 beta，2026-04 仍在排队邀请制" 
A45  lifecast-volurama
A46  nubigon
```

## 本轨道特别说明

1. **A5 KIRI Engine 的 description 必须提及** Remy 是它家的子产品（具体产品形态可标注 [unverified] 待 Opus 与 E17 合并审核）。

2. **A41 Ronski 360 Splat Pro** 是 Photoshop / Lightroom 插件（不是独立软件），category 选 `editing`，platforms 写 `["Windows", "macOS"]`（依附宿主软件）。

3. **A42 dioramix** 公开 beta，pricing 写 `freemium`，priceNote 写"公开 beta 排队邀请制"，level 选 `intermediate`。

4. **跨轨道合并提醒**：以下工具阶段 1 在多个轨道都出现过，本轨道作为**主条目**，请把所有轨道的 evidence-quote 合并到 `evidence-quote-2`、`evidence-quote-3` 字段（如果新版 .md 模板支持）；如不支持，就在 .md 末尾的 `notes` 字段列出"曾在 Track B/C/D 也被发现"。

| slug | 主轨道 | 也出现于 |
|---|---|---|
| polycam | A | D（推文营销） |
| luma-ai | A | D（推文营销） |
| postshot | A | D |
| kiri-engine | A | E（remy 子产品） |
| nerfstudio | A | C（GitHub 推荐） |
| colmap | A | C |

## 进度自检

完成后请在 `_stage-1/track-A.md` 末尾补一段"阶段 2 完成报告"，按主 brief F 节的 6 项填写。

## 开始执行

请按 keep 列表顺序，依次产出每个工具的 `.md` 和 `.ts.snippet`。如有任何字段不确定，**优先标 [unverified] 并在 notes 写明，不要编造**。

完成后通知 Opus 审核。
