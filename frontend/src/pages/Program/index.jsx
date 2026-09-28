import { CheckCircle2, Monitor, Award } from "lucide-react";
import { PageHero } from "@/components/common/PageHero";
import { SectionHeading } from "@/components/common/SectionHeading";
import { DataTable } from "@/components/common/DataTable";
import { ClosingCTA } from "@/components/common/ClosingCTA";
import { PROGRAM } from "@/constants";

export default function ProgramPage() {
  return (
    <div data-testid="program-page">
      <PageHero eyebrow={PROGRAM.hero.eyebrow} title={PROGRAM.hero.heading} subtitle={PROGRAM.hero.body}>
        <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-4 py-2 text-sm font-medium">
          <Monitor className="h-4 w-4 text-[#F5A623]" /> Program Format: {PROGRAM.format}
        </div>
      </PageHero>

      {/* What's included */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Program" title="What's Included" align="center" />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROGRAM.included.map((it) => (
              <div key={it.title} className="rounded-xl border border-slate-200 bg-white p-6 hover:border-[#F5A623] transition-colors">
                <CheckCircle2 className="h-6 w-6 text-[#F5A623]" />
                <h3 className="mt-4 font-heading font-bold text-slate-900">{it.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{it.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum modules */}
      <section className="bg-slate-50/60 py-16 sm:py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Curriculum" title="9 Curriculum Modules" />
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PROGRAM.modules.map((m, i) => (
              <div
                key={m}
                className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-4"
                data-testid={`module-${i}`}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-md bg-slate-900 text-[#F5A623] font-bold text-sm">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm font-medium text-slate-800">{m}</span>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-slate-400 italic">{PROGRAM.modulesPlaceholder}</p>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Timeline" title="Program Timeline" />
          <div className="mt-8">
            <DataTable columns={["Milestone", "Date"]} rows={PROGRAM.timeline} testId="program-timeline-table" />
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="bg-slate-950 text-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Award className="h-10 w-10 text-[#F5A623] mx-auto" />
            <h2 className="mt-5 font-heading text-2xl sm:text-3xl font-bold">What Candidates Walk Away With</h2>
          </div>
          <div className="mt-10 space-y-4">
            {PROGRAM.outcomes.map((o) => (
              <div key={o} className="flex items-start gap-3 rounded-lg bg-white/5 border border-white/10 p-5">
                <CheckCircle2 className="h-5 w-5 text-[#F5A623] mt-0.5 shrink-0" />
                <p className="text-slate-200">{o}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ClosingCTA />
    </div>
  );
}
