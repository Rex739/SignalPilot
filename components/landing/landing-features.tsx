import { landingFeatures } from "@/components/landing/landing-data";
import { MotionReveal } from "@/components/landing/motion-reveal";

export function LandingFeatures() {
  return (
    <section className="grid gap-4 md:grid-cols-2">
      {landingFeatures.map((feature, index) => {
        const Icon = feature.icon;
        return (
          <MotionReveal key={feature.title} delay={index * 0.05} className="rounded-2xl border border-border bg-card p-6">
            <Icon className="text-accent" size={24} />
            <h2 className="mt-5 text-xl font-semibold">{feature.title}</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{feature.description}</p>
          </MotionReveal>
        );
      })}
    </section>
  );
}
