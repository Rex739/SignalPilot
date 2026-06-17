import type { StrategySignalSnapshot } from "@/lib/market-data";

export type JsonStrategySpec = {
  skillName: StrategySignalSnapshot["skillName"];
  trackName: StrategySignalSnapshot["trackName"];
  market: StrategySignalSnapshot["market"];
  timeframe: StrategySignalSnapshot["generatedStrategyRules"]["timeframe"];
  riskLevel: StrategySignalSnapshot["generatedStrategyRules"]["riskLevel"];
  cmcSignalSnapshot: {
    timestamp: string;
    source: StrategySignalSnapshot["source"];
    dataSource: StrategySignalSnapshot["dataSource"];
    liveQuoteFields: StrategySignalSnapshot["rawLiveMarketValues"];
    derivedIndicators: StrategySignalSnapshot["indicatorsUsed"];
  };
  marketRegime: StrategySignalSnapshot["marketRegime"];
  entryRules: string[];
  exitRules: string[];
  riskRules: string[];
  positionSizing: string;
  stopLoss: string;
  takeProfit: string;
  backtestAssumptions: StrategySignalSnapshot["backtestAssumptions"];
  backtestMetrics: StrategySignalSnapshot["backtestMetrics"];
  aiReasoning: string;
  deterministicStrategyHash: string;
  audit: {
    project: StrategySignalSnapshot["project"];
    disclaimer: string;
    generatedStrategyId: string;
    generatedStrategyName: string;
    generatedStrategyType: StrategySignalSnapshot["generatedStrategyRules"]["strategyType"];
    cmcSignalsUsed: string[];
  };
};

export const STRATEGY_HASH_PREIMAGE_MARKER = "sha-256-generated-from-this-spec";

export function createJsonStrategySpec(
  snapshot: StrategySignalSnapshot,
  deterministicStrategyHash = STRATEGY_HASH_PREIMAGE_MARKER
): JsonStrategySpec {
  return {
    skillName: snapshot.skillName,
    trackName: snapshot.trackName,
    market: snapshot.market,
    timeframe: snapshot.generatedStrategyRules.timeframe,
    riskLevel: snapshot.generatedStrategyRules.riskLevel,
    cmcSignalSnapshot: {
      timestamp: snapshot.timestamp,
      source: snapshot.source,
      dataSource: snapshot.dataSource,
      liveQuoteFields: snapshot.rawLiveMarketValues,
      derivedIndicators: snapshot.indicatorsUsed
    },
    marketRegime: snapshot.marketRegime,
    entryRules: snapshot.generatedStrategyRules.entryConditions,
    exitRules: snapshot.generatedStrategyRules.exitConditions,
    riskRules: snapshot.riskRules,
    positionSizing: snapshot.generatedStrategyRules.positionSizing,
    stopLoss: snapshot.generatedStrategyRules.stopLoss,
    takeProfit: snapshot.generatedStrategyRules.takeProfit,
    backtestAssumptions: snapshot.backtestAssumptions,
    backtestMetrics: snapshot.backtestMetrics,
    aiReasoning: snapshot.generatedStrategyRules.reasoning,
    deterministicStrategyHash,
    audit: {
      project: snapshot.project,
      disclaimer: snapshot.disclaimer,
      generatedStrategyId: snapshot.generatedStrategyRules.strategyId,
      generatedStrategyName: snapshot.generatedStrategyRules.strategyName,
      generatedStrategyType: snapshot.generatedStrategyRules.strategyType,
      cmcSignalsUsed: snapshot.generatedStrategyRules.cmcSignalsUsed
    }
  };
}
