"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { companies, Company } from "@/lib/companies";
import { STAGES, Stage, PipelineRecord, STAGE_COLOR } from "@/lib/pipeline";
import { readJSON } from "@/lib/storage";
import StageSelector from "@/components/StageSelector";

export default function PipelinePage() {
  const [stagesByCompany, setStagesByCompany] = useState<Record<string, Stage> | null>(null);

  useEffect(() => {
    function refresh() {
      const map: Record<string, Stage> = {};
      for (const c of companies) {
        const rec = readJSON<PipelineRecord>(`pipeline:${c.id}`, {
          stage: "Researching",
          log: [],
        });
        map[c.id] = rec.stage;
      }
      setStagesByCompany(map);
    }
    refresh();
    window.addEventListener("pipeline-changed", refresh);
    return () => window.removeEventListener("pipeline-changed", refresh);
  }, []);

  if (!stagesByCompany) return null;

  const grouped: Record<Stage, Company[]> = STAGES.reduce((acc, s) => {
    acc[s] = [];
    return acc;
  }, {} as Record<Stage, Company[]>);

  for (const c of companies) {
    const stage = stagesByCompany[c.id] ?? "Researching";
    grouped[stage].push(c);
  }

  return (
    <main className="px-6 sm:px-10 py-12 sm:py-16">
      <p className="font-mono text-xs text-gold uppercase tracking-[0.2em] mb-2">
        {companies.length} companies
      </p>
      <h1 className="font-display text-3xl sm:text-4xl font-semibold text-navy mb-6">
        Sales Pipeline
      </h1>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {STAGES.map((stage) => (
          <div key={stage} className="w-64 shrink-0">
            <div className={`rounded-t-lg px-3 py-2 text-xs font-semibold ${STAGE_COLOR[stage]}`}>
              {stage} <span className="opacity-60">({grouped[stage].length})</span>
            </div>
            <div className="border border-t-0 border-line rounded-b-lg bg-white min-h-[120px] max-h-[70vh] overflow-y-auto">
              {grouped[stage].map((c) => (
                <div key={c.id} className="border-b border-line/60 last:border-0 p-3">
                  <Link
                    href={`/companies/${c.id}`}
                    className="text-sm font-medium text-navy hover:text-gold block mb-1"
                  >
                    {c.name}
                  </Link>
                  <p className="text-xs text-muted mb-2">
                    {c.address.city}, {c.address.state}
                  </p>
                  <StageSelector companyId={c.id} />
                </div>
              ))}
              {grouped[stage].length === 0 && (
                <p className="text-xs text-muted p-3">Nothing here yet.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
