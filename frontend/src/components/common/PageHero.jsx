import { cn } from "@/lib/utils";

/** Shared dark page hero used across inner pages for consistent visual language. */
export function PageHero({ eyebrow, title, subtitle, image, children }) {
  return (
    <section className="relative bg-slate-900 text-white overflow-hidden border-b border-slate-800">
      {image && (
        <>
          <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-900/50" />
        </>
      )}
      <div className={cn("relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20")}>
        {eyebrow && (
          <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#F5A623] mb-4">
            <span className="h-px w-6 bg-[#F5A623]" />
            {eyebrow}
          </div>
        )}
        <h1 className="font-heading text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight max-w-4xl">
          {title}
        </h1>
        {subtitle && <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}
