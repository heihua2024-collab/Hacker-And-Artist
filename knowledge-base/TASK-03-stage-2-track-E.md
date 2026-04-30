# TASK-03 阶段 2 · Track E（中国区 · 含修正与补抓）

继续阶段 1 工作。本轨道阶段 1 共产出 19 条候选，Opus 审核保留 14 条，**用户提供 4 项关键修正/补充**，最终 keep 列表为 **18 条**。

## 主 brief（必读）
请先阅读：`knowledge-base/TASK-03-tools-stage-2.md`

## ⚠️ 用户提供的关键修正（必须执行）

### 修正 1：E17 Remy 归属错误

**阶段 1 错误信息**：将 Remy 归为华为产品。

**正确信息**：Remy 是 **KIRI Innovations**（KIRI Engine 的开发商）的子产品，公司创始人是王正男。

**处理方式**：
- 阶段 1 的 `huawei-remy` 条目作废
- 阶段 2 改为 `kiri-remy`，明确标注为 KIRI Engine 同公司的 Web 端 / 子产品（请重新查证 Remy 的具体产品形态：是 web 平台？iOS/Android app？还是 KIRI Engine 内的某个功能？）
- 在 description 中说明它与 Track A 的 `kiri-engine` 同属一家公司，并交叉引用
- vendor 字段填 `"KIRI Innovations"`

### 修正 2：补抓「点映」（pointcosm）

**阶段 1 错误信息**：标"未找到点映"。

**正确信息**：
- 网站：`pointcosm.cn`
- 用户证言："质量比欧洲的 Teleport 还要好的多，重点在于对于墙面的清理非常干净，尤其是白墙、低特征点的部分"
- 是云服务（云训练）

**处理方式**：
- 创建条目 `pointcosm`（以英文域名为 slug）
- vendor 填具体公司名（请去官网查证）
- category 选 `training`（云训练服务）
- 在 evidence-quote 字段引用官网原文（**必须 verbatim**，不要用用户证言代替）
- 在 .md 末尾的 notes 字段引用用户证言："来自资深用户反馈：『…墙面清理…白墙低特征点…』"作为旁证（不放进客观字段）

### 修正 3：补抓 3 个采集工具

阶段 1 漏掉的 3 个采集类工具：

```
splatking                # 请搜「splatking 高斯泼溅」「splatking app」等
splatcam                 # 请搜「splatcam」「SplatCam 3DGS」
lumina3d                 # 内测中（closed beta）—— 请用「lumina3d 高斯泼溅」「lumina 3d gaussian splatting」搜
```

**处理方式**：
- 三者都 category 选 `capture`，region 选 `china`
- 如果搜不到中文官网，尝试搜 GitHub / X / 小红书 / 知乎 / 抖音
- 如果完全找不到可信来源（≥ 2 条交叉验证），**不要编造**，在 .md notes 写明"无法找到可验证来源，建议人工核实后补抓"，并不产出 .ts.snippet
- lumina3d 标 priceNote: "closed beta，2026-04 仍在内测"

### 补充信息源 4：印象笔记链接（参考）

用户提供：`https://app.yinxiang.com/fx/00eab5cc-f5be-440d-99f9-d5e55947f687`

这是中国高斯泼溅行业群的群文件汇总。**Auto 大概率无法直接访问**（需登录 / 国内 IP）。如能访问，请将其作为 E 轨的额外种子来源；若访问失败，请在自检报告中明确写"印象笔记链接访问失败，未使用"，并提示 Opus 让用户把关键内容贴出。

## 本轨道完整 keep 列表（共 18 条）

```
E1   zhitianxia                 # 知天下（深圳）
E2   mipmap                     # 北京
E3   bsd-studio                 # （阶段 1 已抓）
E5   insta360                   # 全景相机厂商，含 3DGS 工作流
E6   seed3d-2                   # 待重新核查 vendor
E7   netease-yaotai             # 网易瑶台
E8   sensetime-qiongyu          # 商汤·琼宇
E9   huawei-cyberverse          # 华为·CyberVerse（这个是华为真正的产品，不是 Remy）
E10  mapmost-3dgs               # 武汉
E11  tencent-hunyuan-3d-world   # 腾讯·混元 3D 世界
E14  divshot
E16  realsee                    # 如视
E19  dji-terra                  # 大疆 Terra（航测软件，含 3DGS 输出）

# === 修正后 ===
kiri-remy                       # 修正自 E17，归属 KIRI（不是华为）

# === 用户补充 ===
pointcosm                       # 补抓（pointcosm.cn）
splatking                       # 补抓
splatcam                        # 补抓
lumina3d                        # 补抓（closed beta）
```

## 本轨道特别说明

1. **大公司产品（华为 CyberVerse / 商汤琼宇 / 网易瑶台 / 腾讯混元 / 大疆 Terra / 如视）的 evidence-quote**：**必须从官方产品页或官方公告来**，不能用第三方报道。如果只能找到第三方报道，标 [unverified] 并在 notes 写明。

2. **vendor 字段必填**：本轨所有工具的 vendor 都要明确填写中文公司名（如"深圳市知天下科技有限公司"），便于后续做"中国厂商生态图谱"。

3. **region 字段固定为 `"china"`**。

4. **discoverySource 字段**：原 14 条填 `"china-zone"`；修正/补充的 4 条填 `"user-feedback"`（这是新增 enum 值，请直接使用）。

5. **特别注意 description 中的措辞**：本轨多家是大公司（华为/腾讯/商汤等），请避免使用任何带营销色彩的词汇（"领先"、"颠覆"等）。坚持客观功能描述。

## 跨轨道合并提醒

| slug | 主轨道 | 也出现于 |
|---|---|---|
| kiri-engine | A | E（kiri-remy 是它的子产品） |

请在 `kiri-remy.md` 中明确写"主条目见 `kiri-engine.md`，本条记录其子产品"。

## 进度自检

完成后请在 `_stage-1/track-E.md` 末尾补"阶段 2 完成报告"。

**额外特别项**：
1. 印象笔记链接是否成功访问？如否，明确写无法访问。
2. splatking / splatcam / lumina3d 三个补抓工具，是否都找到了 ≥ 2 条可信来源？逐个回答。
3. pointcosm 的 evidence-quote 是否来自官网 verbatim？

## 开始执行

按 keep 列表产出 .md + .ts.snippet。**优先处理用户补充的 4 个条目**（kiri-remy / pointcosm / splatking / splatcam / lumina3d），因为这些是用户主动指出的，需要尽快验证。
