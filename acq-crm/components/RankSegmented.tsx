"use client";

import type { Rank } from "@/lib/rank";

const OPTIONS: { value: Rank; label: string }[] = [
  { value: null, label: "—" },
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
];

function colorFor(value: Rank, active: boolean) {
  if (!active) return "bg-white text-muted hover:bg-page";
  if (value === null) return "bg-muted/15 text-muted";
  if (value === 1) return "bg-stageGreen/25 text-stageGreen";
  if (value === 2) return "bg-stageGreen/10 text-stageGreen";
  if (value === 3) return "bg-gold/25 text-gold";
  if (value === 4) return "bg-stageRed/10 text-stageRed";
  return "bg-stageRed/25 text-stageRed"; // 5
}

export default function RankSegmented({
  rank,
  onChange,
  size = "md",
}: {
  rank: Rank;
  onChange: (r: Rank) => void;
  size?: "sm" | "md";
}) {
  const pad = size === "sm" ? "px-2 py-1 text-xs" : "px-2.5 py-1.5 text-sm";

  return (
    <div className="inline-flex rounded-lg border border-line overflow-hidden shrink-0">
      {OPTIONS.map((opt, i) => {
        const active = rank === opt.value;
        return (
          <button
            key={String(opt.value)}
            type="button"
            onClick={() => onChange(opt.value)}
            title={opt.value === null ? "Mark unranked" : `Rank ${opt.value}`}
            className={`${pad} font-mono font-medium transition-colors ${
              i > 0 ? "border-l border-line" : ""
            } ${colorFor(opt.value, active)}`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
