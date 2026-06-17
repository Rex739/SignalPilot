import { DashboardShell } from "@/components/dashboard-shell";
import { getMarketData } from "@/lib/data-mode";

export const dynamic = "force-dynamic";

export default async function DashboardAppLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const marketData = await getMarketData();
  const latestTimestamp = marketData.markets
    .map((market) => market.lastUpdated)
    .filter(Boolean)
    .sort()
    .at(-1);

  return (
    <DashboardShell status={marketData.status} lastUpdated={latestTimestamp}>
      {children}
    </DashboardShell>
  );
}
