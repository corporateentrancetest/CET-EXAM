import { PageHero } from "@/components/common/PageHero";
import { Seo } from "@/components/common/Seo";

/** Shared typographic wrapper for legal/policy pages. */
export function LegalPage({ title, subtitle, testId, sections }) {
  return (
    <div data-testid={testId}>
      <Seo title={title} description={subtitle} />
      <PageHero title={title} subtitle={subtitle} />
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {sections.map((sec, i) => (
            <div key={i}>
              {sec.heading && (
                <h2 className="font-heading text-xl font-bold text-slate-900 mb-3">{sec.heading}</h2>
              )}
              {sec.paragraphs?.map((p, j) => (
                <p key={j} className="text-slate-600 leading-relaxed mb-3">
                  {p}
                </p>
              ))}
              {sec.list && (
                <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                  {sec.list.map((li, j) => (
                    <li key={j}>{li}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
