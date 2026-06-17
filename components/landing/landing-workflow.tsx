import { workflowSteps } from "@/components/landing/landing-data";
import { MotionReveal } from "@/components/landing/motion-reveal";
import { StrategyTerminal } from "@/components/landing/strategy-terminal";

export function LandingWorkflow() {
  return (
    <section id="features" className="mx-auto max-w-[1180px] px-6 sm:px-8">
      <MotionReveal>
        <h2 className="mx-auto max-w-3xl text-center font-serif text-3xl font-semibold leading-tight text-slate-100 [text-wrap:balance] sm:text-5xl md:text-6xl">
          Reliability & Performance
        </h2>
      </MotionReveal>

      <div className="mt-10 grid gap-8 border-t border-slate-800 pt-8 md:mt-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-10">
        <MotionReveal delay={0.06}>
          <StrategyTerminal />
          <p className="mt-5 border-l border-cyan-400/40 pl-4 font-serif text-base italic leading-7 text-slate-400 sm:text-lg">
            For strategy reviews where teams need the exact signal, rule, and risk trail every time.
          </p>
        </MotionReveal>

        <MotionReveal delay={0.12} className="divide-y divide-slate-800">
          {workflowSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="grid gap-4 py-6 first:pt-0 sm:grid-cols-[42px_1fr] sm:gap-5 sm:py-7">
                <span className="font-mono text-sm text-slate-500">0{index + 1}</span>
                <div>
                  <h3 className="flex items-start gap-3 font-serif text-xl font-semibold text-slate-100 sm:items-center sm:text-2xl">
                    <Icon size={20} className="text-slate-400" />
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">{step.description}</p>
                </div>
              </div>
            );
          })}
        </MotionReveal>
      </div>
    </section>
  );
}
