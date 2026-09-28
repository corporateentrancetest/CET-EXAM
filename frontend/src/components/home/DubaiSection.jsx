import { motion } from "framer-motion";
import { Building2, MapPin, Users2, Globe2, Briefcase } from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Button } from "@/components/common/Button";
import { DUBAI } from "@/constants";

const INCLUSION_ICONS = [Building2, Users2, Briefcase, MapPin, Globe2];

export function DubaiSection() {
  return (
    <section className="relative bg-slate-950 text-white overflow-hidden border-y border-slate-800">
      <img
        src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400"
        alt="Dubai skyline"
        className="absolute inset-0 h-full w-full object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/85 to-slate-950/60" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block rounded-full bg-amber-500/15 border border-[#F5A623]/50 text-[#F5A623] text-xs font-bold uppercase tracking-widest px-3 py-1 mb-4">
              {DUBAI.eyebrow}
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
              {DUBAI.heading}
            </h2>
            <p className="mt-5 text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl">
              {DUBAI.body}
            </p>
            <div className="mt-8">
              <Button to="/dubai-experience" size="lg" data-testid="dubai-explore-btn">
                Explore the Dubai Experience
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md p-6 sm:p-8"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="font-heading text-xl font-bold text-[#F5A623]">{DUBAI.subheading}</h3>
            <p className="mt-2 text-sm text-slate-300">{DUBAI.subbody}</p>
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {DUBAI.inclusions.map((inc, i) => {
                const Icon = INCLUSION_ICONS[i];
                return (
                  <div key={inc.title} className="flex flex-col items-center text-center gap-2">
                    <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#F5A623]/15 text-[#F5A623]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-xs font-semibold text-slate-200">{inc.title}</span>
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
