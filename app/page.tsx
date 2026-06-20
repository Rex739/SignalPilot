import { LandingCta } from "@/components/landing/landing-cta";
import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingHero } from "@/components/landing/landing-hero";
import { LandingMarketStrip } from "@/components/landing/landing-market-strip";
import { LandingProductSections } from "@/components/landing/landing-product-sections";
import { LandingWorkflow } from "@/components/landing/landing-workflow";
import { getMarketData } from "@/lib/data-mode";

export const dynamic = "force-dynamic";

export default async function Home() {
  // Resolve the configured live, hybrid, or fallback feed on the server so API
  // credentials and provider failures never leak into the landing-page client.
  const marketData = await getMarketData();

  return (
    <div className="w-full overflow-hidden space-y-20 md:space-y-32">
      <LandingHero />
      <LandingProductSections />
      <LandingWorkflow />
      <LandingMarketStrip markets={marketData.markets} status={marketData.status} />
      <LandingCta />
      <LandingFooter />
    </div>
  );
}
