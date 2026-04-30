import { PlaceholderPage } from "@/components/landing/PlaceholderPage";
import { pageMetadata } from "@/lib/seo-metadata";

export const metadata = pageMetadata(
  "媒体",
  "规划用于聚合视频教程、访谈、演示与技术讲解等视听内容，当前为占位页面，后续按栏目逐步补全。",
);

export default function MediaPage() {
  return (
    <PlaceholderPage
      eyebrow={{ zh: "媒体", en: "Media" }}
      title={{ zh: "视频、访谈与可视化内容", en: "Videos, Interviews & Visual Stories" }}
      description={{
        zh: "用于组织视频教程、创作者访谈、项目演示、技术讲解和空间媒体影像内容。",
        en: "A hub for video tutorials, creator interviews, project demos, technical talks, and spatial media essays.",
      }}
      sections={[
        { zh: "视频", en: "Videos" },
        { zh: "访谈", en: "Interviews" },
        { zh: "演示", en: "Demos" },
        { zh: "讲座", en: "Talks" },
        { zh: "视觉文章", en: "Visual Essays" },
      ]}
    />
  );
}
