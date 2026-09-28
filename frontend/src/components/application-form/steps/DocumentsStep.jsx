import { UploadCloud, CheckCircle2, FileText } from "lucide-react";
import { StepShell } from "@/components/application-form/Field";

const DOCS = [
  { key: "photo", label: "Passport Photo", required: true, hint: "JPG/PNG, recent color photo" },
  { key: "signature", label: "Signature", required: true, hint: "JPG/PNG on white paper" },
  { key: "idProof", label: "ID Proof", required: false, hint: "Aadhaar / PAN / Passport (JPG/PNG/PDF)" },
  { key: "collegeId", label: "College ID Card", required: false, hint: "JPG/PNG/PDF" },
];

/** Step 8 — document uploads, available AFTER payment. */
export function DocumentsStep({ files, onFile, uploaded }) {
  return (
    <StepShell title="Upload Documents" description="Upload your photo and signature (required). ID proof and college ID are recommended.">
      <div className="grid sm:grid-cols-2 gap-5">
        {DOCS.map((d) => {
          const isUploaded = Boolean(uploaded?.[d.key]?.url);
          const picked = files?.[d.key];
          return (
            <label
              key={d.key}
              className="relative flex flex-col rounded-xl border-2 border-dashed border-slate-300 p-5 cursor-pointer hover:border-[#F5A623] transition-colors"
              data-testid={`doc-drop-${d.key}`}
            >
              <input
                type="file"
                accept="image/*,application/pdf"
                className="hidden"
                onChange={(e) => onFile(d.key, e.target.files[0])}
                data-testid={`doc-input-${d.key}`}
              />
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-800">
                  {d.label} {d.required && <span className="text-amber-600">*</span>}
                </span>
                {isUploaded ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                ) : (
                  <UploadCloud className="h-5 w-5 text-slate-400" />
                )}
              </div>
              <p className="mt-1 text-xs text-slate-500">{d.hint}</p>
              {(picked || isUploaded) && (
                <div className="mt-3 flex items-center gap-2 text-xs text-slate-700 bg-slate-50 rounded-md px-3 py-2">
                  <FileText className="h-4 w-4 text-amber-600" />
                  <span className="truncate">
                    {picked ? picked.name : isUploaded ? "Uploaded" : ""}
                  </span>
                </div>
              )}
            </label>
          );
        })}
      </div>
    </StepShell>
  );
}
