# epipolar-geometry

## 术语

- **中文**：对极几何
- **English**：Epipolar geometry

## 分层

- **short**：像在两台相机之间拉一根无形的线：甲图里某个点在乙图里只可能落在一条线上，这条线就是对极线，用来缩小「找同一点」的搜索范围。
- **definition**：对极几何描述两幅图像间几何关系：给定基础矩阵或本质矩阵，一图上的点对应另一图上的对极线。它是特征匹配、RANSAC 估计位姿与核线约束可视化的基础。

## 关联

- prerequisiteTerms: `camera-intrinsics`, `feature-matching`
- advancedTerms: `fundamental-matrix`, `essential-matrix`
- relatedTerms: `sfm`, `reconstruction`

## sources

1. https://en.wikipedia.org/wiki/Epipolar_geometry
2. https://www.robots.ox.ac.uk/~vgg/hzbook/
