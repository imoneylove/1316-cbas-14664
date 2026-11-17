export interface SlideMeta {
  id: string;
  number: string;
  navGroup: string;
  title: string;
  subtitle: string;
  keyTakeaway: string;
}

export const SLIDES: SlideMeta[] = [
  {
    id: 'concept',
    number: '01',
    navGroup: '概念入門',
    title: '小資金開大車：什麼是 CB 與 CBAS？',
    subtitle: '把 100 萬元本金交給券商出，你只租下「未來上漲的獲利權」',
    keyTakeaway: '花不到 10% 權利金，撬動 100% 債券上漲空間',
  },
  {
    id: 'quote-table',
    number: '02',
    navGroup: '概念入門',
    title: '打開報價表：聚隆四 (14664) 欄位實戰解剖',
    subtitle: '點擊任一欄位名稱，一秒看懂報價表上每個數字代表的意思（2026/11/16 收盤基準）',
    keyTakeaway: '看懂 8 個核心欄位，就能自己挑出高勝率標的',
  },
  {
    id: 'formula-dilution',
    number: '03',
    navGroup: '靈魂公式',
    title: '靈魂公式「100 ÷ 轉換價」與 0.20 元實證變相配息',
    subtitle: '2026/09/07 聚隆除息 0.20 元，轉換價從 18.80 元調降為 18.60 元，每張真實多送 57 股',
    keyTakeaway: '沒領現金股息卻每張多 57 股（10 張多 570 股），還全免股利所得稅與二代健保',
  },
  {
    id: 'parity-premium',
    number: '04',
    navGroup: '價值指標',
    title: '價值雙指標與單張 CBAS 投報對照（最高模擬現股 10 倍）',
    subtitle: '以 2026/11/16 收盤 14.00 元、轉換價 18.60 元實測：上方直接拆解 9,310 元怎麼算出投報率',
    keyTakeaway: '過了 19.35 元（CB 104.05 元），投入 9,310 元在現股翻倍 (28 元) 淨賺 +46,030 元 (+494%)、漲 10 倍 (140 元) 淨賺 +648,180 元 (+6,962%)',
  },
  {
    id: 'cost-leverage',
    number: '05',
    navGroup: '槓桿換算',
    title: '我要付多少錢？11.18 倍槓桿完整拆解',
    subtitle: '自付額 ＝ ① 超過 100 元價差 ＋ ② 預繳總利息 ＋ ③ 券商手續費',
    keyTakeaway: '低消 10 張實付 9.31 萬元，直接操作 104.05 萬元部位（11.18x）',
  },
  {
    id: 'exit-methods',
    number: '06',
    navGroup: '出場與續約',
    title: '中途賺錢怎麼變現？雙路線出場與按日退息機制',
    subtitle: '抱越短、未到期利息退越多！參考履約價 ＝ 100 元 － 退還利息',
    keyTakeaway: '90% 投資人用「方法 A 提前解約」，免準備百萬本金直接領價差',
  },
  {
    id: 'rollover-putday',
    number: '07',
    navGroup: '出場與續約',
    title: '進階秘訣：選擇權到期 vs 賣回日 &「轉合約續約」',
    subtitle: '遇到 Put Day 到期但債券還沒到期？信用良好時「免重付價差」直接續約',
    keyTakeaway: '初期免預繳 5 年貴利息；續約只要補繳下一期利息＋手續費（約 6.74 元）',
  },
  {
    id: 'cheat-sheet',
    number: '08',
    navGroup: '出場與續約',
    title: '新手一秒記憶口訣總表（聚隆四實戰版）',
    subtitle: '六大核心公式對照真實數字（2026/11/16 收盤 14.00 / 轉換價 18.60），看盤前 10 秒複習',
    keyTakeaway: '先算轉換張數與溢價率，再算權利金槓桿，最後確認停轉日與 Put Day',
  },
];

export interface QuoteRow {
  code: string;
  name: string;
  guarantee: string;
  cbPrice: number;
  stockPrice: number;
  convPrice: number;
  parity: number;
  premiumPct: number;
  hundredQuote: number;
  discountRate: number;
  refStrike: number;
  optExpiry: string;
  putDay: string;
  stopReason: string;
  isFocus?: boolean;
  note: string;
}

export const QUOTE_ROWS: QuoteRow[] = [
  {
    code: '14664',
    name: '聚隆四',
    guarantee: '台中銀擔保',
    cbPrice: 104.05,
    stockPrice: 14.00,
    convPrice: 18.60,
    parity: 75.27,
    premiumPct: 38.24,
    hundredQuote: 5.26,
    discountRate: 3.2708,
    refStrike: 94.9370,
    optExpiry: '2028/06/05',
    putDay: '2028/06/20',
    stopReason: '配股配息 (08/19~09/13 除息0.2)',
    isFocus: true,
    note: '2026/11/16 收盤 14.00 元；09/07 除息 0.20 元後轉換價由 18.80 調降為 18.60 元',
  },
  {
    code: '14722',
    name: '三洋二',
    guarantee: '有擔保',
    cbPrice: 103.50,
    stockPrice: 28.40,
    convPrice: 36.20,
    parity: 78.45,
    premiumPct: 31.93,
    hundredQuote: 4.15,
    discountRate: 3.30,
    refStrike: 96.05,
    optExpiry: '2027/11/10',
    putDay: '2027/11/25',
    stopReason: '配股配息',
    note: '報價表對照標的：同屬選擇權綁定提前賣回日 (Put Day) 前 15 天',
  },
  {
    code: '15142',
    name: '亞力二',
    guarantee: '有擔保',
    cbPrice: 108.20,
    stockPrice: 106.50,
    convPrice: 120.00,
    parity: 88.75,
    premiumPct: 21.92,
    hundredQuote: 3.85,
    discountRate: 3.25,
    refStrike: 96.39,
    optExpiry: '2027/12/29',
    putDay: '2028/01/13',
    stopReason: '配股配息',
    note: '5 年期可轉債 (2030 到期)，因 2028/01/13 有滿 3 年 Put Day，僅先簽 1.11 年',
  },
  {
    code: '47642',
    name: '雙鍵二',
    guarantee: '高溢價警示',
    cbPrice: 102.00,
    stockPrice: 25.20,
    convPrice: 70.00,
    parity: 36.00,
    premiumPct: 183.33,
    hundredQuote: 6.10,
    discountRate: 3.80,
    refStrike: 94.10,
    optExpiry: '2028/04/15',
    putDay: '2028/04/30',
    stopReason: '配股配息',
    note: '警示例：溢價率高達 183%，代表股價需先翻倍再翻倍才追上，容易白等',
  },
  {
    code: '64251',
    name: '易發一',
    guarantee: '高價差低槓桿',
    cbPrice: 146.80,
    stockPrice: 84.50,
    convPrice: 59.00,
    parity: 143.22,
    premiumPct: 2.50,
    hundredQuote: 4.90,
    discountRate: 3.45,
    refStrike: 95.30,
    optExpiry: '2028/02/10',
    putDay: '2028/02/25',
    stopReason: '配股配息',
    note: '對照例：市價高達 146.8 元，跟股票 1:1 連動但自付價差 46.8 元，槓桿變很小',
  },
];

export interface QuoteColumnTip {
  key: keyof QuoteRow | 'cbPrice' | 'convPrice' | 'parity' | 'premiumPct' | 'hundredQuote' | 'discountRate' | 'refStrike' | 'optExpiry' | 'stopReason';
  label: string;
  juloongValue: string;
  summary: string;
  formula?: string;
}

export const QUOTE_COLUMN_TIPS: QuoteColumnTip[] = [
  {
    key: 'convPrice',
    label: '轉換價格',
    juloongValue: '18.60 元（原 18.80）',
    summary: '2026/09/07 除息 0.20 元後，依反稀釋條款由 18.80 元調降至 18.60 元，每張真實多換 57 股！',
    formula: '100 ÷ 18.60 = 5.3763 張 (5,376股)',
  },
  {
    key: 'parity',
    label: 'Parity 理論價值',
    juloongValue: '75.27%',
    summary: '以 2026/11/16 收盤價 14.00 元與最新轉換價 18.60 元計算，現在立刻換成股票值 75.27 元。低於 100% 千萬別換股！',
    formula: '(100 ÷ 18.60) × 14.00 = 75.27%',
  },
  {
    key: 'premiumPct',
    label: '溢(折)價率',
    juloongValue: '+38.24%',
    summary: '買債券比股票貴了幾 %。聚隆股價須從 14.00 元先漲 38.24% 到約 19.35 元，換股價值才會追平 104.05 元。',
    formula: '(104.05 − 75.27) ÷ 75.27 = +38.24%',
  },
  {
    key: 'hundredQuote',
    label: '權利金百元報價',
    juloongValue: '5.26 元',
    summary: '券商算好的「持有期間總利息 (5.063) ＋ 手續費 (0.197)」。買進總成本還必須再加上超過 100 元的價差 (4.05)！',
    formula: '總付額 = 價差 4.05 + 百元報價 5.26 = 9.31 元',
  },
  {
    key: 'discountRate',
    label: '履約折現率',
    juloongValue: '3.2708%',
    summary: '就是券商借你 100 元本金所收取的「年化利率」。因為聚隆四有台中銀擔保，利率特別優惠。',
    formula: '100 × 3.2708% × (565 ÷ 365) = 5.063 元利息',
  },
  {
    key: 'refStrike',
    label: '參考履約價',
    juloongValue: '94.9370 元',
    summary: '期初預繳 565 天利息 (5.063 元)。若提早出場，未用到的天數利息直接從 100 元本金扣減退還給你。',
    formula: '100 − 5.063 = 94.9370 元',
  },
  {
    key: 'optExpiry',
    label: '選擇權到期 / Put Day',
    juloongValue: '2028/06/05 (前15天)',
    summary: '合約綁定在「提前賣回日 (2028/06/20)」前 15 天。讓你不必一開始就預繳整張債券的多年期利息。',
    formula: 'Put Day 前 15 天 = 選擇權到期日',
  },
  {
    key: 'stopReason',
    label: '停止轉換事由',
    juloongValue: '配股配息 (08/19~09/13)',
    summary: '2026/09/07 除息 0.20 元（停轉期間 08/19~09/13）。停轉期內不能換成股票，只能用「方法 A 提前解約」。',
  },
];

export interface CheatSheetItem {
  num: string;
  name: string;
  formula: string;
  juloongExample: string;
  takeaway: string;
  accent: 'sky' | 'emerald' | 'amber' | 'slate';
}

export const CHEAT_SHEET_ITEMS: CheatSheetItem[] = [
  {
    num: '01',
    name: '可換股票張數（靈魂公式）',
    formula: '100 ÷ 轉換價',
    juloongExample: '100 ÷ 18.60 ＝ 5.3763 張 (5,376股)',
    takeaway: '2026/09/07 除息 0.20 元後從 18.80 調降為 18.60，每張多送 57 股且免稅免健保。',
    accent: 'sky',
  },
  {
    num: '02',
    name: 'Parity（理論價值）',
    formula: '(100 ÷ 轉換價) × 現股價',
    juloongExample: '5.3763 × 14.00 ＝ 75.27%',
    takeaway: '以 2026/11/16 收盤 14.00 元算，現換股票只值 75.27 元；低於 100% 千萬別換股。',
    accent: 'slate',
  },
  {
    num: '03',
    name: '溢(折)價率與起爆門檻',
    formula: '(可轉債市價 − Parity) ÷ Parity',
    juloongExample: '(104.05 − 75.27) ÷ 75.27 ＝ +38.24%',
    takeaway: '股價突破 19.35 元（CB 追平 104.05）後，CBAS 投報率隨股價呈斜率飆升。',
    accent: 'amber',
  },
  {
    num: '04',
    name: 'CBAS 所有支付額',
    formula: '(可轉債市價 − 100)價差 ＋ 百元報價',
    juloongExample: '4.05 ＋ 5.26 ＝ 9.31 元 (10張 = 93,100元)',
    takeaway: '百元報價只含「總利息＋手續費」；超過 100 元的市價價差必須另外自付。',
    accent: 'amber',
  },
  {
    num: '05',
    name: '槓桿倍數（Double 爆發力）',
    formula: '可轉債市價 ÷ 所有支付額 × 100%',
    juloongExample: '104.05 ÷ 9.31 ＝ 11.18 倍 (Double 28元賺+494%)',
    takeaway: '只花 9.31 萬元撬動 104.05 萬部位；股價翻倍至 28 元，CBAS 投報率近 5 倍。',
    accent: 'emerald',
  },
  {
    num: '06',
    name: '轉合約（續約機制）',
    formula: '僅補繳 下一期利息 ＋ 手續費（免重付價差）',
    juloongExample: '100 × 3.2708% × 2年 ＋ 0.2 ≈ 6.74 元',
    takeaway: '若選擇權到期遇到 Put Day 而非最終到期日，只要公司信用好、券商有額度即可續約。',
    accent: 'emerald',
  },
];
