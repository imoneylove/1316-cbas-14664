import { useState } from 'react';
import { ArrowRight, CalendarCheck2, Gift, ShieldCheck } from 'lucide-react';
import { calcConversionShares, calcConversionSheets } from '../../utils/cbasMath';

export function Slide03FormulaDilution() {
  // Default to the real 2026/09/07 post-ex-dividend adjusted conversion price 18.60
  const [simConvPrice, setSimConvPrice] = useState<number>(18.60);

  const origSheets = calcConversionSheets(18.80);
  const origShares = calcConversionShares(18.80);
  const currentSheets = calcConversionSheets(simConvPrice);
  const currentShares = calcConversionShares(simConvPrice);
  const bonusShares = currentShares - origShares;
  const bonusSheets = currentSheets - origSheets;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
      {/* Left: Core Soul Formula + 2026/09/07 Real Ex-Dividend Verification */}
      <section className="lg:col-span-5 border border-slate-200 rounded-xl p-5 sm:p-6 bg-slate-50/70 flex flex-col justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-sky-700">第一條靈魂公式</div>
          <h3 className="mt-1 text-lg font-bold text-slate-900">
            1 張可轉債可換成幾「張」股票？
          </h3>

          <div className="mt-3 bg-white border border-slate-200 rounded-xl p-4 text-center">
            <div className="font-mono text-lg sm:text-xl font-bold text-slate-900 tabular-nums">
              100 ÷ 轉換價格
            </div>
            <div className="text-xs text-slate-500 mt-1">
              面額 100,000 元 ÷ 轉換價格 ＝ 可換幾「股」
            </div>
          </div>
        </div>

        {/* Real 2026/09/07 Ex-Dividend Empirical Fact Box */}
        <div className="bg-white border border-sky-200 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between gap-2 text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-sky-800">
              <CalendarCheck2 className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>1466 聚隆 實證除息查核</span>
            </span>
            <span className="font-mono text-slate-500 tabular-nums">2026/09/07 除息</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 border border-slate-200 rounded-lg p-3">
            <div>
              <span className="text-slate-500">現金股利：</span>
              <span className="font-mono font-bold text-slate-900 tabular-nums">0.20 元</span>
            </div>
            <div>
              <span className="text-slate-500">停轉期間：</span>
              <span className="font-mono font-semibold text-slate-800 tabular-nums">08/19–09/13</span>
            </div>
            <div className="col-span-2 text-[11px] text-slate-600 font-mono tabular-nums">
              除息前收盤 15.95 元 ➔ 除息參考價 15.75 元
            </div>
          </div>

          <div className="flex items-center justify-between gap-2">
            <div className="text-center flex-1 p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <div className="text-[11px] text-slate-500">原始轉換價 18.80</div>
              <div className="font-mono text-base font-bold text-slate-800 tabular-nums mt-0.5">
                5.3191 張
              </div>
              <div className="font-mono text-[11px] text-slate-500 tabular-nums">5,319 股</div>
            </div>

            <ArrowRight className="w-4 h-4 text-emerald-600 shrink-0" aria-hidden="true" />

            <div className="text-center flex-1 p-2.5 rounded-lg bg-emerald-50 border border-emerald-200">
              <div className="text-[11px] text-emerald-800 font-semibold">除息後 18.60</div>
              <div className="font-mono text-base font-bold text-emerald-900 tabular-nums mt-0.5">
                5.3763 張
              </div>
              <div className="font-mono text-[11px] text-emerald-700 font-bold tabular-nums">
                5,376 股 (+57股)
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            除息 0.20 元後依反稀釋調整為 <strong className="font-mono text-slate-900">18.60 元</strong>，每張聚隆四真實多出{' '}
            <strong className="font-mono text-emerald-700">+57 股 (+0.057 張)</strong>，低消 10 張直接多送{' '}
            <strong className="font-mono text-emerald-700">+570 股</strong>！
          </p>
        </div>
      </section>

      {/* Right: Anti-Dilution Interactive Simulator */}
      <section className="lg:col-span-7 border border-slate-200 rounded-xl p-5 sm:p-6 bg-white flex flex-col justify-between gap-5">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <Gift className="w-5 h-5 text-emerald-600 shrink-0" aria-hidden="true" />
              <h3 className="text-lg font-bold text-slate-900">
                反稀釋條款（「變相配息」）互動對照
              </h3>
            </div>
            <span className="text-xs font-semibold text-emerald-700">
              除權息自動調降轉換價
            </span>
          </div>

          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            公司每年發放股利時，為了保護可轉債持有人不被除權息稀釋，規定「轉換價格必須向下調降」。分母變小，固定一張債券能換到的股票就自動變多！
          </p>
        </div>

        {/* Interactive Preset & Slider */}
        <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label htmlFor="conv-price-slider" className="text-sm font-bold text-slate-900">
              轉換價情境：<span className="font-mono text-sky-700 tabular-nums">{simConvPrice.toFixed(2)} 元</span>
            </label>
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                onClick={() => setSimConvPrice(18.80)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                  simConvPrice === 18.80
                    ? 'bg-slate-900 text-white'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                原始發行 18.80
              </button>
              <button
                type="button"
                onClick={() => setSimConvPrice(18.60)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                  simConvPrice === 18.60
                    ? 'bg-emerald-700 text-white'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                2026/09 除息後 18.60 (+57股)
              </button>
              <button
                type="button"
                onClick={() => setSimConvPrice(17.50)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                  simConvPrice === 17.50
                    ? 'bg-sky-700 text-white'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                假設再配息 17.50
              </button>
            </div>
          </div>

          <input
            id="conv-price-slider"
            type="range"
            min={16.5}
            max={18.8}
            step={0.05}
            value={simConvPrice}
            onChange={(e) => setSimConvPrice(Number(e.target.value))}
            className="w-full accent-emerald-600 cursor-pointer"
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-white border border-slate-200 rounded-lg p-3.5">
              <div className="text-xs text-slate-500">原始發行 (18.80 元)</div>
              <div className="font-mono text-lg font-bold text-slate-700 tabular-nums mt-1">
                {origSheets.toFixed(4)} 張
              </div>
              <div className="font-mono text-xs text-slate-500 tabular-nums">
                {origShares.toLocaleString()} 股
              </div>
            </div>

            <div className="bg-white border border-emerald-200 rounded-lg p-3.5">
              <div className="text-xs text-emerald-700 font-semibold">調整後可換股數</div>
              <div className="font-mono text-lg font-bold text-emerald-700 tabular-nums mt-1">
                {currentSheets.toFixed(4)} 張
              </div>
              <div className="font-mono text-xs text-emerald-700 tabular-nums">
                {currentShares.toLocaleString()} 股
              </div>
            </div>

            <div className="bg-emerald-700 text-white rounded-lg p-3.5">
              <div className="text-xs text-emerald-100">每張真實多出股數</div>
              <div className="font-mono text-lg font-bold tabular-nums mt-1">
                +{bonusShares.toLocaleString()} 股
              </div>
              <div className="font-mono text-[11px] text-emerald-100 tabular-nums mt-0.5">
                (+{bonusSheets.toFixed(3)} 張 │ 10張 +{(bonusShares * 10).toLocaleString()} 股)
              </div>
            </div>
          </div>
        </div>

        {/* Tax-Free Advantage */}
        <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" />
          <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            <span className="font-bold text-slate-900">雙重免稅優勢：</span>
            這次配發 <span className="font-mono font-bold text-slate-900">0.20 元</span> 現金股利，雖沒直接領現金，但每張聚隆四真實增加{' '}
            <span className="font-mono font-bold text-emerald-800">57 股</span>，而且{' '}
            <span className="font-bold text-emerald-800">全免股利所得稅</span> 與{' '}
            <span className="font-bold text-emerald-800">二代健保補充保費</span>！
          </div>
        </div>
      </section>
    </div>
  );
}
