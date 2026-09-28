import { SelectField, TextAreaField, StepShell } from "@/components/application-form/Field";

const EXAM_CITIES = ["Delhi", "Mumbai", "Bengaluru", "Hyderabad", "Chennai", "Kolkata", "Pune", "Ahmedabad"];
const INTERVIEW_MODES = ["In-person (Delhi)", "Virtual"];
const CAREER_INTERESTS = [
  "IT & Software", "Consulting", "BFSI (Banking/Finance)", "Manufacturing & Core",
  "Marketing & Sales", "Operations", "Data & Analytics", "Startups", "Undecided",
];

export function PreferencesStep({ values, onChange }) {
  return (
    <StepShell title="Exam & Career Preferences" description="Help us understand your preferences.">
      <div className="grid sm:grid-cols-2 gap-5">
        <SelectField label="Preferred Exam City" name="examCity" value={values.examCity} onChange={onChange} options={EXAM_CITIES} required testId="apply-exam-city" />
        <SelectField label="Interview Preference" name="interviewMode" value={values.interviewMode} onChange={onChange} options={INTERVIEW_MODES} required testId="apply-interview-mode" />
      </div>
      <SelectField label="Primary Career Interest" name="careerInterest" value={values.careerInterest} onChange={onChange} options={CAREER_INTERESTS} required testId="apply-career-interest" />
    </StepShell>
  );
}
