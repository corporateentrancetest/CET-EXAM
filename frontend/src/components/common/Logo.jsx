import { GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

/** CET wordmark/logo lockup. */
export function Logo({ dark = true, className }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#F5A623] text-slate-950">
        <GraduationCap className="h-5 w-5" strokeWidth={2.4} />
      </div>
      <div className="leading-none">
        <div className={cn("font-heading font-extrabold tracking-tight text-lg", dark ? "text-white" : "text-slate-900")}>
          CET
        </div>
        <div className={cn("text-[9px] font-semibold uppercase tracking-[0.18em]", dark ? "text-slate-400" : "text-slate-500")}>
          Corporate Entrance Test
        </div>
      </div>
    </div>
  );
}
