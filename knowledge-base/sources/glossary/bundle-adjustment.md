# bundle-adjustment

## 术语

- **中文**：光束法平差
- **English**：Bundle adjustment

## 分层

- **short**：像同时调整一整本相册里每张照片的站位和场景里每个路标点的位置，让「同一物体在不同照片里看起来最对齐」。
- **definition**：光束法平差联合优化多相机外参、三维点坐标及（可选）内参，使重投影误差在全局最小。SfM 与 COLMAP 在增量建图后执行 BA；3DGS 预处理链常冻结 COLMAP 位姿或在其上做精修。

## 关联

- prerequisiteTerms: `camera-intrinsics`, `camera-extrinsics`, `reprojection-error`
- advancedTerms: `sfm`, `mvs`
- relatedTools: `colmap`

## sources

1. https://en.wikipedia.org/wiki/Bundle_adjustment
2. https://colmap.github.io/tutorial.html
