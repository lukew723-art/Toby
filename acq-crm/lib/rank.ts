"use client";

import { useEffect, useState } from "react";
import { readJSON, writeJSON } from "@/lib/storage";
import type { Company } from "@/lib/companies";

const KEY_PREFIX = "rank:";

export type Rank = 1 | 2 | 3 | 4 | 5 | null;

export const RANK_OPTIONS: Rank[] = [1, 2, 3, 4, 5];

/**
 * The seed data has a legacy "priority" field (string values like "1", "2",
 * "2.5") from the original import. That field is being treated as an early
 * draft of the new 1-5 rank, so a company with no rank saved yet in this
 * browser falls back to its priority, rounded and clamped into 1-5. Once the
 * user actually ranks (or unranks) a company here, that explicit choice is
 * saved under its own key and always wins over this fallback.
 */
export function initialRankFromPriority(priority: string | null): Rank {
  if (!priority) return null;
  const n = parseFloat(priority);
  if (Number.isNaN(n)) return null;
  const rounded = Math.round(n);
  const clamped = Math.min(5, Math.max(1, rounded));
  return clamped as Rank;
}

export function loadRank(company: Company): Rank {
  return readJSON<Rank>(KEY_PREFIX + company.id, initialRankFromPriority(company.priority));
}

export function saveRank(companyId: string, rank: Rank) {
  writeJSON(KEY_PREFIX + companyId, rank);
  window.dispatchEvent(new CustomEvent("rank-changed"));
}

/** Single-company hook for use in the company detail page. */
export function useRank(company: Company) {
  const [rank, setRankState] = useState<Rank | undefined>(undefined);

  useEffect(() => {
    setRankState(loadRank(company));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [company.id]);

  function setRank(next: Rank) {
    setRankState(next);
    saveRank(company.id, next);
  }

  return { rank, setRank };
}
