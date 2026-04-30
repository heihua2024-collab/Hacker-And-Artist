import { LearnHub } from "@/components/landing/LearnHub";
import { learningArticles } from "@/lib/data/learning-articles";
import { pageMetadata } from "@/lib/seo-metadata";

export const metadata = pageMetadata(
  "学习路径",
  "提供从理解高斯泼溅到空间叙事实验的多条结构化路径，并内嵌术语图谱入口，模块按难度与先修关系线性排列。",
);

export default function LearnPage() {
  return <LearnHub articles={learningArticles} />;
}
