"use client";

import { useLanguage } from "@/components/shared/LanguageProvider";

type BilingualText = {
  zh: string;
  en: string;
};

type PlaceholderPageProps = {
  eyebrow: BilingualText;
  title: BilingualText;
  description: BilingualText;
  sections: BilingualText[];
};

export function PlaceholderPage({
  eyebrow,
  title,
  description,
  sections,
}: PlaceholderPageProps) {
  const { language } = useLanguage();

  return (
    <main className="min-h-screen bg-[#050505] px-5 pb-20 pt-28 text-[#f7f4ed] sm:px-10 sm:pt-32 lg:px-16 lg:pt-36">
      <section className="mx-auto max-w-6xl pb-20 pt-6">
        <p className="text-xs uppercase tracking-[0.5em] text-white/38">
          {eyebrow[language]}
        </p>
        <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-none tracking-[-0.07em] text-white sm:text-7xl">
          {title[language]}
        </h1>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-white/58">
          {description[language]}
        </p>

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {sections.map((section) => (
            <article
              key={section.en}
              className="min-h-[14rem] rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl"
            >
              <p className="text-xs uppercase tracking-[0.32em] text-white/35">
                {section[language]}
              </p>
              <div className="mt-20 space-y-3">
                <div className="h-3 w-4/5 rounded-full bg-white/10" />
                <div className="h-3 w-2/3 rounded-full bg-white/[0.075]" />
                <div className="h-3 w-1/2 rounded-full bg-white/[0.06]" />
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
