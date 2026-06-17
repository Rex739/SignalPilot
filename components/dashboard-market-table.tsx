"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, Search } from "lucide-react";
import { Badge, Button, Card, Input, Select } from "@/components/ui";
import { calculateSignalScore, type MarketSignal } from "@/lib/market-data";
import { formatCompactNumber, formatCurrency, formatPercent, signedToneClass } from "@/lib/utils";

type SortKey = "signalScore" | "priceChange24h" | "volume24h";

const regimeOptions = ["All", "Expansion", "Compression", "Risk-off", "Rotation"] as const;
type RegimeFilter = (typeof regimeOptions)[number];

export function DashboardMarketTable({ markets }: { markets: MarketSignal[] }) {
  const [query, setQuery] = useState("");
  const [regime, setRegime] = useState<RegimeFilter>("All");
  const [sortKey, setSortKey] = useState<SortKey>("signalScore");

  const rows = useMemo(() => {
    return markets
      .map((market) => ({
        ...market,
        signalScore: calculateSignalScore(market)
      }))
      .filter((market) => market.symbol.toLowerCase().includes(query.trim().toLowerCase()))
      .filter((market) => regime === "All" || market.marketRegime === regime)
      .sort((a, b) => {
        const aValue = sortKey === "volume24h" ? a.volume24h ?? 0 : a[sortKey];
        const bValue = sortKey === "volume24h" ? b.volume24h ?? 0 : b[sortKey];
        return bValue - aValue;
      });
  }, [markets, query, regime, sortKey]);

  return (
    <Card className="overflow-hidden">
      <div className="border-b border-border p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="font-semibold">Signal matrix</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Compact market ranking for scalable CoinMarketCap-powered strategy
              review.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 lg:w-[680px]">
            <label className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Search
              </span>
              <div className="relative">
                <Search
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  size={15}
                />
                <Input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="BNB, BTC..."
                  className="pl-9"
                />
              </div>
            </label>
            <label className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Regime
              </span>
              <div className="relative">
                <Select
                  value={regime}
                  onChange={(event) =>
                    setRegime(event.target.value as RegimeFilter)
                  }
                  className="appearance-none pr-10"
                >
                  {regimeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>
            </label>
            <label className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Sort
              </span>
              <div className="relative">
                <Select
                  value={sortKey}
                  onChange={(event) =>
                    setSortKey(event.target.value as SortKey)
                  }
                  className="appearance-none pr-10"
                >
                  <option value="signalScore">Signal score</option>
                  <option value="priceChange24h">24h change</option>
                  <option value="volume24h">Volume</option>
                </Select>
                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>
            </label>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[980px] text-sm">
          <thead className="sticky top-0 z-10 bg-muted text-left text-xs uppercase tracking-[0.14em] text-muted-foreground">
            <tr>
              {[
                "Market",
                "Source",
                "Price",
                "24h",
                "Volume",
                "RSI",
                "Regime",
                "Signal Score",
                "Action",
              ].map((header) => (
                <th key={header} className="px-4 py-3 font-semibold">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((market) => (
              <tr
                key={market.symbol}
                className="border-t border-border transition-colors hover:bg-slate-900/35"
              >
                <td className="px-4 py-4">
                  <p className="font-semibold text-slate-100">
                    {market.symbol}
                  </p>
                  <p className="text-xs text-muted-foreground">{market.base}</p>
                </td>
                <td className="px-4 py-4">
                  <Badge
                    variant={
                      market.dataSource === "mock" ? "muted" : "positive"
                    }
                  >
                    {market.dataSource === "mock"
                      ? "Mock fallback"
                      : market.dataSource === "hybrid"
                        ? "Live CMC + derived"
                        : "Live CMC"}
                  </Badge>
                  <p className="mt-1 max-w-[180px] truncate text-xs text-muted-foreground">
                    {market.lastUpdated
                      ? new Date(market.lastUpdated).toLocaleString()
                      : "Mock snapshot"}
                  </p>
                </td>
                <td className="px-4 py-4 font-medium">
                  {formatCurrency(market.price)}
                </td>
                <td className="px-4 py-4">
                  <Badge
                    variant={
                      market.priceChange24h >= 0 ? "positive" : "negative"
                    }
                  >
                    {formatPercent(market.priceChange24h)}
                  </Badge>
                </td>
                <td className="px-4 py-4">
                  <p className="font-medium">
                    {formatCompactNumber(market.volume24h)}
                  </p>
                  <p
                    className={`mt-1 text-xs font-semibold ${signedToneClass(market.volumeChange24h)}`}
                  >
                    {formatPercent(market.volumeChange24h)}
                  </p>
                </td>
                <td className="px-4 py-4">{market.rsi}</td>
                <td className="px-4 py-4">
                  <Badge variant="outline">{market.marketRegime}</Badge>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-800">
                      <div
                        className="h-full rounded-full bg-cyan-300"
                        style={{ width: `${market.signalScore}%` }}
                      />
                    </div>
                    <span className="font-semibold">{market.signalScore}</span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <Link
                    href={`/generate?market=${encodeURIComponent(market.symbol)}`}
                  >
                    <Button variant="secondary" className="h-9 px-3">
                      Generate
                      <ArrowRight size={14} />
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
            {rows.length === 0 ? (
              <tr className="border-t border-border">
                <td
                  className="px-4 py-10 text-center text-muted-foreground"
                  colSpan={9}
                >
                  No markets match the current search and regime filter.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      <div className="border-t border-border px-5 py-3 text-xs text-muted-foreground">
        Showing {rows.length} of {markets.length} markets. Detailed indicator
        context is shown in Generate and Spec.
      </div>
    </Card>
  )
}
