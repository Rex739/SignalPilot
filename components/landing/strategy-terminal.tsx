import { defaultStrategy, generateBacktest } from "@/lib/market-data";
import { formatPercent } from "@/lib/utils";

const backtest = generateBacktest(defaultStrategy);

export function StrategyTerminal() {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-slate-700 bg-slate-900/95 shadow-2xl shadow-black/40">
      <div className="flex items-center justify-between gap-3 border-b border-slate-800 bg-slate-950/80 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-teal-300" />
        </div>
        <p className="truncate font-mono text-xs text-slate-500">signalpilot/spec.json</p>
      </div>

      <div className="grid gap-4 p-4 lg:grid-cols-[0.78fr_1.22fr]">
        <div className="divide-y divide-slate-800 rounded-xl border border-slate-800 bg-slate-950/70">
          <TerminalMetric label="Strategy" value={defaultStrategy.type} />
          <TerminalMetric label="Confidence" value={`${defaultStrategy.confidenceScore}/100`} />
          <TerminalMetric label="Return" value={formatPercent(backtest.totalReturn)} tone="positive" />
          <TerminalMetric label="Max drawdown" value={formatPercent(backtest.maxDrawdown)} tone="risk" />
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950/90 p-5">
          <div className="flex items-center justify-between gap-3">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-yellow-300">generated reasoning</p>
            <span className="rounded-full border border-teal-300/20 bg-teal-300/10 px-2 py-1 font-mono text-[10px] text-teal-200">
              explainable
            </span>
          </div>
          <p className="mt-3 text-sm leading-7 text-slate-300">{defaultStrategy.reasoning}</p>
        </div>
      </div>

      <div className="border-t border-slate-800 bg-slate-950/80 p-4">
        <div className="grid min-w-0 gap-2 font-mono text-xs text-slate-400 md:grid-cols-3">
          <span className="min-w-0 rounded-md bg-slate-900 px-2 py-1 break-words">risk.max_trade: 1.6%</span>
          <span className="min-w-0 rounded-md bg-slate-900 px-2 py-1 break-words">regime: {defaultStrategy.marketRegime}</span>
          <span className="min-w-0 rounded-md bg-slate-900 px-2 py-1 break-words">proof: pending</span>
        </div>
      </div>
    </div>
  );
}

function TerminalMetric({
  label,
  value,
  tone
}: {
  label: string;
  value: string;
  tone?: "positive" | "risk";
}) {
  return (
    <div className="p-4">
      <p className="text-xs uppercase tracking-[0.16em] text-slate-500">{label}</p>
      <p className={tone === "positive" ? "mt-2 font-semibold text-teal-300" : tone === "risk" ? "mt-2 font-semibold text-red-300" : "mt-2 font-semibold text-white"}>
        {value}
      </p>
    </div>
  );
}
