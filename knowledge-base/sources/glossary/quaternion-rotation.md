# quaternion-rotation

## 术语

- **中文**：四元数旋转
- **English**：Quaternion rotation

## 分层

- **short**：用四个数打包三维旋转，像给物体朝向开一张紧凑「身份证」，避免万向节卡死那种麻烦。
- **definition**：单位四元数 \(q\) 与 \(SO(3)\) 双覆盖同构，可稳定插值与优化。3DGS 常用四元数表示高斯主轴旋转，与尺度共同参数化协方差。

## 关联

- prerequisiteTerms: `covariance-matrix`, `splat`
- advancedTerms: `anisotropic-gaussian`, `covariance`
- relatedTerms: `3dgs`

## sources

1. https://en.wikipedia.org/wiki/Quaternions_and_spatial_rotation
2. https://arxiv.org/abs/2308.04079
