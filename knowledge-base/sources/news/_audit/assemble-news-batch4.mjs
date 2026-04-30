/**
 * 一次性脚本：将 B3 第四批 NewsItem 拼入 src/lib/data/news.ts
 * 用法：node knowledge-base/sources/news/_audit/assemble-news-batch4.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "../../../..");
const newsPath = path.join(root, "src", "lib", "data", "news.ts");

const batch = `
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
  },`;

const splitRe = /\r?\n\];\r?\n\r?\nconst sortedNews/;

let src = fs.readFileSync(newsPath, "utf8");
if (!splitRe.test(src)) {
  console.error("assemble-news-batch4: marker not found, abort");
  process.exit(1);
}
if (src.includes("paper-depth-any-panoramas-insta360")) {
  console.error("assemble-news-batch4: batch already applied, abort");
  process.exit(1);
}
src = src.replace(splitRe, `,${batch}\n];\n\nconst sortedNews`);
fs.writeFileSync(newsPath, src, "utf8");
console.log("assemble-news-batch4: patched", newsPath);
