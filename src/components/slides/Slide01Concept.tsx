import { ArrowRight, ShieldCheck, TrendingUp, Wallet, Landmark } from 'lucide-react';

export function Slide01Concept() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
      {/* Left: What is CB (攻守兼備) */}
      <section className="lg:col-span-5 border border-slate-200 rounded-xl p-5 sm:p-6 bg-slate-50/70 flex flex-col justify-between gap-5">
        <div>
          <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-200">
            <h3 className="text-lg font-bold text-slate-900">1. 什麼是可轉債 (CB)？</h3>
            <span className="font-mono text-xs font-semibold text-slate-500 tabular-nums">
              面額 10 萬元 / 張
            </span>
          </div>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            本質是公司債券（報價表以 <span className="font-mono font-semibold text-slate-900">100 元</span> 為基準），同時附帶「把債券換成股票」的權利。
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
          <div className="bg-white border border-sky-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-sky-700 font-bold text-sm">
              <TrendingUp className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>進可攻：股價大漲跟著賺</span>
            </div>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
              當股價漲破「轉換價」，可把債券換成股票拿到股市賣出，賺取資本利得。
            </p>
          </div>

          <div className="bg-white border border-emerald-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
              <ShieldCheck className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>退可守：賣回日 100 元保底</span>
            </div>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
              就算股價沒漲甚至大跌，抱到賣回日 (Put Day)，公司保證以 <span className="font-mono font-semibold text-slate-900">100 元（10 萬本金）</span>買回。
            </p>
          </div>
        </div>
      </section>

      {/* Right: CB Full Purchase vs CBAS Asset Swap */}
      <section className="lg:col-span-7 border border-slate-200 rounded-xl p-5 sm:p-6 bg-white flex flex-col justify-between gap-5">
        <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-200">
          <h3 className="text-lg font-bold text-slate-900">2. 什麼是資產交換 (CBAS)？</h3>
          <span className="font-mono text-xs font-semibold text-sky-700">
            小資金開大車的核心
          </span>
        </div>

        {/* Visual Comparison Flow */}
        <div className="space-y-4">
          {/* Traditional CB */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span className="text-sm font-bold text-slate-700">傳統做法：直接買 10 張可轉債</span>
              <span className="font-mono text-base font-bold text-slate-900 tabular-nums">
                需自備 104 萬＋
              </span>
            </div>
            <div className="w-full h-9 rounded-lg bg-slate-300 flex items-center justify-center text-xs font-bold text-slate-800">
              全部 104.05 萬本金自己掏腰包（門檻極高）
            </div>
          </div>

          {/* Arrow Transition */}
          <div className="flex items-center justify-center gap-3 text-xs font-bold text-sky-700">
            <span className="h-px flex-1 bg-slate-200" />
            <span className="flex items-center gap-1.5">
              <span>券商拆解合約</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
              <span>投資人租下上漲獲利權</span>
            </span>
            <span className="h-px flex-1 bg-slate-200" />
          </div>

          {/* CBAS Split */}
          <div className="p-4 rounded-xl bg-sky-50/70 border border-sky-200">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span className="text-sm font-bold text-slate-900">
                CBAS 做法：用不到 10 萬元控制 104 萬元部位
              </span>
              <span className="font-mono text-base font-bold text-sky-700 tabular-nums">
                實付 9.31 萬元（11.18x）
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-stretch">
              <div className="sm:col-span-8 bg-white border border-slate-200 rounded-lg p-3.5 flex items-center gap-3">
                <Landmark className="w-5 h-5 text-slate-500 shrink-0" aria-hidden="true" />
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    券商出資 <span className="font-mono tabular-nums">100 萬元</span> 保底本金
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    每張 100 元基本盤由券商墊付
                  </div>
                </div>
              </div>

              <div className="sm:col-span-4 bg-sky-600 text-white rounded-lg p-3.5 flex items-center gap-2.5">
                <Wallet className="w-5 h-5 text-sky-100 shrink-0" aria-hidden="true" />
                <div>
                  <div className="text-xs font-bold">你只付 9.31 萬元</div>
                  <div className="text-[11px] text-sky-100 mt-0.5">
                    超過100元價差＋利息＋手續費
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom concise takeaway box */}
        <div className="grid grid-cols-3 gap-3 pt-2 border-t border-slate-100 text-center">
          <div>
            <div className="text-xs text-slate-500">最低申購單位</div>
            <div className="font-mono text-base font-bold text-slate-900 tabular-nums mt-0.5">10 張</div>
          </div>
          <div>
            <div className="text-xs text-slate-500">聚隆四實付權利金</div>
            <div className="font-mono text-base font-bold text-sky-700 tabular-nums mt-0.5">93,100 元</div>
          </div>
          <div>
            <div className="text-xs text-slate-500">未來上漲獲利權</div>
            <div className="font-mono text-base font-bold text-emerald-700 tabular-nums mt-0.5">100% 歸你</div>
          </div>
        </div>
      </section>
    </div>
  );
}
