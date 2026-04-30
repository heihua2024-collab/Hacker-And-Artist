import type { Bilingual, TagId } from "@/lib/taxonomy";

export type InsightCategory =
  | "tech_deep_dive"
  | "industry_signal"
  | "field_report"
  | "essay";

export type InsightSection = {
  heading: Bilingual;
  paragraphs: Bilingual[];
};

export type InsightEntry = {
  slug: string;
  title: Bilingual;
  subtitle: Bilingual;
  summary: Bilingual;
  category: InsightCategory;
  tags: TagId[];
  author: string;
  publishedAt: string;
  readingMinutes: number;
  body: InsightSection[];
  relatedNewsIds?: string[];
  relatedCaseSlugs?: string[];
  relatedToolSlugs?: string[];
  callToAction?: Bilingual;
  verified: boolean;
  sources: string[];
};

export const insightCategoryLabels: Record<InsightCategory, Bilingual> = {
  tech_deep_dive: { zh: "技术深读", en: "Tech Deep Dive" },
  industry_signal: { zh: "行业信号", en: "Industry Signal" },
  field_report: { zh: "现场报道", en: "Field Report" },
  essay: { zh: "长篇随笔", en: "Essay" },
};

export const insights: InsightEntry[] = [
  {
    slug: "radiance-meshes-tetrahedral-rendering",
    title: {
      zh: "Radiance Meshes：用四面体网格挑战高斯泼溅的体素叙事",
      en: "Radiance Meshes: Tetrahedral Rendering as a Radiance-field Alternative",
    },
    subtitle: {
      zh: "从点状高斯转向可排序、可变形、可进管线的半透明网格体。",
      en: "A move from point-like splats toward sortable, deformable, pipeline-friendly translucent mesh volumes.",
    },
    summary: {
      zh: "Radiance Meshes 把场景表示为带有颜色和密度的 Delaunay 四面体单元，试图用现有 GPU 三角形管线获得稳定可见性、可解释体积积分和更自然的网格工作流。",
      en: "Radiance Meshes represents a scene as Delaunay tetrahedral cells carrying color and density, aiming to use existing GPU triangle pipelines for stable visibility, interpretable volume integration, and mesh-friendly workflows.",
    },
    category: "tech_deep_dive",
    tags: ["surface", "real_time", "web_rendering"],
    author: "radiancefields.com 编辑部",
    publishedAt: "2025-12-04",
    readingMinutes: 7,
    body: [
      {
        heading: { zh: "问题不是只在画质", en: "The question is not only image quality" },
        paragraphs: [
          {
            zh: "NeRF 以连续体积函数定义新视角合成的质量基准，但推理计算较重，也不天然贴合传统图形硬件。3D 高斯泼溅用显式点状 primitive 换来高速渲染，却仍会遇到视角相关的排序、弹出伪影和管线互操作问题。Radiance Meshes 的切入点是换一种底层 primitive，而不是在现有高斯列表上继续打补丁。",
            en: "NeRF set a quality benchmark for novel-view synthesis with continuous volumetric functions, but inference remains heavy and does not map naturally to traditional graphics hardware. 3D Gaussian Splatting trades that for fast explicit primitives, yet still faces sorting, popping, and pipeline interoperability issues. Radiance Meshes changes the primitive itself instead of only patching the Gaussian list.",
          },
        ],
      },
      {
        heading: { zh: "四面体作为体积单元", en: "Tetrahedra as volume cells" },
        paragraphs: [
          {
            zh: "该方法从稀疏点云出发做 Delaunay 四面体剖分，每个四面体内部存储密度与线性变化颜色。因为入口、出口和体积积分边界都明确，片元着色器可以解析地完成透明体渲染，而不必把所有内容都近似成屏幕空间的 splat。",
            en: "The method starts from a sparse point cloud and performs Delaunay tetrahedralization. Each tetrahedron stores density and linearly varying color. With explicit entry and exit points, the fragment shader can integrate transparent volume analytically instead of approximating everything as screen-space splats.",
          },
          {
            zh: "Radiance Fields 原文强调 Delaunay 几何的排序性质：相机原点相对于外接球的 power 可用于前后排序，从而支持鱼眼或畸变镜头下的更稳定可见性。这让方法更接近传统渲染管线能理解的几何资产。",
            en: "The Radiance Fields article highlights a sorting property of Delaunay geometry: the camera origin's power relative to circumspheres can order cells front to back, supporting more stable visibility even for fisheye or distorted lenses. That makes the representation look more like an asset conventional renderers understand.",
          },
        ],
      },
      {
        heading: { zh: "工程含义", en: "Engineering implications" },
        paragraphs: [
          {
            zh: "四面体是半透明三角形网格，因此可以进入物理、变形和表面提取工作流。原文还提到在相近 primitive 数量下，HD 分辨率渲染速度大约快于高斯泼溅三分之一；这类数字仍需以论文与代码复现实测为准，但方向上说明辐射场表示正在重新靠近图形引擎的传统资产边界。",
            en: "Because tetrahedra are translucent triangle meshes, they can participate in physics, deformation, and surface extraction workflows. The article also reports roughly one-third faster HD rendering at comparable primitive counts; that number still needs reproduction from the paper and code, but the direction shows radiance-field representations moving closer to traditional engine assets.",
          },
        ],
      },
    ],
    relatedNewsIds: ["industry-siggraph-2024-radiance-field-program"],
    relatedCaseSlugs: ["sugar-surface-aligned-meshes", "inria-original-3dgs"],
    callToAction: {
      zh: "适合关注高斯排序伪影、Web 端体渲染和网格化交付的人优先阅读。",
      en: "Prioritize this if you track splat sorting artifacts, web volumetric rendering, or mesh-based delivery.",
    },
    verified: true,
    sources: [
      "https://radiancefields.com/radiance-meshes-for-volumetric-reconstruction",
      "https://radiancemeshes.github.io/",
    ],
  },
  {
    slug: "third-dimension-supersim-launch",
    title: {
      zh: "Third Dimension SuperSim：从机器人传感日志直建模拟器",
      en: "Third Dimension SuperSim: Simulators Built Directly from Robot Sensor Logs",
    },
    subtitle: {
      zh: "当机器人已经采集了真实世界，仿真环境也可以从这些数据中生长出来。",
      en: "If robots already collect the real world, simulation environments can be derived from that data.",
    },
    summary: {
      zh: "SuperSim 把视频、LiDAR、IMU 与位置轨迹转成可训练和验证的神经仿真环境，用辐射场、SLAM、SfM 与世界模型缩小真实数据和合成仿真的域差。",
      en: "SuperSim turns video, LiDAR, IMU, and position traces into neural simulation environments for training and validation, using radiance fields, SLAM, SfM, and world modeling to narrow the gap between real logs and synthetic sim.",
    },
    category: "industry_signal",
    tags: ["slam", "reconstruction", "dataset"],
    author: "radiancefields.com 编辑部",
    publishedAt: "2025-12-09",
    readingMinutes: 8,
    body: [
      {
        heading: { zh: "仿真的域差", en: "The simulation domain gap" },
        paragraphs: [
          {
            zh: "传统机器人仿真常依赖手工制作的 3D 场景，更新周期长，也难以覆盖真实道路、仓库或室内环境里的眩光、遮挡、杂物和传感器噪声。与此同时，机器人车队每天都在产生视频、LiDAR、IMU 与定位轨迹，这些数据过去并没有高效回流到仿真系统。",
            en: "Traditional robotics simulation often relies on handcrafted 3D scenes that are slow to update and struggle with glare, occlusion, clutter, and sensor noise from roads, warehouses, or interiors. At the same time, robot fleets generate video, LiDAR, IMU, and pose traces every day, but those logs rarely flow back efficiently into simulation.",
          },
        ],
      },
      {
        heading: { zh: "从 clip 到 sim", en: "From clip to sim" },
        paragraphs: [
          {
            zh: "SuperSim 的输入不是传统资产库，而是机器人实际看到的传感片段。平台用辐射场、SLAM、SfM 与几何对齐重建场景，再用 AI 世界建模补全缺失区域、生成新视角或插入训练用 3D 对象。Radiance Fields 原文将其称为面向 Omniverse 等现有仿真栈的「clip to sim」桥梁。",
            en: "SuperSim starts not from an asset library but from the sensor clip the robot actually saw. The platform uses radiance fields, SLAM, SfM, and geometric alignment to reconstruct the scene, then applies AI world modeling to fill missing regions, generate novel views, or insert 3D training objects. Radiance Fields frames it as a clip-to-sim bridge for existing stacks such as Omniverse.",
          },
          {
            zh: "这种产品形态的价值在于更新速度。原文提到多数已重建片段约 30 至 60 秒长，足以覆盖机器人需要反复测试的决策、失败和交互。它不是替代所有仿真，而是把真实世界日志变成仿真素材来源。",
            en: "The value is update speed. The article notes that many reconstructed clips span roughly 30 to 60 seconds, enough to cover decisions, failures, and interactions teams need to test repeatedly. It does not replace every simulator; it turns real-world logs into simulation feedstock.",
          },
        ],
      },
      {
        heading: { zh: "对 3DGS 行业的信号", en: "Signal for the 3DGS industry" },
        paragraphs: [
          {
            zh: "2023 至 2024 年，辐射场方法主要在视觉可信度上被讨论。SuperSim 这类产品把讨论推向运营价值：能否当天从现场数据生成可用环境，能否跨传感器重渲染，能否支持自动驾驶、无人机和工业机器人持续迭代。",
            en: "In 2023 and 2024, radiance-field methods were often discussed through visual credibility. Products such as SuperSim shift the question toward operational value: can a usable environment be generated the same day from field data, re-rendered across sensors, and used by AV, drone, or industrial robotics teams?",
          },
        ],
      },
    ],
    relatedNewsIds: ["tool-colmap-3-12-sensor-rig"],
    relatedToolSlugs: ["colmap"],
    verified: true,
    sources: [
      "https://radiancefields.com/third-dimension-introduces-supersim-simulator-built-from-reality",
      "https://www.third-dimension.ai/",
    ],
  },
  {
    slug: "quadrature-fields-fast-nerf",
    title: {
      zh: "Quadrature Fields：把 NeRF 渲染推到 100 至 500 FPS",
      en: "Quadrature Fields: Pushing NeRF Rendering to 100-500 FPS",
    },
    subtitle: {
      zh: "把体渲染压缩为分层纹理网格，让 NeRF 重新借力现代图形硬件。",
      en: "Compressing volume rendering into layered textured meshes so NeRF can lean on modern graphics hardware.",
    },
    summary: {
      zh: "Quadrature Fields 先训练 NeRF 与 quadrature field，再通过 Marching Cubes、网格微调和神经特征烘焙，把透明和复杂材质所需的多采样压缩进可实时渲染的网格表示。",
      en: "Quadrature Fields trains a NeRF and a quadrature field, then uses Marching Cubes, mesh fine-tuning, and neural feature baking to compress multi-sample volumetric effects into a real-time mesh representation.",
    },
    category: "tech_deep_dive",
    tags: ["real_time", "optimization", "surface"],
    author: "radiancefields.com 编辑部",
    publishedAt: "2024-09-11",
    readingMinutes: 7,
    body: [
      {
        heading: { zh: "NeRF 的速度瓶颈", en: "Where NeRF spends time" },
        paragraphs: [
          {
            zh: "标准 NeRF 需要沿每条光线评估大量采样点和神经网络，因此在交互式可视化或游戏场景中很难直接达到实时。已有 MobileNeRF、BakedSDF 等路线尝试把体渲染转为纹理网格，但透明、玻璃、毛发等材料仍可能需要多层采样。",
            en: "A standard NeRF evaluates many samples and neural network queries along each ray, making direct real-time use difficult for interactive visualization or games. Prior lines such as MobileNeRF and BakedSDF approximate volume rendering as textured meshes, but transparency, glass, and fur-like materials still require multiple samples.",
          },
        ],
      },
      {
        heading: { zh: "Quadrature 的转换步骤", en: "The quadrature conversion" },
        paragraphs: [
          {
            zh: "该方法从 Instant NGP 与 Nerfacc 训练的 NeRF 出发，训练一个让 quadrature points 对齐体积内容的神经场。随后使用 Marching Cubes 生成网格，并通过光度重建损失微调顶点位置，让采样点集中在复杂几何区域，简单区域则减少冗余。",
            en: "The method starts with a NeRF trained through Instant NGP and Nerfacc, then trains a neural field whose quadrature points align with volumetric content. Marching Cubes produces a mesh, and photometric reconstruction losses fine-tune vertices so samples concentrate around complex geometry while simpler regions stay compact.",
          },
          {
            zh: "最终颜色、不透明度和视角相关特征会被烘焙进纹理图。固体对象可近似为单交点，透明材料则保留多个 quadrature points，以便在 OptiX 等硬件加速渲染路径中处理复杂透射。",
            en: "Color, opacity, and view-dependent features are then baked into texture maps. Solid objects can behave like single-intersection surfaces, while transparent materials keep multiple quadrature points for hardware-accelerated renderers such as OptiX.",
          },
        ],
      },
      {
        heading: { zh: "速度数字如何理解", en: "How to read the FPS numbers" },
        paragraphs: [
          {
            zh: "Radiance Fields 原文记录该方法在全高清下超过 100 FPS，合成数据中可到 500 FPS，显存用量示例不超过 9GB，文件大小约 330MB 至 4GB。这些数字说明 NeRF 并非永远与实时无缘，但代价是表示转换、纹理烘焙和较复杂的资产管理。",
            en: "Radiance Fields records over 100 FPS at full HD and up to 500 FPS on synthetic data, with examples staying under 9GB of VRAM and files around 330MB to 4GB. The numbers show NeRF is not permanently excluded from real time, but the trade-off is representation conversion, texture baking, and more complex asset management.",
          },
        ],
      },
    ],
    relatedNewsIds: ["industry-siggraph-2024-radiance-field-program"],
    relatedCaseSlugs: ["inria-original-3dgs"],
    verified: true,
    sources: [
      "https://radiancefields.com/quadrature-fields-fast-nerf-rendering-at-100-500-fps",
      "https://research.nvidia.com/labs/toronto-ai/quadrature-fields/",
    ],
  },
  {
    slug: "infinite-realities-future-of-imaging",
    title: {
      zh: "Infinite Realities 现场：176 相机 484 灯下的人体 4D 高斯捕捉",
      en: "Inside Infinite Realities: 4D Human Gaussian Capture with 176 Cameras and 484 Lights",
    },
    subtitle: {
      zh: "当每一帧都被重建为高斯，视频开始接近可自由观看的体积资产。",
      en: "When every frame becomes a Gaussian reconstruction, video begins to behave like a free-view volumetric asset.",
    },
    summary: {
      zh: "这篇现场报道记录了 Infinite Realities 的人体动态捕捉棚：176 台相机、484 盏灯、30 秒片段约 30 万张静帧，并公开 Unity VR demo、1800 个训练 PLY 与原始图片集。",
      en: "This field report documents Infinite Realities' dynamic human capture stage: 176 cameras, 484 lights, about 300K still images for a 30-second clip, plus a Unity VR demo, 1,800 trained PLY files, and source images.",
    },
    category: "field_report",
    tags: ["dynamic", "avatar", "spatial_media"],
    author: "radiancefields.com 编辑部",
    publishedAt: "2025-04-10",
    readingMinutes: 8,
    body: [
      {
        heading: { zh: "从静态照片到动态体积", en: "From still capture to dynamic volume" },
        paragraphs: [
          {
            zh: "静态 NeRF 与 3DGS 已经证明多视角照片可以生成可自由观看的空间资产。Infinite Realities 的重点是把这种能力推到人体动态表演：每一帧都经过高度校准的多相机采集，再串成可播放的 4D 高斯序列。",
            en: "Static NeRF and 3DGS have shown that multi-view photos can produce free-view spatial assets. Infinite Realities pushes the idea into dynamic human performance: each frame is captured by a tightly calibrated multi-camera system and then sequenced as a 4D Gaussian asset.",
          },
        ],
      },
      {
        heading: { zh: "设备规模", en: "Capture scale" },
        paragraphs: [
          {
            zh: "Radiance Fields 原文给出的量级很具体：176 台相机、484 盏灯、每秒数据体量巨大，30 秒片段超过 30 万张静态图像。这个规模解释了为什么当前高保真人体 4D 捕捉仍主要位于专业棚内，而不是手机端日常采集。",
            en: "The Radiance Fields article gives concrete scale: 176 cameras, 484 lights, massive per-second data volume, and more than 300K still images for a 30-second clip. That explains why high-fidelity human 4D capture remains a professional-stage workflow rather than everyday mobile capture.",
          },
          {
            zh: "公开的 Unity VR demo、1800 个训练 PLY 与图像数据集，使它不只是一次体验报道，也成为研究者和工具开发者观察 4DGS 资产形态的样本。",
            en: "The released Unity VR demo, 1,800 trained PLY files, and image dataset make it more than a field report; it becomes a reference sample for researchers and tool builders studying 4DGS assets.",
          },
        ],
      },
      {
        heading: { zh: "媒体形态的启发", en: "Implications for media" },
        paragraphs: [
          {
            zh: "如果二维视频的每一帧都能成为可重光照、可导航、可嵌入空间计算设备的体积记录，那么内容生产会从固定镜头剪辑转向可交互场景编排。短期门槛仍是采集棚、同步、存储与算力；长期信号则是动态三维影像正在形成自己的资产标准。",
            en: "If each frame of a 2D video can become a relightable, navigable volumetric record for spatial devices, production shifts from fixed-camera editing toward interactive scene orchestration. The near-term barriers are stage hardware, sync, storage, and compute; the long-term signal is that dynamic 3D imaging is forming its own asset layer.",
          },
        ],
      },
    ],
    relatedNewsIds: ["industry-siggraph-2024-radiance-field-program"],
    relatedCaseSlugs: ["4d-gaussian-splatting", "hugs"],
    verified: true,
    sources: [
      "https://radiancefields.com/infinite-realities-the-future-of-imaging",
      "https://www.infiniterealities.com/",
    ],
  },
  {
    slug: "google-immersive-view-nerfs",
    title: {
      zh: "Google Immersive View 解析：NeRF 进入 Maps 的工程化路径",
      en: "Google Immersive View: How NeRF Entered Maps as an Engineering System",
    },
    subtitle: {
      zh: "从单篇论文能力到面向公众地图产品的低伪影管线。",
      en: "From paper capability to a low-artifact pipeline inside a public mapping product.",
    },
    summary: {
      zh: "Google Maps 的 Immersive View 把 Mip-NeRF 360、Block-NeRF 与 NeRF in the Wild 等路线组合进室内场景生成流程，用曝光调节与外观向量处理弱光、反射和多时段采集差异。",
      en: "Google Maps' Immersive View combines lines such as Mip-NeRF 360, Block-NeRF, and NeRF in the Wild for indoor venue reconstruction, using exposure conditioning and appearance embeddings for dim light, reflections, and multi-session capture differences.",
    },
    category: "industry_signal",
    tags: ["reconstruction", "viewing", "spatial_media"],
    author: "radiancefields.com 编辑部",
    publishedAt: "2023-06-14",
    readingMinutes: 6,
    body: [
      {
        heading: { zh: "产品里的 NeRF 不是单算法", en: "Product NeRF is not a single algorithm" },
        paragraphs: [
          {
            zh: "Radiance Fields 对 Google 博客的解读显示，Immersive View 并不是简单把原始 NeRF 论文搬进 Maps。Google 将 Mip-NeRF 360 作为基础，又借用 Block-NeRF 的曝光 conditioning 和 NeRF in the Wild 的低维外观向量来处理弱光场所、多时段照片和反射差异。",
            en: "Radiance Fields' reading of Google's blog shows that Immersive View is not a direct transplant of the original NeRF paper into Maps. Google builds on Mip-NeRF 360 while borrowing exposure conditioning from Block-NeRF and low-dimensional appearance vectors from NeRF in the Wild for dim venues, multi-session photos, and reflections.",
          },
        ],
      },
      {
        heading: { zh: "采集和路径设计", en: "Capture and path design" },
        paragraphs: [
          {
            zh: "原文提到 Google 会为场所创建特定相机路径，并提供交互式 360 度视角。Radiance Fields 也指出官方说法中场馆采集可能需要约一小时，而个人小空间采集常短得多；这说明公共地图产品更重视可控质量、覆盖完整性和最终用户体验。",
            en: "The article notes that Google creates specific camera paths for venues and enables interactive 360-degree views. Radiance Fields also contrasts Google's roughly hour-scale venue capture claim with much shorter personal room captures, suggesting the public mapping product optimizes for controlled quality, full coverage, and end-user experience.",
          },
        ],
      },
      {
        heading: { zh: "为什么这是行业信号", en: "Why this is an industry signal" },
        paragraphs: [
          {
            zh: "Immersive View 的意义不在于用户知道背后是 NeRF，而在于辐射场进入了大众地图产品的交互入口。它证明该类技术可以隐藏在普通消费级界面之后，为餐厅、咖啡馆、景点和城市空间提供预览体验。",
            en: "The significance is not that users know it is NeRF; it is that radiance fields entered a mainstream maps interface. The technology can sit behind a consumer UI and provide previews for restaurants, cafes, venues, and urban spaces.",
          },
        ],
      },
    ],
    relatedNewsIds: ["industry-siggraph-2024-radiance-field-program"],
    relatedToolSlugs: ["luma-ai", "polycam"],
    verified: true,
    sources: [
      "https://radiancefields.com/google-publishes-blog-on-immersive-view-nerfs",
      "https://blog.google/products/maps/google-maps-immersive-view/",
      "https://ai.googleblog.com/2022/06/immersive-view-for-maps.html",
    ],
  },
  {
    slug: "laser-vs-visual-china-2026",
    title: {
      zh: "激光 vs 视觉：2026 中国 3DGS 行业路线对比",
      en: "LiDAR vs Visual Capture: Comparing China's 2026 3DGS Hardware Routes",
    },
    subtitle: {
      zh: "高精度测绘、消费级传播和融合路线正在服务不同预算与风险边界。",
      en: "High-precision surveying, consumer visual capture, and hybrid routes are serving different budgets and risk boundaries.",
    },
    summary: {
      zh: "这篇 INKTOYS 观察整理中国 3DGS 采集市场里的激光、纯视觉与融合方案：激光守住弱纹理和高精度场景，视觉方案以低成本和高效率切入常规消费级与中小预算项目。",
      en: "This INKTOYS observation organizes LiDAR, visual-only, and hybrid 3DGS capture routes in China: LiDAR retains weak-texture and high-precision scenarios, while visual capture enters consumer and smaller-budget projects through lower cost and faster iteration.",
    },
    category: "industry_signal",
    tags: ["capture", "reconstruction", "case_study"],
    author: "INKTOYS 编辑部",
    publishedAt: "2026-04-29",
    readingMinutes: 9,
    body: [
      {
        heading: { zh: "市场不是单一路线替代", en: "The market is not a single-route replacement" },
        paragraphs: [
          {
            zh: "现有笔记把 2025 年实景三维语境下的传统激光方案份额描述为约 65%，纯视觉与倾斜摄影加 3DGS 约 25%，融合方案约 10%。这些数字来自转录素材，尚需正式市场报告交叉核验，但结构上能解释行业讨论为何围绕成本、精度和交付速度展开。",
            en: "The source notes describe traditional LiDAR as roughly 65% of 2025 real-scene 3D workflows, visual and oblique-photography plus 3DGS at about 25%, and hybrid routes at around 10%. These figures still need formal market-report cross-checks, but structurally they explain why the debate centers on cost, accuracy, and delivery speed.",
          },
        ],
      },
      {
        heading: { zh: "成本与精度边界", en: "Cost and accuracy boundaries" },
        paragraphs: [
          {
            zh: "素材中列出的中高端激光扫描设备参考价约 5.98 万至 19.98 万元，纯视觉多目与算力组合约 1980 至 6000 元。激光在弱纹理、暗光和绝对精度上仍有优势；纯视觉在良好光照与纹理条件下可满足常规传播、展示和轻量化重建需求。",
            en: "The source material lists mid-to-high LiDAR scanner reference prices around RMB 59,800 to 199,800, while visual multi-camera plus compute setups are around RMB 1,980 to 6,000. LiDAR retains advantages in weak texture, darkness, and absolute accuracy; visual capture can serve communication, display, and lightweight reconstruction when lighting and texture are sufficient.",
          },
          {
            zh: "从单项目视角看，纯视觉的吸引力来自设备投入、外业时间和云端训练成本的组合下降，而不是单项指标压过激光。对测绘、管线、工业设施等精度敏感场景，激光或融合路线仍有明确位置。",
            en: "At project level, visual capture is attractive because device cost, field time, and cloud-training cost decline together, not because one metric beats LiDAR everywhere. For surveying, utilities, and industrial facilities where accuracy is critical, LiDAR or hybrid workflows still have clear roles.",
          },
        ],
      },
      {
        heading: { zh: "商业落地的三分法", en: "A three-way deployment lens" },
        paragraphs: [
          {
            zh: "短期更合理的判断框架是三分法：高精度、弱纹理或夜间稳定性优先时核对激光方案；传播展示、消费级视觉内容和中小预算时评估纯视觉；当点云结构和照片纹理都重要时，看厂商是否能把激光点云、摄影测量和 3DGS 训练链路稳定融合。",
            en: "A practical near-term lens is three-way: verify LiDAR for high precision, weak texture, or night stability; evaluate visual capture for communication, consumer media, and smaller budgets; and assess hybrid vendors when both point-cloud structure and photographic texture matter.",
          },
        ],
      },
    ],
    relatedNewsIds: [
      "tool-realityscan-2-0-release",
      "tool-colmap-3-12-sensor-rig",
      "industry-dji-avata-360-launch-specs-2026",
    ],
    relatedToolSlugs: ["colmap", "postshot", "kiri-engine"],
    callToAction: {
      zh: "本文含多处转录市场数字，商业引用前应补正式报告或厂商公开资料。",
      en: "Several market figures come from transcripts; add formal reports or vendor disclosures before commercial citation.",
    },
    verified: false,
    sources: [
      "knowledge-base/sources/research/industry-laser-vs-visual-2026-04.md",
      "knowledge-base/sources/_inbox/transcribed/batch-02.md",
      "knowledge-base/sources/_inbox/transcribed/batch-03.md",
    ],
  },
];

export const insightsBySlug = Object.fromEntries(
  insights.map((insight) => [insight.slug, insight]),
) as Record<string, InsightEntry>;
