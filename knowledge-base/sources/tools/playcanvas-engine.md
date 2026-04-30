# PlayCanvas Engine（工具视角）

## 基本信息

| 字段 | 值 |
|------|-----|
| slug | `playcanvas-engine` |
| vendor | PlayCanvas Ltd |
| region | global |
| category | publishing |
| discoverySource | supersplat |

## 一句话

- **zh**：开源 WebGL/WebGPU 运行时，官方手册中提供 GSplat 资源与渲染集成路径。  
- **en**：Open-source WebGL/WebGPU/WebXR runtime documented for GSplat assets and rendering in web projects.

## 官网与仓库

- 仓库：<https://github.com/playcanvas/engine>  
- 手册：<https://developer.playcanvas.com/user-manual/gaussian-splatting/>

## Verbatim 证据

GitHub 仓库 About 文案：

> Powerful web graphics runtime built on WebGL, WebGPU, WebXR and glTF

来源：<https://github.com/playcanvas/engine>

## 与 engines.ts 的关系

站内 `engines.ts` 已有一条 **`slug: playcanvas`** 的引擎矩阵条目，描述 splat 导入格式与渲染支持。本条从 **tools.ts 工具/库视角** 补充同一产品：强调开发者如何把 GSplat 接入 Web 项目；**不重复填写**引擎矩阵专有字段（实现细节以 `engines.ts` 为准）。

## Sources

1. https://github.com/playcanvas/engine  
2. https://developer.playcanvas.com/user-manual/gaussian-splatting/  
3. https://github.com/playcanvas/engine/releases  

## notes

若 Opus 合并条目，可将本条与 `engines.ts` 的 `playcanvas` 交叉引用，避免字段冲突。
