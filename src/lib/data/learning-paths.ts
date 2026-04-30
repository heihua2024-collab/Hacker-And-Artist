/**
 * 学习路径（B1 满血版：4 条路径，共 26 个模块）
 * 路径 01：从零理解高斯泼溅（入门 / 7 模块）
 * 路径 02：采集与训练工作流（进阶 / 8 模块）
 * 路径 03：Web 展示与交互（进阶 / 6 模块）
 * 路径 04：空间叙事与媒体实验（通识 / 5 模块）
 *
 * keyConcepts 全部对齐 src/lib/data/glossary.ts 的术语 id；
 * tools/cases 索引对齐 src/lib/data/tools.ts 与 src/lib/data/cases.ts 的 slug。
 */

import type { Bilingual, FormatId, LevelId } from "@/lib/taxonomy";

export type ResourceType =
  | "paper"
  | "github"
  | "video"
  | "article"
  | "website"
  | "tool";

export type LearningResource = {
  type: ResourceType;
  title: string;
  url: string;
};

export type LearningModule = {
  index: string;
  title: Bilingual;
  summary: Bilingual;
  format: FormatId;
  duration: string;
  outline: Bilingual[];
  keyConcepts: string[];
  resources: LearningResource[];
};

export type LearningPath = {
  slug: string;
  title: Bilingual;
  subtitle: Bilingual;
  level: LevelId;
  audience: Bilingual;
  duration: string;
  prerequisites: Bilingual[];
  outcomes: Bilingual[];
  modules: LearningModule[];
  callToAction: Bilingual;
  status: "live" | "preparing";
  verified: boolean;
  sources: string[];
};

const understandGaussianSplatting: LearningPath = {
  slug: "understand-gaussian-splatting",
  title: {
    zh: "从零理解高斯泼溅",
    en: "Understanding Gaussian Splatting",
  },
  subtitle: {
    zh: "解构空间计算时代的新一代 3D 表达方式",
    en: "Deconstructing the next-generation 3D representation for spatial computing",
  },
  level: "beginner",
  audience: {
    zh: "对空间媒体感兴趣的非技术读者",
    en: "Non-technical readers interested in spatial media",
  },
  duration: "约 2.5 小时",
  prerequisites: [
    { zh: "高中数学基础", en: "High school math" },
    { zh: "对 3D 概念有基本认知", en: "Basic 3D awareness" },
  ],
  outcomes: [
    {
      zh: "理解 3DGS 与传统 3D 格式（Mesh / 点云）的核心区别",
      en: "Understand the core differences between 3DGS and traditional 3D formats like Mesh and Point Clouds",
    },
    {
      zh: "掌握高斯原语的基本属性与视觉构成原理",
      en: "Grasp the basic attributes and visual composition principles of Gaussian primitives",
    },
    {
      zh: "理清从照片到 3D 场景的完整训练生命周期",
      en: "Clarify the complete training lifecycle from photos to a 3D scene",
    },
    {
      zh: "知晓当前主流的高斯泼溅创作与查看工具",
      en: "Know the mainstream creation and viewing tools for Gaussian Splatting",
    },
    {
      zh: "建立对 3DGS 局限性与未来发展方向的客观认知",
      en: "Establish an objective understanding of the limitations and future directions of 3DGS",
    },
  ],
  modules: [
    {
      index: "01",
      title: {
        zh: "从点阵到泼溅：3D 表达的演进",
        en: "From Points to Splats: Evolution of 3D Representation",
      },
      summary: {
        zh: "探讨高斯泼溅如何在多边形网格、离散点云与 NeRF 的隐式神经场之间找到平衡。这不仅是一次技术升级，更是对「如何记录现实」的一次重新审视。",
        en: "Explore how Gaussian Splatting finds balance among polygon meshes, discrete point clouds, and the implicit neural fields of NeRFs, offering a new perspective on capturing reality.",
      },
      format: "article",
      duration: "20 分钟",
      outline: [
        { zh: "多边形网格 (Mesh) 的经典统治", en: "The Classic Reign of Polygon Meshes" },
        { zh: "点云 (Point Cloud) 的原始与粗糙", en: "The Rawness of Point Clouds" },
        { zh: "NeRF 的崛起与计算瓶颈", en: "Rise of NeRF and Computational Bottlenecks" },
        { zh: "3DGS 的折中艺术", en: "The Compromise Art of 3DGS" },
      ],
      keyConcepts: ["mesh", "point-cloud", "nerf", "3dgs"],
      resources: [
        {
          type: "website",
          title: "Getting Started with Neural Radiance Fields",
          url: "https://developer.nvidia.com/blog/getting-started-with-neural-radiance-fields/",
        },
        {
          type: "article",
          title: "A Survey on 3D Gaussian Splatting",
          url: "https://arxiv.org/abs/2401.03890",
        },
        {
          type: "video",
          title: "NeRF 与高斯泼溅对比（Radiance Fields 频道）",
          url: "https://www.youtube.com/watch?v=kSH9c3Iq7Mk",
        },
      ],
    },
    {
      index: "02",
      title: {
        zh: "解剖一颗高斯：形态、色彩与不透明度",
        en: "Anatomy of a Splat: Shape, Color, and Opacity",
      },
      summary: {
        zh: "想象用无数个半透明的椭球水滴填满空间。我们将拆解单个高斯体的核心参数，看它们如何通过形状、颜色和方向的组合，重现出逼真的光影细节。",
        en: "Imagine filling space with countless translucent ellipsoidal water drops. We deconstruct the core parameters of a single Gaussian to see how shape, color, and orientation recreate realistic lighting details.",
      },
      format: "tutorial",
      duration: "25 分钟",
      outline: [
        { zh: "位置与缩放：定义空间坐标", en: "Position and Scale: Defining Spatial Coordinates" },
        { zh: "协方差与各向异性：塑造椭球形态", en: "Covariance and Anisotropy: Shaping the Ellipsoid" },
        { zh: "球谐函数 (SH)：捕捉视点相关的色彩", en: "Spherical Harmonics (SH): Capturing View-Dependent Colors" },
        { zh: "不透明度：渲染的基础", en: "Opacity: The Foundation of Rendering" },
      ],
      keyConcepts: ["splat", "covariance", "anisotropy", "spherical-harmonics", "opacity"],
      resources: [
        {
          type: "article",
          title: "Introduction to 3D Gaussian Splatting",
          url: "https://huggingface.co/blog/gaussian-splatting",
        },
        {
          type: "paper",
          title: "3D Gaussian Splatting for Real-Time Radiance Field Rendering",
          url: "https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/",
        },
      ],
    },
    {
      index: "03",
      title: {
        zh: "生长与修剪：高斯场景的训练流",
        en: "Growth and Pruning: The Training Pipeline",
      },
      summary: {
        zh: "从稀疏的特征点开始，高斯体会根据画面误差自动分裂、克隆或自我销毁。这一过程如同细胞的分裂与凋亡，最终雕刻出极致细腻的 3D 景观。",
        en: "Starting from sparse feature points, Gaussians automatically split, clone, or self-destruct based on rendering errors. This process, akin to cellular division and apoptosis, carves out highly detailed 3D landscapes.",
      },
      format: "video",
      duration: "30 分钟",
      outline: [
        { zh: "SfM 初始化：从二维照片提取三维点阵", en: "SfM Initialization: Extracting 3D Points from 2D Photos" },
        { zh: "致密化：高斯的克隆与分裂", en: "Densification: Cloning and Splitting of Gaussians" },
        { zh: "修剪：剔除冗余与透明的高斯体", en: "Pruning: Removing Redundant and Transparent Gaussians" },
        { zh: "自适应密度控制的反馈循环", en: "The Feedback Loop of Adaptive Density Control" },
      ],
      keyConcepts: ["sfm", "densification", "pruning", "adaptive-density-control"],
      resources: [
        {
          type: "video",
          title: "SIGGRAPH 2023 Presentation Video",
          url: "https://www.youtube.com/watch?v=T_kXZ4x6PrI",
        },
        {
          type: "website",
          title: "COLMAP — Structure-from-Motion and Multi-View Stereo",
          url: "https://colmap.github.io/",
        },
      ],
    },
    {
      index: "04",
      title: {
        zh: "极致效能的秘密：可微光栅化",
        en: "The Secret to Extreme Efficiency: Differentiable Rasterization",
      },
      summary: {
        zh: "为什么高斯泼溅能达到每秒百帧的实时渲染？我们将解析其定制化的光栅化管线，看看它是如何巧妙避开繁重的光线追踪计算，实现速度与画质的双赢。",
        en: "Why can Gaussian Splatting achieve real-time rendering at hundreds of frames per second? We analyze its custom rasterization pipeline to see how it bypasses heavy ray tracing computations.",
      },
      format: "article",
      duration: "20 分钟",
      outline: [
        { zh: "光栅化 vs 光线追踪", en: "Rasterization vs. Ray Tracing" },
        { zh: "Tile-based 渲染管线的优势", en: "Advantages of the Tile-based Rendering Pipeline" },
        { zh: "深度排序与 Alpha 混合", en: "Depth Sorting and Alpha Blending" },
        { zh: "为何「可微」对反向传播至关重要", en: 'Why "Differentiability" is Crucial for Backpropagation' },
      ],
      keyConcepts: ["differentiable-rasterization", "real-time-rendering", "metrics"],
      resources: [
        {
          type: "github",
          title: "Differential Gaussian Rasterization",
          url: "https://github.com/graphdeco-inria/diff-gaussian-rasterization",
        },
        {
          type: "article",
          title: "A Dive into Differentiable Rasterization",
          url: "https://towardsdatascience.com/a-dive-into-differentiable-rasterization-70b99144d471",
        },
      ],
    },
    {
      index: "05",
      title: {
        zh: "上手实践：常用工具与工作流",
        en: "Hands-on Practice: Common Tools and Workflows",
      },
      summary: {
        zh: "抛开底层代码，我们将梳理市场上最易用的移动端与桌面端创作平台，带你完成从拍摄到导出的首次高斯泼溅体验，将物理空间封装进属于你的数字胶囊。",
        en: "Moving away from underlying code, we review the most accessible creation platforms, guiding you through your first Gaussian Splatting experience from capture to export, encapsulating physical space into digital capsules.",
      },
      format: "tool",
      duration: "40 分钟",
      outline: [
        { zh: "拍摄规范：如何收集有效影像", en: "Capture Guidelines: How to Collect Effective Images" },
        { zh: "Luma 与 Polycam：移动端的云端管线", en: "Luma and Polycam: Mobile Cloud Pipelines" },
        { zh: "Postshot：桌面端的快速本地训练", en: "Postshot: Fast Local Training on Desktop" },
        { zh: "查看器与文件格式解析", en: "Viewers and File Format Breakdown" },
      ],
      keyConcepts: ["reconstruction", "splat-viewer"],
      resources: [
        {
          type: "tool",
          title: "Polycam — 3D Scanner",
          url: "https://poly.cam",
        },
        {
          type: "tool",
          title: "Luma AI",
          url: "https://lumalabs.ai",
        },
        {
          type: "tool",
          title: "Jawset Postshot",
          url: "https://www.jawset.com",
        },
        {
          type: "video",
          title: "Apple 锐利 3D 照片教程（Radiance Fields 频道）",
          url: "https://www.youtube.com/watch?v=iZp-FLvXVFc",
        },
      ],
    },
    {
      index: "06",
      title: {
        zh: "局限与突破：从静态走向 4D 动态",
        en: "Limitations and Breakthroughs: From Static to 4D Dynamics",
      },
      summary: {
        zh: "任何技术都有其阿喀琉斯之踵。我们将探讨当前 3DGS 在存储体积、反射材质处理上的短板，并展望 4D 动态捕捉与轻量化压缩的前沿探索。",
        en: "Every technology has its Achilles heel. We discuss current 3DGS shortcomings in storage size and reflective materials, while looking forward to frontier explorations in 4D dynamic capture and lightweight compression.",
      },
      format: "article",
      duration: "20 分钟",
      outline: [
        { zh: "庞大的文件体积与显存占用", en: "Massive File Sizes and VRAM Usage" },
        { zh: "抗锯齿与镜面反射的挑战", en: "Challenges with Anti-aliasing and Specular Reflections" },
        { zh: "空间压缩与 Scaffold-GS", en: "Spatial Compression and Scaffold-GS" },
        { zh: "4DGS：捕捉时间的流动", en: "4DGS: Capturing the Flow of Time" },
      ],
      keyConcepts: ["compressed-gs", "scaffold-gs", "4dgs"],
      resources: [
        {
          type: "paper",
          title: "Scaffold-GS: Structured 3D Gaussians for View-Adaptive Rendering",
          url: "https://city-super.github.io/scaffold-gs/",
        },
        {
          type: "paper",
          title: "Real-time Photorealistic Dynamic Scene Representation from Monocular Videos",
          url: "https://guanjunwu.github.io/4DGS/",
        },
        {
          type: "video",
          title: "高斯泼溅正在变得更真实（Radiance Fields 频道）",
          url: "https://www.youtube.com/watch?v=C3KBNJxTBo0",
        },
      ],
    },
    {
      index: "07",
      title: {
        zh: "延伸阅读：文献与社区指南",
        en: "Further Reading: Literature and Community Guide",
      },
      summary: {
        zh: "为渴望深入底层原理或寻求商业落地的读者准备的进阶地图，包含核心论文清单、开源代码库以及活跃的创作者社区链接。",
        en: "An advanced map for readers eager to dive into underlying principles or seek commercial applications, including core reading lists, open-source repositories, and active creator communities.",
      },
      format: "publication",
      duration: "15 分钟",
      outline: [
        { zh: "必读的里程碑论文", en: "Must-Read Milestone Papers" },
        { zh: "Web 端开源渲染器盘点", en: "Overview of Open-Source Web Renderers" },
        { zh: "模型剪辑与资产化工具", en: "Model Editing and Assetization Tools" },
      ],
      keyConcepts: ["webgl-webgpu", "supersplat"],
      resources: [
        {
          type: "github",
          title: "Awesome 3D Gaussian Splatting",
          url: "https://github.com/MrNeRF/awesome-3D-gaussian-splatting",
        },
        {
          type: "tool",
          title: "SuperSplat — Web-based Splat Editor",
          url: "https://playcanvas.com/supersplat/editor",
        },
      ],
    },
  ],
  callToAction: {
    zh: "学完之后，前往印刻万物的工具索引挑选一款平台，扫描你书桌上的第一件物品吧。",
    en: "After this path, head over to the TOP3DGS tool index, pick a platform, and scan the first object on your desk.",
  },
  status: "live",
  verified: true,
  sources: [
    "https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/",
    "https://github.com/MrNeRF/awesome-3D-gaussian-splatting",
  ],
};

const captureAndTraining: LearningPath = {
  slug: "capture-and-training",
  title: { zh: "采集与训练工作流", en: "Capture & Training Workflow" },
  subtitle: {
    zh: "从光线、镜头到 SfM、训练参数，一条龙打通从现实到高斯的链路",
    en: "From lighting and lenses to SfM and training params: an end-to-end pipeline from reality to Gaussians",
  },
  level: "intermediate",
  audience: {
    zh: "想自己动手扫描和训练高斯模型的创作者、摄影师与开发者",
    en: "Creators, photographers and developers who want to capture and train splats themselves",
  },
  duration: "约 4 小时",
  prerequisites: [
    { zh: "完成路径 01 或对 3DGS 概念已有基本理解", en: "Completed Path 01 or already grasp the basics of 3DGS" },
    { zh: "拥有手机、相机或运动相机等可用拍摄设备", en: "Have a phone, camera or action cam available" },
    { zh: "愿意按规范执行拍摄并适应等待训练的节奏", en: "Willing to follow capture protocols and tolerate training waits" },
  ],
  outcomes: [
    { zh: "建立面向 3DGS 的拍摄前评估清单（光线、清晰度、重合度）", en: "Build a pre-shoot checklist for 3DGS-ready captures" },
    { zh: "掌握小空间、物体与大空间三类典型场景的拍摄路径", en: "Master capture routes for small rooms, objects and large spaces" },
    { zh: "能在云端与本地训练之间做出合理选择并复盘成本", en: "Choose between cloud and local training with cost awareness" },
    { zh: "学会用 SuperSplat 与 splat-transform 做基础检测、清理与导出", en: "Use SuperSplat and splat-transform for QC, cleanup and export" },
    { zh: "建立可复用的「拍摄—预处理—训练—导出」工程模板", en: "Establish a reusable capture-preprocess-train-export workflow template" },
  ],
  modules: [
    {
      index: "01",
      title: {
        zh: "拍摄前的工程：光线、清晰度与重合度",
        en: "Pre-shoot Engineering: Light, Sharpness & Overlap",
      },
      summary: {
        zh: "把拍摄当工程而不是创作。本模块梳理光线条件、对焦清晰度与画面重合度三大基础变量，并给出一份可贴在墙上的拍摄前自检清单，避免训练时为前期偷懒买单。",
        en: "Treat capture as engineering rather than improvisation. This module consolidates the three foundational variables — lighting, focus sharpness and frame overlap — and offers a pre-shoot self-check list to keep training runs from paying interest on lazy capture.",
      },
      format: "article",
      duration: "25 分钟",
      outline: [
        { zh: "为什么 3DGS 对光线一致性比对色温更敏感", en: "Why 3DGS cares more about light consistency than color temperature" },
        { zh: "判断清晰度：从对焦点到运动模糊", en: "Judging sharpness: from focal points to motion blur" },
        { zh: "重合度的工程口诀：横向 70%、纵向 60%", en: "Overlap rule of thumb: 70% horizontal, 60% vertical" },
        { zh: "拍摄前自检清单：八条硬指标", en: "The eight-item pre-shoot checklist" },
      ],
      keyConcepts: ["photogrammetry", "sfm", "training-loss"],
      resources: [
        {
          type: "article",
          title: "面向三维重建的光线一致性与画面清晰度",
          url: "/learn/articles/shooting-light-and-sharpness",
        },
        {
          type: "article",
          title: "小空间首次拍摄：有效画面与回字形路径",
          url: "/learn/articles/first-capture-essentials",
        },
      ],
    },
    {
      index: "02",
      title: {
        zh: "三层拍摄法：从小空间到回字形路径",
        en: "The Three-Layer Capture Method",
      },
      summary: {
        zh: "把空间想象成洋葱，从内到外分三层环绕拍摄。本模块以小空间为例讲清回字形路径的设计、镜头高度的层级关系，以及如何在狭小场地里避免相机彼此互拍。",
        en: "Picture the space as an onion: shoot in three concentric layers. This module walks through the回字-shaped path design, lens-height hierarchy, and how to keep cameras from photographing each other inside cramped venues.",
      },
      format: "tutorial",
      duration: "30 分钟",
      outline: [
        { zh: "三层环绕的几何意义：高、中、低视角的互补", en: "Geometric meaning of three rings: high, mid and low viewpoints" },
        { zh: "回字形路径与回环闭合：让 SfM 算得动", en: "回-shaped paths and loop closure: making SfM converge" },
        { zh: "小空间专属：避免镜头入画与遮挡", en: "Small-space tactics: avoiding lens-in-frame and occlusion" },
        { zh: "实战演练：用 Scaniverse / Luma 走一次完整路径", en: "Hands-on: a full route with Scaniverse / Luma" },
      ],
      keyConcepts: ["sfm", "colmap", "novel-view-synthesis"],
      resources: [
        {
          type: "tool",
          title: "Scaniverse",
          url: "https://scaniverse.com",
        },
        {
          type: "tool",
          title: "Luma AI",
          url: "https://lumalabs.ai",
        },
        {
          type: "video",
          title: "COLMAP 初学者教程（Radiance Fields 频道）",
          url: "https://www.youtube.com/watch?v=LcYCGxUGrJE",
        },
      ],
    },
    {
      index: "03",
      title: {
        zh: "物体视频拍摄：手机实操",
        en: "Object Video Capture: Phone Hands-on",
      },
      summary: {
        zh: "用手机拍物体视频是入门 3DGS 最低门槛的路径。本模块给出可复用的握持姿势、移动节奏与拍摄分镜，让单个物体在 90 秒内完成可训练级素材采集。",
        en: "Recording an object on your phone is the lowest-barrier entry into 3DGS. This module shares reusable grip, pacing and shot lists so a single object becomes training-ready footage within ninety seconds.",
      },
      format: "tutorial",
      duration: "30 分钟",
      outline: [
        { zh: "握持与稳定：避免高频抖动", en: "Grip and stabilization: killing high-frequency jitter" },
        { zh: "移动节奏：每秒 15° 的环绕速率", en: "Pacing: a 15-degree-per-second orbit" },
        { zh: "三段式分镜：俯视、平视、仰视", en: "Three-shot script: top-down, eye-level, low-angle" },
        { zh: "Luma 与 Scaniverse 的差异化体验对比", en: "Luma vs Scaniverse: experience-level differences" },
      ],
      keyConcepts: ["photogrammetry", "novel-view-synthesis", "splat-count"],
      resources: [
        {
          type: "article",
          title: "手机环绕拍摄单体物体的视频采集要点",
          url: "/learn/articles/object-video-capture",
        },
        {
          type: "tool",
          title: "Luma AI",
          url: "https://lumalabs.ai",
        },
        {
          type: "tool",
          title: "Scaniverse",
          url: "https://scaniverse.com",
        },
      ],
    },
    {
      index: "04",
      title: {
        zh: "物体照片拍摄：影棚拍摄",
        en: "Object Photo Capture: Studio Setup",
      },
      summary: {
        zh: "进入影棚意味着可以控制每一束光。本模块讲清转盘 + 黑布的极简方案、相邻照片的角度间隔，以及 KIRI 旗下的 Remy 工作流如何把照片管线压缩成几乎傻瓜的体验。",
        en: "Stepping into a studio means controlling every photon. This module covers the turntable-plus-black-cloth minimal rig, ideal angular spacing between shots, and how KIRI's Remy workflow turns photo pipelines into a near push-button experience.",
      },
      format: "tutorial",
      duration: "30 分钟",
      outline: [
        { zh: "转盘 + 双柔光的极简影棚", en: "Turntable plus dual softbox: a minimal studio" },
        { zh: "角度间隔：每张相隔 5° 还是 10°", en: "Angle spacing: every 5 degrees or every 10" },
        { zh: "Polycam 与 KIRI Engine 的照片管线分工", en: "Polycam vs KIRI Engine in the photo pipeline" },
        { zh: "Remy 自动化方案的边界与代价", en: "Where Remy's automation breaks and what it costs" },
      ],
      keyConcepts: ["photogrammetry", "sfm", "colmap"],
      resources: [
        {
          type: "tool",
          title: "Polycam",
          url: "https://poly.cam",
        },
        {
          type: "tool",
          title: "KIRI Engine",
          url: "https://www.kiriengine.app",
        },
        {
          type: "tool",
          title: "KIRI Remy",
          url: "https://www.kiriengine.app/",
        },
        {
          type: "article",
          title: "影棚转盘上的物体照片采集流程",
          url: "/learn/articles/object-photo-capture",
        },
      ],
    },
    {
      index: "05",
      title: {
        zh: "运动相机与全景相机：大空间采集",
        en: "Action Cams & 360 Cams: Large-space Capture",
      },
      summary: {
        zh: "当空间从一间房扩到一座园子，手机就开始捉襟见肘。本模块对比 Insta360 全景方案、DJI Terra 的航测路径与 Monogram 在日本场地的实战经验，帮你挑出适合自己场地的设备组合。",
        en: "When the venue grows from a single room to an entire courtyard, phones run out of breath. This module benchmarks Insta360 panoramic rigs, DJI Terra aerial routes, and Monogram's Japan field practice so you can pick a kit matching your terrain.",
      },
      format: "tutorial",
      duration: "35 分钟",
      outline: [
        { zh: "全景相机的视场冗余优势与去畸变陷阱", en: "360 cam advantages of FOV redundancy and dewarping pitfalls" },
        { zh: "无人机航测：DJI Terra 的航点规划", en: "Drone surveying: DJI Terra waypoint planning" },
        { zh: "运动相机走位：手持稳定与轨迹规划", en: "Action cam choreography: handheld stability and trajectory" },
        { zh: "拍完之后：抽帧策略与冗余裁剪", en: "After the shoot: frame extraction and redundancy trimming" },
      ],
      keyConcepts: ["photogrammetry", "sfm", "slam"],
      resources: [
        {
          type: "tool",
          title: "Insta360",
          url: "https://www.insta360.com/cn",
        },
        {
          type: "tool",
          title: "DJI Terra",
          url: "https://enterprise.dji.com/cn/dji-terra",
        },
        {
          type: "tool",
          title: "Monogram Japan",
          url: "https://mono-studio.jp/",
        },
        {
          type: "article",
          title: "运动相机在大空间采集中的参数与走位要点",
          url: "/learn/articles/action-cam-large-space",
        },
        {
          type: "video",
          title: "用无人机素材创建 NeRF（Radiance Fields 频道）",
          url: "https://www.youtube.com/watch?v=Y3Kh9pLQZXA",
        },
      ],
    },
    {
      index: "06",
      title: {
        zh: "本地训练入门：Postshot / Brush / Lichtfeld Studio",
        en: "Local Training 101: Postshot / Brush / Lichtfeld Studio",
      },
      summary: {
        zh: "本地训练是从入门到从业者的分水岭。本模块以三款免费或低门槛的桌面端工具为锚，讲清显存占用、训练步数与质量收敛的工程经验，并把「跑炸了怎么办」也写进流程里。",
        en: "Local training marks the crossover from hobbyist to practitioner. Anchored on three desktop tools that are free or low-cost, this module spells out VRAM budgets, step counts and convergence heuristics — including a what-to-do-when-it-crashes routine.",
      },
      format: "video",
      duration: "35 分钟",
      outline: [
        { zh: "Postshot：拖入素材即开练的桌面体验", en: "Postshot: drag-and-train desktop experience" },
        { zh: "Brush：开源训练器的可定制性", en: "Brush: customizable open-source trainer" },
        { zh: "Lichtfeld Studio：偏研究的工程化训练", en: "Lichtfeld Studio: a research-leaning engineered trainer" },
        { zh: "训练日志该怎么读：损失曲线与高斯数演化", en: "Reading training logs: loss curves and splat-count evolution" },
      ],
      keyConcepts: ["training-loss", "gradient-descent", "splat-count", "densification", "pruning"],
      resources: [
        {
          type: "tool",
          title: "Jawset Postshot",
          url: "https://www.jawset.com",
        },
        {
          type: "github",
          title: "Brush — open-source 3DGS trainer",
          url: "https://github.com/ArthurBrussee/brush",
        },
        {
          type: "tool",
          title: "Lichtfeld Studio",
          url: "https://mrnerf.github.io/lichtfeld-studio-web/",
        },
        {
          type: "article",
          title: "上传训练前用 Reality Capture 做快速对位检测",
          url: "/learn/articles/local-training-validation",
        },
        {
          type: "video",
          title: "2024 高斯泼溅工具盘点（Radiance Fields 频道）",
          url: "https://www.youtube.com/watch?v=Oe0Iq8xMWMk",
        },
      ],
    },
    {
      index: "07",
      title: {
        zh: "云端训练：Luma / 知天下 / 点映",
        en: "Cloud Training: Luma / Zhitianxia / Pointcosm",
      },
      summary: {
        zh: "本地跑不动时，云端是另一条腿。本模块横评 Luma 的极简上传、知天下偏 B 端的工程化平台与点映按套餐计价的方案，并附一份按场景规模选型的判断表。",
        en: "When local hardware buckles, the cloud is the other leg. This module benchmarks Luma's minimalist uploads, Zhitianxia's enterprise-leaning platform, and Pointcosm's package-based pricing, with a selection matrix indexed by scene scale.",
      },
      format: "article",
      duration: "25 分钟",
      outline: [
        { zh: "上传体验：从前端 UI 到失败重试", en: "Upload UX: from front-end UI to failure retries" },
        { zh: "训练时长与价格的横评", en: "Benchmarking training time against price" },
        { zh: "导出格式：ply / splat / spz 之间的取舍", en: "Export formats: ply vs splat vs spz trade-offs" },
        { zh: "B 端平台与套餐方案的差别", en: "Enterprise platforms vs packaged plans" },
      ],
      keyConcepts: ["ply-format", "splat-format", "spz"],
      resources: [
        {
          type: "tool",
          title: "Luma AI",
          url: "https://lumalabs.ai",
        },
        {
          type: "tool",
          title: "知天下（Zhitianxia）",
          url: "https://3d.explorerglobal.cn/",
        },
        {
          type: "tool",
          title: "点映（Pointcosm）",
          url: "https://www.pointcosm.cn/",
        },
        {
          type: "article",
          title: "点映云端训练的套餐维度与选型注意",
          url: "/learn/articles/pointcosm-cloud-plans",
        },
      ],
    },
    {
      index: "08",
      title: {
        zh: "检测与导出：质量评估与格式选择",
        en: "Validation & Export: QC + Format Choice",
      },
      summary: {
        zh: "训练结束不是终点，而是质量战的开始。本模块教你用 SuperSplat 删漂浮物、splat-transform 做格式互转，并给出一份 PSNR / SSIM / LPIPS 三件套的简易自评表。",
        en: "Training done is just round one of quality control. This module shows how to delete floaters in SuperSplat, convert formats with splat-transform, and grade outputs against a simple PSNR/SSIM/LPIPS rubric.",
      },
      format: "tutorial",
      duration: "30 分钟",
      outline: [
        { zh: "用 SuperSplat 框选并删除漂浮物", en: "Lasso and delete floaters in SuperSplat" },
        { zh: "用 splat-transform 在 ply / splat / spz 之间互转", en: "Convert ply / splat / spz with splat-transform" },
        { zh: "PSNR / SSIM / LPIPS 三件套自评流程", en: "Self-evaluation with PSNR / SSIM / LPIPS" },
        { zh: "对外交付前的最后检查清单", en: "Final delivery checklist before handing off" },
      ],
      keyConcepts: ["floaters", "supersplat", "psnr", "ssim", "lpips", "ply-format", "splat-format", "spz"],
      resources: [
        {
          type: "tool",
          title: "SuperSplat — Web-based Splat Editor",
          url: "https://playcanvas.com/supersplat/editor",
        },
        {
          type: "github",
          title: "splat-transform — format conversion CLI",
          url: "https://github.com/playcanvas/splat-transform",
        },
        {
          type: "article",
          title: "SuperSplat 与 superspl.at 编辑链路的公开入口说明",
          url: "/learn/articles/supersplat-cheat-sheet",
        },
      ],
    },
  ],
  callToAction: {
    zh: "完成本路径后，前往工具索引挑一组顺手的设备 + 训练器，扫一遍你最熟悉的房间，作为自己的「第一份作业」。",
    en: "After this path, head to the tool index, assemble a capture-plus-trainer kit, and scan the room you know best as your first homework.",
  },
  status: "live",
  verified: true,
  sources: [
    "https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/",
    "https://github.com/playcanvas/splat-transform",
  ],
};

const webViewingInteraction: LearningPath = {
  slug: "web-viewing-interaction",
  title: { zh: "Web 展示与交互", en: "Web Viewing & Interaction" },
  subtitle: {
    zh: "在浏览器里把高斯泼溅跑起来：渲染器、引擎、格式与产品化",
    en: "Running splats in the browser: renderers, engines, formats and productization",
  },
  level: "intermediate",
  audience: {
    zh: "希望把高斯模型嵌入网页或产品的前端工程师与互动设计师",
    en: "Front-end engineers and interactive designers embedding splats into web products",
  },
  duration: "约 3 小时",
  prerequisites: [
    { zh: "熟悉 JavaScript / TypeScript 与现代前端构建工具", en: "Familiar with JavaScript/TypeScript and modern front-end tooling" },
    { zh: "对 Three.js 或同类 3D 引擎有基础认知", en: "Basic understanding of Three.js or similar 3D engines" },
    { zh: "已有可加载的 .ply / .splat / .spz 资产或链接", en: "Have a loadable .ply / .splat / .spz asset or URL ready" },
  ],
  outcomes: [
    { zh: "理解 Web 端高斯渲染器的演进谱系与各自定位", en: "Map the lineage and positioning of mainstream web splat renderers" },
    { zh: "能在 Three.js 与 PlayCanvas 中独立完成场景嵌入与镜头控制", en: "Embed scenes and control cameras in Three.js and PlayCanvas independently" },
    { zh: "看懂 ply / splat / spz / sog 等格式的取舍并能做转换", en: "Compare ply/splat/spz/sog trade-offs and convert between them" },
    { zh: "为百万级高斯场景设计 LOD 与流式加载策略", en: "Design LOD and streaming strategies for million-splat scenes" },
    { zh: "掌握 SuperSplat 与 WebXR 路径下的产品化嵌入流程", en: "Productize embeds via the SuperSplat and WebXR paths" },
  ],
  modules: [
    {
      index: "01",
      title: {
        zh: "Web 渲染器全景：从 antimatter15 到 Spark",
        en: "Web Renderers: From antimatter15 to Spark",
      },
      summary: {
        zh: "Web 端高斯渲染从一份个人 demo 起步，几年间分裂成多条路线。本模块梳理从 antimatter15 的极简实验，到 Spark、GaussianSplats3D 等社区主线渲染器的能力差异。",
        en: "Web splat rendering started as a personal demo and forked into several routes within a few years. This module traces from antimatter15's minimal experiment to mainstream community renderers like Spark and GaussianSplats3D.",
      },
      format: "article",
      duration: "25 分钟",
      outline: [
        { zh: "antimatter15 的极简单页 demo", en: "antimatter15's minimal single-page demo" },
        { zh: "Spark：以可扩展架构对标的开源项目", en: "Spark: an open-source project aiming for extensible architecture" },
        { zh: "Three.js 生态里的 GaussianSplats3D", en: "GaussianSplats3D within the Three.js ecosystem" },
        { zh: "选型框架：性能、生态与维护活跃度", en: "Selection framework: performance, ecosystem and maintenance velocity" },
      ],
      keyConcepts: ["webgl-webgpu", "rasterization", "splat-viewer"],
      resources: [
        {
          type: "github",
          title: "antimatter15 / splat",
          url: "https://antimatter15.com/splat/",
        },
        {
          type: "github",
          title: "sparkjsdev / spark",
          url: "https://github.com/sparkjsdev/spark",
        },
        {
          type: "github",
          title: "mkkellogg / GaussianSplats3D",
          url: "https://github.com/mkkellogg/GaussianSplats3D",
        },
      ],
    },
    {
      index: "02",
      title: {
        zh: "Three.js 集成实战：场景嵌入与控制",
        en: "Three.js Integration: Scene Embedding & Control",
      },
      summary: {
        zh: "把高斯资产塞进 Three.js 远比加载一个 GLB 复杂。本模块以 GaussianSplats3D 与 gsplat 为底，演示从 Loader 选型、坐标系对齐到镜头控制的完整流程。",
        en: "Stuffing splat assets into Three.js is far trickier than loading a GLB. This module uses GaussianSplats3D and gsplat as its base to walk through loader selection, coordinate alignment and camera control.",
      },
      format: "tutorial",
      duration: "35 分钟",
      outline: [
        { zh: "Loader 选型：原生还是社区扩展", en: "Loader choice: built-in or community extension" },
        { zh: "坐标系对齐：右手坐标的常见踩坑", en: "Coordinate alignment: common right-handed pitfalls" },
        { zh: "OrbitControls 与一阶相机控制", en: "OrbitControls and first-order camera handling" },
        { zh: "调试技巧：可视化包围盒与帧率监视", en: "Debugging: bounding-box visualization and FPS monitors" },
      ],
      keyConcepts: ["differentiable-rasterization", "rasterization", "gsplat-utility", "fps"],
      resources: [
        {
          type: "github",
          title: "mkkellogg / GaussianSplats3D",
          url: "https://github.com/mkkellogg/GaussianSplats3D",
        },
        {
          type: "website",
          title: "gsplat documentation",
          url: "https://docs.gsplat.studio",
        },
      ],
    },
    {
      index: "03",
      title: {
        zh: "PlayCanvas 与 Babylon.js：引擎级支持",
        en: "PlayCanvas & Babylon.js: Engine-level Support",
      },
      summary: {
        zh: "当渲染器升级成「引擎一等公民」，开发体验会发生质变。本模块对比 PlayCanvas 与 Babylon.js 对高斯泼溅的官方支持深度，以及它们在场景图、物理与编辑器上的差异化定位。",
        en: "When renderers graduate to first-class engine citizens, DX changes qualitatively. This module compares the official splat support depth in PlayCanvas and Babylon.js, plus their differentiated stances on scene graph, physics and editors.",
      },
      format: "tutorial",
      duration: "30 分钟",
      outline: [
        { zh: "PlayCanvas 对 .ply / .splat 的原生支持", en: "PlayCanvas's native support for .ply / .splat" },
        { zh: "Babylon.js 的 SPZ Loader 与 PBR 协同", en: "Babylon.js SPZ loader working with PBR" },
        { zh: "在引擎里组合高斯与传统网格", en: "Composing splats with traditional meshes inside engines" },
        { zh: "选型决策：项目体量与团队既有栈", en: "Choice framework: project scope and existing stack" },
      ],
      keyConcepts: ["splat-format", "spz", "rasterization"],
      resources: [
        {
          type: "github",
          title: "playcanvas / engine",
          url: "https://github.com/playcanvas/engine",
        },
        {
          type: "website",
          title: "Babylon.js — official site",
          url: "https://www.babylonjs.com",
        },
        {
          type: "video",
          title: "Unreal Engine 中的辐射场（Radiance Fields 频道）",
          url: "https://www.youtube.com/watch?v=Xqb4UYXCL5o",
        },
      ],
    },
    {
      index: "04",
      title: {
        zh: "文件格式与压缩：ply / splat / spz / sog",
        en: "File Formats & Compression: ply / splat / spz / sog",
      },
      summary: {
        zh: "高斯模型的文件格式像快递盒：选错了一开始就是劣势。本模块比较 ply 的可读性、splat 的紧凑、spz 的压缩，以及实验性 sog 的取舍，并演示用 splat-transform 做无损互转。",
        en: "Splat file formats are like shipping crates: wrong choice penalizes you from the start. This module benchmarks ply's readability, splat's compactness, spz's compression and the experimental sog, then converts between them losslessly with splat-transform.",
      },
      format: "article",
      duration: "30 分钟",
      outline: [
        { zh: "ply：可读但庞大的元老格式", en: "ply: the readable but bulky elder format" },
        { zh: "splat：紧凑二进制的事实标准", en: "splat: the de-facto compact binary standard" },
        { zh: "spz：Niantic 主推的压缩管线", en: "spz: Niantic's flagship compression pipeline" },
        { zh: "sog 实验：实时流式的下一站", en: "sog experiments: the next stop for streaming" },
      ],
      keyConcepts: ["ply-format", "splat-format", "spz", "compressed-gs", "ksplat"],
      resources: [
        {
          type: "github",
          title: "splat-transform",
          url: "https://github.com/playcanvas/splat-transform",
        },
        {
          type: "github",
          title: "Niantic SPZ — reference implementation",
          url: "https://github.com/nianticlabs/spz",
        },
        {
          type: "article",
          title: "sog 轻量化容器与 PLY 的关系及适用边界",
          url: "/learn/articles/sog-format-explained",
        },
      ],
    },
    {
      index: "05",
      title: {
        zh: "LOD 与流式加载：百万高斯实战调度",
        en: "LOD & Streaming: Scheduling Millions of Splats",
      },
      summary: {
        zh: "百万级高斯的真正挑战不是渲染，而是「让浏览器先打开再说」。本模块讲解 LOD 切片、视锥剔除、流式加载与 Scaffold-GS 等结构化方案如何把首屏拉到可接受的量级。",
        en: "The real challenge for million-splat scenes is not rendering — it's getting the browser to open at all. This module covers LOD tiling, frustum culling, streaming loaders, and structured approaches like Scaffold-GS that drag first-frame cost into the acceptable zone.",
      },
      format: "video",
      duration: "30 分钟",
      outline: [
        { zh: "LOD 切片与按需加载的工程取舍", en: "LOD tiling and on-demand loading trade-offs" },
        { zh: "视锥剔除与背面 culling 的常见实现", en: "Frustum and back-face culling implementations" },
        { zh: "Scaffold-GS 的锚点结构对加载的友好度", en: "Why Scaffold-GS anchors are loader-friendly" },
        { zh: "Luma 的 Web Library 在大场景里的表现", en: "Luma Web Library performance on large scenes" },
      ],
      keyConcepts: ["scaffold-gs", "anchor", "compressed-gs", "splat-count"],
      resources: [
        {
          type: "paper",
          title: "Scaffold-GS: Structured 3D Gaussians",
          url: "https://city-super.github.io/scaffold-gs/",
        },
        {
          type: "tool",
          title: "Luma Web Library",
          url: "https://lumalabs.ai",
        },
      ],
    },
    {
      index: "06",
      title: {
        zh: "编辑器嵌入与产品化：SuperSplat / WebXR",
        en: "Editor Embedding & Productization: SuperSplat / WebXR",
      },
      summary: {
        zh: "把高斯做成产品，最后一公里在编辑器与跨设备分发。本模块演示如何用 SuperSplat 完成最终修订、把场景接入 WebXR，并借助 StorySplat 等模板做轻量产品化封装。",
        en: "The last mile of productizing splats lies in editors and cross-device delivery. This module demonstrates final cleanup in SuperSplat, hooking scenes into WebXR, and lightweight productization templates such as StorySplat.",
      },
      format: "tutorial",
      duration: "30 分钟",
      outline: [
        { zh: "SuperSplat 编辑器的常用快捷与导出参数", en: "SuperSplat shortcuts and export settings" },
        { zh: "WebXR 集成：Quest / Vision Pro 的现实差距", en: "WebXR integration: Quest vs Vision Pro reality gap" },
        { zh: "StorySplat：把场景包装成可分享链接", en: "StorySplat: wrapping scenes into shareable links" },
        { zh: "嵌入网页 / 微信小程序的兼容性清单", en: "Compatibility checklist for web and WeChat mini-programs" },
      ],
      keyConcepts: ["supersplat", "spatial-computing", "splat-viewer"],
      resources: [
        {
          type: "tool",
          title: "SuperSplat — Web Editor",
          url: "https://playcanvas.com/supersplat/editor",
        },
        {
          type: "github",
          title: "WebXR splat viewer (PlayCanvas)",
          url: "https://github.com/playcanvas/supersplat-viewer",
        },
        {
          type: "tool",
          title: "StorySplat",
          url: "https://storysplat.com/",
        },
      ],
    },
  ],
  callToAction: {
    zh: "拿一份你训练好的 .ply，照本路径选一条引擎栈，把它发布成可分享链接，挂到自己的作品集里。",
    en: "Take one of your trained .ply files, pick an engine stack from this path, ship it as a shareable link, and pin it on your portfolio.",
  },
  status: "live",
  verified: true,
  sources: [
    "https://github.com/sparkjsdev/spark",
    "https://github.com/playcanvas/engine",
    "https://github.com/nianticlabs/spz",
  ],
};

const spatialNarrativeExperiments: LearningPath = {
  slug: "spatial-narrative-experiments",
  title: { zh: "空间叙事与媒体实验", en: "Spatial Narrative & Media Experiments" },
  subtitle: {
    zh: "从论文到展览：高斯泼溅作为新媒介的叙事可能",
    en: "From papers to exhibitions: splats as a narrative medium",
  },
  level: "beginner",
  audience: {
    zh: "策展人、艺术家、影像创作者与对空间媒介感兴趣的通识读者",
    en: "Curators, artists, image-makers and general readers curious about spatial media",
  },
  duration: "约 2 小时",
  prerequisites: [
    { zh: "对 3D 或新媒体有基本的好奇心", en: "Basic curiosity about 3D or new media" },
    { zh: "无需任何代码或建模背景", en: "No coding or modeling background required" },
  ],
  outcomes: [
    { zh: "把握 3DGS 在艺术与展览语境下的代表性脉络", en: "Trace the representative threads of 3DGS in art and exhibition contexts" },
    { zh: "理解动态高斯（4DGS）打开的叙事可能", en: "Understand the narrative possibilities opened by 4DGS" },
    { zh: "看懂数字人与可驱动化身的技术与伦理边界", en: "See the technical and ethical boundaries of avatars and drivable humans" },
    { zh: "对文字驱动生成（DreamGaussian / LangSplat）有客观评价", en: "Form an objective view of text-driven generation (DreamGaussian / LangSplat)" },
    { zh: "在 SuperSplat 与社群作品库之间建立学习闭环", en: "Close the learning loop between SuperSplat and the community gallery" },
  ],
  modules: [
    {
      index: "01",
      title: {
        zh: "从论文到展览：3DGS 的艺术化路径",
        en: "From Papers to Galleries: The Artistic Path",
      },
      summary: {
        zh: "Inria 原始论文之后，Mip-Splatting 修复了画面伪影，Scaffold-GS 用结构换效率，这些工程上的进步同时也在悄悄改变作品在画廊里的可呈现性。",
        en: "After the Inria paper, Mip-Splatting tamed visual artifacts and Scaffold-GS traded structure for efficiency. These engineering steps quietly reshaped what splat works can do inside a gallery.",
      },
      format: "article",
      duration: "25 分钟",
      outline: [
        { zh: "Inria 原始版本：奠定艺术化的硬地基", en: "The Inria original: laying a hard foundation for artistic use" },
        { zh: "Mip-Splatting：让作品在投影与放大时不再闪烁", en: "Mip-Splatting: stable visuals under projection and zoom" },
        { zh: "Scaffold-GS：结构化压缩带来的展览友好度", en: "Scaffold-GS: exhibition-friendliness from structured compression" },
        { zh: "策展视角下的技术词汇翻译", en: "Translating technical vocabulary for curators" },
      ],
      keyConcepts: ["3dgs", "mip-splat", "scaffold-gs", "radiance-field"],
      resources: [
        {
          type: "paper",
          title: "3D Gaussian Splatting (Inria, SIGGRAPH 2023)",
          url: "https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/",
        },
        {
          type: "paper",
          title: "Mip-Splatting: Alias-free 3D Gaussian Splatting",
          url: "https://arxiv.org/abs/2311.16493",
        },
        {
          type: "paper",
          title: "Scaffold-GS: Structured 3D Gaussians",
          url: "https://city-super.github.io/scaffold-gs/",
        },
        {
          type: "video",
          title: "Google Maps 中隐藏的 3D（Radiance Fields 频道）",
          url: "https://www.youtube.com/watch?v=xrrhynRzC9I",
        },
      ],
    },
    {
      index: "02",
      title: {
        zh: "动态高斯：让时间在场景中流动",
        en: "4D Gaussians: Letting Time Flow",
      },
      summary: {
        zh: "4D Gaussian Splatting 与 Deformable 3D Gaussians 把「时间」纳入了显式表示。这一节聚焦它们对叙事密度、互动节奏和素材采集要求的现实改变。",
        en: "4D Gaussian Splatting and Deformable 3D Gaussians lift time into explicit representation. This module focuses on what they actually change about narrative density, interaction pace and capture requirements.",
      },
      format: "article",
      duration: "25 分钟",
      outline: [
        { zh: "把时间维度塞进高斯：4DGS 的基本设定", en: "Embedding time into Gaussians: 4DGS premises" },
        { zh: "Deformable 3D Gaussians 与变形场的角色", en: "Deformable 3D Gaussians and the role of deformation fields" },
        { zh: "采集端的代价：多机位与同步", en: "Capture-side costs: multi-camera rigs and synchronization" },
        { zh: "叙事节奏：从静态环绕到时间切片", en: "Narrative pacing: from static orbits to temporal slices" },
      ],
      keyConcepts: ["4dgs", "spatial-video", "novel-view-synthesis"],
      resources: [
        {
          type: "paper",
          title: "4D Gaussian Splatting (Wu et al.)",
          url: "https://guanjunwu.github.io/4DGS/",
        },
        {
          type: "paper",
          title: "Deformable 3D Gaussians",
          url: "https://ingra14m.github.io/Deformable-Gaussians/",
        },
        {
          type: "video",
          title: "4D 高斯泼溅解释（Radiance Fields 频道）",
          url: "https://www.youtube.com/watch?v=LJsLMpHUIZM",
        },
        {
          type: "video",
          title: "Infinite Realities 访谈（Radiance Fields 频道）",
          url: "https://www.youtube.com/watch?v=8KjTHPxMQlI",
        },
      ],
    },
    {
      index: "03",
      title: {
        zh: "数字人与可驱动化身",
        en: "Avatars & Drivable Humans",
      },
      summary: {
        zh: "把人放进高斯空间是一件特别敏感的事。本模块以 GaussianAvatars 与 HUGS 为代表，讲清当前可驱动化身的技术质量与必须正视的伦理边界。",
        en: "Putting people into splat space is delicate work. Anchored on GaussianAvatars and HUGS, this module spells out today's drivable-avatar quality and the ethical boundaries that cannot be wished away.",
      },
      format: "article",
      duration: "25 分钟",
      outline: [
        { zh: "GaussianAvatars 的精度与稳定性", en: "GaussianAvatars: precision and stability" },
        { zh: "HUGS 把整个人体作为可驱动整体", en: "HUGS: treating the full body as a drivable whole" },
        { zh: "授权、肖像权与社群规范", en: "Consent, likeness rights and community norms" },
        { zh: "在展览叙事中如何使用而不滥用", en: "Using avatars in exhibitions without abusing them" },
      ],
      keyConcepts: ["3dgs", "spatial-computing", "novel-view-synthesis"],
      resources: [
        {
          type: "paper",
          title: "GaussianAvatars",
          url: "https://shenhanqian.github.io/gaussian-avatars",
        },
        {
          type: "paper",
          title: "HUGS: Human Gaussian Splats",
          url: "https://machinelearning.apple.com/research/hugs",
        },
      ],
    },
    {
      index: "04",
      title: {
        zh: "文字驱动生成：从一句话到一个空间",
        en: "Text-driven Generation: From a Sentence to a Space",
      },
      summary: {
        zh: "DreamGaussian 让一句 prompt 直出三维高斯，LangSplat 则把语言查询接进高斯场。本节客观评价它们当前的能力上限、典型失败案例与产品落地空间。",
        en: "DreamGaussian turns a prompt into 3D splats; LangSplat plugs language queries into Gaussian fields. This module gives an objective read on their current ceilings, typical failures and productization space.",
      },
      format: "article",
      duration: "25 分钟",
      outline: [
        { zh: "DreamGaussian：单图与文本的混合生成", en: "DreamGaussian: hybrid image-and-text generation" },
        { zh: "LangSplat：把语言查询绑进高斯场", en: "LangSplat: binding language queries to Gaussian fields" },
        { zh: "今天的能力上限与典型失败案例", en: "Today's capability ceiling and characteristic failures" },
        { zh: "产品落地的可能形态：从 toy 到 ToB", en: "Productization shapes: from toys to enterprise" },
      ],
      keyConcepts: ["3dgs", "novel-view-synthesis", "radiance-field"],
      resources: [
        {
          type: "paper",
          title: "DreamGaussian",
          url: "https://dreamgaussian.github.io/",
        },
        {
          type: "paper",
          title: "LangSplat",
          url: "https://langsplat.github.io/",
        },
      ],
    },
    {
      index: "05",
      title: {
        zh: "用户作品：SuperSplat 与社群创作",
        en: "User Works: SuperSplat & Community",
      },
      summary: {
        zh: "把目光从论文移回普通创作者。SuperSplat 为非工程背景的人提供了「上手即编辑」的入口，而社群作品库展现了从家居一角到城市夜景的真实使用图谱。",
        en: "Pull focus from papers back to everyday makers. SuperSplat opens an edit-on-arrival door for non-engineers, while the community gallery reveals an honest map from living-room corners to urban nightscapes.",
      },
      format: "tutorial",
      duration: "30 分钟",
      outline: [
        { zh: "SuperSplat：无代码上手的最短路径", en: "SuperSplat: the shortest no-code on-ramp" },
        { zh: "PlayCanvas 生态对作品分发的角色", en: "PlayCanvas's role in work distribution" },
        { zh: "社群作品库的常见题材与质量分布", en: "Common subjects and quality distribution in the gallery" },
        { zh: "从单件作品到个人项目的可能路线", en: "From a single piece to a personal project" },
      ],
      keyConcepts: ["supersplat", "splat-viewer", "spatial-computing"],
      resources: [
        {
          type: "tool",
          title: "SuperSplat — Web Editor",
          url: "https://playcanvas.com/supersplat/editor",
        },
        {
          type: "github",
          title: "PlayCanvas SuperSplat (case)",
          url: "https://github.com/playcanvas/supersplat",
        },
      ],
    },
  ],
  callToAction: {
    zh: "看完之后，去 /gallery 翻一遍社群作品，挑一件你觉得「我也想做」的，再回 /tools 找它对应的工具栈。",
    en: "After this path, browse /gallery, pick a piece that makes you say I want to make this, then return to /tools for the matching stack.",
  },
  status: "live",
  verified: true,
  sources: [
    "https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/",
    "https://guanjunwu.github.io/4DGS/",
    "https://playcanvas.com/supersplat/editor",
  ],
};

export const learningPaths: LearningPath[] = [
  understandGaussianSplatting,
  captureAndTraining,
  webViewingInteraction,
  spatialNarrativeExperiments,
];

export const learningPathsBySlug: Record<string, LearningPath> =
  Object.fromEntries(learningPaths.map((p) => [p.slug, p]));

export type LearningPathStub = {
  slug: string;
  index: string;
  title: Bilingual;
  meta: Bilingual;
  summary: Bilingual;
  status: "live" | "preparing";
};

/**
 * 总览页用的 4 张卡片骨架
 * 4 条全部 status="live"，模块数已对齐满血版（7+8+6+5）
 */
export const learningPathStubs: LearningPathStub[] = [
  {
    slug: "understand-gaussian-splatting",
    index: "01",
    title: understandGaussianSplatting.title,
    meta: {
      zh: "入门 · 7 模块 · 约 2.5 小时",
      en: "Beginner · 7 modules · ~2.5h",
    },
    summary: {
      zh: "概念、流程、与 NeRF 的关系、首个端到端实践。",
      en: "Concepts, pipeline, NeRF comparison, first hands-on demo.",
    },
    status: "live",
  },
  {
    slug: "capture-and-training",
    index: "02",
    title: captureAndTraining.title,
    meta: {
      zh: "进阶 · 8 模块 · 约 4 小时",
      en: "Intermediate · 8 modules · ~4h",
    },
    summary: {
      zh: "拍摄策略、SfM、COLMAP、本地与云端训练、检测导出。",
      en: "Shooting strategy, SfM, COLMAP, local & cloud training, QC and export.",
    },
    status: "live",
  },
  {
    slug: "web-viewing-interaction",
    index: "03",
    title: webViewingInteraction.title,
    meta: {
      zh: "进阶 · 6 模块 · 约 3 小时",
      en: "Intermediate · 6 modules · ~3h",
    },
    summary: {
      zh: "Three.js / PlayCanvas / Babylon.js，格式压缩、LOD 与 WebXR。",
      en: "Three.js / PlayCanvas / Babylon.js, formats, LOD and WebXR.",
    },
    status: "live",
  },
  {
    slug: "spatial-narrative-experiments",
    index: "04",
    title: spatialNarrativeExperiments.title,
    meta: {
      zh: "通识 · 5 模块 · 约 2 小时",
      en: "General · 5 modules · ~2h",
    },
    summary: {
      zh: "里程碑论文、4D 动态、数字人、文本生成与社群创作。",
      en: "Milestone papers, 4D dynamics, avatars, text-driven gen and community works.",
    },
    status: "live",
  },
];
