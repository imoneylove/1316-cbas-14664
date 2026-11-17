import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calcBreakevenStockPrice,
  calcCbasCost,
  calcCbasRoiAtStockPrice,
  calcConversionShares,
  calcConversionSheets,
  calcMethodAProfit,
  calcParity,
  calcPremiumRatePct,
  calcRolloverCost,
} from './cbasMath';

test('聚隆四 (14664) 2026/09/07 除息 0.20 元實證反稀釋：轉換價 18.80 → 18.60 (+57 股)', () => {
  const origSheets = calcConversionSheets(18.80);
  const origShares = calcConversionShares(18.80);
  assert.equal(origSheets, 5.3191);
  assert.equal(origShares, 5319);

  const adjSheets = calcConversionSheets(18.60);
  const adjShares = calcConversionShares(18.60);
  assert.equal(adjSheets, 5.3763);
  assert.equal(adjShares, 5376);
  assert.equal(adjShares - origShares, 57);
});

test('聚隆四 (14664) 2026/11/16 收盤價 14.00 元與除息後轉換價 18.60 元之 Parity 與溢價率', () => {
  const parity = calcParity(14.00, 18.60);
  assert.equal(parity, 75.27);

  const premium = calcPremiumRatePct(104.05, parity);
  assert.equal(premium, 38.24);

  const breakeven = calcBreakevenStockPrice(104.05, 18.60);
  assert.equal(breakeven, 19.35);
});

test('聚隆四 (14664) CBAS 單張投報率飆升模型：19.35 起爆、28.00 翻倍、140.00 現股10倍', () => {
  const atTrigger = calcCbasRoiAtStockPrice({ stockPrice: 19.35 });
  assert.equal(atTrigger.parity, 104.03);
  assert.equal(atTrigger.initialCost1LotNtd, 9310);

  const atDouble = calcCbasRoiAtStockPrice({ stockPrice: 28.00 });
  assert.equal(atDouble.stockReturnPct, 100.0); // 14.00 -> 28.00 is +100% Double!
  assert.equal(atDouble.parity, 150.54);
  assert.equal(atDouble.proceeds1LotNtd, 55340);
  assert.equal(atDouble.netProfit1LotNtd, 46030);
  assert.ok(atDouble.cbasRoiPct > 490); // +494.4%

  const at5x = calcCbasRoiAtStockPrice({ stockPrice: 70.00 });
  assert.equal(at5x.stockReturnPct, 400.0);
  assert.equal(at5x.parity, 376.34);
  assert.equal(at5x.netProfit1LotNtd, 271830);
  assert.ok(at5x.cbasRoiPct > 2900); // +2,919.8%

  const at10x = calcCbasRoiAtStockPrice({ stockPrice: 140.00 });
  assert.equal(at10x.stockReturnPct, 900.0); // 14.00 -> 140.00 is 10x (+900%)!
  assert.equal(at10x.parity, 752.69);
  assert.equal(at10x.proceeds1LotNtd, 657490);
  assert.equal(at10x.netProfit1LotNtd, 648180);
  assert.ok(at10x.cbasRoiPct > 6960); // +6,962.2%
});

test('聚隆四 (14664) CBAS 權利金拆解、參考履約價與 11.18 倍槓桿', () => {
  const res = calcCbasCost({
    cbPrice: 104.05,
    discountRatePct: 3.2708,
    daysRemaining: 565,
    handlingFee: 0.197,
    lots: 10,
  });

  assert.equal(res.spreadAbovePut, 4.05);
  assert.equal(res.prepaidInterest, 5.063);
  assert.equal(res.hundredDollarQuote, 5.26);
  assert.equal(res.totalPerBond, 9.31);
  assert.equal(res.totalCostNtd, 93100);
  assert.equal(res.controlledMarketValueNtd, 1040500);
  assert.equal(res.leverageMultiplier, 11.18);
  assert.equal(res.leveragePct, 1118);
  assert.equal(res.refStrikePrice, 94.937);
});

test('方法 A 提前解約獲利試算與轉合約續約成本', () => {
  const exitA = calcMethodAProfit({
    exitCbPrice: 130,
    refStrikeAtExit: 95.2,
    initialTotalPerBond: 9.31,
    lots: 10,
  });

  assert.equal(exitA.proceedsPerBond, 34.8);
  assert.equal(exitA.totalProceedsNtd, 348000);
  assert.equal(exitA.initialCostNtd, 93100);
  assert.equal(exitA.netProfitNtd, 254900);
  assert.ok(exitA.roiPct > 273);

  const rollover = calcRolloverCost({
    discountRatePct: 3.2708,
    extraYears: 2,
    handlingFee: 0.2,
    lots: 10,
  });
  assert.equal(rollover.perBond, 6.74);
  assert.equal(rollover.totalNtd, 67400);
});
