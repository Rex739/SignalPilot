import Link from "next/link"
import Image from "next/image"

export function LandingFooter() {
  return (
    <footer className="border-t border-slate-800 bg-gradient-to-b from-black to-slate-950 px-6 pb-10 pt-14 sm:px-8 sm:pt-16">
      <div className="mx-auto max-w-[1180px]">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-[1.6fr_1fr_1fr_1fr] md:gap-12">
          {/* Brand */}
          <div>
            <div className="relative h-20 w-[160px] sm:w-[180px]">
              <Image
                src="https://res.cloudinary.com/dcxghlgre/image/upload/v1781680857/signalPilot/full_logo.png"
                alt="SignalPilot logo"
                fill
                priority
                sizes="180px"
                className="object-contain object-left"
              />
            </div>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-400">
              Explainable strategy intelligence powered by live market data.
              Generate, analyze, backtest, and verify strategy specifications
              from a single workflow.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-200">
              Product
            </h3>

            <div className="flex flex-col gap-3 text-sm">
              <Link
                href="/signals"
                className="text-slate-400 transition-colors hover:text-white"
              >
                Signals
              </Link>

              <Link
                href="/generate"
                className="text-slate-400 transition-colors hover:text-white"
              >
                Generate Strategy
              </Link>

              <Link
                href="/backtest"
                className="text-slate-400 transition-colors hover:text-white"
              >
                Backtest Engine
              </Link>

              <Link
                href="/proof"
                className="text-slate-400 transition-colors hover:text-white"
              >
                Proof Registry
              </Link>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-200">
              Platform
            </h3>

            <div className="flex flex-col gap-3 text-sm text-slate-400">
              <span>Strategy Intelligence</span>
              <span>Market Analysis</span>
              <span>Risk Framework</span>
              <span>Strategy Verification</span>
            </div>
          </div>

          {/* Technology */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-200">
              Technology
            </h3>

            <div className="flex flex-col gap-3 text-sm text-slate-400">
              <span>CoinMarketCap Data</span>
              <span>BNB Chain</span>
              <span>Reproducible Specs</span>
              <span>Explainable AI</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 flex flex-col gap-4 border-t border-slate-800 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-slate-500">
            © 2026 SignalPilot. All rights reserved.
          </p>

          <p className="max-w-2xl text-xs text-slate-500 md:text-right">
            SignalPilot generates explainable strategy specifications from
            market data. No live trade execution. No custody. No financial
            advice.
          </p>
        </div>
      </div>
    </footer>
  )
}
