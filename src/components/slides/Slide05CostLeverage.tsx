import { useState } from 'react';
import { calcCbasCost } from '../../utils/cbasMath';

export function Slide05CostLeverage() {
  const [lots, setLots] = useState<number>(10);

  const cost = calcCbasCost({
    cbPrice: 104.05,
    discountRatePct: 3.2708,
    daysRemaining: 565,
    handlingFee: 0.197,
    lots,
  });

  return (
    <div className="space-y-6">
      {/* Formula Header Strip */}
      <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-slate-500">實際權利金拆解公式</div>
          <div className="mt-1 font-mono text-sm sm:text-base font-bold text-slate-900">
            所有支付額 ＝ ① 超過 100 元價差 ＋ ② 持有期間總利息 ＋ ③ 券商手續費
          </div>
          <div className="mt-1 text-xs text-slate-600">
            註：報價表上的「權利金百元報價 (<span className="font-mono font-semibold text-slate-900">5.26 元</span>)」已幫你把 ②＋③ 算好！
          </div>
        </div>

        {/* Interactive Lot Selector */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-semibold text-slate-600 whitespace-nowrap">張數試算：</span>
          {[10, 20, 50].map((qty) => (
            <button
              key={qty}
              type="button"
              onClick={() => setLots(qty)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold cursor-pointer transition-colors tabular-nums whitespace-nowrap shrink-0 ${
                lots === qty
                  ? 'bg-slate-900 text-white'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {qty} 張{qty === 10 ? ' (低消)' : ''}
            </button>
          ))}
        </div>
      </div>

      {/* 3-Step Visual Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border border-amber-200 bg-amber-50/50 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 text-xs font-bold text-amber-800">
              <span className="whitespace-nowrap">① 超過 100 元的價差</span>
              <span className="whitespace-nowrap shrink-0">必自付</span>
            </div>
            <div className="mt-2 font-mono text-3xl font-bold text-slate-900 tabular-nums whitespace-nowrap">
              {cost.spreadAbovePut.toFixed(2)} <span className="text-sm font-medium text-slate-600">元 / 張</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-amber-200/80 text-xs text-slate-700 leading-relaxed">
            <div className="font-mono text-slate-800 tabular-nums">市價 104.05 − 賣回價 100 = 4.05</div>
            <div className="mt-1 text-slate-600">超過 100 元的部分，券商不幫忙出，須自己掏腰包。</div>
          </div>
        </div>

        <div className="border border-sky-200 bg-sky-50/50 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 text-xs font-bold text-sky-800">
              <span className="whitespace-nowrap">② 持有期間總利息 (565 天)</span>
              <span className="whitespace-nowrap shrink-0">含於百元報價</span>
            </div>
            <div className="mt-2 font-mono text-3xl font-bold text-slate-900 tabular-nums whitespace-nowrap">
              {cost.prepaidInterest.toFixed(3)} <span className="text-sm font-medium text-slate-600">元 / 張</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-sky-200/80 text-xs text-slate-700 leading-relaxed">
            <div className="font-mono text-slate-800 tabular-nums">100 × 3.2708% × (565 ÷ 365) = 5.063</div>
            <div className="mt-1 text-slate-600">2026/11/18 生效至 2028/06/05，台中銀擔保利率僅 3.2708%。</div>
          </div>
        </div>

        <div className="border border-slate-200 bg-slate-50/70 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 text-xs font-bold text-slate-700">
              <span className="whitespace-nowrap">③ 券商手續費</span>
              <span className="whitespace-nowrap shrink-0">含於百元報價</span>
            </div>
            <div className="mt-2 font-mono text-3xl font-bold text-slate-900 tabular-nums whitespace-nowrap">
              0.197 <span className="text-sm font-medium text-slate-600">元 / 張</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-200 text-xs text-slate-700 leading-relaxed">
            <div className="font-mono text-slate-800 tabular-nums">
              百元報價 ＝ 5.063 ＋ 0.197 ＝ 5.26 元
            </div>
            <div className="mt-1 text-slate-600">固定收約 0.2 元，②＋③ 合計就是報價表上的 5.26 元。</div>
          </div>
        </div>
      </div>

      {/* Visual Leverage Bar Comparison + KPI Result */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Stacked Proportion Chart */}
        <div className="lg:col-span-7 border border-slate-200 rounded-xl p-5 bg-white flex flex-col justify-between gap-4">
          <div className="text-sm font-bold text-slate-900">
            資金比例視覺圖：誰出大錢？誰小錢撬大車？
          </div>

          <div className="space-y-4">
            {/* Full Market Value Bar */}
            <div>
              <div className="flex justify-between gap-2 text-xs font-semibold text-slate-700 mb-1.5">
                <span>你控制的聚隆四部位總市值 ({lots} 張)</span>
                <span className="font-mono text-slate-900 tabular-nums whitespace-nowrap shrink-0">
                  {cost.controlledMarketValueNtd.toLocaleString()} 元
                </span>
              </div>
              <div className="h-10 rounded-lg overflow-hidden flex border border-slate-200 text-xs font-bold">
                <div
                  className="bg-slate-200 text-slate-800 flex items-center justify-center px-2 truncate"
                  style={{ width: '96.1%' }}
                >
                  券商墊付 100 元保底本金 ({(lots * 100000).toLocaleString()} 元)
                </div>
                <div
                  className="bg-amber-400 text-slate-950 flex items-center justify-center px-1 min-w-[44px] font-mono tabular-nums"
                  style={{ width: '3.9%' }}
                >
                  4.05
                </div>
              </div>
            </div>

            {/* Investor Cash Outlay Bar */}
            <div>
              <div className="flex justify-between gap-2 text-xs font-semibold text-sky-800 mb-1.5">
                <span>你實際掏出的 CBAS 權利金 ({lots} 張)</span>
                <span className="font-mono text-sky-700 tabular-nums whitespace-nowrap shrink-0">
                  {cost.totalCostNtd.toLocaleString()} 元（僅佔{' '}
                  {((cost.totalCostNtd / cost.controlledMarketValueNtd) * 100).toFixed(2)}%）
                </span>
              </div>
              <div className="h-10 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden flex">
                <div
                  className="bg-amber-400 text-slate-950 flex items-center justify-center text-[11px] font-bold"
                  style={{ width: '3.9%' }}
                  title="價差 4.05"
                />
                <div
                  className="bg-sky-600 text-white flex items-center justify-center text-[11px] font-bold px-1.5 whitespace-nowrap"
                  style={{ width: '5.05%' }}
                  title="百元報價 5.26"
                />
                <div className="flex-1 flex items-center pl-3 text-xs font-mono font-semibold text-slate-600 tabular-nums truncate">
                  ← 只付這小段 {cost.totalPerBond.toFixed(2)} 元/張 (4.05 價差 + 5.26 百元報價)
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Big Leverage KPI Card */}
        <div className="lg:col-span-5 rounded-xl bg-slate-900 text-white p-6 flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>槓桿倍數 ＝ 可轉債市價 ÷ 所有支付額</span>
            <span className="font-mono tabular-nums">{lots} 張合計</span>
          </div>

          <div className="grid grid-cols-2 gap-4 items-end">
            <div>
              <div className="text-xs text-slate-400">單張實付 / 總掏出</div>
              <div className="mt-1 font-mono text-2xl font-bold text-white tabular-nums">
                {cost.totalPerBond.toFixed(2)} 元
              </div>
              <div className="font-mono text-sm text-sky-300 tabular-nums">
                合計 {cost.totalCostNtd.toLocaleString()} 元
              </div>
            </div>

            <div className="border-l border-slate-700 pl-4">
              <div className="text-xs text-emerald-300 font-semibold">資金放大倍率</div>
              <div className="mt-1 font-mono text-4xl font-bold text-emerald-400 tabular-nums">
                {cost.leverageMultiplier.toFixed(2)}x
              </div>
              <div className="font-mono text-xs text-slate-300 tabular-nums">
                相當於 {cost.leveragePct}% 槓桿
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-300 leading-relaxed pt-3 border-t border-slate-800 font-mono tabular-nums">
            104.05 ÷ 9.31 ＝ {cost.leverageMultiplier.toFixed(2)} 倍（控制 {(cost.controlledMarketValueNtd / 10000).toFixed(2)} 萬部位）
          </div>
        </div>
      </div>
    </div>
  );
}
