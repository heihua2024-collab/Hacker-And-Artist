# TASK-05 · News 板块扩充批次 2

**目标**：当前 `news.ts` 只有 12 条（首批 Gemini 调研，时间窗 2025-10 ~ 2026-04）。本批次扩充 15 条新的，**严禁与已有 12 条重复**。

**为什么交给 Auto**：news 类内容的"新鲜度核查"是 Auto 的强项（搜索 + 抓发布日期），且每条字段都比 tool / case 简单。

---

## A. 数量与分布要求

本批次产出 **15 条**，按 category 分布：

| category | 目标数量 | 说明 |
|---|---|---|
| `paper` | 4 条 | 2025 年 11 月 ~ 2026 年 4 月 arXiv 上发表的 3DGS 相关论文（不含 TASK-04 已涵盖的 12 条 milestone） |
| `tool` | 4 条 | 工具发布/更新公告 |
| `industry` | 3 条 | 行业资本/合作/标准化等 |
| `community` | 2 条 | 社区活动/赛事/教程发布 |
| `art` | 2 条 | 艺术家用 3DGS 完成的展览/装置/作品 |

---

## B. 已有的 12 条（不要重复）

请阅读 `src/lib/data/news.ts` 末尾的 `news` 数组，找出已有的 12 条 id（如 `ng-gs-segmentation` 等）。本批次 id 必须**全部**是新值。

---

## C. NewsItem schema（已存在的 TS 类型）

参见 `src/lib/data/news.ts` 第 20-34 行。

```typescript
{
  id: "<kebab-case-唯一-id>",
  title: { zh: "...", en: "..." },               // 中文≤30字，英文≤80字符
  summary: { zh: "...", en: "..." },             // 中文 50-100 字，英文 100-200 字符
  category: "paper" | "tool" | "industry" | "community" | "art",
  tags: ["paper", "optimization"],               // 从已有 TagId 中选 2-3 个
  level: "beginner" | "intermediate" | "expert" | null,
  source: { name: "<媒体或网站名>", type: "blog" | "paper" | "media" | "github" | "video" | "podcast" | "course" },
  sourceUrl: "<原始链接>",
  coverUrl: null,                                // 全部填 null
  publishedAt: "YYYY-MM-DD",                     // 严格 ISO 日期
  editorialNote: { zh: "...", en: "..." },       // 编辑评论：50-100 字，说明这条新闻为什么值得关注
  verified: true,
  sources: ["<原链接>", "<交叉验证链接 ≥ 1>"],
},
```

---

## D. 时间窗硬约束

**publishedAt 必须落在 2025-11-01 到 2026-04-29 之间**。这是为了：
1. 与已有 12 条（2025-10 起）形成连续覆盖
2. 避免抓到太老的内容（用户已知）

如某条新闻明显有价值但日期超出此窗，**不要硬塞**，在自检报告中提出"建议放入下一批早期/晚期补抓"。

---

## E. editorialNote 客观化要求

`editorialNote` 是面向读者的"为什么读这条"提示，避免：
- ❌ "这是一篇必读论文"（主观推荐）
- ❌ "颠覆性突破"（营销话术）
- ❌ "国内最强成果"（地域吹捧）

正确写法：
- ✅ "首次将训练时间压缩到 GTX 1660 也可运行（论文 Table 3）"
- ✅ "Polycam 此版本起官方支持 SPZ 格式导出，跨工具迁移阻力降低"
- ✅ "面向初学者的中文系列教程，含数据集与训练脚本"

---

## F. 输出位置

每条产出 1 个文件：

```
knowledge-base/sources/news/<id>.md
knowledge-base/sources/news/<id>.ts.snippet
```

**注意**：是 `sources/news/`，如目录不存在请创建。

---

## G. 反幻觉硬规则

1. **publishedAt 必须 verbatim 从原文页面或 arXiv 提交日期获取**，不要"估计"
2. **sources 必须 ≥ 2 条**（原链接 + 至少一条独立交叉验证，可以是 X 推文、Reddit 帖子、其他媒体报道）
3. **如果只能找到一条来源**：放进 .md 但**不产出 .ts.snippet**，并在 .md notes 写"sources 仅 1 条，待 Opus 审核是否补抓"
4. **`paper` 类必须有 arXiv URL 作为 sources 之一**
5. **`industry` 类不要采信公司自家 PR**：必须有第三方媒体报道交叉验证

---

## H. TS 字符串硬约束

复用 TASK-03-tools-stage-2.md 的 C 节：中文字符串内禁用英文 `"` `'` `` ` `` `\`，英文用 `\"` 转义。

---

## I. 完成报告

完成 15 条后回复：
1. 完成数 __ / 15（按 category 分类计数）
2. publishedAt 全部落在 2025-11-01 ~ 2026-04-29 内：是 / 否
3. 与已有 12 条无重复（id 不冲突 + sourceUrl 不重复）：是 / 否
4. 字符串自检通过：是 / 否
5. 是否在抓取过程发现"特别值得关注但超出时间窗"的新闻？如有列出 1-3 条由 Opus 决定

## 开始执行

按 category 顺序：先 paper (4) → tool (4) → industry (3) → community (2) → art (2)。
