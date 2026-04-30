# Niantic SPZ 参考实现（niantic-spz-reference）

## 基本信息

| 字段 | 值 |
|------|-----|
| slug | `niantic-spz-reference` |
| vendor | Niantic Labs |
| region | north-america |
| category | publishing |
| discoverySource | supersplat |

## 仓库

- <https://github.com/nianticlabs/spz>

## Verbatim 证据

> .spz is a file format for compressed 3D gaussian splats. This directory contains a C++ library for saving and loading data in the .spz format.

来源：<https://raw.githubusercontent.com/nianticlabs/spz/main/README.md>

## 第二来源（生态互操作）

PlayCanvas SplatTransform 手册中的格式表将 `.spz` 列为输入（Niantic format）：

来源：<https://developer.playcanvas.com/user-manual/gaussian-splatting/editing/splat-transform/>

（另：Scaniverse / Niantic Spatial 站点描述 SPZ 开放与导出，可作第三条交叉引用。）

## Sources

1. https://github.com/nianticlabs/spz  
2. https://developer.playcanvas.com/user-manual/gaussian-splatting/editing/splat-transform/  
3. https://raw.githubusercontent.com/nianticlabs/spz/main/README.md  

## notes

与站内 `spz-format` 若并存，Opus 可合并为同一 slug 或保留一条为格式说明、一条强调参考实现。
