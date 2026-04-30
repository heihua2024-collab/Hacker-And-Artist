# camera-extrinsics

## 术语

- **中文**：相机外参 / 位姿
- **English**：Camera extrinsics / pose

## 分层

- **short**：像给每张照片贴一张「拍摄时相机站在世界坐标里哪个角落、朝哪边」的标签；内参管镜头，外参管机身在场景里的摆放。
- **definition**：外参常用 \(R \in SO(3)\) 与 \(t \in \mathbb{R}^3\) 将世界坐标点变换到相机坐标系，或等价地用 \(4\times4\) 齐次矩阵表示。SfM 从多视图像估计每帧外参；3DGS 训练用这些位姿把高斯投影到各视图监督颜色。

## 关联

- prerequisiteTerms: `camera-intrinsics`, `photogrammetry`
- advancedTerms: `bundle-adjustment`, `quaternion-rotation`
- relatedTerms: `sfm`, `colmap`, `reprojection-error`

## sources

1. https://en.wikipedia.org/wiki/Camera_resectioning
2. https://colmap.github.io/
