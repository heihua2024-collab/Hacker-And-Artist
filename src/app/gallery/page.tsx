import { GalleryIndex } from "@/components/landing/GalleryIndex";
import { pageMetadata } from "@/lib/seo-metadata";

export const metadata = pageMetadata(
  "画廊",
  "展示可在浏览器中直接交互的高斯泼溅空间作品，附创作背景与格式说明，侧重公开可访问的演示链接。",
);

export default function GalleryPage() {
  return <GalleryIndex />;
}
