import { motion } from "framer-motion";
import { FileText, Monitor, BarChart3, Users, ClipboardCheck, Plane } from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { JOURNEY_STEPS } from "@/constants";

const STEP_ICONS = [FileText, Monitor, BarChart3, Users, ClipboardCheck, Plane];

export function JourneyProcess() {
  return (
    <section className="bg-slate-50/60 py-16 sm:py-20 lg:py-24 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Your Journey With CET"
          title="From Assessment to Global Opportunities"
        />
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {JOURNEY_STEPS.map((step, i) => {
            const Icon = STEP_ICONS[i];
            return (
              <motion.div
                key={step.n}
                className="group relative flex flex-col rounded-lg border border-slate-200 bg-white p-5 hover:border-[#F5A623] hover:shadow-md transition-colors"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                data-testid={`journey-step-${step.n}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-[#F5A623] text-sm font-bold group-hover:bg-[#F5A623] group-hover:text-slate-900 transition-colors">
                    {step.n}
                  </span>
                  <Icon className="h-5 w-5 text-slate-400 group-hover:text-[#F5A623] transition-colors" />
                </div>
                <h3 className="font-heading font-bold text-slate-900 text-base">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{step.body}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
