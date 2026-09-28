import { Field, StepShell } from "@/components/application-form/Field";
import { Link } from "react-router-dom";

/** Step 1 — creates the candidate login automatically from name/email/phone. */
export function AccountStep({ values, onChange }) {
  return (
    <StepShell
      title="Create Your Account"
      description="Enter your basics to start — your candidate login is created instantly and your progress is saved automatically."
    >
      <Field label="Full Name" name="fullName" value={values.fullName} onChange={onChange} placeholder="As per your ID" required testId="apply-fullname" autoComplete="name" />
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Email Address" name="email" type="email" value={values.email} onChange={onChange} placeholder="you@example.com" required testId="apply-email" autoComplete="email" />
        <Field label="Phone Number" name="phone" value={values.phone} onChange={onChange} placeholder="10-digit mobile" required testId="apply-phone" autoComplete="tel" />
      </div>
      <Field label="Create Password" name="password" type="password" value={values.password} onChange={onChange} placeholder="Minimum 6 characters" required testId="apply-password" autoComplete="new-password" />
      <p className="text-xs text-slate-500">
        Already started an application?{" "}
        <Link to="/login" className="font-semibold text-amber-600 hover:underline">
          Log in to continue
        </Link>
        .
      </p>
    </StepShell>
  );
}
