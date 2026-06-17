function roundMarketLevel(value: number, anchorPrice: number) {
  if (anchorPrice >= 100) {
    return Math.round(value);
  }

  if (anchorPrice >= 1) {
    return Number(value.toFixed(2));
  }

  return Number(value.toFixed(4));
}

export function deriveSimulatedTechnicalLevels(price: number, volatilityScore: number) {
  const band = Math.min(0.04, Math.max(0.015, volatilityScore / 2000));
  const secondaryBand = band * 2;
  const outerBand = band * 3.2;

  return {
    support: [1 - band, 1 - secondaryBand, 1 - outerBand].map((multiplier) =>
      roundMarketLevel(price * multiplier, price)
    ),
    resistance: [1 + band, 1 + secondaryBand, 1 + outerBand].map((multiplier) =>
      roundMarketLevel(price * multiplier, price)
    )
  };
}
