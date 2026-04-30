---
# === 通用必填 ===
slug: kebab-case-name              # URL 友好的英文短名
type: tool                         # glossary | tool | news | paper | tutorial | learning-path | case | engine-support | timeline-event | gear
title-zh: 中文标题                   # 必填，中文
title-en: English Title             # 必填，英文

# === 来源与抓取 ===
source-url: https://...            # 必填，你打开过的官方/权威页
source-author: 原作者/原机构          # 可填 null
captured-at: 2026-04-29            # YYYY-MM-DD，必填
captured-by: auto                  # auto | <人名>
language: en                       # 原文主要语言

# === 校验 ===
verification: pending              # pending | verified | rejected | partial （Auto 只允许写 pending）
verified-by: null                  # 校验人姓名
verified-at: null                  # YYYY-MM-DD

# === 反幻觉机制 ===
quote-en: |                        # 必填，原文摘录 30-60 字，逐字
  Verbatim quote from the source URL goes here. Must be exact, no paraphrase.
quote-zh: null                     # 可选，原文已是中文则填，是英文则可留 null
sources:                           # 至少 1 条，最好 ≥2
  - https://...

# === 其他 ===
license: 引用合理使用                # 引用合理使用 | 已授权 | 公开 CC | 暂不确定
notes: |                           # 任何要给人工校验员看的备注、问号、冲突点
  -
---

# 原文 / 摘录 / 整理

（这里放原文截取或你的初步整理。
保留原文的话用引用块 `>` 包起来，加上来源标注。）

> 这里是原文段落...

## 我的整理（如果有）

（如果你做了进一步整理，写在这里。
但记住：观点、解读、品牌口吻都不是你的工作，由人工写。）
