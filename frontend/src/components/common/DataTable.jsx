import { cn } from "@/lib/utils";

/** Responsive data table with the official navy header style. */
export function DataTable({ columns, rows, testId, className }) {
  return (
    <div
      data-testid={testId}
      className={cn("border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm overflow-x-auto", className)}
    >
      <table className="w-full min-w-[420px] border-collapse">
        {columns && (
          <thead>
            <tr className="bg-slate-900 text-white">
              {columns.map((c) => (
                <th
                  key={c}
                  className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-slate-100"
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 1 ? "bg-slate-50/70" : "bg-white"}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={cn(
                    "px-5 py-3.5 text-sm border-b border-slate-100 last:border-b-0",
                    j === 0 ? "font-semibold text-slate-900" : "text-slate-600"
                  )}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
