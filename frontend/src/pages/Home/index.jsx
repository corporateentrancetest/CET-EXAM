import { Hero } from "@/components/home/Hero";
import { StatsBar } from "@/components/home/StatsBar";
import { EmployerNetwork } from "@/components/home/EmployerNetwork";
import { JourneyProcess } from "@/components/home/JourneyProcess";
import { FeeAndNotice } from "@/components/home/FeeAndNotice";
import { DubaiSection } from "@/components/home/DubaiSection";
import { FounderTeaser } from "@/components/home/FounderTeaser";
import { FaqAccordion } from "@/components/common/FaqAccordion";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ClosingCTA } from "@/components/common/ClosingCTA";
import { FAQS } from "@/constants";

export default function HomePage() {
  return (
    <div data-testid="home-page">
      <Hero />
      <StatsBar />
      <EmployerNetwork />
      <JourneyProcess />
      <FeeAndNotice />
      <DubaiSection />
      <FounderTeaser />

      <section className="bg-slate-50/60 py-16 sm:py-20 border-y border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Frequently Asked" title="Questions, Answered" align="center" />
          <div className="mt-10">
            <FaqAccordion items={FAQS.slice(0, 6)} testId="home-faq-accordion" />
          </div>
        </div>
      </section>

      <ClosingCTA />
    </div>
  );
}
