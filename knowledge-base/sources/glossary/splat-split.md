# splat-split

## 术语

- **中文**：Splat 分裂
- **English**：Splat split (densification)

## 分层

- **short**：一颗椭球太大又总对不齐时，把它拆成两颗略小的「子椭球」，像把一团橡皮泥掰成两半各自塑形。
- **definition**：当梯度高且尺度大时，官方实现将高斯按采样分裂为两个较小实例，以在细尺度上增加自由度。

## 关联

- prerequisiteTerms: `screen-space-gradient`, `adaptive-density-control`
- advancedTerms: `splat-clone`, `densification`
- relatedTerms: `3dgs`

## sources

1. https://arxiv.org/abs/2308.04079
2. https://github.com/graphdeco-inria/gaussian-splatting
