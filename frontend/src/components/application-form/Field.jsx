import { cn } from "@/lib/utils";

const labelCls = "block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5";

export function Field({ label, name, type = "text", value, onChange, placeholder, required, testId, autoComplete }) {
  return (
    <div>
      <label className={labelCls} htmlFor={name}>
        {label} {required && <span className="text-amber-600">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value || ""}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        data-testid={testId}
        className="cet-input"
      />
    </div>
  );
}

export function SelectField({ label, name, value, onChange, options, required, testId }) {
  return (
    <div>
      <label className={labelCls} htmlFor={name}>
        {label} {required && <span className="text-amber-600">*</span>}
      </label>
      <select
        id={name}
        name={name}
        value={value || ""}
        onChange={(e) => onChange(name, e.target.value)}
        data-testid={testId}
        className="cet-input bg-white"
      >
        <option value="">Select…</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

export function TextAreaField({ label, name, value, onChange, placeholder, testId, rows = 3 }) {
  return (
    <div>
      <label className={labelCls} htmlFor={name}>
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        value={value || ""}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder={placeholder}
        data-testid={testId}
        className="cet-input resize-none"
      />
    </div>
  );
}

export function StepShell({ title, description, children, className }) {
  return (
    <div className={cn("animate-fade-up", className)}>
      <h2 className="font-heading text-xl sm:text-2xl font-bold text-slate-900">{title}</h2>
      {description && <p className="mt-1.5 text-sm text-slate-500">{description}</p>}
      <div className="mt-6 space-y-5">{children}</div>
    </div>
  );
}
