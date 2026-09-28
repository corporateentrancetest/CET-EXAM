import { StepShell } from "@/components/application-form/Field";

function Checkbox({ name, checked, onChange, children, testId }) {
  return (
    <label className="flex items-start gap-3 rounded-lg border border-slate-200 p-4 cursor-pointer hover:border-[#F5A623] transition-colors">
      <input
        type="checkbox"
        checked={Boolean(checked)}
        onChange={(e) => onChange(name, e.target.checked)}
        data-testid={testId}
        className="mt-0.5 h-4 w-4 accent-[#F5A623]"
      />
      <span className="text-sm text-slate-700 leading-relaxed">{children}</span>
    </label>
  );
}

export function DeclarationsStep({ values, onChange }) {
  return (
    <StepShell title="Declarations" description="Please read and accept before proceeding to payment.">
      <Checkbox name="infoAccurate" checked={values.infoAccurate} onChange={onChange} testId="apply-decl-accurate">
        I declare that all the information provided in this application is true, complete, and accurate
        to the best of my knowledge. I understand that any false information may lead to disqualification.
      </Checkbox>
      <Checkbox name="termsAccepted" checked={values.termsAccepted} onChange={onChange} testId="apply-decl-terms">
        I have read and agree to the CET Terms &amp; Conditions, Privacy Policy, and Refund Policy, and I
        understand the examination fee is non-refundable once submitted.
      </Checkbox>
    </StepShell>
  );
}
