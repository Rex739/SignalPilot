import { BadgeCheck, Bot, ChartNoAxesCombined, FileJson, ShieldCheck } from "lucide-react";

const fitItems = [
  {
    title: "Powered by CoinMarketCap market data",
    description: "Live CMC Data is used for quote fields when available; derived indicators are clearly labeled.",
    icon: ChartNoAxesCombined
  },
  {
    title: "Produces backtestable strategy specs",
    description: "Each output includes entry rules, exit rules, risk controls, backtest parameters, and JSON export.",
    icon: FileJson
  },
  {
    title: "Research-only strategy analysis",
    description: "SignalPilot is a research layer. It does not route orders, custody assets, or submit trades.",
    icon: ShieldCheck
  },
  {
    title: "Packaged as a Market Intelligence Skill",
    description: "The skill package is structured for reusable strategy generation workflows.",
    icon: Bot
  },
  {
    title: "Built for explainability and risk rules",
    description: "The spec preserves the signal snapshot, reasoning, invalidation logic, and risk model.",
    icon: BadgeCheck
  }
];

export function LandingTrackTwo() {
  return (
    <section className="px-5">
      <div className="mx-auto max-w-[1180px] border-y border-slate-800 py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">
              Strategy Intelligence Platform
            </p>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-slate-100 md:text-5xl">
              Why SignalPilot fits professional strategy teams
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-400">
              SignalPilot is a CoinMarketCap-powered signal layer that turns market snapshots into reusable skill output: an explainable, backtestable strategy spec with explicit risk rules.
            </p>
          </div>

          <div className="divide-y divide-slate-800 border-y border-slate-800">
            {fitItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="grid gap-4 py-5 sm:grid-cols-[2.5rem_1fr]">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md border border-slate-800 bg-slate-950/70 text-cyan-300">
                    <Icon size={18} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-100">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
