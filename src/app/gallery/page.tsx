import { GalleryIndex } from "@/components/landing/GalleryIndex";
import { pageMetadata } from "@/lib/seo-metadata";

export const metadata = pageMetadata(
  "画廊 · 创作者精选",
  "34 件可在浏览器内直接交互的高斯泼溅作品，覆盖建筑、室内、自然、物件、学术 Demo 与互动查看器六个主题；每件作品都配有原作者与来源链接。",
);

export default function GalleryPage() {
  return <GalleryIndex />;
}
