import { landingStats } from "@/components/landing/landing-data";
import { MotionReveal } from "@/components/landing/motion-reveal";

export function LandingStats() {
  return (
    <section className="grid gap-3 md:grid-cols-4">
      {landingStats.map((stat, index) => (
        <MotionReveal key={stat.label} delay={index * 0.04} className="rounded-xl border border-border bg-card p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{stat.label}</p>
          <p className="mt-3 text-3xl font-semibold">{stat.value}</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{stat.detail}</p>
        </MotionReveal>
      ))}
    </section>
  );
}
