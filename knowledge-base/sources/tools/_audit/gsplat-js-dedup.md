# 核查：gsplat-js 与 three-gaussian-splatting

**判断：是，同一产品（完全重复）。**

依据：`tools.ts` 中 `three-gaussian-splatting` 的 `homepageUrl` 与 `repoUrl` 均为 `https://github.com/mkkellogg/GaussianSplats3D`。阶段 2 中 `gsplat-js` 条目按 keep 说明也指向该仓库。GitHub 路径 owner/repo 一致，无「部分重复」余地。

**建议**：保留 slug **`three-gaussian-splatting`**（已在主表、命名与 Three.js 生态一致）。**丢弃或不再使用**独立 slug **`gsplat-js`**，避免与 npm 包名 `gsplat`（Dylan Ebert）混淆。若需别名，可在前端做 slug 重定向，不双开两条工具记录。
