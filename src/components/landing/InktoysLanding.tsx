"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { bridgeSteps, capabilities, useCases } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { useLanguage } from "@/components/shared/LanguageProvider";
import { SceneCanvas } from "@/components/webgl/SceneCanvas";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const aboutCopy = {
  zh: {
    home: "返回首页",
    navLabel: "高斯泼溅内容社区",
    eyebrow: "高斯泼溅 / 知识社区",
    title: "为记忆中的空间，建一座回去的桥。",
    description:
      "印刻万物连接着真实存在过的空间、正在理解它的人，以及不断生长的高斯泼溅内容。我们不只是展示技术，而是为知识、案例与创作者建一座桥。",
    primaryCta: "看见这座桥",
    contact: "联系工作室",
    bridgeEyebrow: "桥的概念",
    buildEyebrow: "我们如何建桥",
    useCasesEyebrow: "面向谁",
    capabilitiesEyebrow: "能力结构",
    finalEyebrow: "印刻万物",
    finalCopy:
      "印刻万物为关注高斯泼溅、空间媒体和记忆场所未来的人建立连接。",
    work: "联系 INKTOYS",
    bridgeTitle: "有些空间并没有消失。它们只是暂时无法被抵达。",
    bridgeBody:
      "我们收集、整理并解释高斯泼溅相关的项目、工具、案例与观点。目标不是替代创作，而是让更多人看懂这项技术如何改变空间的记录、传播与再次抵达。",
    buildTitle: "从一次好奇，到一次真正理解。",
    useCasesTitle: "让复杂的技术，被清晰地打开。",
    capabilitiesTitle: "内容是材料，社区是结构。",
    finalTitle: "让每一个空间技术的灵感，都有路可循。",
  },
  en: {
    home: "Home",
    navLabel: "Gaussian Splatting Community",
    eyebrow: "Gaussian Splatting / Knowledge Community",
    title: "Build a bridge back to the spaces in memory.",
    description:
      "INKTOYS connects places that once existed, the people trying to understand them, and the growing body of Gaussian Splatting content.",
    primaryCta: "See the Bridge",
    contact: "Contact Studio",
    bridgeEyebrow: "The Bridge",
    buildEyebrow: "How We Build",
    useCasesEyebrow: "For Whom",
    capabilitiesEyebrow: "Capabilities",
    finalEyebrow: "INKTOYS",
    finalCopy:
      "INKTOYS builds a bridge for people who care about Gaussian Splatting, spatial media, and the future of remembering places.",
    work: "Work with INKTOYS",
    bridgeTitle:
      "Some places haven't disappeared. They just can't be reached for now.",
    bridgeBody:
      "We collect, organize, and explain Gaussian Splatting projects, tools, cases, and perspectives. The goal isn't to replace creation, but to help more people see how this technology changes the way places are recorded, shared, and revisited.",
    buildTitle: "From a single curiosity to genuine understanding.",
    useCasesTitle: "Make complex technology clearly approachable.",
    capabilitiesTitle: "Content is the material. Community is the structure.",
    finalTitle: "Give every spatial inspiration a path to follow.",
  },
} as const;

export function InktoysLanding() {
  const rootRef = useRef<HTMLElement>(null);
  const { language } = useLanguage();
  const t = aboutCopy[language];
  const isZh = language === "zh";

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) return;

      gsap.fromTo(
        ".hero-copy > *",
        { autoAlpha: 0, y: 28, filter: "blur(16px)" },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.25,
          ease: "power3.out",
          stagger: 0.12,
        },
      );

      gsap.to(".scene-layer", {
        yPercent: 18,
        scale: 0.92,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.utils.toArray<HTMLElement>(".bridge-step").forEach((step) => {
        gsap.fromTo(
          step,
          { autoAlpha: 0.35 },
          {
            autoAlpha: 1,
            ease: "none",
            scrollTrigger: {
              trigger: step,
              start: "top 70%",
              end: "bottom 45%",
              scrub: true,
            },
          },
        );
      });
    },
    { scope: rootRef },
  );

  return (
    <main ref={rootRef} id="top" className="overflow-hidden bg-[#050505] text-[#f7f4ed]">
      <section className="hero-section relative flex min-h-screen items-center px-6 pb-10 pt-28 sm:px-10 sm:pt-32 lg:px-16 lg:pt-36">
        <div className="scene-layer pointer-events-none absolute -inset-x-20 -inset-y-10 opacity-100 sm:-inset-x-24 sm:-inset-y-16 sm:opacity-95">
          <SceneCanvas />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_54%_36%,rgba(255,255,255,0.12),transparent_42%),linear-gradient(180deg,rgba(5,5,5,0)_0%,rgba(5,5,5,0.74)_64%,#050505_94%)] sm:bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.1),transparent_38%),linear-gradient(180deg,rgba(5,5,5,0)_0%,rgba(5,5,5,0.58)_68%,#050505_94%)]" />
        <div className="hero-copy relative z-10 max-w-6xl pt-10 sm:pt-16">
          <p className="mb-8 text-xs uppercase tracking-[0.5em] text-white/50">
            {t.eyebrow}
          </p>
          <h1 className="max-w-5xl text-6xl font-semibold leading-[0.96] tracking-[-0.08em] text-balance sm:text-7xl lg:text-[9.5rem]">
            {t.title}
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/72 sm:text-xl">
            {t.description}
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a className="rounded-full bg-[#f7f4ed] px-7 py-4 text-sm font-medium text-[#080808] transition hover:bg-white" href="#bridge">
              {t.primaryCta}
            </a>
            <a className="rounded-full border border-white/20 bg-white/[0.08] px-7 py-4 text-sm font-medium text-white backdrop-blur-xl transition hover:border-white/40 hover:bg-white/[0.14]" href="mailto:hello@inktoys.cn">
              {t.contact}
            </a>
          </div>
        </div>
      </section>

      <section className="relative bg-[#f5f3ee] px-6 py-28 text-[#111] sm:px-10 lg:px-16 lg:py-36">
        <Reveal className="mx-auto max-w-6xl">
          <p className="text-sm uppercase tracking-[0.42em] text-black/42">
            {t.bridgeEyebrow}
          </p>
          <h2 className="mt-8 max-w-5xl text-4xl font-semibold leading-tight tracking-[-0.05em] sm:text-6xl lg:text-7xl">
            {t.bridgeTitle}
          </h2>
          <p className="mt-8 max-w-3xl text-xl leading-9 text-black/60">
            {t.bridgeBody}
          </p>
        </Reveal>
      </section>

      <section id="bridge" className="relative px-6 py-28 sm:px-10 lg:px-16 lg:py-40">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <p className="text-sm uppercase tracking-[0.42em] text-white/42">
              {t.buildEyebrow}
            </p>
            <h2 className="mt-6 text-4xl font-semibold leading-tight tracking-[-0.05em] sm:text-6xl">
              {t.buildTitle}
            </h2>
          </Reveal>
          <div className="space-y-5">
            {bridgeSteps.map((item) => (
              <article
                key={item.step}
                className="bridge-step rounded-[2rem] border border-white/12 bg-white/[0.06] p-6 backdrop-blur-2xl sm:p-8"
              >
                <div className="flex items-start justify-between gap-8">
                  <span className="text-sm text-white/42">{item.step}</span>
                  <span className="text-xs uppercase tracking-[0.34em] text-white/36">
                    {isZh ? item.title : item.titleEn}
                  </span>
                </div>
                <p className="mt-10 max-w-2xl text-2xl leading-snug tracking-[-0.03em] text-white/82 sm:text-3xl">
                  {isZh ? item.copy : item.copyEn}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-[#f5f3ee] px-6 py-28 text-[#111] sm:px-10 lg:px-16 lg:py-36">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-sm uppercase tracking-[0.42em] text-black/42">
              {t.useCasesEyebrow}
            </p>
            <h2 className="mt-6 max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.05em] sm:text-6xl">
              {t.useCasesTitle}
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-4 md:grid-cols-2">
            {useCases.map((item, index) => (
              <Reveal
                key={item.label}
                delay={index * 0.08}
                className="rounded-[2rem] border border-black/8 bg-white/60 p-7 shadow-[0_24px_80px_rgba(17,17,17,0.07)] backdrop-blur-2xl"
              >
                <h3 className="text-2xl font-medium tracking-[-0.04em]">
                  {isZh ? item.label : item.labelEn}
                </h3>
                <p className="mt-5 text-lg leading-8 text-black/58">
                  {isZh ? item.copy : item.copyEn}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-6 py-28 sm:px-10 lg:px-16 lg:py-40">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <p className="text-sm uppercase tracking-[0.42em] text-white/42">
              {t.capabilitiesEyebrow}
            </p>
            <h2 className="mt-6 text-4xl font-semibold leading-tight tracking-[-0.05em] sm:text-6xl">
              {t.capabilitiesTitle}
            </h2>
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-2">
            {capabilities.map((item, index) => (
              <Reveal
                key={item.en}
                delay={index * 0.05}
                className="rounded-3xl border border-white/12 bg-white/[0.055] p-6 text-lg text-white/78 backdrop-blur-xl transition hover:border-white/30 hover:bg-white/[0.09]"
              >
                {isZh ? item.zh : item.en}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative flex min-h-[78vh] items-center px-6 py-28 sm:px-10 lg:px-16">
        <div className="absolute inset-x-10 top-10 h-64 rounded-full bg-[#1e88e5]/18 blur-[120px]" />
        <Reveal className="relative mx-auto max-w-6xl text-center">
          <p className="text-sm uppercase tracking-[0.46em] text-white/42">
            {t.finalEyebrow}
          </p>
          <h2 className="mt-8 text-5xl font-semibold leading-none tracking-[-0.07em] sm:text-7xl lg:text-8xl">
            {t.finalTitle}
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-white/62">
            {t.finalCopy}
          </p>
          <a
            className="mt-10 inline-flex rounded-full bg-white px-8 py-4 text-sm font-medium text-black transition hover:scale-[1.02]"
            href="mailto:hello@inktoys.cn"
          >
            {t.work}
          </a>
        </Reveal>
      </section>
    </main>
  );
}
