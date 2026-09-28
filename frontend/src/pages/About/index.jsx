import { CheckCircle2, Building2, Instagram, Linkedin } from "lucide-react";
import { PageHero } from "@/components/common/PageHero";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ClosingCTA } from "@/components/common/ClosingCTA";
import { Button } from "@/components/common/Button";
import { ABOUT, FOUNDER, ASSETS, LEGAL } from "@/constants";

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
                src={FOUNDER.photo}
                alt={FOUNDER.name}
                className="w-full h-[380px] object-cover object-top"
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
          <img src={ASSETS.startupTimesLogo} alt="Startup Times" className="h-10 w-auto mx-auto" />
          <h2 className="mt-5 font-heading text-2xl sm:text-3xl font-bold">{ABOUT.organizedBy.heading}</h2>
          <p className="mt-4 text-slate-300 leading-relaxed">{ABOUT.organizedBy.body}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button href={LEGAL.startupTimes.website} variant="ghostLight" data-testid="visit-startup-times-btn">
              Visit Startup Times
            </Button>
            <Button href={LEGAL.startupTimes.instagram} variant="ghostLight" data-testid="st-instagram-btn">
              <Instagram className="h-4 w-4" /> Instagram
            </Button>
            <Button href={LEGAL.startupTimes.linkedin} variant="ghostLight" data-testid="st-linkedin-btn">
              <Linkedin className="h-4 w-4" /> LinkedIn
            </Button>
          </div>
        </div>
      </section>

      <ClosingCTA />
    </div>
  );
}
