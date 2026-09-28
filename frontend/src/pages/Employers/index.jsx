import { CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/common/PageHero";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Button } from "@/components/common/Button";
import { ClosingCTA } from "@/components/common/ClosingCTA";
import { EMPLOYERS, EMPLOYER_SECTION } from "@/constants";

export default function EmployersPage() {
  return (
    <div data-testid="employers-page">
      <PageHero eyebrow={EMPLOYERS.hero.eyebrow} title={EMPLOYERS.hero.heading} subtitle={EMPLOYERS.hero.body} />

      {/* By the numbers */}
      <section className="bg-white py-14 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {EMPLOYERS.numbers.map(([v, l], i) => (
            <div key={l} className="text-center" data-testid={`employer-number-${i}`}>
              <div className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900">{v}</div>
              <div className="mt-2 text-xs font-semibold uppercase tracking-wider text-slate-500">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Why participate */}
      <section className="bg-slate-50/60 py-16 sm:py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Why Participate" title="Why Employers Participate" />
          <div className="mt-12 grid sm:grid-cols-2 gap-6">
            {EMPLOYERS.why.map((w) => (
              <div key={w.title} className="rounded-xl border border-slate-200 bg-white p-6 hover:border-[#F5A623] transition-colors">
                <CheckCircle2 className="h-6 w-6 text-[#F5A623]" />
                <h3 className="mt-4 font-heading font-bold text-slate-900">{w.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Logos */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title={EMPLOYER_SECTION.heading} subtitle={EMPLOYER_SECTION.body} align="center" />
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
            {EMPLOYER_SECTION.logos.map((logo) => (
              <span key={logo} className="font-heading text-xl sm:text-2xl font-bold text-slate-400">
                {logo}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* How to participate */}
      <section className="bg-slate-950 text-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold">How to Participate</h2>
          <p className="mt-4 text-sm text-slate-400 italic">{EMPLOYERS.howToParticipate}</p>
          <div className="mt-8">
            <Button href="mailto:help@corporateentrancetest.com" data-testid="partner-with-cet-btn">
              Partner With CET
            </Button>
          </div>
        </div>
      </section>

      <ClosingCTA />
    </div>
  );
}
