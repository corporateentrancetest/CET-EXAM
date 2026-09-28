import { useEffect, useState } from "react";
import { FileText, Download, Award, Clock, CheckCircle2, LogOut, CreditCard, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Logo } from "@/components/common/Logo";
import { Button } from "@/components/common/Button";
import { useAuth } from "@/context/AuthContext";
import { applicationService } from "@/services/applicationService";
import { KEY_DATES } from "@/constants";

const STATUS_META = {
  draft: { label: "Draft — Incomplete", cls: "bg-slate-100 text-slate-700", icon: AlertCircle },
  payment_pending: { label: "Payment Pending", cls: "bg-amber-100 text-amber-800", icon: CreditCard },
  paid: { label: "Paid — Complete Your Application", cls: "bg-blue-100 text-blue-800", icon: CheckCircle2 },
  submitted: { label: "Submitted", cls: "bg-green-100 text-green-800", icon: CheckCircle2 },
};

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const [app, setApp] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    applicationService
      .getMine()
      .then(setApp)
      .catch(() => setApp(null))
      .finally(() => setLoading(false));
  }, []);

  const status = app?.status || "draft";
  const meta = STATUS_META[status] || STATUS_META.draft;
  const StatusIcon = meta.icon;
  const submitted = status === "submitted";

  return (
    <div className="min-h-screen bg-slate-50" data-testid="dashboard-page">
      {/* Portal top bar */}
      <div className="bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/">
            <Logo dark />
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-sm text-slate-300">{user?.fullName || user?.email}</span>
            <button onClick={logout} className="text-slate-300 hover:text-white" data-testid="dashboard-logout-btn" aria-label="Log out">
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {/* Welcome header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900">
              Welcome, {user?.fullName?.split(" ")[0] || "Candidate"}
            </h1>
            <p className="text-sm text-slate-500 mt-1">CET 2027 — Candidate Portal</p>
          </div>
          <span className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${meta.cls}`} data-testid="dashboard-status-badge">
            <StatusIcon className="h-4 w-4" /> {meta.label}
          </span>
        </div>

        {loading ? (
          <div className="mt-10 text-slate-400">Loading…</div>
        ) : (
          <>
            {!submitted && (
              <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                  <p className="text-sm text-amber-900">
                    Your application is not yet submitted. Continue where you left off — your progress is saved.
                  </p>
                </div>
                <Button to="/apply" size="sm" data-testid="dashboard-continue-btn">
                  Continue Application
                </Button>
              </div>
            )}

            <div className="mt-8 grid lg:grid-cols-3 gap-6">
              {/* Application card */}
              <div className="lg:col-span-2 rounded-2xl bg-white border border-slate-200 p-6">
                <div className="flex items-center gap-2 text-slate-500 mb-4">
                  <FileText className="h-5 w-5 text-amber-600" />
                  <span className="text-xs font-bold uppercase tracking-wider">Application Summary</span>
                </div>
                <div className="grid sm:grid-cols-2 gap-y-3 gap-x-6 text-sm">
                  <div className="flex justify-between border-b border-slate-100 py-2">
                    <span className="text-slate-500">Application No.</span>
                    <span className="font-semibold text-slate-900">{app?.applicationNumber || "—"}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 py-2">
                    <span className="text-slate-500">Fee Status</span>
                    <span className="font-semibold text-slate-900 capitalize">{app?.payment?.status || "unpaid"}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 py-2">
                    <span className="text-slate-500">College</span>
                    <span className="font-semibold text-slate-900">{app?.academic?.college || "—"}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 py-2">
                    <span className="text-slate-500">Exam City</span>
                    <span className="font-semibold text-slate-900">{app?.preferences?.examCity || "—"}</span>
                  </div>
                </div>
              </div>

              {/* Admit card + results */}
              <div className="space-y-6">
                <div className="rounded-2xl bg-white border border-slate-200 p-6">
                  <Download className="h-6 w-6 text-amber-600" />
                  <h3 className="mt-3 font-heading font-bold text-slate-900">Admit Card</h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Available closer to the exam date (Jan 2027).
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4 w-full"
                    disabled={!submitted}
                    data-testid="dashboard-admit-card-btn"
                    onClick={() => {}}
                  >
                    {submitted ? "Download (soon)" : "Submit application first"}
                  </Button>
                </div>
                <div className="rounded-2xl bg-white border border-slate-200 p-6">
                  <Award className="h-6 w-6 text-amber-600" />
                  <h3 className="mt-3 font-heading font-bold text-slate-900">Results & Rank</h3>
                  <p className="mt-1 text-sm text-slate-500">
                    National Rank & Corporate Readiness Report — published after the exam.
                  </p>
                </div>
              </div>
            </div>

            {/* Key dates */}
            <div className="mt-8 rounded-2xl bg-white border border-slate-200 p-6">
              <div className="flex items-center gap-2 text-slate-500 mb-4">
                <Clock className="h-5 w-5 text-amber-600" />
                <span className="text-xs font-bold uppercase tracking-wider">Important Dates</span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {KEY_DATES.map(([e, d]) => (
                  <div key={e} className="rounded-lg bg-slate-50 border border-slate-100 p-3">
                    <div className="text-xs text-slate-500">{e}</div>
                    <div className="text-sm font-semibold text-slate-900">{d}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
