import { CasesIndex } from "@/components/landing/CasesIndex";
import { pageMetadata } from "@/lib/seo-metadata";

export const metadata = pageMetadata(
  "案例与里程碑",
  "收录论文级里程碑、代表性开源实现与可核验的空间案例，每条提供摘要与外链，便于按主题检索与延伸阅读。",
);

export default function CasesPage() {
  return <CasesIndex />;
}
