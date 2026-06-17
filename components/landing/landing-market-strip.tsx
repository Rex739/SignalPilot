import { Badge } from "@/components/ui";
import { DataModeBadge } from "@/components/data-mode-badge";
import { MotionReveal } from "@/components/landing/motion-reveal";
import type { DataModeStatus } from "@/lib/data-mode";
import type { MarketSignal } from "@/lib/market-data";
import { formatCompactNumber, formatPercent } from "@/lib/utils";

export function LandingMarketStrip({
  markets,
  status
}: {
  markets: MarketSignal[];
  status: DataModeStatus;
}) {
  return (
    <section className="mx-auto max-w-[1180px] px-5">
      <MotionReveal>
        <h2 className="text-center font-serif text-5xl font-semibold leading-tight text-slate-100 md:text-6xl">
          Universal Strategy Inputs
        </h2>
        <div className="mt-4 flex justify-center">
          <DataModeBadge status={status} />
        </div>
      </MotionReveal>

      <div className="mt-12 grid gap-10 border-t border-slate-800 pt-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <MotionReveal delay={0.06} className="divide-y divide-slate-800">
          {[
            ["CoinMarketCap-powered signal layer", "Hybrid mode uses Live CMC Data for quote fields when available, then clearly labels derived RSI, MACD, EMA trend, volatility, sentiment, and narrative momentum."],
            ["Backtestable strategy spec", "Generated specs include deterministic entry logic, exit logic, risk rules, and confidence scoring."],
            ["Proof hash placeholder", "A browser SHA-256 hash can later be stored on BNB Chain as proof of the generated strategy and backtest result."]
          ].map(([title, description], index) => (
            <div key={title} className="grid gap-5 py-7 first:pt-0 sm:grid-cols-[42px_1fr]">
              <span className="font-mono text-sm text-slate-500">0{index + 1}</span>
              <div>
                <h3 className="font-serif text-2xl font-semibold text-slate-100">{title}</h3>
                <p className="mt-3 max-w-xl text-base leading-8 text-slate-400">{description}</p>
              </div>
            </div>
          ))}
        </MotionReveal>

        <MotionReveal delay={0.12} className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">
          <div className="border-b border-slate-800 px-4 py-3 font-mono text-xs text-yellow-300">
            CMC_SIGNAL_FEED / {status.fallbackActive ? "MOCK FALLBACK" : status.mode === "mock" ? "MOCK" : "LIVE CMC DATA"}
          </div>
          <div className="divide-y divide-slate-800">
            {markets.map((market) => (
              <div key={market.symbol} className="grid grid-cols-[1fr_auto] gap-4 px-4 py-4">
                <div>
                  <h3 className="font-semibold text-slate-100">{market.symbol}</h3>
                  <p className="mt-1 text-sm text-slate-500">{market.marketRegime} regime</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-lg text-slate-100">${market.price.toLocaleString()}</p>
                  <p className="font-mono text-xs text-slate-500">Vol {formatCompactNumber(market.volume24h)}</p>
                  <Badge variant={market.priceChange24h >= 0 ? "positive" : "negative"}>
                    {formatPercent(market.priceChange24h)}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
