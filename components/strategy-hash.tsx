"use client";

import { useEffect, useMemo, useState } from "react";
import { Copy, Fingerprint } from "lucide-react";
import { Button, Card } from "@/components/ui";
import { stableStringify } from "@/lib/stable-json";
import { createJsonStrategySpec } from "@/lib/strategy/strategy-artifact";
import type { StrategySignalSnapshot } from "@/lib/market-data";

type HashState = "idle" | "copied" | "error";

export function StrategyHash({
  snapshot,
  compact = false
}: {
  snapshot: StrategySignalSnapshot;
  compact?: boolean;
}) {
  const [hash, setHash] = useState("");
  const [copyState, setCopyState] = useState<HashState>("idle");
  const stableJson = useMemo(() => stableStringify(createJsonStrategySpec(snapshot)), [snapshot]);

  useEffect(() => {
    let cancelled = false;

    async function generateHash() {
      const bytes = new TextEncoder().encode(stableJson);
      const digest = await crypto.subtle.digest("SHA-256", bytes);
      const hex = Array.from(new Uint8Array(digest))
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");

      if (!cancelled) {
        setHash(`0x${hex}`);
      }
    }

    generateHash().catch(() => {
      if (!cancelled) {
        setHash("Browser SHA-256 unavailable");
      }
    });

    return () => {
      cancelled = true;
    };
  }, [stableJson]);

  async function copyHash() {
    try {
      await navigator.clipboard.writeText(hash);
      setCopyState("copied");
      window.setTimeout(() => setCopyState("idle"), 1800);
    } catch {
      setCopyState("error");
    }
  }

  return (
    <Card className={compact ? "p-4" : "border-teal-300/20 bg-teal-300/10 p-5"}>
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-sm font-semibold text-teal-100">
            <Fingerprint size={18} />
            Deterministic strategy hash
          </div>
          <p className="mt-2 text-sm leading-6 text-teal-100/80">
            This browser-generated SHA-256 hash is derived from stable JSON for the complete backtestable strategy spec, including skill name, track name, CMC signal snapshot, rules, assumptions, reasoning, and mock backtest metrics. The hash can be stored on BNB Chain as proof of the generated strategy and backtest result.
          </p>
          <p className="mt-3 break-all rounded-lg border border-teal-300/20 bg-slate-950/60 p-3 font-mono text-xs text-teal-100">
            {hash || "Generating SHA-256 hash in browser..."}
          </p>
          {copyState === "error" ? (
            <p className="mt-2 text-sm text-red-200">Clipboard access was blocked. Select the hash manually.</p>
          ) : null}
        </div>
        <Button type="button" onClick={copyHash} disabled={!hash || hash.startsWith("Browser")} variant="secondary" className="shrink-0">
          <Copy size={16} />
          {copyState === "copied" ? "Copied" : "Copy Hash"}
        </Button>
      </div>
    </Card>
  );
}
