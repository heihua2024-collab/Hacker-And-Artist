# memory-footprint-metric

## 术语

- **中文**：显存占用指标
- **English**：GPU memory footprint metric

## 分层

- **short**：不光看跑得多快，还要看一张显卡要腾出多少显存才能装下整个场景，像行李超重费。
- **definition**：报告训练或推理时 GPU 全局内存峰值，常以 GB 计；3DGS 与 splat 数量、球谐阶数、批大小正相关。

## 关联

- prerequisiteTerms: `splat-count`, `3dgs`
- advancedTerms: `splat-compression`, `streaming-splat`
- relatedTerms: `fps-realtime`

## sources

1. https://arxiv.org/abs/2308.04079
2. https://raw.githubusercontent.com/nerfstudio-project/gsplat/main/README.md
