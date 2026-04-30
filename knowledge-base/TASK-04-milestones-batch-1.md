# TASK-04 · 里程碑论文扩充（cases.ts）批次 1

**目标**：当前 `cases.ts` 只有 4 条 milestone（含原始 3DGS 论文），需扩充至 16 条左右覆盖 3DGS 主要算法演进路线。本批次产出 12 条。

**为什么交给 Auto**：里程碑论文有 arXiv ID、官方项目页、PDF 下载、GitHub repo —— 这是 Auto 最不容易幻觉的领域（数据可逐字核对）。Opus 后续只需 spot-check + 拼装。

---

## A. 本批次清单（12 条）

按论文发表时间排序。每条都给出 arXiv ID 作为搜索锚点：

| # | slug | arXiv | 全名 | 主要贡献 |
|---|---|---|---|---|
| 1 | mip-splatting | 2311.16493 | Mip-Splatting: Alias-free 3D Gaussian Splatting (Yu et al., CVPR 2024) | 抗锯齿/多尺度 |
| 2 | 4d-gaussian-splatting | 2310.08528 | 4D Gaussian Splatting for Real-Time Dynamic Scene Rendering (Wu et al., CVPR 2024) | 动态场景 |
| 3 | dreamgaussian | 2309.16653 | DreamGaussian: Generative Gaussian Splatting (Tang et al., ICLR 2024) | 文本/图像→3D |
| 4 | 2d-gaussian-splatting | 2403.17888 | 2D Gaussian Splatting for Geometrically Accurate Radiance Fields (Huang et al., SIGGRAPH 2024) | 2D 表面表示 |
| 5 | scaffold-gs | 2312.00109 | Scaffold-GS: Structured 3D Gaussians for View-Adaptive Rendering (Lu et al., CVPR 2024) | 锚点结构化 |
| 6 | compact-3d-gaussian | 2311.13681 | Compact 3D Gaussian Representation (Lee et al., CVPR 2024) | 压缩/内存优化 |
| 7 | deformable-3d-gaussians | 2309.13101 | Deformable 3D Gaussians for High-Fidelity Monocular Dynamic Scene Reconstruction (Yang et al., CVPR 2024) | 可变形/动态 |
| 8 | gaussian-avatars | 2312.02134 | GaussianAvatars: Photorealistic Head Avatars (Qian et al., CVPR 2024) | 数字人头像 |
| 9 | langsplat | 2312.16084 | LangSplat: 3D Language Gaussian Splatting (Qin et al., CVPR 2024) | 语言/语义嵌入 |
| 10 | gaussian-splatting-slam | 2312.06741 | Gaussian Splatting SLAM (Matsuki et al., CVPR 2024) | 实时 SLAM |
| 11 | sugar | 2311.12775 | SuGaR: Surface-Aligned Gaussian Splatting (Guédon et al., CVPR 2024) | 表面提取 |
| 12 | hugs | 2311.17910 | HUGS: Human Gaussian Splats (Kocabas et al., CVPR 2024) | 人体动画 |

---

## B. CaseEntry schema（必读，已存在的 TS 类型）

参见 `src/lib/data/cases.ts` 第 36-63 行。本批次 `kind` 全部填 `"milestone"`。

**关键字段必填要求**：

```typescript
{
  slug: "mip-splatting",                              // 同清单第 2 列
  kind: "milestone",
  title: { zh: "...", en: "..." },                    // en 用论文官方完整标题；zh 是中文意译
  summary: { zh: "...", en: "..." },                  // 一句话摘要，中文 30-60 字，英文 100-150 字符
  description: { zh: "...", en: "..." },              // 中文 200-400 字，英文 200-400 词；客观描述论文方法 + 贡献
  spaceType: null,                                    // milestone 没有具体空间，全部填 null
  location: { country: null, city: null, site: null },// 同上
  year: 2024,                                         // 论文发表/上传年
  creators: [
    { name: "Zehao Yu", role: "researcher", link: null }, // 第一作者 + 必要的通讯作者
    // 可加 1-2 个核心作者，不必列全部
  ],
  client: null,
  captureDevice: null,
  captureMethod: null,
  trainingPipeline: null,
  trainingTime: null,
  splatCount: null,
  viewerStack: null,
  splatViewerUrl: null,
  videoUrl: "<论文项目页 video 或 YouTube 链接，找不到填 null>",
  coverUrl: null,                                     // 全部填 null（避免 hotlink 论文图片版权问题）
  tags: ["paper", "optimization"],                    // 从下方 D 节选
  lessons: [
    { zh: "...", en: "..." },                         // 2-3 条「这篇论文教会业界什么」的客观陈述
    { zh: "...", en: "..." },
  ],
  links: [
    { label: "arXiv", url: "https://arxiv.org/abs/2311.16493" },
    { label: "Project Page", url: "..." },
    { label: "GitHub", url: "..." },                   // 没有就不加
    { label: "Video", url: "..." },                    // 没有就不加
  ],
  publishedAt: "2024-CVPR" | "2024-SIGGRAPH" | "2024-ICLR",  // 发表会议
  verified: true,
  sources: [
    "<arXiv URL>",
    "<项目页 URL>",
    "<GitHub URL 如有>",
  ],
  quote: {
    zh: null,                                          // 不填中文 quote
    en: "<论文 abstract 第一句 verbatim>",
  },
},
```

---

## C. tags 允许值（从这里选 2-4 个）

```
paper             # 必选（每条都加）
optimization      # 性能/速度/内存优化的论文
generation        # 文本/图像→3D 生成
dynamic           # 动态/4D 场景
avatar            # 数字人/头像
slam              # SLAM/定位重建
semantic          # 语义/分割
surface           # 表面提取/几何精度
compression       # 压缩
reconstruction    # 通用重建
```

---

## D. 输出位置

每条产出 1 个文件：

```
knowledge-base/sources/cases/<slug>.md
knowledge-base/sources/cases/<slug>.ts.snippet
```

**注意**：是 `sources/cases/` 不是 `sources/tools/`。如目录不存在请创建。

---

## E. 反幻觉硬规则

1. **每条 sources 必须 ≥ 2 条**：arXiv URL 必填 + 项目页或 GitHub 必填
2. **arXiv ID 必须严格按清单**：不要从清单的论文标题搜出来的同名其他论文，必须用 arXiv ID 锁定
3. **作者名 verbatim**：从论文 PDF 第一页或 arXiv abstract 页复制，不要"翻译"或"音译"
4. **quote.en 必须 verbatim**：论文 abstract 第一句话，逐字复制（包括标点）
5. **找不到 GitHub 不要编造**：有就填，没有就不加 `links` 项
6. **publishedAt 字段**：以会议官方接收的发表年份 + 会议简称为准（CVPR / SIGGRAPH / ICLR / NeurIPS / ECCV / ICCV）

---

## F. TS 字符串硬约束

复用 TASK-03-tools-stage-2.md 的 C 节：
- 中文字符串内禁用英文 `"` `'` `` ` `` `\`
- 英文 quote 内的引号用 `\"` 转义
- 不用模板字符串（`${...}`）

---

## G. 完成报告

完成 12 条后，回复一份自检报告：
1. 完成数 __ / 12
2. arXiv ID 全部命中（每条都是清单指定 ID）：是 / 否
3. quote.en 全部 verbatim 来自论文 abstract：是 / 否
4. 字符串自检通过：是 / 否
5. 是否在抓取过程发现"清单缺失的高影响 milestone 论文"？如有，建议 1-3 条由 Opus 决定是否加入下一批

## 开始执行

按清单顺序产出 12 条。优先级最高：1 (mip-splatting) / 3 (dreamgaussian) / 10 (gs-slam) —— 这三条对全谱用户曝光率最高。
