# 印刻万物知识库 / Inktoys Knowledge Base

这个目录是「印刻万物」网站的真相源（source of truth）。
每一条上线到 `src/lib/data/*.ts` 的内容，都必须先有一份对应的 `.md` 在这里，可追溯、可审计、可校核。

---

## 目录约定

```
knowledge-base/
├── README.md              这份文档
├── ROUTING.md             知识库 → 网站数据 → UI 的转换规则
├── AUTO-WORKFLOW.md       给 Auto 模型的协作约定（Auto 跑任务前必读）
├── templates/             所有 .md 文件的标准模板
├── sources/               原始抓取（每条来源一份 .md，包含原文/截取）
├── structured/            人工/AI 整理后的可信版本（可直接转 TS）
├── pending-review/        Auto 跑完待人工审核的文件
└── archived/              已弃用/已驳回的文件（不删，保留 git 历史）
```

---

## 一条内容的生命周期

```
1. Auto 模型抓取原文     → sources/<slug>.md            (verification: pending)
2. 人工 / Opus 校验      → structured/<type>/<slug>.md  (verification: verified)
3. 自动转换脚本          → src/lib/data/<type>.ts        (上线)
4. UI 渲染时显示来源     → 网站读取 verified 字段决定展示
```

任何一条 `verified: pending` 或 `verified: rejected` 的内容**绝不能上线**。
这是在 Gemini 翻车之后定下的铁律。

---

## 内容类型（type）枚举

| type | 含义 | 对应数据文件 | 网站板块 |
|---|---|---|---|
| `glossary` | 术语 | src/lib/data/glossary.ts | /learn 术语区 |
| `tool` | 工具 | src/lib/data/tools.ts | /tools |
| `news` | 新闻动态 | src/lib/data/news.ts | /news |
| `paper` | 论文 / 研究 | src/lib/data/research.ts （待建） | /research（待建） |
| `tutorial` | 教程 | src/lib/data/tutorials.ts （待建） | /learn |
| `learning-path` | 学习路径 | src/lib/data/learning-paths.ts | /learn |
| `case` | 行业案例 | src/lib/data/cases.ts | /cases (=研究里程碑) |
| `splat-work` | 自有作品 | src/lib/data/gallery.ts | /gallery |
| `engine-support` | 软件兼容性 | src/lib/data/engine-support.ts （待建） | /tools/engines（待建） |
| `timeline-event` | 时间线事件 | src/lib/data/timeline.ts （待建） | /timeline（待建） |
| `gear` | 设备/硬件 | src/lib/data/gear.ts （待建） | /gear（待建） |

---

## 规则（铁律）

1. **每个 .md 必须有完整 front-matter**——见 `templates/source-template.md`
2. **来源 URL 必须是公开可访问的**——抓取者必须实际打开过
3. **不允许编造任何字段**——找不到信息就写 `null`，宁可缺也不假
4. **双语字段（zh/en）**——zh 为主，en 可后补，但都不能凭空翻译技术术语
5. **任何"verified: verified"必须由人工签字**——Auto/Opus 不允许给自己盖章

---

## 工作分工

| 工种 | 用什么模型 | 做什么 |
|---|---|---|
| 内容抓取 / 翻译 / 整理 | Cursor Auto + Composer | 把公开网络上的资料按模板填进 `sources/` |
| 建站 / 数据契约 / 校验 / UI | API Claude (Opus) | 把 `structured/` 转成 TS、设计 UI、维护数据契约 |
| 可信度判定 / 解读视角 / 拍板 | 人 | 决定哪些上线、解读怎么写、品牌口吻 |
