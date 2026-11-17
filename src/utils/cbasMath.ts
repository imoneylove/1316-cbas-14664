export interface CbasCostInput {
  cbPrice: number; // e.g., 104.05
  putPrice?: number; // default 100
  discountRatePct: number; // e.g., 3.2708
  daysRemaining: number; // e.g., 565
  handlingFee: number; // e.g., 0.197
  lots?: number; // default 10
}

export interface CbasCostResult {
  spreadAbovePut: number; // ① 超過100元價差
  prepaidInterest: number; // ② 持有期間總利息
  hundredDollarQuote: number; // 權利金百元報價 (② + ③)
  totalPerBond: number; // 單張所有支付額 (① + ② + ③)
  totalCostNtd: number; // 總支付新台幣 (元)
  controlledMarketValueNtd: number; // 控制的債券市值 (元)
  leverageMultiplier: number; // 槓桿倍數 (x)
  leveragePct: number; // 槓桿放大百分比 (%)
  refStrikePrice: number; // 參考履約價 (100 - prepaidInterest)
}

export interface MethodAProfitInput {
  exitCbPrice: number; // e.g., 130
  refStrikeAtExit: number; // e.g., 95.2
  initialTotalPerBond: number; // e.g., 9.31
  lots?: number; // default 10
}

export interface MethodAProfitResult {
  proceedsPerBond: number; // 差額匯入單張 (元)
  totalProceedsNtd: number; // 總匯入金額 (元)
  initialCostNtd: number; // 期初投入總成本 (元)
  netProfitNtd: number; // 淨賺金額 (元)
  roiPct: number; // 報酬率 (%)
}

export interface RolloverCostInput {
  discountRatePct: number; // e.g., 3.2708
  extraYears: number; // e.g., 2
  handlingFee: number; // e.g., 0.2
  lots?: number; // default 10
}

export interface CbasRoiCurvePoint {
  stockPrice: number;
  parity: number;
  estimatedCbPrice: number;
  refStrikeAtExit: number;
  proceedsPerBond: number;
  stockReturnPct: number;
  cbasRoiPct: number;
  initialCost1LotNtd: number;
  proceeds1LotNtd: number;
  netProfit1LotNtd: number;
}

export function roundTo(value: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.round((value + Number.EPSILON) * factor) / factor;
}

/**
 * 1 張可轉債可換成幾「張」股票 ＝ 100 ÷ 轉換價格
 */
export function calcConversionSheets(conversionPrice: number): number {
  if (conversionPrice <= 0) return 0;
  return roundTo(100 / conversionPrice, 4);
}

/**
 * 1 張可轉債可換成幾「股」股票 ＝ 100,000 ÷ 轉換價格
 */
export function calcConversionShares(conversionPrice: number): number {
  if (conversionPrice <= 0) return 0;
  return Math.round(100000 / conversionPrice);
}

/**
 * Parity (理論價值 %) ＝ (100 ÷ 轉換價格) × 現股價格
 */
export function calcParity(stockPrice: number, conversionPrice: number): number {
  if (conversionPrice <= 0 || stockPrice < 0) return 0;
  return roundTo((100 / conversionPrice) * stockPrice, 2);
}

/**
 * 溢(折)價率 (%) ＝ (可轉債價格 － Parity) ÷ Parity × 100
 */
export function calcPremiumRatePct(cbPrice: number, parity: number): number {
  if (parity <= 0) return 0;
  return roundTo(((cbPrice - parity) / parity) * 100, 2);
}

/**
 * 股價需漲到多少元，Parity 才會追上目前 CB 市價
 * 回本現股價（起爆門檻） ＝ CB市價 × 轉換價 ÷ 100
 */
export function calcBreakevenStockPrice(cbPrice: number, conversionPrice: number): number {
  if (conversionPrice <= 0) return 0;
  return roundTo((cbPrice * conversionPrice) / 100, 2);
}

/**
 * 計算現股在不同價格下的單張 CBAS 投報率與現股漲幅（用於圖卡 04 飆升曲線與即時模擬）
 * 以單張投入 9,310 元為基準，直接對照投入 9 千多元本金可淨賺多少元。
 */
export function calcCbasRoiAtStockPrice(params: {
  stockPrice: number;
  baseStockPrice?: number; // default 14.00 (2026/11/16 close)
  conversionPrice?: number; // default 18.60 (post ex-div)
  entryCbPrice?: number; // default 104.05
  initialCostPerBond?: number; // default 9.31 (9,310 NTD per bond)
  refStrikeAtExit?: number; // default 95.20 (1-month early exit with interest refund)
}): CbasRoiCurvePoint {
  const baseStockPrice = params.baseStockPrice ?? 14.00;
  const conversionPrice = params.conversionPrice ?? 18.60;
  const entryCbPrice = params.entryCbPrice ?? 104.05;
  const initialCostPerBond = params.initialCostPerBond ?? 9.31;
  const refStrikeAtExit = params.refStrikeAtExit ?? 95.20;

  const parity = calcParity(params.stockPrice, conversionPrice);
  const stockReturnPct = roundTo(((params.stockPrice - baseStockPrice) / baseStockPrice) * 100, 1);

  // Conservative CB price model:
  // Below entry Parity (104.05), CB holds near bond floor + option value.
  // Above entry Parity (104.05), CB tracks Parity 1:1.
  let estimatedCbPrice: number;
  if (parity >= entryCbPrice) {
    estimatedCbPrice = parity;
  } else if (params.stockPrice >= baseStockPrice) {
    const ratio = (parity - calcParity(baseStockPrice, conversionPrice)) /
      Math.max(1, entryCbPrice - calcParity(baseStockPrice, conversionPrice));
    estimatedCbPrice = roundTo(entryCbPrice + Math.max(0, ratio) * 0.45, 2);
  } else {
    const downRatio = Math.max(0, params.stockPrice / baseStockPrice);
    estimatedCbPrice = roundTo(100.5 + downRatio * (entryCbPrice - 100.5), 2);
  }

  const proceedsPerBond = roundTo(estimatedCbPrice - refStrikeAtExit, 2);
  const initialCost1LotNtd = Math.round(initialCostPerBond * 1000);
  const proceeds1LotNtd = Math.round(proceedsPerBond * 1000);
  const netProfit1LotNtd = proceeds1LotNtd - initialCost1LotNtd;
  const cbasRoiPct = roundTo((netProfit1LotNtd / initialCost1LotNtd) * 100, 1);

  return {
    stockPrice: roundTo(params.stockPrice, 2),
    parity,
    estimatedCbPrice,
    refStrikeAtExit,
    proceedsPerBond,
    stockReturnPct,
    cbasRoiPct,
    initialCost1LotNtd,
    proceeds1LotNtd,
    netProfit1LotNtd,
  };
}

/**
 * CBAS 所有支付額、權利金百元報價、槓桿倍數與參考履約價
 */
export function calcCbasCost(input: CbasCostInput): CbasCostResult {
  const putPrice = input.putPrice ?? 100;
  const lots = input.lots ?? 10;

  const spreadAbovePut = roundTo(Math.max(0, input.cbPrice - putPrice), 2);
  const prepaidInterest = roundTo(
    putPrice * (input.discountRatePct / 100) * (input.daysRemaining / 365),
    3
  );
  const hundredDollarQuote = roundTo(prepaidInterest + input.handlingFee, 2);
  const totalPerBond = roundTo(spreadAbovePut + hundredDollarQuote, 2);

  const totalCostNtd = Math.round(totalPerBond * 1000 * lots);
  const controlledMarketValueNtd = Math.round(input.cbPrice * 1000 * lots);
  const leverageMultiplier = totalPerBond > 0 ? roundTo(input.cbPrice / totalPerBond, 2) : 0;
  const leveragePct = Math.round(leverageMultiplier * 100);
  const refStrikePrice = roundTo(putPrice - prepaidInterest, 4);

  return {
    spreadAbovePut,
    prepaidInterest,
    hundredDollarQuote,
    totalPerBond,
    totalCostNtd,
    controlledMarketValueNtd,
    leverageMultiplier,
    leveragePct,
    refStrikePrice,
  };
}

/**
 * 方法 A：提前解約試算
 */
export function calcMethodAProfit(input: MethodAProfitInput): MethodAProfitResult {
  const lots = input.lots ?? 10;
  const proceedsPerBond = roundTo(input.exitCbPrice - input.refStrikeAtExit, 2);
  const totalProceedsNtd = Math.round(proceedsPerBond * 1000 * lots);
  const initialCostNtd = Math.round(input.initialTotalPerBond * 1000 * lots);
  const netProfitNtd = totalProceedsNtd - initialCostNtd;
  const roiPct = initialCostNtd > 0 ? roundTo((netProfitNtd / initialCostNtd) * 100, 1) : 0;

  return {
    proceedsPerBond,
    totalProceedsNtd,
    initialCostNtd,
    netProfitNtd,
    roiPct,
  };
}

/**
 * 轉合約（續約）補繳費用試算（免重付價差）
 */
export function calcRolloverCost(input: RolloverCostInput): {
  perBond: number;
  totalNtd: number;
} {
  const lots = input.lots ?? 10;
  const perBond = roundTo(100 * (input.discountRatePct / 100) * input.extraYears + input.handlingFee, 2);
  const totalNtd = Math.round(perBond * 1000 * lots);
  return { perBond, totalNtd };
}
