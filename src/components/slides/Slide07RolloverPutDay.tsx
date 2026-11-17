import { AlertCircle, CalendarClock, CheckCircle2 } from 'lucide-react';
import { calcRolloverCost } from '../../utils/cbasMath';

export function Slide07RolloverPutDay() {
  const rollover = calcRolloverCost({
    discountRatePct: 3.2708,
    extraYears: 2,
    handlingFee: 0.2,
    lots: 10,
  });

  return (
    <div className="space-y-6">
      {/* Horizontal Timeline Diagram */}
      <section className="border border-slate-200 rounded-xl p-5 sm:p-6 bg-slate-50/70">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
          <div className="flex items-center gap-2">
            <CalendarClock className="w-5 h-5 text-sky-700 shrink-0" aria-hidden="true" />
            <h3 className="text-base font-bold text-slate-900">
              為什麼「選擇權到期日」不等於「整張 CB 最終到期日」？
            </h3>
          </div>
          <span className="text-xs font-semibold text-sky-700">
            綁定提前賣回日 (Put Day) 前 15 天
          </span>
        </div>

        {/* 4-Node Timeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <div className="font-mono text-xs font-bold text-slate-500 tabular-nums">2026/11/18</div>
            <div className="mt-1 text-sm font-bold text-slate-900">1. 合約生效日</div>
            <p className="mt-1 text-xs text-slate-600">
              先簽 1.54 年合約（565 天），不必一開始預繳 5 年貴利息，初期本金超省！
            </p>
          </div>

          <div className="bg-sky-50 border border-sky-200 rounded-lg p-4">
            <div className="font-mono text-xs font-bold text-sky-700 tabular-nums">2028/06/05</div>
            <div className="mt-1 text-sm font-bold text-slate-900">2. 選擇權到期日</div>
            <p className="mt-1 text-xs text-slate-700">
              訂在 Put Day 的<strong>前 15 天</strong>。若股票還沒漲完，可申請「轉合約續約」。
            </p>
          </div>

          <div className="bg-white border border-amber-200 rounded-lg p-4">
            <div className="font-mono text-xs font-bold text-amber-700 tabular-nums">2028/06/20</div>
            <div className="mt-1 text-sm font-bold text-slate-900">3. 提前賣回日 (Put Day)</div>
            <p className="mt-1 text-xs text-slate-600">
              讓投資人滿 2~3 年有權以 100 元賣回給公司的安全節點。
            </p>
          </div>

          <div className="bg-white border border-emerald-200 rounded-lg p-4">
            <div className="font-mono text-xs font-bold text-emerald-700 tabular-nums">+2 年後</div>
            <div className="mt-1 text-sm font-bold text-slate-900">4. CB 最終到期日</div>
            <p className="mt-1 text-xs text-slate-600">
              例：亞力二 (15142) 為 5 年期 (2030 到期)，因 2028/01/13 有 Put Day，目前先簽 1.11 年。
            </p>
          </div>
        </div>
      </section>

      {/* Bottom: Rollover Cost Comparison & Landlord Clause */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Initial vs Rollover Comparison */}
        <section className="lg:col-span-7 border border-slate-200 rounded-xl p-5 sm:p-6 bg-white space-y-4">
          <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-200">
            <h3 className="text-base font-bold text-slate-900">
              轉合約（續約）要付多少錢？免重付價差！
            </h3>
            <span className="font-mono text-xs font-bold text-emerald-700">超省續約公式</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-xs font-semibold text-slate-500">初次買進聚隆四 (前 1.54 年)</div>
              <div className="mt-1 font-mono text-2xl font-bold text-slate-900 tabular-nums">
                9.31 元 / 張
              </div>
              <div className="mt-2 text-xs text-slate-600 font-mono tabular-nums">
                價差 4.05 ＋ 利息手續費 5.26
              </div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
              <div className="text-xs font-bold text-emerald-800">
                轉合約續約 (再延後面 2 年)
              </div>
              <div className="mt-1 font-mono text-2xl font-bold text-emerald-700 tabular-nums">
                僅 {rollover.perBond.toFixed(2)} 元 / 張
              </div>
              <div className="mt-2 text-xs text-emerald-900 font-mono tabular-nums">
                10 張約 {(rollover.totalNtd / 10000).toFixed(2)} 萬元（免重付 4.05 元價差！）
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-900 text-white font-mono text-xs sm:text-sm tabular-nums">
            續約補繳 ＝ 100 × 年利率 3.2708% × 2 年 ＋ 0.2 元手續費 ≈ {rollover.perBond.toFixed(2)} 元
          </div>
        </section>

        {/* Landlord Clause Prerequisite */}
        <section className="lg:col-span-5 border border-amber-200 rounded-xl p-5 sm:p-6 bg-amber-50/50 flex flex-col justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-900 font-bold text-base">
              <AlertCircle className="w-5 h-5 text-amber-700 shrink-0" aria-hidden="true" />
              <h3>轉合約唯一前提：「房東條款」</h3>
            </div>
            <p className="mt-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
              轉合約就像跟房東「續租房子」，能否順利延長後面 2 年，必須同時符合兩項條件：
            </p>
          </div>

          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-800">
            <li className="flex items-start gap-2 bg-white border border-amber-200 rounded-lg p-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
              <span>到期時，該公司財務與信用依然良好（或仍有銀行擔保）</span>
            </li>
            <li className="flex items-start gap-2 bg-white border border-amber-200 rounded-lg p-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
              <span>券商端仍有授信額度願意繼續承作該檔標的</span>
            </li>
          </ul>

          <div className="text-xs font-semibold text-red-800 bg-red-50 border border-red-200 rounded-lg p-3 leading-relaxed">
            ⚠️ 若公司財務惡化導致券商風控拒絕續約，就必須在選擇權到期前把可轉債賣掉變現！
          </div>
        </section>
      </div>
    </div>
  );
}
