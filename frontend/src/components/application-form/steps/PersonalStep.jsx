import { Field, SelectField, StepShell } from "@/components/application-form/Field";

const GENDERS = ["Male", "Female", "Other", "Prefer not to say"];
const CATEGORIES = ["General", "OBC", "SC", "ST", "EWS"];
const ID_TYPES = ["Aadhaar", "PAN", "Passport", "Voter ID", "Driving License"];

export function PersonalStep({ values, onChange }) {
  return (
    <StepShell title="Personal Details" description="Tell us about yourself and your identity document.">
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Date of Birth" name="dateOfBirth" type="date" value={values.dateOfBirth} onChange={onChange} required testId="apply-dob" />
        <SelectField label="Gender" name="gender" value={values.gender} onChange={onChange} options={GENDERS} required testId="apply-gender" />
      </div>
      <SelectField label="Category" name="category" value={values.category} onChange={onChange} options={CATEGORIES} required testId="apply-category" />
      <div className="grid sm:grid-cols-2 gap-5">
        <SelectField label="ID Type" name="idType" value={values.idType} onChange={onChange} options={ID_TYPES} required testId="apply-id-type" />
        <Field label="ID Number" name="idNumber" value={values.idNumber} onChange={onChange} placeholder="Document number" required testId="apply-id-number" />
      </div>
    </StepShell>
  );
}
