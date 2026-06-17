import Link from "next/link";
import { DataModeBadge } from "@/components/data-mode-badge";
import { ResearchDisclaimer } from "@/components/disclaimer";
import { StrategyHash } from "@/components/strategy-hash";
import { Badge, Button, Card, SectionHeader } from "@/components/ui";
import { getMarketData } from "@/lib/data-mode";
import { createStrategySignalSnapshot, generateBacktest, generateStrategySpec, proofRegistry } from "@/lib/market-data";

export const dynamic = "force-dynamic";

export default async function ProofPage() {
  const marketData = await getMarketData();
  const defaultMarket = marketData.markets[0];
  const defaultStrategy = generateStrategySpec({ symbol: defaultMarket.symbol, market: defaultMarket });
  const backtest = generateBacktest(defaultStrategy);
  const snapshot = createStrategySignalSnapshot({ market: defaultMarket, strategy: defaultStrategy, backtest });

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Strategy verification"
        title="Strategy Proof Registry"
        description="SignalPilot can anchor generated strategy specs on BNB Chain for proof of authorship, timestamping, and reproducibility."
      />
      <DataModeBadge status={marketData.status} />
      <ResearchDisclaimer />

      <Card className="border-teal-300/20 bg-teal-300/10 p-5">
        <h2 className="font-semibold text-teal-100">Verification preview: no deployment yet</h2>
        <p className="mt-2 text-sm leading-6 text-teal-100/80">
          No smart contract is deployed and no transaction is sent from this environment. The Solidity registry in `contracts/StrategyProofRegistry.sol` is a minimal future anchor for strategy hashes, market labels, metadata URIs, creators, and timestamps. Mock transaction hashes below are clearly labeled.
        </p>
      </Card>

      <StrategyHash snapshot={snapshot} />

      <Card className="overflow-hidden">
        <div className="border-b border-border p-5">
          <h2 className="font-semibold">Demo strategy proof records</h2>
          <p className="mt-1 text-sm text-muted-foreground">Mock records showing how reproducible strategy artifacts could be anchored on BNB Chain for authorship, timestamping, and verification.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-sm">
            <thead className="bg-muted text-left text-xs uppercase tracking-[0.14em] text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Strategy hash</th>
                <th className="px-4 py-3">Creator wallet</th>
                <th className="px-4 py-3">Backtest score</th>
                <th className="px-4 py-3">Timestamp</th>
                <th className="px-4 py-3">Demo mode tx hash</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {proofRegistry.map((proof) => (
                <tr key={proof.strategyHash} className="border-t border-border">
                  <td className="px-4 py-4 font-mono">{proof.strategyHash}</td>
                  <td className="px-4 py-4 font-mono">{proof.creatorWallet}</td>
                  <td className="px-4 py-4 font-semibold">{proof.backtestScore}/100</td>
                  <td className="px-4 py-4">{proof.timestamp}</td>
                  <td className="px-4 py-4">
                    <p className="font-mono">{proof.transactionHash}</p>
                    <p className="mt-1 text-xs text-muted-foreground">Mock only; not deployed</p>
                  </td>
                  <td className="px-4 py-4">
                    <Badge variant={proof.status === "Indexed" ? "positive" : "muted"}>{proof.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Hashing</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">Future versions can hash exported strategy JSON before submitting `recordStrategy(bytes32,string,string)` metadata.</p>
        </Card>
        <Card className="p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Wallet identity</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">Future wallet integration can associate creator identity and user approvals without adding live trade execution.</p>
        </Card>
        <Card className="p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Registry</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">BNB Chain storage can later anchor hashes, creators, markets, metadata URIs, and timestamps.</p>
        </Card>
      </div>

      <Card className="grid gap-4 p-5 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <h2 className="font-semibold">Demo loop complete</h2>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            Return to the dashboard to show the full flow again: signals, strategy generation, backtest, export, and mock proof.
          </p>
        </div>
        <Link href="/dashboard">
          <Button variant="secondary">Restart Demo Flow</Button>
        </Link>
      </Card>
    </div>
  );
}
