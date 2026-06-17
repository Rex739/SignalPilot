export function stableStringify(value: unknown): string {
  if (typeof value === "undefined") {
    return "null";
  }

  if (value === null || typeof value !== "object") {
    return JSON.stringify(value);
  }

  if (Array.isArray(value)) {
    return `[${value.map((item) => stableStringify(item)).join(",")}]`;
  }

  const record = value as Record<string, unknown>;
  return `{${Object.keys(record)
    .sort()
    .map((key) => `${JSON.stringify(key)}:${stableStringify(record[key])}`)
    .join(",")}}`;
}

export function buildStrategyProofPayload({
  strategy,
  backtest
}: {
  strategy: unknown;
  backtest: unknown;
}) {
  return {
    project: "SignalPilot",
    track: "Strategy Intelligence Platform",
    proofScope: "Generated strategy spec and mock backtest result",
    disclaimer:
      "Research proof payload only. SignalPilot does not execute live trades, route orders, custody assets, or run autonomous trading.",
    strategy,
    backtest
  };
}
