import { cn } from "@/lib/utils";

/** CET brand wordmark — bold navy/white "CET" with the amber flag accent. */
export function Logo({ dark = true, className }) {
  const textColor = dark ? "text-white" : "text-slate-900";
  const subColor = dark ? "text-slate-300" : "text-slate-500";
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="relative">
        <span className={cn("font-heading text-[26px] font-extrabold tracking-tight leading-none", textColor)}>
          CET
        </span>
        <span className="absolute -top-1.5 -right-2.5 h-0 w-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[12px] border-t-[#F5A623] rotate-[15deg]" />
      </div>
      <span className={cn("hidden sm:block h-8 w-px", dark ? "bg-white/25" : "bg-slate-300")} />
      <span className={cn("hidden sm:block text-[9px] font-extrabold uppercase tracking-[0.15em] leading-[1.3]", subColor)}>
        Corporate
        <br />
        Entrance Test
      </span>
    </div>
  );
}
