import { NewsExplorer } from "@/components/landing/NewsExplorer";
import { pageMetadata } from "@/lib/seo-metadata";

export const metadata = pageMetadata(
  "动态",
  "汇总论文预印本、工具更新、行业融资与社区长文等条目，强调双来源与可点击外链，减少二手传言噪声。",
);

export default function NewsPage() {
  return <NewsExplorer />;
}
