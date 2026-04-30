# verified=false 审计清单（2026-04-30）

## 1. 处理原则
- 可补源：已有公开入口，但 sources 不足或缺少逐字证据，优先补官网、论文、GitHub、B 站时间戳或厂商文档。
- 应降级：只有二手社区线索、内部转录或搜索摘要支撑，保留条目但在 UI 中明确「待核实」。
- 应删除：公开入口消失、产品名无法对应、或与 3DGS 关系无法建立。当前未直接删除，先列为候选。

## 2. 可补源
| 数据摊 | id / slug | 原因 | 下一步 |
|---|---|---|---|
| learning-articles | `shooting-light-and-sharpness` | 含经验值与拍摄规则，已有 COLMAP / SfM 来源但缺少直接教程硬源 | 补 B 站教程时间戳或公开摄影测量拍摄规范 |
| learning-articles | `pointcosm-cloud-plans` | 点映套餐与价格需官网或截图核验 | 用可访问网络抓 `pointcosm.cn` 首页 / 套餐页 HTML |
| insights | `laser-vs-visual-china-2026` | 市场数字来自内部转录和研究草稿 | 补正式市场报告、厂商公开材料；否则继续保留 verified=false |
| news | `3d-pointillism-art` | 只有项目官网一条来源 | 补艺术家/展览页、GitHub、媒体报道或删除新闻属性 |
| glossary | `covariance` / `opacity` / `densification` / `pruning` / `adaptive-density-control` / `anisotropy` / `real-time-rendering` / `reconstruction` / `spatial-video` / `digital-twin` / `voxelization` | 多为基础概念，缺少 sources | 批量补 3DGS 论文、图形学基础资料、W3C/WebGPU、Apple/Meta/Google 等公开文档 |

## 3. 应降级保留
| 数据摊 | id / slug | 原因 |
|---|---|---|
| tools | `lumina3d` | 仅 Reddit 标题与 TikTok 线索，未抓到稳定官网或 App Store |
| tools | `visualcamp` | 官网存在，但未找到官方 3DGS 工具链句子 |

## 4. 删除候选
| 数据摊 | id / slug | 原因 |
|---|---|---|
| tools | `blender-3dgs-addon` | 只有单 GitHub 源；若仓库活跃且功能清晰可补源，否则可从工具索引降级到外部资源 |

## 5. 本轮处理结果
- 已完成全站盘点，建立补源优先级。
- 本轮不强行把内部转录数字标成 verified=true。
- 后续优先处理 learning-articles 与 insights，因为这些直接进入新增学习与洞察详情页。
