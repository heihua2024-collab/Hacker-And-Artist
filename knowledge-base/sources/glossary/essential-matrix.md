# essential-matrix

## 术语

- **中文**：本质矩阵
- **English**：Essential matrix

## 分层

- **short**：把两台相机的相对朝向和基线方向压进一张三乘三表里，但前提是先把像素坐标用内参「归一化」到理想针孔平面上再谈关系。
- **definition**：本质矩阵 \(\mathbf{E}\) 作用于归一化像面坐标，满足 \(\hat{\mathbf{x}}'^\top \mathbf{E} \hat{\mathbf{x}}=0\)，且 \(\mathbf{E}=[\mathbf{t}]_\times \mathbf{R}\)。从 \(\mathbf{E}\) 可恢复 \(\mathbf{R},\mathbf{t}\) 至多四组解，需用三角化深度检验。

## 关联

- prerequisiteTerms: `camera-intrinsics`, `epipolar-geometry`
- advancedTerms: `fundamental-matrix`, `multi-view-triangulation`
- relatedTerms: `sfm`, `reconstruction`

## sources

1. https://en.wikipedia.org/wiki/Essential_matrix
2. https://en.wikipedia.org/wiki/Epipolar_geometry
