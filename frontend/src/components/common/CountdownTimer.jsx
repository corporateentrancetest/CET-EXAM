import { Clock } from "lucide-react";
import { useCountdown } from "@/hooks/useCountdown";
import { cn } from "@/lib/utils";

/** Live countdown to the application-close date. */
export function CountdownTimer({ target, variant = "dark", testId = "countdown-timer" }) {
  const { days, hours, minutes, seconds, expired } = useCountdown(target);

  if (variant === "inline") {
    return (
      <span data-testid={testId} className="inline-flex items-center gap-1.5 font-semibold">
        <Clock className="h-3.5 w-3.5" />
        {expired ? "Applications closed" : `${days} days left to apply`}
      </span>
    );
  }

  const units = [
    { v: days, l: "Days" },
    { v: hours, l: "Hours" },
    { v: minutes, l: "Mins" },
    { v: seconds, l: "Secs" },
  ];

  return (
    <div data-testid={testId} className="flex items-center gap-3">
      {units.map((u) => (
        <div
          key={u.l}
          className={cn(
            "flex flex-col items-center justify-center rounded-lg px-3 py-2 min-w-[62px]",
            variant === "dark" ? "bg-white/10 border border-white/15" : "bg-slate-900 text-white"
          )}
        >
          <span className="font-heading text-2xl font-extrabold tabular-nums text-[#F5A623]">
            {String(u.v).padStart(2, "0")}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-slate-300">{u.l}</span>
        </div>
      ))}
    </div>
  );
}
