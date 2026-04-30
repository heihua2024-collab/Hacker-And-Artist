---
# AUTO 夜班 2026-04-30 · 印象笔记 fork 战果

## 1. 总进度
- 总目标：11 处印象笔记引用清零
- 实际：fork 成功 9 篇 / drop 1 篇 / 替换公开外链 0 处（路径 02 sources 中 yinxiang 条目已删除，未改为其他外链）
- src/ 下「app.yinxiang.com」最终命中数：0
- src/ 下「印象笔记」最终命中数：0

## 2. 文章逐篇情况
| slug | 状态 | sources 数 | 关联路径/模块 | 备注 |
|---|---|---|---|---|
| shooting-light-and-sharpness | ✅ | 2 | capture-and-training / 01 | 原「光线与清晰度」转录缺失；按路径大纲 + COLMAP / Wikipedia SfM 重写；正文含 [unverified]；verified=false |
| first-capture-essentials | ✅ | 2 | capture-and-training / 01 | 依据 youmind 2.3 + B 站教程链接 |
| capture-tutorial-overview | drop | — | — | 原页仅为目录跳转；未建 slug；module 02 删除该条 resource；路径 02 sources 删除同 URL |
| object-video-capture | ✅ | 2 | capture-and-training / 03 | youmind 2.4 |
| object-photo-capture | ✅ | 2 | capture-and-training / 04 | youmind 2.5；Adobe 帮助页为公开文档 |
| action-cam-large-space | ✅ | 2 | capture-and-training / 05 | youmind 2.6 |
| local-training-validation | ✅ | 2 | capture-and-training / 06 | youmind 2.8；RC 官网 + Brush |
| pointcosm-cloud-plans | ✅ | 2 | capture-and-training / 07 | youmind 2.9；价目以 [unverified] 标注；verified=false |
| supersplat-cheat-sheet | ✅ | 2 | capture-and-training / 08 | 原印象笔记子页转录失败；按 superspl.at + GitHub 公开信息整理 |
| sog-format-explained | ✅ | 2 | web-viewing-interaction / 04 | youmind 4.1 |

## 3. 基础设施改动
- 新建 `src/lib/data/learning-articles.ts`
- 新建 `src/app/learn/articles/[slug]/page.tsx`
- 新建 `src/components/landing/LearningArticleDetail.tsx`
- 修改 `src/app/learn/page.tsx`（引入 `learningArticles` 并传入 `LearnHub`）
- 修改 `src/components/landing/LearnHub.tsx`（接收 `articles`；在四张路径卡片后渲染「延伸笔记」区）
- 修改 `src/lib/data/learning-paths.ts`（11 处 yinxiang 清零：9 处改为站内 `/learn/articles/...`，1 处 module 资源删除，1 处路径 sources 删除）
- 修改 `src/components/landing/LearningPathDetail.tsx`（resources：`/` 开头走 `Link`，外链保持 `target=_blank`）

## 4. build 结果
（最后一次 `npm run build` 路由摘要）

```
Route (app)
├ ○ /learn
├ ● /learn/[slug]
│ ├ /learn/understand-gaussian-splatting
│ ├ /learn/capture-and-training
│ ├ /learn/web-viewing-interaction
│ └ /learn/spatial-narrative-experiments
├ ● /learn/articles/[slug]
│ ├ /learn/articles/shooting-light-and-sharpness
│ ├ /learn/articles/first-capture-essentials
│ ├ /learn/articles/object-video-capture
│ └ [+6 more paths]
```

TypeScript 与静态生成均通过（Next.js 16.2.4）。

## 5. 跳过 / drop / 决策留给 Opus
- 「采集教程总目录」未 fork；路径 02 module 02 现仅保留 Scaniverse、Luma 两条 tool 外链；路径 02 `sources` 已去掉原 yinxiang 条目，保留 Inria 论文与 splat-transform。
- 「光线与清晰度」原链在转录中超时无正文；站内文为工程化重写，若需与视频完全一致可后续补官方脚本或 B 站时间戳。
- 「点映套餐」具体单价与档位以官网为准；当前文保留 [unverified] 与 verified=false。

## 6. 全部 git 风格修改清单
- `src/lib/data/learning-articles.ts`
- `src/app/learn/articles/[slug]/page.tsx`
- `src/components/landing/LearningArticleDetail.tsx`
- `src/app/learn/page.tsx`
- `src/components/landing/LearnHub.tsx`
- `src/lib/data/learning-paths.ts`
- `src/components/landing/LearningPathDetail.tsx`
- `knowledge-base/AUTO-NIGHT-2026-04-30-fork-report.md`
---
