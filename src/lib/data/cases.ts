/**
 * 案例与创作者（milestone：原始 3DGS + TASK-04 批次 12 篇里程碑论文 + SuperSplat 工具）
 * 来源：Gemini 反幻觉版调研与 arXiv Atom 摘要核对 (2026-04-29)
 *
 * kind 说明：
 *   - "milestone" 学术里程碑或工具，无具体扫描场景信息
 *   - "production" 真实空间案例（有创作者/客户/场地/拍摄设备等），等下一批补
 *
 * 所有 URL 已剥离 markdown 包装；`location.site: "null"` 字符串已改为 null。
 * 下游 UI 应在缺失字段时自动隐藏（不要渲染 null 数字/设备）。
 */

import type { CreatorRoleId, SpaceTypeId, TagId } from "@/lib/taxonomy";

export type CaseKind = "milestone" | "production";

export type Bilingual = { zh: string; en: string };

export type CaseLocation = {
  country: string | null;
  city: string | null;
  site: string | null;
};

export type CaseCreator = {
  name: string;
  role: CreatorRoleId;
  link: string | null;
};

export type CaseLink = {
  label: string;
  url: string;
};

export type CaseEntry = {
  slug: string;
  kind: CaseKind;
  title: Bilingual;
  summary: Bilingual;
  description: Bilingual;
  spaceType: SpaceTypeId | null;
  location: CaseLocation;
  year: number | null;
  creators: CaseCreator[];
  client: string | null;
  captureDevice: string | null;
  captureMethod: string | null;
  trainingPipeline: string | null;
  trainingTime: string | null;
  splatCount: string | null;
  viewerStack: string | null;
  splatViewerUrl: string | null;
  videoUrl: string | null;
  coverUrl: string | null;
  tags: TagId[];
  lessons: Bilingual[];
  links: CaseLink[];
  publishedAt: string;
  verified: boolean;
  sources: string[];
  quote?: { zh: string | null; en: string | null };
};

export const cases: CaseEntry[] = [
  {
    slug: "inria-original-3dgs",
    kind: "milestone",
    title: {
      zh: "3D 高斯泼溅原始论文",
      en: "3D Gaussian Splatting for Real-Time Radiance Field Rendering",
    },
    summary: {
      zh: "高斯泼溅技术的开山之作，首次打破了高质量视图合成与实时渲染之间的性能壁垒。",
      en: "The foundational paper for 3DGS, breaking the barrier between high-quality view synthesis and real-time rendering.",
    },
    description: {
      zh: "Inria 团队在 SIGGRAPH 2023 发布的开山之作。该研究通过显式表示各向异性的高斯椭球阵列，配合专用的可微光栅化管线，在保持与最先进 NeRF 模型相当甚至更优的画质同时，实现了前所未有的实时渲染速度。项目主页汇集了完整的渲染代码、训练框架、论文正文以及多个经典空间数据集上的性能对比，是当今所有空间计算与高斯衍生工程化产品的绝对基准。",
      en: "The seminal SIGGRAPH 2023 paper from the Inria team. By explicitly representing the scene with an array of anisotropic Gaussian ellipsoids paired with a specialized differentiable rasterization pipeline, the work achieves unprecedented real-time rendering speeds while matching or surpassing the image quality of state-of-the-art NeRF models. The project page hosts rendering code, training framework, full paper, and benchmarks against classic datasets — the absolute foundation for all modern spatial computing and Gaussian derivative products.",
    },
    spaceType: null,
    location: {
      country: "法国",
      city: "尼斯",
      site: null,
    },
    year: 2023,
    creators: [
      {
        name: "Bernhard Kerbl & Georgios Kopanas",
        role: "researcher",
        link: "https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/",
      },
    ],
    client: null,
    captureDevice: null,
    captureMethod: null,
    trainingPipeline: null,
    trainingTime: null,
    splatCount: null,
    viewerStack: null,
    splatViewerUrl: null,
    videoUrl: null,
    coverUrl: null,
    tags: [
      "paper",
      "real_time",
    ],
    lessons: [
      {
        zh: "把空间从隐式神经网络换成显式的高斯点云表达，是迈向实时交互光栅化的关键一步。",
        en: "Moving from implicit networks to explicit Gaussian point clouds is the crucial step toward real-time interactive rasterization.",
      },
      {
        zh: "高斯体的各向异性（在不同方向上压缩拉伸）极大提升了对复杂几何与高频边缘的刻画能力。",
        en: "Anisotropy of Gaussians dramatically enhances the depiction of complex geometry and high-frequency edges.",
      },
      {
        zh: "自适应的密度控制策略能有效解决空间中过拟合与欠拟合区域的渲染伪影。",
        en: "Adaptive density control effectively resolves rendering artifacts in both over-fitted and under-fitted regions.",
      },
    ],
    links: [
      {
        label: "Project Homepage",
        url: "https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/",
      },
    ],
    publishedAt: "2023-07-01",
    verified: true,
    sources: [
      "https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/",
    ],
    quote: {
      zh: null,
      en: "Radiance Field methods have recently revolutionized novel-view synthesis of scenes captured with multiple photos or videos.",
    },
  },
  {
    slug: "sugar-surface-aligned-meshes",
    kind: "milestone",
    title: {
      zh: "SuGaR：表面对齐的高斯网格提取",
      en: "SuGaR: Surface-Aligned Gaussian Splatting",
    },
    summary: {
      zh: "用正则化让高斯体紧贴物体表面，弥合了点云高斯与传统多边形网格管线之间的鸿沟。",
      en: "Bridges the gap between Gaussian point clouds and traditional polygon mesh pipelines via surface-alignment regularization.",
    },
    description: {
      zh: "SuGaR 直指标准 3DGS 难以转换为传统 3D 软件可编辑表面网格的痛点。在原始优化过程中，高斯往往呈现出半透明的混乱重叠状态。SuGaR 引入特定的正则化项，强制三维高斯体变得扁平并紧贴底层物体的几何表面，进而通过泊松重建等传统算法提取出结构干净的多边形网格。该方法显著拓宽了高斯资产的下游应用——可以直接导入既有游戏引擎与动画工作流进行物理碰撞与 UV 编辑。",
      en: "SuGaR addresses a major pain point: vanilla 3DGS is hard to convert into editable surface meshes for traditional 3D software. During optimization, Gaussians usually exhibit chaotic semi-transparent overlap. SuGaR adds a regularization term forcing the 3D Gaussians to flatten and adhere tightly to the underlying object surface, after which clean polygonal meshes can be extracted via classic algorithms like Poisson reconstruction. The method significantly broadens downstream usage — letting 3DGS results flow into existing game engines and animation workflows for collision and UV editing.",
    },
    spaceType: null,
    location: {
      country: "法国",
      city: "巴黎",
      site: null,
    },
    year: 2023,
    creators: [
      {
        name: "Antoine Guédon",
        role: "researcher",
        link: "https://anttwo.github.io/sugar/",
      },
    ],
    client: null,
    captureDevice: null,
    captureMethod: null,
    trainingPipeline: null,
    trainingTime: null,
    splatCount: null,
    viewerStack: null,
    splatViewerUrl: null,
    videoUrl: null,
    coverUrl: null,
    tags: [
      "paper",
      "optimization",
    ],
    lessons: [
      {
        zh: "几何法线信息的对齐，是高质量表面提取的前提。",
        en: "Aligning geometric normals is a prerequisite for high-quality surface extraction.",
      },
      {
        zh: "在优化管线里施加物理约束，能有效压制纯视觉过拟合带来的内部结构混乱。",
        en: "Enforcing physical constraints inside the optimization pipeline suppresses internal chaos caused by pure visual overfitting.",
      },
      {
        zh: "把高斯转回标准网格，等于立刻接通过去几十年的传统计算机图形学工具链生态。",
        en: "Converting Gaussians back to standard meshes immediately unlocks decades of classic computer graphics tooling.",
      },
    ],
    links: [
      {
        label: "Project Homepage",
        url: "https://anttwo.github.io/sugar/",
      },
    ],
    publishedAt: "2023-11-20",
    verified: true,
    sources: [
      "https://anttwo.github.io/sugar/",
      "https://arxiv.org/abs/2311.12775",
      "https://github.com/Anttwo/SuGaR",
    ],
    quote: {
      zh: null,
      en: "We propose a method that extracts precise and appealing meshes from 3D Gaussian Splatting.",
    },
  },
  {
    slug: "playcanvas-supersplat-editor",
    kind: "milestone",
    title: {
      zh: "SuperSplat：开源 Web 端高斯编辑器",
      en: "SuperSplat: Open-Source Web Gaussian Editor",
    },
    summary: {
      zh: "完全在浏览器中运行的高性能 3DGS 查阅与编辑工具，大幅降低了空间数据清理的硬件门槛。",
      en: "A high-performance 3DGS viewer and editor running entirely in the browser, drastically lowering the hardware barrier for spatial data cleanup.",
    },
    description: {
      zh: "SuperSplat 由图形引擎厂商 PlayCanvas 团队发起并维护，旨在为 3DGS 提供一个无需安装、开箱即用的轻量级 Web 编辑环境。在它出现之前，高斯模型的查阅与清理主要依赖本地编译的重型客户端，对显卡要求很高。SuperSplat 深度利用 WebGL 与 WebGPU，实现了在现代浏览器中流畅加载与高帧率预览，支持直接拖拽导入庞大的 PLY 文件，并提供框选、反选、裁剪、删除等极为直观的功能，帮助创作者快速清理环境扫描中残留的悬浮噪点与无关边界。",
      en: "Initiated and maintained by the PlayCanvas graphics engine team, SuperSplat offers a zero-install, out-of-the-box lightweight web editing environment for 3DGS. Before it appeared, viewing and cleaning Gaussian models required heavy locally-compiled clients with high GPU demands. SuperSplat leans deeply on WebGL and WebGPU to deliver smooth loading and high framerate preview directly in modern browsers. Users can drag-and-drop massive PLY files, then use intuitive box selection, inversion, cropping, and deletion to quickly clean up floating noise and stray boundaries left over from environmental scans.",
    },
    spaceType: null,
    location: {
      country: "英国",
      city: "伦敦",
      site: null,
    },
    year: 2023,
    creators: [
      {
        name: "PlayCanvas Team",
        role: "developer",
        link: "https://github.com/playcanvas/supersplat",
      },
    ],
    client: null,
    captureDevice: null,
    captureMethod: null,
    trainingPipeline: null,
    trainingTime: null,
    splatCount: null,
    viewerStack: "PlayCanvas / WebGL / WebGPU",
    splatViewerUrl: "https://playcanvas.com/supersplat/editor",
    videoUrl: null,
    coverUrl: null,
    tags: [
      "web_rendering",
      "editing",
      "optimization",
    ],
    lessons: [
      {
        zh: "WebGPU 正在成为空间计算平民化的底层基础设施。",
        en: "WebGPU is becoming the foundational infrastructure for democratizing spatial computing.",
      },
      {
        zh: "提供易于操作的三维包围盒裁剪，比逐点选择更高效，也更符合人类直觉。",
        en: "3D bounding-box cropping is far more efficient and intuitive than point-by-point selection.",
      },
      {
        zh: "把数据清理后置到浏览器中进行，极大简化了早期模型捕获与训练的繁琐流程。",
        en: "Pushing data cleanup into the browser drastically simplifies the early capture-and-train workflow.",
      },
    ],
    links: [
      {
        label: "GitHub Repository",
        url: "https://github.com/playcanvas/supersplat",
      },
      {
        label: "Web Editor",
        url: "https://playcanvas.com/supersplat/editor",
      },
    ],
    publishedAt: "2023-10-01",
    verified: true,
    sources: [
      "https://github.com/playcanvas/supersplat",
    ],
    quote: {
      zh: null,
      en: "SuperSplat is an open source tool for editing 3D Gaussian Splats. It allows you to load, edit and save splat files.",
    },
  },
  {
    slug: "mip-splatting-anti-aliased",
    kind: "milestone",
    title: {
      zh: "Mip-Splatting：抗锯齿与多尺度渲染",
      en: "Mip-Splatting: Anti-Aliased 3D Gaussian Splatting",
    },
    summary: {
      zh: "通过引入二维低通滤波器机制，彻底解决了改变视角距离时产生的强烈高频锯齿与膨胀伪影。",
      en: "Resolves intense high-frequency aliasing and dilation artifacts when changing viewing distances by introducing a 2D low-pass filter.",
    },
    description: {
      zh: "Mip-Splatting 直指原始 3DGS 在实际空间漫游中的一项致命弱点：缺乏抗锯齿能力。在默认框架下，当用户改变虚拟相机焦距，或从远离扫描物体的宏观视角进行观察时，原本清晰的画面会因采样率不匹配而出现高频噪点和团块膨胀。研究团队把经典信号处理理论引入高斯渲染，设计了一种二维光学低通滤波器；在光栅化投影阶段，系统会根据相机距离动态限制高斯在二维屏幕上的频率响应，使模型无需预训练庞大的多尺度金字塔，即可在任意推拉视角下保持视觉连贯。",
      en: "Mip-Splatting targets a critical weakness of vanilla 3DGS during spatial roaming: the absence of anti-aliasing. Under the default framework, changing focal length or viewing the scene from far away breaks the image into noise and blocky dilation due to sampling-rate mismatch. The team brings classic signal processing theory into Gaussian rendering, designing a 2D optical low-pass filter that dynamically limits the on-screen frequency response of each Gaussian based on camera distance — preserving visual coherence under any push-pull motion without requiring a pre-trained multi-scale pyramid.",
    },
    spaceType: null,
    location: {
      country: "德国",
      city: "图宾根",
      site: null,
    },
    year: 2023,
    creators: [
      {
        name: "Zehao Yu",
        role: "researcher",
        link: "https://niujinshuchong.github.io/mip-splatting/",
      },
    ],
    client: null,
    captureDevice: null,
    captureMethod: null,
    trainingPipeline: null,
    trainingTime: null,
    splatCount: null,
    viewerStack: null,
    splatViewerUrl: null,
    videoUrl: null,
    coverUrl: null,
    tags: [
      "paper",
      "optimization",
    ],
    lessons: [
      {
        zh: "解决新型体渲染缺陷的答案，往往藏在二十年前的经典抗锯齿理论里。",
        en: "Answers for novel volumetric rendering flaws often hide inside classic anti-aliasing theory from twenty years ago.",
      },
      {
        zh: "控制二维平面的频率响应，比在三维空间生成多尺度网格更具计算效率。",
        en: "Controlling on-screen 2D frequency response is far more efficient than generating multi-scale 3D meshes.",
      },
      {
        zh: "优秀的底层算法应保证修改后的模型与原始管线向后兼容。",
        en: "Solid low-level algorithms should keep the modified model backward compatible with the original pipeline.",
      },
    ],
    links: [
      {
        label: "Project Homepage",
        url: "https://niujinshuchong.github.io/mip-splatting/",
      },
    ],
    publishedAt: "2023-11-28",
    verified: true,
    sources: [
      "https://niujinshuchong.github.io/mip-splatting/",
      "https://arxiv.org/abs/2311.16493",
      "https://github.com/autonomousvision/mip-splatting",
    ],
    quote: {
      zh: null,
      en: "Recently, 3D Gaussian Splatting has demonstrated impressive novel view synthesis results, reaching high rendering speed and quality.",
    },
  },
  {
    slug: "2d-gaussian-splatting",
    kind: "milestone",
    title: {
      zh: "二维高斯泼溅：几何精确的辐射场",
      en: "2D Gaussian Splatting for Geometrically Accurate Radiance Fields",
    },
    summary: {
      zh: "将体积高斯压成与表面对齐的二维盘，配合透视正确泼溅与深度法线正则，显著改善几何重建。",
      en: "Flattens volumetric Gaussians into surface-aligned 2D disks with perspective-correct splatting and depth or normal cues for cleaner geometry.",
    },
    description: {
      zh: "论文指出标准三维高斯在多视图间对薄表面与深度不一致敏感。二维高斯泼溅用射线与椭圆盘求交定义透视正确的贡献，并引入深度畸变与法线一致性正则，在保持实时渲染与较快训练的同时改善网格提取。官方页面提供代码与几何对比示例。",
      en: "The work argues that 3D Gaussians are multi-view inconsistent for thin surfaces. 2DGS represents oriented planar Gaussian disks and uses ray-splat intersection for perspective-correct rendering, augmented by depth distortion and normal consistency losses. It targets noise-free meshes and stable normals while keeping competitive appearance and real-time splatting. The project site and repository ship reference code and geometry comparisons.",
    },
    spaceType: null,
    location: {
      country: null,
      city: null,
      site: null,
    },
    year: 2024,
    creators: [
      {
        name: "Binbin Huang",
        role: "researcher",
        link: "https://surfsplatting.github.io/",
      },
    ],
    client: null,
    captureDevice: null,
    captureMethod: null,
    trainingPipeline: null,
    trainingTime: null,
    splatCount: null,
    viewerStack: null,
    splatViewerUrl: null,
    videoUrl: null,
    coverUrl: null,
    tags: [
      "paper",
      "surface",
      "reconstruction",
      "real_time",
    ],
    lessons: [
      {
        zh: "显式表面基元与射线求交能直接缓解多视图深度不一致。",
        en: "Explicit surface primitives with ray intersection directly reduce multi-view depth inconsistency.",
      },
      {
        zh: "几何正则与外观损失并用，是神经辐射场走向可导出网格的常用组合。",
        en: "Pairing geometric regularizers with photometric losses is a recurring recipe for exportable meshes from neural fields.",
      },
    ],
    links: [
      {
        label: "arXiv",
        url: "https://arxiv.org/abs/2403.17888",
      },
      {
        label: "Project Page",
        url: "https://surfsplatting.github.io/",
      },
      {
        label: "GitHub",
        url: "https://github.com/hbb1/2d-gaussian-splatting",
      },
    ],
    publishedAt: "2024-SIGGRAPH",
    verified: true,
    sources: [
      "https://arxiv.org/abs/2403.17888",
      "https://surfsplatting.github.io/",
      "https://github.com/hbb1/2d-gaussian-splatting",
    ],
    quote: {
      zh: null,
      en: "3D Gaussian Splatting (3DGS) has recently revolutionized radiance field reconstruction, achieving high quality novel view synthesis and fast rendering speed without baking.",
    },
  },
  {
    slug: "4d-gaussian-splatting",
    kind: "milestone",
    title: {
      zh: "4D 高斯泼溅：实时动态场景渲染",
      en: "4D Gaussian Splatting for Real-Time Dynamic Scene Rendering",
    },
    summary: {
      zh: "以 4D 神经体素与可学习形变在单套规范高斯上建模动态场景，兼顾实时帧率与训练存储效率。",
      en: "Models dynamic scenes with 4D neural voxels and a deformation field over a single canonical Gaussian set for real-time training and storage efficiency.",
    },
    description: {
      zh: "论文将动态场景表示为共享的规范三维高斯，并通过分解式神经体素编码与轻量网络预测时间戳上的高斯形变，避免逐帧复制大量高斯带来的存储膨胀。渲染沿用可微泼溅，在多种分辨率下报告较高帧率。项目提供演示与开源实现，便于与静态 3DGS 工作流对照。",
      en: "The method maintains one set of canonical 3D Gaussians and predicts their deformation over time using features built from 4D neural voxels and a compact MLP, avoiding per-frame Gaussian duplication. Rendering stays in the differentiable splatting regime, with reported real-time performance on dynamic benchmarks. The project page and code release support reproduction and comparison with static 3DGS pipelines.",
    },
    spaceType: null,
    location: {
      country: null,
      city: null,
      site: null,
    },
    year: 2024,
    creators: [
      {
        name: "Guanjun Wu",
        role: "researcher",
        link: "https://guanjunwu.github.io/4dgs/",
      },
    ],
    client: null,
    captureDevice: null,
    captureMethod: null,
    trainingPipeline: null,
    trainingTime: null,
    splatCount: null,
    viewerStack: null,
    splatViewerUrl: null,
    videoUrl: null,
    coverUrl: null,
    tags: [
      "paper",
      "dynamic",
      "real_time",
      "optimization",
    ],
    lessons: [
      {
        zh: "动态高斯的关键是用紧凑的时序结构编码替代逐帧点云爆炸。",
        en: "The key for dynamic Gaussians is a compact temporal encoding instead of per-frame point blow-up.",
      },
      {
        zh: "规范空间加形变场仍是衔接动态 NeRF 与显式泼溅的实用折中。",
        en: "Canonical space plus a deformation field remains a practical bridge between dynamic NeRFs and explicit splatting.",
      },
    ],
    links: [
      {
        label: "arXiv",
        url: "https://arxiv.org/abs/2310.08528",
      },
      {
        label: "Project Page",
        url: "https://guanjunwu.github.io/4dgs/",
      },
      {
        label: "GitHub",
        url: "https://github.com/hustvl/4DGaussians",
      },
    ],
    publishedAt: "2024-CVPR",
    verified: true,
    sources: [
      "https://arxiv.org/abs/2310.08528",
      "https://guanjunwu.github.io/4dgs/",
      "https://github.com/hustvl/4DGaussians",
    ],
    quote: {
      zh: null,
      en: "Representing and rendering dynamic scenes has been an important but challenging task.",
    },
  },
  {
    slug: "compact-3d-gaussian",
    kind: "milestone",
    title: {
      zh: "紧凑三维高斯辐射场表示",
      en: "Compact 3D Gaussian Representation for Radiance Field",
    },
    summary: {
      zh: "通过掩码剪枝、网格化颜色场与几何码本量化，在保持画质的同时大幅压缩高斯数量与属性存储。",
      en: "Combines learned masking, grid-based view-dependent color, and codebook-quantized geometry to shrink Gaussian count and attribute storage while preserving quality.",
    },
    description: {
      zh: "论文针对三维高斯泼溅显存与磁盘占用随场景细节线性膨胀的问题，提出可学习体积掩码去除贡献微弱的高斯，并用哈希网格查询替代逐高斯球谐颜色，再用向量量化共享尺度与旋转模式。配合量化与熵编码，在多项指标上报告相对原始三维高斯泼溅数量级级的体积下降与更快渲染。",
      en: "The paper tackles memory and disk growth of 3DGS as Gaussians densify. It learns a volumetric mask to drop low-impact Gaussians, replaces per-Gaussian spherical harmonics with a compact hash-grid color field, and codebooks geometric attributes where many Gaussians share similar scales and rotations. With quantization and entropy coding it reports large storage reductions and faster rendering versus vanilla 3DGS on benchmark scenes.",
    },
    spaceType: null,
    location: {
      country: null,
      city: null,
      site: null,
    },
    year: 2024,
    creators: [
      {
        name: "Joo Chan Lee",
        role: "researcher",
        link: "https://maincold2.github.io/c3dgs/",
      },
    ],
    client: null,
    captureDevice: null,
    captureMethod: null,
    trainingPipeline: null,
    trainingTime: null,
    splatCount: null,
    viewerStack: null,
    splatViewerUrl: null,
    videoUrl: null,
    coverUrl: null,
    tags: [
      "paper",
      "compression",
      "optimization",
    ],
    lessons: [
      {
        zh: "冗余高斯剪枝与属性共享是压缩显式辐射场的两条主杠杆。",
        en: "Pruning redundant Gaussians and sharing attributes are the two main levers for compressing explicit radiance fields.",
      },
      {
        zh: "将高频颜色从逐点存储迁到连续场，可显著降低每点参数数量。",
        en: "Moving high-frequency color from per-point storage to a continuous field cuts per-primitive parameters.",
      },
    ],
    links: [
      {
        label: "arXiv",
        url: "https://arxiv.org/abs/2311.13681",
      },
      {
        label: "Project Page",
        url: "https://maincold2.github.io/c3dgs/",
      },
      {
        label: "GitHub",
        url: "https://github.com/maincold2/Compact-3DGS",
      },
    ],
    publishedAt: "2024-CVPR",
    verified: true,
    sources: [
      "https://arxiv.org/abs/2311.13681",
      "https://maincold2.github.io/c3dgs/",
      "https://github.com/maincold2/Compact-3DGS",
    ],
    quote: {
      zh: null,
      en: "Neural Radiance Fields (NeRFs) have demonstrated remarkable potential in capturing complex 3D scenes with high fidelity.",
    },
  },
  {
    slug: "deformable-3d-gaussians",
    kind: "milestone",
    title: {
      zh: "可变形三维高斯：单目动态场景高保真重建",
      en: "Deformable 3D Gaussians for High-Fidelity Monocular Dynamic Scene Reconstruction",
    },
    summary: {
      zh: "在规范空间用三维高斯加形变场建模单目动态场景，并以退火平滑抑制位姿噪声带来的时序抖动。",
      en: "Optimizes 3D Gaussians in canonical space with a deformation field for monocular dynamics and uses annealed smoothing to reduce temporal jitter from pose noise.",
    },
    description: {
      zh: "方法将静态三维高斯泼溅推广到动态设置：在规范坐标系中维护高斯参数，并用神经网络将任意时刻的点映射到规范空间以解释运动。可微高斯光栅器提供高效反传。针对真实序列位姿不准，引入无额外开销的退火平滑训练以改善时间插值平滑度。论文报告在质量与帧率上相对隐式动态神经渲染的优势。",
      en: "The approach extends static 3DGS to monocular dynamic scenes by coupling learnable Gaussians in canonical space with an implicit deformation field over time. A custom differentiable Gaussian rasterizer supplies gradients for both components. An annealing smoothing training schedule mitigates pose inaccuracies without extra runtime cost. Experiments report improved rendering quality and real-time speed versus implicit dynamic NeRF-style baselines on standard benchmarks.",
    },
    spaceType: null,
    location: {
      country: null,
      city: null,
      site: null,
    },
    year: 2024,
    creators: [
      {
        name: "Ziyi Yang",
        role: "researcher",
        link: "https://github.com/ingra14m/Deformable-3D-Gaussians",
      },
    ],
    client: null,
    captureDevice: null,
    captureMethod: null,
    trainingPipeline: null,
    trainingTime: null,
    splatCount: null,
    viewerStack: null,
    splatViewerUrl: null,
    videoUrl: null,
    coverUrl: null,
    tags: [
      "paper",
      "dynamic",
      "real_time",
      "reconstruction",
    ],
    lessons: [
      {
        zh: "规范加形变仍是把显式点云表示推广到动态视频的主干结构。",
        en: "Canonical plus deformation remains the backbone for extending explicit points to dynamic video.",
      },
      {
        zh: "对位姿噪声敏感的损失需要与时间相关的正则或退火策略配合。",
        en: "Pose-sensitive losses benefit temporal regularizers or annealing when cameras are imperfect.",
      },
    ],
    links: [
      {
        label: "arXiv",
        url: "https://arxiv.org/abs/2309.13101",
      },
      {
        label: "GitHub",
        url: "https://github.com/ingra14m/Deformable-3D-Gaussians",
      },
    ],
    publishedAt: "2024-CVPR",
    verified: true,
    sources: [
      "https://arxiv.org/abs/2309.13101",
      "https://github.com/ingra14m/Deformable-3D-Gaussians",
    ],
    quote: {
      zh: null,
      en: "Implicit neural representation has paved the way for new approaches to dynamic scene reconstruction and rendering.",
    },
  },
  {
    slug: "dreamgaussian",
    kind: "milestone",
    title: {
      zh: "DreamGaussian：高效生成式高斯泼溅三维内容",
      en: "DreamGaussian: Generative Gaussian Splatting for Efficient 3D Content Creation",
    },
    summary: {
      zh: "以三维高斯为可微载体结合 SDS，并辅以网格提取与 UV 精修，显著缩短单样本三维生成时间。",
      en: "Combines 3D Gaussians with score distillation and mesh or UV refinement to cut per-asset 3D generation time sharply.",
    },
    description: {
      zh: "工作面向图像或文本驱动的三维资产生成，指出基于 NeRF 的 SDS 管线因体渲染代价高而迭代缓慢。作者将表示换为三维高斯泼溅，利用渐进加密更快填充形状，再在第二阶段从高密度高斯提取网格并在 UV 空间细化纹理。实验强调与此前方法相比的训练时间数量级缩短，同时保持有竞争力的生成质量。",
      en: "Targeting image- and text-conditioned 3D asset creation, the paper argues that NeRF-based SDS optimization is slow due to volume rendering cost. It instead optimizes 3D Gaussians with SDS, using progressive densification suited to generative optimization, then extracts a mesh and refines textures in UV space. Experiments highlight large wall-clock speedups over prior lifting methods while reporting competitive quality for common text- and image-to-3D setups.",
    },
    spaceType: null,
    location: {
      country: null,
      city: null,
      site: null,
    },
    year: 2024,
    creators: [
      {
        name: "Jiaxiang Tang",
        role: "researcher",
        link: "https://dreamgaussian.github.io/",
      },
    ],
    client: null,
    captureDevice: null,
    captureMethod: null,
    trainingPipeline: null,
    trainingTime: null,
    splatCount: null,
    viewerStack: null,
    splatViewerUrl: null,
    videoUrl: null,
    coverUrl: null,
    tags: [
      "paper",
      "generation",
      "training",
      "optimization",
    ],
    lessons: [
      {
        zh: "生成设定下显式高斯的优化景观可与重建设定不同，需重新匹配加密与损失调度。",
        en: "Generative optimization landscapes differ from reconstruction; densification and loss schedules must be re-matched.",
      },
      {
        zh: "网格与 UV 后处理仍是把可微辐射场导出到 DCC 工具链的务实路径。",
        en: "Mesh and UV post-processing remains the pragmatic path from differentiable fields into DCC pipelines.",
      },
    ],
    links: [
      {
        label: "arXiv",
        url: "https://arxiv.org/abs/2309.16653",
      },
      {
        label: "Project Page",
        url: "https://dreamgaussian.github.io/",
      },
      {
        label: "GitHub",
        url: "https://github.com/dreamgaussian/dreamgaussian",
      },
    ],
    publishedAt: "2024-ICLR",
    verified: true,
    sources: [
      "https://arxiv.org/abs/2309.16653",
      "https://dreamgaussian.github.io/",
      "https://github.com/dreamgaussian/dreamgaussian",
    ],
    quote: {
      zh: null,
      en: "Recent advances in 3D content creation mostly leverage optimization-based 3D generation via score distillation sampling (SDS).",
    },
  },
  {
    slug: "gaussian-avatars",
    kind: "milestone",
    title: {
      zh: "GaussianAvatar：单视频可动画三维高斯化身",
      en: "GaussianAvatar: Towards Realistic Human Avatar Modeling from a Single Video via Animatable 3D Gaussians",
    },
    summary: {
      zh: "用可驱动三维高斯显式建模人体，并学习姿态相关外观与运动联合优化，提升单目视频化身真实感与效率。",
      en: "Models humans with animatable 3D Gaussians, learns pose-dependent appearance, and jointly refines motion and look for realistic monocular avatars.",
    },
    description: {
      zh: "论文将人体表示为附着在参数化模板上的可动画三维高斯，借助前向蒙皮避免部分隐式方法中的逆蒙皮歧义。动态外观网络与可优化特征张量共同刻画衣物褶皱等细节。由于运动条件可微，可在训练时同时校正外观与初始运动估计。实验在公开与自建数据上比较渲染质量与速度。",
      en: "GaussianAvatar represents clothed humans with animatable 3D Gaussians anchored to a parametric body, using forward skinning to avoid inverse-skinning ambiguities common in NeRF avatars. A dynamic appearance network and an optimizable feature tensor capture pose-dependent detail such as wrinkles. Differentiable motion conditioning enables joint refinement of appearance and imperfect pose estimates from monocular video. Experiments report favorable quality and efficiency against prior avatar methods.",
    },
    spaceType: null,
    location: {
      country: null,
      city: null,
      site: null,
    },
    year: 2024,
    creators: [
      {
        name: "Liangxiao Hu",
        role: "researcher",
        link: "https://github.com/aipixel/GaussianAvatar",
      },
    ],
    client: null,
    captureDevice: null,
    captureMethod: null,
    trainingPipeline: null,
    trainingTime: null,
    splatCount: null,
    viewerStack: null,
    splatViewerUrl: null,
    videoUrl: null,
    coverUrl: null,
    tags: [
      "paper",
      "avatar",
      "reconstruction",
    ],
    lessons: [
      {
        zh: "显式高斯与可微蒙皮组合，可在单目设定下直接优化运动与外观的耦合误差。",
        en: "Explicit Gaussians with differentiable skinning let you co-optimize motion and appearance errors in monocular setups.",
      },
      {
        zh: "姿态条件外观需要额外自由度以避免在有限姿态上过拟合。",
        en: "Pose-conditioned appearance needs extra degrees of freedom to avoid overfitting on limited poses.",
      },
    ],
    links: [
      {
        label: "arXiv",
        url: "https://arxiv.org/abs/2312.02134",
      },
      {
        label: "GitHub",
        url: "https://github.com/aipixel/GaussianAvatar",
      },
    ],
    publishedAt: "2024-CVPR",
    verified: true,
    sources: [
      "https://arxiv.org/abs/2312.02134",
      "https://github.com/aipixel/GaussianAvatar",
    ],
    quote: {
      zh: null,
      en: "We present GaussianAvatar, an efficient approach to creating realistic human avatars with dynamic 3D appearances from a single video.",
    },
  },
  {
    slug: "gaussian-splatting-slam",
    kind: "milestone",
    title: {
      zh: "高斯泼溅 SLAM",
      en: "Gaussian Splatting SLAM",
    },
    summary: {
      zh: "以三维高斯为统一地图表示，在单目序列上联合跟踪与建图，实现实时增量重建与新视角合成。",
      en: "Uses Gaussians as the sole map representation for monocular SLAM, jointly optimizing poses and primitives for incremental reconstruction and NVS.",
    },
    description: {
      zh: "论文将三维高斯泼溅引入在线 SLAM：不再依赖离线 SfM 的精确位姿，而是直接对高斯进行基于光度一致性的相机跟踪，并利用显式高斯进行几何校验与正则以应对增量稠密重建中的模糊性。系统可在单目实时运行并扩展到 RGB-D。公开实现以 MonoGS 仓库为载体，配套项目页与演示视频。",
      en: "The work brings 3DGS into online SLAM: instead of assuming offline SfM poses, it formulates direct photometric camera tracking against the evolving Gaussian map and adds geometric verification leveraging explicit primitives for incremental dense mapping. It targets monocular live operation at interactive rates and extends to RGB-D when depth is available. The MonoGS codebase, project page, and video provide reproducibility and qualitative demos on challenging indoor sequences.",
    },
    spaceType: null,
    location: {
      country: null,
      city: null,
      site: null,
    },
    year: 2024,
    creators: [
      {
        name: "Hidenobu Matsuki",
        role: "researcher",
        link: "https://rmurai.co.uk/projects/GaussianSplattingSLAM/",
      },
    ],
    client: null,
    captureDevice: null,
    captureMethod: null,
    trainingPipeline: null,
    trainingTime: null,
    splatCount: null,
    viewerStack: null,
    splatViewerUrl: null,
    videoUrl: "https://youtu.be/x604ghp9R_Q",
    coverUrl: null,
    tags: [
      "paper",
      "slam",
      "real_time",
      "reconstruction",
    ],
    lessons: [
      {
        zh: "把跟踪与地图统一在同一显式表示上，可减少多模块 SLAM 之间的表示不一致。",
        en: "Unifying tracking and mapping in one explicit representation reduces cross-module representation mismatch.",
      },
      {
        zh: "增量式稠密重建仍需要几何校验，单靠颜色一致性不足以消除单目尺度歧义。",
        en: "Incremental dense mapping still needs geometric checks; photometric consistency alone does not remove monocular ambiguities.",
      },
    ],
    links: [
      {
        label: "arXiv",
        url: "https://arxiv.org/abs/2312.06741",
      },
      {
        label: "Project Page",
        url: "https://rmurai.co.uk/projects/GaussianSplattingSLAM/",
      },
      {
        label: "GitHub",
        url: "https://github.com/muskie82/MonoGS",
      },
      {
        label: "Video",
        url: "https://youtu.be/x604ghp9R_Q",
      },
    ],
    publishedAt: "2024-CVPR",
    verified: true,
    sources: [
      "https://arxiv.org/abs/2312.06741",
      "https://rmurai.co.uk/projects/GaussianSplattingSLAM/",
      "https://github.com/muskie82/MonoGS",
    ],
    quote: {
      zh: null,
      en: "We present the first application of 3D Gaussian Splatting in monocular SLAM, the most fundamental but the hardest setup for Visual SLAM.",
    },
  },
  {
    slug: "hugs",
    kind: "milestone",
    title: {
      zh: "HUGS：人体高斯泼溅",
      en: "HUGS: Human Gaussian Splats",
    },
    summary: {
      zh: "在单目短序列上联合学习静态场景与可动画人体高斯，通过优化蒙皮权重抑制关节动画伪影并实现高帧率渲染。",
      en: "Jointly learns static scene and animatable human Gaussians from a short monocular clip, optimizing skinning weights to reduce articulation artifacts at high FPS.",
    },
    description: {
      zh: "论文将人体与背景统一表示为三维高斯，在人体区域用 SMPL 初始化并允许高斯偏离模板以刻画衣物与头发。针对关节驱动时高斯撕裂或空洞，提出联合优化线性混合蒙皮权重，使个体高斯在姿态变化下保持连贯。系统在数十分钟内完成训练并报告相对隐式神经化身方法的数量级加速，同时支持新姿态与新视角合成。",
      en: "HUGS represents both the person and the scene with 3D Gaussians, initializing human Gaussians from SMPL while allowing deviations for clothing and hair. Articulation can tear point-based avatars; the method co-optimizes linear blend skinning weights alongside Gaussians to keep the ensemble coherent under novel poses. Training finishes in tens of minutes on short monocular clips and renders at interactive rates, reporting large speedups over implicit neural human models while enabling novel-pose and novel-view synthesis.",
    },
    spaceType: null,
    location: {
      country: null,
      city: null,
      site: null,
    },
    year: 2024,
    creators: [
      {
        name: "Muhammed Kocabas",
        role: "researcher",
        link: "https://github.com/apple/ml-hugs",
      },
    ],
    client: null,
    captureDevice: null,
    captureMethod: null,
    trainingPipeline: null,
    trainingTime: null,
    splatCount: null,
    viewerStack: null,
    splatViewerUrl: null,
    videoUrl: null,
    coverUrl: null,
    tags: [
      "paper",
      "avatar",
      "real_time",
      "optimization",
    ],
    lessons: [
      {
        zh: "显式高斯化身仍需共享的骨架先验，否则单目视频下的姿态与外观会高度欠定。",
        en: "Explicit Gaussian avatars still need a skeletal prior; otherwise pose and appearance remain under-determined from monocular video.",
      },
      {
        zh: "联合优化蒙皮权重是缓解点云式表示在关节处断裂的直接手段。",
        en: "Co-optimizing skinning weights is a direct fix for tearing in point-based avatars near joints.",
      },
    ],
    links: [
      {
        label: "arXiv",
        url: "https://arxiv.org/abs/2311.17910",
      },
      {
        label: "GitHub",
        url: "https://github.com/apple/ml-hugs",
      },
    ],
    publishedAt: "2024-CVPR",
    verified: true,
    sources: [
      "https://arxiv.org/abs/2311.17910",
      "https://github.com/apple/ml-hugs",
    ],
    quote: {
      zh: null,
      en: "Recent advances in neural rendering have improved both training and rendering times by orders of magnitude.",
    },
  },
  {
    slug: "langsplat",
    kind: "milestone",
    title: {
      zh: "LangSplat：三维语言高斯泼溅",
      en: "LangSplat: 3D Language Gaussian Splatting",
    },
    summary: {
      zh: "以高斯为载体存储蒸馏后的语言特征并用泼溅渲染，相较基于 NeRF 的体积积分显著加速开放词汇三维定位。",
      en: "Stores distilled language features on Gaussians and splats them for open-vocabulary 3D grounding, avoiding costly NeRF volume rendering.",
    },
    description: {
      zh: "工作面向三维开放词汇查询：将 CLIP 等模型的语言信号编码到每个三维高斯上，通过类似 RGB 泼溅的瓦片渲染聚合语言特征。为降低显式存储开销，先训练场景级语言自编码再在潜空间学习特征，并借助 SAM 等信号学习层次语义以得到更清晰物体边界。论文报告相对 LERF 等方法在速度与精度上的提升。",
      en: "LangSplat targets open-vocabulary querying in 3D by attaching language features to 3D Gaussians and rendering them with a tile-based splatter analogous to RGB splatting, avoiding ray marching through a NeRF. A scene-wise language autoencoder reduces memory versus storing full CLIP embeddings, and hierarchical semantics derived from segmentation priors sharpen object boundaries. Experiments report large speedups over prior NeRF-grounded language fields at high resolution with improved grounding quality.",
    },
    spaceType: null,
    location: {
      country: null,
      city: null,
      site: null,
    },
    year: 2024,
    creators: [
      {
        name: "Minghan Qin",
        role: "researcher",
        link: "https://langsplat.github.io/",
      },
    ],
    client: null,
    captureDevice: null,
    captureMethod: null,
    trainingPipeline: null,
    trainingTime: null,
    splatCount: null,
    viewerStack: null,
    splatViewerUrl: null,
    videoUrl: null,
    coverUrl: null,
    tags: [
      "paper",
      "semantic",
      "optimization",
      "real_time",
    ],
    lessons: [
      {
        zh: "显式基元上的特征泼溅可把语言场推理成本降到与 RGB 泼溅同量级。",
        en: "Splatting language features on explicit primitives brings inference closer to RGB splatting cost.",
      },
      {
        zh: "场景专用潜空间与分割先验可缓解 CLIP 特征模糊边界问题。",
        en: "Scene-specific latents and segmentation priors mitigate the fuzzy boundaries of CLIP features in 3D.",
      },
    ],
    links: [
      {
        label: "arXiv",
        url: "https://arxiv.org/abs/2312.16084",
      },
      {
        label: "Project Page",
        url: "https://langsplat.github.io/",
      },
      {
        label: "GitHub",
        url: "https://github.com/Minghanqin/LangSplat",
      },
    ],
    publishedAt: "2024-CVPR",
    verified: true,
    sources: [
      "https://arxiv.org/abs/2312.16084",
      "https://langsplat.github.io/",
      "https://github.com/Minghanqin/LangSplat",
    ],
    quote: {
      zh: null,
      en: "Humans live in a 3D world and commonly use natural language to interact with a 3D scene.",
    },
  },
  {
    slug: "scaffold-gs",
    kind: "milestone",
    title: {
      zh: "Scaffold-GS：面向视图自适应的结构化高斯",
      en: "Scaffold-GS: Structured 3D Gaussians for View-Adaptive Rendering",
    },
    summary: {
      zh: "以锚点网格组织局部神经高斯并按视点预测属性，抑制冗余高斯并提升复杂场景泛化。",
      en: "Organizes neural Gaussians on anchors and predicts attributes from the viewpoint to cut redundancy and improve generalization on complex scenes.",
    },
    description: {
      zh: "原始三维高斯泼溅易为拟合训练视图而堆叠大量各向异性高斯。Scaffold-GS 自稀疏锚点生长局部高斯，由网络在给定观察方向与距离下生成不透明度、颜色与几何参数，并配套锚点增删策略。推理时仅在视锥内激活锚点，在相近渲染速度下压缩存储并改善反射、弱纹理等区域。",
      en: "Vanilla 3DGS can sprawl redundant Gaussians to overfit training views. Scaffold-GS places anchors on a sparse scaffold, spawns local neural Gaussians, and predicts their attributes from viewing direction and distance inside the frustum, with growing and pruning on anchors. At inference it activates anchors in view and filters trivial Gaussians, reporting compact storage and better behavior on specular, textureless, or wide-baseline settings at comparable FPS.",
    },
    spaceType: null,
    location: {
      country: null,
      city: null,
      site: null,
    },
    year: 2024,
    creators: [
      {
        name: "Tao Lu",
        role: "researcher",
        link: "https://city-super.github.io/scaffold-gs/",
      },
    ],
    client: null,
    captureDevice: null,
    captureMethod: null,
    trainingPipeline: null,
    trainingTime: null,
    splatCount: null,
    viewerStack: null,
    splatViewerUrl: null,
    videoUrl: null,
    coverUrl: null,
    tags: [
      "paper",
      "optimization",
      "reconstruction",
    ],
    lessons: [
      {
        zh: "显式结构锚点可以把无约束高斯生长重新拉回场景几何先验上。",
        en: "Explicit structural anchors pull unconstrained Gaussian growth back toward geometric priors.",
      },
      {
        zh: "视角条件预测是压缩视角相关外观并减少逐点存储的一条路。",
        en: "View-conditioned prediction helps encode view-dependent effects without storing them per Gaussian.",
      },
    ],
    links: [
      {
        label: "arXiv",
        url: "https://arxiv.org/abs/2312.00109",
      },
      {
        label: "Project Page",
        url: "https://city-super.github.io/scaffold-gs/",
      },
      {
        label: "GitHub",
        url: "https://github.com/city-super/Scaffold-GS",
      },
    ],
    publishedAt: "2024-CVPR",
    verified: true,
    sources: [
      "https://arxiv.org/abs/2312.00109",
      "https://city-super.github.io/scaffold-gs/",
      "https://github.com/city-super/Scaffold-GS",
    ],
    quote: {
      zh: null,
      en: "Neural rendering methods have significantly advanced photo-realistic 3D scene rendering in various academic and industrial applications.",
    },
  },
];

export const casesBySlug: Record<string, CaseEntry> = Object.fromEntries(
  cases.map((c) => [c.slug, c]),
);

export const milestoneCases = cases.filter((c) => c.kind === "milestone");
export const productionCases = cases.filter((c) => c.kind === "production");
