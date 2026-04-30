# TASK-03 阶段 2 · Track D（X / Twitter）

继续阶段 1 工作。本轨道阶段 1 共产出 16 条候选，X 平台主要是营销推文，许多推文是其他工具的广告（如 Polycam 官方账号转发）。Opus 审核保留 **5 条独立产品进入 keep 列表**。

## 主 brief（必读）
请先阅读：`knowledge-base/TASK-03-tools-stage-2.md`

## 本轨道 keep 列表（共 5 条）

```
D4   spatialux                 # 独立 SaaS（请核查 90 天活跃度）
D5   gracia-3d-flow            # 独立 web 平台
D10  spatial-com-3d            # 已上线产品
D11  4d-volumetric-capture     # 一家公司发布的 viewer
D14  splatical                 # 浏览器扩展形态的 viewer
```

## 本轨道特别说明

1. **本轨道 keep 列表很短，因为 X 上大量推文是其他工具的营销内容**。这是预期内的——Track D 的目的是发现"只在 X 出现、不在 Radiance Fields 名单上"的独立产品，并非穷尽所有提到 3DGS 的推文。

2. **每条都必须重新核查 90 天活跃度**：Track D 是新工具/早期产品的高发地，但也是"宣布即沉寂"的高发地。请重点验证：
   - 公司/作者最近 90 天是否有新推文 / blog post / 产品更新
   - 如停滞，在 cons 中加"X 账号最近 90 天无更新"，priceNote 标"项目活跃度待观察"

3. **D11 4d-volumetric-capture 名字看起来像 generic 描述**：请核实它是公司/产品的真实名字还是泛指。如果是泛指，请在 .md notes 写明"无法验证为独立产品"，并暂不产出 .ts.snippet（由 Opus 决定）。

4. **D14 splatical 浏览器扩展**：category 选 `viewing`，platforms 写 `["Web"]`，并在 cons 中标明依附浏览器（如 Chrome 扩展商店上架状态）。

## 跨轨道合并提醒

| slug | 主轨道 | 处理 |
|---|---|---|
| polycam（推文） | A | 不在本轨抓 |
| luma-ai（推文） | A | 不在本轨抓 |
| postshot（推文） | A | 不在本轨抓 |

## 进度自检

完成后请在 `_stage-1/track-D.md` 末尾补"阶段 2 完成报告"。

**特别项**：请额外回答"在执行抓取过程中，是否发现 D 轨候选的 90 天活跃度反转情况"——比如阶段 1 标 "active" 但深入查后发现已停滞，或反之。

## 开始执行

按 keep 列表产出 .md + .ts.snippet。
