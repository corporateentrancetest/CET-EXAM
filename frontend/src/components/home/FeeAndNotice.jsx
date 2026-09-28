import { Calendar } from "lucide-react";
import { Button } from "@/components/common/Button";
import { DataTable } from "@/components/common/DataTable";
import { FEE_SECTION, REGISTRATION_NOTICE, KEY_DATES, SITE } from "@/constants";

export function FeeAndNotice() {
  return (
    <section className="bg-slate-50/60 py-16 sm:py-20 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8">
        {/* Fee */}
        <div className="rounded-2xl border border-slate-200 bg-white p-7 sm:p-9 shadow-sm">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900">
            {FEE_SECTION.heading}
          </h2>
          <div className="mt-6 flex items-end justify-between rounded-xl bg-amber-50 border border-amber-200 px-6 py-5">
            <div>
              <div className="text-sm font-semibold text-slate-600">{FEE_SECTION.category}</div>
            </div>
            <div className="text-right">
              <div className="font-heading text-4xl font-extrabold text-slate-900">₹{SITE.examFee}</div>
              <div className="text-xs text-slate-500">(inclusive of applicable charges)</div>
            </div>
          </div>
          <p className="mt-5 text-sm text-slate-600 leading-relaxed">{FEE_SECTION.note}</p>
          <div className="mt-6">
            <Button to="/apply" data-testid="fee-apply-btn">
              Apply for Exam
            </Button>
          </div>
        </div>

        {/* Notice + Key dates */}
        <div className="rounded-2xl border border-amber-200 bg-[#FFFBEB] p-7 sm:p-9">
          <div className="flex items-center gap-2 text-amber-700 mb-3">
            <Calendar className="h-5 w-5" />
            <span className="text-xs font-bold uppercase tracking-widest">Official Notification</span>
          </div>
          <h2 className="font-heading text-xl sm:text-2xl font-bold text-slate-900">
            {REGISTRATION_NOTICE.heading}
          </h2>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed">{REGISTRATION_NOTICE.body}</p>
          <div className="mt-6">
            <DataTable columns={["Event", "Date"]} rows={KEY_DATES} testId="key-dates-table" />
          </div>
        </div>
      </div>
    </section>
  );
}
