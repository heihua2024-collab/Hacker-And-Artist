# TASK-01 第三批：剩下 19 条 engine-support 数据采集

## 给 Auto 模型：完整任务说明

你已经成功完成 6 条（blender、unity、unreal-engine、threejs、babylonjs、polycam），全部通过审核员（Opus）的 ACCEPT 评级。

这一批要把 25 条清单的剩下 19 条全部完成。质量标准与第二批完全一致。

### 必读

执行本任务前，请先读：

1. `knowledge-base/AUTO-WORKFLOW.md` —— 五条铁律
2. `knowledge-base/TASK-01-engine-support.md` —— 引擎支持任务的核心定义
3. `knowledge-base/TASK-01-batch-2.md` —— 第二批的强约束（"无引用就 null"、"权限声明 ≠ 功能证据"）
4. `knowledge-base/templates/source-template-engine-support.md` —— 字段模板
5. **三份顶级标杆**（写得最好的）：
   - `knowledge-base/sources/engines/threejs-3dgs-support.md`（源码级证据 + 保守填 false）
   - `knowledge-base/sources/engines/polycam-3dgs-support.md`（识别"生产工具 vs 查看工具"语义）
   - `knowledge-base/sources/engines/babylonjs-3dgs-support.md`（native 级支持的判断标准）

---

## 本批要采集的 19 条

### 3D / DCC 软件（4 条）

| slug | 软件 | 关键提示 |
|---|---|---|
| `cinema-4d-3dgs-support` | Cinema 4D | Maxon 商业软件，看 marketplace 是否有 3DGS 插件 |
| `houdini-3dgs-support` | SideFX Houdini | 注意 SideFX Labs / 社区 OTL 插件 |
| `maya-3dgs-support` | Autodesk Maya | 商业软件，看 Autodesk App Store + 社区插件 |
| `3ds-max-3dgs-support` | Autodesk 3ds Max | 同上 |

**这一组的常见陷阱**：Maxon / Autodesk 旗下的软件多数没有官方 3DGS 支持，但可能有社区/第三方插件。如果只找到"实验性""废弃""单次发布"的尝试，**写明状态并保守填 splat-render**。

### 游戏引擎（2 条）

| slug | 软件 | 关键提示 |
|---|---|---|
| `godot-3dgs-support` | Godot | 开源引擎，看 GDExtension / 社区插件 |
| `playcanvas-3dgs-support` | PlayCanvas | **这条特别重要**——PlayCanvas 是 SuperSplat 的母公司，引擎本身原生支持 3DGS（与 Babylon.js 类似的 native 级别）。请重点查证 release notes 和官方文档 |

### Web 引擎 / 库（2 条）

| slug | 软件 | 关键提示 |
|---|---|---|
| `gsplat-js-3dgs-support` | gsplat.js | **不是** mkkellogg 的 GaussianSplats3D（那个已在 threejs 条目里覆盖）。这条专指 Hugging Face / dylanebert 维护的 https://github.com/huggingface/gsplat.js |
| `webgl-webgpu-3dgs-support` | WebGL / WebGPU 原生 | **特殊条目**——WebGL/WebGPU 是 API 不是软件。请把 engine-category 填 `web-engine`，并在 notes 里说明这一条记录的是"浏览器原生 API 层是否提供 3DGS rasterization 原语"，答案显然是 否。但要给出 verbatim 引用证明 W3C / Khronos 规范确实没有 3DGS 相关条目 |

### XR 平台（3 条）

| slug | 软件 | 关键提示 |
|---|---|---|
| `apple-vision-pro-3dgs-support` | Apple Vision Pro | 重点查 visionOS / RealityKit 文档，看是否有官方 3DGS 入口；社区方案如 SwiftSplash 等 |
| `meta-quest-3dgs-support` | Meta Quest | 查 Horizon OS / Meta XR SDK 文档 + Unity / Unreal 在 Quest 上跑 3DGS 的可行性 |
| `webxr-3dgs-support` | WebXR | 把 webxr 与 three.js + GaussianSplats3D / babylon.js 在 WebXR 中渲染 3DGS 的能力做记录 |

**XR 这一组**：经常没有"该平台原生支持 3DGS"的明文，能找到的多是"通过 Unity/Three.js 在该平台运行 3DGS"。请如实记录，splat-render 多数应该填 `external`（依赖上层引擎）或注明实现链路。

### Viewer-only 工具（3 条）

| slug | 软件 | 关键提示 |
|---|---|---|
| `supersplat-3dgs-support` | SuperSplat | PlayCanvas 出品的 web 编辑器，splat-edit 应该是 true（这是这条最大的能力） |
| `niantic-scaniverse-3dgs-support` | Niantic Scaniverse | 类似 Polycam，是"生产工具"——注意区分"扫描生成"和"导入第三方 splat"两种能力 |
| `luma-web-viewer-3dgs-support` | Luma AI Web Viewer | 查 lumalabs.ai 的 web embed / `@lumaai/luma-web` npm 包文档；注意区分"渲染 Luma 自家训练的资产"和"渲染任意外部 splat 文件" |

### 其他（5 条）

| slug | 软件 | 关键提示 |
|---|---|---|
| `nvidia-omniverse-3dgs-support` | NVIDIA Omniverse | 查 Omniverse Connectors / Kit / USD 是否有 3DGS 路径 |
| `after-effects-3dgs-support` | Adobe After Effects | 几乎肯定 splat-render: none，但请验证一下，看是否有第三方 plugin（例如基于 C4D 桥接） |
| `nuke-3dgs-support` | Foundry Nuke | 查 Nuke Particle / Nukescripts 是否有 3DGS 节点 |
| `davinci-resolve-3dgs-support` | DaVinci Resolve | Fusion 模块是否能导入 splat |
| `touchdesigner-3dgs-support` | TouchDesigner | 实时图形领域，社区可能有 GLSL 实现 |

**"其他"这一组**：这是最容易得到大量 `splat-render: none` 的一组——这是**正常现象**，不要为了让数据"看起来丰富"而虚报支持能力。"none" 是一个有价值的信息，告诉用户"这个软件别浪费时间找 3DGS 插件了"。

---

## 强约束清单（继承前两批）

1. **每个字段必须有 verbatim 引用证据，否则填 null/false/none**
2. **权限声明 ≠ 功能证据**（manifest permission、产品页营销文案不算源码级证据）
3. **不要把"印刻万物 / INKTOYS"写进任何字段**
4. **不要给自己盖 `verification: verified` 章**（永远 pending）
5. **找不到信息就保守填**——`splat-render: none` 比错误的 `splat-render: plugin` 价值高 10 倍

---

## 输出要求

- 19 个独立 .md 文件，路径 `knowledge-base/sources/engines/<slug>.md`
- 每个文件结构与已通过的 6 个文件保持一致：frontmatter + verbatim 引用区 + 工作流速记
- 每个文件至少 2 条 sources URL（"其他"组里 `splat-render: none` 的条目，可以用官方功能列表 + 一条搜索结果作为"无 3DGS 条目"的证据）

---

## 完成后的最终自检（必答）

跑完 19 条后，请在交付时回答这 7 个问题：

1. 19 条中 splat-render 各档位的分布（多少 native / 多少 plugin / 多少 external / 多少 none）？
2. 哪几条你最不确定？需要人工复核优先级最高的是哪 3 条？
3. 哪几条找到了源码级证据（不只是 README 文本证据）？
4. 哪几条遇到了访问失败（403 / 404 / 需要登录）？分别影响了哪些字段？
5. 19 条里 plugin-author 字段，你填了多少个非 null 值？每个的引用来源是什么？
6. 19 条里 first-supported / latest-tested-version，你有没有填任何非 null 值？如果有，引用是什么？
7. PlayCanvas 这条是 native 还是 plugin？给出关键证据 URL。

完成后回复：「第三批 19 条完成」。
