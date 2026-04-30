# streaming-splat

## 术语

- **中文**：流式 Splat 加载
- **English**：Streaming splat loading

## 分层

- **short**：像地图应用只加载屏幕里那一块瓦片，不把全世界一次性装进内存；大场景的高斯也按块拉取与卸载。
- **definition**：将场景划分为空间或 LOD 块，通过网络或磁盘按需解码 splat 包；与一次性全量加载相对，降低首包时间与峰值内存。

## 关联

- prerequisiteTerms: `webgl-webgpu`, `splat-compression`
- advancedTerms: `memory-footprint-metric`, `real-time-rendering`
- relatedTerms: `3dgs`

## sources

1. https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API
2. https://arxiv.org/abs/2308.04079
