# exposure-compensation

## 术语

- **中文**：曝光补偿（训练中）
- **English**：Exposure compensation (optimization)

## 分层

- **short**：同一批照片有的偏亮有的偏暗，训练时给每张图配一个小滑杆，先把亮度对齐再比颜色。
- **definition**：3DGS 等管线可为每个训练视图估计标量增益，使光度损失对曝光变化更稳健；增益与 splat 参数联合优化或交替更新。

## 关联

- prerequisiteTerms: `photometric-loss`, `3dgs`
- advancedTerms: `training-loss`, `bundle-adjustment`
- relatedTerms: `camera-intrinsics`

## sources

1. https://arxiv.org/abs/2308.04079
2. https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/
