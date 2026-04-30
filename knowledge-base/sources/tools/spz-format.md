# SPZ 格式（Niantic `.spz`）

## 基本信息

| 字段 | 值 |
|------|-----|
| slug | `spz-format` |
| vendor | Niantic Labs |
| region | north-america |
| category | editing |
| discoverySource | supersplat |

## 性质说明

本条描述 **压缩高斯泼溅文件格式 `.spz` 及其参考实现**，不是独立图形界面的「应用商店产品」。PlayCanvas `splat-transform` 等工具在文档中声明可 **读取** `.spz` 输入。若站内 glossary 收录格式词条，可将本条 **迁移或合并**。

## 一句话

- **zh**：Niantic 开源的 `.spz` 压缩高斯格式及 C++/TS 参考编解码实现。  
- **en**：Niantic’s `.spz` compressed Gaussian splat format with open reference codecs.

## 仓库

- <https://github.com/nianticlabs/spz>

## Verbatim 证据

> .spz is a file format for compressed 3D gaussian splats. This directory contains a C++ library for saving and loading data in the .spz format.

来源：<https://raw.githubusercontent.com/nianticlabs/spz/main/README.md>

## 许可

- 根目录 `LICENSE` 为 MIT（2024 Niantic Labs）。

## Sources

1. https://github.com/nianticlabs/spz  
2. https://raw.githubusercontent.com/nianticlabs/spz/main/README.md  
3. https://developer.playcanvas.com/user-manual/gaussian-splatting/editing/splat-transform/  

## notes

建议归类为 **glossary / format** 与 **tool** 双轨：Opus 可只保留工具链引用或合并到「SPZ 编解码库」短名。
