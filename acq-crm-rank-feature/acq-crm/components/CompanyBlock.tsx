"use client";

import type { SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import type { Company } from "@/lib/companies";
import type { Rank } from "@/lib/rank";
import RankSegmented from "./RankSegmented";
import NotesField from "./NotesField";

/**
 * One spacious block in the Company Profiles and Ranks list. The whole
 * block navigates to /companies/[id] on click (matching how names linked
 * out on the old table), except for the rank control and notes box, which
 * stop the click from bubbling so they stay interactive in place.
 */
export default function CompanyBlock({
  company,
  rank,
  onRankChange,
}: {
  company: Company;
  rank: Rank;
  onRankChange: (r: Rank) => void;
}) {
  const router = useRouter();

  function go() {
    router.push(`/companies/${company.id}`);
  }

  function stop(e: SyntheticEvent) {
    e.stopPropagation();
  }

  const details = [
    company.membership ? `Membership: ${company.membership}` : null,
    company.sizeRange ? `Size: ${company.sizeRange}` : null,
    company.branches !== null && company.branches !== undefined ? `${company.branches} branch(es)` : null,
  ].filter(Boolean) as string[];

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={go}
      onKeyDown={(e) => {
        if (e.key === "Enter") go();
      }}
      className="rounded-xl border border-line bg-white p-5 sm:p-6 hover:border-gold transition-colors cursor-pointer"
    >
      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
        <div className="min-w-0">
          <h3 className="font-display text-lg font-semibold text-navy truncate">{company.name}</h3>
          <p className="text-sm text-muted mt-0.5">
            {company.owner ? `${company.owner} · ` : ""}
            {[company.address.city, company.address.state].filter(Boolean).join(", ") || "Location unknown"}
          </p>
        </div>
        <div onClick={stop} onMouseDown={stop} onKeyDown={stop}>
          <RankSegmented rank={rank} onChange={onRankChange} />
        </div>
      </div>

      <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-muted mb-4">
        {company.productTypes.length > 0 && (
          <span className="text-ink font-medium">{company.productTypes.join(", ")}</span>
        )}
        {details.map((d) => (
          <span key={d}>{d}</span>
        ))}
        {company.phone && <span>{company.phone}</span>}
      </div>

      <div onClick={stop} onMouseDown={stop} onKeyDown={stop}>
        <NotesField companyId={company.id} compact />
      </div>
    </div>
  );
}
