"use client";

import { useEffect, useMemo, useState } from "react";
import { Clipboard, Download } from "lucide-react";
import { Button } from "@/components/ui";
import { stableStringify } from "@/lib/stable-json";
import { createJsonStrategySpec } from "@/lib/strategy/strategy-artifact";
import type { StrategySignalSnapshot } from "@/lib/market-data";

export function StrategyExport({
  snapshot
}: {
  snapshot: StrategySignalSnapshot;
}) {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");
  const [copyHashState, setCopyHashState] = useState<"idle" | "copied" | "error">("idle");
  const [hash, setHash] = useState("");
  const specForHash = useMemo(
    () => createJsonStrategySpec(snapshot),
    [snapshot]
  );
  const stableJson = useMemo(() => stableStringify(specForHash), [specForHash]);
  const exportPayload = useMemo(
    () => createJsonStrategySpec(snapshot, hash || "Generating SHA-256 hash in browser"),
    [hash, snapshot]
  );
  const json = JSON.stringify(exportPayload, null, 2);

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

  async function copyJson() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(json);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = json;
        textarea.setAttribute("readonly", "true");
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopyState("copied");
      window.setTimeout(() => setCopyState("idle"), 1800);
    } catch {
      setCopyState("error");
    }
  }

  function downloadJson() {
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${snapshot.generatedStrategyRules.strategyId}-strategy-spec.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  async function copyHash() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(hash);
      }
      setCopyHashState("copied");
      window.setTimeout(() => setCopyHashState("idle"), 1800);
    } catch {
      setCopyHashState("error");
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button type="button" onClick={copyJson} variant="secondary">
          <Clipboard size={16} />
          {copyState === "copied" ? "Copied" : "Copy JSON"}
        </Button>
        <Button type="button" onClick={downloadJson} variant="outline">
          <Download size={16} />
          Download JSON
        </Button>
        <Button type="button" onClick={copyHash} disabled={!hash || hash.startsWith("Browser")} variant="outline">
          <Clipboard size={16} />
          {copyHashState === "copied" ? "Hash copied" : "Copy Hash"}
        </Button>
      </div>
      {copyState === "error" ? (
        <p className="text-sm text-red-200">
          Clipboard access was blocked by the browser. Use the export button or select the JSON below.
        </p>
      ) : null}
      {copyHashState === "error" ? (
        <p className="text-sm text-red-200">
          Clipboard access was blocked by the browser. Select the hash inside the JSON manually.
        </p>
      ) : null}
      <pre className="max-h-[520px] overflow-auto rounded-lg border border-border bg-slate-950 p-4 text-xs leading-6 text-slate-100">
        {json}
      </pre>
      <details className="rounded-lg border border-border bg-slate-950/50 p-4">
        <summary className="cursor-pointer text-sm font-semibold text-muted-foreground">
          Stable JSON used for deterministic strategy hash
        </summary>
        <pre className="mt-3 max-h-56 overflow-auto text-xs leading-6 text-slate-300">{stableJson}</pre>
      </details>
    </div>
  );
}
