import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Button } from "@/components/common/Button";
import { FOUNDER, ASSETS } from "@/constants";

export function FounderTeaser() {
  return (
    <section className="relative bg-slate-950 text-white overflow-hidden py-16 sm:py-20">
      <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_75%_30%,#F5A623_0,transparent_45%)]" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="text-xs font-bold uppercase tracking-widest text-[#F5A623] mb-4">
          {FOUNDER.eyebrow}
        </div>
        <Quote className="h-9 w-9 text-[#F5A623] mx-auto" />
        <blockquote className="mt-5 font-heading text-xl sm:text-2xl lg:text-[28px] font-semibold leading-snug text-white">
          "{FOUNDER.teaser}"
        </blockquote>
        <div className="mt-6 flex flex-col items-center gap-2">
          <img src={ASSETS.startupTimesLogo} alt="Startup Times" className="h-6 w-auto" />
          <p className="font-semibold text-white">{FOUNDER.name}</p>
          <p className="text-sm text-[#F5A623]">{FOUNDER.role}</p>
        </div>
        <div className="mt-8">
          <Button to="/about" variant="ghostLight" data-testid="founder-read-more-btn">
            Read the Full Message
          </Button>
        </div>
      </div>
    </section>
  );
}
