# 核查：spz-format / ply-format 是否迁 glossary

**判断**：**SPZ** 与 **PLY（3DGS 约定）** 本质是格式规范；**niantic-spz-reference**（本批补抓）与 **SplatTransform** 等才是可执行工具链。

**建议（双重存在）**：  
1. 在 **glossary** 中为 **SPZ**、**PLY（3DGS profile）** 各建条目，写清制定方、年份与字段约定。  
2. 在 **tools.ts** 保留 **niantic-spz-reference**（及可选 **spz-format** 合并）作为 **参考实现入口**；**ply-format** 可降级为 **仅文档链接** 或并入 glossary，避免与「可安装软件」混类。
