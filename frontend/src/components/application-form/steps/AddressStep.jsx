import { Field, SelectField, StepShell } from "@/components/application-form/Field";

const STATES = [
  "Andhra Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi", "Goa", "Gujarat", "Haryana",
  "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra",
  "Odisha", "Punjab", "Rajasthan", "Tamil Nadu", "Telangana", "Uttar Pradesh", "Uttarakhand",
  "West Bengal", "Other",
];

export function AddressStep({ values, onChange }) {
  return (
    <StepShell title="Address" description="Your current mailing address.">
      <Field label="Address Line 1" name="line1" value={values.line1} onChange={onChange} placeholder="House / Street" required testId="apply-address1" />
      <Field label="Address Line 2" name="line2" value={values.line2} onChange={onChange} placeholder="Area / Landmark" testId="apply-address2" />
      <div className="grid sm:grid-cols-3 gap-5">
        <Field label="City" name="city" value={values.city} onChange={onChange} required testId="apply-city" />
        <SelectField label="State" name="state" value={values.state} onChange={onChange} options={STATES} required testId="apply-state" />
        <Field label="Pincode" name="pincode" value={values.pincode} onChange={onChange} placeholder="6-digit" required testId="apply-pincode" />
      </div>
    </StepShell>
  );
}
