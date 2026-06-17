import { fetchCmcQuotes, type CmcQuote } from "@/lib/cmc/client";
import { deriveSimulatedTechnicalLevels } from "@/lib/cmc/indicators";
import { markets, type MarketSignal, type MarketSymbol } from "@/lib/market-data";

export type DataMode = "mock" | "live" | "hybrid";
export type DataModeStatus = {
  mode: DataMode;
  label: "Mock Demo" | "Live CMC Data" | "Hybrid: Live CMC Data + Derived Indicators";
  fallbackActive: boolean;
  message?: string;
};

const DEFAULT_MODE: DataMode = "hybrid";

export function getConfiguredDataMode(): DataMode {
  const rawMode = process.env.NEXT_PUBLIC_DATA_MODE?.toLowerCase();
  if (rawMode === "mock" || rawMode === "live" || rawMode === "hybrid") {
    return rawMode;
  }
  return DEFAULT_MODE;
}

export function getDataModeLabel(mode: DataMode): DataModeStatus["label"] {
  if (mode === "live") {
    return "Live CMC Data";
  }
  if (mode === "mock") {
    return "Mock Demo";
  }
  return "Hybrid: Live CMC Data + Derived Indicators";
}

export function makeDataModeStatus(mode: DataMode, fallbackActive = false, message?: string): DataModeStatus {
  return {
    mode,
    label: getDataModeLabel(mode),
    fallbackActive,
    message
  };
}

export function mergeCmcQuotesWithMock(
  mockMarkets: MarketSignal[],
  quotes: Record<string, CmcQuote>,
  source: "live" | "hybrid"
): { markets: MarketSignal[]; missingSymbols: string[] } {
  const missingSymbols: string[] = [];

  const mergedMarkets: MarketSignal[] = mockMarkets.map((market) => {
    const quote = quotes[market.base]?.quote?.USD;
    if (!quote) {
      missingSymbols.push(market.base);
      return { ...market, dataSource: "mock" };
    }

    const livePrice = quote.price ?? market.price;
    const technicalLevels = deriveSimulatedTechnicalLevels(livePrice, market.volatilityScore);

    return {
      ...market,
      price: livePrice,
      priceChange24h: quote.percent_change_24h ?? market.priceChange24h,
      volume24h: quote.volume_24h,
      volumeChange24h: quote.volume_change_24h ?? market.volumeChange24h,
      marketCap: quote.market_cap,
      lastUpdated: quote.last_updated,
      support: technicalLevels.support,
      resistance: technicalLevels.resistance,
      dataSource: source
    };
  });

  return { markets: mergedMarkets, missingSymbols };
}

export async function getMarketData({
  mode = getConfiguredDataMode(),
  symbols = markets.map((market) => market.base)
}: {
  mode?: DataMode;
  symbols?: string[];
} = {}): Promise<{ markets: MarketSignal[]; status: DataModeStatus }> {
  if (mode === "mock") {
    return {
      markets: markets.map((market) => ({ ...market, dataSource: "mock" })),
      status: makeDataModeStatus("mock")
    };
  }

  try {
    const quotes = await fetchCmcQuotes(symbols);
    const merged = mergeCmcQuotesWithMock(markets, quotes, mode);
    const hasPartialFallback = merged.missingSymbols.length > 0;

    return {
      markets: merged.markets,
      status: makeDataModeStatus(
        mode,
        hasPartialFallback,
        hasPartialFallback ? `CMC quote missing for ${merged.missingSymbols.join(", ")}; mock fallback used for those markets.` : undefined
      )
    };
  } catch (error) {
    return {
      markets: markets.map((market) => ({ ...market, dataSource: "mock" })),
      status: makeDataModeStatus(mode, true, error instanceof Error ? error.message : "CMC unavailable")
    };
  }
}

export function getMarketFromList(marketSignals: MarketSignal[], symbol: MarketSymbol = "BNB/USDT") {
  return marketSignals.find((market) => market.symbol === symbol) ?? marketSignals[0];
}
