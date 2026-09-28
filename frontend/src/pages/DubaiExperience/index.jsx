import { Building2, MapPin, Users2, Globe2, Briefcase, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/common/PageHero";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Button } from "@/components/common/Button";
import { ClosingCTA } from "@/components/common/ClosingCTA";
import { DUBAI } from "@/constants";

const ICONS = [Building2, Users2, Briefcase, MapPin, Globe2];

export default function DubaiExperiencePage() {
  return (
    <div data-testid="dubai-experience-page">
      <PageHero
        eyebrow={DUBAI.eyebrow}
        title={DUBAI.heading}
        subtitle="A fully-sponsored, 5-night, 6-day corporate immersion program in Dubai — reserved for the top 100 performers of the Corporate Launch Program."
        image="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600"
      />

      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeading title={DUBAI.subheading} subtitle={DUBAI.subbody} align="center" />
        </div>
      </section>

      <section className="bg-slate-50/60 py-16 sm:py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Inclusions" title="What's Included" />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DUBAI.inclusions.map((inc, i) => {
              const Icon = ICONS[i];
              return (
                <div key={inc.title} className="rounded-xl border border-slate-200 bg-white p-6 hover:border-[#F5A623] transition-colors">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-heading font-bold text-slate-900">{inc.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{inc.body}</p>
                </div>
              );
            })}
          </div>
          <p className="mt-6 text-sm text-slate-400 italic">{DUBAI.placeholder}</p>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
            <div className="flex items-center gap-2 text-amber-600 mb-3">
              <CheckCircle2 className="h-5 w-5" />
              <span className="text-xs font-bold uppercase tracking-widest">Eligibility</span>
            </div>
            <p className="text-slate-700 leading-relaxed">{DUBAI.eligibility}</p>
            <div className="mt-6">
              <Button to="/how-it-works" variant="outline" data-testid="dubai-selection-criteria-btn">
                See Full Selection Criteria
              </Button>
            </div>
          </div>
        </div>
      </section>

      <ClosingCTA />
    </div>
  );
}
