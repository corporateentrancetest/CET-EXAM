import { Mail, MapPin, Building2 } from "lucide-react";
import { PageHero } from "@/components/common/PageHero";
import { LEGAL } from "@/constants";

export default function ContactPage() {
  return (
    <div data-testid="contact-page">
      <PageHero
        eyebrow="Get In Touch"
        title="Contact Us"
        subtitle="For any queries about CET 2027 — applications, payments, or partnerships — reach out to our team."
      />
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-8">
            <h2 className="font-heading text-xl font-bold text-slate-900">Reach Our Support Team</h2>
            <ul className="mt-6 space-y-5 text-sm">
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-[#F5A623] mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-900">Email</div>
                  <a href={`mailto:${LEGAL.email}`} className="text-amber-600 hover:underline break-all">
                    {LEGAL.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[#F5A623] mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-900">Address</div>
                  <span className="text-slate-600">{LEGAL.addressLine}</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-8">
            <div className="flex items-center gap-2 text-slate-500 mb-3">
              <Building2 className="h-5 w-5 text-[#F5A623]" />
              <span className="text-xs font-bold uppercase tracking-widest">Operated By</span>
            </div>
            <h2 className="font-heading text-xl font-bold text-slate-900">{LEGAL.legalEntity}</h2>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              CET (Corporate Entrance Test) is an initiative by {LEGAL.initiativeBy}, operated and
              managed by {LEGAL.legalEntity}. All payments, invoices, and official communication are
              handled by {LEGAL.legalEntity}.
            </p>
            <p className="mt-4 text-sm text-slate-600">
              For grievances or escalations, please email us with your application number and we will
              respond within 3–5 business days.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
