# fps-realtime

## 术语

- **中文**：实时帧率阈值
- **English**：Realtime FPS threshold

## 分层

- **short**：不光看平均一秒画多少帧，还约定「至少要跑到多少帧才算跟手」——像约定电影再流畅也不能低于某个门槛。
- **definition**：工程上常将交互式 3DGS 查看器目标定为约 30–60 FPS 或更高，依设备与分辨率而定；与单纯报告平均 FPS 的论文表格区分。

## 关联

- prerequisiteTerms: `fps`, `real-time-rendering`
- advancedTerms: `webgl-webgpu`, `memory-footprint-metric`
- relatedTerms: `3dgs`

## sources

1. https://en.wikipedia.org/wiki/Frame_rate
2. https://arxiv.org/abs/2308.04079
