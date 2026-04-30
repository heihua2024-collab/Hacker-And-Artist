# feature-matching

## 术语

- **中文**：特征匹配
- **English**：Feature matching

## 分层

- **short**：像在两幅画上找同一扇窗、同一棵树，用局部纹理当「指纹」对上号，才能知道两张照片之间视线怎么变。
- **definition**：特征匹配在图像对或多图之间建立对应点，常用检测子（SIFT、ORB 等）与描述子距离或学习网络。SfM 依赖匹配建立几何约束；匹配质量直接影响三角化与位姿估计。

## 关联

- prerequisiteTerms: `photogrammetry`
- advancedTerms: `epipolar-geometry`, `bundle-adjustment`
- relatedTerms: `sfm`, `colmap`

## sources

1. https://en.wikipedia.org/wiki/Feature_(computer_vision)
2. https://colmap.github.io/tutorial.html
