import { ShieldAlert } from "lucide-react";
import { Card } from "@/components/ui";

export function ResearchDisclaimer() {
  return (
    <Card className="border-yellow-300/25 bg-yellow-300/10 p-4">
      <div className="flex gap-3">
        <ShieldAlert className="mt-0.5 shrink-0 text-yellow-300" size={19} />
        <div>
          <p className="text-sm font-semibold text-yellow-100">Strategy research scope</p>
          <p className="mt-1 text-sm leading-6 text-yellow-100/80">
            SignalPilot does not execute live trades. It generates explainable, backtestable strategy specs for research.
          </p>
        </div>
      </div>
    </Card>
  );
}
