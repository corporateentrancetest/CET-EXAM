import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center justify-center gap-2 font-semibold rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40 disabled:opacity-60 disabled:pointer-events-none";

const variants = {
  amber: "bg-[#F5A623] hover:bg-[#E09212] text-slate-950 shadow-sm",
  navy: "bg-slate-900 hover:bg-slate-800 text-white",
  outline: "border border-slate-300 text-slate-800 hover:border-[#F5A623] hover:text-amber-700 bg-white",
  ghostLight: "border border-white/25 text-white hover:bg-white/10",
  link: "text-amber-600 hover:text-amber-700 underline-offset-4 hover:underline px-0",
};

const sizes = {
  sm: "text-sm px-4 py-2",
  md: "text-sm px-5 py-2.5",
  lg: "text-base px-7 py-3.5",
};

export function Button({
  as = "button",
  to,
  href,
  variant = "amber",
  size = "md",
  className,
  children,
  ...props
}) {
  const classes = cn(base, variants[variant], sizes[size], className);
  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }
  const Comp = as;
  return (
    <Comp className={classes} {...props}>
      {children}
    </Comp>
  );
}
