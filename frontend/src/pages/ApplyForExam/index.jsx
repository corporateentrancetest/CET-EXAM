import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Loader2, CheckCircle2, PartyPopper } from "lucide-react";
import { Button } from "@/components/common/Button";
import { StepIndicator } from "@/components/application-form/StepIndicator";
import { AccountStep } from "@/components/application-form/steps/AccountStep";
import { PersonalStep } from "@/components/application-form/steps/PersonalStep";
import { AcademicStep } from "@/components/application-form/steps/AcademicStep";
import { AddressStep } from "@/components/application-form/steps/AddressStep";
import { PreferencesStep } from "@/components/application-form/steps/PreferencesStep";
import { DeclarationsStep } from "@/components/application-form/steps/DeclarationsStep";
import { PaymentStep } from "@/components/application-form/steps/PaymentStep";
import { DocumentsStep } from "@/components/application-form/steps/DocumentsStep";
import { ReviewStep } from "@/components/application-form/steps/ReviewStep";
import { useAuth } from "@/context/AuthContext";
import { applicationService } from "@/services/applicationService";
import { paymentService } from "@/services/paymentService";
import { formatApiError } from "@/services/api";

const TOTAL = 9;

export default function ApplyForExamPage() {
  const { user, register } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [busy, setBusy] = useState(false);
  const [application, setApplication] = useState(null);
  const [done, setDone] = useState(false);

  const [account, setAccount] = useState({ fullName: "", email: "", phone: "", password: "" });
  const [personal, setPersonal] = useState({});
  const [academic, setAcademic] = useState({});
  const [address, setAddress] = useState({});
  const [preferences, setPreferences] = useState({});
  const [declarations, setDeclarations] = useState({});
  const [payMethod, setPayMethod] = useState("upi");
  const [docFiles, setDocFiles] = useState({});

  const hydrate = useCallback((app) => {
    setApplication(app);
    setPersonal(app.personal || {});
    setAcademic(app.academic || {});
    setAddress(app.address || {});
    setPreferences(app.preferences || {});
    setDeclarations(app.declarations || {});
  }, []);

  // If already logged in as a candidate, load their draft and resume.
  useEffect(() => {
    let active = true;
    async function load() {
      if (user && user.role === "candidate") {
        try {
          const app = await applicationService.getMine();
          if (!active) return;
          hydrate(app);
          if (app.status === "submitted") {
            setStep(9);
          } else {
            setStep(Math.min(Math.max(app.currentStep || 2, 2), 9));
          }
        } catch {
          /* no application yet */
        }
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [user, hydrate]);

  const setField = (setter) => (key, value) => setter((s) => ({ ...s, [key]: value }));

  async function saveDraft(extra = {}) {
    const payload = { personal, academic, address, preferences, declarations, ...extra };
    const app = await applicationService.update(payload);
    setApplication(app);
    return app;
  }

  async function handleAccount() {
    if (!account.fullName || !account.email || !account.phone || !account.password) {
      toast.error("Please fill all fields to create your account.");
      return;
    }
    setBusy(true);
    try {
      await register(account);
      const app = await applicationService.getMine();
      hydrate(app);
      setPersonal((p) => ({ ...p, fullName: account.fullName }));
      toast.success("Account created — your progress is now saved automatically.");
      setStep(2);
    } catch (e) {
      toast.error(formatApiError(e));
    } finally {
      setBusy(false);
    }
  }

  async function next() {
    // Step-specific validation
    if (step === 1) return handleAccount();
    if (step === 6 && (!declarations.infoAccurate || !declarations.termsAccepted)) {
      toast.error("Please accept both declarations to continue.");
      return;
    }

    setBusy(true);
    try {
      if (step >= 2 && step <= 6) {
        await saveDraft({ currentStep: step + 1 });
      }
      setStep((s) => Math.min(s + 1, TOTAL));
    } catch (e) {
      toast.error(formatApiError(e));
    } finally {
      setBusy(false);
    }
  }

  async function handlePay() {
    setBusy(true);
    try {
      const order = await paymentService.createOrder();
      const app = await paymentService.verify({
        orderId: order.orderId,
        paymentId: `pay_${Date.now()}`,
        method: payMethod,
      });
      setApplication(app);
      toast.success("Payment successful! You can now upload documents.");
      setStep(8);
    } catch (e) {
      toast.error(formatApiError(e));
    } finally {
      setBusy(false);
    }
  }

  async function handleUploadAndContinue() {
    const hasNew = Object.values(docFiles).some(Boolean);
    const alreadyHasRequired = application?.documents?.photo?.url && application?.documents?.signature?.url;
    if (hasNew) {
      setBusy(true);
      try {
        const fd = new FormData();
        Object.entries(docFiles).forEach(([k, f]) => f && fd.append(k, f));
        const app = await applicationService.uploadDocuments(fd);
        setApplication(app);
        setDocFiles({});
        if (!app.documents?.photo?.url || !app.documents?.signature?.url) {
          toast.error("Photo and signature are required.");
          setBusy(false);
          return;
        }
        toast.success("Documents uploaded.");
        setStep(9);
      } catch (e) {
        toast.error(formatApiError(e));
      } finally {
        setBusy(false);
      }
    } else if (alreadyHasRequired) {
      setStep(9);
    } else {
      toast.error("Please upload your photo and signature.");
    }
  }

  async function handleSubmit() {
    setBusy(true);
    try {
      const app = await applicationService.submit();
      setApplication(app);
      setDone(true);
      toast.success("Application submitted successfully!");
    } catch (e) {
      toast.error(formatApiError(e));
    } finally {
      setBusy(false);
    }
  }

  if (done || application?.status === "submitted") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="max-w-lg w-full rounded-2xl bg-white border border-slate-200 shadow-sm p-8 text-center" data-testid="apply-success">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <PartyPopper className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="mt-6 font-heading text-2xl font-bold text-slate-900">Application Submitted!</h1>
          <p className="mt-2 text-slate-600">
            Your CET 2027 application has been received. Save your application number for reference.
          </p>
          <div className="mt-5 rounded-lg bg-slate-900 text-white py-4">
            <div className="text-xs uppercase tracking-widest text-slate-400">Application Number</div>
            <div className="font-heading text-xl font-extrabold text-[#F5A623]">
              {application?.applicationNumber}
            </div>
          </div>
          <div className="mt-6 flex gap-3 justify-center">
            <Button to="/dashboard" data-testid="success-dashboard-btn">
              Go to Dashboard
            </Button>
            <Button to="/" variant="outline">
              Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const paid = application?.payment?.status === "paid";

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="mb-6">
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900">
            CET 2027 — Application Form
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Applications open October 1, 2026 and close December 31, 2026. Your progress is saved
            automatically at every step.
          </p>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6 sm:p-8">
          <StepIndicator current={step} />

          <div className="mt-8">
            {step === 1 && <AccountStep values={account} onChange={setField(setAccount)} />}
            {step === 2 && <PersonalStep values={personal} onChange={setField(setPersonal)} />}
            {step === 3 && <AcademicStep values={academic} onChange={setField(setAcademic)} />}
            {step === 4 && <AddressStep values={address} onChange={setField(setAddress)} />}
            {step === 5 && <PreferencesStep values={preferences} onChange={setField(setPreferences)} />}
            {step === 6 && <DeclarationsStep values={declarations} onChange={setField(setDeclarations)} />}
            {step === 7 && <PaymentStep paid={paid} method={payMethod} onMethodChange={setPayMethod} />}
            {step === 8 && (
              <DocumentsStep
                files={docFiles}
                uploaded={application?.documents}
                onFile={(k, f) => setDocFiles((s) => ({ ...s, [k]: f }))}
              />
            )}
            {step === 9 && <ReviewStep application={application} />}
          </div>

          {/* Nav buttons */}
          <div className="mt-8 flex items-center justify-between gap-3 border-t border-slate-100 pt-6">
            <Button
              variant="outline"
              onClick={() => setStep((s) => Math.max(s - 1, 1))}
              disabled={step === 1 || busy}
              data-testid="apply-back-btn"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>

            {step <= 6 && (
              <Button onClick={next} disabled={busy} data-testid="apply-next-btn">
                {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Continue <ArrowRight className="h-4 w-4" /></>}
              </Button>
            )}
            {step === 7 && !paid && (
              <Button onClick={handlePay} disabled={busy} data-testid="apply-pay-btn">
                {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Pay ₹250 &amp; Continue <ArrowRight className="h-4 w-4" /></>}
              </Button>
            )}
            {step === 7 && paid && (
              <Button onClick={() => setStep(8)} data-testid="apply-to-docs-btn">
                Continue <ArrowRight className="h-4 w-4" />
              </Button>
            )}
            {step === 8 && (
              <Button onClick={handleUploadAndContinue} disabled={busy} data-testid="apply-upload-btn">
                {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Upload &amp; Continue <ArrowRight className="h-4 w-4" /></>}
              </Button>
            )}
            {step === 9 && (
              <Button onClick={handleSubmit} disabled={busy} data-testid="apply-submit-btn">
                {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Submit Application <CheckCircle2 className="h-4 w-4" /></>}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
