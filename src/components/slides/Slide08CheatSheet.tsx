import { CHEAT_SHEET_ITEMS } from '../../data/cbasSlides';

const ACCENT_SURFACE: Record<string, string> = {
  sky: 'bg-sky-50/70 border-sky-200',
  emerald: 'bg-emerald-50/70 border-emerald-200',
  amber: 'bg-amber-50/70 border-amber-200',
  slate: 'bg-slate-50 border-slate-200',
};

const ACCENT_FORMULA_TEXT: Record<string, string> = {
  sky: 'text-sky-800',
  emerald: 'text-emerald-800',
  amber: 'text-amber-800',
  slate: 'text-slate-900',
};

export function Slide08CheatSheet() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {CHEAT_SHEET_ITEMS.map((item) => (
        <section
          key={item.num}
          className={`rounded-xl border p-5 flex flex-col justify-between gap-4 ${ACCENT_SURFACE[item.accent]}`}
        >
          <div>
            <div className="flex items-center justify-between gap-2 text-xs font-semibold text-slate-500">
              <span className="font-mono tabular-nums whitespace-nowrap shrink-0">口訣 {item.num}</span>
              <span className="whitespace-nowrap shrink-0">聚隆四驗證</span>
            </div>
            <h3 className="mt-1 text-base font-bold text-slate-900">{item.name}</h3>
            <div
              className={`mt-3 font-mono text-sm font-bold bg-white border border-slate-200 rounded-lg px-3 py-2.5 tabular-nums ${ACCENT_FORMULA_TEXT[item.accent]}`}
            >
              {item.formula}
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-mono font-semibold text-slate-800 bg-white/80 rounded-md px-2.5 py-1.5 border border-slate-200/80 tabular-nums">
              範例：{item.juloongExample}
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">{item.takeaway}</p>
          </div>
        </section>
      ))}
    </div>
  );
}
