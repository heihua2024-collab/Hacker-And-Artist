/**
 * News（首批 12 条 + TASK-05 批次 2 共 15 条新增 + TASK-09 中国区 10 条）
 * 时间窗：约 2025-10 ~ 2026-04
 * 来源：Gemini 调研 + URL 规范化清洗；批次 2 与 TASK-09 见 knowledge-base/sources/news/
 */

import type {
  Bilingual,
  LevelId,
  SourceTypeId,
  TagId,
} from "@/lib/taxonomy";

export type NewsCategory =
  | "paper"
  | "tool"
  | "industry"
  | "community"
  | "art";

export type NewsItem = {
  id: string;
  title: Bilingual;
  summary: Bilingual;
  category: NewsCategory;
  tags: TagId[];
  level: LevelId | null;
  source: { name: string; type: SourceTypeId };
  sourceUrl: string;
  coverUrl: string | null;
  publishedAt: string;
  editorialNote: Bilingual;
  verified: boolean;
  sources: string[];
};

export const newsCategories: {
  id: NewsCategory;
  label: Bilingual;
}[] = [
  { id: "paper", label: { zh: "论文", en: "Paper" } },
  { id: "tool", label: { zh: "工具", en: "Tool" } },
  { id: "industry", label: { zh: "行业", en: "Industry" } },
  { id: "community", label: { zh: "社区", en: "Community" } },
  { id: "art", label: { zh: "艺术", en: "Art" } },
];

export const news: NewsItem[] = [
  {
    id: "ng-gs-segmentation",
    title: {
      zh: "NG-GS：NeRF 引导的 3D 高斯泼溅高保真分割",
      en: "NG-GS: NeRF-Guided 3D Gaussian Splatting Segmentation",
    },
    summary: {
      zh: "通过径向基函数插值构建空间连续特征场，结合 NeRF 模块解决高斯离散性导致的物体边界混叠问题。",
      en: "Constructs a spatially continuous feature field using RBF interpolation combined with NeRF to solve boundary aliasing caused by Gaussian discretization.",
    },
    category: "paper",
    tags: ["paper", "optimization"],
    level: "expert",
    source: { name: "arXiv", type: "arxiv" },
    sourceUrl: "https://arxiv.org/abs/2604.14706",
    coverUrl: null,
    publishedAt: "2026-04-16",
    editorialNote: {
      zh: "极大地改善了 3DGS 物体分割中的边缘锯齿问题，为高精度空间资产编辑提供了更好的底层支持。",
      en: "Significantly improves edge aliasing in 3DGS object segmentation, providing better low-level support for high-precision spatial asset editing.",
    },
    verified: true,
    sources: ["https://arxiv.org/abs/2604.14706"],
  },
  {
    id: "rethinking-pose-refinement",
    title: {
      zh: "重新思考 3DGS 在姿态先验与几何不确定性下的位姿优化",
      en: "Rethinking Pose Refinement in 3D Gaussian Splatting under Pose Prior and Geometric Uncertainty",
    },
    summary: {
      zh: "引入蒙特卡洛姿态采样与 Fisher 信息优化的重定位框架，无需重新训练即可提升相机位姿精度与追踪鲁棒性。",
      en: "Introduces a relocalization framework using Monte Carlo sampling and Fisher Information to improve camera pose accuracy without retraining.",
    },
    category: "paper",
    tags: ["paper", "slam"],
    level: "expert",
    source: { name: "arXiv", type: "arxiv" },
    sourceUrl: "https://arxiv.org/abs/2603.16538",
    coverUrl: null,
    publishedAt: "2026-03-17",
    editorialNote: {
      zh: "CVPR 2026 录用研究，深入剖析了 3DGS 在 SLAM 定位中的误差来源，非常适合关注大场景重建的研究者。",
      en: "Accepted by CVPR 2026, deeply analyzing the sources of error for 3DGS in SLAM, highly relevant for researchers focusing on large-scale reconstruction.",
    },
    verified: true,
    sources: ["https://arxiv.org/abs/2603.16538"],
  },
  {
    id: "speeding-up-gaussian-lists",
    title: {
      zh: "通过缩短高斯列表加速 3D 高斯渲染与训练",
      en: "Speeding Up the Learning of 3D Gaussians with Much Shorter Gaussian Lists",
    },
    summary: {
      zh: "通过重置高斯尺度与增加 Alpha 混合的熵约束，大幅减少单条射线上的高斯数量，进而有效提升训练与实时渲染效率。",
      en: "Dramatically reduces the number of Gaussians per ray by resetting scales and adding entropy constraints to Alpha blending, boosting rendering efficiency.",
    },
    category: "paper",
    tags: ["paper", "training"],
    level: "intermediate",
    source: { name: "arXiv", type: "arxiv" },
    sourceUrl: "https://arxiv.org/abs/2603.09277",
    coverUrl: null,
    publishedAt: "2026-03-10",
    editorialNote: {
      zh: "展示了在不牺牲视觉质量的前提下，通过底层数据结构优化进一步压榨 3DGS 性能的工程潜力。",
      en: "Showcases the engineering potential to further squeeze 3DGS performance via data structure optimization without sacrificing visual quality.",
    },
    verified: true,
    sources: ["https://arxiv.org/abs/2603.09277"],
  },
  {
    id: "fast-converging-1-minute",
    title: {
      zh: "1 分钟重建：快速收敛的 3D 高斯泼溅管线",
      en: "Fast Converging 3D Gaussian Splatting for 1-Minute Reconstruction",
    },
    summary: {
      zh: "SIGGRAPH Asia 3DGS 挑战赛冠军方案，利用锚点神经高斯表示与多视图一致性引导，在一分钟内实现高保真空间重建。",
      en: "Winning solution of the SIGGRAPH Asia 3DGS Challenge, achieving high-fidelity reconstruction within one minute using neural-Gaussian representations.",
    },
    category: "paper",
    tags: ["paper", "real_time"],
    level: "expert",
    source: { name: "arXiv", type: "arxiv" },
    sourceUrl: "https://arxiv.org/abs/2601.19489",
    coverUrl: null,
    publishedAt: "2026-01-27",
    editorialNote: {
      zh: "代表了目前移动端与边缘计算设备上极速空间重建的最高学术水平，对应用落地极具商业价值。",
      en: "Represents the state-of-the-art in ultra-fast spatial reconstruction for mobile and edge devices, carrying massive commercial value.",
    },
    verified: true,
    sources: ["https://arxiv.org/abs/2601.19489"],
  },
  {
    id: "nanogs-ue5-plugin",
    title: {
      zh: "NanoGS：为虚幻引擎 5 引入 Nanite 风格的高斯渲染技术",
      en: "NanoGS: Bringing Nanite-style Gaussian Splatting to Unreal Engine 5",
    },
    summary: {
      zh: "由 Moonshine Studio 开发并发布的 UE5 免费插件，通过自动 LOD 集群与 GPU 基数排序，解决大规模 3DGS 资产的显存与帧率瓶颈。",
      en: "A free UE5 plugin from Moonshine Studio that optimizes VRAM and framerates for large 3DGS assets via auto-LOD clustering and GPU Radix Sort.",
    },
    category: "tool",
    tags: ["optimization", "spatial_media"],
    level: "intermediate",
    source: { name: "CG Channel", type: "media" },
    sourceUrl:
      "https://www.cgchannel.com/2026/03/free-plugin-nanogs-puts-nanite-style-gaussian-splatting-in-unreal-engine/",
    coverUrl: null,
    publishedAt: "2026-03-19",
    editorialNote: {
      zh: "真正打破了虚幻引擎在处理超大真实场景高斯模型时的性能瓶颈，影视虚拟制作与建筑可视化从业者必试。",
      en: "Genuinely breaks Unreal Engine's performance bottleneck when handling massive real-world Gaussian scenes. A must-try for VFX and arch-viz professionals.",
    },
    verified: true,
    sources: [
      "https://www.cgchannel.com/2026/03/free-plugin-nanogs-puts-nanite-style-gaussian-splatting-in-unreal-engine/",
    ],
  },
  {
    id: "supersplat-2-19",
    title: {
      zh: "开源编辑器 SuperSplat 2.19 发布：新增 4D 高斯与新格式支持",
      en: "Open-source Editor SuperSplat 2.19 Released: 4D GS and New Format Support",
    },
    summary: {
      zh: "PlayCanvas 更新旗下开源编辑器，正式加入 4D 高斯动画时间轴制作、SPZ 及 KSPLAT 格式导入支持，并优化 HTML 查看器。",
      en: "PlayCanvas updates its open-source editor with 4D Gaussian animation authoring, SPZ/KSPLAT import support, and an optimized HTML viewer.",
    },
    category: "tool",
    tags: ["editing", "publishing"],
    level: "beginner",
    source: { name: "CGWorld", type: "media" },
    sourceUrl: "https://cgworld.jp/flashnews/01-202602-SuperSplat.html",
    coverUrl: null,
    publishedAt: "2026-02-02",
    editorialNote: {
      zh: "Web 端最成熟的高斯泼溅编辑平台之一，新格式支持正一步步统一原本碎片化的浏览器生态。",
      en: "One of the most mature web-based 3DGS editing platforms. New lightweight format support helps unify a fragmented browser ecosystem.",
    },
    verified: true,
    sources: [
      "https://cgworld.jp/flashnews/01-202602-SuperSplat.html",
      "https://superspl.at/",
    ],
  },
  {
    id: "kiri-engine-web-3dgs",
    title: {
      zh: "KIRI Engine 加强 Web 端 3DGS 在线生成与托管方案",
      en: "KIRI Engine Enhances Web-based 3DGS Generation and Hosting Solutions",
    },
    summary: {
      zh: "针对部分云端处理工具的 API 限制，KIRI Engine 推出了高可靠性的视频转 3DGS 云端生成管线，支持多格式导出与网页跨域嵌入。",
      en: "Addressing API limits from other cloud tools, KIRI Engine launches a highly reliable video-to-3DGS pipeline with multi-format export and web embed support.",
    },
    category: "tool",
    tags: ["capture", "web_rendering"],
    level: "beginner",
    source: { name: "Hatena Blog", type: "media" },
    sourceUrl: "https://bibinbaleo.hatenablog.com/entry/2026/04/21/094051",
    coverUrl: null,
    publishedAt: "2026-04-21",
    editorialNote: {
      zh: "在 Luma 等工具调整策略期间，为没有本地 GPU 算力的创作者提供了一个稳定的在线云渲染与分发平替方案。",
      en: "Provides creators lacking local GPU compute with a stable alternative for cloud rendering and distribution as other tools adjust their strategies.",
    },
    verified: true,
    sources: [
      "https://bibinbaleo.hatenablog.com/entry/2026/04/21/094051",
      "https://www.kiriengine.app/",
    ],
  },
  {
    id: "khronos-gltf-extension",
    title: {
      zh: "Khronos 集团公布 glTF 高斯泼溅扩展基准候选版",
      en: "Khronos Group Announces glTF Gaussian Splatting Extension Candidate",
    },
    summary: {
      zh: "KHR_gaussian_splatting 扩展进入候选发布阶段，为跨平台、跨引擎的 3DGS 资产储存（位置、颜色及渲染规则）确立了首个开放工业标准。",
      en: "The KHR_gaussian_splatting extension reaches release candidate status, establishing the first open industry standard for cross-platform 3DGS asset storage.",
    },
    category: "industry",
    tags: ["publishing", "web_rendering"],
    level: "intermediate",
    source: { name: "Khronos Group", type: "official_website" },
    sourceUrl:
      "https://www.khronos.org/news/press/gltf-gaussian-splatting-press-release",
    coverUrl: null,
    publishedAt: "2026-02-03",
    editorialNote: {
      zh: "行业发展的里程碑时刻。高斯资产终于摆脱了私有扩展名的束缚，即将像传统网格模型一样无缝融入现有生态。",
      en: "A milestone moment. 3DGS assets are breaking free from proprietary extensions to seamlessly integrate into existing ecosystems like traditional meshes.",
    },
    verified: true,
    sources: [
      "https://www.khronos.org/news/press/gltf-gaussian-splatting-press-release",
    ],
  },
  {
    id: "octanerender-2026-3dgs",
    title: {
      zh: "OctaneRender 2026 正式接入路径追踪级高斯泼溅",
      en: "OctaneRender 2026 Ships with Path-Traced Gaussian Splat Support",
    },
    summary: {
      zh: "OTOY 在最新渲染器生态中引入 3DGS 底层支持，允许视觉艺术家在光线追踪管线中直接融合、反射并重新打光真实高斯场景。",
      en: "OTOY introduces native 3DGS support in its renderer, allowing VFX artists to blend, reflect, and relight Gaussian scenes directly within ray-traced pipelines.",
    },
    category: "industry",
    tags: ["spatial_media", "viewing"],
    level: "expert",
    source: { name: "Utsubo Blog", type: "media" },
    sourceUrl: "https://www.utsubo.com/blog/gaussian-splatting-guide",
    coverUrl: null,
    publishedAt: "2026-01-15",
    editorialNote: {
      zh: "解决了长期以来空间视频光照难以解绑与二次编辑的痛点，标志着离线渲染与高端 VFX 工业对高斯技术的彻底接纳。",
      en: "Addresses the pain point of uneditable lighting in spatial video, marking the total acceptance of Gaussian technology by professional offline rendering pipelines.",
    },
    verified: true,
    sources: ["https://www.utsubo.com/blog/gaussian-splatting-guide"],
  },
  {
    id: "student-guide-2026",
    title: {
      zh: "2026 版空间计算：3D 捕获与高斯泼溅完全实战指南",
      en: "Gaussian Splatting: A Complete Student Guide to 3D Capture in 2026",
    },
    summary: {
      zh: "一篇面向学习者的系统性长文，深度解析了 3DGS 最新底层逻辑、硬件扫描策略，以及 Scaniverse 等移动端前沿工具链的实战避坑经验。",
      en: "A comprehensive guide for learners breaking down 3DGS logic, hardware scanning strategies, and practical workflows using mobile tools like Scaniverse.",
    },
    category: "community",
    tags: ["tutorial", "capture"],
    level: "beginner",
    source: { name: "Medium", type: "media" },
    sourceUrl:
      "https://medium.com/@Jamesroha/gaussian-splatting-a-complete-student-guide-to-3d-capture-in-2026-1195a6265870",
    coverUrl: null,
    publishedAt: "2026-02-13",
    editorialNote: {
      zh: "摒弃了繁冗的数学推导，直接面向内容产出环节，是我们极力推荐给非技术背景空间创作者的通识阅读材料。",
      en: "Skipping tedious math in favor of actual content creation, it's a highly recommended general reading for spatial creators from non-technical backgrounds.",
    },
    verified: true,
    sources: [
      "https://medium.com/@Jamesroha/gaussian-splatting-a-complete-student-guide-to-3d-capture-in-2026-1195a6265870",
    ],
  },
  {
    id: "3d-pointillism-art",
    title: {
      zh: "3D 点彩画派：打破透视的生成艺术与高斯交互装置",
      en: "3D Pointillism: Generative Art and Gaussian Interactive Installations Breaking Perspectives",
    },
    summary: {
      zh: "通过魔改 3DGS 优化函数，以多视角 AI 平面画作为方向约束，使用各向同性点阵构建出随观察视角剧烈变幻的 3D 点彩立体网络艺术。",
      en: "Modifies 3DGS optimization using multi-view AI artwork as constraints to build dynamic 3D pointillist installations that dramatically shift with viewing angles.",
    },
    category: "art",
    tags: ["cultural_heritage", "viewing"],
    level: "intermediate",
    source: { name: "Gaussian Splatting Art", type: "official_website" },
    sourceUrl: "https://www.3dpoint.art/",
    coverUrl: null,
    publishedAt: "2025-11-15",
    editorialNote: {
      zh: "巧妙突破了 3DGS 仅用于「完美复刻现实」的刻板印象，罕见地展现了其作为一种原生数字艺术表现媒介的巨大张力。",
      en: "Cleverly breaks the stereotype of 3DGS as a mere reality replication tool, revealing its immense power as a native digital medium for artistic expression.",
    },
    verified: false,
    sources: ["https://www.3dpoint.art/"],
  },
  {
    id: "superman-3dgs-motion-picture",
    title: {
      zh: "《超人》成为首部应用动态高斯资产量产的好莱坞长片",
      en: "Superman Becomes First Hollywood Feature to Ship with Dynamic Gaussian Splatting",
    },
    summary: {
      zh: "项目在虚拟制作中大规模引入动态 3DGS 技术，用以解决传统体积视频难以胜任的毛发细节与高反光复杂材质问题，构筑真实场景资产。",
      en: "The production widely integrates dynamic 3DGS to resolve hair details and reflective materials that challenge traditional volumetric video, building hyper-real assets.",
    },
    category: "art",
    tags: ["spatial_media", "case_study"],
    level: "intermediate",
    source: { name: "Utsubo Blog", type: "media" },
    sourceUrl: "https://www.utsubo.com/blog/gaussian-splatting-guide",
    coverUrl: null,
    publishedAt: "2026-01-15",
    editorialNote: {
      zh: "标志着空间视频技术在好莱坞顶级工业流水线上的成功商业化，为大制作环境下的虚实融合确立了全新标杆。",
      en: "Marks the successful commercialization of spatial video within a top-tier Hollywood pipeline, setting a new benchmark for virtual-physical integration in blockbusters.",
    },
    verified: true,
    sources: ["https://www.utsubo.com/blog/gaussian-splatting-guide"],
  },
  {
    id: "fastgs-training-100-seconds",
    title: {
      zh: "FastGS：多视图一致性驱动的 3DGS 训练加速",
      en: "FastGS: Multi-View-Consistent Acceleration for 3D Gaussian Splatting Training",
    },
    summary: {
      zh: "以多视图渲染质量为导向设计稠密化与剪枝，在静态与动态等任务上显著缩短训练时间，同时保持与主流方法可比的新视图合成质量。",
      en: "Introduces densification and pruning guided by multi-view reconstruction quality, cutting training time across static and dynamic tasks while matching strong NVS baselines.",
    },
    category: "paper",
    tags: ["paper", "training", "optimization"],
    level: "expert",
    source: { name: "arXiv", type: "arxiv" },
    sourceUrl: "https://arxiv.org/abs/2511.04283",
    coverUrl: null,
    publishedAt: "2025-11-06",
    editorialNote: {
      zh: "论文在公开页面给出与 DashGaussian 等方法的训练时长对比表，便于对照自家管线评估是否值得替换稠密化策略。",
      en: "The project page and paper tables compare wall-clock training time against strong baselines, useful for teams benchmarking densification changes.",
    },
    verified: true,
    sources: [
      "https://arxiv.org/abs/2511.04283",
      "https://fastgs.github.io/",
    ],
  },
  {
    id: "yonosplat-feedforward-model",
    title: {
      zh: "YoNoSplat：任意视角数的前馈 3D 高斯重建",
      en: "YoNoSplat: Feedforward 3D Gaussian Splatting for Arbitrary View Counts",
    },
    summary: {
      zh: "单模型同时支持有姿态与无姿态、有标定与无标定输入，并以混合式训练缓解位姿与几何耦合带来的不稳定与曝光偏差。",
      en: "One feedforward model handles posed or unposed, calibrated or uncalibrated inputs, using a mix-forcing curriculum to stabilize joint pose and Gaussian learning.",
    },
    category: "paper",
    tags: ["paper", "capture", "real_time"],
    level: "expert",
    source: { name: "arXiv", type: "arxiv" },
    sourceUrl: "https://arxiv.org/abs/2511.07321",
    coverUrl: null,
    publishedAt: "2025-11-10",
    editorialNote: {
      zh: "适合关注「免逐场景优化」路线的读者：文中有无位姿与有位姿设定下的基准对比，便于判断前馈模型能否覆盖你的采集条件。",
      en: "Useful for teams exploring feedforward 3DGS: benchmarks cover pose-free and pose-conditioned regimes so you can map results to your capture constraints.",
    },
    verified: true,
    sources: [
      "https://arxiv.org/abs/2511.07321",
      "https://botaoye.github.io/yonosplat/",
    ],
  },
  {
    id: "gaussian-blending-intra-pixel-alpha",
    title: {
      zh: "Gaussian Blending：像素内分布式的 Alpha 与透射率",
      en: "Gaussian Blending: Spatially Varying Alpha and Transmittance in 3DGS",
    },
    summary: {
      zh: "将像素内 alpha 与透射率建模为空间变化分布，以缓解缩放采样率时的侵蚀模糊与膨胀台阶伪影，并可作为现有渲染核的即插即用替换。",
      en: "Models alpha and transmittance as spatial distributions within pixels to reduce zoom-in blur and zoom-out stair artifacts at unseen sampling rates, as a drop-in rasterizer change.",
    },
    category: "paper",
    tags: ["paper", "real_time", "optimization"],
    level: "expert",
    source: { name: "arXiv", type: "arxiv" },
    sourceUrl: "https://arxiv.org/abs/2511.15102",
    coverUrl: null,
    publishedAt: "2025-11-19",
    editorialNote: {
      zh: "若你的工作流需要在不同分辨率或变焦下复用同一套高斯资产，该文从混合方程层面解释伪影来源，并给出可替换渲染核的实现线索。",
      en: "If you render the same splat asset across resolutions or zoom levels, the paper isolates blending limitations and points to a kernel-level fix without retraining scenes.",
    },
    verified: true,
    sources: [
      "https://arxiv.org/abs/2511.15102",
      "https://github.com/1207koo/gaussian_blending",
    ],
  },
  {
    id: "ibgs-image-based-gaussian-splatting",
    title: {
      zh: "IBGS：用训练图像残差补全高斯渲染细节",
      en: "IBGS: Image-Based Gaussian Splatting with View-Specific Residuals",
    },
    summary: {
      zh: "在标准球谐颜色之外，从邻近训练视图预测颜色残差以恢复高频与镜面项，并引入曝光校正以缓解多视图曝光不一致。",
      en: "Adds a learned residual from neighboring training views on top of SH colors for high-frequency and specular detail, plus exposure correction for inconsistent captures.",
    },
    category: "paper",
    tags: ["paper", "optimization", "viewing"],
    level: "expert",
    source: { name: "arXiv", type: "arxiv" },
    sourceUrl: "https://arxiv.org/abs/2511.14357",
    coverUrl: null,
    publishedAt: "2025-11-18",
    editorialNote: {
      zh: "当场景镜面与高亮细节难以用低阶 SH 表达时，该文给出在不大增存储的前提下借用源视图像素的路线，可与压缩或剪枝工作正交叠加。",
      en: "For shiny scenes where SH struggle, the paper borrows pixels from training views via residuals without exploding storage, complementing compression-focused splat pipelines.",
    },
    verified: true,
    sources: [
      "https://arxiv.org/abs/2511.14357",
      "https://hoangchuongnguyen.github.io/ibgs/",
    ],
  },
  {
    id: "cesium-3dgs-hierarchical-lod-3d-tiles",
    title: {
      zh: "Cesium 为 3DGS 带来分层 LOD 与 3D Tiles 流式",
      en: "Cesium Ships Hierarchical LOD for 3D Gaussian Splats via 3D Tiles",
    },
    summary: {
      zh: "在 CesiumJS、Cesium for Unreal 与 ion 上串联 3D Tiles 空间索引与 glTF 载荷，使城市尺度高斯场景可按距离渐进加载细节。",
      en: "Streams massive splat tilesets through 3D Tiles plus glTF payloads across CesiumJS, Cesium for Unreal, and ion so city-scale splats refine with distance.",
    },
    category: "tool",
    tags: ["web_rendering", "publishing", "outdoor"],
    level: "intermediate",
    source: { name: "Cesium", type: "official_website" },
    sourceUrl: "https://cesium.com/blog/2026/04/27/3d-gaussian-splats-lod/",
    coverUrl: null,
    publishedAt: "2026-04-27",
    editorialNote: {
      zh: "面向数字孪生与测绘交付的读者：同一文也概述与 Khronos、OGC、行业伙伴在 glTF 扩展与 SPZ 压缩上的协同，便于评估互操作性路线。",
      en: "For geospatial and twin pipelines, the post also ties LOD shipping to glTF extensions and SPZ compression work with Khronos and OGC, clarifying interoperability context.",
    },
    verified: true,
    sources: [
      "https://cesium.com/blog/2026/04/27/3d-gaussian-splats-lod/",
      "https://radiancefields.com/cesium-adds-hierarchical-lod-for-gaussian-splats-to-3d-tiles-cesiumjs-and-cesium-for-unreal",
    ],
  },
  {
    id: "babylon-js-9-advanced-gaussian-splat",
    title: {
      zh: "Babylon.js 9.0：多格式与进阶高斯泼溅能力",
      en: "Babylon.js 9.0 Brings Advanced Gaussian Splatting and More Formats",
    },
    summary: {
      zh: "新版本扩展 Web 端高斯工作流：多格式导入、三角泼溅、阴影与多资产全局排序，并支持程序化创建与导出 splat 数据。",
      en: "Expands web splat workflows with multi-format imports, triangular splatting, shadows, global sorting across assets, and APIs to create or export splat data.",
    },
    category: "tool",
    tags: ["web_rendering", "editing", "real_time"],
    level: "intermediate",
    source: { name: "Windows Developer Blog", type: "media" },
    sourceUrl:
      "https://blogs.windows.com/windowsdeveloper/2026/03/26/announcing-babylon-js-9-0/",
    coverUrl: null,
    publishedAt: "2026-03-26",
    editorialNote: {
      zh: "已在 Babylon 7 使用高斯的团队可直接对照官方 Advanced Gaussian Splat Support 小节列出的格式与合成排序行为，评估升级对现有脚本的影响。",
      en: "Teams already on Babylon splats can diff the Advanced Gaussian Splat Support section against 7.x to see new formats, sorting, and compositing changes before upgrading.",
    },
    verified: true,
    sources: [
      "https://blogs.windows.com/windowsdeveloper/2026/03/26/announcing-babylon-js-9-0/",
      "https://forum.babylonjs.com/t/welcome-to-babylon-js-9-0/62940",
    ],
  },
  {
    id: "nuke-17-native-gaussian-splats",
    title: {
      zh: "Nuke 17：合成流程内原生高斯泼溅",
      en: "Nuke 17.0 Adds Native Gaussian Splat Workflows in Compositing",
    },
    summary: {
      zh: "在 Hydra 三维视图中导入、编辑并渲染高斯数据，配套 SplatRender、深度与运动模糊输出，并与新的 USD 场景图工具链协同。",
      en: "Import, manipulate, and render splats inside Nuke with SplatRender, depth and motion blur outputs, alongside the shipped USD-based 3D system.",
    },
    category: "tool",
    tags: ["editing", "spatial_media", "publishing"],
    level: "intermediate",
    source: { name: "DIGITAL PRODUCTION", type: "media" },
    sourceUrl:
      "https://digitalproduction.com/2026/02/26/nuke-17-0-rewires-3d-and-adds-gaussian-splats/",
    coverUrl: null,
    publishedAt: "2026-02-26",
    editorialNote: {
      zh: "影视合成读者可关注文内对 GeoImport、SplatRender 与 Field 节点组合的说明，用以判断 splat 元素能否接入现有 USD 灯光与遮罩流程。",
      en: "For film compositing, coverage details how splats flow through GeoImport, SplatRender, and field nodes so you can test them against USD lighting and masking habits.",
    },
    verified: true,
    sources: [
      "https://digitalproduction.com/2026/02/26/nuke-17-0-rewires-3d-and-adds-gaussian-splats/",
      "https://www.redsharknews.com/foundry-nuke-17-gaussian-splat-usd-3d-system",
    ],
  },
  {
    id: "world-labs-spark-2-streaming-3dgs",
    title: {
      zh: "Spark 2.0：浏览器端可流式加载的大规模 3DGS",
      en: "Spark 2.0 Streams Large 3D Gaussian Splat Worlds in the Browser",
    },
    summary: {
      zh: "开源 Spark 渲染器引入可流式 LOD，先加载低细节高斯再随视点补全，降低分享生成世界时的整包下载成本。",
      en: "The open Spark renderer adds streamable LOD so lower-detail splats load first and refine with movement, cutting full-asset downloads for shared worlds.",
    },
    category: "tool",
    tags: ["web_rendering", "publishing", "spatial_media"],
    level: "intermediate",
    source: { name: "VP Land", type: "media" },
    sourceUrl:
      "https://www.vp-land.com/p/world-labs-streams-3d-gaussian-splatting-worlds-on-the-web-with-spark-2-0",
    coverUrl: null,
    publishedAt: "2026-04-17",
    editorialNote: {
      zh: "适合需要把生成式世界以链接交付的预演与虚拟勘景流程：稿件强调从整包下载转向渐进加载对工作流评审的影响。",
      en: "For previz and location review, coverage focuses on replacing multi-gig downloads with progressive streaming so stakeholders can open a URL faster.",
    },
    verified: true,
    sources: [
      "https://www.vp-land.com/p/world-labs-streams-3d-gaussian-splatting-worlds-on-the-web-with-spark-2-0",
      "https://gameenginehub.com/insights/spark-2-0-a-web-native-3d-world-runtime-built-on-gaussian-splatting",
    ],
  },
  {
    id: "world-labs-autodesk-200m-partnership",
    title: {
      zh: "World Labs 获 Autodesk 2 亿美元投资押注空间智能",
      en: "Autodesk Invests $200M in World Labs to Pair World Models with 3D Tools",
    },
    summary: {
      zh: "交易将 World Labs 总融资推至约 10 亿美元档，Autodesk 以战略顾问身份与初创公司在研究与模型层面协作，优先探索娱乐工作流。",
      en: "The deal is part of a roughly $1B round; Autodesk also advises World Labs while the pair explores entertainment-first world-model integrations with design software.",
    },
    category: "industry",
    tags: ["spatial_media", "case_study", "publishing"],
    level: "intermediate",
    source: { name: "TechCrunch", type: "media" },
    sourceUrl:
      "https://techcrunch.com/2026/02/18/world-labs-lands-200m-from-autodesk-to-bring-world-models-into-3d-workflows/",
    coverUrl: null,
    publishedAt: "2026-02-18",
    editorialNote: {
      zh: "关注空间生成模型与 CAD 工具链衔接的读者，可从报道引用的双方高管访谈了解数据共享边界与早期落地场景定位。",
      en: "Readers tracking generative world models plus CAD can use executive quotes on data-sharing boundaries and initial entertainment-focused collaborations.",
    },
    verified: true,
    sources: [
      "https://techcrunch.com/2026/02/18/world-labs-lands-200m-from-autodesk-to-bring-world-models-into-3d-workflows/",
      "https://www.constructiondive.com/news/autodesk-invests-world-labs-artificial-intelligence/813121/",
    ],
  },
  {
    id: "khronos-gltf-gaussian-uploadvr",
    title: {
      zh: "XR 媒体关注 Khronos 将高斯泼溅纳入 glTF 路线",
      en: "XR Press Tracks Khronos glTF Path for Standardized Gaussian Splats",
    },
    summary: {
      zh: "UploadVR 解释 glTF 作为 Web 与 XR 通用载体如何承载高斯原语，并引用联盟对 Release Candidate 与后续压缩扩展并行的计划。",
      en: "UploadVR outlines how glTF can carry splat primitives for XR delivery and notes Khronos plans a release candidate while compression extensions evolve in parallel.",
    },
    category: "industry",
    tags: ["publishing", "web_rendering", "spatial_media"],
    level: "intermediate",
    source: { name: "UploadVR", type: "media" },
    sourceUrl:
      "https://www.uploadvr.com/khronos-moves-to-integrate-gaussian-splatting-into-gltf-3d-format/",
    coverUrl: null,
    publishedAt: "2026-02-07",
    editorialNote: {
      zh: "需要向非图形背景的协作方解释「为何选 glTF」的读者，可直接引用文中对 glTF 普及度与跨设备分发问题的段落。",
      en: "Helpful when briefing producers on why glTF matters: the piece ties splat delivery to an already ubiquitous runtime format for browsers and XR clients.",
    },
    verified: true,
    sources: [
      "https://www.uploadvr.com/khronos-moves-to-integrate-gaussian-splatting-into-gltf-3d-format/",
      "https://radiancefields.com/the-khronos-group-introduces-a-gltf-baseline-for-gaussian-splatting",
    ],
  },
  {
    id: "playcanvas-supersplat-studio-launch",
    title: {
      zh: "SuperSplat Studio：把高斯场景做成可导览叙事",
      en: "SuperSplat Studio Turns Published Splats into Guided Experiences",
    },
    summary: {
      zh: "独立报道总结 Studio 在浏览器内叠加热点叙事、镜头跳转与实时后效，使高斯资产从静态托管走向结构化讲解与展示。",
      en: "Coverage summarizes Studio features—hotspot storytelling, camera jumps, and live post effects—that move splats from static hosting to guided presentations.",
    },
    category: "industry",
    tags: ["publishing", "web_rendering", "tutorial"],
    level: "beginner",
    source: { name: "Radiance Fields", type: "media" },
    sourceUrl: "https://radiancefields.com/playcanvas-announces-supersplat-studio",
    coverUrl: null,
    publishedAt: "2026-02-11",
    editorialNote: {
      zh: "面向教育、展陈与产品讲解场景，可先对照 Radiance Fields 对注解流程的归纳，再回到 PlayCanvas 博文核对操作路径与限制。",
      en: "For education and exhibit storytelling, start with the editorial recap of annotation flows, then cross-check the PlayCanvas post for exact authoring steps.",
    },
    verified: true,
    sources: [
      "https://radiancefields.com/playcanvas-announces-supersplat-studio",
      "https://blog.playcanvas.com/build-gaussian-splat-experiences-with-supersplat-studio",
    ],
  },
  {
    id: "geo-week-2026-gaussian-sessions",
    title: {
      zh: "Geo Week 2026 预览：高斯泼溅进入 AEC 议程",
      en: "Geo Week 2026 Preview: Gaussian Splatting Sessions for AEC and GIS",
    },
    summary: {
      zh: "会前文章列出两场围绕辐射场与高斯泼溅的圆桌与小组讨论，并公布 NVIDIA、Esri、Cesium 等机构讲者的分工。",
      en: "A pre-event post outlines two conference sessions on radiance fields and Gaussian splatting, naming speakers from NVIDIA, Esri, Cesium, and practitioners.",
    },
    category: "community",
    tags: ["tutorial", "outdoor", "interview"],
    level: "intermediate",
    source: { name: "Radiance Fields", type: "media" },
    sourceUrl: "https://radiancefields.com/gaussian-splatting-at-geo-week-2026",
    coverUrl: null,
    publishedAt: "2026-02-09",
    editorialNote: {
      zh: "关注地理空间与施工数字化落地的读者可用该文快速定位官方议程链接，按需注册或回看同一主题的后续投稿。",
      en: "Geospatial readers can use it as a shortcut to the official Geo Week session pages for splat-focused panels before hunting for recordings or slides.",
    },
    verified: true,
    sources: [
      "https://radiancefields.com/gaussian-splatting-at-geo-week-2026",
      "https://www.geo-week.com/session/ai-gaussian-splatting-and-what-comes-next/",
    ],
  },
  {
    id: "radiancefields-newsletter-mar-2026",
    title: {
      zh: "Radiance Fields 月刊：汇总 2 月高斯生态热点",
      en: "Radiance Fields Newsletter Recaps February 2026 Splat Ecosystem Moves",
    },
    summary: {
      zh: "通讯串联米兰冬奥现场 splat 应用、工具链更新、标准化进展与 World Labs 等平台的融资与产品动态，并附研究代码索引。",
      en: "The issue links Olympic splat usage, toolchain updates, standards work, and platform news such as World Labs funding, plus a curated research and code index.",
    },
    category: "community",
    tags: ["tutorial", "paper", "interview"],
    level: "beginner",
    source: { name: "Radiance Fields Newsletter", type: "media" },
    sourceUrl:
      "https://radiancefields.substack.com/p/gaussian-splatting-in-february-2026",
    coverUrl: null,
    publishedAt: "2026-03-03",
    editorialNote: {
      zh: "适合作为月度补课入口：可先浏览目录式段落再跳转到 Radiance Fields 站内长文核对单条线索。",
      en: "Works as a monthly catch-up index: skim the sections, then open the linked Radiance Fields articles for deeper verification of each thread.",
    },
    verified: true,
    sources: [
      "https://radiancefields.substack.com/p/gaussian-splatting-in-february-2026",
      "https://radiancefields.com/world-labs-raises-1-billion-in-new-fundraising-round",
    ],
  },
  {
    id: "dne-gracia-4dgs-streaming-performance",
    title: {
      zh: "DNE 与 Gracia 上线 4 分钟可流式 4DGS 演出",
      en: "DNE and Gracia Ship a Four-Minute Streamable 4DGS Performance",
    },
    summary: {
      zh: "洛杉矶容积团队以 4D 高斯重建歌手 Amy May 的演出，并在浏览器内以 WebGPU 实时流式播放，面向桌面、移动与 Quest 3。",
      en: "A volumetric capture team rebuilt a four-minute performance as 4D Gaussian splats, streaming it in real time over WebGPU to desktop, mobile, and Quest 3 browsers.",
    },
    category: "art",
    tags: ["spatial_media", "case_study", "viewing"],
    level: "intermediate",
    source: { name: "CG Channel", type: "media" },
    sourceUrl:
      "https://www.cgchannel.com/2026/04/dne-and-gracia-release-4-minute-streamable-4dgs-performance/",
    coverUrl: null,
    publishedAt: "2026-04-27",
    editorialNote: {
      zh: "关注实时演出与比特率数据的读者可直接对照稿件中给出的 Mbps 区间与播放平台列表，评估网络分发假设。",
      en: "Teams planning live splat streaming can compare the article bitrate range and listed client platforms against their own CDN assumptions.",
    },
    verified: true,
    sources: [
      "https://www.cgchannel.com/2026/04/dne-and-gracia-release-4-minute-streamable-4dgs-performance/",
      "https://gracia.ai/store/creator/DNE/9ee301ea-fcd4-4041-b82e-ee3c1c461352",
    ],
  },
  {
    id: "milan-clubhouse-26-gaussian-archive",
    title: {
      zh: "米兰冬奥 Clubhouse 展陈的高斯数字存档",
      en: "A Gaussian Splat Archive of the Milano Cortina Clubhouse 26 Exhibition",
    },
    summary: {
      zh: "独立报道记录艺术家在限时奥运文化空间内完成高斯采集，并在浏览器中还原奖章与海报叙事动线，以弥补闭幕后公共影像稀缺的问题。",
      en: "Coverage follows an artist capturing a temporary Olympic heritage exhibition as splats so medal and poster narratives stay explorable after teardown.",
    },
    category: "art",
    tags: ["cultural_heritage", "spatial_media", "capture"],
    level: "intermediate",
    source: { name: "Radiance Fields", type: "media" },
    sourceUrl: "https://radiancefields.com/the-olympic-exhibition-that-almost-disappeared",
    coverUrl: null,
    publishedAt: "2026-04-01",
    editorialNote: {
      zh: "策展与档案读者可关注文内对展线空间关系与临时展陈记录空白的讨论，再打开 Nucleus4D 体验核对交互范围。",
      en: "Curatorial readers can pair the essay on spatial storytelling with the live Nucleus4D walkthrough to see which exhibit sequences survived in splat form.",
    },
    verified: true,
    sources: [
      "https://radiancefields.com/the-olympic-exhibition-that-almost-disappeared",
      "https://portal.nucleus4d.com/josetteseitz_gmail_com/milan-cortina-olympic-museum",
    ],
  },
  {
    id: "cn-parkgaussian-parking",
    title: {
      zh: "ParkGaussian：面向自动泊车的环视 3D 高斯泼溅重建",
      en: "ParkGaussian: Surround-view 3D Gaussian Splatting for Autonomous Parking",
    },
    summary: {
      zh: "提出泊车场景数据集 ParkRecon3D 与槽位感知重建策略，将 3DGS 与环视鱼眼数据结合以兼顾观感与下游车位检测一致性。",
      en: "Introduces the ParkRecon3D benchmark and a slot-aware reconstruction strategy combining 3DGS with surround fisheye data for perception-aligned parking scenes.",
    },
    category: "paper",
    tags: ["paper", "slam", "capture"],
    level: "expert",
    source: { name: "arXiv", type: "arxiv" },
    sourceUrl: "https://arxiv.org/abs/2601.01386",
    coverUrl: null,
    publishedAt: "2026-01-04",
    editorialNote: {
      zh: "摘要写明约 4 万帧多相机数据与约 6 万组车位标注；可与 GitHub 项目页交叉核对开放进度。",
      en: "The abstract cites on the order of 40k multi-camera frames and 60k parking-slot labels; cross-check the GitHub page for release status.",
    },
    verified: true,
    sources: [
      "https://arxiv.org/abs/2601.01386",
      "https://github.com/wm-research/ParkGaussian",
    ],
  },
  {
    id: "cn-gsprior-tsinghua-surface",
    title: {
      zh: "GSPrior：自约束先验助力 3DGS 高保真表面重建",
      en: "GSPrior: Self-Constrained Priors for High-Fidelity Surface Reconstruction with 3DGS",
    },
    summary: {
      zh: "用当前高斯渲染深度融合为 TSDF 带域，在带内施加几何感知约束并随优化收紧带宽，以改善纯 RGB 监督下的表面精度。",
      en: "Fuses rendered depths into a TSDF band prior and applies geometry-aware Gaussian constraints that tighten as optimization progresses.",
    },
    category: "paper",
    tags: ["paper", "optimization"],
    level: "expert",
    source: { name: "arXiv", type: "arxiv" },
    sourceUrl: "https://arxiv.org/abs/2603.19682",
    coverUrl: null,
    publishedAt: "2026-03-20",
    editorialNote: {
      zh: "适合对照项目页中的可视化与基准列表核实摘要中的方法边界，再决定是否精读全文。",
      en: "Use the project page visuals and benchmark pointers to sanity-check claims before a deep read.",
    },
    verified: true,
    sources: [
      "https://arxiv.org/abs/2603.19682",
      "https://takeshie.github.io/GSPrior/",
    ],
  },
  {
    id: "cn-habitat-gs-zju-simulator",
    title: {
      zh: "Habitat-GS：集成 3D 高斯场景与可驱动高斯化身的导航模拟器",
      en: "Habitat-GS: A Navigation Simulator with 3DGS Scenes and Gaussian Avatars",
    },
    summary: {
      zh: "在 Habitat 生态内接入 3DGS 渲染与预烘焙线性混合蒙皮的高斯化身，并以代理胶囊写入 NavMesh，支持带动态行人障碍的导航实验。",
      en: "Embeds 3DGS rendering into Habitat with pre-baked LBS gaussian avatars and proxy capsules on the NavMesh for human-aware navigation studies.",
    },
    category: "paper",
    tags: ["paper", "slam"],
    level: "expert",
    source: { name: "arXiv", type: "arxiv" },
    sourceUrl: "https://arxiv.org/abs/2604.12626",
    coverUrl: null,
    publishedAt: "2026-04-14",
    editorialNote: {
      zh: "科技行者稿中写明预印本上传日期与论文编号，可先扫该文再回论文核对实验设置与机构列表。",
      en: "The Techwalker piece cites the preprint upload date and arXiv id—use it as a bridge before diving into the PDF.",
    },
    verified: true,
    sources: [
      "https://arxiv.org/abs/2604.12626",
      "https://www.techwalker.com/2026/0422/3184813.shtml",
    ],
  },
  {
    id: "cn-xgrids-lcc2-infra",
    title: {
      zh: "其域 LCC2：面向大规模 3DGS 的流式与压缩管线（媒体报道）",
      en: "XGRIDS LCC2: Streaming and Compression Stack for Large-Scale 3DGS (Press Coverage)",
    },
    summary: {
      zh: "量子位长文将其域 LCC2 描述为面向城市级数据的编解码与双轨 LOD 组织，并给出相对传统 PLY 体量的比例级描述。",
      en: "QbitAI describes LCC2 as dual-track LOD streaming and codec decoupling for city-scale splats, citing an order-of-magnitude size ratio versus classic PLY assets.",
    },
    category: "tool",
    tags: ["publishing", "viewing", "spatial_media"],
    level: "intermediate",
    source: { name: "量子位", type: "media" },
    sourceUrl: "https://www.qbitai.com/2026/04/408030.html",
    coverUrl: null,
    publishedAt: "2026-04-27",
    editorialNote: {
      zh: "稿件称 LCC2 将数据体量压到约传统 PLY 的 8% 并强调双轨 LOD；建议与自家业务场景下的实测加载曲线对照阅读。",
      en: "The article cites ~8% of classic PLY size and dual-track LOD—validate against your own load tests for comparable scenes.",
    },
    verified: true,
    sources: [
      "https://www.qbitai.com/2026/04/408030.html",
      "http://finance.sina.com.cn/stock/t/2026-04-27/doc-inhvxtqy9043050.shtml",
    ],
  },
  {
    id: "cn-moore-litgs-opensource",
    title: {
      zh: "摩尔线程 LiteGS：SIGGRAPH Asia 3DGS 挑战赛银奖与开源训练库",
      en: "Moore Threads LiteGS: SIGGRAPH Asia 3DGS Challenge Silver and Open Training Stack",
    },
    summary: {
      zh: "媒体报道其在 60 秒重建约束赛中取得银牌并开源 LiteGS；文内给出平均 PSNR、耗时与相对基线的训练加速区间。",
      en: "Coverage reports a silver medal under the 60-second reconstruction track and open-sources LiteGS, citing PSNR, wall-clock time, and training speedup ranges.",
    },
    category: "tool",
    tags: ["training", "optimization"],
    level: "intermediate",
    source: { name: "量子位", type: "media" },
    sourceUrl: "https://www.qbitai.com/2025/12/361555.html",
    coverUrl: null,
    publishedAt: "2025-12-17",
    editorialNote: {
      zh: "交叉核对稿内数字：平均 PSNR 约 27.58、重建耗时约 34 秒，并打开 GitHub 仓库确认许可证与依赖。",
      en: "Cross-check the quoted PSNR (~27.58) and ~34s reconstruction time, then verify the GitHub license and dependencies.",
    },
    verified: true,
    sources: [
      "https://www.qbitai.com/2025/12/361555.html",
      "https://finance.sina.com.cn/roll/2025-12-17/doc-inhcazqi7457476.shtml",
      "https://github.com/MooreThreads/LiteGS",
    ],
  },
  {
    id: "cn-bytedance-seed3d2-release",
    title: {
      zh: "字节跳动发布 Seed3D 2.0：几何与 PBR 材质生成升级并上线火山引擎",
      en: "ByteDance Ships Seed3D 2.0 with Geometry and PBR Upgrades on Volcano Engine",
    },
    summary: {
      zh: "IT 之家与网易等报道称新版本采用 Coarse-to-Fine 两阶段策略与 MoE，并公布人类盲评与偏好率等评测描述；API 挂载在火山方舟视觉模型入口。",
      en: "Chinese outlets describe a coarse-to-fine two-stage stack with MoE, human preference stats, and Volcano Engine API entry points for the new release.",
    },
    category: "tool",
    tags: ["publishing", "spatial_media"],
    level: "intermediate",
    source: { name: "IT之家", type: "media" },
    sourceUrl: "https://www.ithome.com/0/942/492.htm",
    coverUrl: null,
    publishedAt: "2026-04-23",
    editorialNote: {
      zh: "可先记录稿中给出的偏好率区间与评测拆分方式，再打开技术报告核对任务定义与基线列表。",
      en: "Capture the reported preference rates and split between geometry vs textured runs, then verify tasks and baselines in the technical report.",
    },
    verified: true,
    sources: [
      "https://www.ithome.com/0/942/492.htm",
      "https://www.163.com/dy/article/KR7IEBA80519DFFO.html",
    ],
  },
  {
    id: "cn-zhuma-innovation-angel-round",
    title: {
      zh: "竹马创新完成数千万天使轮融资（消费级 3DGS 终端方向）",
      en: "Zhuma Innovation Closes an Angel Round for Consumer 3DGS Hardware",
    },
    summary: {
      zh: "投资界与新浪科技等称本轮由峰瑞资本领投、洪泰基金跟投，资金用于研发与首代 Pebble 量产准备；公司公开材料强调以 3DGS 为核心路线。",
      en: "Pedaily and Sina Tech report Fengrui leading, Hongtai following, with spend aimed at R&D and first-gen Pebble manufacturing; filings emphasize a 3DGS-first roadmap.",
    },
    category: "industry",
    tags: ["spatial_media", "case_study"],
    level: "intermediate",
    source: { name: "投资界", type: "media" },
    sourceUrl: "https://news.pedaily.cn/202603/561959.shtml",
    coverUrl: null,
    publishedAt: "2026-03-23",
    editorialNote: {
      zh: "用两家媒体交叉核对资方与财务顾问信息，再把稿中「数千万」与产品代号与工商或后续公告对齐。",
      en: "Cross-check investors and FA names across outlets, then align the vague amount and codename with future filings.",
    },
    verified: true,
    sources: [
      "https://news.pedaily.cn/202603/561959.shtml",
      "https://finance.sina.com.cn/tech/roll/2026-03-23/doc-inhryhiv4155914.shtml",
    ],
  },
  {
    id: "cn-xgrids-nab-product-2026",
    title: {
      zh: "其域灵视 P1 获 NAB Show 2026 多类别年度产品奖（中文报道）",
      en: "XGRIDS LingShi P1 Wins Multiple NAB Show 2026 Product of the Year Categories",
    },
    summary: {
      zh: "京报网与界面新闻等称灵视 P1 在智能技术、图形与视效、摄影设备、远程制作四类同时获奖，并列举与 Adobe、索尼等厂商同场提名背景。",
      en: "Beijing Daily and Jiemian report four simultaneous Product of the Year wins for LingShi P1, naming peer nominees such as Adobe and Sony.",
    },
    category: "industry",
    tags: ["spatial_media", "case_study"],
    level: "intermediate",
    source: { name: "京报网", type: "media" },
    sourceUrl: "https://news.bjd.com.cn/2026/04/27/11713082.shtml",
    coverUrl: null,
    publishedAt: "2026-04-27",
    editorialNote: {
      zh: "先记录稿中四类别名称与提名竞品列表，再向 NAB Show 官方奖项页核对类目拼写与最终名单。",
      en: "Log the four category labels and nominee list, then verify spelling and finals on the official NAB awards pages.",
    },
    verified: true,
    sources: [
      "https://news.bjd.com.cn/2026/04/27/11713082.shtml",
      "https://www.jiemian.com/article/14317185.html",
    ],
  },
  {
    id: "cn-bilibili-3dgeer-iclr",
    title: {
      zh: "B 站技术讲解：ICLR 2026 录用论文 3DGEER 与通用相机高斯渲染",
      en: "Bilibili Walkthrough: 3DGEER (ICLR 2026) and Exact Gaussian Rendering for General Cameras",
    },
    summary: {
      zh: "公开视频概述 3DGEER 针对广角与鱼眼相机的射线积分推导，并给出 arXiv 与开源仓库链接，适合作为非英语读者的入口。",
      en: "A public Mandarin video summarizes 3DGEER’s ray–Gaussian integral for wide and fisheye cameras and links the arXiv paper and code.",
    },
    category: "community",
    tags: ["tutorial", "paper"],
    level: "intermediate",
    source: { name: "b 站", type: "bilibili" },
    sourceUrl: "https://www.bilibili.com/video/BV1x49pBrESu/",
    coverUrl: null,
    publishedAt: "2026-04-02",
    editorialNote: {
      zh: "可将视频中的论文编号与录用会议和 arXiv 页逐项对齐，再决定是否跟读代码仓库。",
      en: "Line up the cited arXiv id and venue claims with the abstract page before diving into the code.",
    },
    verified: true,
    sources: [
      "https://www.bilibili.com/video/BV1x49pBrESu/",
      "https://arxiv.org/abs/2505.24053",
    ],
  },
  {
    id: "cn-techwalker-habitat-gs-report",
    title: {
      zh: "科技行者长文解读 Habitat-GS：3DGS 场景与高斯化身进入导航训练",
      en: "Techwalker Feature: Habitat-GS Blends 3DGS Scenes and Gaussian Avatars for Navigation Training",
    },
    summary: {
      zh: "报道用通俗语言整理 CUDA–OpenGL 零拷贝、线性混合蒙皮高斯化身与胶囊障碍注入 NavMesh 等工程要点，并引用论文编号。",
      en: "The feature explains CUDA–OpenGL interop, LBS gaussian avatars, and capsule obstacles on the NavMesh while citing the arXiv identifier.",
    },
    category: "community",
    tags: ["tutorial", "paper"],
    level: "intermediate",
    source: { name: "科技行者", type: "media" },
    sourceUrl: "https://www.techwalker.com/2026/0422/3184813.shtml",
    coverUrl: null,
    publishedAt: "2026-04-22",
    editorialNote: {
      zh: "适合快速建立对系统模块的直觉，再回论文核对数值实验与硬件假设是否一致。",
      en: "Use it for an intuitive map of subsystems, then return to the PDF for quantitative experiments and hardware assumptions.",
    },
    verified: true,
    sources: [
      "https://www.techwalker.com/2026/0422/3184813.shtml",
      "https://arxiv.org/abs/2604.12626",
    ],
  },
  {
    id: "paper-depth-any-panoramas-insta360",
    title: {
      zh: "Insta360 团队发布全景深度基础模型 Depth Any Panoramas",
      en: "Insta360 Research Ships Depth Any Panoramas Foundation Model",
    },
    summary: {
      zh: "arXiv 论文与项目页将方法定位为面向等距矩形全景的单目深度基础模型，并开放权重与代码仓库，便于与 3DGS 捕获链路中的全景预处理衔接。",
      en: "The arXiv preprint and project site pitch a foundation model for equirectangular panoramas with released weights and code for depth prep ahead of splat pipelines.",
    },
    category: "paper",
    tags: ["paper", "spatial_media"],
    level: "expert",
    source: { name: "arXiv", type: "arxiv" },
    sourceUrl: "https://arxiv.org/abs/2512.16913",
    coverUrl: null,
    publishedAt: "2025-12-19",
    editorialNote: {
      zh: "先读摘要中的任务定义与训练数据范围，再对照项目页 Demo 与 GitHub 推理脚本核对输入分辨率约定。",
      en: "Read the abstract for task scope, then align demo inputs and GitHub inference defaults on resolution.",
    },
    verified: true,
    sources: [
      "https://arxiv.org/abs/2512.16913",
      "https://insta360-research-team.github.io/DAP_website/",
      "https://github.com/Insta360-Research-Team/DAP",
    ],
  },
  {
    id: "tool-google-antigravity-agentic-ide",
    title: {
      zh: "Google 发布 Antigravity 代理式开发环境公开预览",
      en: "Google Launches Antigravity Agentic IDE in Public Preview",
    },
    summary: {
      zh: "Google Developers Blog 与 Antigravity 官方博客将产品描述为面向多代理编排与工件验证的下一代开发界面，并与 2025 年 11 月更大一轮 Gemini 产品更新并列发布。",
      en: "Google Developers Blog and the Antigravity site describe an agent-first IDE emphasizing multi-agent orchestration and artifact checks alongside the November 2025 Gemini rollout.",
    },
    category: "tool",
    tags: ["generation", "tutorial"],
    level: "intermediate",
    source: { name: "Google Developers Blog", type: "official_website" },
    sourceUrl: "https://developers.googleblog.com/build-with-google-antigravity-our-new-agentic-development-platform/",
    coverUrl: null,
    publishedAt: "2025-11-18",
    editorialNote: {
      zh: "下载入口务必核对顶级域名为 antigravity.google；第三方缩写稿容易漏写代理权限边界。",
      en: "Verify the antigravity.google origin for downloads; third-party summaries often omit agent permission boundaries.",
    },
    verified: true,
    sources: [
      "https://developers.googleblog.com/build-with-google-antigravity-our-new-agentic-development-platform/",
      "https://antigravity.google/blog/introducing-google-antigravity",
      "https://blog.google/innovation-and-ai/products/google-ai-updates-november-2025/",
    ],
  },
  {
    id: "industry-dji-osmo360-nab-awards-2026",
    title: {
      zh: "DJI 宣布 Osmo 360 与 RS 5 在 NAB Show 2026 获多项年度产品类荣誉",
      en: "DJI Highlights NAB Show 2026 Honors for Osmo 360 and RS 5",
    },
    summary: {
      zh: "DJI 媒体中心通稿列举 ProVideo Coalition 等机构颁发的 Best in Show 等类别，并强调创作者生态新品在展会现场的可见度。",
      en: "DJI’s media-center announcement lists ProVideo Coalition Best in Show-style honors and stresses booth visibility for new creator hardware.",
    },
    category: "industry",
    tags: ["capture", "spatial_media"],
    level: "beginner",
    source: { name: "DJI", type: "official_website" },
    sourceUrl: "https://www.dji.com/media-center/announcements/dji-rs-5-osmo-360-nab-show-2026",
    coverUrl: null,
    publishedAt: "2026-04-28",
    editorialNote: {
      zh: "稿内奖项名与主办机构拼写应以 ProVideo Coalition 与 NAB 官方页面为准，避免只转二手缩写。",
      en: "Cross-check award names with ProVideo Coalition and NAB official listings rather than relying on short social reposts.",
    },
    verified: true,
    sources: [
      "https://www.dji.com/media-center/announcements/dji-rs-5-osmo-360-nab-show-2026",
      "https://www.dji.com/media-center/announcements/dji-best-in-class-nab-2026",
    ],
  },
  {
    id: "tool-xverse-xscene-ue5-gaussian-plugin",
    title: {
      zh: "元象 XVERSE 开源 XScene UE5 插件以混合渲染编辑三维高斯",
      en: "XVERSE Open-Sources XScene UE5 Plugin for Hybrid Gaussian Splat Editing",
    },
    summary: {
      zh: "GitHub 自述面向实时可视化、管理、编辑与可扩展混合渲染；Epic 开发者论坛亦有独立讨论串汇总安装与渲染路径问题。",
      en: "The README targets realtime visualization, management, editing, and scalable hybrid rendering, while Epic’s forums host a long troubleshooting thread.",
    },
    category: "tool",
    tags: ["publishing", "editing"],
    level: "intermediate",
    source: { name: "GitHub", type: "github" },
    sourceUrl: "https://github.com/xverse-engine/XScene-UEPlugin",
    coverUrl: null,
    publishedAt: "2025-06-01",
    editorialNote: {
      zh: "版本号与引擎小版本绑定紧密，导入前请对照 Releases 页与本地 UE5 补丁级别。",
      en: "Tie plugin releases to your exact UE5 patch level before upgrading production scenes.",
    },
    verified: true,
    sources: [
      "https://github.com/xverse-engine/XScene-UEPlugin",
      "https://forums.unrealengine.com/t/xverse-plugin-for-gaussian-splats/1907870",
    ],
  },
  {
    id: "tool-krpano-3dgs-depthmap-navigation",
    title: {
      zh: "krpano 官方文档与示例扩展深度图漫游并纳入三维高斯模型导航",
      en: "krpano Docs and Demos Extend Depthmap Tours with 3D Gaussian Model Navigation",
    },
    summary: {
      zh: "示例站列出含 Depthmap 与 3D Gaussian Splatting 的演示线路；XML 扩展 controls3d 说明键盘与手势如何驱动 3D 场景漫游。",
      en: "The examples hub lists depthmap and 3D Gaussian Splatting tours, while controls3d.xml documents keyboard, mouse, and touch navigation.",
    },
    category: "tool",
    tags: ["viewing", "web_rendering"],
    level: "intermediate",
    source: { name: "krpano", type: "official_website" },
    sourceUrl: "https://krpano.com/examples/?depthmap",
    coverUrl: null,
    publishedAt: "2025-11-01",
    editorialNote: {
      zh: "上线前用官方 Demotour 对照本地坐标系与单位缩放，避免与 PLY 高斯资产轴向不一致。",
      en: "Validate axes and scale against official demotours before binding PLY splat assets.",
    },
    verified: true,
    sources: [
      "https://krpano.com/examples/?depthmap",
      "https://krpano.com/plugins/xmlextensions/",
    ],
  },
  {
    id: "tool-gsplat-mlx-apple-silicon",
    title: {
      zh: "社区项目 gsplat-mlx 将高斯训练管线移植到 Apple MLX 与 Metal",
      en: "Community gsplat-mlx Ports Gaussian Training to Apple MLX and Metal",
    },
    summary: {
      zh: "仓库说明提供可微光栅、球谐评估与完整训练路径，并强调以 Metal 取代 CUDA 内核的测试矩阵；可与 Apple MLX 主仓库的发行说明交叉阅读。",
      en: "The repo advertises differentiable rasterization, SH evaluation, and a training stack with Metal-first kernels, complementing Apple’s MLX release notes.",
    },
    category: "tool",
    tags: ["training", "optimization"],
    level: "expert",
    source: { name: "GitHub", type: "github" },
    sourceUrl: "https://github.com/RobotFlow-Labs/gsplat-mlx",
    coverUrl: null,
    publishedAt: "2025-08-01",
    editorialNote: {
      zh: "性能数字高度依赖具体 Mac 机型与 macOS 版本，引用前请在本机复现 README 基准段落。",
      en: "Benchmarks swing heavily by Mac SKU and OS build—re-run the README bench block before citing numbers.",
    },
    verified: true,
    sources: [
      "https://github.com/RobotFlow-Labs/gsplat-mlx",
      "https://github.com/ml-explore/mlx",
    ],
  },
  {
    id: "industry-malwarebytes-fake-antigravity-installers-2026",
    title: {
      zh: "Malwarebytes 披露仿冒 Google Antigravity 安装包窃取账户事件",
      en: "Malwarebytes Warns of Fake Google Antigravity Installers Stealing Accounts",
    },
    summary: {
      zh: "威胁情报文章描述钓鱼域名与木马化安装包行为链，并提醒用户仅信任 antigravity.google 官方下载入口。",
      en: "The threat-intel article outlines typosquat domains and trojanized installers, urging downloads only from antigravity.google.",
    },
    category: "industry",
    tags: ["spatial_media", "case_study"],
    level: "beginner",
    source: { name: "Malwarebytes", type: "media" },
    sourceUrl: "https://www.malwarebytes.com/blog/threat-intel/2026/04/fake-google-antigravity-downloads-are-stealing-accounts-in-minutes",
    coverUrl: null,
    publishedAt: "2026-04-14",
    editorialNote: {
      zh: "可与 Google Developers 官方 Antigravity 介绍文交叉阅读，把社工话术与正版功能列表区分。",
      en: "Pair with Google’s official Antigravity announcement to separate social-engineering lures from real features.",
    },
    verified: true,
    sources: [
      "https://www.malwarebytes.com/blog/threat-intel/2026/04/fake-google-antigravity-downloads-are-stealing-accounts-in-minutes",
      "https://developers.googleblog.com/build-with-google-antigravity-our-new-agentic-development-platform/",
    ],
  },
  {
    id: "tool-niantic-spz-format-open-source",
    title: {
      zh: "Niantic 通过 Scaniverse 新闻稿与 GitHub 发布压缩高斯格式 SPZ",
      en: "Niantic Documents SPZ Compressed Splats via Scaniverse Blog and GitHub",
    },
    summary: {
      zh: "公开稿件解释将高斯资产体积显著压缩的工程动机；nianticlabs/spz 仓库提供跨语言参考实现与格式说明。",
      en: "Scaniverse’s post explains the shipping motivation for smaller splats, while nianticlabs/spz hosts the cross-language reference implementation.",
    },
    category: "tool",
    tags: ["publishing", "optimization"],
    level: "intermediate",
    source: { name: "Scaniverse", type: "official_website" },
    sourceUrl: "https://scaniverse.com/news/spz-gaussian-splat-open-source-file-format",
    coverUrl: null,
    publishedAt: "2024-12-10",
    editorialNote: {
      zh: "与 PlayCanvas SplatTransform 文档对照可确认 .spz 作为输入格式的工程互操作性描述。",
      en: "Cross-check PlayCanvas SplatTransform docs for SPZ ingest notes alongside the blog and README.",
    },
    verified: true,
    sources: [
      "https://scaniverse.com/news/spz-gaussian-splat-open-source-file-format",
      "https://github.com/nianticlabs/spz",
    ],
  },
  {
    id: "paper-stopthepop-sorted-gaussian-splatting",
    title: {
      zh: "StopThePop：分层像素排序抑制实时高斯渲染中的弹出伪影",
      en: "StopThePop: Hierarchical Per-Pixel Sorting Cuts Popping in Real-Time Gaussian Splats",
    },
    summary: {
      zh: "arXiv 摘要说明以全局深度排序近似会引入视角旋转时的弹出与混合伪影，并提出分层重排与剔除的软件光栅化管线；官方实现托管在 r4dl/StopThePop 仓库。",
      en: "The arXiv abstract argues global depth sorting causes popping and blending artifacts, then proposes hierarchical resorting and culling in a public software rasterizer on GitHub.",
    },
    category: "paper",
    tags: ["paper", "optimization"],
    level: "expert",
    source: { name: "arXiv", type: "arxiv" },
    sourceUrl: "https://arxiv.org/abs/2402.00525",
    coverUrl: null,
    publishedAt: "2024-02-01",
    editorialNote: {
      zh: "UBC 3dgs-mcmc 更新日志亦引用该节作为 rasterizer 改动依据，可在二次开发时对照提交说明。",
      en: "UBC’s 3dgs-mcmc changelog cites the same section—diff those commits when rebasing rasterizers.",
    },
    verified: true,
    sources: [
      "https://arxiv.org/abs/2402.00525",
      "https://github.com/r4dl/StopThePop",
    ],
  },
  {
    id: "paper-apple-hugs-human-gaussian-splats",
    title: {
      zh: "Apple 机器学习团队开源 HUGS：单视频人体与场景联合高斯（CVPR 2024）",
      en: "Apple ML Open-Sources HUGS: Human Gaussian Splats from a Single Video (CVPR 2024)",
    },
    summary: {
      zh: "README 指向 arXiv 论文与 Apple 研究落地页，说明在 NeuMan 等数据上联合优化人体与场景高斯的训练脚本入口。",
      en: "The README links the arXiv paper and Apple’s research page, documenting joint human-and-scene Gaussian training on NeuMan-style captures.",
    },
    category: "paper",
    tags: ["paper", "avatar"],
    level: "expert",
    source: { name: "Apple Machine Learning Research", type: "official_website" },
    sourceUrl: "https://machinelearning.apple.com/research/hugs",
    coverUrl: null,
    publishedAt: "2023-11-28",
    editorialNote: {
      zh: "数据准备段落要求外部 SMPL 与 AMASS 许可，商业化复现前需完成独立合规审查。",
      en: "Data prep depends on SMPL and AMASS licenses—complete compliance review before any commercial reuse.",
    },
    verified: true,
    sources: [
      "https://machinelearning.apple.com/research/hugs",
      "https://arxiv.org/abs/2311.17910",
    ],
  },
  {
    id: "community-playcanvas-supersplat-to-ue5-thread",
    title: {
      zh: "PlayCanvas 论坛讨论将 SuperSplat 编辑后的高斯导入 Unreal Engine 5",
      en: "PlayCanvas Forum Thread on Importing SuperSplat Assets into Unreal Engine 5",
    },
    summary: {
      zh: "主题串汇总导出设置、材质路径与碰撞代理等实操问题，适合作为跨工具链交付的索引帖。",
      en: "The thread collates export settings, material paths, and collision proxies for cross-tool splat delivery.",
    },
    category: "community",
    tags: ["tutorial", "publishing"],
    level: "intermediate",
    source: { name: "PlayCanvas 论坛", type: "official_website" },
    sourceUrl: "https://forum.playcanvas.com/t/loading-gaussian-splats-edited-with-supersplat-into-unreal-engine-5/41321",
    coverUrl: null,
    publishedAt: "2025-03-15",
    editorialNote: {
      zh: "论坛回复随引擎小版本变化较快，遇到阻塞应优先核对主帖是否已被维护者置顶更新。",
      en: "Replies drift with UE minor versions—check pinned maintainer updates before deep debugging.",
    },
    verified: true,
    sources: [
      "https://forum.playcanvas.com/t/loading-gaussian-splats-edited-with-supersplat-into-unreal-engine-5/41321",
      "https://github.com/playcanvas/supersplat",
    ],
  },
  {
    id: "industry-dji-avata-360-launch-specs-2026",
    title: {
      zh: "大疆发布 Avata 360 FPV：双一英寸传感器与 8K60 全景记录",
      en: "DJI Avata 360 FPV Drone Debuts Dual 1-Inch Sensors and 8K60 Spherical Capture",
    },
    summary: {
      zh: "DJI 全球产品页列出影像、图传与安全传感器规格；CineD 报道补充单轴云台切换单镜头模式与后期 GyroFrame 等工作流描述。",
      en: "DJI’s global product page lists imaging, transmission, and safety specs, while CineD reporting adds gimbal modes and GyroFrame reframing context.",
    },
    category: "industry",
    tags: ["capture", "spatial_media"],
    level: "beginner",
    source: { name: "DJI", type: "official_website" },
    sourceUrl: "https://www.dji.com/global/avata-360",
    coverUrl: null,
    publishedAt: "2026-03-26",
    editorialNote: {
      zh: "地区套装与频段认证差异较大，跨境采购前需核对本地法规与 DJI 支持页声明。",
      en: "Regional kits and RF certifications differ—verify local regulations and DJI support statements before importing.",
    },
    verified: true,
    sources: [
      "https://www.dji.com/global/avata-360",
      "https://www.cined.com/dji-avata-360-drone-introduced-8k60-360-video-and-o4-transmission/",
    ],
  },
  {
    id: "industry-octanerender-2026-roadmap",
    title: {
      zh: "OctaneRender 2026 正式版发布并公布 2027 路线图",
      en: "OctaneRender 2026 Released and 2027 Roadmap Announced",
    },
    summary: {
      zh: "Radiance Fields 报道称 OctaneRender 2026 将高斯泼溅纳入商业路径追踪管线，支持 PLY 与 SPZ 输入，并在 2027 路线图中规划传统 CG 场景导出为高斯与 4D 神经对象。",
      en: "Radiance Fields reports that OctaneRender 2026 brings Gaussian splats into a commercial path-tracing pipeline, with PLY/SPZ ingest and a 2027 roadmap for exporting CG scenes into splats and 4D neural objects.",
    },
    category: "industry",
    tags: ["viewing", "spatial_media"],
    level: "expert",
    source: { name: "Radiance Fields", type: "media" },
    sourceUrl: "https://radiancefields.com/octanerender-2026-released-and-2027-roadmap-announced",
    coverUrl: null,
    publishedAt: "2025-11-28",
    editorialNote: {
      zh: "这条更适合追踪离线渲染管线如何接纳高斯资产，而不是只看单一 Alpha 功能点。",
      en: "Read this as a signal for offline rendering pipelines adopting splat assets, not just as a single alpha-feature update.",
    },
    verified: true,
    sources: [
      "https://radiancefields.com/octanerender-2026-released-and-2027-roadmap-announced",
      "https://home.otoy.com/render/octane-render/news/octane2026/",
    ],
  },
  {
    id: "industry-octanerender-2026-1-alpha-nrc",
    title: {
      zh: "OctaneRender 2026.1 Alpha 引入高斯泼溅与 NRC 缓存",
      en: "OctaneRender 2026.1 Alpha Adds Gaussian Splatting and Neural Radiance Caching",
    },
    summary: {
      zh: "Alpha 版本把高斯泼溅与 Neural Radiance Caching 放入 Octane 测试线，Radiance Fields 记录了 PLY 支持、球谐视角相关效果、路径追踪集成与渲染层限制等早期边界。",
      en: "The alpha build put Gaussian Splatting and Neural Radiance Caching into Octane's test line, with Radiance Fields documenting PLY support, spherical-harmonic view effects, path-traced integration, and early render-layer limits.",
    },
    category: "industry",
    tags: ["viewing", "optimization"],
    level: "expert",
    source: { name: "Radiance Fields", type: "media" },
    sourceUrl: "https://radiancefields.com/otoy-octanerender-2026-1-alpha-features-gaussian-splatting",
    coverUrl: null,
    publishedAt: "2025-01-15",
    editorialNote: {
      zh: "与正式版新闻合看，可以看到 Octane 从实验支持到生产路线图的演进节奏。",
      en: "Pair it with the final-release item to see the progression from experimental support to a production roadmap.",
    },
    verified: true,
    sources: [
      "https://radiancefields.com/otoy-octanerender-2026-1-alpha-features-gaussian-splatting",
      "https://render.otoy.com/forum/viewtopic.php?t=84311",
      "https://docs.otoy.com/standaloneSE/GaussianSplat.html",
    ],
  },
  {
    id: "tool-colmap-3-12-sensor-rig",
    title: {
      zh: "COLMAP 3.12 发布：原生支持多相机 sensor rig",
      en: "COLMAP 3.12 Released with Native Sensor-rig Support",
    },
    summary: {
      zh: "COLMAP 3.12 更新了 SfM 管线，重点加入多相机 rig 描述、经纬度与 UTM 转换、姿态求解器改进和若干 CUDA 与 GUI 修复，对全景、无人机和多机阵列采集更友好。",
      en: "COLMAP 3.12 updates the SfM pipeline with native multi-camera rig descriptions, latitude/longitude to UTM conversion, pose-solver improvements, and CUDA/GUI fixes for panoramas, drones, and multi-camera arrays.",
    },
    category: "tool",
    tags: ["capture", "reconstruction"],
    level: "intermediate",
    source: { name: "Radiance Fields", type: "media" },
    sourceUrl: "https://radiancefields.com/colmap-3-12-released",
    coverUrl: null,
    publishedAt: "2025-06-30",
    editorialNote: {
      zh: "多相机和 GPS 场景的相机位姿稳定性会直接影响后续高斯训练质量，升级前应核对下游解析脚本。",
      en: "Pose stability for multi-camera and GPS captures directly affects downstream splat training, so check parsers before upgrading.",
    },
    verified: true,
    sources: [
      "https://radiancefields.com/colmap-3-12-released",
      "https://colmap.github.io/changelog.html",
    ],
  },
  {
    id: "tool-lichtfeld-studio-v0-4",
    title: {
      zh: "LichtFeld Studio v0.4 发布：深度感知训练与 i18n",
      en: "LichtFeld Studio v0.4 Adds Depth-aware Training and i18n",
    },
    summary: {
      zh: "v0.4 为本地高斯训练工具加入深度感知训练、配置导入导出、镜像与裁剪编辑改进、多语言本地化、Unicode 路径修复以及 CUDA 与显存优化。",
      en: "Version 0.4 adds depth-aware training, import/export for training configs, mirror and crop editing improvements, localization, Unicode path fixes, and CUDA/VRAM tuning for local splat workflows.",
    },
    category: "tool",
    tags: ["training", "editing"],
    level: "intermediate",
    source: { name: "Radiance Fields", type: "media" },
    sourceUrl: "https://radiancefields.com/lichtfeld-studio-releases-v0.4",
    coverUrl: null,
    publishedAt: "2026-01-16",
    editorialNote: {
      zh: "深度先验和 Unicode 路径修复对中文素材目录与复杂室内数据集都更实用。",
      en: "Depth priors and Unicode path fixes are practical for Chinese asset folders and difficult indoor datasets.",
    },
    verified: true,
    sources: [
      "https://radiancefields.com/lichtfeld-studio-releases-v0.4",
      "https://github.com/MrNeRF/LichtFeld-Studio",
    ],
  },
  {
    id: "tool-gaussian-splatking-ios-launch",
    title: {
      zh: "Gaussian SplatKing 上架 iOS：免费高保真采集应用",
      en: "Gaussian SplatKing Launches Free High-fidelity iOS Capture App",
    },
    summary: {
      zh: "Radiance Fields 发布 Gaussian SplatKing，面向 iOS 提供视频、照片与 LiDAR 三种采集模式，支持手动曝光控制、双镜头同步采集、质量预测与文件夹式数据导出。",
      en: "Radiance Fields launched Gaussian SplatKing for iOS with video, photo, and LiDAR capture modes, manual exposure controls, dual-lens capture, quality predictors, and folder-based data export.",
    },
    category: "tool",
    tags: ["capture", "training"],
    level: "beginner",
    source: { name: "Radiance Fields", type: "media" },
    sourceUrl: "https://radiancefields.com/radiancefields.com-announces-gaussian-splatking-for-mobile-capture",
    coverUrl: null,
    publishedAt: "2026-03-13",
    editorialNote: {
      zh: "重点不在云端重建，而在把手机采集数据尽量开放给后续任意训练管线。",
      en: "The important shift is open capture data for any downstream training pipeline, not a cloud reconstruction service.",
    },
    verified: true,
    sources: [
      "https://radiancefields.com/radiancefields.com-announces-gaussian-splatking-for-mobile-capture",
      "https://radiancefields.com/splatking",
    ],
  },
  {
    id: "industry-arrival-space-v077-v079-updates",
    title: {
      zh: "Arrival Space 多版本迭代：碰撞、移动 UX 与 SPZ 加速",
      en: "Arrival Space Iterates: Collision, Mobile UX, and SPZ Speedup",
    },
    summary: {
      zh: "Arrival Space 在 0.77 至 0.79 多个版本中扩展了 Splat 空间碰撞、移动端操控、Dynamic Gates、多 GLB 导入、SPZ 渲染性能、Apple ID 登录和 Unicode 3D 文本。",
      en: "Arrival Space versions 0.77 through 0.79 expanded Splat-space collision, mobile controls, Dynamic Gates, multi-GLB import, faster SPZ rendering, Apple ID sign-in, and Unicode 3D text.",
    },
    category: "industry",
    tags: ["publishing", "web_rendering"],
    level: "beginner",
    source: { name: "Radiance Fields", type: "media" },
    sourceUrl: "https://radiancefields.com/arrival-space-receives-several-updates",
    coverUrl: null,
    publishedAt: "2025-04-28",
    editorialNote: {
      zh: "这类空间托管平台的价值逐渐从单纯展示转向可行走、可链接、可运营的网页空间。",
      en: "Hosted splat spaces are moving from pure display toward walkable, linkable, and operable web environments.",
    },
    verified: true,
    sources: [
      "https://radiancefields.com/arrival-space-receives-several-updates",
      "https://arrival.space/",
    ],
  },
  {
    id: "tool-realityscan-2-0-release",
    title: {
      zh: "Epic Games RealityScan 2.0 正式发布",
      en: "RealityScan 2.0 Officially Released by Epic",
    },
    summary: {
      zh: "RealityScan 2.0 将 RealityCapture 品牌并入 Epic 的 RealityScan 产品线，加入更高质量的特征检测、GPU 对齐、AI 遮罩、覆盖质量分析和空中 LiDAR 数据导入。",
      en: "RealityScan 2.0 folds the former RealityCapture line into Epic's RealityScan family with higher-quality feature detection, GPU alignment, AI masking, coverage-quality analysis, and aerial LiDAR ingest.",
    },
    category: "tool",
    tags: ["capture", "reconstruction"],
    level: "intermediate",
    source: { name: "Radiance Fields", type: "media" },
    sourceUrl: "https://radiancefields.com/realityscan-2-0-released",
    coverUrl: null,
    publishedAt: "2025-06-17",
    editorialNote: {
      zh: "对 3DGS 用户来说，重点是更稳定的相机对齐和遮罩流程能降低后续训练噪声。",
      en: "For 3DGS users, the key is that stronger alignment and masking can reduce noise before training.",
    },
    verified: true,
    sources: [
      "https://radiancefields.com/realityscan-2-0-released",
      "https://www.realityscan.com/",
      "https://www.unrealengine.com/en-US/realityscan",
    ],
  },
  {
    id: "tool-postshot-v0-4-raw-hdr",
    title: {
      zh: "Postshot v0.4 发布：RAW/HDR 与 16/32 位整数色彩支持",
      en: "Postshot v0.4 Adds RAW/HDR and Wide Color Support",
    },
    summary: {
      zh: "Postshot v0.4 增加 RAW、HDR、16 位与 32 位整数颜色、ACES 与 HLG/Rec.2020 等色彩空间，并将训练显存占用降低约 15%，同时补强 UI 与 RealityCapture CSV/PLY 支持。",
      en: "Postshot v0.4 adds RAW, HDR, 16-bit and 32-bit integer color, ACES and HLG/Rec.2020 color spaces, about 15% lower training VRAM use, UI fixes, and RealityCapture CSV/PLY support.",
    },
    category: "tool",
    tags: ["training", "optimization"],
    level: "intermediate",
    source: { name: "Radiance Fields", type: "media" },
    sourceUrl: "https://radiancefields.com/postshot-releases-v-04",
    coverUrl: null,
    publishedAt: "2024-08-23",
    editorialNote: {
      zh: "色彩管理和本地训练资源控制会影响高动态范围素材能否稳定进入重建流程。",
      en: "Color management and local resource controls affect whether HDR capture material can enter reconstruction reliably.",
    },
    verified: true,
    sources: [
      "https://radiancefields.com/postshot-releases-v-04",
      "https://www.jawset.com/postshot/",
    ],
  },
  {
    id: "industry-siggraph-2024-radiance-field-program",
    title: {
      zh: "SIGGRAPH 2024 节目单公布：4 个辐射场专场",
      en: "SIGGRAPH 2024 Program: Four Radiance-field Sessions",
    },
    summary: {
      zh: "SIGGRAPH 2024 目录将辐射场集中放入 Fast Radiance Fields、NeRFs and Lighting、Dynamic Radiance Fields 和 Radiance Field Processing 四组议题，覆盖 RTG-SLAM、2DGS、StopThePop、SMERF 与动态 4DGS 等方向。",
      en: "The SIGGRAPH 2024 catalog groups radiance-field work into Fast Radiance Fields, NeRFs and Lighting, Dynamic Radiance Fields, and Radiance Field Processing, covering RTG-SLAM, 2DGS, StopThePop, SMERF, and dynamic 4DGS.",
    },
    category: "industry",
    tags: ["paper", "dynamic"],
    level: "expert",
    source: { name: "Radiance Fields", type: "media" },
    sourceUrl: "https://radiancefields.com/siggraph-2024-program-announced",
    coverUrl: null,
    publishedAt: "2024-05-14",
    editorialNote: {
      zh: "这份目录适合当作 2024 年辐射场研究主题的横截面索引，而不是单篇论文新闻。",
      en: "Use the program as a cross-section of 2024 radiance-field themes rather than a single-paper announcement.",
    },
    verified: true,
    sources: [
      "https://radiancefields.com/siggraph-2024-program-announced",
      "https://s2024.siggraph.org/program/",
    ],
  },
];

const sortedNews = [...news].sort((a, b) =>
  b.publishedAt.localeCompare(a.publishedAt),
);

export const newsByPublishedDesc: NewsItem[] = sortedNews;

const findLatestByCategory = (
  list: NewsItem[],
  category: NewsCategory,
  excludeIds: Set<string> = new Set(),
) => list.find((item) => item.category === category && !excludeIds.has(item.id));

export const featuredHero = (() => {
  const picks: NewsItem[] = [];
  const seen = new Set<string>();
  (["paper", "tool", "art"] as const).forEach((cat) => {
    const item = findLatestByCategory(sortedNews, cat, seen);
    if (item) {
      picks.push(item);
      seen.add(item.id);
    }
  });
  return picks;
})();

export const trendingPicks = (() => {
  const seen = new Set<string>(featuredHero.map((n) => n.id));
  const picks: NewsItem[] = [];
  (["industry", "community", "paper"] as const).forEach((cat) => {
    const item = findLatestByCategory(sortedNews, cat, seen);
    if (item) {
      picks.push(item);
      seen.add(item.id);
    }
  });
  return picks;
})();

export const dailySignal = (() => {
  const seen = new Set<string>([
    ...featuredHero.map((n) => n.id),
    ...trendingPicks.map((n) => n.id),
  ]);
  return sortedNews.filter((n) => !seen.has(n.id)).slice(0, 4);
})();
