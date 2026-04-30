# photometric-loss

## 术语

- **中文**：光度损失
- **English**：Photometric loss

## 分层

- **short**：拿渲染图和真实照片逐像素比颜色差多少，差越多惩罚越大，就像批改临摹作业看离原画多远。
- **definition**：神经渲染与 3DGS 训练中常用 L1 或 L2 像素损失度量渲染与观测图像差异，可与 SSIM、LPIPS 等组合。

## 关联

- prerequisiteTerms: `training-loss`, `3dgs`
- advancedTerms: `l1-reconstruction-loss`, `metrics`
- relatedTerms: `differentiable-rasterization`

## sources

1. https://arxiv.org/abs/2308.04079
2. https://en.wikipedia.org/wiki/Huber_loss
