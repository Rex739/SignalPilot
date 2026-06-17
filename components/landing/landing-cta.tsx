import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { MotionReveal } from "@/components/landing/motion-reveal";
import { Button } from "@/components/ui";

export function LandingCta() {
  return (
    <section className="mx-auto max-w-[1180px] px-5 text-center">
      <MotionReveal>
        <h2 className="font-serif text-5xl font-semibold leading-tight text-slate-100 md:text-6xl">
          Run the strategy workflow
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-400">
          Start with market intelligence, inspect live signal inputs, generate a backtestable strategy spec, review assumptions, inspect the JSON artifact, and verify the output in the proof registry.
        </p>
        <div className="mt-8 flex justify-center">
          <div className="flex items-center gap-2 text-sm font-semibold text-accent">
          <ShieldCheck size={18} />
          Strategy intelligence, not autonomous trading
          </div>
        </div>
        <Link href="/dashboard" className="mt-10 inline-flex">
          <Button variant="secondary" className="h-12 min-w-44">
            Launch workspace
            <ArrowRight size={16} />
          </Button>
        </Link>
      </MotionReveal>
    </section>
  );
}
