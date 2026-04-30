/**
 * 印刻万物全站分类枚举（地基数据）
 * 后续 tools / cases / news / learn 等内容都会引用本文件的 ID。
 * 来源：Gemini 调研 + 编辑校订（2026-04-28）
 */

export type Bilingual = { zh: string; en: string };

export type TagScope = "tool" | "tutorial" | "content" | "case" | "paper";

export type Tag = {
  id: string;
  label: Bilingual;
  scope: readonly TagScope[];
  description: Bilingual;
};

export type Level = {
  id: string;
  label: Bilingual;
  description: Bilingual;
};

export type SimpleEntry = {
  id: string;
  label: Bilingual;
};

export const tags = [
  {
    id: "capture",
    label: { zh: "采集", en: "Capture" },
    scope: ["tool", "tutorial", "content"],
    description: {
      zh: "涉及影像捕捉、摄影测量与设备工作流的相关内容。",
      en: "Content related to image capture, photogrammetry, and equipment workflows.",
    },
  },
  {
    id: "training",
    label: { zh: "训练", en: "Training" },
    scope: ["tool", "paper", "tutorial"],
    description: {
      zh: "关于 3DGS 模型训练过程、算法实现及云端/本地环境配置。",
      en: "Regarding 3DGS model training processes, algorithm implementation, and environment setup.",
    },
  },
  {
    id: "editing",
    label: { zh: "编辑", en: "Editing" },
    scope: ["tool", "tutorial"],
    description: {
      zh: "点云清理、裁剪、颜色调整及模型拼接等后处理操作。",
      en: "Post-processing operations like point cloud cleanup, cropping, color grading, and merging.",
    },
  },
  {
    id: "viewing",
    label: { zh: "查看", en: "Viewing" },
    scope: ["tool", "content"],
    description: {
      zh: "跨平台查看器、独立播放器及空间计算设备上的渲染体验。",
      en: "Cross-platform viewers, standalone players, and rendering experiences on spatial devices.",
    },
  },
  {
    id: "publishing",
    label: { zh: "发布", en: "Publishing" },
    scope: ["tool", "content"],
    description: {
      zh: "模型封装、云端托管、数字出版与跨平台分发工作流。",
      en: "Model packaging, cloud hosting, digital publishing, and cross-platform distribution.",
    },
  },
  {
    id: "web_rendering",
    label: { zh: "Web 渲染", en: "Web Rendering" },
    scope: ["tool", "paper"],
    description: {
      zh: "基于 WebGL/WebGPU 的前端高斯渲染与交互优化。",
      en: "Frontend Gaussian rendering and interaction optimization based on WebGL/WebGPU.",
    },
  },
  {
    id: "slam",
    label: { zh: "SLAM", en: "SLAM" },
    scope: ["paper", "tool"],
    description: {
      zh: "结合高斯泼溅的同步定位与建图技术及实时跟踪。",
      en: "Simultaneous Localization and Mapping integrated with Gaussian Splatting.",
    },
  },
  {
    id: "spatial_media",
    label: { zh: "空间媒体", en: "Spatial Media" },
    scope: ["content", "case"],
    description: {
      zh: "超越传统屏幕的 3D/VR/AR 媒介内容叙事与表现。",
      en: "3D/VR/AR media narratives and expressions beyond traditional screens.",
    },
  },
  {
    id: "paper",
    label: { zh: "论文", en: "Paper" },
    scope: ["content"],
    description: {
      zh: "学术界与工业界的前沿算法、架构与研究成果。",
      en: "Cutting-edge algorithms, architectures, and research from academia and industry.",
    },
  },
  {
    id: "case_study",
    label: { zh: "案例", en: "Case Study" },
    scope: ["case", "content"],
    description: {
      zh: "商业落地、艺术展览及行业应用的具体实践分析。",
      en: "Concrete analysis of commercial deployments, art exhibitions, and industry applications.",
    },
  },
  {
    id: "interview",
    label: { zh: "访谈", en: "Interview" },
    scope: ["content"],
    description: {
      zh: "研究员、艺术家、开发者等行业先锋的深度对话。",
      en: "In-depth conversations with industry pioneers like researchers, artists, and developers.",
    },
  },
  {
    id: "tutorial",
    label: { zh: "教程", en: "Tutorial" },
    scope: ["content", "tool"],
    description: {
      zh: "从入门到进阶的技术指导、操作说明与最佳实践。",
      en: "Technical guides, operational instructions, and best practices from beginner to advanced.",
    },
  },
  {
    id: "real_time",
    label: { zh: "实时", en: "Real-time" },
    scope: ["tool", "paper"],
    description: {
      zh: "强调实时渲染帧率、动态场景捕获与即时互动的技术。",
      en: "Technologies emphasizing real-time FPS, dynamic scene capture, and instant interaction.",
    },
  },
  {
    id: "optimization",
    label: { zh: "优化", en: "Optimization" },
    scope: ["tool", "paper"],
    description: {
      zh: "降低显存占用、提升渲染速度、模型压缩及球谐函数优化。",
      en: "Reducing VRAM usage, improving render speed, model compression, and SH optimization.",
    },
  },
  {
    id: "generation",
    label: { zh: "生成", en: "Generation" },
    scope: ["paper"],
    description: {
      zh: "文本或图像驱动的三维内容生成与蒸馏式三维建模。",
      en: "Text- or image-driven 3D content generation and distillation-based 3D modeling.",
    },
  },
  {
    id: "dynamic",
    label: { zh: "动态场景", en: "Dynamic" },
    scope: ["paper"],
    description: {
      zh: "随时间变化的场景、可变形场与四维高斯表示。",
      en: "Time-varying scenes, deformation fields, and 4D Gaussian representations.",
    },
  },
  {
    id: "avatar",
    label: { zh: "数字人", en: "Avatar" },
    scope: ["paper", "case"],
    description: {
      zh: "人体、头像或可驱动角色的显式高斯化身建模。",
      en: "Explicit Gaussian avatars for humans, heads, or drivable characters.",
    },
  },
  {
    id: "semantic",
    label: { zh: "语义", en: "Semantic" },
    scope: ["paper"],
    description: {
      zh: "语言查询、开放词汇与三维语义场相关研究。",
      en: "Language queries, open-vocabulary grounding, and 3D semantic fields.",
    },
  },
  {
    id: "surface",
    label: { zh: "表面与几何", en: "Surface" },
    scope: ["paper"],
    description: {
      zh: "表面对齐、网格提取与几何精确辐射场。",
      en: "Surface alignment, mesh extraction, and geometrically accurate radiance fields.",
    },
  },
  {
    id: "compression",
    label: { zh: "压缩", en: "Compression" },
    scope: ["paper", "tool"],
    description: {
      zh: "高斯属性压缩、码本量化与存储缩减。",
      en: "Gaussian attribute compression, codebook quantization, and storage reduction.",
    },
  },
  {
    id: "reconstruction",
    label: { zh: "重建", en: "Reconstruction" },
    scope: ["paper", "case"],
    description: {
      zh: "多视图三维重建与辐射场拟合的通用主题。",
      en: "Multi-view 3D reconstruction and radiance field fitting in general.",
    },
  },
  {
    id: "dataset",
    label: { zh: "数据集", en: "Dataset" },
    scope: ["content", "paper"],
    description: {
      zh: "用于训练与基准测试的开源图像集、视频流及合成数据。",
      en: "Open-source image sets, video streams, and synthetic data for training and benchmarking.",
    },
  },
  {
    id: "cultural_heritage",
    label: { zh: "文化遗产", en: "Cultural Heritage" },
    scope: ["case", "content"],
    description: {
      zh: "古迹数字化、文物存档与高精度数字博物馆重建。",
      en: "Digitization of monuments, artifact archiving, and high-precision digital museum reconstruction.",
    },
  },
  {
    id: "indoor",
    label: { zh: "室内", en: "Indoor" },
    scope: ["case", "content"],
    description: {
      zh: "画廊、零售空间及室内居住环境的高斯泼溅扫描与重建。",
      en: "3DGS scanning and reconstruction of galleries, retail spaces, and indoor living environments.",
    },
  },
  {
    id: "outdoor",
    label: { zh: "室外", en: "Outdoor" },
    scope: ["case", "content"],
    description: {
      zh: "城市景观、自然风光及大规模宏观场景的空间采集。",
      en: "Spatial capture of urban landscapes, natural sceneries, and large-scale macro scenes.",
    },
  },
] as const satisfies readonly Tag[];

export const levels = [
  {
    id: "beginner",
    label: { zh: "入门", en: "Beginner" },
    description: {
      zh: "适合零基础学习者，侧重基础概念与自动化工具使用。",
      en: "Suitable for absolute beginners, focusing on core concepts and automated tools.",
    },
  },
  {
    id: "intermediate",
    label: { zh: "进阶", en: "Intermediate" },
    description: {
      zh: "需要基础 3D 知识或代码能力，侧重工作流定制与特定场景优化。",
      en: "Requires basic 3D/coding skills, focusing on workflow customization and scene optimization.",
    },
  },
  {
    id: "expert",
    label: { zh: "专家", en: "Expert" },
    description: {
      zh: "针对研究员或高级开发者，涉及底层算法构建与系统级开发。",
      en: "Targeted at researchers/advanced devs, involving low-level algorithm design and system dev.",
    },
  },
] as const satisfies readonly Level[];

export const formats = [
  { id: "article", label: { zh: "文章", en: "Article" } },
  { id: "video", label: { zh: "视频", en: "Video" } },
  { id: "tutorial", label: { zh: "教程", en: "Tutorial" } },
  { id: "tool", label: { zh: "工具", en: "Tool" } },
  { id: "paper", label: { zh: "论文", en: "Paper" } },
  { id: "dataset", label: { zh: "数据集", en: "Dataset" } },
  { id: "live", label: { zh: "直播", en: "Live" } },
  { id: "publication", label: { zh: "出版物", en: "Publication" } },
  { id: "installation", label: { zh: "装置", en: "Installation" } },
  { id: "podcast", label: { zh: "播客", en: "Podcast" } },
] as const satisfies readonly SimpleEntry[];

export const spaceTypes = [
  { id: "heritage", label: { zh: "文化遗产", en: "Cultural Heritage" } },
  { id: "art_gallery", label: { zh: "艺术画廊", en: "Art Gallery" } },
  { id: "medical_aesthetics", label: { zh: "医疗美容", en: "Medical Aesthetics" } },
  { id: "retail", label: { zh: "零售空间", en: "Retail" } },
  { id: "indoor_living", label: { zh: "室内居住", en: "Indoor Living" } },
  { id: "urban_outdoor", label: { zh: "城市外景", en: "Urban Outdoor" } },
  { id: "natural_landscape", label: { zh: "自然景观", en: "Natural Landscape" } },
  { id: "education", label: { zh: "教育与教学", en: "Education" } },
  { id: "event", label: { zh: "活动与会展", en: "Events" } },
  { id: "performance", label: { zh: "演出与剧场", en: "Performance" } },
  { id: "real_estate", label: { zh: "房产与样板", en: "Real Estate" } },
  { id: "park", label: { zh: "公园与园区", en: "Parks" } },
] as const satisfies readonly SimpleEntry[];

export const creatorRoles = [
  { id: "developer", label: { zh: "开发者", en: "Developer" } },
  { id: "researcher", label: { zh: "研究员", en: "Researcher" } },
  { id: "3d_artist", label: { zh: "3D 艺术家", en: "3D Artist" } },
  { id: "curator", label: { zh: "策展人", en: "Curator" } },
  { id: "spatial_designer", label: { zh: "空间设计师", en: "Spatial Designer" } },
  { id: "videographer", label: { zh: "影像创作者", en: "Videographer" } },
  { id: "technical_writer", label: { zh: "技术作者", en: "Technical Writer" } },
] as const satisfies readonly SimpleEntry[];

export const sourceTypes = [
  { id: "arxiv", label: { zh: "arXiv", en: "arXiv" } },
  { id: "github", label: { zh: "GitHub", en: "GitHub" } },
  { id: "x", label: { zh: "X", en: "X" } },
  { id: "zhihu", label: { zh: "知乎", en: "Zhihu" } },
  { id: "bilibili", label: { zh: "b 站", en: "Bilibili" } },
  { id: "youtube", label: { zh: "YouTube", en: "YouTube" } },
  { id: "official_website", label: { zh: "官网", en: "Official Website" } },
  { id: "media", label: { zh: "媒体", en: "Media" } },
] as const satisfies readonly SimpleEntry[];

export type TagId = (typeof tags)[number]["id"];
export type LevelId = (typeof levels)[number]["id"];
export type FormatId = (typeof formats)[number]["id"];
export type SpaceTypeId = (typeof spaceTypes)[number]["id"];
export type CreatorRoleId = (typeof creatorRoles)[number]["id"];
export type SourceTypeId = (typeof sourceTypes)[number]["id"];

const buildIndex = <T extends { id: string }>(items: readonly T[]) =>
  Object.fromEntries(items.map((item) => [item.id, item])) as Record<string, T>;

export const tagsById = buildIndex(tags);
export const levelsById = buildIndex(levels);
export const formatsById = buildIndex(formats);
export const spaceTypesById = buildIndex(spaceTypes);
export const creatorRolesById = buildIndex(creatorRoles);
export const sourceTypesById = buildIndex(sourceTypes);

export function getLabel(item: { label: Bilingual }, lang: "zh" | "en") {
  return item.label[lang];
}
