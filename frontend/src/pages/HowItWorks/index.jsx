import { CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/common/PageHero";
import { SectionHeading } from "@/components/common/SectionHeading";
import { DataTable } from "@/components/common/DataTable";
import { Top20Criteria } from "@/components/common/Top20Criteria";
import { ClosingCTA } from "@/components/common/ClosingCTA";
import { HOW_IT_WORKS } from "@/constants";

export default function HowItWorksPage() {
  const s = HOW_IT_WORKS;
  return (
    <div data-testid="how-it-works-page">
      <PageHero title={s.hero.heading} subtitle={s.hero.body} />

      {/* Stages */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {s.stages.map((stage) => (
            <div
              key={stage.n}
              className="flex gap-5 rounded-xl border border-slate-200 bg-white p-6 hover:border-[#F5A623] transition-colors"
              data-testid={`stage-${stage.n}`}
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-900 text-[#F5A623] font-bold">
                {stage.n}
              </span>
              <div>
                <h3 className="font-heading font-bold text-lg text-slate-900">{stage.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{stage.body}</p>
                {stage.list && (
                  <ul className="mt-3 space-y-1.5">
                    {stage.list.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                        <CheckCircle2 className="h-4 w-4 text-[#F5A623] mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Exam pattern */}
      <section className="bg-slate-50/60 py-16 sm:py-20 border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Exam Pattern" title="Online Written Examination" subtitle="A single, one-hour online paper — 80 questions, four equally-weighted sections, with negative marking." />

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {s.examMeta.map(([k, v]) => (
              <div key={k} className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">{k}</div>
                <div className="mt-1 font-heading font-bold text-slate-900">{v}</div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <DataTable
              columns={["Section", "Questions", "Weightage", "Duration"]}
              rows={s.examPattern}
              testId="exam-pattern-table"
            />
          </div>
        </div>
      </section>

      {/* Selection criteria */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Transparency" title={s.selection.heading} subtitle={s.selection.intro} />
          <div className="mt-10 grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-heading font-bold text-slate-900 mb-4">Shortlist of 1,000</h3>
              <DataTable rows={s.selection.shortlist} testId="shortlist-criteria-table" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-slate-900 mb-4">Top 20 (Dubai) Selection</h3>
              <DataTable rows={s.selection.top20} testId="top20-criteria-table" />
            </div>
          </div>
          <p className="mt-6 text-sm text-slate-600 bg-amber-50 border border-amber-200 rounded-lg p-4">
            {s.selection.note}
          </p>
        </div>
      </section>

      <Top20Criteria />

      <ClosingCTA />
    </div>
  );
}
