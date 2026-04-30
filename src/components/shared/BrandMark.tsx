import Link from "next/link";
import { BrandLogo } from "@/components/shared/BrandLogo";

type BrandMarkProps = {
  href?: string;
};

export function BrandMark({ href = "/" }: BrandMarkProps) {
  return (
    <Link
      href={href}
      aria-label="印刻万物 TOP3DGS"
      className="group inline-flex min-w-0 items-center gap-2 rounded-full border border-white/10 bg-black/18 px-2.5 py-2 pr-3 text-white/90 shadow-[0_18px_60px_rgba(0,0,0,0.24)] backdrop-blur-2xl transition hover:border-white/20 hover:bg-white/[0.06] sm:gap-3 sm:px-3 sm:pr-4"
    >
      <BrandLogo size={32} className="shrink-0 sm:h-9 sm:w-9" />
      <span className="flex flex-col leading-none">
        <span className="text-base font-semibold tracking-[0.06em] text-white sm:text-lg sm:tracking-[0.08em]">
          印刻万物
        </span>
        <span className="mt-1 text-[0.5rem] font-medium tracking-[0.48em] text-white/60 sm:text-[0.55rem] sm:tracking-[0.62em]">
          TOP3DGS
        </span>
      </span>
    </Link>
  );
}
