export const STAGES = [
  "Researching",
  "Initial Outreach",
  "Contacted",
  "In Discussion",
  "Offer Made",
  "Negotiating",
  "Due Diligence",
  "Closed – Won",
  "Closed – Lost",
] as const;

export type Stage = (typeof STAGES)[number];

export interface StageLogEntry {
  stage: Stage;
  date: string; // ISO
}

export interface PipelineRecord {
  stage: Stage;
  log: StageLogEntry[];
}

export const STAGE_COLOR: Record<Stage, string> = {
  "Researching": "bg-muted/15 text-muted",
  "Initial Outreach": "bg-gold/20 text-gold",
  "Contacted": "bg-gold/25 text-gold",
  "In Discussion": "bg-navy/10 text-navy",
  "Offer Made": "bg-navy/15 text-navy",
  "Negotiating": "bg-navy/20 text-navy",
  "Due Diligence": "bg-navy/25 text-navy",
  "Closed – Won": "bg-stageGreen/15 text-stageGreen",
  "Closed – Lost": "bg-stageRed/15 text-stageRed",
};
