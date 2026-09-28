import { Link } from "react-router-dom";
import { Mail, MapPin } from "lucide-react";
import { Logo } from "@/components/common/Logo";
import { NAV_LINKS, LEGAL } from "@/constants";

const LEGAL_LINKS = [
  { label: "Contact Us", to: "/contact" },
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Refund Policy", to: "/refund-policy" },
  { label: "Terms & Conditions", to: "/terms-conditions" },
];

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Logo dark />
            <p className="mt-4 text-sm leading-relaxed text-slate-400 max-w-xs">
              India's national Corporate Entrance Test — a transparent, merit-based bridge between
              Indian campuses and the corporate world.
            </p>
            <p className="mt-4 text-xs text-slate-500">An initiative by {LEGAL.initiativeBy}.</p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Explore</h4>
            <ul className="space-y-2.5 text-sm">
              {NAV_LINKS.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    data-testid={`footer-nav-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-slate-400 hover:text-[#F5A623] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Legal</h4>
            <ul className="space-y-2.5 text-sm">
              {LEGAL_LINKS.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    data-testid={`footer-legal-${l.label.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                    className="text-slate-400 hover:text-[#F5A623] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/apply" className="text-slate-400 hover:text-[#F5A623] transition-colors">
                  Apply for Exam
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <Mail className="h-4 w-4 mt-0.5 text-[#F5A623]" />
                <a href={`mailto:${LEGAL.email}`} className="hover:text-white break-all">
                  {LEGAL.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 mt-0.5 text-[#F5A623]" />
                <span>{LEGAL.addressLine}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} {LEGAL.legalEntity}. All rights reserved. CET (Corporate
            Entrance Test) is an initiative by {LEGAL.initiativeBy}.
          </p>
          <p>Operated by {LEGAL.legalEntity}</p>
        </div>
      </div>
    </footer>
  );
}
