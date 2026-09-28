import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Button } from "@/components/common/Button";
import { FOUNDER } from "@/constants";

export function FounderTeaser() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1723990720514-65968a7d517b?crop=entropy&cs=srgb&fm=jpg&q=85&w=900"
                alt={FOUNDER.name}
                className="w-full h-[360px] object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-3">
              {FOUNDER.eyebrow}
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
              {FOUNDER.heading}
            </h2>
            <Quote className="h-8 w-8 text-[#F5A623] mt-6" />
            <p className="mt-3 text-lg text-slate-700 leading-relaxed italic">"{FOUNDER.teaser}"</p>
            <p className="mt-5 font-semibold text-slate-900">
              — {FOUNDER.name}, <span className="text-slate-500 font-normal">{FOUNDER.role}</span>
            </p>
            <div className="mt-6">
              <Button to="/about" variant="outline" data-testid="founder-read-more-btn">
                Read the Full Vision
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
