import { InsightsHub } from "@/components/landing/InsightsHub";
import { insights } from "@/lib/data/insights";
import { pageMetadata } from "@/lib/seo-metadata";

export const metadata = pageMetadata(
  "行业洞察",
  "收纳 3DGS 与辐射场行业的技术深读、产品信号、现场报道和中国市场观察，强调来源可核对与中性分析。",
);

export default function InsightsPage() {
  return <InsightsHub insights={insights} />;
}
