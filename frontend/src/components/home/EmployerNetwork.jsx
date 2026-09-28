import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Button } from "@/components/common/Button";
import { EMPLOYER_SECTION } from "@/constants";

export function EmployerNetwork() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title={EMPLOYER_SECTION.heading} subtitle={EMPLOYER_SECTION.body} align="center" />
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {EMPLOYER_SECTION.logos.map((logo, i) => (
            <motion.span
              key={logo}
              className="font-heading text-xl sm:text-2xl font-bold text-slate-400 hover:text-slate-800 transition-colors"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              data-testid={`employer-logo-${i}`}
            >
              {logo}
            </motion.span>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Button to="/employers" variant="outline" data-testid="view-employer-network-btn">
            View Employer Network <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
