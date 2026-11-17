import type { ReactNode } from 'react';
import type { SlideMeta } from '../../data/cbasSlides';

interface SlideFrameProps {
  meta: SlideMeta;
  totalSlides: number;
  children: ReactNode;
}

export function SlideFrame({ meta, totalSlides, children }: SlideFrameProps) {
  return (
    <article
      className="print-card bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden"
      aria-label={`圖卡 ${meta.number}：${meta.title}`}
    >
      {/* Top editorial header strip */}
      <header className="px-6 py-5 sm:px-8 sm:py-6 border-b border-slate-200 bg-slate-50/60 flex flex-col gap-2">
        <div className="flex items-center justify-between gap-4 text-xs font-medium text-slate-500">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="font-mono font-semibold text-sky-700 tabular-nums whitespace-nowrap">
              圖卡 {meta.number} / 0{totalSlides}
            </span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-700 font-semibold whitespace-nowrap">{meta.navGroup}</span>
            <span aria-hidden="true">·</span>
            <span className="whitespace-nowrap">範例標的：聚隆四 (14664)</span>
          </div>
          <span className="hidden sm:inline font-mono text-slate-400 tabular-nums whitespace-nowrap">
            CBAS 實戰教學簡報
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 text-balance">
          {meta.title}
        </h2>
        <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed max-w-4xl">
          {meta.subtitle}
        </p>
      </header>

      {/* Main Infographic Visual Stage */}
      <div className="p-6 sm:p-8">{children}</div>

      {/* Bottom Key Takeaway Strip */}
      <footer className="px-6 py-4 sm:px-8 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-baseline gap-2.5 text-sm">
          <span className="font-mono text-xs font-semibold text-sky-300 shrink-0">
            本頁重點
          </span>
          <span className="font-medium text-slate-100">{meta.keyTakeaway}</span>
        </div>
        <span className="font-mono text-xs text-slate-400 tabular-nums shrink-0">
          聚隆四 14664
        </span>
      </footer>
    </article>
  );
}
