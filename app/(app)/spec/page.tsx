import StrategyDetailPage from "./[id]/page";

export default function SpecIndexPage() {
  return <StrategyDetailPage params={Promise.resolve({ id: "sp-bnb-momentum-breakout" })} />;
}
