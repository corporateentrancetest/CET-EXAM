import { motion } from "framer-motion";
import { STATS } from "@/constants";

export function StatsBar() {
  return (
    <section className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 divide-y divide-slate-200 md:divide-y-0 md:divide-x">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              className="flex flex-col items-center justify-center text-center px-4 py-7"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              data-testid={`stat-${i}`}
            >
              <span className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                {s.value}
              </span>
              <span className="mt-2 text-[11px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider leading-snug">
                {s.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
