# SignalPilot Market Intelligence Skill

SignalPilot Market Intelligence Skill transforms CoinMarketCap market data into an explainable, backtestable BNB Chain strategy spec.

This package is designed as an LLM Skill that can receive a live or fallback CMC signal snapshot, reason about the market regime, and produce a structured strategy research artifact for review, backtesting, and verification.

## Purpose

The skill converts market intelligence into a deterministic strategy specification:

- CoinMarketCap-powered market snapshot in
- Strategy rules and risk controls out
- Backtest parameters and metrics included
- Human-readable reasoning included
- JSON strategy spec ready for export or hash proof

## Why Strategy Intelligence

SignalPilot focuses on strategy generation, explainability, risk rules, and backtestable outputs. This skill operates at the strategy intelligence layer. It does not submit trades, route orders, custody assets, or act autonomously.

## Accepted Input

The skill accepts:

- market symbol
- timeframe
- risk level
- live CMC signal snapshot
- indicators including RSI, MACD, EMA trend, volume change, volatility, and sentiment/fear-greed if available
- optional derivatives positioning, funding, and open interest if available

See `example-input.json`.

## Required Output

The skill returns:

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

See `example-output.json`.

## Files

- `skill.md` - LLM behavior and constraints
- `schema.json` - Input and output schema contract
- `example-input.json` - Example CMC signal snapshot
- `example-output.json` - Example strategy spec response

## Safety Scope

SignalPilot Market Intelligence Skill does not execute live trades.

It does not provide autonomous trading, order routing, private-key signing, transaction sending, portfolio custody, or real smart-contract interaction. It only generates explainable strategy specs for research, backtesting, and review.
