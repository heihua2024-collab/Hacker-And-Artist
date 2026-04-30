# TASK-02：术语表补全（首批 5 条 + 后续 17 条）

## 给 Auto 模型：完整任务说明

你已经成功完成 25 条 engine-support 的采集（TASK-01-batch-1/2/3）。这次切到术语表（glossary）。

### 必读

执行本任务前，请先读：

1. `knowledge-base/AUTO-WORKFLOW.md` —— 五条铁律
2. `knowledge-base/templates/source-template-glossary.md` —— **新升级的术语表模板**（重点看末尾"全光谱用户约束"）
3. `src/lib/data/glossary.ts` —— 现有 30 条术语数据（你不需要改它，仅作为关联术语 ID 的来源）

---

## 关键定位约束（必读，影响每条术语的写法）

INKTOYS 的目标用户**横跨四类**：

1. **行业研究者**（看论文、关心精度指标、需要溯源）
2. **行业从业者**（做项目、关心工具链、需要工作流）
3. **技术爱好者**（自学、关心实现细节、需要代码示例）
4. **小白爱好者**（围观、关心"这玩意能干嘛"、需要类比）

**这意味着每条术语必须同时服务这四类人**。具体规则在模板末尾"全光谱用户约束"里——重点：

- `short-zh / short-en` 必须用**日常类比**写给小白看（"像...一样"、"想象成..."），禁止学术官话
- `long-zh / long-en` 写给从业者/研究者，但**禁止照抄论文/Wikipedia 原文**，必须用自己的话重组
- `prerequisite-terms` 是给小白的学习梯子（"先懂这些再来"）
- `advanced-terms` 是给研究者的延伸路径（"懂了这条之后看这些"）
- `related-tools / related-engines` 是给从业者的"接入实际工作"（必须用 src/lib/data/tools.ts 和 engines.ts 里真实存在的 slug）

---

## 阶段 1：先做 5 条做摸底（务必只做这 5 条）

按之前 engine-support 的"先验证后批量"原则，**这一轮只产出下面 5 条 .md，等审核员（Opus）反馈后再做剩下 17 条**：

| slug | 类型 | 难度 | 特殊检查点 |
|---|---|---|---|
| `photogrammetry` | concept | beginner | 测试 Auto 写"小白通俗定义"的能力，必须用日常类比 |
| `floaters` | technique | intermediate | 测试 Auto 处理"业内口语术语"（不是论文里的正式术语）的能力，证据可能要从博客/工具文档找 |
| `path-tracing` | concept | expert | 测试 Auto 找经典图形学论文证据的能力。`related-engines` 必须含 `nvidia-omniverse`（已是矩阵里 native + path-traced 的唯一案例） |
| `spz` | format | intermediate | 测试格式类条目。SPZ 是 Niantic 自研的开源 3DGS 压缩格式，相关 `related-engines` 是 `niantic-scaniverse`（已存在）。证据要找 Niantic GitHub 或 Scaniverse 官方博客 |
| `sugar-method` | technique | expert | SuGaR 是 Antoine Guédon 等人的论文（Inria）。注意：现有 cases.ts 里已经有 `sugar-surface-aligned-meshes` 案例条目，本术语条目应在 `related-papers` 里链回 SuGaR 论文 arxiv URL |

**输出位置**：`knowledge-base/sources/glossary/<slug>.md`

每条文件结构必须严格按 `source-template-glossary.md`：frontmatter 全部字段填齐 + 原文证据区。

---

## 各条特别约束

### 1. photogrammetry（摄影测量）

- `short-zh`：必须像"用一堆照片重建出 3D 模型的传统方法"这种日常说法
- `short-en`：同样要避免"based on... method"
- `prerequisite-terms`：可填 `point-cloud`（已存在）
- `advanced-terms`：可填 `sfm`、`mvs`、`3dgs`（都已存在）
- `related-tools`：可填 `polycam`、`luma-ai`、`kiri-engine`（都在 tools.ts）
- 证据来源：Wikipedia 摄影测量 + 任意一篇综述论文

### 2. floaters（漂浮物 / 浮渣）

- 这是**业内口语术语**，不是论文里的正式术语，写定义时要承认这一点
- `short-zh`：可以用"训练后的 3DGS 场景里悬浮在空中的多余高斯体，像花粉一样的视觉杂质"
- 证据来源：SuperSplat README / 任意 3DGS 编辑器博客 / 反 floaters 的论文（如 GScale 等）
- 不要硬找一个"原始论文"——如果该词没有学术来源，`introduced-in` 填 null 并在 notes 说明

### 3. path-tracing（路径追踪）

- 这是经典图形学术语，3DGS 之前就存在 30 年
- `introduced-in` 应该指向经典图形学起源（James Kajiya 1986 年的 The Rendering Equation 论文）
- `related-engines` **必须含 `nvidia-omniverse`**（这是我们矩阵里唯一的 path-traced 3DGS 实现）
- `long-zh / long-en` 必须解释清楚 path-tracing 和 rasterization 的区别——这是从业者最关心的差异
- 证据来源：Kajiya 1986 论文 + NVIDIA Omniverse Particle Fields 文档

### 4. spz（SPZ 文件格式）

- SPZ = Scaniverse PLY zipped，由 Niantic 在 2024 年公开
- `introduced-by`：Niantic
- `related-engines`：`niantic-scaniverse`（已存在）、`babylonjs`（也支持 SPZ）
- 证据来源：必须找 https://scaniverse.com/news 下的某篇官方博客 + Niantic GitHub repo（如果有）
- `short-zh`：可以用"Niantic 推出的 3DGS 压缩格式，文件比标准 PLY 小 90%"

### 5. sugar-method（SuGaR 表面对齐高斯）

- 论文：Guédon & Lepetit 2023, "SuGaR: Surface-Aligned Gaussian Splatting for Efficient 3D Mesh Reconstruction and High-Quality Mesh Rendering from 3D Gaussian Splatting"
- `introduced-source-url`：https://anttwo.github.io/sugar/ 或 arxiv.org/abs/2311.12775
- 这是 3DGS → 网格转换的代表方法
- `prerequisite-terms`：`3dgs`、`mesh`（都已存在）
- `advanced-terms`：可留空或填 `mesh-extraction`
- 证据来源：项目主页 + arxiv 论文摘要

---

## 强约束清单（继承 TASK-01 的经验教训）

1. **每个字段必须有 verbatim 引用证据，否则填 null**（无引用就填 null）
2. **不要"根据常识推测"**——比如不要因为某个工具支持就推测它支持具体格式
3. **不要把"印刻万物 / INKTOYS"写进任何字段**
4. **不要给自己盖 `verification: verified` 章**（永远 pending）
5. **`short` 必须自己写**——不能照抄维基百科或论文的第一句话；必须用日常类比
6. **`long` 必须重组语言**——可以引用 10-15 字内的关键短语并标注出处，但不能整段抄
7. **`related-*` 字段中的 ID 必须真实存在**——如果你不确定 slug 是否存在，宁可留空也不要瞎填

---

## 输出要求

- 5 个独立 .md 文件，路径 `knowledge-base/sources/glossary/<slug>.md`
- frontmatter 全部字段都填到（找不到的填 null）
- `quote-en` 是真实原文（不允许翻译版）
- `verification: pending`、`captured-by: auto` 必须保留

---

## 完成后的自检（必答）

跑完 5 条后，请回答这 6 个问题：

1. 5 条 short-zh / short-en 里，有没有任何一条用了"基于..."、"是一种..."这类官话？（如果有，应该重写得更像日常对话）
2. 5 条 prerequisite-terms 里，有几条引用的 ID 是 glossary.ts 里真实存在的？
3. 5 条 related-tools / related-engines 里，有几条引用的 ID 是 tools.ts / engines.ts 里真实存在的？
4. 哪条最不确定？最需要人工复核的字段是什么？
5. introduced-in 字段你给了几条非 null 值？引用证据是什么？
6. 有没有遇到访问失败（403/404/超时）？分别影响了哪些字段？

完成后回复：「术语表第一批 5 条完成」。

---

## 阶段 2 预告（不要现在做）

如果阶段 1 通过审核，下一批会让你跑剩下 17 条：

```
基础概念（3）：novel-view-synthesis / radiance-field / spatial-computing
数学基础（2）：rasterization / gradient-descent
算法工作流（4）：colmap / gsplat-utility / training-loss / mesh-extraction
文件格式（4）：ply-format / splat-format / ksplat / usd-particle-field
评估指标（5）：psnr / ssim / lpips / fps / splat-count
```

**现在请只做阶段 1 的 5 条**。
