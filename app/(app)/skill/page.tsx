import { promises as fs } from "fs";
import path from "path";
import { Badge, Card, SectionHeader } from "@/components/ui";

export const dynamic = "force-dynamic";

async function readSkillFile(file: string) {
  return fs.readFile(path.join(process.cwd(), "skills", "signalpilot-skill", file), "utf8");
}

export default async function SkillPage() {
  const [schema, exampleInput, exampleOutput] = await Promise.all([
    readSkillFile("schema.json"),
    readSkillFile("example-input.json"),
    readSkillFile("example-output.json")
  ]);

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Market Intelligence Skill"
        title="SignalPilot Market Intelligence Skill"
        description="The SignalPilot skill turns CMC market data into a backtestable strategy spec with risk rules, reasoning, snapshots, and hash-ready JSON."
      />

      <div className="flex flex-wrap gap-2">
        <Badge variant="outline">Strategy Intelligence</Badge>
        <Badge variant="positive">Market Intelligence Skill</Badge>
        <Badge variant="muted">skills/signalpilot-skill</Badge>
      </div>

      <Card className="p-5">
        <h2 className="font-semibold">Skill reference</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Folder: <span className="font-mono text-slate-200">skills/signalpilot-skill</span>. Includes README, skill instructions, schema, example input, and example output for product and integration review.
        </p>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <CodeBlock title="Input and output schema" code={schema} />
        <CodeBlock title="Example input" code={exampleInput} />
        <CodeBlock title="Example output" code={exampleOutput} className="lg:col-span-2" />
      </div>
    </div>
  );
}

function CodeBlock({ title, code, className }: { title: string; code: string; className?: string }) {
  return (
    <Card className={className}>
      <div className="border-b border-border p-5">
        <h2 className="font-semibold">{title}</h2>
      </div>
      <pre className="max-h-[520px] overflow-auto p-5 text-xs leading-6 text-slate-100">{code}</pre>
    </Card>
  );
}
