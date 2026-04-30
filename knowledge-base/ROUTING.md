# 知识库 → 网站数据 → UI 路由表

每一类内容从抓取到上线的完整路径。

| type | 知识库路径 | 数据文件 | UI 组件 | 路由 | 当前状态 |
|---|---|---|---|---|---|
| glossary | sources/glossary/ → structured/glossary/ | src/lib/data/glossary.ts | GlossaryExplorer.tsx | /learn (内嵌) | ⚠️ 已有 30 条 Gemini 版，待校验 |
| tool | sources/tools/ → structured/tools/ | src/lib/data/tools.ts | ToolsExplorer.tsx | /tools | ⚠️ 已有 18 条 Gemini 版，待校验 |
| news | sources/news/ → structured/news/ | src/lib/data/news.ts | NewsExplorer.tsx | /news | 🚨 12 条 Gemini 版，待全部下架重审 |
| paper | sources/research/ → structured/research/ | src/lib/data/research.ts | ResearchExplorer.tsx | /research | ❌ 未建 |
| tutorial | sources/tutorials/ → structured/tutorials/ | src/lib/data/tutorials.ts | TutorialsExplorer.tsx | /learn (内嵌) | ❌ 未建 |
| learning-path | sources/learning-paths/ → structured/learning-paths/ | src/lib/data/learning-paths.ts | LearningPathDetail.tsx | /learn/[slug] | ✅ 1 条 live |
| case | sources/cases/ → structured/cases/ | src/lib/data/cases.ts | CasesIndex.tsx | /cases | ✅ 4 条 milestone |
| splat-work | （直接由作者本人提供） | src/lib/data/gallery.ts | GalleryIndex.tsx | /gallery | ✅ 20 条 |
| engine-support | sources/engines/ → structured/engines/ | src/lib/data/engines.ts | EngineSupport.tsx | /tools/engines | ❌ 未建 |
| timeline-event | sources/timeline/ → structured/timeline/ | src/lib/data/timeline.ts | Timeline.tsx | /timeline | ❌ 未建 |
| gear | sources/gear/ → structured/gear/ | src/lib/data/gear.ts | GearGuide.tsx | /gear | ❌ 未建 |

---

## 60% 静态基建优先级清单

按"影响力 / 工作量"比，**第一阶段（4-6 周）**应优先做完这 8 块：

| # | 任务 | 类型 | 体量 | 模型分工 |
|---|---|---|---|---|
| 1 | Engine Support 表格 | engine-support | 20-30 条 | Auto 收集 / Opus 上线 |
| 2 | Glossary 升级（已有 30 条加来源） | glossary | 30 条校验 | Auto 找来源 / 人工校验 / Opus 转换 |
| 3 | Timeline（2023-2026 关键事件） | timeline-event | 30-50 条 | Auto 收集 / 人工排序 / Opus 上线 |
| 4 | Tools 升级（已有 18 条加来源） | tool | 18 条校验 + 补充中国本土工具 | Auto / 人工 / Opus |
| 5 | Getting Started 完整入门 | tutorial | 5-8 篇 | 人工写 / Opus 排版 |
| 6 | Research 论文索引 | paper | 30-50 条 | Auto 抓 arXiv / Opus 上线 |
| 7 | Buyers Guide / Gear | gear | 15-25 条 | Auto / 人工 / Opus |
| 8 | News 重审 + 重启 | news | 全部下架 + 重建机制 | Opus 重做数据契约 |

每完成 1 项 → 网站可独立发布一次。

---

## 数据契约：从 .md 到 .ts

每个 type 都有一个对应的 TS schema 在 `src/lib/data/`，例如：

```ts
// 对应 type: glossary
export type GlossaryEntry = {
  slug: string;
  term: { zh: string; en: string };
  category: GlossaryCategoryId;
  ...
  // 反幻觉字段
  source: string | null;       // 主要来源 URL
  verified: boolean;           // 是否人工核验过
  capturedAt: string;          // 抓取日期
}
```

转换路径：

```
.md (frontmatter) → JSON (parser script) → TS literal (写入 .ts)
```

转换脚本由 Opus 维护在 `scripts/kb-to-ts.ts`（暂未建，等首批 Engine Support 跑通后再写）。

---

## 一条内容上线前的 checklist

- [ ] 在 `structured/` 有对应 .md
- [ ] frontmatter `verification: verified`
- [ ] `verified-by` 写了人名
- [ ] `source-url` 是真实可访问的（curl -I 200）
- [ ] `quote` 字段有 30-60 字原文摘录
- [ ] 至少 2 条 sources
- [ ] 目标 .ts 已加入这条记录
- [ ] UI 上能看到该条目
- [ ] UI 显示了来源链接（点击可达）
