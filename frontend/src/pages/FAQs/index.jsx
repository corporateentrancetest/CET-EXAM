import { PageHero } from "@/components/common/PageHero";
import { FaqAccordion } from "@/components/common/FaqAccordion";
import { ClosingCTA } from "@/components/common/ClosingCTA";
import { LEGAL, FAQS } from "@/constants";

export default function FAQsPage() {
  return (
    <div data-testid="faqs-page">
      <PageHero
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about CET 2027 — eligibility, fees, dates, results, and the Dubai Global Experience."
      />
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FaqAccordion items={FAQS} testId="faqs-accordion" />
          <div className="mt-12 rounded-xl border border-slate-200 bg-slate-50 p-6 text-center">
            <p className="text-sm text-slate-600">
              Still have questions? Write to us at{" "}
              <a href={`mailto:${LEGAL.email}`} className="font-semibold text-amber-600 hover:underline">
                {LEGAL.email}
              </a>
            </p>
          </div>
        </div>
      </section>
      <ClosingCTA />
    </div>
  );
}
