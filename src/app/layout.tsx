import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { LanguageProvider } from "@/components/shared/LanguageProvider";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { MobileConsole } from "@/components/shared/MobileConsole";
import {
  DEFAULT_OG_IMAGE,
  SITE,
  SITE_KEYWORDS,
  SITE_URL,
} from "@/lib/seo-metadata";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE,
      url: SITE_URL,
      logo: `${SITE_URL}/og-default.png`,
      sameAs: [],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE,
      alternateName: ["TOP3DGS", "Top 3DGS", "Top3DGS", "INKTOYS"],
      url: SITE_URL,
      inLanguage: "zh-CN",
      publisher: {
        "@id": `${SITE_URL}/#organization`,
      },
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE_URL}/tools?category={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "首页",
    template: `%s - ${SITE}`,
  },
  description:
    "印刻万物面向三维高斯泼溅与空间媒体，整理可验证的工具、案例、学习路径与行业动态，客观呈现公开来源与引用。",
  applicationName: SITE,
  keywords: SITE_KEYWORDS,
  authors: [{ name: SITE, url: SITE_URL }],
  creator: SITE,
  publisher: SITE,
  category: "technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `首页 - ${SITE}`,
    description:
      "印刻万物面向三维高斯泼溅与空间媒体，整理可验证的工具、案例、学习路径与行业动态，客观呈现公开来源与引用。",
    url: "/",
    locale: "zh_CN",
    type: "website",
    siteName: SITE,
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: `首页 - ${SITE}`,
    description:
      "印刻万物面向三维高斯泼溅与空间媒体，整理可验证的工具、案例、学习路径与行业动态，客观呈现公开来源与引用。",
    images: [DEFAULT_OG_IMAGE.url],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#050505]">
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(()=>{const clean=()=>document.querySelectorAll('[data-cursor-ref]').forEach((el)=>el.removeAttribute('data-cursor-ref'));clean();new MutationObserver(clean).observe(document.documentElement,{subtree:true,attributes:true,attributeFilter:['data-cursor-ref']});document.addEventListener('readystatechange',clean);})();",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <LanguageProvider>
          <SiteHeader />
          {children}
        </LanguageProvider>
        <MobileConsole />
      </body>
    </html>
  );
}
