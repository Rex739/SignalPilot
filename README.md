# SignalPilot

SignalPilot transforms a CoinMarketCap-powered signal layer into explainable, backtestable BNB Chain strategy specs.

## Problem

Crypto market data is abundant, but turning noisy signals into a clear strategy is still hard. Traders, analysts, researchers, and builders often jump from dashboards to intuition without a structured strategy spec, explicit risk rules, or a reviewable backtest artifact.

For professional strategy teams, this creates a gap: market intelligence may be visible, but the reasoning, rules, and proof of a generated strategy are not easy to inspect or reproduce.

## Solution

SignalPilot is an explainable strategy intelligence layer for BNB Chain research workflows.

It takes CoinMarketCap-powered market data, derived indicators, and market regime context, then generates a backtestable strategy spec with:

- Entry rules
- Exit rules
- Risk rules
- Position sizing
- Stop loss and take profit logic
- Confidence score
- Human-readable reasoning
- Live CMC Data quote fields and derived indicators used
- Mock backtest metrics
- Exportable JSON
- Deterministic strategy hash for future proof registration

## Strategy Intelligence Platform

SignalPilot is positioned as a Strategy Intelligence Platform because it focuses on strategy generation, explainability, risk controls, backtesting, and exportable strategy artifacts.

It does not attempt to be a live trading system. The platform is intentionally scoped to helping users create and review strategy specs that could later plug into real CMC data, wallet identity flows, and a BNB Chain proof registry.

## Features

- CoinMarketCap-powered signal dashboard for `BNB/USDT`, `CAKE/USDT`, `BTC/USDT`, and `ETH/USDT`
- Market Intelligence Skill package in `skills/signalpilot-skill`
- MCP-ready market data adapter structure under `lib/cmc`
- Strategy generator using market, risk level, and timeframe inputs
- Strategy types:
  - Momentum Breakout
  - Mean Reversion
  - Volatility Defensive
  - Narrative Rotation
- Professional strategy detail page with:
  - Market selected
  - Live CMC Data quote fields and derived indicators used
  - Market regime
  - Entry rules
  - Exit rules
  - Risk rules
  - Human-readable reasoning
  - Backtest metrics
  - JSON strategy export
  - Strategy hash
- Mock backtest report with:
  - Total return
  - Sharpe ratio
  - Max drawdown
  - Win rate
  - Profit factor
  - Total trades
  - Equity curve
  - Drawdown chart
  - Regime performance
- Browser-generated SHA-256 strategy hash from stable JSON
- Complete signal snapshot stored with every generated strategy
- Live data badges, source labels, last-updated timestamps, and fallback snapshot handling
- Mock BNB Chain proof registry placeholder
- Dark professional strategy research workspace UI

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui-style local components
- Recharts
- Framer Motion
- Web Crypto API for mock SHA-256 strategy hashes
- Mock fallback market snapshots

## Repository Structure

```text
signalpilot/
├── app/
│   ├── dashboard/
│   ├── signals/
│   ├── generate/
│   ├── backtest/
│   ├── spec/
│   ├── proof/
│   ├── skill/
│   ├── settings/
│   └── api/
├── components/
│   ├── landing/
│   └── *.tsx
├── lib/
│   ├── cmc/
│   │   ├── client.ts
│   │   ├── indicators.ts
│   │   └── signal-normalizer.ts
│   ├── strategy/
│   │   ├── regime-detector.ts
│   │   ├── strategy-generator.ts
│   │   ├── backtester.ts
│   │   └── strategy-schema.ts
│   └── hash/
│       └── strategy-hash.ts
├── skills/
│   └── signalpilot-skill/
├── contracts/
│   └── StrategyProofRegistry.sol
└── README.md
```

## Demo Flow

1. Open `/`
2. Review the landing page and product scope
3. Go to `/dashboard` for the app overview
4. Go to `/signals` to inspect the CoinMarketCap-powered signal layer
5. Go to `/generate` to generate an explainable strategy spec
6. Go to `/spec` to inspect the full strategy spec, JSON export, and strategy hash
7. Go to `/backtest` to review mock strategy performance
8. Go to `/proof` to view the mock BNB Chain proof registry placeholder
9. Go to `/skill` to inspect the SignalPilot Market Intelligence Skill package
10. Go to `/settings` to review data/source configuration

## Run Locally

```bash
npm install
npm run dev
```

Then open:

```text
http://localhost:3000
```

Useful checks:

```bash
npm run typecheck
npm run build
```

## CoinMarketCap Data Modes

SignalPilot supports three data modes:

- `mock` - Uses only bundled deterministic demo data.
- `live` - Uses live CoinMarketCap latest quote fields when `CMC_API_KEY` is configured.
- `hybrid` - Default mode. Uses live CoinMarketCap quote fields for price, 24h price change, 24h volume, market cap, and last updated, while keeping simulated advanced strategy signals such as RSI, MACD, EMA trend, volatility score, sentiment score, and narrative momentum. Simulated support and resistance are re-anchored to the latest live price.

Create a local environment file:

```bash
cp .env.example .env.local
```

Then set:

```bash
CMC_API_KEY=your_coinmarketcap_api_key
NEXT_PUBLIC_DATA_MODE=hybrid
```

`CMC_API_KEY` is used only on the server by `/api/cmc/quotes` and is never exposed to the browser.

If the CoinMarketCap API is unavailable, missing, or returns an error, SignalPilot automatically falls back to deterministic mock data and shows a `Fallback snapshot active` badge. The UI remains usable, and the generated strategy export still includes the fallback source and timestamp context.

## Live Data Pipeline

SignalPilot's live-data pipeline is API-ready and product-safe:

1. Server-side `/api/cmc/quotes` reads `CMC_API_KEY`.
2. The browser never receives the CMC API key.
3. Live CMC quote fields are merged into the local market model:
   - price
   - 24h price change
   - 24h volume
   - 24h volume change
   - market cap
   - last updated
4. Simulated advanced signals remain deterministic for the MVP:
   - RSI
   - MACD
   - EMA trend
   - volatility score
   - sentiment score
   - narrative momentum
   - support and resistance re-anchored to live price
5. Dashboard, generator, and strategy detail pages show `Live CMC Data`, source, last-updated context, and derived indicator labels.

## Strategy Snapshot

Every generated strategy stores a complete signal snapshot used to produce the strategy. The snapshot is shown on the strategy detail page and included in the JSON export.

The snapshot includes:

- market
- timestamp
- source / data source
- raw live market values
- indicators used
- market regime
- strategy rules
- risk rules
- backtest metrics

## Hash Proof

SignalPilot generates a deterministic SHA-256 strategy hash in the browser using stable JSON for the full exported strategy spec and signal snapshot.

The strategy detail page and proof page display the hash and include a `Copy Hash` button. The JSON export includes `strategyHash`, making the exported artifact ready for future BNB Chain proof registry storage.

## Mock Data Note

SignalPilot keeps deterministic mock fallback market snapshots in the codebase so the demo always works without external API access.

The data layer is structured as an MCP-ready market data adapter so a future CoinMarketCap MCP/API integration can replace the mock feed without changing the strategy generation, backtest, export, or proof UI.

## Future Work

- Real CMC MCP/API integration
- Trust Wallet Agent Kit integration for identity, wallet context, and user approvals
- BNB Chain strategy proof registry for storing strategy hashes and backtest attestations
- Real historical backtesting adapter
- Expanded strategy templates and evaluation rules

## Disclaimer

SignalPilot does not execute live trades.

It does not route orders, custody assets, submit transactions, or run autonomous trading. It generates strategy specs for research, backtesting, and review.
