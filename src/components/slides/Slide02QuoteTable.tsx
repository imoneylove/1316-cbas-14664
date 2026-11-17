import { useState } from 'react';
import { QUOTE_COLUMN_TIPS, QUOTE_ROWS, type QuoteColumnTip } from '../../data/cbasSlides';

export function Slide02QuoteTable() {
  const [selectedColKey, setSelectedColKey] = useState<QuoteColumnTip['key']>('convPrice');

  const activeTip =
    QUOTE_COLUMN_TIPS.find((item) => item.key === selectedColKey) ?? QUOTE_COLUMN_TIPS[0];

  const colHighlight = (key: QuoteColumnTip['key']) =>
    selectedColKey === key
      ? 'bg-sky-50 text-sky-900 font-bold ring-1 ring-inset ring-sky-300'
      : '';

  return (
    <div className="space-y-5">
      {/* Interactive Column Selector */}
      <div>
        <div className="text-xs font-semibold text-slate-500 mb-2">
          點選報價表欄位，立即查看「聚隆四 (14664)」的欄位拆解說明：
        </div>
        <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="報價表欄位說明切換">
          {QUOTE_COLUMN_TIPS.map((tip) => {
            const active = tip.key === selectedColKey;
            return (
              <button
                key={tip.key}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSelectedColKey(tip.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  active
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {tip.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Column Explanation Panel */}
      <div className="rounded-xl border border-sky-200 bg-sky-50/70 p-4 sm:p-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        <div className="md:col-span-4">
          <div className="text-xs font-semibold text-sky-700">聚隆四 (14664) 對應數值</div>
          <div className="mt-1 font-mono text-2xl font-bold text-slate-900 tabular-nums">
            {activeTip.juloongValue}
          </div>
          <div className="text-xs font-medium text-slate-600 mt-0.5">{activeTip.label}</div>
        </div>
        <div className="md:col-span-8 space-y-1.5">
          <p className="text-sm text-slate-800 leading-relaxed font-medium">{activeTip.summary}</p>
          {activeTip.formula && (
            <div className="font-mono text-xs text-sky-800 bg-white border border-sky-200 rounded-md px-3 py-1.5 inline-block tabular-nums">
              計算式：{activeTip.formula}
            </div>
          )}
        </div>
      </div>

      {/* Mock Live Quote Table */}
      <div className="border border-slate-200 rounded-xl overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[820px]">
          <thead>
            <tr className="bg-slate-900 text-white text-xs">
              <th className="py-2.5 px-3 font-semibold whitespace-nowrap">代號 / 名稱</th>
              <th className="py-2.5 px-3 font-semibold text-right whitespace-nowrap">CB 市價</th>
              <th className="py-2.5 px-3 font-semibold text-right whitespace-nowrap">現股價</th>
              <th className="py-2.5 px-3 font-semibold text-right whitespace-nowrap">轉換價</th>
              <th className="py-2.5 px-3 font-semibold text-right whitespace-nowrap">Parity</th>
              <th className="py-2.5 px-3 font-semibold text-right whitespace-nowrap">溢(折)價率</th>
              <th className="py-2.5 px-3 font-semibold text-right whitespace-nowrap">百元報價</th>
              <th className="py-2.5 px-3 font-semibold text-right whitespace-nowrap">折現率</th>
              <th className="py-2.5 px-3 font-semibold text-right whitespace-nowrap">參考履約價</th>
              <th className="py-2.5 px-3 font-semibold whitespace-nowrap">選擇權到期 / Put Day</th>
              <th className="py-2.5 px-3 font-semibold whitespace-nowrap">停止轉換事由</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-xs sm:text-[13px]">
            {QUOTE_ROWS.map((row) => (
              <tr
                key={row.code}
                className={
                  row.isFocus
                    ? 'bg-sky-50/30 font-medium text-slate-900'
                    : 'bg-white text-slate-700 hover:bg-slate-50/80'
                }
              >
                <td className="py-3 px-3 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-900 tabular-nums">
                      {row.code}
                    </span>
                    <span className="font-bold text-slate-900">{row.name}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{row.guarantee}</div>
                </td>
                <td className="py-3 px-3 text-right font-mono tabular-nums">
                  {row.cbPrice.toFixed(2)}
                </td>
                <td className="py-3 px-3 text-right font-mono tabular-nums">
                  {row.stockPrice.toFixed(2)}
                </td>
                <td
                  className={`py-3 px-3 text-right font-mono tabular-nums ${
                    row.isFocus ? colHighlight('convPrice') : ''
                  }`}
                >
                  {row.convPrice.toFixed(2)}
                </td>
                <td
                  className={`py-3 px-3 text-right font-mono tabular-nums ${
                    row.isFocus ? colHighlight('parity') : ''
                  }`}
                >
                  {row.parity.toFixed(2)}%
                </td>
                <td
                  className={`py-3 px-3 text-right font-mono tabular-nums ${
                    row.premiumPct > 100 ? 'text-red-700 font-bold' : ''
                  } ${row.isFocus ? colHighlight('premiumPct') : ''}`}
                >
                  +{row.premiumPct.toFixed(2)}%
                </td>
                <td
                  className={`py-3 px-3 text-right font-mono tabular-nums ${
                    row.isFocus ? colHighlight('hundredQuote') : ''
                  }`}
                >
                  {row.hundredQuote.toFixed(2)}
                </td>
                <td
                  className={`py-3 px-3 text-right font-mono tabular-nums ${
                    row.isFocus ? colHighlight('discountRate') : ''
                  }`}
                >
                  {row.discountRate.toFixed(4)}%
                </td>
                <td
                  className={`py-3 px-3 text-right font-mono tabular-nums ${
                    row.isFocus ? colHighlight('refStrike') : ''
                  }`}
                >
                  {row.refStrike.toFixed(4)}
                </td>
                <td
                  className={`py-3 px-3 font-mono text-xs tabular-nums whitespace-nowrap ${
                    row.isFocus ? colHighlight('optExpiry') : ''
                  }`}
                >
                  <div>{row.optExpiry}</div>
                  <div className="text-[11px] text-slate-500">Put: {row.putDay}</div>
                </td>
                <td
                  className={`py-3 px-3 text-xs whitespace-nowrap ${
                    row.isFocus ? colHighlight('stopReason') : ''
                  }`}
                >
                  {row.stopReason}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Concise row context notes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-600">
        <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
          <span className="font-bold text-slate-900">聚隆四 (14664)：</span>
          台中銀擔保、利率僅 3.2708%，各項指標平衡的教科書範例。
        </div>
        <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
          <span className="font-bold text-slate-900">亞力二 (15142)：</span>
          5 年期 CB（2030 到期），因 2028/01/13 有滿 3 年 Put Day，合約只先簽 1.11 年。
        </div>
        <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
          <span className="font-bold text-slate-900">雙鍵二 / 易發一：</span>
          分別示範「溢價 183% 太遠白等」與「市價 146.8 元價差太大低槓桿」。
        </div>
      </div>
    </div>
  );
}
