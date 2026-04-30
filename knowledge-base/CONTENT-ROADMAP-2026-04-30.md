# INKTOYS 后续内容建设路线图（2026-04-30）

## 1. `/research`
- 定位：论文、行业报告、长篇技术解读的研究库。
- 建议：短期继续由 `/insights` 承载；当论文解读超过 20 篇、行业报告超过 10 篇时再拆独立 `/research`。
- 首批内容：3DGS 原论文、Mip-Splatting、4DGS、SuGaR、Radiance Meshes、Quadrature Fields、Google Immersive View。

## 2. `/gear`
- 定位：采集设备、手机、无人机、全景相机、激光与混合采集硬件。
- 建议：先做 knowledge-base 资料池，不立即上线。等公开参数、样张、价格和可购买链接齐备后再建路由。
- 候选：DJI Avata 360、Avata 系列、Q9000、其域 P1 / L2 Pro、iPhone Pro、Insta360 / 全景相机链路。

## 3. `/timeline`
- 定位：从 NeRF、Instant-NGP、3DGS 到 4DGS、标准化和产业软件接入的时间线。
- 建议：可以从 `news`、`cases.year`、`glossary.introducedIn` 自动抽取，避免手工维护两份数据。
- 首屏结构：研究范式、工具链、标准格式、行业采用四条泳道。

## 4. `/community`
- 定位：社群入口、投稿规则、精选作品、贡献方式。
- 短期补齐：作品投稿说明、工具纠错入口、来源补充模板、内容审核规则。
- 风险控制：个人 ID 去人格化，仅保留公开品牌、机构、GitHub 作者和商业主体。

## 5. `/media`
- 定位：媒体资料包、品牌资产、对外介绍、精选截图和站点引用方式。
- 短期补齐：品牌一句话、长短介绍、logo 使用说明、默认 OG 图、联系入口。
- 中期补齐：案例图包、3DGS 科普图、演示视频和可嵌入 iframe 示例。

## 6. 优先级
1. `/community` 与 `/media`：上线前补框架页具体内容，降低空页面感。
2. `/timeline`：可复用现有结构化数据，工程成本低，展示价值高。
3. `/research`：先让 `/insights` 积累足够内容，再拆分。
4. `/gear`：依赖硬件公开资料和实测素材，暂不作为短期上线阻塞。
