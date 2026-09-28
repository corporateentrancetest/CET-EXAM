import { motion } from "framer-motion";
import { SectionHeading } from "@/components/common/SectionHeading";
import { CheckCircle2 } from "lucide-react";

/** Modern image + text split section used across pages. */
export function ImageSplit({ eyebrow, title, body, image, imageAlt = "", points = [], dark = false, reverse = false, testId }) {
  return (
    <section className={`overflow-hidden ${dark ? "bg-slate-950 text-white py-16 sm:py-20" : "bg-white py-16 sm:py-20"}`} data-testid={testId}>
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
        <motion.div
          initial={{ opacity: 0, x: reverse ? 24 : -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading eyebrow={eyebrow} title={title} subtitle={body} dark={dark} />
          {points.length > 0 && (
            <ul className="mt-6 space-y-3">
              {points.map((p) => (
                <li key={p} className={`flex items-start gap-3 ${dark ? "text-slate-300" : "text-slate-700"}`}>
                  <CheckCircle2 className="h-5 w-5 text-[#F5A623] mt-0.5 shrink-0" />
                  <span className="text-sm sm:text-base leading-relaxed">{p}</span>
                </li>
              ))}
            </ul>
          )}
        </motion.div>
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: reverse ? -24 : 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xl">
            <img src={image} alt={imageAlt} className="w-full h-[320px] sm:h-[400px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
          </div>
          <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-2xl bg-[#F5A623] opacity-90 -z-10" />
        </motion.div>
      </div>
    </section>
  );
}
