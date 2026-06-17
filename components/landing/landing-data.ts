import {
  BarChart3,
  BrainCircuit,
  DatabaseZap,
  FileCheck2,
  FlaskConical,
  ShieldAlert
} from "lucide-react";

export const landingStats = [
  { label: "Mock markets", value: "4", detail: "BNB, CAKE, BTC, ETH" },
  { label: "Strategy types", value: "4", detail: "Momentum, reversion, defense, rotation" },
  { label: "Execution risk", value: "0", detail: "No live trading or order routing" },
  { label: "Spec format", value: "JSON", detail: "Portable research artifact" }
];

export const workflowSteps = [
  {
    title: "Read the CoinMarketCap-powered signal layer",
    description: "Live CMC Data supplies quote fields when available; derived indicators include RSI, MACD, EMA trend, volatility, sentiment, support, resistance, and market regime.",
    icon: DatabaseZap
  },
  {
    title: "Generate a backtestable strategy spec",
    description: "SignalPilot converts selected market, risk level, and timeframe into deterministic strategy logic with explicit invalidation.",
    icon: FlaskConical
  },
  {
    title: "Backtest and explain",
    description: "Performance metrics and reasoning make the strategy reviewable before any future execution-layer work.",
    icon: BarChart3
  }
];

export const landingFeatures = [
  {
    title: "Explainable generation",
    description: "Every strategy lists the exact signal inputs used and the reasoning behind the selected playbook.",
    icon: BrainCircuit
  },
  {
    title: "Risk rules first",
    description: "Position sizing, stops, take profit, pause rules, and invalidation are part of the generated spec.",
    icon: ShieldAlert
  },
  {
    title: "MCP-ready market data adapter",
    description: "CMC quote fields are isolated behind a small market intelligence module for future MCP/API wiring.",
    icon: DatabaseZap
  },
  {
    title: "Exportable backtestable strategy specs",
    description: "Strategy detail pages include copyable JSON for audit, handoff, proof registry, or later backtest engines.",
    icon: FileCheck2
  }
];
