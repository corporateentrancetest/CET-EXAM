import { motion } from "framer-motion";
import { Code2, Landmark, Factory, Megaphone, Truck, Rocket } from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { EMPLOYER_SECTION } from "@/constants";

const ICONS = { Code2, Landmark, Factory, Megaphone, Truck, Rocket };

export function EmployerNetwork() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title={EMPLOYER_SECTION.heading} subtitle={EMPLOYER_SECTION.subheading} align="center" />
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {EMPLOYER_SECTION.industries.map((ind, i) => {
            const Icon = ICONS[ind.icon];
            return (
              <motion.div
                key={ind.name}
                className="group flex flex-col items-center text-center gap-3 rounded-xl border border-slate-200 bg-white p-6 hover:border-[#F5A623] hover:shadow-md transition-colors"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                data-testid={`industry-${i}`}
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-[#F5A623] group-hover:bg-[#F5A623] group-hover:text-slate-900 transition-colors">
                  <Icon className="h-6 w-6" />
                </span>
                <span className="text-sm font-semibold text-slate-800 leading-snug">{ind.name}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
