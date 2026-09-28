import { Field, SelectField, StepShell } from "@/components/application-form/Field";

const YEARS = ["2024", "2025", "2026", "2027", "2028"];

export function AcademicStep({ values, onChange }) {
  return (
    <StepShell title="Academic Details" description="Your college and course information.">
      <Field label="College / Institute" name="college" value={values.college} onChange={onChange} placeholder="e.g. IIT Delhi" required testId="apply-college" />
      <Field label="University" name="university" value={values.university} onChange={onChange} placeholder="Affiliating university" testId="apply-university" />
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Course / Degree" name="course" value={values.course} onChange={onChange} placeholder="e.g. B.Tech, B.Com, MBA" required testId="apply-course" />
        <Field label="Specialization" name="specialization" value={values.specialization} onChange={onChange} placeholder="e.g. Computer Science" testId="apply-specialization" />
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <SelectField label="Graduation Year" name="graduationYear" value={values.graduationYear} onChange={onChange} options={YEARS} required testId="apply-grad-year" />
        <Field label="CGPA / Percentage" name="cgpa" value={values.cgpa} onChange={onChange} placeholder="e.g. 8.4 / 82%" testId="apply-cgpa" />
      </div>
    </StepShell>
  );
}
