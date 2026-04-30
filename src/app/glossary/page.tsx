import { GlossaryExplorer } from "@/components/landing/GlossaryExplorer";
import { pageMetadata } from "@/lib/seo-metadata";

export const metadata = pageMetadata(
  "术语库",
  "独立索引三维高斯泼溅、NeRF、空间媒体、格式、训练和渲染相关术语，支持搜索、分层阅读和站内关联跳转。",
);

export default function GlossaryPage() {
  return (
    <main className="min-h-screen bg-[#050505] px-5 pb-24 pt-28 text-[#f7f4ed] sm:px-10 sm:pt-32 lg:px-16 lg:pt-36">
      <GlossaryExplorer />
    </main>
  );
}
