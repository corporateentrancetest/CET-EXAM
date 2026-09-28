import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/common/Button";
import { CLOSING_CTA } from "@/constants";

/** Reusable dark closing CTA used across pages. */
export function ClosingCTA({ heading = CLOSING_CTA.heading, body = CLOSING_CTA.body }) {
  return (
    <section className="relative bg-slate-950 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_20%_20%,#F5A623_0,transparent_40%)]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 grid lg:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-xs font-bold uppercase tracking-widest text-[#F5A623] mb-3">
            Your Next Chapter Starts Here
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
            {heading}
          </h2>
          <p className="mt-5 text-slate-300 text-lg max-w-xl">{body}</p>
        </motion.div>
        <div className="flex lg:justify-end">
          <Button to="/apply" size="lg" data-testid="closing-cta-apply-btn">
            Apply for Exam <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
