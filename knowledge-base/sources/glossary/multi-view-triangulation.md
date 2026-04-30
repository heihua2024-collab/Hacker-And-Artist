# multi-view-triangulation

## 术语

- **中文**：多视图三角化
- **English**：Multi-view triangulation

## 分层

- **short**：像用几束手电光从不同角度照同一个点，光束交汇的地方就是物体在三维空间里的位置。
- **definition**：多视图三角化利用已知相机位姿与多幅图像中的对应点，线性或非线性求解三维坐标，使重投影误差最小。SfM 产生稀疏点云；3DGS 常用该点云初始化高斯中心。

## 关联

- prerequisiteTerms: `camera-extrinsics`, `feature-matching`
- advancedTerms: `bundle-adjustment`, `sfm`
- relatedTerms: `reprojection-error`, `point-cloud`

## sources

1. https://en.wikipedia.org/wiki/Triangulation_(computer_vision)
2. https://colmap.github.io/
