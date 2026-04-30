import { EnginesMatrix } from "@/components/landing/EnginesMatrix";
import { pageMetadata } from "@/lib/seo-metadata";

export const metadata = pageMetadata(
  "软件与高斯泼溅兼容性矩阵",
  "以表格形式汇总常见 DCC、引擎与查看器对高斯泼溅资产的支持情况，依据官方文档或源码片段交叉验证，便于交付前核对。",
);

export default function EnginesPage() {
  return <EnginesMatrix />;
}
