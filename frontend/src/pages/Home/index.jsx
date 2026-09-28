import { Hero } from "@/components/home/Hero";
import { StatsBar } from "@/components/home/StatsBar";
import { EmployerNetwork } from "@/components/home/EmployerNetwork";
import { JourneyProcess } from "@/components/home/JourneyProcess";
import { FeeAndNotice } from "@/components/home/FeeAndNotice";
import { DubaiSection } from "@/components/home/DubaiSection";
import { FounderTeaser } from "@/components/home/FounderTeaser";
import { FaqAccordion } from "@/components/common/FaqAccordion";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ImageSplit } from "@/components/common/ImageSplit";
import { ClosingCTA } from "@/components/common/ClosingCTA";
import { FAQS, IMAGES } from "@/constants";
import { Seo } from "@/components/common/Seo";

export default function HomePage() {
  return (
    <div data-testid="home-page">
      <Seo path="/" />
      <Hero />
      <StatsBar />
      <EmployerNetwork />
      <ImageSplit
        testId="home-online-split"
        eyebrow="100% Online"
        title="Take the Exam & Program From Anywhere in India"
        body="No travel, no test centres. CET's examination, interviews, and the full Corporate Launch Program are delivered entirely online — accessible to every student with an internet connection."
        image={IMAGES.onlineLearning}
        imageAlt="Student attending CET online program"
        points={[
          "One-hour online exam with 80 questions across 4 sections",
          "Choose your shift — Morning, Afternoon, or Evening",
          "Virtual interviews and a fully remote 3-month program",
        ]}
      />
      <JourneyProcess />
      <FeeAndNotice />
      <ImageSplit
        testId="home-grads-split"
        reverse
        eyebrow="Graduate to Global"
        title="From Campus to a Corporate Career"
        body="CET gives final-year students and recent graduates a single, credible national platform to prove readiness and earn real outcomes."
        image={IMAGES.graduatesRed}
        imageAlt="Graduates celebrating"
        points={[
          "National Rank and percentile for every applicant",
          "Personalized Corporate Readiness Report",
          "Direct evaluation by 350+ hiring employers",
        ]}
      />
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
