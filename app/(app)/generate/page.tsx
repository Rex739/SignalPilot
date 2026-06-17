import Link from "next/link";
import { ArrowRight, BarChart3, ChevronDown, WandSparkles } from "lucide-react";
import { DataModeBadge } from "@/components/data-mode-badge";
import { ResearchDisclaimer } from "@/components/disclaimer";
import { Badge, Button, Card, SectionHeader, Select } from "@/components/ui";
import { getMarketData, getMarketFromList } from "@/lib/data-mode";
import { generateStrategySpec, type MarketSymbol, type RiskLevel, type Timeframe } from "@/lib/market-data";
import { formatCompactNumber, formatCurrency, formatPercent, signedToneClass } from "@/lib/utils";

type GenerateSearchParams = {
  market?: MarketSymbol;
  risk?: RiskLevel;
  timeframe?: Timeframe;
};

export const dynamic = "force-dynamic";

export default async function GeneratePage({
  searchParams
}: {
  searchParams: Promise<GenerateSearchParams>;
}) {
  const resolvedSearchParams = await searchParams;
  const marketData = await getMarketData();
  const markets = marketData.markets;
  const selectedMarket = getMarketFromList(markets, resolvedSearchParams.market ?? "BNB/USDT");
  const strategy = generateStrategySpec({
    symbol: selectedMarket.symbol,
    riskLevel: resolvedSearchParams.risk ?? "Balanced",
    timeframe: resolvedSearchParams.timeframe ?? "1D",
    market: selectedMarket
  });

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Strategy generation engine"
        title="Generate an explainable strategy spec"
        description="Select a market, risk level, and timeframe. SignalPilot returns a deterministic, backtestable strategy spec with CMC quote fields, clearly labeled derived indicators, market regime, risk rules, and human-readable reasoning."
      />
      <DataModeBadge status={marketData.status} />
      <ResearchDisclaimer />

      <Card className="p-5">
        <form
          className="grid gap-4 md:grid-cols-[1fr_1fr_1fr_auto]"
          action="/generate"
        >
          <label className="space-y-2 text-sm font-medium">
            Market
            <div className="relative">
              <Select
                className="appearance-none pr-10"
                name="market"
                defaultValue={strategy.symbol}
              >
                {markets.map((market) => (
                  <option key={market.symbol} value={market.symbol}>
                    {market.symbol}
                  </option>
                ))}
              </Select>
              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>
          </label>
          <label className="space-y-2 text-sm font-medium">
            Risk level
            <div className="relative">
              <Select
                name="risk"
                defaultValue={strategy.riskLevel}
                className="appearance-none pr-10"
              >
                {["Conservative", "Balanced", "Aggressive"].map((risk) => (
                  <option key={risk} value={risk}>
                    {risk}
                  </option>
                ))}
              </Select>
              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>
          </label>
          <label className="space-y-2 text-sm font-medium">
            Timeframe
            <div className="relative">
              <Select
                name="timeframe"
                defaultValue={strategy.timeframe}
                className="appearance-none pr-10"
              >
                {["4H", "1D", "1W"].map((timeframe) => (
                  <option key={timeframe} value={timeframe}>
                    {timeframe}
                  </option>
                ))}
              </Select>
              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>
          </label>
          <div className="flex items-end">
            <Button type="submit" variant="secondary" className="w-full">
              <WandSparkles size={16} />
              Generate
            </Button>
          </div>
        </form>
        <div className="mt-5 grid gap-3 border-t border-border pt-5 sm:grid-cols-2 lg:grid-cols-5">
          <MarketMetric label="Selected market" value={selectedMarket.symbol} />
          <MarketMetric
            label="Price"
            value={formatCurrency(selectedMarket.price)}
          />
          <MarketMetric
            label="24h price"
            value={formatPercent(selectedMarket.priceChange24h)}
            tone={signedToneClass(selectedMarket.priceChange24h)}
          />
          <MarketMetric
            label="24h volume"
            value={formatCompactNumber(selectedMarket.volume24h)}
          />
          <MarketMetric
            label="Volume change"
            value={formatPercent(selectedMarket.volumeChange24h)}
            tone={signedToneClass(selectedMarket.volumeChange24h)}
          />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge
            variant={
              selectedMarket.dataSource === "mock" ? "muted" : "positive"
            }
          >
            Source: {selectedMarket.dataSource ?? "unknown"}
          </Badge>
          <Badge variant="outline">
            Updated:{" "}
            {selectedMarket.lastUpdated
              ? new Date(selectedMarket.lastUpdated).toLocaleString()
              : "Mock snapshot"}
          </Badge>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          {selectedMarket.lastUpdated
            ? `Live CMC Data updated ${new Date(selectedMarket.lastUpdated).toLocaleString()}; RSI, MACD, EMA, volatility, sentiment, and support/resistance are derived indicators.`
            : "Using mock fallback snapshot with derived indicators"}
        </p>
      </Card>

      <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <Card className="p-5">
          <Badge variant="outline">{strategy.marketRegime}</Badge>
          <h2 className="mt-4 text-2xl font-semibold">{strategy.name}</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {strategy.type} for {strategy.symbol}
          </p>
          <div className="mt-5 grid gap-3">
            <Metric label="Risk level" value={strategy.riskLevel} />
            <Metric label="Timeframe" value={strategy.timeframe} />
            <Metric
              label="Confidence"
              value={`${strategy.confidenceScore}/100`}
            />
            <Metric label="Position sizing" value={strategy.positionSizing} />
            <Metric label="Stop loss" value={strategy.stopLoss} />
            <Metric label="Take profit" value={strategy.takeProfit} />
          </div>
        </Card>

        <Card className="p-5">
          <h2 className="font-semibold">Generated research logic</h2>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <LogicBlock
              title="Entry conditions"
              items={strategy.entryConditions}
            />
            <LogicBlock
              title="Exit conditions"
              items={strategy.exitConditions}
            />
            <LogicBlock title="Risk rules" items={strategy.riskRules} />
            <LogicBlock
              title="CMC quote fields and derived indicators used"
              items={strategy.signalsUsed}
            />
          </div>
          <div className="mt-5 rounded-lg border border-border bg-slate-950/45 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              Human-readable reasoning
            </p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {strategy.reasoning}
            </p>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/backtest">
              <Button variant="secondary">
                <BarChart3 size={16} />
                View backtest
              </Button>
            </Link>
            <Link href="/spec">
              <Button variant="outline">
                Open strategy spec
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-slate-950/45 p-3">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm font-medium">{value}</p>
    </div>
  );
}

function MarketMetric({ label, value, tone }: { label: string; value: string; tone?: string }) {
  return (
    <div className="rounded-lg border border-border bg-slate-950/45 p-3">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
      <p className={`mt-1 text-sm font-semibold ${tone ?? ""}`}>{value}</p>
    </div>
  );
}

function LogicBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
        {items.map((item) => (
          <li key={item} className="rounded-md border border-border bg-slate-950/45 px-3 py-2">{item}</li>
        ))}
      </ul>
    </div>
  );
}
