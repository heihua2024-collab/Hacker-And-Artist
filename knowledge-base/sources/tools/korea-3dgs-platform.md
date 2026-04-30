# korea-3dgs-platform（占位符解析 · 无独立 `.ts.snippet`）

## 结论（对应 Track F 特别项 F17）

- 经 **2026-04-29** 检索，未能找到与「korea-3dgs-platform」这一占位符一一对应、且具备 **韩文官网 + 可验证产品名** 的第三条韩国本土「3DGS 平台」（与 **ANNX Studio / EMX** 相区分）。
- 现有公开信息中，**ANNX Studio（https://www.annx.studio/）** 已由韩国 **EMX（https://emx.co.kr/）** 运营，并在英文官网写明 **Gaussian Splatting** 集成；与本轨道 keep 列表中的 **`annx-studio`** 条目 **高度重合**。

## 处理建议

1. **不产出** `korea-3dgs-platform.ts.snippet`，避免与 `annx-studio.ts.snippet` 重复。
2. 全局合并时：将「韩国 3DGS 平台」类叙事 **并入** `slug: annx-studio`，或在 `tools.ts` 层使用单一记录。

## sources

1. https://www.annx.studio/
2. https://emx.co.kr/
