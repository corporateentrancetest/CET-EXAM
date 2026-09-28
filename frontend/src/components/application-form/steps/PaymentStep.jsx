import { ShieldCheck, Smartphone, CreditCard, CheckCircle2 } from "lucide-react";
import { StepShell } from "@/components/application-form/Field";
import { SITE } from "@/constants";

/** Step 7 — mock Razorpay/UPI payment. `paid` reflects application.payment.status. */
export function PaymentStep({ paid, method, onMethodChange }) {
  const methods = [
    { key: "upi", label: "UPI", icon: Smartphone },
    { key: "card", label: "Card", icon: CreditCard },
    { key: "netbanking", label: "Net Banking", icon: ShieldCheck },
  ];

  if (paid) {
    return (
      <StepShell title="Payment" description="Your examination fee has been received.">
        <div className="flex items-center gap-3 rounded-lg bg-green-50 border border-green-200 p-5">
          <CheckCircle2 className="h-6 w-6 text-green-600" />
          <div>
            <div className="font-semibold text-green-800">Payment successful</div>
            <div className="text-sm text-green-700">₹{SITE.examFee} received. You can now upload your documents.</div>
          </div>
        </div>
      </StepShell>
    );
  }

  return (
    <StepShell title="Examination Fee Payment" description="Complete your payment to proceed to document upload.">
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 flex items-end justify-between">
        <div>
          <div className="text-sm font-semibold text-slate-600">CET 2027 — Application Fee</div>
          <div className="text-xs text-slate-500">Non-refundable · inclusive of applicable charges</div>
        </div>
        <div className="font-heading text-4xl font-extrabold text-slate-900">₹{SITE.examFee}</div>
      </div>

      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Payment Method</div>
        <div className="grid grid-cols-3 gap-3">
          {methods.map((m) => {
            const Icon = m.icon;
            const active = method === m.key;
            return (
              <button
                key={m.key}
                type="button"
                onClick={() => onMethodChange(m.key)}
                data-testid={`pay-method-${m.key}`}
                className={`flex flex-col items-center gap-2 rounded-lg border p-4 transition-colors ${
                  active ? "border-[#F5A623] bg-white ring-2 ring-amber-500/20" : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <Icon className={`h-5 w-5 ${active ? "text-amber-600" : "text-slate-400"}`} />
                <span className="text-xs font-semibold text-slate-700">{m.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs text-slate-500">
        <ShieldCheck className="h-4 w-4 text-slate-400" />
        Payments are processed securely. This is a demo checkout (Razorpay/UPI integration is
        placeholder-ready).
      </div>
    </StepShell>
  );
}
