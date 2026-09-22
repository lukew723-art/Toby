"use client";

import type { Company } from "@/lib/companies";
import { useRank } from "@/lib/rank";
import RankSegmented from "./RankSegmented";

/**
 * Single-company rank control for the company detail page. Loads/saves
 * through the same localStorage-backed rank store as the list page, so
 * ranking a company from either place stays in sync.
 */
export default function RankControl({ company }: { company: Company }) {
  const { rank, setRank } = useRank(company);

  if (rank === undefined) return null;

  return (
    <div>
      <p className="text-[11px] font-mono uppercase tracking-wide text-muted mb-1">Rank</p>
      <RankSegmented rank={rank} onChange={setRank} />
    </div>
  );
}
