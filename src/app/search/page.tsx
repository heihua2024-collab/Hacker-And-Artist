import { Suspense } from "react";
import { SearchExplorer } from "@/components/landing/SearchExplorer";
import { pageMetadata } from "@/lib/seo-metadata";

export const dynamic = "force-static";

export const metadata = pageMetadata(
  "全站搜索",
  "在印刻万物 TOP3DGS 站内搜索工具、术语、动态、行业洞察、学习路径、案例与画廊；客户端实时匹配，支持中英文混搜。",
);

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#050505] px-5 pt-32 text-white/60">
          Loading…
        </main>
      }
    >
      <SearchExplorer />
    </Suspense>
  );
}
