import { CheckCircle2 } from "lucide-react";
import { StepShell } from "@/components/application-form/Field";
import { SITE } from "@/constants";

function Row({ label, value }) {
  return (
    <div className="flex justify-between gap-4 py-2 border-b border-slate-100 last:border-0">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-sm font-medium text-slate-900 text-right">{value || "—"}</span>
    </div>
  );
}

export function ReviewStep({ application }) {
  const a = application || {};
  const p = a.personal || {};
  const ac = a.academic || {};
  const ad = a.address || {};
  const pr = a.preferences || {};

  return (
    <StepShell title="Review & Submit" description="Please review your details before final submission.">
      <div className="rounded-xl border border-slate-200 p-5">
        <h3 className="font-heading font-bold text-slate-900 mb-2">Application</h3>
        <Row label="Application No." value={a.applicationNumber} />
        <Row label="Name" value={p.fullName || a.contact?.email} />
        <Row label="Email" value={a.contact?.email} />
        <Row label="Phone" value={a.contact?.phone} />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-xl border border-slate-200 p-5">
          <h3 className="font-heading font-bold text-slate-900 mb-2">Personal</h3>
          <Row label="Date of Birth" value={p.dateOfBirth} />
          <Row label="Gender" value={p.gender} />
          <Row label="Category" value={p.category} />
          <Row label="ID" value={p.idType ? `${p.idType} · ${p.idNumber || ""}` : ""} />
        </div>
        <div className="rounded-xl border border-slate-200 p-5">
          <h3 className="font-heading font-bold text-slate-900 mb-2">Academic</h3>
          <Row label="College" value={ac.college} />
          <Row label="Course" value={ac.course} />
          <Row label="Graduation" value={ac.graduationYear} />
          <Row label="CGPA" value={ac.cgpa} />
        </div>
        <div className="rounded-xl border border-slate-200 p-5">
          <h3 className="font-heading font-bold text-slate-900 mb-2">Address</h3>
          <Row label="City" value={ad.city} />
          <Row label="State" value={ad.state} />
          <Row label="Pincode" value={ad.pincode} />
        </div>
        <div className="rounded-xl border border-slate-200 p-5">
          <h3 className="font-heading font-bold text-slate-900 mb-2">Preferences</h3>
          <Row label="Exam City" value={pr.examCity} />
          <Row label="Interview" value={pr.interviewMode} />
          <Row label="Interest" value={pr.careerInterest} />
        </div>
      </div>

      <div className="flex items-center gap-3 rounded-lg bg-green-50 border border-green-200 p-4">
        <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
        <span className="text-sm text-green-800">
          Payment of ₹{SITE.examFee} completed. Documents uploaded. You're ready to submit.
        </span>
      </div>
    </StepShell>
  );
}
