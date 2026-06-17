"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  BarChart3,
  FileJson,
  FlaskConical,
  Gauge,
  Home,
  Menu,
  ShieldCheck,
  TerminalSquare,
  Wrench,
  Settings,
  X
} from "lucide-react";
import { DataModeBadge } from "@/components/data-mode-badge";
import { Badge } from "@/components/ui";
import type { DataModeStatus } from "@/lib/data-mode";
import { cn } from "@/lib/utils";

const logoSrc = "https://res.cloudinary.com/dcxghlgre/image/upload/v1781680857/signalPilot/full_logo.png";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: Home },
  { href: "/signals", label: "Signals", icon: Gauge },
  { href: "/generate", label: "Generate Strategy", icon: FlaskConical },
  { href: "/spec", label: "Strategy Spec", icon: FileJson },
  { href: "/backtest", label: "Backtest", icon: BarChart3 },
  { href: "/proof", label: "Proof Registry", icon: ShieldCheck },
  { href: "/skill", label: "Market Skill", icon: Wrench },
];

const pageTitles: Record<string, string> = {
  "/dashboard": "Overview",
  "/signals": "Live Market Signal Terminal",
  "/generate": "Strategy Generation Workbench",
  "/spec": "Final Strategy Spec",
  "/backtest": "Backtest Report",
  "/proof": "Proof Registry",
  "/skill": "Market Intelligence Skill",
};

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function DashboardShell({
  children,
  status,
  lastUpdated
}: {
  children: React.ReactNode;
  status: DataModeStatus;
  lastUpdated?: string;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const title = pageTitles[navItems.find((item) => isActive(pathname, item.href))?.href ?? "/dashboard"];

  const sidebar = (
    <div className="flex h-full flex-col bg-[#070b18] text-slate-200">
      <div className="border-b border-slate-800 px-5 py-5">
        <Link
          href="/"
          aria-label="SignalPilot landing"
          className="relative block h-20 w-[190px]"
        >
          <Image
            src={logoSrc}
            alt="SignalPilot"
            fill
            sizes="190px"
            className="object-contain object-left"
            priority
          />
        </Link>
        <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
          <TerminalSquare size={14} />
          Strategy Intelligence Platform
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = isActive(pathname, item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-semibold text-slate-400 transition",
                "hover:bg-slate-900/70 hover:text-slate-100",
                active &&
                  "border border-cyan-300/20 bg-slate-900 text-slate-100 shadow-[inset_3px_0_0_rgba(34,211,238,0.9)]",
              )}
            >
              <Icon
                size={16}
                className={cn(
                  "text-slate-500 group-hover:text-cyan-200",
                  active && "text-cyan-200",
                )}
              />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-slate-800 p-4">
        <Badge
          variant="outline"
          className="border-yellow-400/30 bg-yellow-400/10 text-yellow-100"
        >
          No live trading
        </Badge>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[280px] border-r border-slate-800 lg:block">
        {sidebar}
      </aside>

      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button aria-label="Close sidebar backdrop" className="absolute inset-0 bg-black/70" onClick={() => setOpen(false)} />
          <aside className="relative h-full w-[300px] max-w-[82vw] border-r border-slate-800 shadow-2xl">
            {sidebar}
          </aside>
        </div>
      ) : null}

      <div className="lg:pl-[280px]">
        <header className="sticky top-0 z-30 border-b border-slate-800 bg-[#090d1a]/95 backdrop-blur">
          <div className="flex min-h-[76px] items-center justify-between gap-4 px-4 py-4 md:px-6">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                aria-label={open ? "Close navigation" : "Open navigation"}
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-800 text-slate-200 lg:hidden"
                onClick={() => setOpen((value) => !value)}
              >
                {open ? <X size={18} /> : <Menu size={18} />}
              </button>
              <div className="min-w-0">
              
                <h1 className="truncate text-xl font-semibold text-slate-100 md:text-2xl">{title}</h1>
              </div>
            </div>
            <div className="hidden flex-col items-end gap-2 md:flex">
              <DataModeBadge status={status} />
              <p className="text-xs text-slate-500">
                Last updated: {lastUpdated ? new Date(lastUpdated).toLocaleString() : "Fallback snapshot"}
              </p>
            </div>
          </div>
          <div className="border-t border-slate-800 px-4 py-3 md:hidden">
            <DataModeBadge status={status} />
            <p className="mt-2 text-xs text-slate-500">
              Last updated: {lastUpdated ? new Date(lastUpdated).toLocaleString() : "Fallback snapshot"}
            </p>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-10">{children}</main>
      </div>
    </div>
  );
}
