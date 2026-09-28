import { SelectField, StepShell } from "@/components/application-form/Field";
import { Video } from "lucide-react";

const EXAM_SHIFTS = ["Morning Shift (9:00 AM – 10:00 AM)", "Afternoon Shift (1:00 PM – 2:00 PM)", "Evening Shift (5:00 PM – 6:00 PM)"];
const CAREER_INTERESTS = [
  "IT & Consulting", "BFSI (Banking/Finance)", "Marketing & Media", "Operations & Supply Chain",
  "Sales & Business Development", "Data & Analytics", "Startups", "Undecided",
];

export function PreferencesStep({ values, onChange }) {
  return (
    <StepShell
      title="Exam & Career Preferences"
      description="CET is a 100% online exam. Choose your preferred exam shift — interviews and the program are fully virtual."
    >
      <SelectField label="Preferred Exam Shift" name="examShift" value={values.examShift} onChange={onChange} options={EXAM_SHIFTS} required testId="apply-exam-shift" />

      <div className="flex items-start gap-3 rounded-lg bg-slate-50 border border-slate-200 p-4">
        <Video className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
        <p className="text-sm text-slate-600">
          Interviews are conducted <span className="font-semibold text-slate-800">virtually (online)</span>. The
          Corporate Launch Program and internship are fully remote — no travel or test centre required.
        </p>
      </div>

      <SelectField label="Primary Career Interest" name="careerInterest" value={values.careerInterest} onChange={onChange} options={CAREER_INTERESTS} required testId="apply-career-interest" />
    </StepShell>
  );
}
