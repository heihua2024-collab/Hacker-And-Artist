/**
 * 学习延伸笔记（站内文章，由历史外链 fork 并重写）
 * 中文字段内禁用英文引号与反引号，统一用「...」表强调。
 */

import type { Bilingual } from "@/lib/taxonomy";

export type LearningArticleCategory =
  | "capture"
  | "training"
  | "export"
  | "tooling";

export type LearningArticleSection = {
  heading: Bilingual;
  paragraphs: Bilingual[];
};

export type LearningArticle = {
  slug: string;
  title: Bilingual;
  summary: Bilingual;
  category: LearningArticleCategory;
  sections: LearningArticleSection[];
  relatedPathSlug?: string;
  relatedModuleIndex?: string;
  sources: string[];
  verified: boolean;
  publishedAt: string;
};

const shootingLightAndSharpness: LearningArticle = {
  slug: "shooting-light-and-sharpness",
  title: {
    zh: "面向三维重建的光线一致性与画面清晰度",
    en: "Lighting consistency and image sharpness for 3D reconstruction",
  },
  summary: {
    zh: "说明摄影测量类管线为何依赖稳定光照、清晰成像与足够重叠；给出拍摄前自检要点，并与 COLMAP 等公开文档对齐。",
    en: "Why photogrammetry-style pipelines need stable lighting, sharp frames, and overlap; a pre-shoot checklist aligned with public COLMAP guidance.",
  },
  category: "capture",
  sections: [
    {
      heading: { zh: "光照与反射", en: "Lighting and reflections" },
      paragraphs: [
        {
          zh: "多视角重建依赖像素对应关系。若单趟拍摄中光源位置或强度剧烈变化，同一表面在不同帧上的亮度模型难以一致，会增加特征匹配与深度估计的不稳定。优先选择漫反射占主导、镜面反射可控的环境；若必须面对高光物体，可减少直射硬光并增加环境漫反射。以下操作习惯为工程经验归纳，具体场景需以试拍为准。[unverified]",
          en: "Multi-view reconstruction relies on consistent pixel correspondences. Large lighting swings across a capture session make matching harder. Prefer diffuse-dominant setups; specular subjects benefit from softer fill light. The following habits are heuristics—validate with test shots. [unverified]",
        },
      ],
    },
    {
      heading: { zh: "清晰度与运动模糊", en: "Sharpness and motion blur" },
      paragraphs: [
        {
          zh: "SfM 与稠密重建阶段会惩罚模糊边缘：角点响应变弱、亚像素对齐误差上升。固定快门或使用支撑物，避免手持微抖；对静物可缩小光圈换取景深，但需留意衍射极限与对焦距离。手机若误入微距模式，工作距离与内参会跳变，后续对齐风险上升，应在拍摄前确认镜头模式与对焦距离锁定策略。",
          en: "Blur weakens corner responses and hurts sub-pixel alignment. Stabilize the camera, avoid accidental macro modes on phones, and balance aperture with diffraction and depth of field for static subjects.",
        },
      ],
    },
    {
      heading: { zh: "重叠度与构图", en: "Overlap and framing" },
      paragraphs: [
        {
          zh: "相邻视角需共享足够公共区域，轨迹才易闭合。学习路径中的工程口诀为横向约七成、纵向约六成重叠，便于在小空间走回字形路径时仍保持可追踪纹理；该比例为课程化经验值，并非所有软件文档的硬性阈值。[unverified]",
          en: "Adjacent views need shared texture for loop closure. This path uses a rule of thumb (~70% horizontal / ~60% vertical overlap) for small-room captures; treat it as curriculum guidance, not a universal constant. [unverified]",
        },
      ],
    },
  ],
  relatedPathSlug: "capture-and-training",
  relatedModuleIndex: "01",
  sources: [
    "https://colmap.github.io/tutorial.html",
    "https://en.wikipedia.org/wiki/Structure_from_motion",
  ],
  verified: false,
  publishedAt: "2026-04-30",
};

const firstCaptureEssentials: LearningArticle = {
  slug: "first-capture-essentials",
  title: {
    zh: "小空间首次拍摄：有效画面与回字形路径",
    en: "First small-room capture: valid frames and looped paths",
  },
  summary: {
    zh: "用小空间练手时，先判断画面信息是否足够，再用三层高度与回字形动线覆盖体积，并避开微距与过近工作距离。",
    en: "Judge whether frames carry enough texture, then cover volume with three heights and a looped path; avoid macro modes and too-close distances.",
  },
  category: "capture",
  sections: [
    {
      heading: { zh: "是否适合拍", en: "Is the room trainable?" },
      paragraphs: [
        {
          zh: "算法从图像推断结构，而非从人眼的空间感推断。若画面长期贴墙、空白面积大、缺少连续纹理，SfM 容易失败。应优先让桌面、置物、墙角线等稳定纹理进入画幅，并允许相机后退以增加透视变化。",
          en: "Algorithms infer geometry from pixels, not human spatial intuition. Bare walls and tiny baselines starve matching; include stable texture and allow enough baseline change.",
        },
      ],
    },
    {
      heading: { zh: "三层与回字形", en: "Three heights and a looped route" },
      paragraphs: [
        {
          zh: "将空间视作竖向分层的体积：在高中低三个视线高度各走一圈，减少顶底盲区。平面动线可采用沿墙回环，保证转角处仍有连续观测，利于回环检测与尺度稳定。单条教程视频可作为动线参考，具体设备参数以所用 App 为准。",
          en: "Shoot three vertical bands (high/mid/low) and keep a wall-hugging loop so corners stay observable. Use companion tutorial video as a motion reference; follow your capture app for device-specific settings.",
        },
      ],
    },
    {
      heading: { zh: "微距与距离", en: "Macro mode and working distance" },
      paragraphs: [
        {
          zh: "过近会触发手机微距或透视过激变化，内参与畸变模型在序列中不一致。建议保持约三十至五十厘米以上的工作距离量级，并以试拍抽样检查是否出现对焦呼吸或视角跳变。[unverified]",
          en: "Very close distances can trigger macro modes or aggressive perspective shifts, hurting intrinsics consistency. Keep a comfortable working distance (rough tens of centimeters) and spot-check focus breathing. [unverified]",
        },
      ],
    },
  ],
  relatedPathSlug: "capture-and-training",
  relatedModuleIndex: "01",
  sources: [
    "https://www.bilibili.com/video/BV1oxkJBsEHv/?p=3",
    "https://colmap.github.io/tutorial.html",
  ],
  verified: true,
  publishedAt: "2026-04-30",
};

const objectVideoCapture: LearningArticle = {
  slug: "object-video-capture",
  title: {
    zh: "手机环绕拍摄单体物体的视频采集要点",
    en: "Phone orbit capture for single-object video",
  },
  summary: {
    zh: "用标准广角以稳定速度环绕物体多圈，控制总时长与高度分层；上传前可按平台能力做背景分离与素材整理。",
    en: "Orbit on the main wide camera across multiple heights; control total duration; optional background removal on supported platforms.",
  },
  category: "capture",
  sections: [
    {
      heading: { zh: "机位与节奏", en: "Camera and pacing" },
      paragraphs: [
        {
          zh: "优先一倍广角，避免无意进入微距。围绕物体完成至少一圈建立轮廓，再补侧面与顶底；高大物体可增加圈数。角速度宜平稳，减少高频抖动，便于后期抽帧或直接使用视频轨。公开教程视频见下方来源。",
          en: "Prefer the primary wide camera; orbit smoothly with extra passes for tall objects. Companion tutorial video is linked below.",
        },
      ],
    },
    {
      heading: { zh: "时长与数据量", en: "Duration and data budget" },
      paragraphs: [
        {
          zh: "总录制时间建议达到一分钟以上量级，以便覆盖足够视角采样；具体阈值随物体尺寸与平台解码策略变化，以平台说明为准。[unverified]",
          en: "Aim for enough duration to sample viewpoints; exact thresholds depend on object scale and platform decoders—see vendor docs. [unverified]",
        },
      ],
    },
    {
      heading: { zh: "背景处理", en: "Background handling" },
      paragraphs: [
        {
          zh: "户外或杂乱背景时，可在支持该能力的云端管线中尝试主体分离，减少无效纹理对物体表面的干扰；效果随素材与算法版本波动，需抽样检查。",
          en: "Optional cloud segmentation can suppress clutter; validate outputs per asset and software version.",
        },
      ],
    },
  ],
  relatedPathSlug: "capture-and-training",
  relatedModuleIndex: "03",
  sources: [
    "https://www.bilibili.com/video/BV1oxkJBsEHv/?p=4",
    "https://lumalabs.ai",
  ],
  verified: true,
  publishedAt: "2026-04-30",
};

const objectPhotoCapture: LearningArticle = {
  slug: "object-photo-capture",
  title: {
    zh: "影棚转盘上的物体照片采集流程",
    en: "Turntable object photo capture in a studio",
  },
  summary: {
    zh: "固定机位与焦段，用 RAW 采集并在导出前统一白平衡与曝光；转盘步进拍摄相邻帧保持高重叠，并补拍底面连续性。",
    en: "Lock camera pose and focal length; shoot RAW, normalize WB/exposure; turntable stepping with high overlap plus bottom coverage.",
  },
  category: "capture",
  sections: [
    {
      heading: { zh: "设备与格式", en: "Gear and formats" },
      paragraphs: [
        {
          zh: "单反或微单配合定焦可减少变焦带来的比例漂移；微距镜头适合小型物体。使用 RAW 保留动态范围，在 Lightroom 或 Bridge 等软件中统一色温与曝光后再导出 JPG，可降低跨帧亮度跳变对匹配的影响。",
          en: "ILC with a prime reduces zoom drift; macro lenses help small parts. Normalize RAWs before exporting JPEGs to reduce per-frame exposure jumps.",
        },
      ],
    },
    {
      heading: { zh: "光圈与清晰度", en: "Aperture and focus" },
      paragraphs: [
        {
          zh: "为兼顾景深与锐度，常用 f/8 至 f/11 区间；极小物体若单张景深不足，可采用焦点堆叠并在后期合成，流程复杂度更高。",
          en: "f/8–f/11 is a common sharpness–DoF trade-off band; focus stacking helps tiny subjects when a single plane is insufficient.",
        },
      ],
    },
    {
      heading: { zh: "转盘步进与底面", en: "Turntable stepping and bottom" },
      paragraphs: [
        {
          zh: "自动转盘每旋转十至十五度采集一帧时，相邻帧重叠比例宜保持高位，以便特征跟踪连续。完成侧面与顶面后，将物体姿态调整以补底面，并保证新序列与旧序列在衔接区域仍有纹理重叠。部分平台可自动识别并移除转盘底盘，仍需人工抽查。",
          en: "High overlap between stepped frames keeps tracking continuous; flip the asset to cover the bottom with overlapping transitions. Automated turntable masking still needs QC.",
        },
      ],
    },
  ],
  relatedPathSlug: "capture-and-training",
  relatedModuleIndex: "04",
  sources: [
    "https://helpx.adobe.com/lightroom-classic/help/import-photos-from-a-folder.html",
    "https://www.adobe.com/products/bridge.html",
  ],
  verified: true,
  publishedAt: "2026-04-30",
};

const actionCamLargeSpace: LearningArticle = {
  slug: "action-cam-large-space",
  title: {
    zh: "运动相机在大空间采集中的参数与走位要点",
    en: "Action camera parameters and paths for large scenes",
  },
  summary: {
    zh: "利用广角与较高帧率一次采集冗余视角；统一 SDR 与白平衡，暗光优先静态照片；避免镜头垂直对地/顶，窄门过渡处增加斜向环绕。",
    en: "Use wide FOV and higher frame rates for redundant views; SDR + AWB defaults; prefer stills in dark venues; avoid nadir/zenith-only framing.",
  },
  category: "capture",
  sections: [
    {
      heading: { zh: "广角与帧率", en: "Wide FOV and frame rate" },
      paragraphs: [
        {
          zh: "广角单帧覆盖大，利于在走动中维持重叠。较高帧率可在后期抽帧时仍保留足够基线变化；冗余帧通常可被重建管线筛除，而素材不足时补拍成本高。具体编码与分辨率上限取决于机型与存储。",
          en: "Wide FOV preserves overlap while moving; higher fps gives more decimation headroom in post. Codec and resolution ceilings are device-specific.",
        },
      ],
    },
    {
      heading: { zh: "色彩与暗光", en: "Color and low light" },
      paragraphs: [
        {
          zh: "多机位同步启停可减少重复走位成本；参数上宜统一 SDR 与自动白平衡以降低跨机色彩差。博物馆等弱光场景，长时间快门视频易出现运动模糊，可改用连拍照片配合稳定支撑，以换取单帧清晰度。",
          en: "Sync multiple bodies to cut repeats; SDR + AWB reduce cross-camera color drift. In dark venues, still bursts often beat long-shutter video for per-frame sharpness.",
        },
      ],
    },
    {
      heading: { zh: "构图与纹理", en: "Framing and texture" },
      paragraphs: [
        {
          zh: "避免让画面长期只剩单一平面（例如纯天花板或纯地面），应倾斜构图使墙地顶同时入画。窄门后接大空间时，可在门洞附近增加斜向环绕，帮助算法建立拓扑过渡。对白墙等弱纹理区域，后退取景或引入临时纹理辅助。教程视频见来源。",
          en: "Tilt frames to include floor/wall/ceiling; add oblique orbits at doorways; back off bare walls or add temporary texture. See tutorial link below.",
        },
      ],
    },
  ],
  relatedPathSlug: "capture-and-training",
  relatedModuleIndex: "05",
  sources: [
    "https://www.bilibili.com/video/BV1oxkJBsEHv/?p=6",
    "https://en.wikipedia.org/wiki/Action_camera",
  ],
  verified: true,
  publishedAt: "2026-04-30",
};

const localTrainingValidation: LearningArticle = {
  slug: "local-training-validation",
  title: {
    zh: "上传训练前用 Reality Capture 做快速对位检测",
    en: "Quick alignment checks with Reality Capture before training uploads",
  },
  summary: {
    zh: "先筛图、校正倒置素材并统一白平衡，再导入 RC 做自动注册；对位失败时优先回到拍摄侧补重叠，而非依赖手动打锚点救场。",
    en: "Cull frames, fix upside-down shots, mild color balance, then auto-register in RC; if alignment collapses, reshoot for overlap instead of manual control-point hacks.",
  },
  category: "training",
  sections: [
    {
      heading: { zh: "预处理", en: "Preprocess" },
      paragraphs: [
        {
          zh: "删除明显废片；若曾倒持相机，批量旋转至正确朝向。白平衡以观感一致为目标即可，不必追求影视级调色，但需避免跨帧剧烈跳变。",
          en: "Drop bad frames; fix rotation; keep WB/exposure reasonably consistent across the set.",
        },
      ],
    },
    {
      heading: { zh: "自动注册与样本量", en: "Auto-registration and sample size" },
      paragraphs: [
        {
          zh: "将整理后的序列导入 Reality Capture 并运行自动对齐。公开经验认为在密集环绕与角度覆盖充分时，百张量级以上图片更容易获得稳定注册；具体仍取决于纹理与基线分布。[unverified]",
          en: "Run RC auto-alignment; community practice often cites O(100)+ images for easier convergence when motion and texture are favorable—still scene-dependent. [unverified]",
        },
      ],
    },
    {
      heading: { zh: "失败时策略", en: "When alignment fails" },
      paragraphs: [
        {
          zh: "若注册图整体散乱，手动锚点往往无法弥补底层重叠不足或单一旋转中心问题，应回到现场补拍。后续再进入 Postshot、Brush 等训练器或第三方云端管线。",
          en: "Scattered alignment rarely fixes with manual control points—add overlap and baseline diversity, then proceed to your trainer or cloud pipeline.",
        },
      ],
    },
  ],
  relatedPathSlug: "capture-and-training",
  relatedModuleIndex: "06",
  sources: [
    "https://www.capturingreality.com/realitycapture",
    "https://github.com/ArthurBrussee/brush",
  ],
  verified: true,
  publishedAt: "2026-04-30",
};

const pointcosmCloudPlans: LearningArticle = {
  slug: "pointcosm-cloud-plans",
  title: {
    zh: "点映云端训练的套餐维度与选型注意",
    en: "Pointcosm cloud training tiers and selection notes",
  },
  summary: {
    zh: "按张数或按时长计费、区分普通版与专业版容量；与海外订阅型平台对比时，应核对导出格式、排队规则与单价是否包含降噪等增值项。",
    en: "Per-image/per-minute tiers and pro capacity; compare subscription SaaS on exports, queueing, and whether denoising is bundled.",
  },
  category: "training",
  sections: [
    {
      heading: { zh: "计费维度", en: "Billing dimensions" },
      paragraphs: [
        {
          zh: "公开转述材料中出现按张包（如三百张与九百张档）与按时长包（如三分钟与九分钟档）的组合，并给出单次最低价示例；实际价目、活动与发票规则以点映官网与下单页为准。[unverified]",
          en: "Transcripts cite per-image buckets (e.g., 300/900) and per-minute buckets (e.g., 3/9 minutes) with example floor prices—verify live pricing on Pointcosm. [unverified]",
        },
      ],
    },
    {
      heading: { zh: "版本差异", en: "Tier differences" },
      paragraphs: [
        {
          zh: "普通版覆盖常见物体与中小场景；专业版面向千张以上或全景大空间等更高数据量。选型时应同时评估上传稳定性、失败重试成本与导出容器格式是否匹配下游查看器。",
          en: "Standard tiers target typical objects/small scenes; pro tiers aim at larger image counts or panoramic captures. Also evaluate upload reliability, retry costs, and export formats vs downstream viewers.",
        },
      ],
    },
    {
      heading: { zh: "与本地与其他云对比", en: "Local vs other clouds" },
      paragraphs: [
        {
          zh: "本地工具（如 Postshot）适合反复试验与离线保密项目，但占用时间与显卡；云端把算力与部分后处理外包，适合偶发大单或算力不足场景。跨厂商对比时，避免用单一指标下结论，应建立包含导出、排队、单价的简单矩阵。",
          en: "Local trainers suit iteration and privacy; clouds outsource compute and some denoising. Benchmark vendors with a small matrix: export, queue time, unit economics.",
        },
      ],
    },
  ],
  relatedPathSlug: "capture-and-training",
  relatedModuleIndex: "07",
  sources: [
    "https://www.pointcosm.cn/",
    "https://www.jawset.com",
  ],
  verified: false,
  publishedAt: "2026-04-30",
};

const supersplatCheatSheet: LearningArticle = {
  slug: "supersplat-cheat-sheet",
  title: {
    zh: "SuperSplat 与 superspl.at 编辑链路的公开入口说明",
    en: "Public entry points for SuperSplat and superspl.at editing",
  },
  summary: {
    zh: "区分 PlayCanvas 开源 SuperSplat 编辑器与 superspl.at 在线组合工具的职责边界，并列出官方仓库与编辑器 URL。",
    en: "Separate the open-source SuperSplat editor from superspl.at composition; list official repos and editor URLs.",
  },
  category: "tooling",
  sections: [
    {
      heading: { zh: "SuperSplat 编辑器", en: "SuperSplat editor" },
      paragraphs: [
        {
          zh: "SuperSplat 由 PlayCanvas 维护，用于在浏览器中载入高斯数据、做框选删除、裁剪与导出等常见编辑。功能列表与更新节奏以 GitHub 发布说明与编辑器内 UI 为准。",
          en: "PlayCanvas maintains SuperSplat for in-browser loading, selection/deletion, cropping, and export; follow GitHub releases and in-app UI for truth.",
        },
      ],
    },
    {
      heading: { zh: "superspl.at 站点", en: "superspl.at site" },
      paragraphs: [
        {
          zh: "superspl.at 提供面向分享与二次编排的在线编辑器入口，与本地训练器解耦。若需格式互转，可结合 splat-transform 等命令行工具在 ply、splat、spz 等容器之间搬运。",
          en: "superspl.at hosts a separate online editor focused on sharing and light composition; pair with splat-transform for container moves across ply/splat/spz.",
        },
      ],
    },
    {
      heading: { zh: "使用顺序建议", en: "Suggested order" },
      paragraphs: [
        {
          zh: "典型顺序为：训练得到容器文件 → SuperSplat 做几何清理 → 视需求进入 superspl.at 做版面化分享 → 最终在目标查看器或引擎中验证。每步导出前记录版本号以便回溯。",
          en: "Typical flow: train → clean in SuperSplat → optional superspl.at layout → validate in target viewer/engine; version your exports.",
        },
      ],
    },
  ],
  relatedPathSlug: "capture-and-training",
  relatedModuleIndex: "08",
  sources: [
    "https://superspl.at/editor",
    "https://github.com/playcanvas/supersplat",
  ],
  verified: true,
  publishedAt: "2026-04-30",
};

const sogFormatExplained: LearningArticle = {
  slug: "sog-format-explained",
  title: {
    zh: "sog 轻量化容器与 PLY 的关系及适用边界",
    en: "SOG lightweight containers vs PLY trade-offs",
  },
  summary: {
    zh: "说明 sog 在体积与首包加载上的优势，以及有损压缩带来的细节损失与不可逆性；交付与归档仍建议保留 PLY 或 splat 等可互转主文件。",
    en: "SOG favors small payloads and fast first paint but trades geometric/texture fidelity; keep PLY/splat masters for archival handoff.",
  },
  category: "export",
  sections: [
    {
      heading: { zh: "定位", en: "Role" },
      paragraphs: [
        {
          zh: "sog 面向网页预览等需要快速传输与解析的场景，强调加载体验；不适合作为唯一归档格式，也不适合需要保留全精度几何与纹理的审片环节。",
          en: "SOG targets fast web preview—not a sole archival format or lossless review master.",
        },
      ],
    },
    {
      heading: { zh: "优缺点摘要", en: "Pros and cons" },
      paragraphs: [
        {
          zh: "优点：体积小、网络传输快、在实时渲染链路中解析成本相对较低。缺点：有损压缩导致细节下降，且难以无损还原到原始 PLY 的品质；用途应限定在分发与预览链路。",
          en: "Pros: smaller payloads and faster IO. Cons: lossy detail loss and non-reversible recovery to full PLY quality—keep lossless masters.",
        },
      ],
    },
    {
      heading: { zh: "与工具链衔接", en: "Toolchain hooks" },
      paragraphs: [
        {
          zh: "若平台提供从 PLY 到 sog 的转换入口，应在转换前冻结一版主文件，并在下游查看器实测光照与透明度是否正常。与 spz、splat 等格式的取舍参见 splat-transform 与 Niantic spz 参考实现。",
          en: "Freeze a master before SOG conversion; validate lighting/opacity in target viewers; compare SOG vs SPZ/splat via splat-transform and the SPZ reference impl.",
        },
      ],
    },
  ],
  relatedPathSlug: "web-viewing-interaction",
  relatedModuleIndex: "04",
  sources: [
    "https://superspl.at/convert",
    "https://github.com/playcanvas/splat-transform",
  ],
  verified: true,
  publishedAt: "2026-04-30",
};

const gaussianSplattingToolsGettingStarted: LearningArticle = {
  slug: "gaussian-splatting-tools-getting-started",
  title: {
    zh: "高斯泼溅入门：5 款主流工具横评",
    en: "Getting started with Gaussian Splatting: five mainstream tools",
  },
  summary: {
    zh: "基于 Radiance Fields 教程重写，梳理 Scaniverse、Polycam、Luma AI、KIRI Engine 与 Postshot 的入口门槛、云端依赖、导出能力和本地训练取舍。",
    en: "A rewritten Radiance Fields guide comparing Scaniverse, Polycam, Luma AI, KIRI Engine, and Postshot across onboarding, cloud dependence, export capability, and local training trade-offs.",
  },
  category: "tooling",
  sections: [
    {
      heading: { zh: "先按门槛分层", en: "Start by sorting by barrier to entry" },
      paragraphs: [
        {
          zh: "教程把高斯泼溅入门拆成移动端快速采集、网页云端生成、云端高质量处理、专业网格转换和桌面本地训练几类。Scaniverse 与 Polycam Web 更适合首次实验；Luma AI 和 KIRI Engine 适合愿意等待云端处理、并需要较完整导出链路的用户；Postshot 则偏向拥有 NVIDIA RTX 显卡并希望数据留在本地的人。",
          en: "The guide separates Gaussian Splatting onboarding into mobile capture, web cloud generation, higher-quality cloud processing, professional mesh conversion, and desktop local training. Scaniverse and Polycam Web are good first experiments; Luma AI and KIRI Engine serve users willing to wait for cloud processing and richer export paths; Postshot fits users with NVIDIA RTX hardware who want local control.",
        },
      ],
    },
    {
      heading: { zh: "云端方便但要看导出", en: "Cloud convenience still depends on export" },
      paragraphs: [
        {
          zh: "Polycam、Luma AI 与 KIRI Engine 的共同优势是少配置、少安装，但真正进入生产流程时要核对导出格式、订阅限制和后处理能力。若目标是网页展示或社交分享，云端路径可以更快；若目标是长期归档、引擎交付或二次训练，保留原始影像与 PLY 等主文件更稳妥。",
          en: "Polycam, Luma AI, and KIRI Engine reduce setup and installation work, but production use depends on export formats, subscription limits, and post-processing support. Cloud workflows are faster for web display or sharing; archival, engine delivery, or retraining workflows should keep original imagery and master files such as PLY.",
        },
      ],
    },
    {
      heading: { zh: "本地训练的边界", en: "Where local training fits" },
      paragraphs: [
        {
          zh: "Postshot 的价值在于把训练留在桌面端，便于控制数据、反复调参和观察训练日志。代价是硬件门槛、显存预算和排障时间。对初学者来说，合理路线不是一开始追求完整本地管线，而是先用低门槛工具理解采集质量如何影响结果，再决定是否投入本地 GPU 工作流。",
          en: "Postshot keeps training on the desktop, which helps with data control, parameter iteration, and log inspection. The trade-off is hardware requirement, VRAM budget, and debugging time. Beginners should first learn how capture quality affects results through lower-barrier tools, then decide whether a local GPU workflow is worth the investment.",
        },
      ],
    },
  ],
  relatedPathSlug: "understand-gaussian-splatting",
  relatedModuleIndex: "05",
  sources: [
    "https://radiancefields.com/getting-started-with-gaussian-splatting-tools-for-beginners",
    "https://scaniverse.com/",
    "https://www.jawset.com/postshot/",
  ],
  verified: true,
  publishedAt: "2026-04-30",
};

const nerfVirtualProductionPipeline: LearningArticle = {
  slug: "nerf-virtual-production-pipeline",
  title: {
    zh: "NeRF 在虚拟制片中的工程化路径",
    en: "NeRF in virtual production pipelines",
  },
  summary: {
    zh: "基于 Volinga 团队文章重写，说明 NeRF 如何补足传统虚拟制片环境制作里的时间、预算和镜头自由度问题，以及 Unreal Engine 集成仍需解决的实时渲染边界。",
    en: "A rewritten Volinga article explaining how NeRF can reduce time, budget, and camera-motion limits in virtual production environment creation, while still facing real-time rendering and Unreal Engine integration constraints.",
  },
  category: "training",
  sections: [
    {
      heading: { zh: "虚拟制片的环境瓶颈", en: "The environment bottleneck in virtual production" },
      paragraphs: [
        {
          zh: "ICVFX 依赖能与实体布景、演员和灯光一致的虚拟环境。传统方案包括 360 度图像、投影到简化网格、摄影测量和手工 3D 建模。它们分别在成本、真实感、镜头移动范围和制作周期上有不同短板，尤其当低预算团队需要快速更换地点时压力明显。",
          en: "ICVFX depends on virtual environments that align with physical sets, actors, and lighting. Traditional options include 360-degree images, projection onto simplified meshes, photogrammetry, and handcrafted 3D modeling. Each trades off cost, realism, camera freedom, and production time, with the pressure most visible when lower-budget teams need to swap locations quickly.",
        },
      ],
    },
    {
      heading: { zh: "NeRF 提供了体积场景", en: "NeRF provides volumetric environments" },
      paragraphs: [
        {
          zh: "文章将 NeRF 定位为从 50 至 300 张照片训练真实场景、并生成自由视角画面的路径。它适合用于地点预演、摄影机运动预览和虚拟环境生成，因为导演可以先在体积场景中验证镜头，而不是等到现场再反复试错。",
          en: "The article positions NeRF as a route to train real environments from roughly 50 to 300 photos and synthesize free-view imagery. It can support location scouting, camera-movement preview, and virtual environment generation because directors can test shots inside a volumetric scene before production.",
        },
      ],
    },
    {
      heading: { zh: "工程化仍在集成层", en: "The engineering challenge sits in integration" },
      paragraphs: [
        {
          zh: "NeRF 的两个关键阻塞是实时渲染和游戏引擎集成。Volinga Suite 当时的主张是用 Creator 与 Renderer 把环境捕捉、格式封装和 Unreal Engine 渲染连接起来，并对接 Disguise RenderStream、Pixotope 等虚拟制片流程。对今天的 3DGS 用户来说，这篇文章仍有价值：它展示了神经场资产进入影视管线时必须解决的不是单纯画质，而是文件格式、引擎插件、现场节奏和团队协同。",
          en: "The two critical blockers are real-time rendering and engine integration. Volinga Suite connected capture, file packaging, and Unreal Engine rendering through Creator and Renderer, targeting workflows such as Disguise RenderStream and Pixotope. For today's 3DGS users, the article remains useful because it shows that neural assets entering film pipelines must solve file formats, engine plugins, on-set cadence, and team coordination, not only visual quality.",
        },
      ],
    },
  ],
  relatedPathSlug: "web-viewing-interaction",
  relatedModuleIndex: "03",
  sources: [
    "https://radiancefields.com/revolutionizing-virtual-production-how-neural-radiance-fields-will-supercharge-production-pipelines",
    "https://www.unrealengine.com/en-US/solutions/virtual-production",
    "https://www.volinga.ai/",
  ],
  verified: true,
  publishedAt: "2026-04-30",
};

export const learningArticles: LearningArticle[] = [
  shootingLightAndSharpness,
  firstCaptureEssentials,
  objectVideoCapture,
  objectPhotoCapture,
  actionCamLargeSpace,
  localTrainingValidation,
  pointcosmCloudPlans,
  supersplatCheatSheet,
  sogFormatExplained,
  gaussianSplattingToolsGettingStarted,
  nerfVirtualProductionPipeline,
];

export const learningArticlesBySlug: Record<string, LearningArticle> =
  Object.fromEntries(learningArticles.map((a) => [a.slug, a]));
