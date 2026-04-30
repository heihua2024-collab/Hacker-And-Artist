# TASK-03 工具表扩充 · 阶段 2（详细抓取 + 自产 TS snippet）

**前提**：阶段 1（候选池）已完成 6 轨共 151 条候选，Opus 已审核并按 keep / drop / merge 输出筛选清单。

**阶段 2 目标**：对每条 keep 工具产出两份输出 ——
1. `<slug>.md` —— 人类可读的完整版（保留所有 verbatim 引文与原始来源）
2. `<slug>.ts.snippet` —— **可直接粘贴到 `src/lib/data/tools.ts` 的 TypeScript 对象代码**

**为什么强制要求 .ts.snippet**：上一阶段 Opus 转录 22 条术语花了大量 API token，这次让 Auto 直接产出可粘贴的 TS 代码片段，把"转录 + 字段映射 + 类型对齐"全部留给 Auto，Opus 只做抽样核对。

---

## A. Tool Schema 字段清单（24 个字段，必填顺序固定）

`<slug>.ts.snippet` 必须按以下顺序输出每个字段。**字段顺序固定**，便于 Opus 后续 cat 拼接。

```typescript
{
  name: "<工具名>",
  slug: "<slug>",
  category: "<capture|training|editing|viewing|publishing>",
  logoUrl: "<URL 或 null>",
  homepageUrl: "<官网 URL>",
  repoUrl: "<GitHub repo URL 或 null>",
  tagline: {
    zh: "<阶段 1 的 one-liner-zh>",
    en: "<阶段 1 的 one-liner-en>",
  },
  description: {
    zh: "<150-300 字中文，客观功能描述>",
    en: "<100-200 字英文，客观功能描述>",
  },
  platforms: [/* iOS | Android | Web | Windows | macOS | Linux 多选 */],
  pricing: "<free|freemium|subscription|one-time|enterprise>",
  priceNote: "<具体价格备注，如「Pro $20/月」；不明确写 null>",
  openSource: <true|false>,
  license: "<如 MIT, Apache-2.0, Proprietary，或 null>",
  level: "<beginner|intermediate|expert>",
  pros: [
    { zh: "<客观功能 1>", en: "<objective feature 1>" },
    { zh: "<客观功能 2>", en: "<objective feature 2>" },
    /* 3-5 条 */
  ],
  cons: [
    { zh: "<客观限制 1>", en: "<objective limitation 1>" },
    /* 2-4 条 */
  ],
  useCases: [/* taxonomy.ts SpaceTypeId 中选 */],
  tags: [/* taxonomy.ts TagId 中选 */],
  lastVerifiedAt: "2026-04-29",
  verified: true,
  sources: [/* 至少 2 条 URL */],

  // ===== 第二期新字段 =====
  vendor: "<厂商名 或 null>",
  region: "<global|china|japan|korea|europe|north-america|other>",
  evidenceQuote: "<阶段 1 的 evidence-quote, verbatim>",
  freshnessCheckedAt: "2026-04-29",
  freshnessSignal: "<阶段 1 的 freshness-signal>",
  discoverySource: "<radiance-fields|supersplat|reddit|x-twitter|china-zone|japan-korea-zone>",
},
```

---

## B. 客观评价硬约束（重点）

`pros` 和 `cons` 字段是这次最容易踩坑的地方。Opus 选择了"客观化"路线：

### ✅ 允许的 pros 写法

- "支持导出 PLY、SPZ、KSPLAT 三种格式"
- "iOS App Store 4.7 星，下载量 100K+"（**带数据**）
- "免费版每月可处理 5 个场景"
- "训练时间在 RTX 4090 上约 30 分钟"

### ❌ 禁止的 pros 写法

- "界面优雅" — **主观审美**
- "上手简单" — **主观判断**
- "性能优秀" — **没数据**
- "比 Polycam 强" — **比较他人**
- "国内最好的产品" — **营销话术**

### ✅ 允许的 cons 写法

- "仅 Windows 版本，macOS 不支持"
- "GitHub 最近 6 个月无 commit"
- "免费版水印不可去除"
- "训练超过 200 张图需要订阅"

### ❌ 禁止的 cons 写法

- "操作复杂" — **主观**
- "学习曲线陡峭" — **主观**
- "不够流畅" — **没数据**

**核心原则**：每条 pros / cons 都应该是**可验证的事实陈述**，不是观感。

---

## C. TypeScript 字符串硬约束（避免 build 失败）

上次 Opus 转录术语时，因为中文里混入了英文直引号 `"..."` 导致 TS 解析错误。**这次 Auto 直接产出 TS 代码，必须严格遵守**：

### 禁用字符（写在中文字符串里时）

| 禁用 | 替代 |
|---|---|
| `"..."`（英文直引号） | `「...」` 或 `（...）` |
| `'...'`（英文单引号） | `「...」` |
| `` `...` ``（反引号） | `「...」` |
| `\`（单个反斜杠） | 整个去掉，重写表达 |
| `${...}`（模板字符串插值） | 改用字符串拼接 `+` |

### 正确写法示例

```typescript
description: {
  zh: "Polycam 的标语是「捕捉真实世界」，由旧金山团队开发。",  // ✅
  en: "Polycam markets itself with the slogan \"capture reality\".",  // ✅ 英文里 \" 是合法的转义
},
```

### 错误写法示例

```typescript
description: {
  zh: "Polycam 的标语是"捕捉真实世界"，由旧金山团队开发。",  // ❌ 中文里夹了英文直引号
},
```

### 输出前自检步骤

每生成一个 `.ts.snippet` 后，Auto 必须自检：
1. 复制完整内容到自己的"虚拟 TypeScript 解析器"思路里跑一遍
2. 检查每个字符串字面量内部有没有未转义的英文 `"` `'` `` ` `` `\` `${`
3. 确认所有逗号、括号、花括号匹配

---

## D. taxonomy.ts 已有 ID 清单（useCases / tags 必须从这里选）

以下 ID 是**唯一允许值**。不能编造新 ID。

### SpaceTypeId（用于 useCases 字段）

```
heritage           # 文化遗产
art_gallery        # 艺术画廊
medical_aesthetics # 医疗美容
retail             # 零售空间
real_estate        # 房地产
performance        # 演出展览
park               # 公园景区
education          # 教育空间
event              # 活动现场
```

### TagId（用于 tags 字段，常见的）

```
capture       # 采集
training      # 训练
editing       # 编辑
viewing       # 查看
publishing    # 发布
mobile        # 移动端
web           # 网页端
desktop       # 桌面端
opensource    # 开源
commercial    # 商业
freemium      # 免费增值
optimization  # 优化
paper         # 论文
cultural_heritage  # 文化遗产
```

如有不确定的标签，**留空（空数组 `[]`）**，不要硬塞。Opus 会在审核时补全。

---

## E. 输出位置

每条工具产出两个文件：

```
knowledge-base/sources/tools/<slug>.md
knowledge-base/sources/tools/<slug>.ts.snippet
```

**注意**：阶段 1 的候选池在 `_stage-1/` 子目录；阶段 2 直接放到 `tools/` 根目录（与之前已有的 markdown 同级）。

---

## F. 自检报告（每个轨道完成时输出）

每个轨道窗口完成全部 keep 工具后，回复一份自检报告：

1. **完成数**：__ / __ 条（应等于该轨道 keep 列表的长度）
2. **TS 字符串自检通过率**：每条 .ts.snippet 是否都通过 D 节自检步骤？是 / 否（如否，列出例外）
3. **客观评价合规率**：pros / cons 是否都是可验证事实陈述？是 / 否
4. **logoUrl / repoUrl 缺失数**：__ 条（这两个字段允许 null，但要明确）
5. **license / openSource 不确定数**：__ 条（标 [unverified]）
6. **跨轨重复发现**：是否在抓取过程中发现"该工具应该归属另一个轨道"？如有，列出 slug + 建议归属

---

## G. 反幻觉硬规则

1. **每个 .md 必须有 ≥ 2 条 sources**（官网 + GitHub/文档/新闻交叉验证）
2. **evidenceQuote 必须 verbatim**——不允许翻译改写
3. **pricing 不确定时**：宁可写 `freemium` 然后 priceNote 标 `[需进一步核实]`，也不要瞎猜
4. **如果工具页面访问失败**：在 .md 末尾的 `notes` 写明，并降级处理（部分字段标 [unverified]），**不要编造内容**
5. **`license` 字段**：如果不是开源项目，统一写 `"Proprietary"`；如果是开源但找不到 LICENSE 文件，写 `null` 并标 [unverified]

---

## H. 阶段 2 不在范围内的事

- 写 UI 组件 / 改 tools.ts schema → Opus 做
- 跨轨道合并 / 全局去重 → Opus 做（已经在阶段 1 审核中完成）
- 决定哪些工具进 cases.ts 而非 tools.ts → Opus 做

Auto 只需要：**对该轨道 keep 列表里每条工具，产出 .md + .ts.snippet 两个文件**。
