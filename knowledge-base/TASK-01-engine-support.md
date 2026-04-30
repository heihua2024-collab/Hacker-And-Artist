# TASK-01：Engine Support 收集（给 Auto 模型）

> **使用方法**：把这份文档的 markdown 内容复制到 Cursor 一个新窗口的 Composer/Auto 对话框里，作为任务指令发送。
> Auto 模型会按这份指令在 `knowledge-base/sources/engines/` 目录下创建文件。

---

## 你的任务

为「印刻万物」知识库收集首批 25 条软件/引擎对 3D Gaussian Splatting (3DGS) 的支持情况。

**输出位置**：`knowledge-base/sources/engines/<slug>.md`，每条一份独立 .md 文件
**模板**：`knowledge-base/templates/source-template-engine-support.md`
**协作约定**：阅读 `knowledge-base/AUTO-WORKFLOW.md`（含五条铁律）后再开始

---

## 候选清单（25 条）

按类别分组，请逐一查证。**找不到信息就标 null，不要编造**。

### 3D / DCC 软件 (5)
1. `blender-3dgs-support` — Blender
2. `cinema-4d-3dgs-support` — Cinema 4D
3. `houdini-3dgs-support` — SideFX Houdini
4. `maya-3dgs-support` — Autodesk Maya
5. `3ds-max-3dgs-support` — Autodesk 3ds Max

### 游戏引擎 (4)
6. `unity-3dgs-support` — Unity
7. `unreal-3dgs-support` — Unreal Engine
8. `godot-3dgs-support` — Godot
9. `playcanvas-3dgs-support` — PlayCanvas

### Web 引擎 / 库 (4)
10. `threejs-3dgs-support` — three.js
11. `babylonjs-3dgs-support` — Babylon.js
12. `gsplat-js-support` — gsplat.js (Mark Kellogg)
13. `webgl-webgpu-native-support` — WebGL / WebGPU 原生

### XR 平台 (3)
14. `apple-vision-pro-3dgs-support` — Apple Vision Pro
15. `meta-quest-3dgs-support` — Meta Quest
16. `webxr-3dgs-support` — WebXR

### Viewer-only 工具 (4)
17. `supersplat-viewer` — SuperSplat (PlayCanvas)
18. `niantic-scaniverse-viewer` — Niantic Scaniverse
19. `polycam-web-viewer` — Polycam Web Viewer
20. `luma-web-viewer` — Luma AI Web Viewer

### 其他 (5)
21. `nvidia-omniverse-3dgs-support` — NVIDIA Omniverse
22. `after-effects-3dgs-support` — Adobe After Effects
23. `nuke-3dgs-support` — Foundry Nuke
24. `davinci-resolve-3dgs-support` — DaVinci Resolve
25. `touchdesigner-3dgs-support` — TouchDesigner

---

## 关键定义：什么叫"支持 3DGS"（必读，最常出错的地方）

我们这张表格的**唯一核心问题**是：

> 一个用户已经训练好了一个 3D Gaussian Splatting 文件（.ply 包含球谐系数 + 协方差，或 .splat / .ksplat 二进制格式）——
> 他能不能在这个软件里**打开它**并**以高斯泼溅方式正确渲染出来**？

### ✅ 算"支持"的情况

- 软件原生提供"导入 .splat / 3DGS 格式 .ply"功能（splat-render: native）
- 有插件提供"导入 + 渲染"完整链路（splat-render: plugin，必须能渲染）
- 通过外部转换桥接（splat-render: external，要写明桥接工具）

### ❌ 不算"支持"的情况（最容易错）

- ❌ 一个插件用这个软件**生成 3DGS 训练数据**（拍多视角照片、做 SfM 等）—— 这是"3DGS 工作流的前端"，不是"软件支持 3DGS 渲染"
- ❌ 软件能加载**通用 PLY 点云**，但不识别 3DGS 的球谐系数/协方差通道 —— 这是"普通点云查看"，不是 3DGS 渲染
- ❌ 软件能播放**预录的 3DGS 视频** —— 这是视频播放，不是 3D 交互渲染
- ❌ 一个插件只是把 .splat 转换成 .obj/.fbx —— 这是格式转换，不是引擎内渲染

### 判断流程（每条必须回答）

第 1 题：**"用户拿到 ReshotAI 训练好的 3D Gaussian Splatting 输出，能不能在这个软件里打开 + 360° 旋转查看？"**

- 是 → splat-render 不为 none
- 否 → splat-render: none（即使该软件能用于训练数据生成，也填 none）

如果第 1 题是是，再答：

第 2 题：**"是原生开箱即用，还是要装插件？是哪一个具体插件？"**
第 3 题：**"该插件是否仍在维护？最近一次 commit/release 时间？"**
第 4 题：**"插件支持的输入格式有哪些？（看 README 中明文写的，不要根据通用扩展名推测）"**

---

## 字段填写指引

| 字段 | 含义 | 填错的常见情形 |
|---|---|---|
| `splat-import: true/false` | 能否导入并被识别为 3DGS（不是普通点云） | 看到通用 PLY 导入就填 true ❌ |
| `splat-render: native/plugin/external/none` | 能否在引擎里渲染 3DGS | 把"训练数据生成插件"也算 plugin ❌ |
| `splat-import-formats: [...]` | 必须是 README 明文写的 | 看到 PLY 就把 splat / ksplat 也加上 ❌ |
| `splat-edit: true/false` | 能否在引擎内**修改单个高斯体**（删除、缩放、调色） | 把"清理 floaters"和"完整编辑"混淆 ⚠️ |
| `plugin-name` | 主流的 3DGS 渲染插件（不是数据生成插件） | 选了名字最相似的而不是真正主流的 ❌ |
| `first-supported` | 该软件首次有可用的 3DGS 渲染能力 | 写"约 X 年" ❌（找不到就 null） |

**当一个字段不确定时，宁可填 `none / false / null`，也不要填 `plugin / true`**。
保守的"否"比错误的"是"对知识库价值高 10 倍。

---

## 每条要回答的核心问题

逐条查证（建议用 web search + 访问官方文档 + GitHub）：

1. 用户能否在该软件里**渲染**已训练好的 3DGS 文件？（决定 splat-render）
2. 支持哪些格式？（splat-import-formats）
3. 是原生还是插件？是哪个具体插件？维护状态？
4. 能否在引擎内**编辑**单个高斯体？
5. 首次支持的版本/日期？（找不到就 null）

每条 **必须** 提供至少 1 条原文 30-60 字 verbatim 引用证据（quote-en），来自官方文档、GitHub README、或主流技术博客。**引用必须直接证明"这个软件能渲染 3DGS"，不是证明"这个软件可以参与 3DGS 工作流"**。

---

## 完成标准

- [ ] 25 个 .md 文件（每条一个）
- [ ] 全部 frontmatter 字段填齐
- [ ] 找不到的字段填 `null`，不允许"合理猜测"
- [ ] 每条至少 1 条 sources URL
- [ ] 每条 quote-en 是真实原文（不允许翻译版）
- [ ] verification 全部填 `pending`
- [ ] 完成后回复主理人：完成 N/25，失败/缺信息列表

---

## 严禁事项

1. ❌ 不要把"印刻万物 / INKTOYS"写进任何字段
2. ❌ 不要给自己盖 `verification: verified` 章
3. ❌ 不要编造插件名、版本号、日期
4. ❌ 不要用 `[url](url)` 这种 markdown 包装 URL
5. ❌ 不要美化文字（"非常先进"、"令人惊叹"等）

如果某条候选你完全找不到任何信息（连官方页都打不开），就**不要创建那个 .md**，把它列在最后回复的"失败列表"里。

---

## 开工前请回答

确认你已经读完 `AUTO-WORKFLOW.md` 后，先做一个尝试：
**只产出第 1 条 (`blender-3dgs-support.md`)**，让主理人审一下质量再继续剩下 24 条。

这是为了避免一次跑完才发现方向错了。
