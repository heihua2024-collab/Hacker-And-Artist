# TASK-03 阶段 2 · Track F（日韩区）

继续阶段 1 工作。本轨道阶段 1 共产出 24 条候选，Opus 审核保留 **7 条进入 keep 列表**（其余多为大型企业的 R&D 公告或非独立工具）。

## 主 brief（必读）
请先阅读：`knowledge-base/TASK-03-tools-stage-2.md`

## 本轨道 keep 列表（共 7 条）

```
# === 日本（Japan）===
F1   izutsuya                   # 株式会社 IZUTSUYA（建筑数字化）
F2   trnio-japan                # 注意：是日本本地版还是国际版？请核实
F3   monogram-japan             # 一家做扫描服务的日本工作室
F4   noratech-3dgs              # 日本初创

# === 韩国（Korea）===
F6   annx-studio                # 韩国 ANNX Studio（同时也在 Track A 出现，作为亚太代表性厂商）
F12  visualcamp                 # 韩国
F17  korea-3dgs-platform        # 待核实正式名称（疑似 nara3d 或类似）
```

## 本轨道特别说明

1. **必须用本地语言验证**：本轨道是阶段 1 brief 唯一明确要求"必须搜本地语言"的轨道。阶段 2 也保持这一原则：
   - 日本工具：在日文官网（.jp 域名优先）抓 evidence-quote，**保留 verbatim 日文**，然后在 description 中提供中英双语翻译。
   - 韩国工具：在韩文官网（.kr 或 .co.kr 域名优先）抓 evidence-quote，**保留 verbatim 韩文**，同样在 description 中提供中英双语翻译。

2. **F6 ANNX Studio 跨轨道**：在 Track A 也作为代表性厂商出现。请在 .md notes 中说明"国际曝光通过 Radiance Fields，本地曝光通过 Korean dev community"，**.ts.snippet 由本轨道产出**（因为本轨道的 evidence-quote 用了韩文原文，更有"地区代表性"价值）。

3. **F2 trnio-japan 名称待核实**：trnio 本身是国际产品（已在 Track A 是否有？请检查阶段 1 候选池）。如果 F2 只是 trnio 的日本市场推广，**不要单独建条**，并入 trnio（如有）；如果 F2 是日本本土的独立产品，按独立工具处理。请在 .md notes 中明确这一判断。

4. **F17 korea-3dgs-platform 名字是占位符**：阶段 1 时未能确认正式产品名。阶段 2 必须确认正式名称，确认不到的话**不要产出 .ts.snippet**，仅产出 .md 描述发现过程并标 [unverified]。

5. **vendor 字段必填**：填日韩本地公司名（汉字 / 假名 / 韩文都可，但保持 verbatim）。region 字段日本工具填 `"japan"`，韩国工具填 `"korea"`。

## 跨轨道合并提醒

| slug | 主轨道 | 处理 |
|---|---|---|
| annx-studio | F | A 轨已发现，不重复抓 |

## 进度自检

完成后请在 `_stage-1/track-F.md` 末尾补"阶段 2 完成报告"。

**额外特别项**：
1. 7 个工具的 evidence-quote 是否都使用了本地语言（日文 / 韩文）？逐个标 ✅ / ❌。
2. 是否在抓取过程中发现了阶段 1 漏掉的日韩高价值工具？如有，列出 1-3 条建议。
3. F2 trnio-japan 是独立产品还是 trnio 的本地化推广？给出明确判断。
4. F17 korea-3dgs-platform 的正式名称是否确认？

## 开始执行

按 keep 列表产出 .md + .ts.snippet。
