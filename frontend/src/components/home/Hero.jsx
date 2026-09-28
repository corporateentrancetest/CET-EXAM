import { motion } from "framer-motion";
import { ArrowRight, Globe, Users, TrendingUp, Sparkles } from "lucide-react";
import { Button } from "@/components/common/Button";
import { HERO } from "@/constants";

const ICONS = [Globe, Users, TrendingUp, Sparkles];

export function Hero() {
  return (
    <section className="relative bg-slate-900 text-white overflow-hidden border-b border-slate-800">
      <img
        src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600"
        alt="Global city skyline"
        className="absolute inset-0 h-full w-full object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-900/40" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <motion.div
            className="lg:col-span-8"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-500/25 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-[#F5A623] mb-6">
              {HERO.eyebrow}
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05]">
              {HERO.headlineTop}
              <br />
              <span className="text-[#F5A623]">{HERO.headlineAccent}</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              {HERO.subhead}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/apply" size="lg" data-testid="hero-apply-btn">
                Apply Now <ArrowRight className="h-4 w-4" />
              </Button>
              <Button to="/how-it-works" variant="ghostLight" size="lg" data-testid="hero-know-more-btn">
                Know More
              </Button>
            </div>

            <p className="mt-6 text-sm text-slate-400 max-w-xl">{HERO.microcopy}</p>
          </motion.div>

          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="font-heading text-[#F5A623] text-lg italic mb-6 text-right hidden lg:block">
              {HERO.tagline}
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
              {HERO.sideIcons.map((label, i) => {
                const Icon = ICONS[i];
                return (
                  <div
                    key={label}
                    className="flex items-center gap-3 rounded-lg bg-white/5 border border-white/10 backdrop-blur px-4 py-3"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[#F5A623]/15 text-[#F5A623]">
                      <Icon className="h-4.5 w-4.5" />
                    </span>
                    <span className="text-sm font-medium text-slate-200">{label}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
