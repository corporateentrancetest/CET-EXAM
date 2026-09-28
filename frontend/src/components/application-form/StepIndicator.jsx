import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const STEP_LABELS = [
  "Account",
  "Personal",
  "Academic",
  "Address",
  "Preferences",
  "Declarations",
  "Payment",
  "Documents",
  "Review",
];

export function StepIndicator({ current }) {
  return (
    <div className="w-full" data-testid="step-indicator">
      {/* Compact label + progress for mobile */}
      <div className="flex items-center justify-between mb-2 sm:hidden">
        <span className="text-sm font-bold text-slate-900">
          Step {current} of {STEP_LABELS.length}
        </span>
        <span className="text-sm font-semibold text-amber-600">{STEP_LABELS[current - 1]}</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-slate-200 sm:hidden overflow-hidden">
        <div
          className="h-full bg-[#F5A623] transition-all"
          style={{ width: `${(current / STEP_LABELS.length) * 100}%` }}
        />
      </div>

      {/* Full stepper for desktop */}
      <div className="hidden sm:flex items-center justify-between">
        {STEP_LABELS.map((label, i) => {
          const step = i + 1;
          const done = step < current;
          const active = step === current;
          return (
            <div key={label} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition-colors",
                    done && "bg-[#F5A623] text-slate-950",
                    active && "bg-slate-900 text-[#F5A623] ring-4 ring-amber-500/20",
                    !done && !active && "bg-slate-200 text-slate-500"
                  )}
                >
                  {done ? <Check className="h-4 w-4" /> : step}
                </div>
                <span
                  className={cn(
                    "mt-1.5 text-[10px] font-semibold uppercase tracking-wide",
                    active ? "text-slate-900" : "text-slate-400"
                  )}
                >
                  {label}
                </span>
              </div>
              {step < STEP_LABELS.length && (
                <div className={cn("h-0.5 flex-1 mx-1 mb-4", done ? "bg-[#F5A623]" : "bg-slate-200")} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
