# PLY（3D Gaussian Splat 数据约定）

## 基本信息

| 字段 | 值 |
|------|-----|
| slug | `ply-format` |
| vendor | null（开放格式；生态文档由多方维护） |
| region | global |
| category | publishing |
| discoverySource | supersplat |

## 性质说明

本条不是单一厂商「安装包」，而是 **PLY 容器在 3DGS 工作流中的字段约定与互换角色**。PlayCanvas 开发者手册用独立章节说明其与常规网格 PLY 的差异。

## Verbatim 证据

> PLY is the standard file format for storing 3D Gaussian Splat data.

来源：<https://developer.playcanvas.com/user-manual/gaussian-splatting/formats/ply/>

> The PLY format serves as the lingua franca of the 3DGS ecosystem

来源：同上页面「PLY as an Interchange Format」小节。

## Sources

1. https://developer.playcanvas.com/user-manual/gaussian-splatting/formats/ply/  
2. https://en.wikipedia.org/wiki/PLY_(file_format)  
3. https://github.com/graphdeco-inria/gaussian-splatting  

## notes

建议 Opus 在 glossary 中收录 **3DGS PLY 字段表**，本条在 tools 中可仅作 **互换格式入口** 或删除重复。
