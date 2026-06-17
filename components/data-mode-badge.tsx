import { Badge } from "@/components/ui";
import type { DataModeStatus } from "@/lib/data-mode";

export function DataModeBadge({ status }: { status: DataModeStatus }) {
  const liveActive = status.mode !== "mock" && !status.fallbackActive;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {liveActive ? (
        <Badge variant="positive">Live CMC Data</Badge>
      ) : (
        <Badge variant="muted">Mock Data</Badge>
      )}
      <Badge variant={status.mode === "mock" || status.fallbackActive ? "muted" : "positive"}>
        {status.label}
      </Badge>
      {status.fallbackActive ? (
        <Badge variant="outline">Fallback snapshot active</Badge>
      ) : null}
    </div>
  );
}
