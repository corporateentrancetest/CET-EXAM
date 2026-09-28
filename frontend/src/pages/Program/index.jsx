import { CheckCircle2, Monitor, Award, GraduationCap, Briefcase, Plane } from "lucide-react";
import { PageHero } from "@/components/common/PageHero";
import { SectionHeading } from "@/components/common/SectionHeading";
import { DataTable } from "@/components/common/DataTable";
import { ImageSplit } from "@/components/common/ImageSplit";
import { ClosingCTA } from "@/components/common/ClosingCTA";
import { PROGRAM, IMAGES } from "@/constants";

const OUTCOME_ICONS = [GraduationCap, Briefcase, Award, CheckCircle2, Plane];

export default function ProgramPage() {
  return (
    <div data-testid="program-page">
      <PageHero
        eyebrow={PROGRAM.hero.eyebrow}
        title={PROGRAM.hero.heading}
        subtitle={PROGRAM.hero.body}
        image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600"
      >
        <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-4 py-2 text-sm font-medium">
          <Monitor className="h-4 w-4 text-[#F5A623]" /> Program Format: {PROGRAM.format}
        </div>
      </PageHero>

      {/* Curriculum modules */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Curriculum" title="9 Curriculum Modules" />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROGRAM.modules.map((m) => (
              <div
                key={m.n}
                className="group rounded-xl border border-slate-200 bg-white p-6 hover:border-[#F5A623] hover:shadow-md transition-colors"
                data-testid={`module-${m.n}`}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-[#F5A623] font-bold text-sm group-hover:bg-[#F5A623] group-hover:text-slate-900 transition-colors">
                  {String(m.n).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-heading font-bold text-slate-900 leading-snug">{m.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ImageSplit
        reverse
        eyebrow="Fully Online"
        title="Learn Live. Grow Remotely."
        body="Live sessions, recorded modules, mentor office hours, and continuous employer evaluation — all delivered online so you can train from anywhere."
        image={IMAGES.study2}
        imageAlt="Student learning online"
        points={[
          "Live + recorded sessions on your schedule",
          "Mentor office hours and 1:1 guidance",
          "Continuous employer assessment throughout",
        ]}
      />

      {/* Program format */}
      <section className="bg-slate-50/60 py-16 sm:py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Format" title="Program Format" subtitle="Delivered 100% online — accessible from anywhere in India." />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROGRAM.formatPoints.map((f) => (
              <div key={f.title} className="rounded-xl border border-slate-200 bg-white p-6">
                <CheckCircle2 className="h-6 w-6 text-[#F5A623]" />
                <h3 className="mt-4 font-heading font-bold text-slate-900">{f.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
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
            {PROGRAM.outcomes.map((o, i) => {
              const Icon = OUTCOME_ICONS[i] || CheckCircle2;
              return (
                <div key={o} className="flex items-start gap-3 rounded-lg bg-white/5 border border-white/10 p-5">
                  <Icon className="h-5 w-5 text-[#F5A623] mt-0.5 shrink-0" />
                  <p className="text-slate-200">{o}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <ClosingCTA />
    </div>
  );
}
