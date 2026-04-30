# camera-intrinsics

## 术语

- **中文**：相机内参
- **English**：Camera intrinsics

## 分层

- **short**：把镜头和传感器当成一台「自带透视规则的小孔相机」：内参就是那套固定规则（焦距、主点、畸变），告诉程序「像素坐标怎么和射线方向挂钩」。
- **definition**：相机内参矩阵 \(K\) 将归一化成像平面坐标映射到像素坐标，通常包含焦距 \(f_x,f_y\)、主点 \((c_x,c_y)\) 与可选畸变系数。SfM 与 COLMAP 输出每帧相机模型时需联合估计内参或假设标定已知；3DGS 训练依赖准确投影，内参误差会直接表现为几何漂移与重投影残差增大。

## 关联

- prerequisiteTerms: `photogrammetry`, `feature-matching`
- advancedTerms: `bundle-adjustment`, `reprojection-error`
- relatedTerms: `camera-extrinsics`, `sfm`, `colmap`
- relatedTools: `colmap`
- relatedPapers: `https://arxiv.org/abs/2308.04079`

## sources

1. https://en.wikipedia.org/wiki/Camera_resectioning
2. https://colmap.github.io/cameras.html
