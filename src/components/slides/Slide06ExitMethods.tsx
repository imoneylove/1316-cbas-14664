import { AlertOctagon, ArrowRight, Banknote, RotateCcw } from 'lucide-react';

export function Slide06ExitMethods() {
  return (
    <div className="space-y-6">
      {/* Top: Early Exit Interest Refund Mechanism */}
      <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <RotateCcw className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              提早出場福利：沒用到的天數，利息「按日退還」！
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-slate-700 leading-relaxed">
              第一天已預繳 565 天總利息 (<span className="font-mono font-semibold">5.063 元</span>)。提早出場時，券商把「剩餘未到期天數的利息」從 100 元本金扣掉，抱越短、退越多！
            </p>
          </div>
        </div>

        <div className="bg-white border border-emerald-200 rounded-lg px-4 py-3 shrink-0">
          <div className="text-[11px] font-semibold text-slate-500">報價表「參考履約價」算法</div>
          <div className="font-mono text-base font-bold text-emerald-800 tabular-nums mt-0.5">
            100 − 5.063 ＝ 94.9370 元
          </div>
        </div>
      </div>

      {/* Middle: Dual Exit Path Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* Method A */}
        <section className="border border-sky-200 rounded-xl p-5 sm:p-6 bg-white flex flex-col justify-between gap-4">
          <div>
            <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-200">
              <h3 className="text-lg font-bold text-slate-900">
                方法 A：提前解約（90% 投資人首選）
              </h3>
              <span className="font-mono text-xs font-bold text-sky-700">免備百萬本金</span>
            </div>

            <p className="mt-3 text-xs sm:text-sm text-slate-600">
              假設 1 個月後聚隆大漲，聚隆四從 <span className="font-mono font-semibold">104.05 元</span>漲到{' '}
              <span className="font-mono font-semibold text-slate-900">130 元</span>，直接打電話請券商「提前解約」：
            </p>

            {/* 4-Step Flow */}
            <ol className="mt-4 space-y-2.5 text-xs sm:text-sm">
              <li className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-700">1. 券商於二級市場直接賣出 10 張</span>
                <span className="font-mono font-bold text-slate-900 tabular-nums whitespace-nowrap shrink-0">賣得 130.0 萬元</span>
              </li>
              <li className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-700">2. 扣掉還券商尾款 (已退剩餘 1 年多利息)</span>
                <span className="font-mono font-bold text-slate-700 tabular-nums whitespace-nowrap shrink-0">− 95.2 萬元</span>
              </li>
              <li className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-sky-50 border border-sky-200">
                <span className="font-semibold text-sky-900">3. 券商直接匯進你戶頭的差額</span>
                <span className="font-mono font-bold text-sky-800 tabular-nums whitespace-nowrap shrink-0">34.8 萬元</span>
              </li>
            </ol>
          </div>

          <div className="rounded-xl bg-slate-900 text-white p-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Banknote className="w-5 h-5 text-emerald-400 shrink-0" aria-hidden="true" />
              <div>
                <div className="text-xs text-slate-400">扣除期初權利金 9.31 萬元</div>
                <div className="text-sm font-bold">實際淨賺入袋</div>
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="font-mono text-2xl font-bold text-emerald-400 tabular-nums whitespace-nowrap">
                +25.49 萬
              </div>
              <div className="font-mono text-xs text-emerald-300 tabular-nums whitespace-nowrap">
                報酬率高達 +273%
              </div>
            </div>
          </div>
        </section>

        {/* Method B */}
        <section className="border border-slate-200 rounded-xl p-5 sm:p-6 bg-slate-50/60 flex flex-col justify-between gap-4">
          <div>
            <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-200">
              <h3 className="text-lg font-bold text-slate-900">
                方法 B：實物交割（領回換成股票賣）
              </h3>
              <span className="font-mono text-xs font-semibold text-slate-600">需備履約尾款</span>
            </div>

            <p className="mt-3 text-xs sm:text-sm text-slate-600">
              假設聚隆現股大漲到 <span className="font-mono font-semibold text-slate-900">25 元</span>（遠高於除息後轉換價 18.60 元），想領回真正股票去股市賣：
            </p>

            {/* 3-Step Horizontal / Vertical Flow */}
            <div className="mt-4 space-y-2.5 text-xs sm:text-sm">
              <div className="p-3 rounded-lg bg-white border border-slate-200 flex items-center justify-between gap-2">
                <span className="text-slate-700">1. 先匯尾款給券商領回 10 張 CB</span>
                <span className="font-mono font-bold text-slate-900 tabular-nums whitespace-nowrap shrink-0">匯出 95.2 萬元</span>
              </div>

              <div className="flex justify-center text-slate-400" aria-hidden="true">
                <ArrowRight className="w-4 h-4 rotate-90" />
              </div>

              <div className="p-3 rounded-lg bg-white border border-slate-200 flex items-center justify-between gap-2">
                <span className="text-slate-700">2. 申請「債券轉換成聚隆股票」</span>
                <span className="font-mono font-bold text-sky-700 tabular-nums whitespace-nowrap shrink-0">換得 53.763 張</span>
              </div>

              <div className="flex justify-center text-slate-400" aria-hidden="true">
                <ArrowRight className="w-4 h-4 rotate-90" />
              </div>

              <div className="p-3 rounded-lg bg-white border border-emerald-200 flex items-center justify-between gap-2">
                <span className="text-slate-700">3. 股票市價 25 元賣出拿回現金</span>
                <span className="font-mono font-bold text-emerald-700 tabular-nums whitespace-nowrap shrink-0">拿回 134.4 萬元</span>
              </div>
            </div>
          </div>

          {/* Blackout Warning Box */}
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 flex items-start gap-3">
            <AlertOctagon className="w-5 h-5 text-red-700 shrink-0 mt-0.5" aria-hidden="true" />
            <div className="text-xs text-red-950 leading-relaxed">
              <strong className="text-red-800">避雷提醒（停止轉換起迄日）：</strong>
              換股前必看報價表最右側！例如聚隆四在{' '}
              <span className="font-mono font-bold tabular-nums">2026/08/19 ~ 09/13</span>{' '}
              因配股配息（除息 0.20 元）停止轉換，停轉期間不能換股，只能用「方法 A」直接賣可轉債！
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
