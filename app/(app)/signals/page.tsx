import { SignalBarChart } from "@/components/charts";
import { DashboardMarketTable } from "@/components/dashboard-market-table";
import { DataModeBadge } from "@/components/data-mode-badge";
import { ResearchDisclaimer } from "@/components/disclaimer";
import { Badge, Card, SectionHeader } from "@/components/ui";
import { getMarketData } from "@/lib/data-mode";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const marketData = await getMarketData();
  const markets = marketData.markets;

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Live market signal terminal"
        title="Signals"
        description="A CoinMarketCap-powered signal layer for BNB Chain strategy generation. Fallback snapshots are isolated behind an MCP-ready market data adapter so future CMC Agent Hub integrations can replace the feed without changing the strategy layer."
      />
      <div className="flex flex-wrap items-center gap-2">
        <DataModeBadge status={marketData.status} />
        <Badge variant="outline">CMC Agent Hub Ready</Badge>
      </div>
      <ResearchDisclaimer />

      <DashboardMarketTable markets={markets} />

      <Card className="p-5">
        <h2 className="font-semibold">Signal strength</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Secondary view of sentiment, narrative momentum, and ATR-style volatility. Use Generate or Spec for full indicator explanations.
        </p>
        <SignalBarChart
          data={markets.map((market) => ({
            symbol: market.base,
            sentiment: market.sentimentScore,
            narrative: market.narrativeMomentum,
            volatility: market.volatilityScore
          }))}
        />
      </Card>
    </div>
  );
}
