import type { Metadata } from "next";

export const SITE = "印刻万物 INKTOYS";
export const SITE_URL = "https://top3dgs.com";
export const SITE_KEYWORDS = [
  "3DGS",
  "3D Gaussian Splatting",
  "Gaussian Splatting",
  "高斯泼溅",
  "三维高斯泼溅",
  "NeRF",
  "Radiance Fields",
  "空间媒体",
  "3D 重建",
  "高斯泼溅工具",
  "高斯泼溅教程",
];
export const DEFAULT_OG_IMAGE = {
  url: "/og-default.png",
  width: 1200,
  height: 630,
  alt: "印刻万物 INKTOYS - 3DGS 内容枢纽",
};

/** 将中文描述截断到约 120 字以内，避免 meta 过长 */
export function clipDescription(zh: string, max = 120): string {
  if (zh.length <= max) return zh;
  return `${zh.slice(0, max - 1)}…`;
}

export function pageMetadata(titleZh: string, descriptionZh: string): Metadata {
  const description = clipDescription(descriptionZh);
  const ogTitle = `${titleZh} - ${SITE}`;
  return {
    title: titleZh,
    description,
    keywords: SITE_KEYWORDS,
    alternates: {
      canonical: "./",
    },
    openGraph: {
      title: ogTitle,
      description,
      url: "./",
      locale: "zh_CN",
      type: "website",
      siteName: SITE,
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [DEFAULT_OG_IMAGE.url],
    },
  };
}

export function dynamicPageMetadata(
  titleZh: string,
  descriptionZh: string,
): Metadata {
  return pageMetadata(titleZh, descriptionZh);
}

export const notFoundMetadata: Metadata = pageMetadata(
  "未找到",
  "请求的页面在站点中不存在或已迁移，请从导航返回首页或学习路径索引。",
);
