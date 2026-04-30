# fundamental-matrix

## 术语

- **中文**：基础矩阵
- **English**：Fundamental matrix

## 分层

- **short**：两幅普通像素图之间的一张「3×3 关系表」，告诉你甲图一个点在乙图里该落在哪条对极线上，用来筛掉乱匹配。
- **definition**：基础矩阵 \(\mathbf{F}\) 满足 \(\mathbf{x}'^\top \mathbf{F} \mathbf{x}=0\)，其中 \(\mathbf{x},\mathbf{x}'\) 为两幅图像的齐次像素坐标。它编码相对位姿与两相机内参，秩为 2。RANSAC 估计 \(\mathbf{F}\) 是宽基线匹配常用步骤。

## 关联

- prerequisiteTerms: `epipolar-geometry`, `camera-intrinsics`
- advancedTerms: `essential-matrix`, `bundle-adjustment`
- relatedTerms: `feature-matching`, `sfm`

## sources

1. https://en.wikipedia.org/wiki/Fundamental_matrix_(computer_vision)
2. https://www.robots.ox.ac.uk/~vgg/hzbook/
