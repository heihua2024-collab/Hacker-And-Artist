# splat-clone

## 术语

- **中文**：Splat 克隆
- **English**：Splat clone (densification)

## 分层

- **short**：训练中发现某块区域误差总很大，就把那里已有的一颗高斯「复印」一份到旁边，让优化多一个自由度去贴细节。
- **definition**：官方 3DGS 在视图空间梯度超阈且高斯较小时复制基元，保持总协方差近似不变而增加粒子数以覆盖欠采样区域。

## 关联

- prerequisiteTerms: `screen-space-gradient`, `adaptive-density-control`
- advancedTerms: `densification`, `splat-split`
- relatedTerms: `3dgs`, `splat`

## sources

1. https://arxiv.org/abs/2308.04079
2. https://github.com/graphdeco-inria/gaussian-splatting
