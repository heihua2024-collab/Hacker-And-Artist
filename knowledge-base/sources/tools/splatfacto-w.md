# Splatfacto-W（Nerfstudio 训练方法）

## 基本信息

| 字段 | 值 |
|------|-----|
| 名称 | Splatfacto-W |
| 上游论文 | arXiv:2407.12306 |
| 官方实现仓库 | https://github.com/KevinXu02/splatfacto-w |
| 项目页 | https://kevinxu02.github.io/splatfactow/ |
| Nerfstudio 文档 | https://docs.nerf.studio/nerfology/methods/splatw.html |
| 许可证 | Apache-2.0（仓库根目录 LICENSE） |

## Verbatim 证据引文

**README（官方实现）** — https://raw.githubusercontent.com/KevinXu02/splatfacto-w/main/README.md  

> An official implementation for [Splatfacto-W](https://kevinxu02.github.io/splatfactow/).

**论文摘要（arXiv HTML）** — https://arxiv.org/html/2407.12306v2  

> In this paper, we introduce Splatfacto-W, an approach that integrates per-Gaussian neural color features and per-image appearance embeddings into the rasterization process, along with a spherical harmonics-based background model to represent varying photometric appearances and better depict backgrounds.

## 客观功能说明

- 面向 **非受控、野外（in-the-wild）** 照片集合的高斯泼溅训练扩展；需已安装 Nerfstudio，并通过 `pip install -e .` 将本仓库注册为 CLI 方法（README 给出 `ns-train splatfacto-w` 等命令）。
- 提供 **splatfacto-w-light** 变体用于更一般数据（README 说明）。
- 与主线 Nerfstudio 关系：README 写明需跟进 **最新开发版** nerfstudio；TODO 含「可能合并入 Nerfstudio 主分支」——**建议作为 Nerfstudio 的方法子条目展示**，是否单独保留 tools 条目由编辑决定。

## Sources（≥2）

1. https://github.com/KevinXu02/splatfacto-w  
2. https://docs.nerf.studio/nerfology/methods/splatw.html  
3. https://arxiv.org/abs/2407.12306  

## notes

- 默认分支最近提交时间在本任务中因 GitHub API 速率限制未再次拉取；合并前可在 GitHub 上核对 `pushed_at`。
- 训练需 GPU 环境与 COLMAP 等数据准备；具体 PSNR 与速度数字以论文为准。
