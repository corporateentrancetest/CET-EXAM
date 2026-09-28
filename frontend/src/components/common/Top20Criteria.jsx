import { motion } from "framer-motion";
import { Target } from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { HOW_IT_WORKS } from "@/constants";

/** Criteria for Top 20 Dubai selection. */
export function Top20Criteria() {
  const items = HOW_IT_WORKS.selection.top20Criteria;
  return (
    <section className="bg-slate-950 text-white py-16 sm:py-20" data-testid="top20-criteria-section">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/15 border border-[#F5A623]/50 text-[#F5A623] text-xs font-bold uppercase tracking-widest px-3 py-1 mb-4">
            <Target className="h-3.5 w-3.5" /> CET Global 20
          </div>
          <SectionHeading
            title="How the Top 20 Are Selected for Dubai"
            subtitle="Ranked purely on Corporate Launch Program performance — the exam gets you in, the program earns you Dubai."
            dark
            align="center"
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {items.map((c, i) => (
            <motion.div
              key={c.title}
              className="relative rounded-xl bg-white/5 border border-white/10 p-6 overflow-hidden"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              data-testid={`top20-criterion-${i}`}
            >
              <div className="absolute -right-2 -top-4 font-heading text-7xl font-extrabold text-[#F5A623]/10 select-none">
                {c.weight}
              </div>
              <div className="relative">
                <div className="font-heading text-2xl font-extrabold text-[#F5A623]">{c.weight}</div>
                <h3 className="mt-2 font-heading font-bold text-white text-lg">{c.title}</h3>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">{c.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
