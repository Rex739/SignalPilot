import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { MotionReveal } from "@/components/landing/motion-reveal";
import { Button } from "@/components/ui";

export function LandingHero() {
  return (
    <section className="relative min-h-[720px] overflow-hidden border-b border-slate-800 bg-[#090a0c] text-white md:min-h-[860px]">
      {/* CSS-only signal field keeps the hero sharp at every viewport without loading a decorative asset. */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(56,189,248,0.2),transparent_31rem)]" />
      <div className="absolute inset-x-0 top-0 h-[620px] opacity-75">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,10,12,0.04),#090a0c_92%)]" />
        <div className="absolute left-1/2 top-10 h-[360px] w-[760px] max-w-[190vw] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.28),rgba(8,47,73,0.12)_34%,transparent_68%)] blur-xl md:h-[420px] md:w-[1500px]" />
        <div className="absolute inset-x-0 top-20 h-[460px] bg-[repeating-linear-gradient(90deg,rgba(125,211,252,0.18)_0_1px,transparent_1px_22px)] opacity-20 [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]" />
        <div className="absolute inset-x-0 top-32 h-[280px] bg-[repeating-radial-gradient(ellipse_at_center,rgba(125,211,252,0.24)_0_1px,transparent_1px_14px)] opacity-30 [mask-image:linear-gradient(to_bottom,transparent,black_30%,transparent)]" />
      </div>

      <div className="relative mx-auto flex max-w-[1180px] items-center justify-between px-6 py-4 sm:px-8 md:py-5">
        <Link
          href="/"
          aria-label="SignalPilot home"
          className="relative h-20 w-[150px] sm:h-16 sm:w-[170px] md:h-20 md:w-[180px]"
        >
          <Image
            src="https://res.cloudinary.com/dcxghlgre/image/upload/v1781680857/signalPilot/full_logo.png"
            alt="SignalPilot logo"
            fill
            priority
            sizes="180px"
            className="object-contain object-left"
          />
        </Link>
        <Link
          href="/dashboard"
          className="hidden text-sm font-semibold text-slate-300 hover:text-white sm:inline-flex "
        >
          <Button variant="secondary" className="h-12 w-full sm:min-w-44">
            Launch Dashboard
          </Button>
        </Link>
      </div>

      <div className="relative mx-auto flex min-h-[600px] max-w-[1180px] flex-col items-center px-6 pb-14 pt-12 text-center sm:px-8 md:min-h-[740px] md:pb-20 md:pt-24 lg:pt-28">
        <MotionReveal className="inline-flex max-w-full items-center justify-center gap-2 rounded-md border border-slate-700 bg-slate-950/70 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.1em] text-slate-300 sm:text-xs sm:tracking-[0.12em]">
          <span className="rounded bg-yellow-500 px-1.5 py-0.5 text-[10px] font-bold text-slate-950">
            BNB
          </span>
          <span className="truncate">Strategy Intelligence Platform</span>
        </MotionReveal>

        <MotionReveal delay={0.08} className="mt-7 w-full max-w-[1060px]">
          <h1 className="mx-auto max-w-[22rem] font-serif text-[2.45rem] font-semibold leading-[0.98] tracking-normal text-slate-100 [text-wrap:balance] sm:max-w-[42rem] sm:text-[4.1rem] md:max-w-[56rem] md:text-[5.35rem] lg:max-w-none lg:text-[6.45rem]">
            Turn live CoinMarketCap signals into explainable strategy specs.
          </h1>
          <p className="mx-auto mt-6 max-w-[34rem] text-[15px] leading-7 text-slate-400 sm:text-base md:max-w-[820px] md:text-lg md:leading-8">
            Transforms live market data into backtestable BNB Chain strategy
            specs with risk rules, reasoning, and reproducible signal snapshots.
          </p>
          <p className="mx-auto mt-4 max-w-[32rem] text-sm leading-6 text-yellow-100/80 md:max-w-[720px] md:text-base md:leading-7">
            Research and review only. No live trading, no autonomous execution.
          </p>
          <div className="mt-8 flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button variant="secondary" className="h-12 w-full sm:min-w-44">
                Launch Dashboard
                <ArrowRight size={16} />
              </Button>
            </Link>
            <Link href="/skill" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="h-12 w-full border-slate-700 bg-slate-950/50 text-white hover:bg-slate-900 sm:min-w-44"
              >
                View Market Skill
              </Button>
            </Link>
          </div>
        </MotionReveal>

        <MotionReveal
          delay={0.18}
          className="mt-14 w-full max-w-[1010px] rounded-2xl border border-slate-800 bg-slate-950/60 p-4 shadow-2xl shadow-black/30 backdrop-blur sm:p-5 md:mt-28 lg:mt-32"
        >
          <div className="grid gap-4 text-center md:grid-cols-[1.1fr_2fr] md:items-center md:text-left">
            <p className="text-sm leading-6 text-slate-400 md:max-w-none">
              Produces verifiable strategy artifacts from signal to spec
            </p>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:justify-start">
              {[
                "Live CMC Data",
                "Derived indicators",
                "Risk rules",
                "Backtestable strategy spec",
                "Market Intelligence Skill",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-2 text-xs text-slate-300 sm:px-4 sm:text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  )
}
