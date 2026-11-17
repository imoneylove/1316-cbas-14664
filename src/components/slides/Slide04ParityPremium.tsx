import { useMemo, useState } from 'react';
import { AlertTriangle, CheckCircle2, TrendingUp } from 'lucide-react';
import {
  calcBreakevenStockPrice,
  calcCbasRoiAtStockPrice,
  calcParity,
  calcPremiumRatePct,
} from '../../utils/cbasMath';

const MIN_STOCK = 10;
const MAX_STOCK = 140; // 現股 14.00 × 10 倍 = 140.00 元
const BASE_STOCK = 14.00; // 2026/11/16 收盤價
const CONV_PRICE = 18.60; // 2026/09/07 除息 0.20 元後調整
const ENTRY_CB_PRICE = 104.05;

const CHART_W = 680;
const CHART_H = 228;
const PAD_L = 58;
const PAD_R = 22;
const PAD_T = 26;
const PAD_B = 32;
const PLOT_W = CHART_W - PAD_L - PAD_R;
const PLOT_H = CHART_H - PAD_T - PAD_B;
const MIN_ROI = -200;
const MAX_ROI = 7200;

function toSvgX(price: number): number {
  return PAD_L + ((price - MIN_STOCK) / (MAX_STOCK - MIN_STOCK)) * PLOT_W;
}

function toSvgY(roiPct: number): number {
  const clamped = Math.max(MIN_ROI, Math.min(MAX_ROI, roiPct));
  return PAD_T + PLOT_H - ((clamped - MIN_ROI) / (MAX_ROI - MIN_ROI)) * PLOT_H;
}

export function Slide04ParityPremium() {
  const [stockPrice, setStockPrice] = useState<number>(BASE_STOCK);

  const parity = calcParity(stockPrice, CONV_PRICE);
  const premiumPct = calcPremiumRatePct(ENTRY_CB_PRICE, parity);
  const triggerStock = calcBreakevenStockPrice(ENTRY_CB_PRICE, CONV_PRICE); // 19.35
  const convertLossPct = Math.max(0, 100 - parity);

  const roiPoint = calcCbasRoiAtStockPrice({
    stockPrice,
    baseStockPrice: BASE_STOCK,
    conversionPrice: CONV_PRICE,
    entryCbPrice: ENTRY_CB_PRICE,
  });

  // Precompute curve points from 10 to 140 (10x stock price)
  const { cbasPath, stockPath } = useMemo(() => {
    const steps: number[] = [];
    for (let p = MIN_STOCK; p <= MAX_STOCK + 0.001; p += 2) {
      steps.push(Number(p.toFixed(2)));
    }
    for (const keyPrice of [14, 18.6, triggerStock, 28, 70, 140]) {
      if (!steps.includes(keyPrice)) {
        steps.push(keyPrice);
      }
    }
    steps.sort((a, b) => a - b);

    const cbasPts: string[] = [];
    const stockPts: string[] = [];

    for (const p of steps) {
      const pt = calcCbasRoiAtStockPrice({
        stockPrice: p,
        baseStockPrice: BASE_STOCK,
        conversionPrice: CONV_PRICE,
        entryCbPrice: ENTRY_CB_PRICE,
      });
      const x = toSvgX(p).toFixed(1);
      cbasPts.push(`${x},${toSvgY(pt.cbasRoiPct).toFixed(1)}`);
      stockPts.push(`${x},${toSvgY(pt.stockReturnPct).toFixed(1)}`);
    }

    return {
      cbasPath: `M ${cbasPts.join(' L ')}`,
      stockPath: `M ${stockPts.join(' L ')}`,
    };
  }, [triggerStock]);

  const curX = toSvgX(stockPrice);
  const curY = toSvgY(roiPoint.cbasRoiPct);
  const triggerX = toSvgX(triggerStock);
  const doubleX = toSvgX(28.0);
  const fiveX = toSvgX(70.0);
  const tenX = toSvgX(140.0);
  const zeroY = toSvgY(0);

  const presets = [
    { label: '今日收盤 14.00', value: 14.00, tone: 'slate' },
    { label: '轉換價 18.60', value: 18.60, tone: 'sky' },
    { label: '起爆 19.35', value: 19.35, tone: 'amber' },
    { label: '翻倍 28.00 (2x)', value: 28.00, tone: 'emerald' },
    { label: '5倍 70.00', value: 70.00, tone: 'emerald' },
    { label: '10倍 140.00', value: 140.00, tone: 'emerald' },
  ] as const;

  const stockMultiplier = stockPrice / BASE_STOCK;

  return (
    <div className="space-y-4">
      {/* 1. Top Simulator Bar: Stock Price + Corresponding CB Price side by side */}
      <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/70 space-y-3">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3">
          <div>
            <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
              <label htmlFor="stock-price-sim" className="text-sm font-bold text-slate-900 whitespace-nowrap">
                拖動模擬聚隆現股價格：
                <span className="font-mono text-xl text-sky-700 tabular-nums ml-1">
                  {stockPrice.toFixed(2)} 元
                </span>
                <span className="font-mono text-xs text-slate-500 tabular-nums ml-1.5">
                  ({stockMultiplier.toFixed(2)}x)
                </span>
              </label>

              <div className="text-sm font-bold text-slate-900 whitespace-nowrap">
                對應可轉債價格：
                <span className="font-mono text-xl text-emerald-700 tabular-nums ml-1">
                  {roiPoint.estimatedCbPrice.toFixed(2)} 元
                </span>
              </div>
            </div>

            <div className="text-xs text-slate-500 mt-1 font-mono tabular-nums">
              2026/11/16 收盤基準 14.00 元 │ 除息後轉換價 18.60 元 (每張換 5,376 股) │ 期初進場 CB 104.05 元
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {presets.map((preset) => {
              const active = Math.abs(stockPrice - preset.value) < 0.01;
              let btnClass =
                'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100';
              if (active) {
                if (preset.tone === 'emerald') btnClass = 'bg-emerald-700 text-white';
                else if (preset.tone === 'amber') btnClass = 'bg-amber-600 text-white';
                else if (preset.tone === 'sky') btnClass = 'bg-sky-700 text-white';
                else btnClass = 'bg-slate-900 text-white';
              }
              return (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => setStockPrice(preset.value)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer whitespace-nowrap transition-colors ${btnClass}`}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>
        </div>

        <input
          id="stock-price-sim"
          type="range"
          min={MIN_STOCK}
          max={MAX_STOCK}
          step={0.05}
          value={stockPrice}
          onChange={(e) => setStockPrice(Number(e.target.value))}
          className="w-full accent-sky-600 cursor-pointer"
        />
      </div>

      {/* 2. HERO TOP SECTION: 單張 CBAS 投報對照（直觀三步驟算式，一眼看懂投報率怎麼算） */}
      <section className="rounded-xl bg-slate-900 text-white p-4 sm:p-5 space-y-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-slate-700/80">
          <div>
            <h3 className="text-base font-bold text-white">
              重點：單張 CBAS 投報對照（花 9,310 元本金，投報率怎麼算？）
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              1 張 CB 代表 10 萬元債券面額，所以價格每差 1 元 ＝ 新台幣 1,000 元
            </p>
          </div>
          <div className="font-mono text-xs tabular-nums flex items-center gap-3 shrink-0">
            <span className="text-slate-300 whitespace-nowrap">
              單買現股：{roiPoint.stockReturnPct >= 0 ? '+' : ''}
              {roiPoint.stockReturnPct.toFixed(1)}%
            </span>
            <span className="text-slate-600" aria-hidden="true">
              vs
            </span>
            <span
              className={`font-bold whitespace-nowrap ${
                roiPoint.cbasRoiPct >= 0 ? 'text-emerald-400' : 'text-amber-300'
              }`}
            >
              CBAS：{roiPoint.cbasRoiPct >= 0 ? '+' : ''}
              {roiPoint.cbasRoiPct.toLocaleString(undefined, {
                minimumFractionDigits: 1,
                maximumFractionDigits: 1,
              })}
              %
            </span>
          </div>
        </div>

        {/* 3-Step Self-Explanatory Equation Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-stretch">
          {/* Step 1: Proceeds */}
          <div className="rounded-lg bg-slate-800/90 border border-slate-700 p-3.5 flex flex-col justify-between gap-1.5">
            <div className="text-xs font-semibold text-sky-300">
              步驟 ① 賣掉可轉債，券商匯給你多少？
            </div>
            <div className="font-mono text-xs text-slate-300 tabular-nums">
              (CB {roiPoint.estimatedCbPrice.toFixed(2)} − 券商尾款 {roiPoint.refStrikeAtExit.toFixed(2)}) × 1,000
            </div>
            <div className="font-mono text-xl sm:text-2xl font-bold text-white tabular-nums mt-0.5">
              領回 {roiPoint.proceeds1LotNtd.toLocaleString()} 元
            </div>
            <div className="text-[11px] text-slate-400">
              95.20 元為扣完退息後要還券商的借款
            </div>
          </div>

          {/* Step 2: Net Profit */}
          <div className="rounded-lg bg-slate-800/90 border border-slate-700 p-3.5 flex flex-col justify-between gap-1.5">
            <div className="text-xs font-semibold text-sky-300">
              步驟 ② 扣掉自己投入的 9,310 元本金
            </div>
            <div className="font-mono text-xs text-slate-300 tabular-nums">
              領回 {roiPoint.proceeds1LotNtd.toLocaleString()} − 本金 {roiPoint.initialCost1LotNtd.toLocaleString()}
            </div>
            <div
              className={`font-mono text-xl sm:text-2xl font-bold tabular-nums mt-0.5 ${
                roiPoint.netProfit1LotNtd >= 0 ? 'text-emerald-400' : 'text-amber-300'
              }`}
            >
              淨賺 {roiPoint.netProfit1LotNtd >= 0 ? '+' : ''}
              {roiPoint.netProfit1LotNtd.toLocaleString()} 元
            </div>
            <div className="text-[11px] text-slate-400">
              這才是真正多賺進口袋的純利潤
            </div>
          </div>

          {/* Step 3: ROI % */}
          <div className="rounded-lg bg-emerald-950/60 border border-emerald-500/40 p-3.5 flex flex-col justify-between gap-1.5">
            <div className="text-xs font-semibold text-emerald-300">
              步驟 ③ 投報率 ＝ 淨賺 ÷ 本金 9,310 元
            </div>
            <div className="font-mono text-xs text-emerald-200/80 tabular-nums">
              {roiPoint.netProfit1LotNtd.toLocaleString()} ÷ 9,310 × 100%
            </div>
            <div
              className={`font-mono text-2xl sm:text-3xl font-bold tabular-nums mt-0.5 ${
                roiPoint.cbasRoiPct >= 0 ? 'text-emerald-400' : 'text-amber-300'
              }`}
            >
              {roiPoint.cbasRoiPct >= 0 ? '+' : ''}
              {roiPoint.cbasRoiPct.toLocaleString(undefined, {
                minimumFractionDigits: 1,
                maximumFractionDigits: 1,
              })}
              %
            </div>
            <div className="text-[11px] text-emerald-200/80 font-mono tabular-nums">
              {roiPoint.netProfit1LotNtd > 0
                ? `相當於把 9,310 元本金翻賺 ${(roiPoint.netProfit1LotNtd / roiPoint.initialCost1LotNtd).toFixed(1)} 倍！`
                : '尚未跨過起爆價 19.35 元，尚未發動槓桿'}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Bottom Dual Stage: 10x Hockey-Stick Chart (Left) + Parity/Premium Indicators (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        {/* Left: 10x Hockey-Stick Curve */}
        <section className="lg:col-span-7 border border-slate-200 rounded-xl p-4 bg-white flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-700 shrink-0" aria-hidden="true" />
              <h3 className="text-sm font-bold text-slate-900">
                起爆到現股 10 倍（140 元）投報率曲線
              </h3>
            </div>
            <div className="flex items-center gap-3 text-[11px] font-semibold shrink-0">
              <span className="flex items-center gap-1.5 text-emerald-700">
                <span className="inline-block w-3 h-0.5 bg-emerald-600" />
                <span>CBAS 投報率</span>
              </span>
              <span className="flex items-center gap-1.5 text-slate-500">
                <span className="inline-block w-3 h-0.5 border-t border-dashed border-slate-500" />
                <span>單買現股</span>
              </span>
            </div>
          </div>

          <div className="w-full overflow-x-auto">
            <svg
              viewBox={`0 0 ${CHART_W} ${CHART_H}`}
              className="w-full h-auto min-w-[460px]"
              role="img"
              aria-label="CBAS 從 10 元到現股 10 倍 140 元投報率飆升曲線"
            >
              {/* Horizontal grid lines */}
              {[0, 2000, 4000, 6000].map((val) => {
                const y = toSvgY(val);
                return (
                  <g key={val}>
                    <line
                      x1={PAD_L}
                      y1={y}
                      x2={CHART_W - PAD_R}
                      y2={y}
                      stroke={val === 0 ? '#94A3B8' : '#E2E8F0'}
                      strokeWidth={val === 0 ? 1.2 : 1}
                    />
                    <text
                      x={PAD_L - 8}
                      y={y + 4}
                      textAnchor="end"
                      fontSize="10"
                      fill="#64748B"
                      fontFamily="IBM Plex Mono, monospace"
                    >
                      {val > 0 ? `+${val.toLocaleString()}%` : `${val}%`}
                    </text>
                  </g>
                );
              })}

              {/* Shaded explosive zone after 19.35 */}
              <rect
                x={triggerX}
                y={PAD_T}
                width={CHART_W - PAD_R - triggerX}
                height={PLOT_H}
                fill="#ECFDF5"
                opacity="0.55"
              />

              {/* Key Milestone Vertical Guides */}
              <line
                x1={triggerX}
                y1={PAD_T}
                x2={triggerX}
                y2={PAD_T + PLOT_H}
                stroke="#D97706"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />
              <text
                x={triggerX - 3}
                y={PAD_T + 12}
                textAnchor="end"
                fontSize="10"
                fontWeight="700"
                fill="#B45309"
              >
                起爆 19.35
              </text>

              <line
                x1={doubleX}
                y1={PAD_T}
                x2={doubleX}
                y2={PAD_T + PLOT_H}
                stroke="#0284C7"
                strokeWidth="1.2"
                strokeDasharray="3 3"
              />
              <text
                x={doubleX + 4}
                y={PAD_T + 26}
                textAnchor="start"
                fontSize="10"
                fontWeight="700"
                fill="#0369A1"
              >
                翻倍 28元 (+494%)
              </text>

              <line
                x1={fiveX}
                y1={PAD_T}
                x2={fiveX}
                y2={PAD_T + PLOT_H}
                stroke="#059669"
                strokeWidth="1.2"
                strokeDasharray="3 3"
              />
              <text
                x={fiveX}
                y={PAD_T + 12}
                textAnchor="middle"
                fontSize="10"
                fontWeight="700"
                fill="#047857"
              >
                5倍 70元 (+2,920%)
              </text>

              <line
                x1={tenX}
                y1={PAD_T}
                x2={tenX}
                y2={PAD_T + PLOT_H}
                stroke="#065F46"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />
              <text
                x={tenX - 8}
                y={PAD_T + 56}
                textAnchor="end"
                fontSize="10"
                fontWeight="700"
                fill="#065F46"
              >
                10倍 140元 (+6,962%)
              </text>

              {/* Stock baseline return dashed curve */}
              <path
                d={stockPath}
                fill="none"
                stroke="#64748B"
                strokeWidth="1.75"
                strokeDasharray="5 4"
              />

              {/* CBAS ROI curve */}
              <path
                d={cbasPath}
                fill="none"
                stroke="#059669"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* X-axis labels */}
              {[14, 28, 70, 105, 140].map((p) => (
                <text
                  key={p}
                  x={toSvgX(p)}
                  y={CHART_H - 10}
                  textAnchor="middle"
                  fontSize="10"
                  fill={p === 14 ? '#0F172A' : '#64748B'}
                  fontWeight={p === 14 ? '700' : '500'}
                  fontFamily="IBM Plex Mono, monospace"
                >
                  {p}元
                </text>
              ))}

              {/* Current interactive crosshair & dot */}
              <line
                x1={curX}
                y1={PAD_T}
                x2={curX}
                y2={zeroY}
                stroke="#0F172A"
                strokeWidth="1"
                strokeDasharray="2 2"
              />
              <circle
                cx={curX}
                cy={curY}
                r="6"
                fill={stockPrice >= triggerStock ? '#059669' : '#0284C7'}
                stroke="#FFFFFF"
                strokeWidth="2"
              />
            </svg>
          </div>
        </section>

        {/* Right: Parity & Premium Rate Cards */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-4">
          {/* Card 1: Parity */}
          <section className="border border-slate-200 rounded-xl p-4 bg-white flex-1 flex flex-col justify-between gap-2.5">
            <div>
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-bold text-slate-900">1. Parity（換股理論價值）</h3>
                <span className="font-mono text-[11px] text-slate-500">(100÷18.60)×股價</span>
              </div>
              <div className="mt-1.5 flex items-baseline justify-between">
                <span className="font-mono text-xs text-slate-500 tabular-nums">
                  5.3763 × {stockPrice.toFixed(2)} ＝
                </span>
                <span className="font-mono text-2xl font-bold text-slate-900 tabular-nums">
                  {parity.toFixed(2)}%
                </span>
              </div>
              <div className="mt-2 relative h-2.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-150 ${
                    parity >= 100 ? 'bg-emerald-600' : 'bg-sky-600'
                  }`}
                  style={{ width: `${Math.min(100, (parity / 200) * 100)}%` }}
                />
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-slate-900"
                  style={{ left: `${(100 / 200) * 100}%` }}
                  aria-hidden="true"
                />
              </div>
            </div>

            {parity < 100 ? (
              <div className="flex items-start gap-2 text-xs text-amber-900 bg-amber-50 border border-amber-200 rounded-lg p-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  低於 100%，現在換股會現虧 <strong className="font-mono">{convertLossPct.toFixed(2)}%</strong>，絕不換股！
                </span>
              </div>
            ) : (
              <div className="flex items-start gap-2 text-xs text-emerald-900 bg-emerald-50 border border-emerald-200 rounded-lg p-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  已過 100%（換股值 <strong className="font-mono">{parity.toFixed(2)} 元</strong>），與股票 1:1 同步起飛！
                </span>
              </div>
            )}
          </section>

          {/* Card 2: Premium Rate */}
          <section className="border border-slate-200 rounded-xl p-4 bg-white flex-1 flex flex-col justify-between gap-2.5">
            <div>
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-bold text-slate-900">2. 溢(折)價率（起爆門檻）</h3>
                <span className="font-mono text-[11px] text-slate-500">(104.05−Parity)÷Parity</span>
              </div>
              <div className="mt-1.5 flex items-baseline justify-between">
                <span className="font-mono text-xs text-slate-500 tabular-nums">
                  對比進場價 104.05：
                </span>
                <span
                  className={`font-mono text-2xl font-bold tabular-nums ${
                    premiumPct > 0 ? 'text-amber-700' : 'text-emerald-700'
                  }`}
                >
                  {premiumPct > 0 ? `+${premiumPct.toFixed(2)}%` : `${premiumPct.toFixed(2)}%`}
                </span>
              </div>
            </div>

            <div className="text-xs text-slate-700 leading-relaxed bg-slate-50 border border-slate-200 rounded-lg p-2.5">
              {stockPrice < triggerStock ? (
                <span>
                  需從 <strong className="font-mono">{stockPrice.toFixed(2)}</strong> 元漲過{' '}
                  <strong className="font-mono text-amber-700">{triggerStock.toFixed(2)} 元</strong>（CB 追平 104.05），過線即點火飆升！
                </span>
              ) : (
                <span className="text-emerald-800 font-medium">
                  已突破 <strong className="font-mono">{triggerStock.toFixed(2)} 元</strong> 起爆點！現股每漲 1 元，CB 就暴衝 <strong className="font-mono">+5.38 元</strong>（淨賺 +5,380 元/張）！
                </span>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
