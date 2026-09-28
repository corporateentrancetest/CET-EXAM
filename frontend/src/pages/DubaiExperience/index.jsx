import { Building2, MapPin, Users2, Globe2, Briefcase, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/common/PageHero";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Top20Criteria } from "@/components/common/Top20Criteria";
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
        subtitle="A fully-sponsored, 5-night, 6-day corporate immersion program in Dubai — reserved for the top 20 performers of the Corporate Launch Program."
        image={DUBAI.gallery[0].url}
      />

      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeading title={DUBAI.subheading} subtitle={DUBAI.subbody} align="center" />
        </div>
      </section>

      {/* Photo gallery */}
      <section className="bg-slate-950 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="A Glimpse of Dubai" title="Where Careers Go Global" dark />
          <div className="mt-12 grid grid-cols-2 lg:grid-cols-3 gap-4">
            {DUBAI.gallery.map((img, i) => (
              <div
                key={i}
                className={`group relative overflow-hidden rounded-xl border border-white/10 ${i === 0 ? "col-span-2 lg:col-span-2 lg:row-span-2" : ""}`}
                data-testid={`dubai-gallery-${i}`}
              >
                <img
                  src={img.url}
                  alt={img.caption}
                  className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${i === 0 ? "h-64 lg:h-full" : "h-40 lg:h-48"}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                <span className="absolute bottom-3 left-4 text-sm font-semibold text-white">{img.caption}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inclusions */}
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

      <Top20Criteria />

      <ClosingCTA />
    </div>
  );
}
