# covariance-matrix

## 术语

- **中文**：协方差矩阵
- **English**：Covariance matrix

## 分层

- **short**：一张三乘三的对称表格，记录三个方向上方差和彼此「联动」有多大，决定椭球是圆是扁、朝哪歪。
- **definition**：对三维随机向量，协方差矩阵 \(\Sigma\) 对称半正定，特征分解给出椭球主轴。3DGS 中每个高斯的 \(\Sigma\) 由优化变量生成并需保持正定，再投影到屏幕参与渲染。

## 关联

- prerequisiteTerms: `covariance`, `splat`
- advancedTerms: `anisotropic-gaussian`, `quaternion-rotation`
- relatedTerms: `3dgs`, `quaternion-rotation`

## sources

1. https://en.wikipedia.org/wiki/Covariance_matrix
2. https://arxiv.org/abs/2308.04079
