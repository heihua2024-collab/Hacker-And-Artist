# C24 `glassbox-rs` — 仓库核验说明 + 当前映射

## 核验结论（2026-04-29）

1. **GitHub 公开搜索**：`https://api.github.com/search/repositories?q=glassbox-rs` 返回 `total_count: 0`（本环境 curl 实测）。
2. **因此**：无法在公开互联网上把 keep 列表中的字符串 **`glassbox-rs`** 唯一映射到某一确定 GitHub 仓库或主页。

## Opus / 编辑需裁定

- 若 C24 实际指向 **其他名称**（私有仓、改名、或笔误），请用正确 `slug` / `repoUrl` 替换下列「占位映射」。
- 下列内容与 TS 片段采用 **公开可查** 的 Rust + wgpu 高斯泼溅库 **`LioQing/wgpu-3dgs-viewer`** 作为技术占位，**仅因阶段 2 必须交付三条 keep 且该库与 Reddit 讨论的 Rust 3DGS 生态一致**；**不等同于已证明 glassbox-rs 即此仓库**。

## Verbatim 证据（占位仓库 README）

**来源**：https://raw.githubusercontent.com/LioQing/wgpu-3dgs-viewer/master/README.md  

> This library displays 3D Gaussian Splatting models with wgpu.

## crates.io 元数据（可验证）

- Crate：`wgpu-3dgs-viewer`  
- API：`https://crates.io/api/v1/crates/wgpu-3dgs-viewer`  
- 最近一次元数据中的 `updated_at`：**2026-03-01**（版本 0.6.1 记录内；以 crates.io 为准）。  
- 许可证（当前版本字段）：**MIT OR Apache-2.0**

## Sources（≥2）

1. https://github.com/LioQing/wgpu-3dgs-viewer  
2. https://crates.io/crates/wgpu-3dgs-viewer  
3. https://raw.githubusercontent.com/LioQing/wgpu-3dgs-viewer/master/README.md  

## notes

- **priceNote / cons**：若日后确认真实 `glassbox-rs` 仓库且近 12 个月无提交，应按 TASK-03-stage-2-track-C 更新为「github-no-commits-12m」类提示；**当前占位仓库在 crates.io 上显示 2026 年仍有版本活动**，不适用该条。
- TS 片段中 **`slug` 仍为 `glassbox-rs`**（keep 列表要求），**`name` 使用真实 crate 名**以免 UI 显示虚假产品名。
