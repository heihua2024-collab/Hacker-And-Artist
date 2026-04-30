# TASK-11：Radiance Fields 素材入库（B 阶段第五批 / B2 /insights 路由 / Batch I-IV）

> 创建于 2026-04-30 10:25。用户已拍板：B2 路由选 **B（独立 /insights 路由）**；域名 metadataBase 暂搁（待申请域名后改）。
>
> 本文件是 self-contained 接管手册——读 STATUS.md + 本文件即可动手，**不需要回看任何对话历史**。
>
> **执行者**：新 API 窗口的 Claude 本人（不是 Cursor Auto 子任务、不是 AUTO 夜班）。亲自写代码、跑 build、改文件、修 bug。

---

## §0 接管前必读（按顺序）

1. `C:\Users\15319\inktoys-landing\knowledge-base\STATUS.md`（项目全局快照 / 数据现状 306 条 / 60 路由 / build 11 次绿光）
2. 本文件 §1-§7 全部
3. 两份新素材原文：
   - `C:\Users\15319\Downloads\Radiance Fields 完整知识库.md`（83 KB / 800 行 / 来自 radiancefields.com）
   - `C:\Users\15319\Downloads\Radiance Fields YouTube 频道热门视频完整转录.md`（74 KB / 916 行 / @RadianceFields YouTube 频道）
4. 现有数据摊 schema（看顶部 type 定义）：
   - `src/lib/data/news.ts`（NewsItem schema + 49 条现有条目）
   - `src/lib/data/learning-articles.ts`（LearningArticle schema + 9 条现有 fork article）
   - `src/lib/data/glossary.ts`（GlossaryEntry schema + 79 条现有术语）
   - `src/lib/data/learning-paths.ts`（LearningPath schema + 4 路径 26 模块）
   - `src/lib/taxonomy.ts`（全站枚举字典）

---

## §1 全程硬规则（违反一次重置该块工作）

1. **中文字符串硬约束**：中文 zh 字段内**禁用**英文 `"` `'` `` ` `` `\` `${`——一律用 `「...」` 替代
2. **反幻觉**：每条 entry `sources ≥ 2`；引文 / 数字不确定就标 `[unverified]` 并 `verified: false`
3. **客观风格**：**禁用**「最先进」「极致」「遥遥领先」「革命性」「颠覆性」等情绪化 / 营销词；中性陈述
4. **去人格化**：本批素材作者是公开行业作者（Preetish Kakkar / Sabine Schleise / Jon Barron / 厂商 CEO 等），**可保留署名**——这与印象笔记 fork 不同。但社群个人 ID（如有）仍隐去
5. **勿动清单**：
   - `src/lib/data/learning-paths.ts`（B1 已稳定，本批仅在 §4 Batch III 加 resources 链接）
   - `src/lib/data/learning-articles.ts`（仅 §4 Batch III 追加新条目，**不动现有 9 条**）
   - `src/app/about/` + `src/app/page.tsx`（品牌叙事页禁动）
   - `knowledge-base/STATUS.md`（明早 / 完成后由 Opus 收尾，禁动）
6. **PowerShell 语法**（项目无 git；npm run build 在 `C:\Users\15319\inktoys-landing` 下跑；禁用 `&&` 用 `;`）
7. **每块结束跑 build**：红光就回滚本块改动并跳过；超 30 min 推不动也跳过，记到夜班报告
8. **不要写 .md 总结报告**——只在最后写 1 份夜班报告（见 §6）

---

## §2 任务总目标

按 Batch I → II → III → IV 顺序执行；每块独立可绿光；任一块失败不阻塞下一块。

| Batch | 任务 | 数据摊变化 | 估时 |
|---|---|---|---|
| I | **news 第五批**（行业产品动态 9 条）| news.ts 49 → **58** | 1.5-2h |
| II | **B2 /insights 独立路由 + 6 篇行业洞察**（用户已拍板 B 方案）| 新建 `insights.ts` + 新路由 | 3-4h |
| III | **learning-articles 第二批 + YouTube 引用映射**（2 篇知识库教程入 articles + 10 个视频接入现有 learning-paths 模块）| articles 9 → **11**；4 路径模块 resources 补 YouTube 链接 | 2-3h |
| IV | **glossary 引用增强**（用知识库素材补充现有 entry 的 definition / introducedQuoteEn / sources）| glossary 79 → 79（不增条，只增厚） | 1-1.5h |

**预期最终态**：news 58 / insights 6（新摊）/ articles 11 / glossary 79（增厚）/ 路由 60 → **62**（+/insights、+/insights/[slug]）

---

## §3 Batch I 详细执行（news 第五批 +9 条）

### A. 候选事件清单（从知识库提取，每条都是产品/版本发布或行业事件，全部带客观日期 + 公开 URL）

| # | 中文标题（zh）建议 | 英文标题（en） | publishedAt | category | 主要来源 |
|---|---|---|---|---|---|
| N1 | OctaneRender 2026 正式版发布并公布 2027 路线图 | OctaneRender 2026 Released and 2027 Roadmap Announced | 2025-11-28 | product | 知识库 / OTOY 官网 |
| N2 | OctaneRender 2026.1 Alpha 引入高斯泼溅与 NRC 缓存 | OctaneRender 2026.1 Alpha Adds Gaussian Splatting & Neural Radiance Caching | 2025-01-15 | product | 知识库 / OTOY 官网 |
| N3 | COLMAP 3.12 发布：原生支持多相机 sensor rig | COLMAP 3.12 Released with Native Sensor-rig Support | 2025-06-30 | tool | 知识库 / colmap.github.io |
| N4 | LichtFeld Studio v0.4 发布：深度感知训练 + i18n | LichtFeld Studio v0.4 Adds Depth-aware Training & i18n | 2026-01-16 | tool | 知识库 / GitHub |
| N5 | Gaussian SplatKing 上架 iOS：免费高保真采集应用 | Gaussian SplatKing Launches Free High-fidelity iOS Capture App | 2026-03-13 | product | 知识库 / radiancefields.com |
| N6 | Arrival Space 多版本迭代：碰撞、移动 UX、SPZ 加速 | Arrival Space Iterates: Collision, Mobile UX, SPZ Speedup | 2025-04-28 | platform | 知识库 / arrival.space |
| N7 | Epic Games RealityScan 2.0 正式发布（前身 RealityCapture） | RealityScan 2.0 Officially Released by Epic | 2025-06-17 | tool | 知识库 / Epic Games |
| N8 | Postshot v0.4 发布：RAW/HDR 与 16/32 位整数色彩支持 | Postshot v0.4 Adds RAW/HDR and Wide Color Support | 2024-08-23 | tool | 知识库 / jawset.com |
| N9 | SIGGRAPH 2024 节目单公布：4 个辐射场专场 | SIGGRAPH 2024 Program: Four Radiance-field Sessions | 2024-05-14 | event | 知识库 / SIGGRAPH 官网 |

### B. 每条 NewsItem 必填字段

```ts
{
  id: "<kebab-case-唯一>", // 例如 "octanerender-2026-released"
  title: { zh, en },
  summary: { zh, en }, // 60-120 字客观摘要
  category: "paper" | "product" | "tool" | "platform" | "event" | ... (看 newsCategories 定义)
  tags: TagId[], // 从 taxonomy.tags 选
  level: "beginner" | "intermediate" | "expert",
  source: { name: string, type: SourceTypeId },
  sourceUrl: string,
  coverUrl: string | null, // 暂传 null
  publishedAt: "YYYY-MM-DD",
  editorialNote: { zh, en }, // INKTOYS 编辑部点评，30-80 字客观
  verified: boolean, // sources ≥ 2 且无 [unverified] 才 true
  sources: string[], // 至少 2 条，1 条来自 radiancefields.com 文章原文，1 条来自厂商官网/GitHub/arXiv 等独立源
}
```

### C. 执行步骤

1. **读** `src/lib/data/news.ts` 顶部 `NewsItem` 类型定义 + `newsCategories` 数组（看清 category 枚举）+ 末尾 5 条现有条目对齐风格
2. **检查 id 重复**：`grep -n "id: \"" src/lib/data/news.ts` 看现有 id；新条目避免冲突
3. **写一次性脚本** `knowledge-base/sources/news/_audit/assemble-news-batch5.mjs`（学习 batch4 的脚本模板，但要修复 batch4 已知 bug：
   - CRLF 处理：用 `\n` 不要硬编码 `\r\n`
   - 防双逗号：插入前检查目标位置是否已是 `,`
   - id 去重：脚本内置 Set 校验）
4. **运行脚本** 把 9 条 entry 拼到 news.ts 的 `news: NewsItem[] = [...]` 数组末尾
5. **跑 build**：`cd C:\Users\15319\inktoys-landing; npm run build`，绿光为准
6. **失败回滚**：脚本任一步出错就 `del src/lib/data/news.ts.bak`（如有）并恢复，跳过本块

### D. 完成判断

- `news.ts` 数组从 49 → 58 条
- 9 个新 id 都能在 build 输出 `/news` 页正常渲染
- 没有 yinxiang.com / 印象笔记字符串污染（`rg "yinxiang|印象笔记" src/` = 0）

---

## §4 Batch II 详细执行（B2 /insights 独立路由 + 6 篇行业洞察）

**用户已拍板 B 方案：独立 `/insights` 路由**。这是新数据摊 + 新页面，工作量较大但结构清晰。

### A. 新数据摊 schema（参考 cases.ts / news.ts 的结构）

新建 `src/lib/data/insights.ts`：

```ts
import type { Bilingual, TagId } from "@/lib/taxonomy";

export type InsightCategory =
  | "tech_deep_dive"  // 技术文章 / 论文报道
  | "industry_signal" // 产品 / 平台动向解读
  | "field_report"    // 现场 / 专访 / 体验
  | "essay";          // 长篇随笔 / 趋势评论

export type InsightSection = {
  heading: Bilingual;
  paragraphs: Bilingual[];
};

export type InsightEntry = {
  slug: string;
  title: Bilingual;
  subtitle: Bilingual;
  summary: Bilingual; // 100-180 字摘要
  category: InsightCategory;
  tags: TagId[];
  author: string; // 公开作者署名（如 Preetish Kakkar / li yang）；INKTOYS 自产用 「INKTOYS 编辑部」
  publishedAt: string; // YYYY-MM-DD
  readingMinutes: number;
  body: InsightSection[]; // 3-8 节
  relatedNewsIds?: string[];
  relatedCaseSlugs?: string[];
  relatedToolSlugs?: string[];
  callToAction?: Bilingual;
  verified: boolean;
  sources: string[]; // ≥ 2
};

export const insights: InsightEntry[] = [ /* 6 条 */ ];
export const insightsBySlug = Object.fromEntries(insights.map(i => [i.slug, i]));
```

### B. 新路由

新建：

1. `src/app/insights/page.tsx` — 总览页：标题 + 简介 + 6 张卡片网格（按 category 分区）
2. `src/app/insights/[slug]/page.tsx` — 详情页：参考 `src/app/learn/articles/[slug]/page.tsx` 的风格，包含：
   - 面包屑：印刻万物 / 行业洞察 / `<title.zh>`
   - 顶部 meta：作者 / 发布日期 / 阅读时长 / category 标签
   - body 渲染：每个 section heading + paragraphs
   - 底部「关联」区：relatedNews / relatedCases / relatedTools 之一或多
   - generateStaticParams + generateMetadata（zh title + zh summary）

3. **新组件**（如有需要）：`src/components/landing/InsightDetail.tsx`，参考 `LearningArticleDetail.tsx`
4. **导航接入**：检查站点顶部导航栏（应在 `src/components/landing/Navigation.tsx` 或 `Header.tsx`）—— 加一个「行业洞察」入口指向 `/insights`

### C. 6 篇候选 insights 来源

| # | slug | category | 中文标题 | author | publishedAt | 来源段落（在知识库 .md 的什么位置）|
|---|---|---|---|---|---|---|
| I1 | radiance-meshes-tetrahedral-rendering | tech_deep_dive | Radiance Meshes：用四面体网格挑战高斯泼溅的体素叙事 | radiancefields.com 编辑部 | 2025-12-04 | 知识库 §技术文章 第 1 篇 |
| I2 | third-dimension-supersim-launch | industry_signal | Third Dimension SuperSim：从机器人传感日志直建模拟器 | radiancefields.com 编辑部 | 2025-12-09 | 知识库 §技术文章 第 2 篇 |
| I3 | quadrature-fields-fast-nerf | tech_deep_dive | Quadrature Fields：把 NeRF 渲染推到 100-500 FPS | radiancefields.com 编辑部 | 2024-09-11 | 知识库 §技术文章 第 3 篇 |
| I4 | infinite-realities-future-of-imaging | field_report | Infinite Realities 现场：176 相机 484 灯下的人体 4D 高斯捕捉 | radiancefields.com 编辑部 | 2025-04-10 | 知识库 §特别报道 第 1 篇 |
| I5 | google-immersive-view-nerfs | industry_signal | Google Immersive View 解析：NeRF 进入 Maps 的工程化路径 | radiancefields.com 编辑部 | 2023-06-14 | 知识库 §特别报道 第 2 篇 |
| I6 | laser-vs-visual-china-2026 | industry_signal | 激光 vs 视觉：2026 中国 3DGS 行业路线对比 | INKTOYS 编辑部 | 2026-04-29 | `knowledge-base/sources/research/industry-laser-vs-visual-2026-04.md` |

### D. 改写规范

1. **不要逐字复制**——按段意提炼重写为中文 zh + 英文 en
2. 每篇 body 拆 3-6 个 section，每 section 1-3 段，每段 100-300 字
3. **不要写情绪化用语**——把原文中「revolutionary」「unprecedented」「stunning」等替换成中性陈述
4. 每篇 sources 至少 2 条：
   - 1 条 radiancefields.com 原文 URL（如 https://radiancefields.com/<slug>，slug 在原文链接里能找到，找不到就用 [unverified] 标 + verified=false）
   - 1 条独立源（厂商官网 / arXiv / GitHub / 第三方媒体）
5. **I6（laser-vs-visual）**：用现有草稿 `sources/research/industry-laser-vs-visual-2026-04.md` 直接改写入库，作者归 INKTOYS 编辑部
6. relatedToolSlugs / relatedCaseSlugs 字段从 tools.ts / cases.ts 现有 slug 中匹配；找不到就空数组

### E. 执行步骤

1. 新建 `src/lib/data/insights.ts` 含 schema 定义 + `insights: []`
2. 新建 `src/app/insights/page.tsx` + `src/app/insights/[slug]/page.tsx` + `InsightDetail.tsx`
3. 跑 build（应该绿光，因为 insights 数组为空，路由空转）
4. 用脚本（或手工）把 6 篇 InsightEntry 加入数组
5. 修改导航栏加「行业洞察」入口
6. 跑 build：检查 `/insights` + 6 个 `/insights/[slug]` 共 7 个新静态路由生成
7. 浏览器手测（如时间允许）：所有 6 篇详情页能正常渲染、面包屑正确、关联区不报错

### F. 完成判断

- `/insights` 总览页 + 6 个详情页全部静态化（路由 60 → 67）
- build 绿光
- 站内导航加了行业洞察入口

---

## §5 Batch III 详细执行（learning-articles 第二批 + YouTube 视频映射）

### A. learning-articles 新增 2 条（来自知识库教程章节）

| # | slug | 中文标题 | 来源 |
|---|---|---|---|
| LA10 | gaussian-splatting-tools-getting-started | 高斯泼溅入门：5 款主流工具横评 | 知识库 §教程与指南 第 1 篇（作者 Sabine Schleise，2025-03-31）|
| LA11 | nerf-virtual-production-pipeline | NeRF 在虚拟制片中的工程化路径 | 知识库 §教程与指南 第 2 篇（Volinga 团队，2023-04-04）|

按 `LearningArticle` schema 写入 `src/lib/data/learning-articles.ts` 末尾，**不动现有 9 条**。

### B. YouTube 视频映射（不新增 article，作为现有 learning-paths 模块的扩展 resources）

10 个视频每个映射到 1-2 个 learning-paths 模块的 `resources` 数组。**这是引用，不是 fork**——只加链接 + 视频标题 + type: "video"，不抓转录入站内。

| # | YouTube 视频 | 映射到（learning-paths.ts 模块路径） |
|---|---|---|
| V1 | Apple Sharp 3D Photo Tutorial | `understandGaussianSplatting / 模块 05` 上手实践 |
| V2 | The Hidden 3D Inside Google Maps | `spatialNarrativeExperiments / 模块 01` 从论文到展览 |
| V3 | Gaussian Splatting is Getting Realistic | `understandGaussianSplatting / 模块 06` 局限与突破 |
| V4 | 4D Gaussian Splatting Explained | `spatialNarrativeExperiments / 模块 02` 动态高斯 |
| V5 | NeRF vs Gaussian Splatting Comparison | `understandGaussianSplatting / 模块 01` 从点阵到泼溅 |
| V6 | Best Gaussian Splatting Tools 2024 | `captureAndTraining / 模块 06` 本地训练入门 |
| V7 | Infinite Realities Interview | `spatialNarrativeExperiments / 模块 02` 动态高斯 |
| V8 | COLMAP Tutorial for Beginners | `captureAndTraining / 模块 02` 三层拍摄法 |
| V9 | Radiance Fields in Unreal Engine 5 | `webViewingInteraction / 模块 03` PlayCanvas & Babylon.js（注：UE 不在 PlayCanvas 但属于「引擎级支持」类）|
| V10 | Creating NeRFs from Drone Footage | `captureAndTraining / 模块 05` 运动相机与全景相机 |

每条以 `LearningResource` 格式追加：

```ts
{
  type: "video",
  title: "<视频中文标题>（Radiance Fields 频道）",
  url: "<youtube.com URL>",
}
```

### C. 执行步骤

1. **LA10 + LA11**：参考 LearningArticle schema 拼出 2 条 entry，append 到 learning-articles.ts 数组末尾
2. **V1-V10**：用 StrReplace 在 learning-paths.ts 中找到对应模块的 `resources` 数组末尾插入新 video resource
3. 跑 build → 应有 11 个 article 路由 + 4 路径模块的 resources 各扩充 1-2 条
4. **不要 fork 视频转录全文进站内**——只放链接

### D. 完成判断

- learning-articles.ts 9 → **11** 条
- learning-paths.ts 4 路径中 8 个模块 resources 各扩充 1-2 条 video（共 10 条）
- 不增加路由数（articles 路由从 9 → 11，但 [slug] 是动态的，build 输出会显示更多静态页）
- build 绿光

---

## §6 Batch IV 详细执行（glossary 引用增强 / 不增条只增厚）

### A. 增强对象（10-15 条现有 entry）

利用知识库素材里的客观阐述补充：

| 现有 glossary id | 增强字段 | 增强源 |
|---|---|---|
| `radiance-field` | 加 `introducedQuoteEn` 引用 NeRF 原论文 verbatim 引文 | 知识库 §核心概念 段落 |
| `nerf` | 补 `definition.en` 增加 Mildenhall 团队背景 + Instant-NGP 时间线 | 知识库 §核心概念 / NeRFs |
| `3dgs` | 补 `sources` 加 radiancefields.com 等独立源 | 知识库 §核心概念 / 3DGS |
| `mesh-extraction` | 补 SuGaR / 2DGS / RaDe-GS / Gaussian Frosting 列举 | 知识库 §3DGS § Gaussian Splatting Mesh |
| `path-tracing` | 补 OctaneRender 把 splat 当 path-traced primitive 的工程实例 | 知识库 §行业 OctaneRender 2026 |
| `colmap` | 补 3.12 sensor-rig + 增量/全局 SfM 区分 | 知识库 §行业 COLMAP 3.12 |
| `compressed-gs` | 补 SPZ + KSplat 与 .splat 的代际关系 | 知识库 §概念 / 行业 |
| `4dgs` | 补 Infinite Realities 实景采集 case + 时间维度引用 | 知识库 §特别报道 |
| `splat-format` | 补 OctaneRender / Octane 2027 路线图（CG 直转 splat） | 知识库 §行业 OctaneRender |
| `splat-count` | 补 Infinite Realities 300K 图像/30 秒的工程量级 | 知识库 §特别报道 |

### B. 执行规则

1. **只增不减**——已有字段 / 引文 / 关系不要覆盖，只 append
2. 每条新加的 quote / source 必须有 verbatim 引文或 URL
3. **保持 verified=true 的条目仍然 true**——除非加进来的内容自己 unverified
4. 不要新建 entry —— glossary 79 条数量不变

### C. 执行步骤

1. 读 glossary.ts 找到对应 id 的位置
2. 用 StrReplace 精准追加（注意 trailing comma 和数组语法）
3. 跑 build 一次绿光后再处理下一条
4. 任意一条卡住超 10 min 就跳过

### D. 完成判断

- glossary.ts 仍 79 条
- 至少 8 条 entry 增厚（剩 2 条若卡掉可跳过）
- build 绿光

---

## §7 完成后产出（唯一允许写的 .md）

新建：`knowledge-base/BATCH5-REPORT-2026-04-30.md`

模板：

```markdown
---
# AUTO 批次 5 战果（Radiance Fields 素材入库）

## 1. 总进度
| Batch | 任务 | 状态 | 用时 | 备注 |
|---|---|---|---|---|
| I | news 第五批 +9 | ✅/❌/部分 | XX min | drop 原因 |
| II | /insights 路由 + 6 篇 | ✅/❌/部分 | XX min | 路由生成情况 |
| III | articles +2 + YouTube V1-V10 | ✅/❌/部分 | XX min | drop / 卡点 |
| IV | glossary 增强 8-10 条 | ✅/❌/部分 | XX min | 跳过哪条 |

## 2. 数据规模变化
- news.ts: 49 → ?
- insights.ts: 0 → ? （新摊）
- learning-articles.ts: 9 → ?
- glossary.ts: 79 → 79（增厚条目数 X）
- 累计入库条目: 306 → ?
- 路由数: 60 → ?

## 3. build 历史
- I 后 build: ✅/❌
- II 后 build: ✅/❌
- III 后 build: ✅/❌
- IV 后 build: ✅/❌
- 最终 build 输出 Route 摘要（粘贴）

## 4. 跳过 / 卡点 / 决策留给 Opus
（按优先级列）

## 5. verified=false 条目清单
（哪些 entry 因 sources 不够硬被标 unverified）

## 6. 修改文件清单
（人工枚举所有动到的文件路径）
---
```

写完报告就停手。**不要改 STATUS.md**（明早由原窗口的 Opus 统一收尾）；不要起新任务；可以向用户简短复盘但不要发起新决策询问。

---

## §8 现在开始

从 §0 必读开始 → 进 §3 Batch I。所有「我应该问用户吗」的答案都是「不」（决策已全部固化在本 brief）。Go.
