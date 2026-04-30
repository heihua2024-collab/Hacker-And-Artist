import Link from "next/link";

type BrandMarkProps = {
  href?: string;
};

export function BrandMark({ href = "/" }: BrandMarkProps) {
  return (
    <Link
      href={href}
      aria-label="印刻万物 INKTOYS"
      className="group inline-flex items-center gap-3 rounded-full border border-white/10 bg-black/18 px-3 py-2 pr-4 text-white/90 shadow-[0_18px_60px_rgba(0,0,0,0.24)] backdrop-blur-2xl transition hover:border-white/20 hover:bg-white/[0.06]"
    >
      <span className="relative h-10 w-12 shrink-0">
        <span className="absolute left-0 top-1 h-8 w-7 rounded-full bg-[#1e88e5]/90 blur-[0.2px]" />
        <span className="absolute right-0 top-0 h-8 w-8 rounded-full bg-[#ff4d5a]/92 blur-[0.2px]" />
        <span className="absolute bottom-0 left-3 h-7 w-8 rounded-full bg-[#ffc94a]/88 mix-blend-screen blur-[0.2px]" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-lg font-semibold tracking-[0.08em] text-white">
          印刻万物
        </span>
        <span className="mt-1 text-[0.55rem] font-medium tracking-[0.62em] text-white/54">
          INKTOYS
        </span>
      </span>
    </Link>
  );
}
