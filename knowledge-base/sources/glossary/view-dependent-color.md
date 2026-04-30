# view-dependent-color

## 术语

- **中文**：视相关颜色
- **English**：View-dependent color

## 分层

- **short**：同一个玻璃球，你站左边看偏蓝，站右边看偏黄；颜色不是死的一个值，而是随你站的位置变。
- **definition**：3DGS 用球谐系数表示与视角相关的辐射度，使高光与非朗伯效应近似可建模；与 NeRF 的 MLP 输出视角相关颜色思想类似但参数化不同。

## 关联

- prerequisiteTerms: `splat`, `spherical-harmonics`
- advancedTerms: `3dgs`, `radiance-field`
- relatedTerms: `opacity`, `novel-view-synthesis`

## sources

1. https://arxiv.org/abs/2308.04079
2. https://en.wikipedia.org/wiki/Spherical_harmonics
