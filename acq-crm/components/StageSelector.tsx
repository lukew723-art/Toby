"use client";

import { useEffect, useState } from "react";
import { STAGES, Stage, PipelineRecord, STAGE_COLOR } from "@/lib/pipeline";
import { readJSON, writeJSON } from "@/lib/storage";

const KEY_PREFIX = "pipeline:";

function loadRecord(companyId: string): PipelineRecord {
  return readJSON<PipelineRecord>(KEY_PREFIX + companyId, {
    stage: "Researching",
    log: [{ stage: "Researching", date: new Date().toISOString() }],
  });
}

export function useStage(companyId: string) {
  const [record, setRecord] = useState<PipelineRecord | null>(null);

  useEffect(() => {
    setRecord(loadRecord(companyId));
  }, [companyId]);

  function setStage(stage: Stage) {
    const next: PipelineRecord = {
      stage,
      log: [...(record?.log ?? []), { stage, date: new Date().toISOString() }],
    };
    setRecord(next);
    writeJSON(KEY_PREFIX + companyId, next);
    window.dispatchEvent(new CustomEvent("pipeline-changed"));
  }

  return { record, setStage };
}

export default function StageSelector({ companyId }: { companyId: string }) {
  const { record, setStage } = useStage(companyId);

  if (!record) return null;

  return (
    <div>
      <select
        value={record.stage}
        onChange={(e) => setStage(e.target.value as Stage)}
        className={`text-xs font-medium rounded-full px-3 py-1.5 border-0 outline-none cursor-pointer ${STAGE_COLOR[record.stage]}`}
      >
        {STAGES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    </div>
  );
}
