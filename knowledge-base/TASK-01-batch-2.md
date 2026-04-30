# TASK-01 第二批：5 条 engine-support 数据采集

## 给 Auto 模型：完整任务说明

你已经成功跑过第一条 Blender，**审核员（Opus）评级为 ACCEPT**。这一批要在保持质量的前提下扩展到 5 条。

### 必读

执行本任务前，请先读：

1. `knowledge-base/AUTO-WORKFLOW.md` —— 五条铁律
2. `knowledge-base/TASK-01-engine-support.md` —— 引擎支持任务的核心定义（特别是"什么叫支持 3DGS"那一节）
3. `knowledge-base/templates/source-template-engine-support.md` —— 字段模板
4. `knowledge-base/sources/engines/blender-3dgs-support.md` —— **参考标杆**（你自己第二次跑出来的版本，已通过审核）

---

## 本批要采集的 5 条

| 序号 | slug | 软件名 | 说明 |
|---|---|---|---|
| 1 | `unity-3dgs-support` | Unity | 商业游戏引擎，多个第三方插件并存 |
| 2 | `unreal-engine-3dgs-support` | Unreal Engine | 商业引擎，官方与社区插件并存 |
| 3 | `threejs-3dgs-support` | Three.js | 开源 JS 3D 库 |
| 4 | `babylonjs-3dgs-support` | Babylon.js | 开源 JS 3D 引擎 |
| 5 | `polycam-3dgs-support` | Polycam | 移动 + Web + 云服务，**无开源 repo** |

**每一条都生成一个独立 .md 文件**，路径是 `knowledge-base/sources/engines/<slug>.md`。

---

## 本批新增的两条强约束（针对第一批暴露的弱点）

### 强约束 1：每个字段都必须有 verbatim 引用证据，否则填 null

第一批我们发现 `plugin-author: Alexandre Carlier` 这种字段被填了，但 4 条 sources 里没有一处直接引用过这个名字。

**新规则**：

- 任何 frontmatter 字段如果不能在你给的 verbatim 引用中找到对应原文支撑，**一律填 null / false**
- 不要"根据常识推测"——比如不要因为 ReshotAI 看起来是公司就推测某个名字是 CEO
- 如果这个字段的真实信息在某个网页上但你没读过那个网页 → 填 null，并在 notes 里注明"未访问 X 页面"

### 强约束 2：权限声明 ≠ 功能证据

第一批我们发现你用 `blender_manifest.toml` 里的 `"Import/export PLY from/to disk"` 这句来支撑 `splat-export: true`。但那是**扩展系统的权限声明**（请求磁盘 IO 权限），不等于代码里真的实现了导出 3DGS 功能。

**新规则**：

- `splat-import: true` 的证据 = 源码里有 `ImportXXX` operator/类/函数，**且**该函数读取 3DGS 特有字段（球谐 `f_dc/f_rest`、协方差 `scale/rot`、不透明度 `opacity` 等）
- `splat-export: true` 的证据 = 源码里有 `ExportXXX` operator/类/函数，**且**该函数写入上述 3DGS 特有字段
- `splat-edit: true` 的证据 = 源码里有针对单个高斯体的修改操作（删除、缩放、调色），**且**这些操作是面向用户的 UI 动作，不是内部数据处理
- "manifest 里有读写权限"、"README 里说支持 PLY"、"产品页面写了与 3DGS 相关"——**都不算证据**，因为它们没说明具体功能

---

## 各条的特殊检查清单

### 1. Unity (`unity-3dgs-support`)

- 主流插件候选：Aras Pranckevičius 的 `UnityGaussianSplatting` (https://github.com/aras-p/UnityGaussianSplatting)、其他 Asset Store 上的产品
- 注意：Unity Asset Store 页面常有营销夸大，优先以 GitHub 源码 + README 为证据
- 必须确认插件是否能在 Unity Editor 里实时渲染，还是只是导入为 mesh

### 2. Unreal Engine (`unreal-engine-3dgs-support`)

- 主流插件候选：xverse 的 UE 插件、Luma AI 的 UE 插件、其他 marketplace 产品
- 注意：UE marketplace 页面同样有营销夸大
- 区分清楚：Niagara 粒子系统模拟 ≠ 真正的 3DGS rasterization

### 3. Three.js (`threejs-3dgs-support`)

- 主流候选：mkkellogg 的 GaussianSplats3D (https://github.com/mkkellogg/GaussianSplats3D)、antimatter15 的 splat (https://github.com/antimatter15/splat)
- 这些是独立的渲染库，不是 Three.js 官方
- 关键判断：填 splat-render 时，写明这是"基于 Three.js 生态的第三方库"还是"Three.js 官方"

### 4. Babylon.js (`babylonjs-3dgs-support`)

- 重要线索：Babylon.js 在 2024 年某个版本的官方 release notes 里加入了 3DGS 支持（你需要去查证具体版本号和日期）
- 这是难得的"官方原生支持"案例，注意区分 native vs plugin
- 必须找到官方 changelog / release notes 的原文

### 5. Polycam (`polycam-3dgs-support`)

- **无开源 repo**，证据来源主要是：
  - 官方网站 (https://poly.cam/)
  - 官方帮助中心
  - 官方 blog / news
  - 应用商店描述（弱证据）
- 关键判断：Polycam 是**生产 3DGS** 的工具（用户拍照→云端训练→输出文件），还是**消费 3DGS** 的工具（导入别人的 splat 文件并查看）？
- 一个工具可以两者都是，但要分别给证据

---

## 输出要求

- 5 个独立 .md 文件，路径 `knowledge-base/sources/engines/<slug>.md`
- 每个文件结构必须与 `blender-3dgs-support.md` 一致：frontmatter + verbatim 引用区 + 工作流速记
- frontmatter 中 `verification: pending`、`captured-by: auto` 必须保留
- 每个文件至少 3 条 sources URL（除非真的找不到，例如 Polycam 可以接受 2 条权威来源）
- 完成后，告诉我："第二批 5 条完成，文件路径如下：……"

---

## 完成后的自检清单（请在最后一条 .md 完成后回答这 5 个问题）

1. 每条的 plugin-author / first-supported / latest-tested-version 是否都有 verbatim 引用支撑？没有的是否填了 null？
2. 每条的 splat-export 字段，是否找到了真实的 export 代码/功能证据？没找到的是否填了 false？
3. 每条的核心 verbatim 引用是否是"证明该软件能渲染 3DGS"，而不是"该软件与 3DGS 相关"？
4. 5 条里有没有哪一条你不太确定？请单独标出来。
5. 5 条里 splat-render 的分布是怎样的？（多少 native / 多少 plugin / 多少 none？）
