import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { Loader2, LogIn, ShieldCheck } from "lucide-react";
import { Button } from "@/components/common/Button";
import { Field } from "@/components/application-form/Field";
import { useAuth } from "@/context/AuthContext";
import { formatApiError } from "@/services/api";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const { login, adminLogin } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState("candidate");
  const [busy, setBusy] = useState(false);
  const [cand, setCand] = useState({ identifier: "", password: "" });
  const [admin, setAdmin] = useState({ email: "", password: "" });

  const onCand = (k, v) => setCand((s) => ({ ...s, [k]: v }));
  const onAdmin = (k, v) => setAdmin((s) => ({ ...s, [k]: v }));

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    try {
      if (tab === "candidate") {
        await login(cand);
        toast.success("Welcome back!");
        navigate("/dashboard");
      } else {
        await adminLogin(admin);
        toast.success("Admin login successful");
        navigate("/admin/dashboard");
      }
    } catch (err) {
      toast.error(formatApiError(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div data-testid="login-page">
      <h1 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900">
        {tab === "candidate" ? "Candidate Login" : "Admin Login"}
      </h1>
      <p className="mt-2 text-sm text-slate-500">
        {tab === "candidate"
          ? "Access your application status, admit card, and results."
          : "Sign in to the CET examination administration panel."}
      </p>

      <div className="mt-6 grid grid-cols-2 gap-2 rounded-lg bg-slate-100 p-1">
        <button
          onClick={() => setTab("candidate")}
          data-testid="login-tab-candidate"
          className={cn(
            "flex items-center justify-center gap-2 rounded-md py-2 text-sm font-semibold transition-colors",
            tab === "candidate" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
          )}
        >
          <LogIn className="h-4 w-4" /> Candidate
        </button>
        <button
          onClick={() => setTab("admin")}
          data-testid="login-tab-admin"
          className={cn(
            "flex items-center justify-center gap-2 rounded-md py-2 text-sm font-semibold transition-colors",
            tab === "admin" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
          )}
        >
          <ShieldCheck className="h-4 w-4" /> Admin
        </button>
      </div>

      <form onSubmit={submit} className="mt-6 space-y-5">
        {tab === "candidate" ? (
          <>
            <Field label="Email or Phone" name="identifier" value={cand.identifier} onChange={onCand} placeholder="Email or 10-digit phone" required testId="login-identifier" autoComplete="username" />
            <Field label="Password" name="password" type="password" value={cand.password} onChange={onCand} placeholder="Your password" required testId="login-password" autoComplete="current-password" />
          </>
        ) : (
          <>
            <Field label="Admin Email" name="email" type="email" value={admin.email} onChange={onAdmin} placeholder="admin@example.com" required testId="admin-login-email" autoComplete="username" />
            <Field label="Password" name="password" type="password" value={admin.password} onChange={onAdmin} placeholder="Your password" required testId="admin-login-password" autoComplete="current-password" />
          </>
        )}

        <Button as="button" type="submit" className="w-full" disabled={busy} data-testid="login-submit-btn">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign In"}
        </Button>
      </form>

      {tab === "candidate" && (
        <p className="mt-6 text-sm text-slate-500 text-center">
          New to CET?{" "}
          <Link to="/apply" className="font-semibold text-amber-600 hover:underline">
            Apply for the exam
          </Link>
        </p>
      )}
    </div>
  );
}
