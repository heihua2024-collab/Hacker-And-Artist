# TASK-06 · 术语表第三批

**目标**：当前 `glossary.ts` 已有 22 条（首批 5 + 二批 17）。本批次扩充 25 条，覆盖**摄影测量基础 + 渲染数学基础 + 评测指标 + 工程化术语**。

**为什么交给 Auto**：术语类内容定义稳定（百科级别），且 Auto 在二批 17 条任务中表现极好（错误率 < 5%）。

---

## A. 本批次清单（25 条）

按主题分组。每条都有明确的"它是什么"边界，避免模糊扩展：

### 组 1：摄影测量基础（7 条）

```
sfm                          # Structure from Motion / 运动恢复结构
mvs                          # Multi-View Stereo / 多视图立体
camera-intrinsics            # 相机内参
camera-extrinsics            # 相机外参 / 位姿
bundle-adjustment            # 光束法平差
feature-matching             # 特征匹配
epipolar-geometry            # 对极几何
```

### 组 2：3DGS 数学基础（6 条）

```
anisotropic-gaussian         # 各向异性高斯
spherical-harmonics          # 球谐函数
covariance-matrix            # 协方差矩阵
opacity-alpha                # 不透明度 / Alpha
view-dependent-color         # 视相关颜色
quaternion-rotation          # 四元数旋转
```

### 组 3：训练与优化（6 条）

```
adaptive-density-control     # 自适应密度控制（splat 加倍/移除）
splat-clone                  # Splat 克隆（高梯度区域）
splat-split                  # Splat 分裂（高方差区域）
splat-prune                  # Splat 剪枝（低不透明度移除）
densification                # 加密
gradient-loss                # 梯度损失
```

### 组 4：评测与指标（4 条）

```
psnr                         # 峰值信噪比
ssim                         # 结构相似性
lpips                        # 学习感知图像相似度
fps-realtime                 # 帧率/实时性阈值
```

### 组 5：工程化与发布（2 条）

```
splat-compression            # Splat 压缩（含 SPZ / Niantic）
streaming-splat              # 流式分块加载
```

---

## B. GlossaryEntry schema

参见 `src/lib/data/glossary.ts` 第 29-62 行。**严格按照已有 22 条的字段填法**。

```typescript
{
  id: "sfm",                                 // 同清单中的 slug
  term: { zh: "运动恢复结构", en: "Structure from Motion (SfM)" },
  aliases: ["SfM", "Structure-from-Motion"],
  definition: {
    zh: "...",                               // 长定义（200-400 字中文）
    en: "...",                               // 长定义（200-400 词英文）
  },
  category: "concept" | "technique" | "format" | "tool" | "metric" | "workflow",
  level: "beginner" | "intermediate" | "expert",
  relatedTagIds: ["paper", "optimization"],   // 从已有 TagId 选
  relatedTerms: ["3dgs", "mvs"],              // 关联其他术语 ID（用 . id 引用）
  links: [
    { label: "...", url: "...", type: "blog" | "paper" | "course" | "...其他 SourceTypeId" },
  ],
  verified: true,
  sources: ["<URL>", "<URL>"],

  // ===== 新字段（必填，二批已稳定执行）=====
  short: {
    zh: "<30-60 字中文，日常类比>",
    en: "<50-100 字符英文，日常类比>",
  },
  prerequisiteTerms: ["camera-intrinsics", "feature-matching"],  // 1-3 个，从已有/本批术语选
  advancedTerms: ["bundle-adjustment", "mvs"],                   // 0-2 个
  introducedIn: "1981",                                          // 找不到就 undefined
  introducedBy: "Longuet-Higgins",                               // 首次提出者
  introducedSourceUrl: "<URL 找不到就 undefined>",
  introducedQuoteEn: "<verbatim 引用，找不到就 undefined>",
  relatedTools: ["colmap"],                                      // 从已有 tools.ts slug 选
  relatedEngines: [],                                            // 从已有 engines.ts slug 选
  relatedPapers: ["https://arxiv.org/abs/..."],                  // 论文 URL
},
```

---

## C. "全光谱用户"分层硬要求（重点）

每条术语的 4 个层次内容必须区隔清晰：

| 字段 | 受众 | 风格 | 长度 |
|---|---|---|---|
| `short.zh` / `short.en` | 完全没接触过 3DGS 的小白 | 用日常类比，不出现技术词 | 中文 30-60 字，英文 50-100 字符 |
| `definition.zh` / `definition.en` | 已经入门的从业者 | 客观技术定义，可有少量术语 | 中文 200-400 字，英文 200-400 词 |
| `prerequisiteTerms` | 小白学习路径 | 列 1-3 个"先看这些" | 数组 |
| `advancedTerms` | 专家延伸 | 列 0-2 个"看完这条之后" | 数组 |

### 反例

❌ 把 `definition` 写得连小白都能懂 —— 那就侵蚀了 `short` 的存在意义

❌ 把 `short` 写成定义改写版 —— 没用日常类比

✅ `short` 用类比："SfM 像在你逛景区时拍 100 张照片，软件根据照片间的差异反推每张照片的拍摄位置"

✅ `definition` 用术语：".SfM 是一类从无序图像集恢复相机内参、外参以及稀疏 3D 点云的优化算法..."

---

## D. introducedIn / introducedBy 处理规则

很多基础概念（如 PSNR、SSIM、SfM）历史悠久，可以追溯到具体年份和首作者。

- 找不到就**全部 undefined**（不要瞎猜）
- 不要把"3DGS 论文里第一次用到"当成"该术语首次提出"（那是误导）
- 例：`spherical-harmonics` 是 19 世纪数学概念，introducedIn 应填数学历史源头（如 Laplace 1782）或 undefined，**不能填 "Kerbl 2023"**

---

## E. 输出位置

每条产出 1 个文件：

```
knowledge-base/sources/glossary/<id>.md
knowledge-base/sources/glossary/<id>.ts.snippet
```

`sources/glossary/` 已有 22 条 .md（首批 + 二批），新条目放同一目录即可。

---

## F. 反幻觉硬规则

1. **每条 sources ≥ 2 条**：维基百科 / 教科书 PDF / 论文链接 / 综述 / 官方文档
2. **数学定义不要"通俗化重新发明"**：例如 `covariance-matrix` 的数学定义直接搬维基/教科书，不要自创
3. **`category` 选最贴的一类**：摄影测量基础多为 `concept`，3DGS 数学基础多为 `concept` 或 `technique`，训练优化多为 `technique` 或 `workflow`，评测多为 `metric`
4. **如某条在已有 22 条里已存在**：跳过并在自检报告说明
5. **不要塞营销话术或夸大**：定义只描述"是什么"，不要写"非常重要"、"广泛使用"等

---

## G. TS 字符串硬约束

⚠️ 上次（二批 17 条）有一条因中文里夹了英文直引号导致 build 失败。**这次每条产出 .ts.snippet 后必做自检**：

1. 全文搜索中文字符串内的 `"` `'` `` ` `` `${` `\`
2. 找到就替换为 `「...」` 或重写
3. 英文 quote 内引号用 `\"` 转义

---

## H. 完成报告

完成 25 条后回复：
1. 完成数 __ / 25（按组分类计数）
2. 已有 22 条无重复：是 / 否
3. short / definition 分层清晰：是 / 否
4. introducedIn 全部经核实（不瞎猜）：是 / 否
5. 字符串自检通过：是 / 否
6. 抓取过程发现的"应补但本批未列入"的术语，列出 1-3 条建议

## 开始执行

按组顺序：组 1（7 条摄影测量基础）→ 组 2（6 条 3DGS 数学）→ 组 3（6 条训练优化）→ 组 4（4 条指标）→ 组 5（2 条工程）。
