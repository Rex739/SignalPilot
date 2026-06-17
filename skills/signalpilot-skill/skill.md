# SignalPilot Market Intelligence Skill

## Purpose

Transform CoinMarketCap market data into an explainable, backtestable BNB Chain strategy spec for strategy analysis workflows.

## Inputs

Accept a structured request containing:

- `marketSymbol`: market pair such as `BNB/USDT`, `CAKE/USDT`, `BTC/USDT`, or `ETH/USDT`
- `timeframe`: strategy timeframe such as `4H`, `1D`, or `1W`
- `riskLevel`: `Conservative`, `Balanced`, or `Aggressive`
- `cmcSignalSnapshot`: live or fallback CoinMarketCap-powered market data
- `indicators`: RSI, MACD, EMA trend, volume change, volatility, sentiment or fear-greed when available
- `derivatives`: optional positioning, funding, and open interest context when available

## Behavior

When invoked:

1. Validate the requested market, timeframe, risk level, and signal snapshot.
2. Normalize CMC market values and advanced indicators into one strategy context.
3. Detect market regime from price behavior, volume, RSI, MACD, EMA trend, volatility, sentiment, and optional derivatives data.
4. Select a strategy type that matches the regime:
   - Momentum Breakout
   - Mean Reversion
   - Volatility Defensive
   - Narrative Rotation
5. Generate a professional strategy spec with entry logic, exit logic, risk controls, position sizing, stop loss, take profit, and invalidation rules.
6. Include backtest parameters and mock or supplied backtest metrics.
7. Explain the reasoning in plain language so an analyst or reviewer can understand why the strategy was generated.
8. Return a JSON strategy spec suitable for export, deterministic hashing, and future BNB Chain proof registry storage.

## Output Requirements

Always output:

- strategy name
- market regime
- entry rules
- exit rules
- risk rules
- position sizing
- stop loss
- take profit
- invalidation conditions
- backtest parameters
- backtest metrics
- human-readable reasoning
- JSON strategy spec

## Constraints

- Do not execute live trades.
- Do not generate autonomous trading behavior.
- Do not route orders.
- Do not submit transactions.
- Do not request private keys or wallet signatures.
- Do not imply guaranteed profit.
- Always include explicit risk rules and invalidation conditions.
- Always state that SignalPilot produces research and backtesting artifacts only.
