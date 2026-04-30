# TASK-07 · 3DGS 工作流辅助工具收集

**目标**：3DGS 不是孤岛——从拍摄到最终发布，整个工作流上还有大量"非 3DGS 但 3DGS 离不开"的辅助工具。这些工具用户实际在用，但 TASK-03 阶段 1 / 2 的清单里几乎完全缺席。本批次补 12 条。

**为什么交给 Auto**：辅助类工具（视频转码、照片清理、托管、HDR 处理等）本身有大量公开评测和官网信息，Auto 抓取风险低；同时这些工具进入 tools.ts 后会让"全谱用户"工具地图更完整。

---

## A. 本批次清单（12 条）

### 组 1：用户已确认在用的工具（3 条 · 必抓）

```
shutter-encoder              # 法国 Shutter Encoder，免费视频转码与帧导出
handbrake                    # 开源跨平台视频转码工具
tinyhost                     # 用户曾用过的轻量级文件托管（已不主用，但需收录）
```

### 组 2：视频 / 帧处理（3 条）

```
ffmpeg                       # 命令行视频处理瑞士军刀，3DGS 教程几乎都用它
davinci-resolve              # Blackmagic 旗下视频后期工具，含降噪/去模糊
adobe-premiere-pro           # 行业主流视频剪辑，3DGS 拍摄链常见
```

### 组 3：照片处理 / 筛选（3 条）

```
adobe-lightroom              # 摄影师工作流核心，可批量调色去噪
topaz-photo-ai               # AI 去噪/去模糊/超分（合并自 Topaz Sharpen + DeNoise + Gigapixel）
photo-mechanic               # 摄影记者级筛图工具
```

### 组 4：全景 / HDR / 标定（3 条）

```
ptgui                        # Pro 级全景拼接（许多 3DGS 球面采集工作流前置）
hugin                        # 开源全景拼接替代品
calibrationcamera-checkerboard-toolkit  # OpenCV 自带相机标定工具或类似（请挑一个具体产品）
```

如组 4 第 3 条找不到具体产品，**改为补抓 Reddit r/GaussianSplatting 用户反复推荐的另一辅助工具**，并在自检报告说明替代理由。

---

## B. 输出位置 + Schema

### Schema 复用 tools.ts

参见 `src/lib/data/tools.ts`（已扩展过的 schema）。本批次 12 条都按 Tool 类型产出。

### 关键字段处理（与 TASK-03 阶段 2 不同的地方）

```typescript
{
  // ... 标准 Tool 字段 ...
  category: <见下方 C 节>,
  region: "global",                          // 全部填 global
  vendor: "<厂商名>",
  evidenceQuote: "<官网或维基条目首页 verbatim>",
  freshnessSignal: "<最近更新日期 / 版本号>",
  freshnessCheckedAt: "2026-04-29",
  discoverySource: "user-workflow",          // 新值，明确表示来自用户工作流推荐
  tags: [],                                  // 全部留空数组（待 Opus 决定是否加新 tag）
}
```

### category 字段映射

辅助工具不完全适配现有 5 类（capture/training/editing/viewing/publishing）。**强制选最贴近的一类**，并在 description 中写明"该工具属于 3DGS 工作流的 ___ 阶段，非 3DGS 核心工具"：

| 工具 | category 写 | description 中标记 |
|---|---|---|
| shutter-encoder / handbrake / ffmpeg | `capture` | "采集前置——视频帧导出" |
| davinci-resolve / premiere-pro | `editing` | "采集前置——视频清理" |
| adobe-lightroom / topaz-photo-ai / photo-mechanic | `editing` | "采集前置——照片筛选/降噪" |
| ptgui / hugin | `capture` | "采集前置——全景/HDR 拼接" |
| tinyhost | `publishing` | "发布——通用文件托管" |

### 输出位置

每条产出 1 个文件：

```
knowledge-base/sources/tools/<slug>.md
knowledge-base/sources/tools/<slug>.ts.snippet
```

与 TASK-03 阶段 2 同目录。

---

## C. pros / cons 客观评价（沿用 TASK-03 标准）

辅助工具的 pros / cons 不要写"好用"、"复杂"等主观判断。重点写**该工具在 3DGS 工作流中的具体能力**：

✅ 正确写法（pros）
- "支持从 H.264 / H.265 / ProRes / DNxHR 等视频导出单帧 PNG/JPEG"
- "命令行可批处理，单条命令完成 480p 缩放 + EXR 序列导出"
- "Lightroom 的星标/旗标筛选可输出独立子目录给 COLMAP 直读"

✅ 正确写法（cons）
- "免费版每次启动有 5 秒倒计时（Shutter Encoder Pro 才能去除）"
- "macOS 仅 Intel/Apple Silicon 通用版，旧 Mac Pro 不支持"
- "TinyHost 单文件 ≤ 2GB（官方公告 2025-11）"

❌ 禁止写法
- "界面简单"、"上手快" — 主观
- "比 FFmpeg 友好" — 比较他人
- "性能强" — 没数据

---

## D. 反幻觉硬规则

1. **每条 sources ≥ 2 条**：官网 + Wikipedia / GitHub / 媒体评测交叉验证
2. **TinyHost 特别处理**：用户已说"现在不怎么用了"。如官网仍然在线就正常抓；如发现服务已下线，**不要编造**，标 `freshnessSignal: "service-status-unclear"`，cons 加"用户反馈已不主用，建议核实服务可用性"
3. **Topaz Photo AI 的合并历史**：Topaz Labs 在 2024 年把 Sharpen AI / DeNoise AI / Gigapixel AI 合并为单一 Topaz Photo AI 产品。本条**只建一个 slug 叫 `topaz-photo-ai`**，不要分别建三个。
4. **不要把 Adobe Photoshop / GIMP / Affinity Photo 加进来**：那些是通用图像编辑器，不属于 3DGS 工作流的关键齿轮。本批次只建清单内的 12 条。

---

## E. TS 字符串硬约束

复用 TASK-03-tools-stage-2.md 的 C 节：中文字符串内禁用英文 `"` `'` `` ` `` `\`，英文用 `\"` 转义。

---

## F. 完成报告

完成 12 条后回复：
1. 完成数 __ / 12（按组分类计数）
2. 字符串自检通过：是 / 否
3. TinyHost 服务在线状态：在线 / 已下线 / 不确定
4. 组 4 第 3 条（相机标定）实际抓的是哪个工具？理由？
5. 是否在抓取过程中发现"3DGS 工作流核心辅助工具但本清单未列入"的产品？列 1-3 条建议

## G. 开始执行

按组顺序：组 1（3 条用户工具）→ 组 2（3 条视频处理）→ 组 3（3 条照片处理）→ 组 4（3 条全景标定）。
