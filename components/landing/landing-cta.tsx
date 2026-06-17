import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { MotionReveal } from "@/components/landing/motion-reveal";
import { Button } from "@/components/ui";

export function LandingCta() {
  return (
    <section className="mx-auto max-w-[1180px] px-6 text-center sm:px-8">
      <MotionReveal>
        <h2 className="mx-auto max-w-3xl font-serif text-3xl font-semibold leading-tight text-slate-100 [text-wrap:balance] sm:text-5xl md:text-6xl">
          Run the strategy workflow
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg sm:leading-8">
          Start with market intelligence, inspect live signal inputs, generate a backtestable strategy spec, review assumptions, inspect the JSON artifact, and verify the output in the proof registry.
        </p>
        <div className="mt-8 flex justify-center">
          <div className="flex max-w-sm items-center justify-center gap-2 text-sm font-semibold leading-6 text-accent">
            <ShieldCheck size={18} className="shrink-0" />
            Strategy intelligence, not autonomous trading
          </div>
        </div>
        <Link href="/dashboard" className="mt-10 inline-flex w-full sm:w-auto">
          <Button variant="secondary" className="h-12 w-full sm:min-w-44">
            Launch workspace
            <ArrowRight size={16} />
          </Button>
        </Link>
      </MotionReveal>
    </section>
  );
}
