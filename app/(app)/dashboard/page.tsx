import Link from "next/link";
import type { ComponentType } from "react";
import { ArrowRight, BarChart3, FileJson, Gauge, Sparkles } from "lucide-react";
import { Badge, Button, Card, SectionHeader } from "@/components/ui";
import { getMarketData } from "@/lib/data-mode";
import { calculateSignalScore, generateBacktest, generateStrategySpec } from "@/lib/market-data";
import { formatPercent, signedToneClass } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function DashboardOverviewPage() {
  const marketData = await getMarketData();
  const markets = marketData.markets;
  const scoredMarkets = markets
    .map((market) => ({ ...market, signalScore: calculateSignalScore(market) }))
    .sort((a, b) => b.signalScore - a.signalScore);
  const topMarket = scoredMarkets[0];
  const latestStrategy = generateStrategySpec({ symbol: topMarket.symbol, market: topMarket });
  const backtest = generateBacktest(latestStrategy);
  const dominantRegime = Object.entries(
    markets.reduce<Record<string, number>>((acc, market) => {
      acc[market.marketRegime] = (acc[market.marketRegime] ?? 0) + 1;
      return acc;
    }, {})
  ).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "Mixed";

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="App overview"
        title="SignalPilot Strategy Workspace"
        description="A strategy intelligence dashboard for turning Live CMC Data and derived indicators into explainable, backtestable strategy specs."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <OverviewCard label="Markets tracked" value={markets.length.toString()} detail="BNB, CAKE, BTC, ETH" />
        <OverviewCard label="Highest signal score" value={`${topMarket.signalScore}/100`} detail={topMarket.symbol} />
        <OverviewCard label="Dominant regime" value={dominantRegime} detail="Across tracked markets" />
        <OverviewCard label="Latest strategy" value={latestStrategy.type} detail={latestStrategy.symbol} />
      </div>

      <Card className="grid gap-5 p-5 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">CMC Agent Hub Ready</Badge>
            <Badge variant="positive">Backtestable strategy spec</Badge>
          </div>
          <h2 className="mt-4 text-2xl font-semibold">{latestStrategy.name}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
            Latest generated strategy from the strongest market signal. Includes entry rules, exit rules, risk controls, AI reasoning, mock backtest metrics, and a deterministic strategy hash.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:w-[360px]">
          <Metric label="Backtest return" value={formatPercent(backtest.totalReturn)} tone={signedToneClass(backtest.totalReturn)} />
          <Metric label="Max drawdown" value={formatPercent(backtest.maxDrawdown)} tone={signedToneClass(backtest.maxDrawdown)} />
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <QuickLink href="/signals" title="View Signals" description="Open the live market signal terminal." icon={Gauge} />
        <QuickLink href={`/generate?market=${encodeURIComponent(topMarket.symbol)}`} title="Generate Strategy" description="Create an explainable strategy spec." icon={Sparkles} />
        <QuickLink href="/spec" title="Strategy Spec" description="Inspect the final JSON artifact and hash." icon={FileJson} />
        <QuickLink href="/backtest" title="Backtest Report" description="Review metrics, equity curve, and drawdown." icon={BarChart3} />
      </div>
    </div>
  );
}

function OverviewCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <Card className="p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
      <p className="mt-3 text-2xl font-semibold">{value}</p>
      <p className="mt-1 text-sm text-muted-foreground">{detail}</p>
    </Card>
  );
}

function Metric({ label, value, tone }: { label: string; value: string; tone?: string }) {
  return (
    <div className="rounded-lg border border-border bg-slate-950/45 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
      <p className={`mt-2 text-lg font-semibold ${tone ?? ""}`}>{value}</p>
    </div>
  );
}

function QuickLink({
  href,
  title,
  description,
  icon: Icon
}: {
  href: string;
  title: string;
  description: string;
  icon: ComponentType<{ size?: number; className?: string }>;
}) {
  return (
    <Link href={href}>
      <Card className="group h-full p-5 transition hover:border-cyan-300/35 hover:bg-slate-900/60">
        <div className="flex items-center justify-between gap-3">
          <Icon size={20} className="text-cyan-300" />
          <ArrowRight size={16} className="text-slate-500 transition group-hover:translate-x-1 group-hover:text-cyan-200" />
        </div>
        <h3 className="mt-5 font-semibold">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
      </Card>
    </Link>
  );
}
