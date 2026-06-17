import Link from "next/link"
import { ArrowRight } from "lucide-react"

const sections = [
  {
    title: "Analyze live market conditions",
    body: "Monitor price action, momentum, volatility, volume, and market structure through a unified signal intelligence layer powered by CoinMarketCap market data.",
  },
  {
    title: "Generate explainable strategies",
    body: "Transform market signals into structured strategy specifications with transparent entry rules, exit conditions, risk controls, and AI-generated reasoning.",
  },
  {
    title: "Validate assumptions",
    body: "Review performance projections, market regimes, and risk constraints before accepting a strategy. Every output is designed for inspection rather than blind execution.",
  },
  {
    title: "Verify and reproduce results",
    body: "Each strategy includes a deterministic signal snapshot and reproducible artifact, enabling researchers and teams to audit exactly how a strategy was generated.",
  },
]

export function LandingProductSections() {
  return (
    <section className="px-5">
      <div className="mx-auto max-w-[1180px] py-20">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Left Content */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-yellow-300">
              Strategy Intelligence Platform
            </p>

            <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-slate-100 md:text-5xl">
              One Workflow. Fully Explainable.
            </h2>

            <p className="mt-6 max-w-md text-lg leading-8 text-slate-400">
              SignalPilot transforms live market intelligence into transparent,
              backtestable strategy specifications. From signal discovery to
              verification, every decision remains visible, inspectable, and
              reproducible.
            </p>

            <Link
              href="/dashboard"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-yellow-300 transition-colors hover:text-yellow-200"
            >
              Open Strategy Workspace
              <ArrowRight size={15} />
            </Link>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-3 gap-5 border-t border-slate-800 pt-6">
              <div>
                <p className="text-2xl font-semibold text-slate-100">Live</p>
                <p className="mt-1 text-xs text-slate-500">Market Signals</p>
              </div>

              <div>
                <p className="text-2xl font-semibold text-slate-100">
                  Explainable
                </p>
                <p className="mt-1 text-xs text-slate-500">Strategy Logic</p>
              </div>

              <div>
                <p className="text-2xl font-semibold text-slate-100">
                  Reproducible
                </p>
                <p className="mt-1 text-xs text-slate-500">Strategy Specs</p>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="grid gap-4">
            {sections.map((section) => (
              <div
                key={section.title}
                className="group rounded-2xl border border-slate-800 bg-slate-950/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-yellow-400/30 hover:bg-slate-900/60"
              >
                <h3 className="text-lg font-semibold text-slate-100">
                  {section.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-400">
                  {section.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
