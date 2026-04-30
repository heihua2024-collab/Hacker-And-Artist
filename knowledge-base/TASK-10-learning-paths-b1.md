# TASK-10：B1 learning-paths 重构（用户已 GO，直接执行）

> 创建于 2026-04-30 00:51。前一会话（Opus 节点）由用户拍板批准本大纲。新会话读完此文件后**直接动手写代码 + build**，不要再问用户是否同意大纲。

---

## 接管前必读
1. 先读 `knowledge-base/STATUS.md`（项目全局快照，含数据现状 281 条已入库）
2. 再读本文件（B1 专项 brief）
3. 然后读 `src/lib/data/learning-paths.ts` 全文（看现有 1 条满血路径 + 3 条 stub 骨架）

## 任务总目标

把 `src/lib/data/learning-paths.ts` 中的 3 条 stub（capture-and-training / web-viewing-interaction / spatial-narrative-experiments）扩展为满血 `LearningPath` 对象，与现有 `understandGaussianSplatting` 同构。

完成标准：
- 4 条路径全部 `status: "live"`
- `learningPaths` 数组从 1 条变 4 条
- `learningPathStubs` 也更新（status 从 "preparing" 改 "live"，模块数 / 时长保持现状或微调）
- `npm run build` 一次绿光通过

## 已批准的模块大纲（用户 GO）

### 路径 02：capture-and-training（进阶 / 8 模块 / ~4h）
> **素材源**：YouMind 第二章「采集教程入门级」9 模块 + batch-01/02/03 实战细节

| # | 模块标题（zh） | 模块标题（en） | format | duration | 主要工具（slug，引用 tools.ts） |
|---|---|---|---|---|---|
| 01 | 拍摄前的工程：光线、清晰度与重合度 | Pre-shoot Engineering: Light, Sharpness & Overlap | article | 25 分钟 | — |
| 02 | 三层拍摄法：从小空间到回字形路径 | The Three-Layer Capture Method | tutorial | 30 分钟 | scaniverse / luma-ai |
| 03 | 物体视频拍摄：手机实操 | Object Video Capture: Phone Hands-on | tutorial | 30 分钟 | luma-ai / scaniverse |
| 04 | 物体照片拍摄：影棚拍摄 | Object Photo Capture: Studio Setup | tutorial | 30 分钟 | polycam / kiri-engine / kiri-remy |
| 05 | 运动相机与全景相机：大空间采集 | Action Cams & 360 Cams: Large-space Capture | tutorial | 35 分钟 | insta360 / dji-terra / monogram-japan |
| 06 | 本地训练入门：postshot / brush / lichtfeld-studio | Local Training 101 | video | 35 分钟 | postshot / brush / lichtfeld-studio |
| 07 | 云端训练：luma / 知天下 / 点映 | Cloud Training: Luma / Zhitianxia / Pointcosm | article | 25 分钟 | luma-ai / zhitianxia / pointcosm |
| 08 | 检测与导出：质量评估与格式选择 | Validation & Export: QC + Format Choice | tutorial | 30 分钟 | supersplat / splat-transform |

**该路径关键 keyConcepts**（必须从 `glossary.ts` 现有 78 条 id 中选）：
photogrammetry / sfm / colmap / feature-matching / camera-intrinsics / camera-extrinsics / bundle-adjustment / multi-view-triangulation / epipolar-geometry / densification / pruning / adaptive-density-control / l1-reconstruction-loss / training-loss / psnr / ssim / lpips / ply-format / spz / splat-format

---

### 路径 03：web-viewing-interaction（进阶 / 6 模块 / ~3h）
> **素材源**：tools.ts 现有 viewing/web_rendering 类工具 + glossary 现有 webgl-webgpu / streaming-splat / splat-compression / compressed-gs

| # | 模块标题（zh） | 模块标题（en） | format | duration | 主要工具 |
|---|---|---|---|---|---|
| 01 | Web 渲染器全景：从 antimatter15 到 Spark | Web Renderers: From antimatter15 to Spark | article | 25 分钟 | antimatter15-splat / spark / three-gaussian-splatting |
| 02 | Three.js 集成实战：场景嵌入与控制 | Three.js Integration: Scene Embedding & Control | tutorial | 35 分钟 | three-gaussian-splatting / gsplat |
| 03 | PlayCanvas 与 Babylon.js：引擎级支持 | PlayCanvas & Babylon.js: Engine-level Support | tutorial | 30 分钟 | playcanvas-engine / babylonjs-splat |
| 04 | 文件格式与压缩：ply / splat / spz / sog | File Formats & Compression | article | 30 分钟 | splat-transform / niantic-spz-reference |
| 05 | LOD 与流式加载：百万高斯实战调度 | LOD & Streaming: Scheduling Millions of Splats | video | 30 分钟 | scaffold-gs / luma-web-library |
| 06 | 编辑器嵌入与产品化：SuperSplat / WebXR | Editor Embedding & Productization | tutorial | 30 分钟 | supersplat / webxr-splats / storysplat |

**该路径关键 keyConcepts**：
webgl-webgpu / rasterization / view-dependent-color / differentiable-rasterization / ply-format / splat-format / spz / compressed-gs / streaming-splat / splat-compression / supersplat / spatial-computing

---

### 路径 04：spatial-narrative-experiments（通识 / 5 模块 / ~2h）
> **素材源**：cases.ts 14 条 milestone + gallery.ts 20 条用户作品

| # | 模块标题（zh） | 模块标题（en） | format | duration | 主要案例（slug，引用 cases.ts） |
|---|---|---|---|---|---|
| 01 | 从论文到展览：3DGS 的艺术化路径 | From Papers to Galleries: The Artistic Path | article | 25 分钟 | inria-original-3dgs / mip-splatting-anti-aliased / scaffold-gs |
| 02 | 动态高斯：让时间在场景中流动 | 4D Gaussians: Letting Time Flow | article | 25 分钟 | 4d-gaussian-splatting / deformable-3d-gaussians |
| 03 | 数字人与可驱动化身 | Avatars & Drivable Humans | article | 25 分钟 | gaussian-avatars / hugs |
| 04 | 文字驱动生成：从一句话到一个空间 | Text-driven Generation | article | 25 分钟 | dreamgaussian / langsplat |
| 05 | 用户作品：SuperSplat 与社群创作 | User Works: SuperSplat & Community | tutorial | 30 分钟 | playcanvas-supersplat-editor + gallery |

**该路径关键 keyConcepts**：
spatial-media / spatial-computing / 4dgs / radiance-field / novel-view-synthesis

---

## 拼装硬规则（务必遵守）

1. **schema 严格对齐** `LearningPath` / `LearningModule` / `LearningResource` 类型（见 learning-paths.ts 顶部 type 定义）
2. **TS 字符串硬约束**：中文字符串内**禁用**英文 `"` `'` `` ` `` `\` `${`——用 `「...」` 替代。后续 build 报错的 99% 是这个
3. **keyConcepts 必须从 glossary.ts 已有 78 条 id 中选**——找不到对应概念就**省略**该 keyConcept，不要编 id
4. **resources 至少 2 条 / 模块**，含 `type / title / url`：
   - tools 类引用本站 `/tools/{slug}` 不行（resources 只接 url 不接内部链接），用工具官网 URL（从 tools.ts 现有条目的 homepageUrl 字段）
   - paper / github 类用 arxiv / GitHub URL
   - article 类用社群转录中提到的公开外链（如 YouMind 第二章的 `https://app.yinxiang.com/fx/...` 印象笔记 fx 链接是合法 article URL）
5. **prerequisites / outcomes**：每条路径列 2-3 条 prerequisites + 4-5 条 outcomes
6. **callToAction**：每条路径末尾写一句号召语，引导去 /tools 或 /cases 或 /gallery
7. **去人格化**：素材里的群友 ID 隐去，但 KIRI / 点映 / 知天下 / 元象 等品牌可保留
8. **客观风格**：不要写「最先进」「极致」「遥遥领先」等情绪化词

## 同步更新 learningPathStubs

3 条 stub 的 `status` 从 `"preparing"` 改 `"live"`；其他字段（meta / summary）保持不变或微调使其反映真实模块数。

## 工作节奏

1. **不要分多次确认**——本 brief 已是用户拍板版，直接写完整 .ts 文件
2. **一次 Write 覆盖** `src/lib/data/learning-paths.ts`
3. **跑 build**：`npm run build`
4. **修任何 TS 错**（多半是 keyConcepts 写错 ID 或中文字符串硬约束）
5. **绿光后**更新 `STATUS.md` §3 阶段进度（B1 mark 完成）
6. 报告战果：4 条路径 × 共 26 个模块（7+8+6+5）已上线

## 素材文件路径速查

- YouMind 转录：`C:\Users\15319\Desktop\youmind转录.txt`（1075 行）
- Gemini 旧 batch：`knowledge-base/_inbox/transcribed/batch-0{1,2,3,4}.md`
- 现有 learning-paths.ts：`src/lib/data/learning-paths.ts`
- glossary.ts（拿 keyConcepts ID 用）：`src/lib/data/glossary.ts`
- tools.ts（拿工具 homepageUrl 用）：`src/lib/data/tools.ts`
- cases.ts（拿 case slug 用）：`src/lib/data/cases.ts`
