import { MediaIndex } from "@/components/landing/MediaIndex";
import { pageMetadata } from "@/lib/seo-metadata";

export const metadata = pageMetadata(
  "媒体",
  "印刻万物自家的媒体库：20 件工作室展览空间的高斯泼溅，以及筹备中的视频、访谈、演示与讲座内容。",
);

export default function MediaPage() {
  return <MediaIndex />;
}
