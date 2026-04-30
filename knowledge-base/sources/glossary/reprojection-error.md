# reprojection-error

## 术语

- **中文**：重投影误差
- **English**：Reprojection error

## 分层

- **short**：把三维点按相机参数再画回照片，看落点离原来标出的像素差多远；差越小说明模型和相机位姿越合拍。
- **definition**：重投影误差度量三维点经投影后与观测特征位置的像素偏差，常用 L2 或 Huber 鲁棒核。光束法平差最小化其加权和；SfM 质量常用平均重投影误差报告。

## 关联

- prerequisiteTerms: `camera-intrinsics`, `camera-extrinsics`
- advancedTerms: `bundle-adjustment`, `sfm`
- relatedTerms: `colmap`, `feature-matching`

## sources

1. https://en.wikipedia.org/wiki/Reprojection_error
2. https://colmap.github.io/tutorial.html
