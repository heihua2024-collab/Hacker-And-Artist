/**
 * 术语表（首批 30 条）
 * 来源：Gemini 调研 (2026-04-29) + URL 规范化清洗
 */

import type {
  Bilingual,
  LevelId,
  SourceTypeId,
  TagId,
} from "@/lib/taxonomy";

export type GlossaryCategory =
  | "concept"
  | "technique"
  | "format"
  | "tool"
  | "metric"
  | "workflow";

export type GlossaryLinkType = SourceTypeId | "paper";

export type GlossaryLink = {
  label: string;
  url: string;
  type: GlossaryLinkType;
};

export type GlossaryEntry = {
  id: string;
  term: Bilingual;
  aliases: string[];
  /** 长定义（200-400 字）—— 给从业者/研究者 */
  definition: Bilingual;
  /** 使用场景（旧字段，新条目可不填）*/
  context?: Bilingual;
  category: GlossaryCategory;
  level: LevelId;
  relatedTagIds: TagId[];
  relatedTerms: string[];
  links: GlossaryLink[];
  verified: boolean;
  sources: string[];
  /** ===== 新字段：服务"全光谱用户"分层 ===== */
  /** 小白入口——日常类比的一句话定义（30-60 字中文 / 50-100 字英文）*/
  short?: Bilingual;
  /** 小白学习梯子：要懂这条术语，建议先理解哪些 */
  prerequisiteTerms?: string[];
  /** 专家延伸路径：懂了这条之后可以深入哪些 */
  advancedTerms?: string[];
  /** 首次提出/出现年月（找不到就 undefined）*/
  introducedIn?: string;
  introducedBy?: string;
  introducedSourceUrl?: string;
  introducedQuoteEn?: string;
  /** 关联到 tools.ts 的工具 slug */
  relatedTools?: string[];
  /** 关联到 engines.ts 的引擎 slug */
  relatedEngines?: string[];
  /** 关联论文 URL */
  relatedPapers?: string[];
};

export const glossaryCategories: {
  id: GlossaryCategory;
  label: Bilingual;
}[] = [
  { id: "concept", label: { zh: "概念", en: "Concept" } },
  { id: "technique", label: { zh: "技术", en: "Technique" } },
  { id: "format", label: { zh: "格式", en: "Format" } },
  { id: "tool", label: { zh: "工具", en: "Tool" } },
  { id: "metric", label: { zh: "指标", en: "Metric" } },
  { id: "workflow", label: { zh: "工作流", en: "Workflow" } },
];

export const glossary: GlossaryEntry[] = [
  {
    id: "3dgs",
    term: { zh: "三维高斯泼溅", en: "3D Gaussian Splatting (3DGS)" },
    aliases: ["Gaussian Splatting", "3DGS"],
    definition: {
      zh: "一种革命性的三维场景表达与实时渲染技术。它放弃了传统网格和神经辐射场，转而使用数以百万计的带有协方差、不透明度和球谐函数的各向异性三维高斯椭球来显式表达物理空间，通过可微光栅化实现超高帧率的逼真视图合成。",
      en: "A revolutionary 3D scene representation and real-time rendering technique. It explicitly models environments using millions of anisotropic Gaussian ellipsoids, each parameterized with covariance, opacity, and spherical harmonics. Coupled with a highly efficient differentiable rasterization pipeline, it achieves photorealistic novel view synthesis at exceptional frame rates.",
    },
    context: {
      zh: "主要用于真实世界的高保真重建与实时渲染环节，是当前空间计算的核心基石。",
      en: "Primarily utilized during high-fidelity 3D reconstruction and real-time rendering phases, serving as a fundamental pillar for modern spatial computing.",
    },
    category: "technique",
    level: "beginner",
    relatedTagIds: ["training", "real_time", "paper"],
    relatedTerms: ["splat", "nerf", "differentiable-rasterization"],
    links: [
      {
        label: "3DGS 原论文",
        url: "https://arxiv.org/abs/2308.04079",
        type: "arxiv",
      },
    ],
    verified: true,
    sources: [
      "https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/",
      "https://radiancefields.com/what-is-3d-gaussian-splatting",
      "https://arxiv.org/abs/2308.04079",
    ],
  },
  {
    id: "splat",
    term: { zh: "泼溅 / 高斯体", en: "Splat" },
    aliases: ["Gaussian", "Splatting Primitive"],
    definition: {
      zh: "构成 3DGS 场景的基本三维基元。你可以将其视为悬浮在三维空间中的一滴有颜色的「半透明颜料」，它的形状呈现为具有不同拉伸方向的椭球体，其色彩和透明度随着观察视角的变化而动态呈现不同的光影效果。",
      en: "The fundamental 3D primitive comprising a 3DGS scene. It acts conceptually like a semi-transparent droplet of paint suspended in 3D space. Shaped as an anisotropic ellipsoid, its color and opacity dynamically shift depending on the viewing angle to simulate realistic lighting.",
    },
    context: {
      zh: "创作者和算法在优化阶段需要不断增加、删除或调整这些基元，以逼近真实场景。",
      en: "Creators and algorithms continuously add, remove, or modify these primitives during the optimization phase to closely approximate real-world environments.",
    },
    category: "concept",
    level: "beginner",
    relatedTagIds: ["optimization", "viewing"],
    relatedTerms: ["3dgs", "covariance", "opacity"],
    links: [
      {
        label: "原始概念出处 (EWA Splatting)",
        url: "https://www.cs.cmu.edu/~ph/ewa.pdf",
        type: "paper",
      },
    ],
    verified: true,
    sources: ["https://arxiv.org/abs/2308.04079"],
  },
  {
    id: "sfm",
    term: { zh: "运动恢复结构", en: "Structure-from-Motion (SfM)" },
    aliases: ["SfM"],
    definition: {
      zh: "一种从多张二维图像序列中自动提取并估算相机位姿和稀疏三维点云的计算机视觉技术。在 3DGS 工作流中，SfM 提供了至关重要的初始相机参数和基础结构，是后续致密化和高斯初始化的起点。",
      en: "A computer vision technique that automatically estimates camera poses and extracts a sparse 3D point cloud from a sequence of 2D images. In the 3DGS workflow, SfM provides the crucial initial camera parameters and base structure required for subsequent initialization.",
    },
    context: {
      zh: "部署在数据捕获后的预处理阶段，通常由 COLMAP 等开源库自动完成计算。",
      en: "Deployed during the pre-processing stage immediately after data capture. Calculations are typically automated by open-source libraries like COLMAP.",
    },
    category: "technique",
    level: "intermediate",
    relatedTagIds: ["capture", "optimization"],
    relatedTerms: ["point-cloud", "mvs", "reconstruction"],
    links: [
      {
        label: "COLMAP 官方文档",
        url: "https://colmap.github.io/",
        type: "official_website",
      },
    ],
    verified: true,
    sources: ["https://github.com/colmap/colmap"],
  },
  {
    id: "mvs",
    term: { zh: "多视图立体", en: "Multi-View Stereo (MVS)" },
    aliases: ["MVS"],
    definition: {
      zh: "接续在 SfM 之后运行的三维重建算法，通过分析已知相机参数的图片集合，利用立体匹配技术生成极为稠密的三维点云。传统流程依赖 MVS 提取网格，但 3DGS 直接绕过了这一昂贵步骤，基于稀疏点云即可开始训练。",
      en: "A 3D reconstruction algorithm operating downstream of SfM. It utilizes stereo matching techniques on image sets with known camera parameters to generate dense point clouds. While traditional pipelines rely on MVS for mesh extraction, 3DGS efficiently bypasses this expensive step.",
    },
    context: {
      zh: "传统网格建模流的核心步骤，但在标准的高斯工作流中通常被省略或仅作参照对照。",
      en: "The core step in traditional mesh modeling pipelines, though standard Gaussian workflows typically omit it or use it solely for benchmarking purposes.",
    },
    category: "technique",
    level: "intermediate",
    relatedTagIds: ["training", "case_study"],
    relatedTerms: ["sfm", "reconstruction", "mesh"],
    links: [
      {
        label: "MVS 综述",
        url: "https://arxiv.org/abs/2006.00609",
        type: "arxiv",
      },
    ],
    verified: true,
    sources: ["https://arxiv.org/abs/2006.00609"],
  },
  {
    id: "nerf",
    term: { zh: "神经辐射场", en: "Neural Radiance Fields (NeRF)" },
    aliases: ["NeRF"],
    definition: {
      zh: "一种使用多层感知机（MLP）隐式表达连续三维场景的技术。给定视线方向和空间坐标，神经网络会输出该点的颜色与体积密度。NeRF 是新视角合成领域的破局者，也是 3DGS 试图超越的直接前置技术。",
      en: "A technique utilizing Multilayer Perceptrons (MLPs) to implicitly represent continuous 3D scenes. Given a viewing direction and spatial coordinates, the neural network outputs color and volume density. NeRF catalyzed the novel view synthesis revolution, acting as the direct predecessor to 3DGS. Radiance Fields' overview ties the original 2020 Berkeley work to later acceleration projects such as Instant-NGP, which shortened practical training times for many scenes.",
    },
    context: {
      zh: "研究界常将其作为基准对比对象，由于渲染速度慢，在实时交互场景中正被 3DGS 逐步替代。",
      en: "Frequently utilized by researchers as a baseline metric. Due to sluggish rendering speeds, it is progressively being replaced by 3DGS in real-time interactive scenarios.",
    },
    category: "technique",
    level: "beginner",
    relatedTagIds: ["paper", "real_time"],
    relatedTerms: ["3dgs", "real-time-rendering", "metrics"],
    links: [
      {
        label: "NeRF 原始项目页",
        url: "https://www.matthewtancik.com/nerf",
        type: "official_website",
      },
    ],
    verified: true,
    sources: [
      "https://arxiv.org/abs/2003.08934",
      "https://radiancefields.com/what-are-nerfs",
      "https://nvlabs.github.io/instant-ngp/",
    ],
  },
  {
    id: "point-cloud",
    term: { zh: "点云", en: "Point Cloud" },
    aliases: ["Points"],
    definition: {
      zh: "三维空间中离散数据点的集合，通常包含坐标位置信息以及颜色、反射率等附加属性。在 3DGS 中，通过 SfM 生成的稀疏点云被用作高斯椭球的初始生成位置，是空间重建的物理骨架。",
      en: "A collection of discrete data points in three-dimensional space, typically containing coordinate geometry alongside attributes like color or reflectance. Within 3DGS, the sparse point cloud generated by SfM serves as the initial seeding ground for Gaussian ellipsoids.",
    },
    context: {
      zh: "存在于整个空间计算管线的初始阶段，也是多种激光雷达和扫描设备的直接输出格式。",
      en: "Present throughout the initial stages of the spatial computing pipeline. It is also the direct output format for various LiDAR sensors and scanning devices.",
    },
    category: "format",
    level: "beginner",
    relatedTagIds: ["capture", "cultural_heritage"],
    relatedTerms: ["sfm", "3dgs", "splat"],
    links: [
      {
        label: "点云库 (PCL) GitHub",
        url: "https://github.com/PointCloudLibrary/pcl",
        type: "github",
      },
    ],
    verified: true,
    sources: ["https://pointclouds.org/"],
  },
  {
    id: "mesh",
    term: { zh: "多边形网格", en: "Polygon Mesh" },
    aliases: ["Mesh", "网格"],
    definition: {
      zh: "传统 3D 引擎中最主流的模型表达方式，由顶点、边缘和多边形面（通常是三角形）拼接形成物体的表面壳体。与 3DGS 的「体积感」和「散落分布」不同，网格要求严密的表面拓扑连续性，难以完美重构毛发或半透明材质。",
      en: "The dominant model representation in traditional 3D engines, composed of vertices, edges, and polygonal faces (typically triangles) forming a continuous surface shell. Unlike the volumetric and scattered nature of 3DGS, meshes demand strict surface topology, struggling with hair or translucency.",
    },
    context: {
      zh: "主流游戏引擎和建模软件（如 Blender、Unreal）的原生语言，是目前高斯技术急需打通互转的传统媒介。",
      en: "The native language of mainstream game engines and modeling software like Blender or Unreal. Seamlessly bridging meshes with Gaussian splats remains a critical industry objective.",
    },
    category: "format",
    level: "beginner",
    relatedTagIds: ["viewing", "editing"],
    relatedTerms: ["point-cloud", "mvs"],
    links: [
      {
        label: "SuGaR (GS 转 Mesh)",
        url: "https://arxiv.org/abs/2311.12775",
        type: "arxiv",
      },
    ],
    verified: true,
    sources: ["https://arxiv.org/abs/2311.12775"],
  },
  {
    id: "covariance",
    term: { zh: "协方差矩阵", en: "Covariance Matrix" },
    aliases: ["Covariance", "Σ"],
    definition: {
      zh: "控制单个高斯基元空间形态的数学表达。在 3DGS 语境下，它通过描述分布的方差，直接决定了高斯体在 X、Y、Z 三个维度上的拉伸程度与旋转姿态，使其能够拟合从细微尘埃到平坦墙面的任何形状。",
      en: "The mathematical expression controlling the spatial morphology of an individual Gaussian primitive. In 3DGS context, it dictates the scaling and rotation of the ellipsoid across X, Y, and Z axes, allowing it to conform to shapes ranging from minute dust to flat walls.",
    },
    context: {
      zh: "存在于模型训练的底层梯度计算中，确保椭球在变形时保持数学上的合法性（半正定）。",
      en: "Operates within the foundational gradient calculations of model training, meticulously ensuring that ellipsoids maintain mathematical validity (positive semi-definite) during transformations.",
    },
    category: "concept",
    level: "expert",
    relatedTagIds: ["optimization", "training"],
    relatedTerms: ["splat", "anisotropy"],
    links: [],
    verified: false,
    sources: [],
  },
  {
    id: "opacity",
    term: { zh: "不透明度", en: "Opacity (Alpha)" },
    aliases: ["Alpha", "透明度"],
    definition: {
      zh: "定义高斯基元物理穿透性的标量值，范围从 0（完全透明）到 1（完全不透明）。在渲染光栅化时，多层高斯体的颜色会根据其不透明度进行混合计算；在优化过程中，透明度过低的无用高斯体会被算法作为「噪声」自动清除。",
      en: "A scalar value defining the physical solidness of a Gaussian primitive, ranging from 0 (completely transparent) to 1 (fully opaque). During rasterization, colors from overlapping splats are blended based on their alpha values. Superfluous, highly transparent splats are pruned out.",
    },
    context: {
      zh: "决定空间场景的通透感，也是算法自适应控制基元数量、修剪冗余体积的核心判断依据。",
      en: "Determines the visual clarity of the scene and serves as the primary metric for the algorithm to auto-regulate primitive count by pruning redundant volumes.",
    },
    category: "metric",
    level: "beginner",
    relatedTagIds: ["optimization", "viewing"],
    relatedTerms: ["splat", "pruning"],
    links: [],
    verified: false,
    sources: [],
  },
  {
    id: "spherical-harmonics",
    term: { zh: "球谐函数", en: "Spherical Harmonics (SH)" },
    aliases: ["SH"],
    definition: {
      zh: "一组定义在球面上的正交基函数，用于高保真地逼近与视角相关的颜色变化。在 3DGS 中，每个高斯体不只有一个固定颜色，而是携带了一组 SH 系数，使其能根据用户观察角度的不同，呈现出真实的高光和镜面反射效果。",
      en: "A set of orthogonal basis functions defined on the surface of a sphere, utilized to faithfully approximate view-dependent color variations. In 3DGS, each splat holds SH coefficients rather than a single color, enabling realistic specular highlights based on the observer's angle.",
    },
    context: {
      zh: "负责高保真的光影与反射渲染，通常分为多阶，阶数越高色彩细节越丰富，但也越消耗显存。",
      en: "Responsible for high-fidelity lighting and reflections. Typically divided into degrees; higher degrees yield richer chromatic detail but significantly increase memory consumption.",
    },
    category: "technique",
    level: "intermediate",
    relatedTagIds: ["optimization", "real_time"],
    relatedTerms: ["splat"],
    links: [
      {
        label: "球谐函数在图形学中的应用",
        url: "https://en.wikipedia.org/wiki/Spherical_harmonics",
        type: "media",
      },
    ],
    verified: true,
    sources: ["https://en.wikipedia.org/wiki/Spherical_harmonics"],
  },
  {
    id: "densification",
    term: { zh: "致密化", en: "Densification" },
    aliases: ["克隆与分裂", "Cloning and Splitting"],
    definition: {
      zh: "自适应密度控制策略的「增长」阶段。当模型在训练时发现某处细节不足或高斯体过大（方差过高）时，致密化机制会自动克隆新的高斯体以填补空白，或将一个大的高斯体分裂成两个较小的，从而动态提升场景的几何细节分辨率。",
      en: "The 'growth' phase of the Adaptive Density Control strategy. When the model detects missing details or oversized splats with high variance during training, densification triggers. It clones existing splats to fill empty spaces or splits massive ones, thereby dynamically enhancing geometric resolution.",
    },
    context: {
      zh: "发生在核心训练周期内，是赋予 3DGS 极高画面解析力的关键自动繁衍机制。",
      en: "Occurs strictly within the core training loop. It acts as the critical automated replication mechanism granting 3DGS its extraordinary visual clarity.",
    },
    category: "workflow",
    level: "intermediate",
    relatedTagIds: ["training", "optimization"],
    relatedTerms: ["pruning", "adaptive-density-control"],
    links: [],
    verified: false,
    sources: [],
  },
  {
    id: "3dgs-mcmc",
    term: {
      zh: "3DGS-MCMC（马尔可夫链蒙特卡洛式三维高斯泼溅）",
      en: "3D Gaussian Splatting as Markov Chain Monte Carlo (3DGS-MCMC)",
    },
    aliases: ["3DGS as MCMC", "Gaussian Splatting MCMC"],
    short: {
      zh: "把原版 3DGS 的优化看成在离散高斯集合上做随机搜索：用 MCMC 提议接受机制调节增删与参数更新，并显式引入噪声学习率、尺度与不透明度正则等旋钮；官方实现基于 Inria 参考代码扩展，适合要复现论文训练配方的人。",
      en: "Reframes splat optimization as stochastic search over discrete Gaussian sets via MCMC-style proposals and accept/reject moves, with explicit noise learning rates plus scale and opacity regularizers atop the Inria reference trainer.",
    },
    definition: {
      zh: "UBC 视觉组在 NeurIPS 2024 Spotlight 论文中提出：将三维高斯泼溅训练表述为马尔可夫链蒙特卡洛过程，以缓解传统自适应密度控制在某些场景下的不稳定或伪影。公开仓库在 README 中写明基于原始 3D Gaussian Splatting 代码扩展，训练入口与原版相近，但需额外指定 cap_max（高斯数量上限）、scale_reg、opacity_reg、noise_lr、init_type 等参数；许可证沿用捆绑的 Inria 非商业研究条款，商业用途须另行取得许可方授权。README 亦说明主要在 Ubuntu 20.04 上测试。",
      en: "NeurIPS 2024 Spotlight work by UBC Vision reframes 3DGS optimization as Markov Chain Monte Carlo to stabilize adaptive density control. The public codebase extends the Inria reference trainer with CLI flags such as cap_max, scale_reg, opacity_reg, noise_lr, and init_type while inheriting the bundled non-commercial license and Ubuntu 20.04 test matrix.",
    },
    category: "technique",
    level: "expert",
    relatedTagIds: ["training", "optimization", "paper"],
    relatedTerms: ["3dgs", "densification", "adaptive-density-control"],
    prerequisiteTerms: ["3dgs", "densification"],
    advancedTerms: ["pruning"],
    introducedIn: "2024",
    introducedBy: "Shakiba Kheradmand et al. (UBC Vision)",
    introducedSourceUrl:
      "https://raw.githubusercontent.com/ubc-vision/3dgs-mcmc/main/README.md",
    introducedQuoteEn:
      "3D Gaussian Splatting as Markov Chain Monte Carlo",
    relatedTools: ["inria-gaussian-splatting"],
    relatedPapers: ["https://arxiv.org/abs/2404.09591"],
    links: [
      {
        label: "论文 arXiv",
        url: "https://arxiv.org/abs/2404.09591",
        type: "arxiv",
      },
      {
        label: "项目主页",
        url: "https://ubc-vision.github.io/3dgs-mcmc/",
        type: "official_website",
      },
    ],
    verified: true,
    sources: [
      "https://arxiv.org/abs/2404.09591",
      "https://github.com/ubc-vision/3dgs-mcmc",
    ],
  },
  {
    id: "pruning",
    term: { zh: "修剪", en: "Pruning" },
    aliases: ["裁剪", "Culling"],
    definition: {
      zh: "自适应密度控制策略的「淘汰」阶段。为了防止高斯基元数量无限膨胀拖垮显存，算法会在训练过程中定期检查，强制删除那些不透明度极低（近乎隐形）或体积过大的无效高斯体，保持模型的轻量与干练。",
      en: "The 'culling' phase of the Adaptive Density Control strategy. To prevent infinite primitive inflation from overwhelming VRAM, the algorithm periodically inspects the scene during training. It forcibly deletes invisible splats with ultra-low opacity or overly massive, ineffective ones, ensuring model efficiency.",
    },
    context: {
      zh: "与致密化相辅相成，贯穿训练始终，是控制最终文件体积和渲染帧率的保底手段。",
      en: "Working symbiotically with densification throughout the training timeline, it serves as the safeguard mechanism for controlling final file sizes and rendering frame rates.",
    },
    category: "workflow",
    level: "intermediate",
    relatedTagIds: ["training", "optimization"],
    relatedTerms: ["densification", "adaptive-density-control", "opacity"],
    links: [],
    verified: false,
    sources: [],
  },
  {
    id: "adaptive-density-control",
    term: { zh: "自适应密度控制", en: "Adaptive Density Control (ADC)" },
    aliases: ["ADC"],
    definition: {
      zh: "统揽致密化与修剪行为的宏观调控算法。它通过计算位置梯度的平均幅度，实时诊断三维空间中哪些区域呈现出欠重建（需增加密度）或过重建（需剔除噪声），智能调配高斯体的空间分布，无需人工干预即可让画面逐渐清晰。",
      en: "The macro-regulatory algorithm overseeing both densification and pruning behaviors. By calculating the average magnitude of positional gradients, it diagnoses which 3D spatial regions are under-reconstructed or over-reconstructed, dynamically managing splat distribution to intelligently resolve scene clarity without human intervention.",
    },
    context: {
      zh: "3DGS 训练引擎的大脑，直接决定了从稀疏点云到完美场景的进化速度与质量。",
      en: "Functions as the brain of the 3DGS training engine, directly dictating the evolutionary speed and qualitative leap from sparse point clouds to perfect scenes.",
    },
    category: "technique",
    level: "expert",
    relatedTagIds: ["training", "optimization"],
    relatedTerms: ["densification", "pruning"],
    links: [],
    verified: false,
    sources: [],
  },
  {
    id: "differentiable-rasterization",
    term: { zh: "可微光栅化", en: "Differentiable Rasterization" },
    aliases: ["Tile-based Rasterizer"],
    definition: {
      zh: "3DGS 高速渲染的秘密武器。它将屏幕划分为 16×16 的小图块（Tile），对视野内的高斯体进行快速排序和可见性剔除。因为该过程是数学「可微」的，这意味着画面上的每一像素误差都可以顺畅地反向传播给底层高斯属性，指导它们修正形态。",
      en: "The secret weapon behind 3DGS's blistering rendering speeds. It partitions the screen into 16×16 tiles, rapidly sorting and culling visible splats. Because this rasterization process is mathematically differentiable, pixel-level errors effortlessly propagate backward, instructing underlying splat properties on how to correct themselves.",
    },
    context: {
      zh: "连接正向渲染视觉输出与反向梯度优化的桥梁，用传统图形学的工程巧思解决了 AI 算力瓶颈。",
      en: "The bridge connecting forward visual rendering with backward gradient optimization, leveraging traditional computer graphics ingenuity to shatter AI computational bottlenecks.",
    },
    category: "technique",
    level: "expert",
    relatedTagIds: ["real_time", "training"],
    relatedTerms: ["3dgs", "real-time-rendering"],
    links: [
      {
        label: "CUDA 核心实现库",
        url: "https://github.com/graphdeco-inria/diff-gaussian-rasterization",
        type: "github",
      },
    ],
    verified: true,
    sources: [
      "https://github.com/graphdeco-inria/diff-gaussian-rasterization",
    ],
  },
  {
    id: "anisotropy",
    term: { zh: "各向异性", en: "Anisotropy" },
    aliases: ["Anisotropic"],
    definition: {
      zh: "物理量在不同方向上呈现不同数值的属性。在 3DGS 中，高斯体不是完美的正球体，而是允许在 X、Y、Z 轴拥有截然不同缩放比例的椭球。这种属性使其能被极度压扁，贴合建筑表面，以极少的数据量模拟复杂的连续结构。",
      en: "The property of exhibiting different values when measured in different directions. In 3DGS, primitives are not perfect spheres; they are anisotropic ellipsoids capable of independent scaling across X, Y, and Z axes. This allows them to flatten drastically to simulate complex structural surfaces efficiently.",
    },
    context: {
      zh: "是 3DGS 相比传统体素或各向同性点云在表达效率上的巨大跃升点。",
      en: "Represents the massive leap in representational efficiency for 3DGS when compared against traditional voxels or isotropic point cloud models.",
    },
    category: "concept",
    level: "expert",
    relatedTagIds: ["optimization", "paper"],
    relatedTerms: ["covariance", "splat"],
    links: [],
    verified: false,
    sources: [],
  },
  {
    id: "anchor",
    term: { zh: "锚点", en: "Anchor Point" },
    aliases: ["Neural Anchor"],
    definition: {
      zh: "在 Scaffold-GS 等进阶模型中引入的特征挂载点。系统不再让海量高斯体各自为战，而是利用体素网格生成稀疏锚点，每个锚点通过神经网络控制周围附着的局部高斯体。这种层级结构极大增强了模型的抗噪能力与视角稳定性。",
      en: "Feature mounting nodes introduced in advanced models like Scaffold-GS. Instead of isolating millions of splats, the system deploys sparse anchors via voxel grids. Each anchor controls attached local splats through a neural network, creating a hierarchical structure that dramatically enhances noise resistance.",
    },
    context: {
      zh: "针对复杂室内外场景的进阶网络架构，解决了基础 3DGS 在视角突变时容易产生伪影的缺陷。",
      en: "An advanced network architecture tailored for complex indoor/outdoor scenes, effectively addressing the artifact flaws foundational 3DGS exhibits during abrupt viewing angle shifts.",
    },
    category: "concept",
    level: "intermediate",
    relatedTagIds: ["paper", "indoor", "outdoor"],
    relatedTerms: ["scaffold-gs"],
    links: [
      {
        label: "Scaffold-GS 论文",
        url: "https://arxiv.org/abs/2312.00109",
        type: "arxiv",
      },
    ],
    verified: true,
    sources: ["https://arxiv.org/abs/2312.00109"],
  },
  {
    id: "4dgs",
    term: { zh: "四维动态高斯", en: "4D Gaussian Splatting (4DGS)" },
    aliases: ["Dynamic GS", "4DGS"],
    definition: {
      zh: "将时间轴（T）作为第四维度融入三维高斯的技术分支。它通常引入形变场（Deformation Field）神经网络来捕捉高斯体随时间的运动轨迹、形变或消亡，从而实现极高帧率的真实世界动态场景（如人脸表情、火焰燃烧）重建与渲染。",
      en: "A technological branch integrating the temporal axis (T) into 3D Gaussians. It typically employs deformation field neural networks to capture the motion trajectories, deformations, and life cycles of splats over time. This enables ultra-high framerate reconstruction and rendering of dynamic real-world scenes.",
    },
    context: {
      zh: "空间视频、全息演艺和动作捕捉领域的下一代技术方案，目前在工业界正处于火热攻坚期。",
      en: "The next-generation technological solution for spatial video, holographic performances, and motion capture, currently undergoing intense industrial research and development.",
    },
    category: "technique",
    level: "intermediate",
    relatedTagIds: ["spatial_media", "paper"],
    relatedTerms: ["3dgs", "spatial-video"],
    links: [
      {
        label: "4DGS 代表性论文",
        url: "https://arxiv.org/abs/2310.08528",
        type: "arxiv",
      },
    ],
    verified: true,
    sources: [
      "https://guanjunwu.github.io/4dgs/",
      "https://radiancefields.com/infinite-realities-the-future-of-imaging",
      "https://www.infiniterealities.com/",
    ],
  },
  {
    id: "mip-splat",
    term: { zh: "抗锯齿高斯", en: "Mip-Splatting" },
    aliases: ["Mip-Splat"],
    definition: {
      zh: "为解决 3DGS 在摄像机拉远（变焦）或移动时产生的高频闪烁与伪影而提出的改进算法。它在二维和三维层面引入了低通滤波器，有效约束了高斯体的频率采样率，使得重建结果在任何尺度观察下都保持平滑和无锯齿。",
      en: "An improved algorithm designed to eliminate high-frequency flickering and artifacts produced by 3DGS during camera zooming or movement. By introducing low-pass filters in both 2D and 3D dimensions, it constrains frequency sampling rates, ensuring reconstructions remain perfectly smooth and anti-aliased at any scale.",
    },
    context: {
      zh: "极大提升了模型在 Web 端自由漫游时的观看体验，是实现商业级应用落地的关键优化。",
      en: "Massively elevates the visual experience during free-roaming on Web platforms. It is a critical optimization required for deploying commercial-grade applications.",
    },
    category: "technique",
    level: "expert",
    relatedTagIds: ["viewing", "optimization"],
    relatedTerms: ["3dgs"],
    links: [
      {
        label: "Mip-Splatting GitHub",
        url: "https://github.com/autonomousvision/mip-splatting",
        type: "github",
      },
    ],
    verified: true,
    sources: ["https://arxiv.org/abs/2311.16493"],
  },
  {
    id: "scaffold-gs",
    term: { zh: "锚点架构高斯", en: "Scaffold-GS" },
    aliases: [],
    definition: {
      zh: "一种采用结构化层级设计的改进型高斯模型。它摒弃了完全自由生长的高斯群，利用 SfM 点云建立体素网格生成「神经锚点」，由锚点动态预测局部的高斯属性。这种脚手架结构降低了对特定视角的过拟合，并大幅压缩了存储体积。",
      en: "An improved Gaussian model employing a structured hierarchical design. It abandons completely free-growing splat clusters, instead utilizing SfM point clouds to build voxel grids that spawn 'neural anchors'. These anchors dynamically predict local Gaussian attributes, reducing view-overfitting and massively compressing file size.",
    },
    context: {
      zh: "常被极客与开发者用于大规模室外场景重建或对存储敏感的移动端展示项目。",
      en: "Frequently leveraged by developers and geeks for large-scale outdoor scene reconstructions or highly storage-sensitive mobile exhibition projects.",
    },
    category: "technique",
    level: "expert",
    relatedTagIds: ["paper", "outdoor"],
    relatedTerms: ["anchor", "3dgs"],
    links: [
      {
        label: "Scaffold-GS 官方页",
        url: "https://city-super.github.io/scaffold-gs/",
        type: "official_website",
      },
    ],
    verified: true,
    sources: ["https://arxiv.org/abs/2312.00109"],
  },
  {
    id: "compressed-gs",
    term: { zh: "高斯压缩技术", en: "Compressed GS" },
    aliases: ["压缩高斯"],
    definition: {
      zh: "针对基础 3DGS 模型文件动辄数百兆的缺陷而演化出的系列压缩算法（如 C3DGS）。通常结合向量量化（Vector Quantization）、灵敏度感知裁剪和熵编码等机制，在肉眼画质几乎无损的前提下，将高斯模型文件体积压缩 10 至 30 倍。",
      en: "A lineage of compression algorithms (like C3DGS) engineered to mitigate the massive file size flaws (often hundreds of megabytes) of base 3DGS models. By synthesizing vector quantization, sensitivity-aware culling, and entropy coding, file sizes can be reduced 10× to 30× with negligible visual degradation.",
    },
    context: {
      zh: "决定内容能否在网页端顺畅分发的核心链路，是进入印刻万物等社区推荐的硬指标。",
      en: "The core pipeline defining whether content can be seamlessly distributed across web platforms, acting as a strict prerequisite for recommendations within communities.",
    },
    category: "technique",
    level: "intermediate",
    relatedTagIds: ["publishing", "web_rendering"],
    relatedTerms: ["3dgs"],
    links: [
      {
        label: "Compact 3D Gaussian 论文",
        url: "https://arxiv.org/abs/2311.13681",
        type: "arxiv",
      },
    ],
    verified: true,
    sources: [
      "https://arxiv.org/abs/2311.13681",
      "https://scaniverse.com/news/spz-gaussian-splat-open-source-file-format",
      "https://github.com/nianticlabs/spz",
      "https://github.com/mkkellogg/GaussianSplats3D",
    ],
  },
  {
    id: "supersplat",
    term: { zh: "SuperSplat 工具", en: "SuperSplat" },
    aliases: [],
    definition: {
      zh: "由 PlayCanvas 团队开发的开源 Web 端 3DGS 编辑与处理工具。它提供基于浏览器的直观交互界面，允许创作者导入 ply 文件并进行选择、修剪、合并以及重新着色等后处理工作，填补了高斯管线中编辑环节的空白。",
      en: "An open-source, web-based 3DGS editing and processing tool developed by the PlayCanvas team. It provides an intuitive browser interface, empowering creators to import ply files and execute post-processing tasks such as selecting, trimming, merging, and recoloring, filling a crucial gap in the editing pipeline.",
    },
    context: {
      zh: "无代码背景的创作者和三维艺术家修饰原生泼溅模型、剔除杂散飞点（Floaters）的首选工具。",
      en: "The premier tool of choice for 3D artists and no-code creators looking to polish raw splat models and eliminate stray floaters.",
    },
    category: "tool",
    level: "beginner",
    relatedTagIds: ["editing", "web_rendering"],
    relatedTerms: ["splat-viewer"],
    links: [
      {
        label: "SuperSplat GitHub",
        url: "https://github.com/playcanvas/supersplat",
        type: "github",
      },
    ],
    verified: true,
    sources: ["https://playcanvas.com/supersplat"],
  },
  {
    id: "splat-viewer",
    term: { zh: "高斯播放器", en: "Splat Viewer" },
    aliases: ["Splat Web Viewer", "Viewer"],
    definition: {
      zh: "用于在终端设备（通常是 Web 浏览器）中解析、加载并实时光栅化渲染高斯 .ply 或压缩格式的应用程序。优秀的查看器会高度利用 GPU 加速，并封装镜头漫游、抗锯齿、以及基础的光影互动功能。",
      en: "An application utilized on end-user devices (typically web browsers) to parse, load, and real-time rasterize Gaussian .ply or compressed formats. Premium viewers heavily leverage GPU acceleration while encapsulating camera roaming, anti-aliasing, and basic lighting interactions.",
    },
    context: {
      zh: "终端用户接触高斯体验的直接视窗，其生态的繁荣度决定了 3DGS 内容的传播广度。",
      en: "The direct portal through which end-users experience Gaussian content. The prosperity of this viewer ecosystem determines the dissemination breadth of 3DGS content.",
    },
    category: "tool",
    level: "beginner",
    relatedTagIds: ["viewing", "web_rendering"],
    relatedTerms: ["supersplat", "webgl-webgpu"],
    links: [
      {
        label: "Aras P 的知名 WebGL 实现",
        url: "https://github.com/aras-p/UnityGaussianSplatting",
        type: "github",
      },
    ],
    verified: true,
    sources: ["https://github.com/antimatter15/splat"],
  },
  {
    id: "real-time-rendering",
    term: { zh: "实时渲染", en: "Real-time Rendering" },
    aliases: ["RTR"],
    definition: {
      zh: "计算机图形学中以足够快的速度（通常 >30 FPS）生成图像，使得视觉上没有延迟感的处理过程。3DGS 之所以在产业界引发轰动，正是因为它在保持与 NeRF 同等离线渲染级画质的同时，实现了 1080P 甚至 4K 分辨率下的极高实时渲染帧率。",
      en: "A computer graphics process that generates images rapidly enough (typically >30 FPS) to create a visually latency-free experience. 3DGS's explosive industrial impact stems entirely from its ability to maintain NeRF's offline-grade quality while unlocking blistering real-time rendering framerates at 1080P or 4K resolutions.",
    },
    context: {
      zh: "区别于需要耗时数小时渲染的影视级网格光追，是 VR/AR 互动和游戏开发的基础要求。",
      en: "Distinguished from cinematic mesh raytracing requiring hours per frame, it serves as the foundational requirement for VR/AR interactions and game development.",
    },
    category: "concept",
    level: "beginner",
    relatedTagIds: ["real_time", "viewing"],
    relatedTerms: ["3dgs", "differentiable-rasterization"],
    links: [],
    verified: false,
    sources: [],
  },
  {
    id: "webgl-webgpu",
    term: { zh: "WebGL / WebGPU API", en: "WebGL / WebGPU API" },
    aliases: ["Web API"],
    definition: {
      zh: "允许网页浏览器直接调用底层显卡硬件加速的图形 API。WebGL 历史悠久、兼容性广；而新一代 WebGPU 提供了更低级的控制和强大的 Compute Shader 计算能力，使得将数百万高斯体的海量排序计算搬至纯 Web 端成为可能。",
      en: "Graphics APIs enabling web browsers to directly leverage underlying GPU hardware acceleration. While WebGL offers historical stability and broad compatibility, the next-gen WebGPU provides low-level control and robust Compute Shader capabilities. This makes executing massive sorting calculations for millions of splats on pure web clients entirely feasible.",
    },
    context: {
      zh: "免插件在线画廊、H5 互动展示等轻量化高斯空间分发应用不可或缺的底层基础设施。",
      en: "The indispensable underlying infrastructure powering lightweight Gaussian spatial distribution applications, such as plugin-free online galleries and interactive H5 exhibitions.",
    },
    category: "technique",
    level: "intermediate",
    relatedTagIds: ["web_rendering", "viewing"],
    relatedTerms: ["splat-viewer"],
    links: [
      {
        label: "WebGPU 官方规范",
        url: "https://www.w3.org/TR/webgpu/",
        type: "official_website",
      },
    ],
    verified: true,
    sources: ["https://www.w3.org/TR/webgpu/"],
  },
  {
    id: "slam",
    term: {
      zh: "同步定位与建图",
      en: "Simultaneous Localization and Mapping (SLAM)",
    },
    aliases: ["SLAM"],
    definition: {
      zh: "机器人在未知环境中移动时，同时估算自身位置并构建周围环境地图的技术。近期的研究如 SplaTAM 或 MonoGS 将 3DGS 与 SLAM 结合，使得手机或无人机能在实时移动中边扫描边生成照片级逼真的高斯三维地图，极大地提升了捕获效率。",
      en: "A technique where a robot or device navigates an unknown environment, concurrently estimating its own location while constructing an environmental map. Recent studies like SplaTAM or MonoGS integrate 3DGS with SLAM, enabling phones or drones to scan and generate photorealistic Gaussian 3D maps dynamically while moving.",
    },
    context: {
      zh: "极大简化了传统「拍照→离线 SfM→训练」的漫长流水线，推动高斯向移动端实时测绘迈进。",
      en: "Massively streamlines the protracted 'Photography -> Offline SfM -> Training' pipeline, propelling Gaussian technology toward real-time mobile surveying.",
    },
    category: "workflow",
    level: "expert",
    relatedTagIds: ["slam", "capture"],
    relatedTerms: ["3dgs", "reconstruction"],
    links: [
      {
        label: "SplaTAM 论文",
        url: "https://arxiv.org/abs/2312.00645",
        type: "arxiv",
      },
    ],
    verified: true,
    sources: ["https://splatam.github.io/"],
  },
  {
    id: "reconstruction",
    term: { zh: "三维重建", en: "3D Reconstruction" },
    aliases: ["Reconstruction", "逆向工程"],
    definition: {
      zh: "通过多视角的照片、视频或深度传感器数据，逆推并重现真实世界物理对象的三维形态和表面属性的过程。3DGS 作为当代最强大的重建范式之一，凭借出色的反射材质还原和超快速度，正在快速刷新该领域的精度天花板。",
      en: "The reverse-engineering process of recreating the 3D morphology and surface properties of real-world physical objects using multi-view photos, videos, or depth sensor data. As one of the most potent contemporary paradigms, 3DGS is rapidly elevating the field's precision ceiling via its exceptional material reproduction and speed.",
    },
    context: {
      zh: "广泛服务于文博数字化扫描、医美面部测绘、数字人创建以及具身智能的空间认知。",
      en: "Broadly utilized across digital cultural heritage scanning, medical aesthetics facial mapping, digital human creation, and spatial cognition for embodied AI.",
    },
    category: "concept",
    level: "beginner",
    relatedTagIds: ["capture", "cultural_heritage"],
    relatedTerms: ["sfm", "3dgs"],
    links: [],
    verified: false,
    sources: [],
  },
  {
    id: "spatial-video",
    term: { zh: "空间视频", en: "Spatial Video" },
    aliases: ["Immersive Video", "Volumetric Video"],
    definition: {
      zh: "一种支持六自由度（6DoF）观看的媒介格式。观看者不仅能看到动态影像，还能在播放过程中轻微移动头部从不同角度观察物体侧面。基于 4DGS 压缩而成的空间视频，被视为下一代 Apple Vision Pro 等头显设备的首选原生内容形态。",
      en: "A media format supporting Six Degrees of Freedom (6DoF) viewing. Viewers can not only watch dynamic footage but physically shift their heads during playback to observe object flanks from varying angles. Spatial video powered by 4DGS compression is heavily tipped as the premier native content format for upcoming headsets like Apple Vision Pro.",
    },
    context: {
      zh: "从传统二维影像跨越到立体叙事的终极形式，目前仍面临海量数据存储与流媒体传输的挑战。",
      en: "The ultimate evolutionary leap from traditional 2D footage to stereoscopic narrative, currently facing immense challenges regarding massive data storage and streaming delivery.",
    },
    category: "format",
    level: "intermediate",
    relatedTagIds: ["spatial_media", "viewing"],
    relatedTerms: ["4dgs"],
    links: [],
    verified: false,
    sources: [],
  },
  {
    id: "digital-twin",
    term: { zh: "数字孪生", en: "Digital Twin" },
    aliases: ["数字镜像"],
    definition: {
      zh: "将现实世界中的物理实体（如建筑、工厂甚至画廊空间）在数字世界中进行一对一的高保真映射。3DGS 由于能极其真实地复刻光影和材质，被认为是构建下一代具象数字孪生（相比纯数据仪表盘）的最具成本效益的视觉底座技术。",
      en: "The one-to-one high-fidelity mapping of real-world physical entities (such as buildings, factories, or gallery spaces) into a digital ecosystem. Because it exceptionally replicates authentic lighting and materials, 3DGS is recognized as the most cost-effective visual foundational technology for constructing next-generation visceral digital twins.",
    },
    context: {
      zh: "常结合物联网（IoT）数据流共同运作，是智慧城市、虚拟展厅和工业仿真的终极业务容器。",
      en: "Frequently operating in tandem with IoT data streams, it acts as the ultimate business container for smart cities, virtual exhibition halls, and industrial simulations.",
    },
    category: "concept",
    level: "beginner",
    relatedTagIds: ["indoor", "outdoor"],
    relatedTerms: ["3dgs", "reconstruction"],
    links: [],
    verified: false,
    sources: [],
  },
  {
    id: "voxelization",
    term: { zh: "体素化", en: "Voxelization" },
    aliases: ["Voxel Grid"],
    definition: {
      zh: "将连续的三维空间或模型转化为离散的微小三维网格（体素，即三维像素）的过程。虽然 3DGS 本身是连续散乱的基元，但许多空间裁剪工具或底层碰撞检测机制会将高斯场临时「体素化」，以方便使用传统引擎的包围盒算法进行计算。",
      en: "The process of converting continuous 3D space or models into discrete microscopic 3D grids (voxels, or 3D pixels). While 3DGS relies on scattered continuous primitives, many spatial clipping tools and underlying collision detection mechanisms temporarily 'voxelize' the Gaussian field to leverage traditional bounding box algorithms efficiently.",
    },
    context: {
      zh: "在处理高斯模型编辑、场景物理切割及与传统碰撞物理引擎融合时的常见过渡中间态。",
      en: "A highly common intermediate transition state encountered when editing Gaussian models, physically slicing scenes, or attempting fusion with legacy physical collision engines.",
    },
    category: "technique",
    level: "intermediate",
    relatedTagIds: ["editing", "optimization"],
    relatedTerms: ["point-cloud"],
    links: [],
    verified: false,
    sources: [],
  },
  {
    id: "metrics",
    term: {
      zh: "评估指标 (PSNR/SSIM/LPIPS)",
      en: "Evaluation Metrics (PSNR/SSIM/LPIPS)",
    },
    aliases: ["评测标准", "Metrics"],
    definition: {
      zh: "用于量化对比 3DGS 与其他算法生成图像质量的科学标尺。PSNR（峰值信噪比）侧重于像素级色彩失真度计算；SSIM（结构相似性）关注图像边缘特征的完整度；而 LPIPS 则是通过神经网络提取深层特征，更贴合人类肉眼的实际感官认知。",
      en: "Scientific benchmarks used to quantitatively compare image generation quality between 3DGS and rival algorithms. PSNR evaluates pixel-level color distortion; SSIM focuses on the structural integrity of edge features; and LPIPS utilizes neural networks to extract deep features, aligning much closer with actual human visual perception.",
    },
    context: {
      zh: "学术论文中验证模型优越性的唯一硬通货，开发者在超参调优时必须紧盯的实验图表。",
      en: "The absolute currency within academic papers validating model superiority. It constitutes the critical experimental data charts developers must monitor during hyperparameter tuning.",
    },
    category: "metric",
    level: "intermediate",
    relatedTagIds: ["paper", "optimization"],
    relatedTerms: ["3dgs", "nerf"],
    links: [
      {
        label: "LPIPS 原理论文",
        url: "https://arxiv.org/abs/1801.03924",
        type: "arxiv",
      },
    ],
    verified: true,
    sources: ["https://github.com/richzhang/PerceptualSimilarity"],
  },
  // ===== 第二期扩充：22 条「全光谱用户」术语（Auto + Opus 双轨审核于 2026-04-29 通过）=====
  {
    id: "photogrammetry",
    term: { zh: "摄影测量", en: "Photogrammetry" },
    aliases: [],
    short: {
      zh: "想象你攒了一叠同一栋楼的游客照——摄影测量就像用这些从不同角度拍下的平面照片，让电脑算出墙有多长、角在哪，最后捏出一个可以量尺寸、能转着看的立体模型；这是比高斯泼溅早得多的老办法。",
      en: "Picture a shoebox full of holiday snapshots of one building—photogrammetry is the workflow where those flat prints are lined up so software can recover real-world distances and spit out a solid model you can spin; splatting is only one newer branch of the same \"photos → 3D\" family.",
    },
    definition: {
      zh: "摄影测量把多张影像里的像素对应关系、相机内外参数和地面控制信息一起丢进平差（bundle adjustment）里，迭代最小化重投影误差，从而得到稀疏或稠密点云、数字表面模型等产品。它和 COLMAP 那类 SfM/MVS 管线是同一棵家族树上的方法：先可靠地估计几何，再谈用什么基元（网格、点云或高斯）去表达外观。对从业者而言，关键是它强调可度量、可复现的摄影几何，而不是某一种特定的神经或泼溅表示。",
      en: "Photogrammetry stitches overlapping photographs into consistent 3D geometry by estimating camera poses and 3D tie points through least-squares adjustment. Structure-from-motion and multi-view stereo pipelines are modern instantiations: they output sparse or dense reconstructions that downstream tools may convert into meshes, point clouds, or splatted Gaussians. The discipline predates neural fields; its focus is metrology-grade correspondence and calibration rather than a particular differentiable renderer.",
    },
    category: "concept",
    level: "beginner",
    relatedTagIds: [],
    relatedTerms: ["point-cloud", "sfm", "mvs", "3dgs"],
    prerequisiteTerms: ["point-cloud"],
    advancedTerms: ["sfm", "mvs", "3dgs"],
    relatedTools: ["polycam", "luma-ai", "kiri-engine"],
    links: [],
    verified: true,
    sources: [
      "https://en.wikipedia.org/wiki/Photogrammetry",
      "https://en.wikipedia.org/wiki/Structure_from_motion",
    ],
  },
  {
    id: "floaters",
    term: { zh: "漂浮物（Floaters）", en: "Floaters (informal 3DGS artifact)" },
    aliases: ["stray Gaussians"],
    short: {
      zh: "训练好的 3D 高斯场景里，有时会冒出一些不该悬在半空的小团颜色——业内口语叫 floaters，像花粉飘在画面里；多在运动模糊、遮挡不够或动态物体上冒出来，常用 SuperSplat 这类编辑器选中删掉。",
      en: "After training, a splat scene can sprout tiny colored smudges that hang in mid-air like pollen—people in the field just call them \"floaters.\" They often trace back to motion blur, bad coverage, or moving subjects, and editors such as SuperSplat exist mainly to lasso and delete them.",
    },
    definition: {
      zh: "Floaters 不是某篇 SIGGRAPH 论文的正式标题术语，而是社区里对离群高斯的昵称：优化为了填洞或解释噪声，会在没有真实表面的位置留下小团高斯，看起来像漂浮杂质。处理手段包括手工选取删除、阈值裁剪、或在训练/后处理里加正则（相关论文常称 floating artifacts）。记录本条时应区分：它是现象描述，不是单独算法名。",
      en: "\"Floaters\" is informal jargon for stray Gaussian primitives that survive optimization away from true surfaces, producing visually floating specks. Papers may say \"floating artifacts\" instead. Mitigation spans interactive cleanup in tools, pruning heuristics, or training-time regularizers. Treat the word as practitioner slang, not a canonical keyword from a single paper title.",
    },
    category: "technique",
    level: "intermediate",
    relatedTagIds: [],
    relatedTerms: ["splat", "3dgs", "pruning", "densification"],
    prerequisiteTerms: ["splat", "3dgs"],
    advancedTerms: ["pruning", "densification"],
    relatedTools: ["supersplat"],
    links: [],
    verified: true,
    sources: [
      "https://medium.com/@Jamesroha/gaussian-splatting-a-complete-student-guide-to-3d-capture-in-2026-1195a6265870",
      "https://developer.playcanvas.com/user-manual/gaussian-splatting/editing/supersplat/",
    ],
  },
  {
    id: "path-tracing",
    term: { zh: "路径追踪", en: "Path Tracing" },
    aliases: ["path tracing"],
    short: {
      zh: "把路径追踪想成「让光线在房间里乱弹几次再回相机」：每次只认真走一条随机路线，多试几万次取平均，画面就越来越像真照片；它跟实时里常用的光栅化不是一条路——后者像流水线贴三角形，前者像用物理骰子慢慢摇出全局光照。",
      en: "Think of path tracing as sending a pinball of light through the scene: each sample bounces randomly until it hits a light, you average thousands of those stories per pixel, and the photo slowly converges. That Monte Carlo story differs from rasterization, which streams triangles through a fast pipeline but usually needs extra tricks for soft shadows or color bleeding.",
    },
    definition: {
      zh: "路径追踪以渲染方程为对象，用蒙特卡洛积分估计沿随机路径到达相机的辐射；单路径不随意在镜面处无限分叉（与经典 Whitted 射线树不同），因此与双向路径、光子映射等变体相比更朴素但通用。与光栅化相比：光栅化把几何投影到屏幕并靠着色器近似光照，适合实时；路径追踪追求物理上更一致的全局光照，代价是噪声与采样成本——去噪与硬件 RT 让它慢慢进入实时产品。3D Gaussian Splat 本身常走可微光栅化，但若把 splat 放进 Omniverse、OctaneRender 2026 等路径追踪框架，就能与网格一起参与阴影、反射、折射和全局光照。",
      en: "Path tracing estimates the rendering equation by Monte Carlo sampling complete light paths from the camera, averaging many independent samples per pixel to reduce variance. Rasterization projects primitives and shades fragments in a single forward pass—fast, but indirect lighting needs approximations or separate passes. Path tracing trades cost for physical consistency (global illumination, complex materials). When Gaussian splats are represented in Omniverse RTX or OctaneRender 2026-style pipelines, documentation and release notes describe them participating in lighting, shadows, reflections, and refractions alongside meshes.",
    },
    category: "concept",
    level: "expert",
    relatedTagIds: [],
    relatedTerms: ["real-time-rendering", "differentiable-rasterization", "nerf"],
    prerequisiteTerms: ["real-time-rendering"],
    advancedTerms: ["differentiable-rasterization", "nerf"],
    introducedIn: "1986-08",
    introducedBy: "James T. Kajiya",
    introducedSourceUrl:
      "http://www.cse.chalmers.se/edu/year/2011/course/TDA361/2007/rend_eq.pdf",
    introducedQuoteEn:
      "We present an integral equation which generalizes a variety of known rendering algorithms.",
    relatedEngines: ["nvidia-omniverse"],
    relatedPapers: ["https://doi.org/10.1145/15922.15902"],
    links: [],
    verified: true,
    sources: [
      "https://en.wikipedia.org/wiki/Path_tracing",
      "https://docs.omniverse.nvidia.com/materials-and-rendering/latest/particle-fields.html",
      "https://radiancefields.com/octanerender-2026-released-and-2027-roadmap-announced",
      "https://docs.otoy.com/standaloneSE/GaussianSplat.html",
    ],
  },
  {
    id: "spz",
    term: { zh: "SPZ 格式", en: "SPZ format" },
    aliases: ["SPZ", "Scaniverse PLY zipped"],
    short: {
      zh: "把 SPZ 想成给 3D 高斯数据穿的「真空压缩袋」：同样是那一团高斯点，塞进 .spz 往往比傻大粗的 PLY 省掉九成左右体积（产品页说法），带出去和网页里塞模型都轻松些；开源实现和 Scaniverse 工作流里常见它。",
      en: "Treat SPZ like vacuum-sealing a closet full of coats: it is Niantic's packed format for Gaussian splats, often shrinking the same scene to a fraction of the PLY size (marketing copy cites ~90% savings) so mobile capture and web delivery hurt less. The bitstream is open source on GitHub.",
    },
    definition: {
      zh: "SPZ 在工程上把高斯属性按属性分块、量化（含球谐系数比特数等），再经 gzip 流封装；nianticlabs/spz 的 README 说明典型体积约为等价 PLY 的十分之一且视觉差异很小。Scaniverse / Niantic Capture 产品线将其作为标准导出之一，并与自家重建、定位管线衔接。PlayCanvas SplatTransform 手册将 .spz 列为可输入格式之一，便于与训练端 PLY 及网页工具链衔接。从业者要注意坐标系：库要求调用方声明保存/加载时的右手坐标约定，否则与 PLY、GLB 等格式混用时会踩坑。",
      en: "The reference library describes .spz as gzip-compressed streams with a fixed header followed by Gaussian attributes (positions, alphas, colors, scales, rotations, spherical harmonics). Quantization knobs trade size for fidelity. Interop demands explicit coordinate-frame metadata because SPZ stores data in an RUB system aligned with OpenGL/three.js, unlike many PLY files. Engines such as Babylon.js have added loaders, while Scaniverse remains the flagship consumer of the format.",
    },
    category: "format",
    level: "intermediate",
    relatedTagIds: [],
    relatedTerms: ["splat", "compressed-gs"],
    prerequisiteTerms: ["splat"],
    advancedTerms: ["compressed-gs"],
    introducedBy: "Niantic",
    introducedSourceUrl: "https://github.com/nianticlabs/spz",
    introducedQuoteEn: ".spz is a file format for compressed 3D gaussian splats.",
    relatedTools: ["scaniverse"],
    relatedEngines: ["niantic-scaniverse", "babylonjs"],
    links: [],
    verified: true,
    sources: [
      "https://scaniverse.com/news/spz-gaussian-splat-open-source-file-format",
      "https://raw.githubusercontent.com/nianticlabs/spz/main/README.md",
      "https://developer.playcanvas.com/user-manual/gaussian-splatting/editing/splat-transform/",
      "https://github.com/nianticlabs/spz",
    ],
  },
  {
    id: "sugar-method",
    term: {
      zh: "SuGaR 方法",
      en: "SuGaR (Surface-Aligned Gaussian Splatting)",
    },
    aliases: ["SuGaR", "Surface-Aligned Gaussian Splatting"],
    short: {
      zh: "SuGaR 像给一碗散落的弹珠（训练好的高斯）涂上一层隐形胶水，把它们往真实物体表面轻轻推，让它们排得贴面；贴稳之后就能较快「倒」出一块可编辑的三角网格，而不是永远对着几百万颗乱跑的高斯发呆。",
      en: "SuGaR behaves like nudging a bowl of loose marbles—each Gaussian—until they hug the true surfaces; once they stick, Poisson reconstruction can spit out an editable triangle mesh in minutes, so artists can sculpt or relight through a mesh instead of hand-waving millions of splats.",
    },
    definition: {
      zh: "Guédon 与 Lepetit 在 SuGaR 中先加正则项，鼓励高斯在优化过程中沿场景表面对齐；随后从可见区域的密度水平集上高效采样点，用 Poisson 重建得到三角网格，避免直接在极度稀疏的密度场上跑 Marching Cubes。可选第二步把高斯绑定到网格并联合优化，使渲染仍走 Gaussian splatting，但编辑抓手回到传统网格工具链。它是「3DGS → 网格」路线的代表之一，与纯神经 SDF 提取相比强调速度与可扩展性。",
      en: "SuGaR adds a regularizer that aligns Gaussians with the underlying surface, then samples the level set efficiently and runs Poisson surface reconstruction to obtain meshes without relying on marching cubes over a near-zero density field. An optional binding stage co-optimizes mesh and Gaussians for high-quality splat rendering while enabling mesh-based editing. The method targets fast mesh extraction from splats rather than real-time training.",
    },
    category: "technique",
    level: "expert",
    relatedTagIds: [],
    relatedTerms: ["3dgs", "mesh"],
    prerequisiteTerms: ["3dgs", "mesh"],
    advancedTerms: [],
    introducedIn: "2023-11",
    introducedBy: "Antoine Guédon, Vincent Lepetit",
    introducedSourceUrl: "https://arxiv.org/abs/2311.12775",
    introducedQuoteEn:
      "We propose a method to allow precise and extremely fast mesh extraction from 3D Gaussian Splatting.",
    relatedPapers: ["https://arxiv.org/abs/2311.12775"],
    links: [],
    verified: true,
    sources: [
      "https://arxiv.org/abs/2311.12775",
      "https://anttwo.github.io/sugar/",
    ],
  },
  {
    id: "novel-view-synthesis",
    term: { zh: "新视角合成", en: "Novel View Synthesis" },
    aliases: ["view synthesis"],
    short: {
      zh: "想象你只在婚礼相册里见过新娘的正面和侧面——新视角合成就像让摄影师「再按一次快门」，但这次快门是电脑假装的：给你一张从没真正拍过的角度的照片，而且看起来还像真的。",
      en: "Imagine you only have vacation photos of a statue from the left and right—novel view synthesis is the trick of asking the computer to snap a picture from a viewpoint no camera ever held, while keeping lighting and geometry believable.",
    },
    definition: {
      zh: "新视角合成从一组已拍图像与对应相机参数出发，预测任意新相机姿态下的图像。传统 IBMR、光场与 NeRF/3DGS 等路线都落在这条任务名下：差别只在场景表示（网格、隐式场、显式高斯）和渲染器。评估时常与 PSNR/SSIM/LPIPS 及真实新视角采集对比。",
      en: "Novel view synthesis generates images from camera poses that were not in the training set. Image-based rendering, light-field methods, NeRF-style neural fields, and explicit Gaussian splats all target the same user-facing goal with different internal representations. Metrics such as PSNR, SSIM, and LPIPS quantify faithfulness to held-out captures.",
    },
    category: "concept",
    level: "beginner",
    relatedTagIds: [],
    relatedTerms: ["nerf", "3dgs", "splat", "reconstruction"],
    prerequisiteTerms: ["nerf", "3dgs"],
    advancedTerms: ["splat", "reconstruction"],
    relatedTools: ["polycam", "luma-ai"],
    relatedEngines: ["threejs"],
    links: [],
    verified: true,
    sources: [
      "https://en.wikipedia.org/wiki/Neural_radiance_field",
      "https://en.wikipedia.org/wiki/Image-based_modeling_and_rendering",
    ],
  },
  {
    id: "radiance-field",
    term: { zh: "辐射场", en: "Radiance Field" },
    aliases: [],
    short: {
      zh: "把辐射场想成「空间里每个点、每个朝外方向上一束光的亮度说明书」——不是一张贴图，而是一张五维（位置+方向）的亮度函数；NeRF 那种用神经网络去近似它，3D 高斯则是用无数颗小椭球去拼出近似效果。",
      en: "Think of a radiance field as a giant lookup table: at every 3D spot and every outward direction it tells you how bright light should be. Neural nets can approximate that table (NeRF); Gaussian splats approximate it with millions of tinted ellipsoids you can render fast.",
    },
    definition: {
      zh: "在物理渲染里，辐射（radiance）描述沿某方向穿过某点的光强；「场」表示它随位置与方向变化。神经辐射场用 MLP 或网格特征去拟合该函数；3D 高斯泼溅用显式基元与可微光栅化去拟合同一目标。讨论时要说清：经典图形学中的辐射量与深度学习里的「NeRF=辐射场」口语并不完全同义。",
      en: "Radiance measures directional light intensity at a point in space. A radiance field assigns such values across positions and directions. NeRF parameterizes the field with networks; 3DGS approximates it with explicit Gaussians and differentiable splatting. Practitioners often say \"radiance field\" when they mean either the continuous function or its discrete surrogate.",
    },
    category: "concept",
    level: "intermediate",
    relatedTagIds: [],
    relatedTerms: ["nerf", "3dgs", "splat"],
    prerequisiteTerms: ["nerf"],
    advancedTerms: ["3dgs", "splat"],
    relatedTools: ["inria-gaussian-splatting", "gsplat"],
    relatedEngines: ["threejs"],
    links: [],
    verified: true,
    introducedIn: "2020-08",
    introducedBy: "Ben Mildenhall, Pratul P. Srinivasan, Matthew Tancik, Jonathan T. Barron, Ravi Ramamoorthi, Ren Ng",
    introducedSourceUrl: "https://arxiv.org/abs/2003.08934",
    introducedQuoteEn:
      "Our algorithm represents a scene using a fully-connected (non-convolutional) deep network, whose input is a single continuous 5D coordinate (spatial location (x,y,z) and viewing direction (theta,phi)) and whose output is the volume density and view-dependent emitted radiance at that spatial location.",
    sources: [
      "https://en.wikipedia.org/wiki/Neural_radiance_field",
      "https://en.wikipedia.org/wiki/Rendering_equation",
      "https://radiancefields.com/what-are-radiance-fields",
      "https://arxiv.org/abs/2003.08934",
    ],
  },
  {
    id: "spatial-computing",
    term: { zh: "空间计算", en: "Spatial Computing" },
    aliases: [],
    short: {
      zh: "空间计算就像不再把人塞进小屏幕里点鼠标，而是让电脑「看懂」你客厅有多深、手在哪、头往哪转——眼镜、耳机、手机摄像头一起上场，把界面铺在现实世界周围，而不是画在玻璃后面。",
      en: "Spatial computing is the shift from peering into flat screens to letting computers reason about real rooms, hands, and headsets: sensors map the world around you, then graphics and audio glue themselves to that map instead of living only inside a monitor bezel.",
    },
    definition: {
      zh: "该词涵盖 XR、自然交互、上下文计算等相邻领域，标签使用并不严谨。对 3DGS 从业者而言，空间计算设备提供采集与展示通道：手机/头显扫描场景、WebXR 或原生引擎再把 splat 资产放进混合现实会话。技术栈上常与 SLAM、深度相机、OpenXR/WebXR 并列出现。",
      en: "Industry usage bundles AR/VR/MR, embodied UI, and device ecosystems that track pose in physical space. For splat workflows it matters because capture devices and headsets define how reconstructions are gathered and consumed. Interop often routes through OpenXR or WebXR plus game-engine runtimes.",
    },
    category: "concept",
    level: "beginner",
    relatedTagIds: [],
    relatedTerms: ["slam", "digital-twin", "spatial-video"],
    prerequisiteTerms: ["slam"],
    advancedTerms: ["digital-twin", "spatial-video"],
    relatedEngines: ["apple-vision-pro", "meta-quest"],
    links: [],
    verified: true,
    sources: [
      "https://en.wikipedia.org/wiki/Spatial_computing",
      "https://www.w3.org/TR/webxr/",
    ],
  },
  {
    id: "rasterization",
    term: { zh: "光栅化", en: "Rasterization" },
    aliases: ["rasterisation"],
    short: {
      zh: "光栅化就像把剪纸窗花按到方格本上描格子：三角形、高斯点这些几何先被「压平」成屏幕上的像素格子，再决定每个格子涂什么颜色；游戏实时渲染多半走这条路，而不是慢慢追光线。",
      en: "Rasterization is the assembly-line step that stamps triangles—or splats—onto a pixel grid: geometry becomes screen-space coverage, then shaders pick colors. Real-time engines lean on it because it is predictable and fast compared with brute-force light simulation.",
    },
    definition: {
      zh: "光栅化把几何图元映射到离散像素，并调用着色器决定片元颜色；与路径追踪相比，它不天然给出全局光照，但可通过阴影贴图、屏幕空间技巧等堆效果。3D 高斯泼溅的可微光栅化在 GPU 上排序、混合椭球，本质仍属光栅化管线上的特化实现。",
      en: "Rasterization determines which pixels a primitive covers and shades those fragments. It powers most real-time graphics APIs. Differentiable splat rasterizers extend the same idea: sort Gaussians per tile, alpha-blend, and backpropagate screen-space error—still a rasterization mindset, not path tracing.",
    },
    category: "concept",
    level: "intermediate",
    relatedTagIds: [],
    relatedTerms: ["real-time-rendering", "differentiable-rasterization"],
    prerequisiteTerms: ["real-time-rendering"],
    advancedTerms: ["differentiable-rasterization"],
    relatedEngines: ["webgl-webgpu", "threejs"],
    links: [],
    verified: true,
    sources: [
      "https://en.wikipedia.org/wiki/Rasterisation",
      "https://en.wikipedia.org/wiki/Graphics_pipeline",
    ],
  },
  {
    id: "gradient-descent",
    term: { zh: "梯度下降", en: "Gradient Descent" },
    aliases: [],
    short: {
      zh: "梯度下降像蒙眼下山：你每一步只摸脚底哪边最陡，然后往反方向跨一小步，重复很多次就能走到谷底；训练 3D 高斯时，损失函数就是那个「高度」，高斯参数就是你在山上站的位置。",
      en: "Gradient descent is blind hiking: each step walks opposite the slope of the loss landscape. For splat training, that loss compares rendered pixels to photos; autograd tells every Gaussian which way to nudge position, color, or covariance.",
    },
    definition: {
      zh: "对可微渲染管线，梯度从屏幕误差回传到各高斯参数；随机梯度下降、学习率调度与自适应控制（克隆/分裂/剪枝）共同决定优化动态。与纯网格优化不同，3DGS 常在迭代中改变基元数量，因此优化问题本身也在演化。",
      en: "Iterative first-order optimization updates parameters by stepping along negative gradients of a scalar loss. In 3DGS pipelines the loss blends photometric terms (e.g., L1 plus D-SSIM) and interacts with densification schedules. Stochastic minibatches and GPU kernels make large-scale updates practical.",
    },
    category: "concept",
    level: "intermediate",
    relatedTagIds: [],
    relatedTerms: ["metrics", "adaptive-density-control", "densification"],
    prerequisiteTerms: ["metrics"],
    advancedTerms: ["adaptive-density-control", "densification"],
    relatedTools: ["inria-gaussian-splatting", "gsplat"],
    relatedEngines: ["playcanvas"],
    links: [],
    verified: true,
    sources: [
      "https://en.wikipedia.org/wiki/Gradient_descent",
      "https://arxiv.org/abs/2308.04079",
    ],
  },
  {
    id: "colmap",
    term: { zh: "COLMAP", en: "COLMAP" },
    aliases: [],
    short: {
      zh: "COLMAP 像照片侦探事务所：你扔进去一叠无序旅游照，它先找共同点算相机在哪，再拼稠密点云——很多 NeRF/3DGS 训练前都用它当「相机位姿 + 稀疏点」的免费包工头。",
      en: "COLMAP is the open-source detective for unordered photo sets: it runs structure-from-motion to recover cameras, then multi-view stereo to grow dense geometry—most splat pipelines start by exporting its poses and sparse points.",
    },
    definition: {
      zh: "项目集成特征匹配、增量式或全局式 SfM、MVS 与网格纹理化等模块，可通过 GUI 或命令行批处理。引用官方论文时需分别致谢 SfM、MVS、检索等子算法作者。Python 绑定 PyCOLMAP 便于与深度学习训练脚本对接。3.12 版本加入原生 sensor rig、经纬度到 UTM 转换和新姿态文件，对全景、多相机阵列和无人机重建更友好。",
      en: "COLMAP bundles established CVPR/ECCV algorithms behind a unified CLI and GUI. Typical splat workflows import images.bin/points3D.bin or textured meshes as initialization. Global SfM variants (e.g., GLOMAP) require extra citations. Licensing is BSD. Version 3.12 added native sensor-rig support, latitude/longitude to UTM conversion, and new pose files, improving panoramic, multi-camera, and drone reconstruction workflows.",
    },
    category: "workflow",
    level: "intermediate",
    relatedTagIds: [],
    relatedTerms: ["sfm", "mvs", "reconstruction"],
    prerequisiteTerms: ["sfm", "mvs"],
    advancedTerms: ["reconstruction"],
    relatedTools: ["inria-gaussian-splatting", "gsplat"],
    links: [],
    verified: true,
    sources: [
      "https://colmap.github.io/",
      "https://github.com/colmap/colmap",
      "https://radiancefields.com/colmap-3-12-released",
      "https://colmap.github.io/changelog.html",
    ],
  },
  {
    id: "gsplat-utility",
    term: {
      zh: "gsplat 库（CUDA 光栅化工具集）",
      en: "gsplat library (CUDA splat utilities)",
    },
    aliases: ["nerfstudio gsplat"],
    short: {
      zh: "gsplat 像给官方高斯渲染器换上一台改装引擎：还是把椭球泼到屏幕上，但用 CUDA 写得更省显存、更快，还带 Python 把手——适合接在 PyTorch 训练脚本里反复前向/反向。",
      en: "The gsplat project is a CUDA-accelerated Gaussian rasterizer with Python bindings: same splat idea as the Inria reference, but tuned for memory, speed, and extra research features when hooked into PyTorch training loops.",
    },
    definition: {
      zh: "仓库自述受 SIGGRAPH 3DGS 论文启发，提供与官方实现可比指标的评测脚本，并扩展批处理、3DGUT 等实验特性。安装可通过 PyPI 或源码构建 CUDA 扩展。与「仅数据格式工具」不同，它覆盖训练/渲染核心算子。注：本术语对应工程上的 gsplat 代码库（Nerfstudio 团队），与 Hugging Face 生态里的 gsplat.js 不同。",
      en: "Maintainers publish evaluation scripts matching PSNR/SSIM/LPIPS and converged Gaussian counts against the official trainer while advertising lower VRAM and faster runtime. Developers integrate it inside Nerfstudio-style stacks or standalone COLMAP examples. Not to be confused with the gsplat.js viewer.",
    },
    category: "workflow",
    level: "intermediate",
    relatedTagIds: [],
    relatedTerms: ["differentiable-rasterization", "3dgs", "compressed-gs"],
    prerequisiteTerms: ["differentiable-rasterization", "3dgs"],
    advancedTerms: ["compressed-gs"],
    relatedTools: ["gsplat", "inria-gaussian-splatting"],
    relatedPapers: ["https://arxiv.org/abs/2409.06765"],
    links: [],
    verified: true,
    sources: [
      "https://raw.githubusercontent.com/nerfstudio-project/gsplat/main/README.md",
      "https://github.com/nerfstudio-project/gsplat",
    ],
  },
  {
    id: "training-loss",
    term: {
      zh: "训练损失（3DGS）",
      en: "Training loss (3D Gaussian Splatting)",
    },
    aliases: [],
    short: {
      zh: "训练损失就像裁判给「渲染图 vs 实拍图」打分：分越高说明越不像，优化器就根据这个分数往回拽每个高斯的位置和颜色；3DGS 里最常用的配方是 L1 加上一块结构相似项（D-SSIM），再按固定比例搅在一起。",
      en: "The training loss scores how far splat renders drift from captured photos; optimizers push Gaussians to lower that score. The canonical 3DGS recipe blends an L1 photometric term with a D-SSIM structural term, weighted by a λ you pick once and reuse.",
    },
    definition: {
      zh: "原论文将损失写为 L = (1-λ)·L1 + λ·L_D-SSIM，并在实验中取 λ=0.2。额外正则（如 SuGaR 的表面对齐项）属于扩展工作。监控损失曲线时，应同时查看 PSNR/SSIM/LPIPS，以免单一标量掩盖几何伪影。",
      en: "Kerbl et al. combine L1 and D-SSIM (with λ=0.2) to encourage pixel accuracy and structural agreement. Other projects append regularizers for anti-aliasing, opacity control, or mesh-friendly alignment. Always relate scalar loss trends to perceptual metrics and qualitative renders.",
    },
    category: "workflow",
    level: "intermediate",
    relatedTagIds: [],
    relatedTerms: ["3dgs", "metrics", "mip-splat"],
    prerequisiteTerms: ["3dgs", "metrics"],
    advancedTerms: ["mip-splat"],
    relatedTools: ["inria-gaussian-splatting", "gsplat"],
    relatedEngines: ["playcanvas"],
    relatedPapers: ["https://arxiv.org/abs/2308.04079"],
    links: [],
    verified: true,
    sources: [
      "https://arxiv.org/abs/2308.04079",
      "https://en.wikipedia.org/wiki/Structural_similarity_index_measure",
    ],
  },
  {
    id: "mesh-extraction",
    term: { zh: "网格提取", en: "Mesh Extraction" },
    aliases: ["surface extraction"],
    short: {
      zh: "网格提取就像把一团橡皮泥（点云或高斯堆）翻模成硬壳手办：算法从数据里「抠」出三角面片，得到可在 Blender、游戏引擎里布尔、加骨骼的网格；3DGS 里常用 Poisson、SuGaR 等路线。",
      en: "Mesh extraction turns unstructured splats or points into a triangle soup you can boolean, rig, or ship to game engines. For Gaussian splats, researchers often sample implicit surfaces or aligned Gaussians, then run Poisson reconstruction instead of marching through noisy densities.",
    },
    definition: {
      zh: "SuGaR 等工作通过正则让高斯贴面，再用 Poisson 提取网格；经典多视几何则从匹配点与法线估计表面。提取质量与训练噪声、浮游高斯、采样密度强相关，通常与 splat 渲染质量分别评估。Radiance Fields 的概念页也把 2DGS、RaDe-GS、Gaussian Frosting、Texture-GS 归入从高斯或辐射场提取可编辑表面的活跃路线。",
      en: "The task spans Poisson reconstruction, marching cubes on SDFs, and splat-specific pipelines such as SuGaR's level-set sampling. Triangle meshes remain the interchange currency for DCC tools even when rendering stays on splats. Radiance Fields' overview also names 2DGS, RaDe-GS, Gaussian Frosting, and Texture-GS as active routes for pulling editable surfaces from Gaussian or radiance-field representations.",
    },
    category: "workflow",
    level: "intermediate",
    relatedTagIds: [],
    relatedTerms: ["mesh", "point-cloud", "reconstruction"],
    prerequisiteTerms: ["mesh", "point-cloud"],
    advancedTerms: ["reconstruction"],
    relatedTools: ["blender-3dgs-addon"],
    relatedEngines: ["blender"],
    relatedPapers: ["https://arxiv.org/abs/2311.12775"],
    links: [],
    verified: true,
    sources: [
      "https://arxiv.org/abs/2311.12775",
      "https://en.wikipedia.org/wiki/3D_reconstruction_from_multiple_images",
      "https://radiancefields.com/what-is-3d-gaussian-splatting",
      "https://surfsplatting.github.io/",
    ],
  },
  {
    id: "ply-format",
    term: { zh: "PLY 文件格式", en: "PLY file format" },
    aliases: ["PLY", "Polygon File Format", "Stanford Triangle Format"],
    short: {
      zh: "PLY 像带表头的配料清单：先写「有多少顶点、每个顶点有哪些字段」，再往下逐行列数字；3D 高斯训练导出也常用它，因为可以给每个点挂上位置、颜色、球谐系数等自定义属性。",
      en: "PLY is a text-or-binary recipe card: a header lists how many vertices exist and which properties (x, y, z, normals, SH bands…) follow, then the data rows stream underneath—exactly why splat trainers love it for rich Gaussian attributes.",
    },
    definition: {
      zh: "斯坦福大学 90 年代为扫描数据设计，支持多边形与扩展属性。3DGS 社区在标准属性名（如 f_dc_*、scale_*）上形成事实标准，但不同工具仍可能扩展字段。ASCII 便于人类检查，二进制更省体积。PlayCanvas 手册将 PLY 写成 3D Gaussian Splat 数据的常用互换容器，并说明与典型网格 PLY 在属性集与体量上的差异；未压缩文件可达数十 MB 至数 GB，多作为离线交换而非直接网页交付。",
      en: "The Stanford PLY spec couples an element/property header with vertex or face records. Gaussian splat exports piggyback on that extensibility for SH coefficients and covariance data. Always verify endianness and property naming when swapping between trainers and viewers.",
    },
    category: "format",
    level: "beginner",
    relatedTagIds: [],
    relatedTerms: ["point-cloud", "spherical-harmonics"],
    prerequisiteTerms: ["point-cloud"],
    advancedTerms: ["spherical-harmonics"],
    introducedIn: "1994",
    introducedBy: "Greg Turk; Stanford University",
    introducedSourceUrl: "https://en.wikipedia.org/wiki/PLY_(file_format)",
    introducedQuoteEn:
      "PLY is a computer file format known as the Polygon File Format or the Stanford Triangle Format.",
    relatedTools: ["supersplat", "inria-gaussian-splatting"],
    relatedEngines: ["supersplat"],
    links: [],
    verified: true,
    sources: [
      "http://graphics.stanford.edu/data/3Dscanrep/",
      "https://en.wikipedia.org/wiki/PLY_(file_format)",
      "https://developer.playcanvas.com/user-manual/gaussian-splatting/formats/ply/",
      "https://github.com/graphdeco-inria/gaussian-splatting",
    ],
  },
  {
    id: "splat-format",
    term: { zh: ".splat 二进制格式", en: ".splat binary format" },
    aliases: ["splat file"],
    short: {
      zh: ".splat 像把 PLY 那张大表压成快递盒：同样是高斯参数，但按引擎约定的二进制布局排好，网页端拖文件时加载更快；不同实现（官方训练导出、PlayCanvas 生态）细节可能不完全互通，换工具前要核对。",
      en: "A .splat file packs Gaussian parameters into a tight binary layout tuned for fast loading in web viewers—think shipping foam peanuts in a labeled crate instead of a verbose text manifest. Vendors differ, so always verify headers when hopping between exporters.",
    },
    definition: {
      zh: "社区在 Inria 参考实现与 Web 查看器之间形成了事实上的 .splat 交换格式，通常包含位置、协方差、球谐、透明度等字段的紧凑编码。与 PLY 相比更利于流式加载，但人类不可读。PlayCanvas / SuperSplat 工具链常与此格式协同。OctaneRender 2026 对 PLY 与 SPZ 的支持，以及 2027 路线图中的 CG 场景转高斯计划，说明高斯格式正从网页查看器扩展到离线渲染与 DCC 管线。",
      en: "Binary splat containers strip textual overhead from PLY while preserving the data needed for real-time rasterizers. SuperSplat and other editors import/export these blobs for publishing. Interoperability demands checking SH ordering, endianness, and optional compression flags per tool. OctaneRender 2026's PLY/SPZ support and its 2027 roadmap for exporting CG scenes into splats show Gaussian formats expanding from web viewers into offline rendering and DCC pipelines.",
    },
    category: "format",
    level: "intermediate",
    relatedTagIds: [],
    relatedTerms: ["splat", "compressed-gs", "supersplat"],
    prerequisiteTerms: ["splat", "compressed-gs"],
    advancedTerms: ["supersplat"],
    relatedTools: ["supersplat", "three-gaussian-splatting"],
    relatedEngines: ["playcanvas"],
    links: [],
    verified: true,
    sources: [
      "https://raw.githubusercontent.com/mkkellogg/GaussianSplats3D/main/README.md",
      "https://developer.playcanvas.com/user-manual/graphics/gaussian-splatting/",
      "https://radiancefields.com/octanerender-2026-released-and-2027-roadmap-announced",
      "https://home.otoy.com/render/octane-render/news/octane2026/",
    ],
  },
  {
    id: "ksplat",
    term: { zh: "KSPLAT / .ksplat 格式", en: "KSPLAT (.ksplat) format" },
    aliases: ["KSPLAT", ".ksplat"],
    short: {
      zh: ".ksplat 像是 GaussianSplats3D 项目私藏的压缩行李箱：从 .ply 或 .splat 再压一层，换更小的文件、更快的网页加载；规格没像 PLY 那样写成国际标准，换工具前最好试转试读。",
      en: "The .ksplat container is Mark Kellogg's trimmed, compressed splat package for the GaussianSplats3D viewer—great for faster loads, but it is a project-specific binary rather than a formal Khronos-style spec, so treat interoperability as \"try it and see.\"",
    },
    definition: {
      zh: "README 说明可与 INRIA .ply、标准 .splat 互转，并强调转成 .ksplat 后加载最快。压缩级别、缓存排序等细节随版本迭代；PlayCanvas SplatTransform 等工具链亦提供相关转换能力。",
      en: "KSplatLoader APIs export converted buffers for download. Because the format evolves, shipping cross-engine assets often stays on PLY/SPZ while using .ksplat inside a known web stack.",
    },
    category: "format",
    level: "intermediate",
    relatedTagIds: [],
    relatedTerms: ["splat", "compressed-gs", "splat-viewer"],
    prerequisiteTerms: ["splat", "compressed-gs"],
    advancedTerms: ["splat-viewer"],
    relatedTools: ["three-gaussian-splatting", "supersplat"],
    relatedEngines: ["threejs"],
    links: [],
    verified: true,
    sources: [
      "https://raw.githubusercontent.com/mkkellogg/GaussianSplats3D/main/README.md",
      "https://github.com/mkkellogg/GaussianSplats3D",
    ],
  },
  {
    id: "usd-particle-field",
    term: {
      zh: "USD ParticleField（含 3DGS）",
      en: "USD ParticleField (incl. 3D Gaussian Splats)",
    },
    aliases: ["OpenUSD ParticleField"],
    short: {
      zh: "在 USD 里，ParticleField 像给渲染器的一份「粒子场说明书」：写明每个粒子在哪、用什么核函数、长什么样；其中专门有 3D Gaussian Splat 的派生模式，好让 Omniverse 这类 RTX 渲染器把高斯当一等公民接进 USD 场景。",
      en: "USD's ParticleField schema is the paperwork that tells a renderer how to interpret volumetric particles: positions, kernels, radiance, optional scales and orientations. Derived types such as ParticleField3DGaussianSplat let pipelines store splats as first-class USD prims instead of ad-hoc blobs.",
    },
    definition: {
      zh: "OpenUSD 文档将 ParticleField 定义为具体实现的基类，并要求派生模式提供位置、核、辐射亮度等属性。NVIDIA Omniverse 文档进一步说明如何把 .ply 高斯经脚本转成 USD，以便 RTX 路径追踪与网格互动。跨 DCC 传输时需核对属性绑定与色彩空间。",
      en: "ParticleField generalizes multiple field types, including 3D Gaussian splats. Tooling converts trained PLY assets into USD stages referencing these prims so RTX can path-trace them alongside meshes. Custom exporters must inherit the schema expectations for validation.",
    },
    category: "format",
    level: "expert",
    relatedTagIds: [],
    relatedTerms: ["mesh", "voxelization"],
    prerequisiteTerms: ["mesh"],
    advancedTerms: ["voxelization"],
    relatedEngines: ["nvidia-omniverse"],
    links: [],
    verified: true,
    sources: [
      "https://openusd.org/release/user_guides/schemas/usdVol/ParticleField.html",
      "https://docs.omniverse.nvidia.com/materials-and-rendering/latest/particle-fields.html",
    ],
  },
  {
    id: "psnr",
    term: { zh: "峰值信噪比（PSNR）", en: "Peak Signal-to-Noise Ratio (PSNR)" },
    aliases: ["PSNR"],
    short: {
      zh: "PSNR 像用分贝表量「原图和生成图差了多少噪声」：数值越高通常表示越接近，但它只管像素层面的平均误差，遇到模糊或结构错位时可能和人眼感受不一致。",
      en: "PSNR compares the max possible signal power to the noise energy between two images, expressed in decibels—higher usually means closer pixels, but it can disagree with human perception when blur or structure breaks.",
    },
    definition: {
      zh: "定义上由 MSE 与像素动态范围导出；3DGS/NeRF 论文常在 Mip-NeRF360 等基准上报告 PSNR 与 SSIM、LPIPS 并列。对比不同方法时应保持数据集划分与色调映射一致。",
      en: "PSNR rewards pixel-wise fidelity. Teams report it alongside SSIM and LPIPS because high PSNR does not guarantee perceptual quality. Use the same train/test splits and bit depth when comparing numbers across papers.",
    },
    category: "metric",
    level: "beginner",
    relatedTagIds: [],
    relatedTerms: ["metrics", "3dgs"],
    prerequisiteTerms: ["metrics"],
    advancedTerms: ["3dgs"],
    relatedTools: ["gsplat"],
    links: [],
    verified: true,
    sources: [
      "https://en.wikipedia.org/wiki/Peak_signal-to-noise_ratio",
      "https://arxiv.org/abs/2308.04079",
    ],
  },
  {
    id: "ssim",
    term: {
      zh: "结构相似度（SSIM）",
      en: "Structural Similarity Index Measure (SSIM)",
    },
    aliases: ["SSIM", "structural similarity index"],
    short: {
      zh: "SSIM 像比较两幅画时不仅看「像素差多少」，还看亮块、对比和结构是不是还像同一物体；比单纯 MSE 更贴近人眼对「糊成一团」的反感，但仍不是万能裁判。",
      en: "SSIM scores how well luminance, contrast, and structure match between patches—closer to human annoyance with blur than raw MSE, though it still misses every failure mode.",
    },
    definition: {
      zh: "全参考指标，在滑动窗口上聚合。3DGS 论文将 D-SSIM 项与 L1 组合成训练损失。报告数值时应说明窗口大小与通道权重，跨论文比较需谨慎。",
      en: "SSIM generalizes Wang–Bovik's framework; differentiable variants plug into splat optimization. Teams usually log SSIM alongside PSNR and LPIPS on held-out views.",
    },
    category: "metric",
    level: "beginner",
    relatedTagIds: [],
    relatedTerms: ["metrics", "nerf"],
    prerequisiteTerms: ["metrics"],
    advancedTerms: ["nerf"],
    relatedTools: ["gsplat"],
    links: [],
    verified: true,
    sources: [
      "https://en.wikipedia.org/wiki/Structural_similarity_index_measure",
      "https://arxiv.org/abs/2308.04079",
    ],
  },
  {
    id: "lpips",
    term: {
      zh: "LPIPS（学习感知图像块相似度）",
      en: "Learned Perceptual Image Patch Similarity (LPIPS)",
    },
    aliases: ["LPIPS", "perceptual metric LPIPS"],
    short: {
      zh: "LPIPS 像请一位看过海量照片的卷积网络当裁判：它不逐像素抠差，而是比较中间层特征，离得越远分数越高；做 3DGS 论文表格时常和 PSNR/SSIM 一起报，用来补「人眼观感」这块短板。",
      en: "LPIPS feeds paired images through a pretrained CNN, compares deep features (optionally calibrated), and returns a distance where higher means more different—useful when PSNR looks fine but pictures still feel wrong.",
    },
    definition: {
      zh: "Zhang et al. 提供 pip install lpips 实现，默认 Alex/VGG 骨干。作为训练损失时需注意梯度行为与归一化区间。引用论文应写明 backbone 与版本号。",
      en: "The reference implementation exposes AlexNet/VGG/SqueezeNet variants. Gaussian splat papers cite LPIPS↓ on validation views. Unlike PSNR, it rewards semantic similarity but costs more compute.",
    },
    category: "metric",
    level: "intermediate",
    relatedTagIds: [],
    relatedTerms: ["metrics", "nerf"],
    prerequisiteTerms: ["metrics"],
    advancedTerms: ["nerf"],
    relatedTools: ["gsplat"],
    relatedPapers: ["https://arxiv.org/abs/1801.03924"],
    links: [],
    verified: true,
    sources: [
      "https://raw.githubusercontent.com/richzhang/PerceptualSimilarity/master/README.md",
      "https://arxiv.org/abs/1801.03924",
    ],
  },
  {
    id: "fps",
    term: { zh: "帧率（FPS）", en: "Frames Per Second (FPS)" },
    aliases: ["FPS", "frame rate"],
    short: {
      zh: "FPS 就像数动画片一秒翻过多少张胶片：在 3DGS 里既可以是「显卡一秒画多少帧交互画面」，也可以是论文表格里「训练好后射线追踪/光栅化跑多快」——数字越高越流畅，但记得分清测的是训练还是推理。",
      en: "FPS counts how many full images a pipeline produces each second—either realtime splat rendering in a browser or the throughput numbers quoted beside PSNR tables. Higher feels smoother, but always ask which stage was timed.",
    },
    definition: {
      zh: "维基将帧率与刷新率、GPU 生成速率区分开。评估 splat 查看器时，应在目标分辨率与相机运动下记录 1% low 与平均 FPS，并披露硬件与浏览器。论文中的 FPS 常指训练后高斯模型的实时渲染速度。",
      en: "Benchmarks should specify resolution, MSAA settings, and whether WebGPU/WebGL paths were used. Academic tables often list FPS next to memory footprint to compare explicit radiance methods.",
    },
    category: "metric",
    level: "beginner",
    relatedTagIds: [],
    relatedTerms: ["real-time-rendering", "webgl-webgpu"],
    prerequisiteTerms: ["real-time-rendering"],
    advancedTerms: ["webgl-webgpu"],
    relatedEngines: ["playcanvas", "godot"],
    relatedPapers: ["https://arxiv.org/abs/2308.04079"],
    links: [],
    verified: true,
    sources: [
      "https://en.wikipedia.org/wiki/Frame_rate",
      "https://arxiv.org/abs/2308.04079",
    ],
  },
  {
    id: "splat-count",
    term: { zh: "高斯数 / Splat 数量", en: "Gaussian / splat count" },
    aliases: ["number of Gaussians"],
    short: {
      zh: "Splat 数量就像场景里塞了多少颗半透明椭球：训练过程中会克隆、分裂、删掉多余的高斯——最后留下来的总数，既影响显存占用，也影响文件体积和加载时间。",
      en: "Splat count tracks how many Gaussian primitives survive optimization—think counting marbles in a jar. More splats can capture detail but inflate VRAM, storage, and sort cost; pruning and compression fight the same number.",
    },
    definition: {
      zh: "3DGS 论文在自适应控制段落描述根据梯度阈值增删高斯；评测表格常报告收敛后的高斯数量与 FPS、内存。对比不同 pipeline 时应固定随机种子与 densify 规则。Infinite Realities 报道中 30 秒动态片段对应约 1800 个训练 PLY 与 30 万张输入图像，说明动态 4D 捕捉还需要把单帧高斯数放进时间序列和存储预算中一起评估。",
      en: "Densification schedules grow or split splats when view-space gradients spike; opacity pruning removes low-alpha Gaussians. gsplat reproduces official Gaussian counts when benchmarking. SPZ/KSplat formats also hinge on how many primitives remain. The Infinite Realities report describes about 1,800 trained PLY files and 300K input images for a 30-second dynamic clip, showing that 4D capture must evaluate splat count together with time sequence and storage budget.",
    },
    category: "metric",
    level: "intermediate",
    relatedTagIds: [],
    relatedTerms: ["splat", "densification", "pruning"],
    prerequisiteTerms: ["splat", "densification"],
    advancedTerms: ["pruning"],
    relatedTools: ["gsplat"],
    relatedEngines: ["supersplat"],
    relatedPapers: ["https://arxiv.org/abs/2308.04079"],
    links: [],
    verified: true,
    sources: [
      "https://arxiv.org/abs/2308.04079",
      "https://raw.githubusercontent.com/nerfstudio-project/gsplat/main/README.md",
      "https://radiancefields.com/infinite-realities-the-future-of-imaging",
      "https://www.infiniterealities.com/",
    ],
  },
];

export const glossaryById: Record<string, GlossaryEntry> =
  Object.fromEntries(glossary.map((entry) => [entry.id, entry]));
