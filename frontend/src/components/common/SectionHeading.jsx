import { cn } from "@/lib/utils";

/** Editorial section heading with optional amber eyebrow. */
export function SectionHeading({ eyebrow, title, subtitle, align = "left", dark = false, className }) {
  return (
    <div className={cn(align === "center" ? "text-center mx-auto max-w-3xl" : "max-w-3xl", className)}>
      {eyebrow && (
        <div
          className={cn(
            "inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-3",
            dark ? "text-[#F5A623]" : "text-amber-600"
          )}
        >
          <span className="h-px w-6 bg-[#F5A623]" />
          {eyebrow}
        </div>
      )}
      <h2
        className={cn(
          "font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight",
          dark ? "text-white" : "text-slate-900"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={cn("mt-4 text-base sm:text-lg leading-relaxed", dark ? "text-slate-300" : "text-slate-600")}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
