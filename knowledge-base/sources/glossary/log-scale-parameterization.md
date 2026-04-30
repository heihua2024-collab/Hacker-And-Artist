# log-scale-parameterization

## 术语

- **中文**：对数尺度参数化
- **English**：Log-scale parameterization

## 分层

- **short**：把「椭球三根轴多长」先记在指数里再取幂，像用温度计上的对数刻度，保证长度永远是正的。
- **definition**：3DGS 常对高斯尺度用 \(\exp\) 映射到正实数，优化无约束变量；避免直接优化尺度出现非正或数值爆炸。

## 关联

- prerequisiteTerms: `splat`, `anisotropic-gaussian`
- advancedTerms: `covariance-matrix`, `adaptive-density-control`
- relatedTerms: `3dgs`

## sources

1. https://arxiv.org/abs/2308.04079
2. https://github.com/graphdeco-inria/gaussian-splatting
