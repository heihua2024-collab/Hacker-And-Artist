# screen-space-gradient

## 术语

- **中文**：屏幕空间梯度
- **English**：Screen-space gradient

## 分层

- **short**：看渲染出来的那张图，在像素格子上算「哪里变化快」；训练里用它来猜该在哪里多塞几颗高斯。
- **definition**：在 3DGS 自适应密度控制中，对投影位置关于损失的梯度在屏幕空间累积，高梯度区域触发 clone 或 split。与物体空间梯度区分。

## 关联

- prerequisiteTerms: `differentiable-rasterization`, `splat`
- advancedTerms: `splat-clone`, `splat-split`
- relatedTerms: `adaptive-density-control`, `3dgs`

## sources

1. https://arxiv.org/abs/2308.04079
2. https://arxiv.org/abs/2311.17245
