import Link from "next/link";
import { DrawdownChart, EquityCurve } from "@/components/charts";
import { DataModeBadge } from "@/components/data-mode-badge";
import { ResearchDisclaimer } from "@/components/disclaimer";
import { Badge, Button, Card, SectionHeader } from "@/components/ui";
import { getMarketData } from "@/lib/data-mode";
import { generateBacktest, generateStrategySpec } from "@/lib/market-data";
import { formatPercent, signedToneClass } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function BacktestPage() {
  const marketData = await getMarketData();
  const defaultMarket = marketData.markets[0];
  const defaultStrategy = generateStrategySpec({ symbol: defaultMarket.symbol, market: defaultMarket });
  const backtest = generateBacktest(defaultStrategy);

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Backtest engine"
        title="Professional strategy metrics"
        description="A strategy analysis report for the generated BNB strategy. The metrics are research output for the backtest engine and are ready to be replaced by a real historical data adapter."
      />
      <DataModeBadge status={marketData.status} />
      <ResearchDisclaimer />

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
        <Metric label="Total return" value={formatPercent(backtest.totalReturn)} tone={signedToneClass(backtest.totalReturn)} />
        <Metric label="Sharpe" value={backtest.sharpeRatio.toString()} />
        <Metric label="Max drawdown" value={formatPercent(backtest.maxDrawdown)} tone={signedToneClass(backtest.maxDrawdown)} />
        <Metric label="Win rate" value={formatPercent(backtest.winRate)} tone="text-emerald-300" />
        <Metric label="Profit factor" value={backtest.profitFactor.toString()} />
        <Metric label="Trades" value={backtest.totalTrades.toString()} />
      </div>
      <Card className="grid gap-4 p-5 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <h2 className="font-semibold">{defaultStrategy.name}</h2>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            Review the generated strategy detail to inspect Live CMC Data inputs, derived indicators, entry and exit rules, risk controls, reasoning, backtest output, and exportable JSON.
          </p>
        </div>
        <Link href="/spec">
          <Button variant="secondary">Open Strategy Detail</Button>
        </Link>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-semibold">Equity curve</h2>
            <Badge variant="positive">{defaultStrategy.name}</Badge>
          </div>
          <EquityCurve data={backtest.equityCurve} />
        </Card>
        <Card className="p-5">
          <h2 className="font-semibold">Drawdown curve</h2>
          <DrawdownChart data={backtest.drawdownCurve} />
        </Card>
      </div>

      <Card className="overflow-hidden">
        <div className="border-b border-border p-5">
          <h2 className="font-semibold">Regime performance</h2>
          <p className="mt-1 text-sm text-muted-foreground">Performance grouped by market regime for explainable review.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[620px] text-sm">
            <thead className="bg-muted text-left text-xs uppercase tracking-[0.14em] text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Regime</th>
                <th className="px-4 py-3">Return</th>
                <th className="px-4 py-3">Win rate</th>
                <th className="px-4 py-3">Interpretation</th>
              </tr>
            </thead>
            <tbody>
              {backtest.regimePerformance.map((row) => (
                <tr key={row.regime} className="border-t border-border">
                  <td className="px-4 py-4 font-semibold">{row.regime}</td>
                  <td className={`px-4 py-4 font-semibold ${signedToneClass(row.return)}`}>{formatPercent(row.return)}</td>
                  <td className="px-4 py-4 font-semibold text-emerald-300">{formatPercent(row.winRate)}</td>
                  <td className="px-4 py-4 text-muted-foreground">
                    {row.return > 10 ? "Primary favorable regime" : row.return > 0 ? "Tradable with confirmation" : "Reduce exposure or skip"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="grid gap-4 p-5 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <h2 className="font-semibold">Next step: register a mock proof</h2>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            The MVP proof page demonstrates how a future BNB Chain registry could anchor strategy hashes and backtest attestations.
          </p>
        </div>
        <Link href="/proof">
          <Button variant="outline">View Proof Registry</Button>
        </Link>
      </Card>
    </div>
  );
}

function Metric({ label, value, tone }: { label: string; value: string; tone?: string }) {
  return (
    <Card className="p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
      <p className={`mt-2 text-xl font-semibold ${tone ?? ""}`}>{value}</p>
    </Card>
  );
}
