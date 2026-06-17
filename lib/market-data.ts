export type MarketSymbol = "BNB/USDT" | "CAKE/USDT" | "BTC/USDT" | "ETH/USDT";
export type RiskLevel = "Conservative" | "Balanced" | "Aggressive";
export type Timeframe = "4H" | "1D" | "1W";
export type StrategyType =
  | "Momentum Breakout"
  | "Mean Reversion"
  | "Volatility Defensive"
  | "Narrative Rotation";

export type MarketSignal = {
  symbol: MarketSymbol;
  base: string;
  price: number;
  priceChange24h: number;
  volume24h?: number;
  volumeChange24h: number;
  marketCap?: number;
  lastUpdated?: string;
  dataSource?: "mock" | "live" | "hybrid";
  rsi: number;
  macdSignal: "Bullish cross" | "Bearish cross" | "Neutral compression";
  emaTrend: "Above 20/50 EMA" | "Below 20/50 EMA" | "Mixed EMA stack";
  volatilityScore: number;
  sentimentScore: number;
  narrativeMomentum: number;
  openInterestFunding: string;
  support: number[];
  resistance: number[];
  marketRegime: "Expansion" | "Compression" | "Risk-off" | "Rotation";
};

export type StrategySpec = {
  id: string;
  name: string;
  symbol: MarketSymbol;
  type: StrategyType;
  timeframe: Timeframe;
  riskLevel: RiskLevel;
  marketRegime: MarketSignal["marketRegime"];
  entryConditions: string[];
  exitConditions: string[];
  riskRules: string[];
  positionSizing: string;
  stopLoss: string;
  takeProfit: string;
  confidenceScore: number;
  reasoning: string;
  signalsUsed: string[];
};

export type BacktestResult = {
  strategyId: string;
  totalReturn: number;
  sharpeRatio: number;
  maxDrawdown: number;
  winRate: number;
  profitFactor: number;
  totalTrades: number;
  averageTradeDuration: string;
  regimePerformance: { regime: string; return: number; winRate: number }[];
  equityCurve: { day: string; equity: number }[];
  drawdownCurve: { day: string; drawdown: number }[];
};

export type StrategySignalSnapshot = {
  skillName: "SignalPilot Market Intelligence Skill";
  project: "SignalPilot";
  track: "Strategy Intelligence Platform";
  trackName: "Strategy Intelligence Platform";
  disclaimer: string;
  market: MarketSymbol;
  selectedMarket: MarketSymbol;
  timestamp: string;
  source: NonNullable<MarketSignal["dataSource"]> | "unknown";
  dataSource: NonNullable<MarketSignal["dataSource"]> | "unknown";
  rawLiveMarketValues: {
    price: number;
    priceChange24h: number;
    volume24h?: number;
    volumeChange24h: number;
    marketCap?: number;
    lastUpdated?: string;
  };
  indicatorsUsed: {
    rsi: number;
    macdSignal: MarketSignal["macdSignal"];
    emaTrend: MarketSignal["emaTrend"];
    volatilityScore: number;
    sentimentScore: number;
    narrativeMomentum: number;
    openInterestFunding: string;
    support: number[];
    resistance: number[];
  };
  marketRegime: MarketSignal["marketRegime"];
  strategyRules: {
    entryConditions: string[];
    exitConditions: string[];
    positionSizing: string;
    stopLoss: string;
    takeProfit: string;
  };
  riskRules: string[];
  generatedStrategyRules: {
    strategyId: string;
    strategyName: string;
    strategyType: StrategyType;
    timeframe: Timeframe;
    riskLevel: RiskLevel;
    entryConditions: string[];
    exitConditions: string[];
    riskRules: string[];
    positionSizing: string;
    stopLoss: string;
    takeProfit: string;
    confidenceScore: number;
    reasoning: string;
    cmcSignalsUsed: string[];
  };
  backtestMetrics: {
    totalReturn: number;
    sharpeRatio: number;
    maxDrawdown: number;
    winRate: number;
    profitFactor: number;
    totalTrades: number;
    averageTradeDuration: string;
    regimePerformance: BacktestResult["regimePerformance"];
  };
  backtestAssumptions: {
    lookbackWindow: string;
    timeframe: Timeframe;
    feesBps: number;
    slippageBps: number;
    startingEquity: number;
    executionMode: "research-only-no-live-execution";
  };
};

export type StrategySignalSnapshotWithHash = StrategySignalSnapshot & {
  strategyHash: string;
};

export const markets: MarketSignal[] = [
  {
    symbol: "BNB/USDT",
    base: "BNB",
    price: 612.42,
    priceChange24h: 3.18,
    volumeChange24h: 22.7,
    rsi: 63,
    macdSignal: "Bullish cross",
    emaTrend: "Above 20/50 EMA",
    volatilityScore: 58,
    sentimentScore: 71,
    narrativeMomentum: 76,
    openInterestFunding: "OI +8.2%, funding mildly positive",
    support: [588, 571, 542],
    resistance: [628, 655, 690],
    marketRegime: "Expansion"
  },
  {
    symbol: "CAKE/USDT",
    base: "CAKE",
    price: 2.91,
    priceChange24h: 5.84,
    volumeChange24h: 41.5,
    rsi: 69,
    macdSignal: "Bullish cross",
    emaTrend: "Above 20/50 EMA",
    volatilityScore: 73,
    sentimentScore: 64,
    narrativeMomentum: 82,
    openInterestFunding: "OI +13.5%, funding elevated",
    support: [2.72, 2.58, 2.41],
    resistance: [3.04, 3.22, 3.48],
    marketRegime: "Rotation"
  },
  {
    symbol: "BTC/USDT",
    base: "BTC",
    price: 103420,
    priceChange24h: -0.86,
    volumeChange24h: -9.4,
    rsi: 48,
    macdSignal: "Neutral compression",
    emaTrend: "Mixed EMA stack",
    volatilityScore: 37,
    sentimentScore: 54,
    narrativeMomentum: 43,
    openInterestFunding: "OI flat, funding neutral",
    support: [101800, 99500, 97200],
    resistance: [105200, 108400, 112000],
    marketRegime: "Compression"
  },
  {
    symbol: "ETH/USDT",
    base: "ETH",
    price: 3468,
    priceChange24h: -2.35,
    volumeChange24h: 16.2,
    rsi: 38,
    macdSignal: "Bearish cross",
    emaTrend: "Below 20/50 EMA",
    volatilityScore: 66,
    sentimentScore: 46,
    narrativeMomentum: 39,
    openInterestFunding: "OI +5.1%, funding negative",
    support: [3380, 3240, 3095],
    resistance: [3580, 3740, 3910],
    marketRegime: "Risk-off"
  }
];

export function getMarket(symbol: MarketSymbol = "BNB/USDT") {
  return markets.find((market) => market.symbol === symbol) ?? markets[0];
}

export function inferStrategyType(market: MarketSignal, riskLevel: RiskLevel): StrategyType {
  if (market.marketRegime === "Risk-off" || riskLevel === "Conservative") {
    return "Volatility Defensive";
  }
  if (market.rsi < 42) {
    return "Mean Reversion";
  }
  if (market.marketRegime === "Rotation" || market.narrativeMomentum > 78) {
    return "Narrative Rotation";
  }
  return "Momentum Breakout";
}

export function calculateSignalScore(market: MarketSignal) {
  const trendScore =
    market.macdSignal === "Bullish cross" ? 8 : market.macdSignal === "Neutral compression" ? 2 : -6;
  const emaScore =
    market.emaTrend === "Above 20/50 EMA" ? 8 : market.emaTrend === "Mixed EMA stack" ? 2 : -6;
  const priceScore = Math.max(-10, Math.min(10, market.priceChange24h * 1.5));
  const volumeScore = Math.max(-8, Math.min(8, market.volumeChange24h / 4));
  const baseScore =
    market.sentimentScore * 0.28 +
    market.narrativeMomentum * 0.28 +
    market.rsi * 0.16 +
    (100 - market.volatilityScore) * 0.08 +
    trendScore +
    emaScore +
    priceScore +
    volumeScore;

  return Math.round(Math.max(0, Math.min(100, baseScore)));
}

export function generateStrategySpec({
  symbol = "BNB/USDT",
  riskLevel = "Balanced",
  timeframe = "1D",
  market: providedMarket
}: {
  symbol?: MarketSymbol;
  riskLevel?: RiskLevel;
  timeframe?: Timeframe;
  market?: MarketSignal;
}): StrategySpec {
  const market = providedMarket ?? getMarket(symbol);
  const type = inferStrategyType(market, riskLevel);
  const riskMultiplier = riskLevel === "Aggressive" ? 1.35 : riskLevel === "Conservative" ? 0.7 : 1;
  const confidence = Math.round(
    Math.min(92, Math.max(58, 46 + market.sentimentScore * 0.22 + market.narrativeMomentum * 0.2 + (market.rsi > 55 ? 8 : 0)))
  );

  const typeEntries: Record<StrategyType, string[]> = {
    "Momentum Breakout": [
      `Enter only after a ${timeframe} close above ${market.resistance[0]} with volume expansion above 15%.`,
      "Confirm RSI remains between 55 and 72 to avoid late overextension.",
      "MACD signal must remain bullish or neutral-to-bullish on confirmation candle."
    ],
    "Mean Reversion": [
      `Scale into support band between ${market.support[0]} and ${market.support[1]} only after downside momentum slows.`,
      "RSI must reclaim 42 after printing an oversold or near-oversold reading.",
      "Avoid entries if funding and open interest both accelerate against the position."
    ],
    "Volatility Defensive": [
      "Trade half-size until ATR/volatility score normalizes below 55.",
      `Use support at ${market.support[0]} as the first invalidation reference.`,
      "Require sentiment stabilization and no fresh bearish MACD expansion."
    ],
    "Narrative Rotation": [
      "Enter when narrative momentum remains above 70 and relative volume leads majors.",
      `Use a breakout through ${market.resistance[0]} or a retest of ${market.support[0]} as the trigger.`,
      "Confirm rotation with positive sentiment and stable funding."
    ]
  };

  return {
    id: `sp-${market.base.toLowerCase()}-${type.toLowerCase().replaceAll(" ", "-")}`,
    name: `${market.base} ${type} ${timeframe}`,
    symbol: market.symbol,
    type,
    timeframe,
    riskLevel,
    marketRegime: market.marketRegime,
    entryConditions: typeEntries[type],
    exitConditions: [
      `Exit partial position near ${market.resistance[1]} or when reward-to-risk reaches 1.8R.`,
      "Exit fully if MACD flips against the trade and price closes below the active EMA filter.",
      "De-risk when sentiment falls below 45 or narrative momentum drops by more than 18 points."
    ],
    riskRules: [
      "No live execution is performed by SignalPilot; this is a research specification only.",
      "Do not risk more than the configured per-trade budget.",
      "Pause new entries after two consecutive stopped trades in the same regime.",
      "Invalidate the setup if price closes beyond the stop level on the selected timeframe."
    ],
    positionSizing: `${(1.6 * riskMultiplier).toFixed(1)}% max account risk per idea, capped at ${(8 * riskMultiplier).toFixed(1)}% notional exposure.`,
    stopLoss: `${(market.price * (1 - (market.volatilityScore / 1000) * riskMultiplier)).toFixed(market.price > 100 ? 0 : 2)} dynamic stop, trailed only after first target.`,
    takeProfit: `${market.resistance[1]} primary target, ${market.resistance[2]} stretch target if regime remains ${market.marketRegime}.`,
    confidenceScore: confidence,
    reasoning: `SignalPilot classifies ${market.symbol} as ${market.marketRegime.toLowerCase()} because price change, volume change, EMA structure, RSI, volatility, sentiment, and narrative momentum point to a ${type.toLowerCase()} playbook. The generated rules favor explainable confirmation over autonomous execution and keep risk explicit before any backtest interpretation.`,
    signalsUsed: [
      "24h price change",
      "24h volume change",
      "RSI",
      "MACD signal",
      "EMA trend",
      "ATR / volatility score",
      "Sentiment score",
      "Narrative momentum",
      "Open interest / funding placeholder",
      "Support and resistance",
      "Market regime"
    ]
  };
}

export const defaultStrategy = generateStrategySpec({});

export function getStrategyById(id: string, marketSignals: MarketSignal[] = markets) {
  const generated = marketSignals.map((market) =>
    generateStrategySpec({ symbol: market.symbol, riskLevel: "Balanced", timeframe: "1D", market })
  );
  return generated.find((strategy) => strategy.id === id) ?? defaultStrategy;
}

export function generateBacktest(strategy: StrategySpec): BacktestResult {
  const baseReturn = strategy.type === "Volatility Defensive" ? 8.4 : strategy.type === "Narrative Rotation" ? 22.8 : 17.6;
  const regimeBoost = strategy.marketRegime === "Expansion" || strategy.marketRegime === "Rotation" ? 4.2 : -1.7;
  const totalReturn = Number((baseReturn + regimeBoost + (strategy.confidenceScore - 70) * 0.18).toFixed(1));
  const maxDrawdown = Number((strategy.riskLevel === "Aggressive" ? -14.8 : strategy.riskLevel === "Conservative" ? -6.2 : -9.6).toFixed(1));

  const equityCurve = Array.from({ length: 12 }, (_, index) => {
    const progress = index / 11;
    const wave = Math.sin(index * 1.35) * 1.8;
    return {
      day: `W${index + 1}`,
      equity: Number((10000 * (1 + (totalReturn * progress + wave) / 100)).toFixed(0))
    };
  });

  const drawdownCurve = equityCurve.map((point, index) => ({
    day: point.day,
    drawdown: Number((Math.min(0, -Math.abs(Math.sin(index * 0.9)) * Math.abs(maxDrawdown))).toFixed(1))
  }));

  return {
    strategyId: strategy.id,
    totalReturn,
    sharpeRatio: Number((1.12 + strategy.confidenceScore / 100).toFixed(2)),
    maxDrawdown,
    winRate: Number((52 + strategy.confidenceScore * 0.24).toFixed(1)),
    profitFactor: Number((1.25 + strategy.confidenceScore / 180).toFixed(2)),
    totalTrades: strategy.timeframe === "4H" ? 48 : strategy.timeframe === "1D" ? 24 : 11,
    averageTradeDuration: strategy.timeframe === "4H" ? "18 hours" : strategy.timeframe === "1D" ? "3.4 days" : "2.1 weeks",
    regimePerformance: [
      { regime: "Expansion", return: totalReturn + 4.1, winRate: 64 },
      { regime: "Compression", return: totalReturn - 6.3, winRate: 51 },
      { regime: "Risk-off", return: strategy.type === "Volatility Defensive" ? 5.6 : -3.9, winRate: 47 },
      { regime: "Rotation", return: strategy.type === "Narrative Rotation" ? totalReturn + 6.8 : totalReturn - 1.2, winRate: 61 }
    ],
    equityCurve,
    drawdownCurve
  };
}

export function createStrategySignalSnapshot({
  market,
  strategy,
  backtest,
  timestamp = market.lastUpdated ?? new Date().toISOString()
}: {
  market: MarketSignal;
  strategy: StrategySpec;
  backtest: BacktestResult;
  timestamp?: string;
}): StrategySignalSnapshot {
  return {
    skillName: "SignalPilot Market Intelligence Skill",
    project: "SignalPilot",
    track: "Strategy Intelligence Platform",
    trackName: "Strategy Intelligence Platform",
    disclaimer:
      "SignalPilot does not execute live trades. It generates explainable, backtestable strategy specs for research.",
    market: strategy.symbol,
    selectedMarket: strategy.symbol,
    timestamp,
    source: market.dataSource ?? "unknown",
    dataSource: market.dataSource ?? "unknown",
    rawLiveMarketValues: {
      price: market.price,
      priceChange24h: market.priceChange24h,
      volume24h: market.volume24h,
      volumeChange24h: market.volumeChange24h,
      marketCap: market.marketCap,
      lastUpdated: market.lastUpdated
    },
    indicatorsUsed: {
      rsi: market.rsi,
      macdSignal: market.macdSignal,
      emaTrend: market.emaTrend,
      volatilityScore: market.volatilityScore,
      sentimentScore: market.sentimentScore,
      narrativeMomentum: market.narrativeMomentum,
      openInterestFunding: market.openInterestFunding,
      support: market.support,
      resistance: market.resistance
    },
    marketRegime: market.marketRegime,
    strategyRules: {
      entryConditions: strategy.entryConditions,
      exitConditions: strategy.exitConditions,
      positionSizing: strategy.positionSizing,
      stopLoss: strategy.stopLoss,
      takeProfit: strategy.takeProfit
    },
    riskRules: strategy.riskRules,
    generatedStrategyRules: {
      strategyId: strategy.id,
      strategyName: strategy.name,
      strategyType: strategy.type,
      timeframe: strategy.timeframe,
      riskLevel: strategy.riskLevel,
      entryConditions: strategy.entryConditions,
      exitConditions: strategy.exitConditions,
      riskRules: strategy.riskRules,
      positionSizing: strategy.positionSizing,
      stopLoss: strategy.stopLoss,
      takeProfit: strategy.takeProfit,
      confidenceScore: strategy.confidenceScore,
      reasoning: strategy.reasoning,
      cmcSignalsUsed: strategy.signalsUsed
    },
    backtestMetrics: {
      totalReturn: backtest.totalReturn,
      sharpeRatio: backtest.sharpeRatio,
      maxDrawdown: backtest.maxDrawdown,
      winRate: backtest.winRate,
      profitFactor: backtest.profitFactor,
      totalTrades: backtest.totalTrades,
      averageTradeDuration: backtest.averageTradeDuration,
      regimePerformance: backtest.regimePerformance
    },
    backtestAssumptions: {
      lookbackWindow: strategy.timeframe === "4H" ? "90D" : strategy.timeframe === "1D" ? "180D" : "365D",
      timeframe: strategy.timeframe,
      feesBps: 10,
      slippageBps: 5,
      startingEquity: 10000,
      executionMode: "research-only-no-live-execution"
    }
  };
}

export const proofRegistry = [
  {
    strategyHash: "0x7ac9...91f2",
    creatorWallet: "0xA91B...44dE",
    backtestScore: 82,
    timestamp: "2026-06-16 11:20 UTC",
    transactionHash: "0x5d88c3...0bb4a9",
    status: "Indexed"
  },
  {
    strategyHash: "0x42bf...aa10",
    creatorWallet: "0x73F0...19c8",
    backtestScore: 76,
    timestamp: "2026-06-15 18:42 UTC",
    transactionHash: "0x921be1...30caf2",
    status: "Pending proof"
  },
  {
    strategyHash: "0x91de...3b7c",
    creatorWallet: "0xC8A2...8f01",
    backtestScore: 89,
    timestamp: "2026-06-14 09:08 UTC",
    transactionHash: "0xf3c0d9...88a12e",
    status: "Indexed"
  }
];
