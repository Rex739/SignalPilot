import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { MotionReveal } from "@/components/landing/motion-reveal";
import { Button } from "@/components/ui";

export function LandingHero() {
  return (
    <section className="relative min-h-[760px] overflow-hidden border-b border-slate-800 bg-[#090a0c] text-white md:min-h-[860px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(56,189,248,0.2),transparent_31rem)]" />
      <div className="absolute inset-x-0 top-0 h-[620px] opacity-75">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,10,12,0.04),#090a0c_92%)]" />
        <div className="absolute left-1/2 top-10 h-[420px] w-[1500px] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.28),rgba(8,47,73,0.12)_34%,transparent_68%)] blur-xl" />
        <div className="absolute inset-x-0 top-20 h-[460px] bg-[repeating-linear-gradient(90deg,rgba(125,211,252,0.18)_0_1px,transparent_1px_22px)] opacity-20 [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]" />
        <div className="absolute inset-x-0 top-32 h-[280px] bg-[repeating-radial-gradient(ellipse_at_center,rgba(125,211,252,0.24)_0_1px,transparent_1px_14px)] opacity-30 [mask-image:linear-gradient(to_bottom,transparent,black_30%,transparent)]" />
      </div>

      <div className="relative mx-auto flex max-w-[1180px] items-center justify-between px-6 py-5 sm:px-8">
        <Link href="/" aria-label="SignalPilot home" className="relative h-20 w-[180px]">
          <Image
            src="https://res.cloudinary.com/dcxghlgre/image/upload/v1781680857/signalPilot/full_logo.png"
            alt="SignalPilot logo"
            fill
            priority
            sizes="180px"
            className="object-contain object-left"
          />
        </Link>
        <Link href="/dashboard" className="hidden text-sm font-semibold text-slate-300 hover:text-white sm:inline-flex">
          Launch Dashboard
        </Link>
      </div>

      <div className="relative mx-auto flex min-h-[640px] max-w-[1180px] flex-col items-center px-6 pb-16 pt-16 text-center sm:px-8 md:min-h-[740px] md:pb-20 md:pt-24 lg:pt-28">
        <MotionReveal className="inline-flex items-center gap-2 rounded-md border border-slate-700 bg-slate-950/70 px-3 py-2 font-mono text-xs uppercase tracking-[0.12em] text-slate-300">
          <span className="rounded bg-yellow-500 px-1.5 py-0.5 text-[10px] font-bold text-slate-950">BNB</span>
          Strategy Intelligence Platform
        </MotionReveal>

        <MotionReveal delay={0.08} className="mt-8 max-w-[1060px]">
          <h1 className="font-serif text-[3.2rem] font-semibold leading-[0.94] tracking-normal text-slate-100 sm:text-[4.1rem] md:text-[5.35rem] lg:text-[6.45rem]">
            Turn live CoinMarketCap signals into explainable strategy specs.
          </h1>
          <p className="mx-auto mt-7 max-w-[820px] text-base leading-8 text-slate-400 md:text-lg">
            Transforms live market data into backtestable BNB Chain strategy specs with risk rules, reasoning, and reproducible signal snapshots.
          </p>
          <p className="mx-auto mt-4 max-w-[720px] text-sm leading-7 text-yellow-100/80 md:text-base">
            Research and review only. No live trading, no autonomous execution.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/dashboard">
              <Button variant="secondary" className="h-12 min-w-44">
                Launch Dashboard
                <ArrowRight size={16} />
              </Button>
            </Link>
            <Link href="/skill">
              <Button variant="outline" className="h-12 min-w-44 border-slate-700 bg-slate-950/50 text-white hover:bg-slate-900">
                View Market Skill
              </Button>
            </Link>
          </div>
        </MotionReveal>

        <MotionReveal delay={0.18} className="mt-20 w-full max-w-[1010px] rounded-2xl border border-slate-800 bg-slate-950/60 p-5 shadow-2xl shadow-black/30 backdrop-blur md:mt-28 lg:mt-32">
          <div className="grid gap-4 text-left md:grid-cols-[1.1fr_2fr] md:items-center">
            <p className="text-sm leading-6 text-slate-400">
              Produces verifiable strategy artifacts from signal to spec
            </p>
            <div className="flex flex-wrap gap-3">
              {["Live CMC Data", "Derived indicators", "Risk rules", "Backtestable strategy spec", "Market Intelligence Skill"].map((item) => (
                <span key={item} className="rounded-full border border-slate-700 bg-slate-900/70 px-4 py-2 text-sm text-slate-300">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
