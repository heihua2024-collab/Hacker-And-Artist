import { PlaceholderPage } from "@/components/landing/PlaceholderPage";
import { pageMetadata } from "@/lib/seo-metadata";

export const metadata = pageMetadata(
  "社区",
  "规划用于连接高斯泼溅创作者、开发者、空间设计从业者与内容贡献者的讨论与活动入口，当前为占位页面。",
);

export default function CommunityPage() {
  return (
    <PlaceholderPage
      eyebrow={{ zh: "社区", en: "Community" }}
      title={{ zh: "创作者与讨论社区", en: "Creators & Community Discussions" }}
      description={{
        zh: "用于连接高斯泼溅创作者、开发者、空间设计从业者和内容贡献者。",
        en: "A place to connect Gaussian Splatting creators, developers, spatial designers, and contributors.",
      }}
      sections={[
        { zh: "创作者", en: "Creators" },
        { zh: "讨论", en: "Discussions" },
        { zh: "投稿", en: "Submissions" },
        { zh: "活动", en: "Events" },
        { zh: "Newsletter", en: "Newsletter" },
      ]}
    />
  );
}
