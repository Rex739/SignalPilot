"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import type { BacktestResult } from "@/lib/market-data";

const axis = { fontSize: 12, fill: "#94a3b8" };
const tooltip = {
  backgroundColor: "#020617",
  border: "1px solid #1e293b",
  borderRadius: "8px",
  color: "#e2e8f0"
};

export function EquityCurve({ data }: { data: BacktestResult["equityCurve"] }) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ left: 8, right: 8, top: 12, bottom: 0 }}>
          <defs>
            <linearGradient id="equityFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.28} />
              <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
          <XAxis dataKey="day" tick={axis} tickLine={false} axisLine={false} />
          <YAxis tick={axis} tickLine={false} axisLine={false} />
          <Tooltip contentStyle={tooltip} />
          <Area type="monotone" dataKey="equity" stroke="#2dd4bf" strokeWidth={2} fill="url(#equityFill)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function DrawdownChart({ data }: { data: BacktestResult["drawdownCurve"] }) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer>
        <BarChart data={data} margin={{ left: 8, right: 8, top: 12, bottom: 0 }}>
          <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
          <XAxis dataKey="day" tick={axis} tickLine={false} axisLine={false} />
          <YAxis tick={axis} tickLine={false} axisLine={false} />
          <Tooltip contentStyle={tooltip} />
          <Bar dataKey="drawdown" fill="#f87171" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function SignalBarChart({
  data
}: {
  data: { symbol: string; sentiment: number; narrative: number; volatility: number }[];
}) {
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer>
        <LineChart data={data} margin={{ left: 8, right: 8, top: 12, bottom: 0 }}>
          <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
          <XAxis dataKey="symbol" tick={axis} tickLine={false} axisLine={false} />
          <YAxis domain={[0, 100]} tick={axis} tickLine={false} axisLine={false} />
          <Tooltip contentStyle={tooltip} />
          <Line type="monotone" dataKey="sentiment" stroke="#2dd4bf" strokeWidth={2} dot={{ r: 3 }} />
          <Line type="monotone" dataKey="narrative" stroke="#facc15" strokeWidth={2} dot={{ r: 3 }} />
          <Line type="monotone" dataKey="volatility" stroke="#cbd5e1" strokeWidth={2} dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
