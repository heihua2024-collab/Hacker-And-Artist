# INKTOYS 项目状态（2026-04-30 10:42）

> **新会话使用说明**：这份文件是项目当前完整状态的快照。新会话读这份后即可接管，无需重读历史对话。优先读 1-3 节理解全局，4-5 节理解当前阻塞点，6-7 节执行下一步。

---

## 1. 项目定位与战略

**INKTOYS（印刻万物）** = 3DGS（3D Gaussian Splatting / 三维高斯泼溅）行业基建型独立站。

- **不是**：个人博客 / 作品集 / 创作者人设站
- **是**：覆盖全谱用户（研究者 / 从业者 / 技术爱好者 / 小白）的「一站式 3DGS 内容枢纽」
- **角色分工**：
  - **Opus（我）**：审核 / 决策 / 提炼 / 拼装代码 / 写 brief
  - **AUTO（用户的多个 Cursor 窗口）**：批量审计 / 转录 / 数据扩充
  - **Gemini Pro（用户网页）/ YouMind**：超大规模文本/视觉转录
  - **用户**：方向决策 / 提供私域素材 / 把 AUTO 当人用
- **核心战略原则**：
  - 客观评价（pros/cons 不写主观感受 / 营销话术 / 民族主义话术）
  - 去人格化（社群成员个人 ID 一律隐去，可保留商业品牌、GitHub 仓库、公开作者署名）
  - 反幻觉（每条 sources ≥ 2 条，verbatim 引文必填，不知道就标 [unverified] 不要瞎猜）
  - TS 字符串硬约束（**中文字符串内禁用英文 `"` `'` `` ` `` `\` `${`**——用 「...」 替代）

---

## 2. 代码与数据架构

### 工作区根目录

```
C:\Users\15319\inktoys-landing\
```

### 当前数据规模（2026-04-30 节点）

| 数据摊 | 条目数 | 说明 |
|---|---|---|
| `src/lib/data/tools.ts` | **92** | 阶段 2 拼装完毕 |
| `src/lib/data/engines.ts` | 25 | 已 audited |
| `src/lib/data/cases.ts` | **14** | 4 + 10 milestone 论文 |
| `src/lib/data/news.ts` | **58** | 49 + 9 Radiance Fields 第五批 |
| `src/lib/data/insights.ts` | **6** | Batch 5 新增独立 `/insights` 摊 |
| `src/lib/data/glossary.ts` | **79** | Batch 5 增厚 10 条；数量不变 |
| `src/lib/data/learning-paths.ts` | **4 条满血路径 / 共 26 模块** | B1 完成 |
| `src/lib/data/learning-articles.ts` | **11 条延伸笔记** | 9 条 fork + 2 条 Radiance Fields 教程 |
| `src/lib/data/gallery.ts` | 20 | 用户 SuperSplat 作品 |
| `src/lib/seo-metadata.ts` | 站点级 metadata helper | 夜班 C 块新建（metadataBase 暂设 `https://inktoys.cn`，待用户确认） |
| `src/lib/taxonomy.ts` | spaceTypes ×12 | 阶段 A 新增 5（education/event/performance/real_estate/park） |

**累计 323 条数据条目入库**（含 4 路径 + 11 文章 + 58 news + 6 insights + 79 glossary + ...）/ build 全绿光（69 静态路由稳定）。

### 关键目录

```
inktoys-landing/
├── src/
│   ├── app/                  # Next.js App Router 路由
│   │   ├── page.tsx          # 主页（社群型）
│   │   ├── about/            # 品牌叙事页（已稳定，禁动）
│   │   ├── learn/            # 学习路径
│   │   │   └── articles/     # 延伸笔记（11 条）
│   │   ├── tools/            # 工具表（92 条）
│   │   │   └── engines/      # 引擎兼容矩阵
│   │   ├── cases/            # milestone（14 条）
│   │   ├── gallery/          # 用户 SuperSplat 作品集（20 条）
│   │   ├── news/             # 动态（58 条）
│   │   └── insights/         # 行业洞察（6 条）
│   ├── components/landing/   # 主要展示组件
│   ├── lib/
│   │   ├── taxonomy.ts       # 全局 ID 字典
│   │   └── data/             # 见上表
└── knowledge-base/           # AUTO/YouMind 工作目录（不进 src 构建）
    ├── README.md
    ├── AUTO-WORKFLOW.md
    ├── ROUTING.md
    ├── STATUS.md             # ← 你正在读这份
    ├── TASK-XX-*.md          # 各批次 brief
    ├── templates/            # markdown 模板
    └── sources/
        ├── tools/            # 89 snippet 已入库（_pending_glossary_from_tools/ 暂存 3 条）
        ├── engines/          # 25 md
        ├── glossary/         # 25 第三批已入库
        ├── cases/            # 12 已入库
        ├── news/             # 25 已入库
        ├── research/         # AUTO-2 行业洞察草稿（待决定路由）
        ├── _audit/           # 审计报告 + 拼装脚本
        └── _inbox/
            ├── unzipped/         # docx1 旧版 256 张图
            ├── unzipped-2/       # docx2 旧版 96 张图
            ├── transcribed/      # Gemini batch-01~04（120 张图，存档参考）
            └── transcribed-v2/   # （留待 AUTO 重做 256 张图，prompt 已设计但暂未跑）
```

### Schema 关键字段（必须严格对齐）

详见各 `src/lib/data/<摊>.ts` 文件顶部 type 定义。

### taxonomy 已定义的 ID（必须从这里选，不能编新）

- `tags`: capture / training / editing / viewing / publishing / web_rendering / slam / spatial_media / paper / case_study / interview / tutorial / real_time / optimization / generation / dynamic / avatar / semantic / surface / compression / reconstruction / dataset / cultural_heritage / indoor / outdoor
- `spaceTypes`: heritage / art_gallery / medical_aesthetics / retail / indoor_living / urban_outdoor / natural_landscape / **education / event / performance / real_estate / park**（后五个为阶段 A 新增）
- `levels`: beginner / intermediate / expert
- `ToolDiscoverySource`: radiance-fields / supersplat / reddit / x-twitter / china-zone / japan-korea-zone / user-feedback / user-workflow / manual
- `ToolRegion`: global / china / japan / korea / europe / north-america / other

---

## 3. 阶段进度

| 阶段 | 状态 | 内容 |
|---|---|---|
| **阶段 1（拓扑搭建）** | ✅ 完成 | 站内路由 / 数据 schema / taxonomy 地基 |
| **阶段 2（数据扩充）** | ✅ 完成 | 6 个 AUTO 窗口跑工具表 / milestone / news / glossary 第三批 |
| **阶段 A（拼装入库）** | ✅ 完成 | 4 摊 snippet 全部入库 + build 通过 |
| **阶段 B（金矿提炼 / 学习路径上线）** | ✅ 完成 | ✅ B1 learning-paths（4 路径 × 26 模块）+ learning-articles（11）+ B2 `/insights`（6）+ B3/B5 news（58）+ glossary 增厚 |
| **阶段 C（站内增强 / UI 升级）** | 🟡 部分完成 | ✅ SEO metadata（站级 + 多页对齐）+ region chip（/tools 区域多选）完成；剩余：og 图 / metadataBase 域名确认 / 工具表分组等视觉打磨 |

---

## 4. 阶段 A 完成详情（2026-04-29 ~ 04-30）

| 摊 | 之前 | 现在 | 变化 |
|---|---|---|---|
| tools.ts | 18 | 92 | +74 新 / 9 升级 / drop 3 / 暂存 glossary 3 |
| cases.ts | 4 | 14 | +10 milestone |
| news.ts | 37 | 37 | 早已入库（STATUS.md 之前滞后） |
| glossary.ts | 53 | 78 | +25 第三批 |
| taxonomy spaceTypes | 7 | 12 | +5（education / event / performance / real_estate / park） |

**拼装脚本**：`knowledge-base/sources/_audit/assemble-{tools,cases,glossary}.mjs`（可复跑）  
**审计报告**：`knowledge-base/sources/_audit/audit-tools-2026-04-30.md` 等

**3 条暂存 glossary**（_pending_glossary_from_tools/）：3dgs-mcmc / ply-format / spz-format —— 原 tool schema 写的，留给 glossary 第四批专项重构。

---

## 5. AUTO 任务历史与产出

### 已完成
| AUTO 任务 | 产出 | 状态 |
|---|---|---|
| 6 个阶段 2 窗口（tools/cases/news/glossary） | 151 个 snippet | ✅ 全入库 |
| AUTO-1 四摊审计 | `audit-tools-2026-04-30.md` 等 | ✅ tools 完成；cases/news/glossary 未跑（实际证明 news/glossary 已入库无需审计） |
| AUTO-2 行业洞察文章 | `sources/research/industry-laser-vs-visual-2026-04.md` | ✅ 草稿就绪，待决定路由 |
| AUTO 夜班 1（印象笔记 fork） | 9 条 learning-articles + 新路由 /learn/articles/[slug] / `AUTO-NIGHT-2026-04-30-fork-report.md` | ✅ 11 处 yinxiang 链接清零；2 篇 verified=false（光线与清晰度 / 点映套餐）待补硬源 |
| AUTO 夜班 2（4 块批跑） | A glossary +1 / B news +12 / C SEO 站级 / D region chip / `AUTO-NIGHT-2026-04-30-report.md` | ✅ 全 4 块绿光通过；3 处遗留待人工决策（见 §7） |
| Claude Batch 5（Radiance Fields） | news +9 / `/insights` +6 / articles +2 / glossary 增厚 10 条 / `BATCH5-REPORT-2026-04-30.md` | ✅ 4 块全部 build 绿光 |

### 当前状态（2026-04-30 10:42）
- Claude 已接手网站开发工作，Batch 5 已完成并写入 `knowledge-base/BATCH5-REPORT-2026-04-30.md`
- 项目处于「数据 323 条 / 69 路由 / build 全绿」的稳定快照
- 新增源素材两份（用户私域整理）：
  - `C:\Users\15319\Downloads\Radiance Fields 完整知识库.md`（83 KB / radiancefields.com 抓取）
  - `C:\Users\15319\Downloads\Radiance Fields YouTube 频道热门视频完整转录.md`（74 KB / @RadianceFields YouTube 频道 10 视频）

---

## 6. 印象笔记 / YouMind 转录素材现状

| 来源 | 体量 | 内容性质 | 已用途径 |
|---|---|---|---|
| YouMind 转录 | 60.9 KB / 1075 行 | 印象笔记主目录 + 第一/二/三/四章（含原始 fx URL） | learning-paths（B1）+ learning-articles fork 9 条；夜班 4 块第三章 → news 补条 |
| Gemini batch-01~04 | 258 KB / 4164 行 | 120 张图 OCR | 行业洞察专题（B2）+ learning-paths 补充 |
| 桌面 docx 256 张原图 | 51.2 + 51.8 MB | 原始截图（YouMind / Gemini 已大致覆盖文字部分） | 暂搁（性价比下降，AUTO docx OCR prompt 已设计但未跑） |

**站外链接清理（2026-04-30 01:30）**：项目源码内 `app.yinxiang.com` 与「印象笔记」字符串命中数为 0；所有原始 fx 链接的内容已 fork 进 `/learn/articles/[slug]` 或 drop（仅「采集教程总目录」一条 drop，因原页是目录跳转）。

---

## 7. 当前阻塞点（2026-04-30 10:30）

| # | 事项 | 等谁 |
|---|---|---|
| 1 | 🟡 SEO metadataBase 域名 `https://inktoys.cn` | 暂搁（用户尚未申请域名，待申请后再批量替换） |
| 2 | 🟡 `og-default.png` 与 openGraph images | 本轮接管处理中 |
| 3 | 🟡 verified=false 条目 | 本轮接管处理中，需补硬源或明确降级 |
| 4 | 🟡 `/tools` 分组与筛选体验 | 本轮接管处理中 |
| 5 | 🟡 `/glossary` 独立路由 | 本轮接管处理中 |
| 6 | 🟡 桌面 docx 256 张完整 OCR | 暂搁（性价比下降） |

---

## 8. 给新会话的下一步动作清单

按优先级（同步用户决策 + 可立即推进的工程任务）：

### 用户已决策（2026-04-30 10:23）

1. ✅ **B2 路由：B 独立 /insights**（新建 `src/lib/data/insights.ts` + `src/app/insights/[slug]/page.tsx`）
2. 🟡 **metadataBase 域名**：暂搁，等用户申请到正式域名后批量替换；当前 `https://inktoys.cn` 占位

### 当前主任务

3. **接管待办实施**：同步 STATUS / SEO OG / verified=false 审计 / `/insights` 打磨 / `/tools` 分组 / `/learn` 补强 / `/glossary` 独立路由 / 内容路线图。

### 后续工程可推进项

4. **域名落地**：用户申请到域名后，全站 metadataBase 替换
5. **真实商用案例扩容**：补教育、文旅、房地产、展览、企业空间等案例
6. **硬件与时间线专题**：评估 `/gear`、`/timeline` 是否进入下一阶段

### 已完成里程碑（按时间倒序）

- 2026-04-30 02:00 AUTO 夜班 2（4 块）→ news +12 / glossary +1 / SEO 站级 / region chip
- 2026-04-30 01:30 AUTO 夜班 1（印象笔记 fork）→ 9 条 learning-articles + 新路由
- 2026-04-30 00:46 B1 learning-paths → 4 路径 × 26 模块
- 2026-04-30 阶段 A → 4 摊 snippet 全部入库（tools 92 / cases 14 / glossary 78 / news 37）

### 不要做的事

- 不要主动创建新文档 / 不要写 .md 总结报告除非用户要
- 不要把商业品牌名也隐去（KIRI / 点映 / 知天下 / 元象等可保留）
- 不要用 cmd 语法（PowerShell only）；不要用 echo / sed / awk 等 unix 工具
- 不要逐条 Read snippet，用脚本批量处理省 token
- **不要在站内引用 app.yinxiang.com**（已全清零，新内容也别引）

---

## 9. 用户偏好

- 中文回复（user_rules 设置）
- 给操作选项让用户挑（A/B/C 选项）而不是一刀切决定
- 重大改动前先简述 + 让用户确认，避免越权
- 信息以表格 / 清单组织优先；避免长段落
- API 模式注意省 token——脚本批处理优先于多次 Read/Edit

---

**STATUS.md 维护规则**：每次重大进度（如阶段完成 / 大批入库 / 路由改动）后更新这份文件。让 STATUS.md 永远反映「最新且最少」的项目快照。
