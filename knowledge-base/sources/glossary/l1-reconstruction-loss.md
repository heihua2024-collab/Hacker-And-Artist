# l1-reconstruction-loss

## 术语

- **中文**：L1 重建损失
- **English**：L1 reconstruction loss

## 分层

- **short**：把渲染图和真图每个像素的红绿蓝差取绝对值再平均，像算「平均涂色偏差」而不是平方放大离群点。
- **定义**：\(\mathcal{L}_1 = \mathbb{E}|I-\hat{I}|\)。3DGS 默认组合 L1 与 D-SSIM；L1 对异常像素较 L2 温和。

## 关联

- prerequisiteTerms: `photometric-loss`, `training-loss`
- advancedTerms: `metrics`, `ssim`
- relatedTerms: `3dgs`

## sources

1. https://arxiv.org/abs/2308.04079
2. https://en.wikipedia.org/wiki/Mean_absolute_error
