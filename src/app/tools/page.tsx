import { Suspense } from "react";
import { ToolsExplorer } from "@/components/landing/ToolsExplorer";
import { pageMetadata } from "@/lib/seo-metadata";

export const metadata = pageMetadata(
  "工具索引",
  "按采集、训练、编辑、查看与发布维度整理高斯泼溅相关软件与在线服务，每条附公开来源链接以便核对。",
);

export default function ToolsPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#050505] px-5 pb-24 pt-28 text-[#f7f4ed] sm:px-10 sm:pt-32" />
      }
    >
      <ToolsExplorer />
    </Suspense>
  );
}
