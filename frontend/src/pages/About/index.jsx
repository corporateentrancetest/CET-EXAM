import { CheckCircle2, Building2 } from "lucide-react";
import { PageHero } from "@/components/common/PageHero";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ClosingCTA } from "@/components/common/ClosingCTA";
import { Button } from "@/components/common/Button";
import { ABOUT, FOUNDER } from "@/constants";

export default function AboutPage() {
  return (
    <div data-testid="about-page">
      <PageHero eyebrow={ABOUT.hero.eyebrow} title={ABOUT.hero.heading} subtitle={ABOUT.hero.body} />

      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title={ABOUT.mission.heading} subtitle={ABOUT.mission.body} />
        </div>
      </section>

      <section className="bg-slate-50/60 py-16 sm:py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Difference" title="What Makes CET Different" align="center" />
          <div className="mt-12 grid sm:grid-cols-2 gap-6">
            {ABOUT.different.map((d) => (
              <div
                key={d.title}
                className="rounded-xl border border-slate-200 bg-white p-6 hover:border-[#F5A623] transition-colors"
              >
                <CheckCircle2 className="h-6 w-6 text-[#F5A623]" />
                <h3 className="mt-4 font-heading font-bold text-lg text-slate-900">{d.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder's Vision */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm sticky top-28">
              <img
                src="https://images.unsplash.com/photo-1723990720514-65968a7d517b?crop=entropy&cs=srgb&fm=jpg&q=85&w=800"
                alt={FOUNDER.name}
                className="w-full h-[380px] object-cover"
              />
              <div className="p-5 bg-slate-900 text-white">
                <div className="font-heading font-bold text-lg">{FOUNDER.name}</div>
                <div className="text-sm text-[#F5A623]">{FOUNDER.role}</div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-8">
            <div className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-3">
              {FOUNDER.eyebrow}
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900">
              A Message From the Founder
            </h2>
            <p className="mt-5 text-sm text-slate-500 leading-relaxed">{FOUNDER.bio}</p>
            <div className="mt-6 space-y-4 border-l-2 border-[#F5A623] pl-6">
              {FOUNDER.vision.map((p, i) => (
                <p key={i} className="text-base text-slate-700 leading-relaxed italic">
                  {p}
                </p>
              ))}
              <p className="font-semibold text-slate-900 not-italic">— {FOUNDER.name}, {FOUNDER.role}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Organized by */}
      <section className="bg-slate-950 text-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Building2 className="h-10 w-10 text-[#F5A623] mx-auto" />
          <h2 className="mt-5 font-heading text-2xl sm:text-3xl font-bold">{ABOUT.organizedBy.heading}</h2>
          <p className="mt-4 text-slate-300 leading-relaxed">{ABOUT.organizedBy.body}</p>
          <div className="mt-8">
            <Button href="https://startuptimes.in" variant="ghostLight" data-testid="visit-startup-times-btn">
              Visit Startup Times
            </Button>
          </div>
        </div>
      </section>

      <ClosingCTA />
    </div>
  );
}
