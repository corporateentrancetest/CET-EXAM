import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  Users, FileText, IndianRupee, CheckCircle2, Search, LogOut, X, Eye, Filter,
} from "lucide-react";
import { Logo } from "@/components/common/Logo";
import { useAuth } from "@/context/AuthContext";
import { adminService } from "@/services/paymentService";
import { cn } from "@/lib/utils";

const STATUS_OPTIONS = ["all", "draft", "payment_pending", "paid", "submitted"];
const STATUS_CLS = {
  draft: "bg-slate-100 text-slate-700",
  payment_pending: "bg-amber-100 text-amber-800",
  paid: "bg-blue-100 text-blue-800",
  submitted: "bg-green-100 text-green-800",
};

function StatCard({ icon: Icon, label, value, accent }) {
  return (
    <div className="rounded-xl bg-white border border-slate-200 p-5" data-testid={`admin-stat-${label.toLowerCase().replace(/\s+/g, "-")}`}>
      <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", accent)}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="mt-4 font-heading text-2xl font-extrabold text-slate-900">{value}</div>
      <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mt-1">{label}</div>
    </div>
  );
}

export default function AdminDashboardPage() {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState(null);
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadStats = useCallback(() => adminService.stats().then(setStats).catch(() => {}), []);

  const loadList = useCallback(() => {
    setLoading(true);
    adminService
      .applications({ page, limit: 10, status, search })
      .then((d) => {
        setRows(d.items);
        setTotal(d.total);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [page, status, search]);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  useEffect(() => {
    const t = setTimeout(loadList, 300);
    return () => clearTimeout(t);
  }, [loadList]);

  async function changeStatus(id, newStatus) {
    await adminService.updateStatus(id, newStatus);
    loadList();
    loadStats();
    setSelected((s) => (s && s._id === id ? { ...s, status: newStatus } : s));
  }

  return (
    <div className="min-h-screen bg-slate-100" data-testid="admin-dashboard-page">
      {/* Admin top bar */}
      <div className="bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/">
              <Logo dark />
            </Link>
            <span className="hidden sm:inline text-xs font-bold uppercase tracking-widest text-[#F5A623] border-l border-slate-700 pl-3">
              Admin Panel
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-sm text-slate-300">{user?.email}</span>
            <button onClick={logout} className="text-slate-300 hover:text-white" data-testid="admin-logout-btn" aria-label="Log out">
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="font-heading text-2xl font-bold text-slate-900">Examination Dashboard</h1>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard icon={Users} label="Candidates" value={stats?.totalCandidates ?? "—"} accent="bg-slate-900 text-[#F5A623]" />
          <StatCard icon={FileText} label="Applications" value={stats?.totalApplications ?? "—"} accent="bg-blue-50 text-blue-600" />
          <StatCard icon={CheckCircle2} label="Submitted" value={stats?.submitted ?? "—"} accent="bg-green-50 text-green-600" />
          <StatCard icon={IndianRupee} label="Paid" value={stats?.paidCount ?? "—"} accent="bg-amber-50 text-amber-600" />
          <StatCard icon={IndianRupee} label="Revenue" value={stats ? `₹${stats.revenue}` : "—"} accent="bg-slate-900 text-[#F5A623]" />
        </div>

        {/* Filters */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              value={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
              placeholder="Search by name, email, phone, or application no."
              data-testid="admin-search-input"
              className="cet-input pl-9"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-slate-400" />
            <select
              value={status}
              onChange={(e) => {
                setPage(1);
                setStatus(e.target.value);
              }}
              data-testid="admin-status-filter"
              className="cet-input bg-white w-auto"
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s === "all" ? "All statuses" : s.replace("_", " ")}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="mt-4 rounded-xl border border-slate-200 bg-white overflow-hidden overflow-x-auto">
          <table className="w-full min-w-[720px]">
            <thead className="bg-slate-900 text-white">
              <tr>
                {["Application No.", "Candidate", "Contact", "Status", "Fee", ""].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-slate-400">Loading…</td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-slate-400">No applications found.</td>
                </tr>
              ) : (
                rows.map((r) => (
                  <tr key={r._id} className="border-b border-slate-100 hover:bg-slate-50" data-testid={`admin-row-${r._id}`}>
                    <td className="px-4 py-3 text-sm font-semibold text-slate-900">{r.applicationNumber}</td>
                    <td className="px-4 py-3 text-sm text-slate-700">
                      {r.candidate?.fullName || r.personal?.fullName || "—"}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-500">
                      <div>{r.candidate?.email}</div>
                      <div className="text-xs">{r.candidate?.phone}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn("inline-block rounded-full px-2.5 py-1 text-xs font-semibold capitalize", STATUS_CLS[r.status])}>
                        {r.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-700 capitalize">{r.payment?.status || "unpaid"}</td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => setSelected(r)}
                        className="inline-flex items-center gap-1 text-sm font-semibold text-amber-600 hover:text-amber-700"
                        data-testid={`admin-view-${r._id}`}
                      >
                        <Eye className="h-4 w-4" /> View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-slate-500">Total: {total}</span>
          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              data-testid="admin-prev-page"
              className="rounded-md border border-slate-300 px-3 py-1.5 disabled:opacity-40"
            >
              Prev
            </button>
            <button
              disabled={page * 10 >= total}
              onClick={() => setPage((p) => p + 1)}
              data-testid="admin-next-page"
              className="rounded-md border border-slate-300 px-3 py-1.5 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Detail drawer */}
      {selected && (
        <div className="fixed inset-0 z-50 flex justify-end" data-testid="admin-detail-drawer">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSelected(null)} />
          <div className="relative w-full max-w-md bg-white h-full overflow-y-auto shadow-xl">
            <div className="sticky top-0 bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-widest text-[#F5A623]">Application</div>
                <div className="font-heading font-bold">{selected.applicationNumber}</div>
              </div>
              <button onClick={() => setSelected(null)} data-testid="admin-drawer-close" aria-label="Close">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 space-y-5 text-sm">
              <DetailBlock title="Candidate" rows={[
                ["Name", selected.candidate?.fullName || selected.personal?.fullName],
                ["Email", selected.candidate?.email],
                ["Phone", selected.candidate?.phone],
              ]} />
              <DetailBlock title="Personal" rows={[
                ["DOB", selected.personal?.dateOfBirth],
                ["Gender", selected.personal?.gender],
                ["Category", selected.personal?.category],
                ["ID", selected.personal?.idType && `${selected.personal.idType} · ${selected.personal.idNumber || ""}`],
              ]} />
              <DetailBlock title="Academic" rows={[
                ["College", selected.academic?.college],
                ["Course", selected.academic?.course],
                ["Grad Year", selected.academic?.graduationYear],
                ["CGPA", selected.academic?.cgpa],
              ]} />
              <DetailBlock title="Preferences" rows={[
                ["Exam City", selected.preferences?.examCity],
                ["Interview", selected.preferences?.interviewMode],
                ["Interest", selected.preferences?.careerInterest],
              ]} />
              <DetailBlock title="Payment" rows={[
                ["Status", selected.payment?.status],
                ["Amount", selected.payment?.amount && `₹${selected.payment.amount}`],
                ["Method", selected.payment?.method],
              ]} />

              {selected.documents?.photo?.url && (
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Photo</div>
                  <img src={selected.documents.photo.url} alt="candidate" className="h-28 w-24 object-cover rounded-md border" />
                </div>
              )}

              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Update Status</div>
                <div className="flex flex-wrap gap-2">
                  {["draft", "paid", "submitted"].map((s) => (
                    <button
                      key={s}
                      onClick={() => changeStatus(selected._id, s)}
                      data-testid={`admin-set-status-${s}`}
                      className={cn(
                        "rounded-md px-3 py-1.5 text-xs font-semibold capitalize border",
                        selected.status === s ? "bg-slate-900 text-white border-slate-900" : "border-slate-300 text-slate-600 hover:border-[#F5A623]"
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DetailBlock({ title, rows }) {
  return (
    <div>
      <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">{title}</div>
      <div className="rounded-lg border border-slate-200">
        {rows.map(([l, v]) => (
          <div key={l} className="flex justify-between px-3 py-2 border-b border-slate-100 last:border-0">
            <span className="text-slate-500">{l}</span>
            <span className="font-medium text-slate-900 text-right">{v || "—"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
