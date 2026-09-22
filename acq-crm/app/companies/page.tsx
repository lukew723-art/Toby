"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { companies as ALL_COMPANIES, Company } from "@/lib/companies";
import { loadRank, saveRank, Rank } from "@/lib/rank";
import CompanyBlock from "@/components/CompanyBlock";
import RankSegmented from "@/components/RankSegmented";
import NotesField from "@/components/NotesField";

const PAGE_SIZE = 20;

type SortKey = "rank" | "name" | "state";
type ViewMode = "list" | "triage";
type Tier = "all" | "unranked" | 1 | 2 | 3 | 4 | 5;

const TIERS: { value: Tier; label: string }[] = [
  { value: "all", label: "All" },
  { value: "unranked", label: "Unranked" },
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
];

export default function CompaniesPage() {
  const [ranks, setRanks] = useState<Record<string, Rank>>({});
  const [ranksLoaded, setRanksLoaded] = useState(false);

  const [query, setQuery] = useState("");
  const [productFilter, setProductFilter] = useState("all");
  const [tier, setTier] = useState<Tier>("all");
  const [sortKey, setSortKey] = useState<SortKey>("rank");
  const [view, setView] = useState<ViewMode>("list");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [triagePos, setTriagePos] = useState(0);

  useEffect(() => {
    const initial: Record<string, Rank> = {};
    for (const c of ALL_COMPANIES) initial[c.id] = loadRank(c);
    setRanks(initial);
    setRanksLoaded(true);
  }, []);

  function updateRank(id: string, rank: Rank) {
    setRanks((prev) => ({ ...prev, [id]: rank }));
    saveRank(id, rank);
  }

  const productTypes = useMemo(() => {
    const set = new Set<string>();
    for (const c of ALL_COMPANIES) for (const p of c.productTypes) set.add(p);
    return Array.from(set).sort();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = ALL_COMPANIES.filter((c) => {
      if (q) {
        const hay = [c.name, c.owner, c.address.city, c.address.state, ...c.productTypes]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (productFilter !== "all" && !c.productTypes.includes(productFilter)) return false;
      const r = ranks[c.id] ?? null;
      if (tier === "unranked" && r !== null) return false;
      if (typeof tier === "number" && r !== tier) return false;
      return true;
    });
    list = [...list].sort((a, b) => {
      if (sortKey === "name") return a.name.localeCompare(b.name);
      if (sortKey === "state") return (a.address.state ?? "").localeCompare(b.address.state ?? "");
      const ra = ranks[a.id] ?? 99;
      const rb = ranks[b.id] ?? 99;
      if (ra !== rb) return ra - rb;
      return a.name.localeCompare(b.name);
    });
    return list;
  }, [query, productFilter, tier, sortKey, ranks]);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
    setTriagePos(0);
  }, [query, productFilter, tier, sortKey]);

  const stats = useMemo(() => {
    const counts: Record<string, number> = { unranked: 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 };
    for (const c of ALL_COMPANIES) {
      const r = ranks[c.id];
      if (r === null || r === undefined) counts.unranked++;
      else counts[String(r)]++;
    }
    return counts;
  }, [ranks]);

  if (!ranksLoaded) {
    return (
      <main className="max-w-5xl mx-auto px-6 sm:px-10 py-12 sm:py-16">
        <p className="text-sm text-muted">Loading…</p>
      </main>
    );
  }

  const visible = filtered.slice(0, visibleCount);

  return (
    <main className="max-w-5xl mx-auto px-6 sm:px-10 py-12 sm:py-16">
      <p className="font-mono text-xs text-gold uppercase tracking-[0.2em] mb-2">
        {ALL_COMPANIES.length} companies
      </p>
      <h1 className="font-display text-3xl sm:text-4xl font-semibold text-navy mb-6">
        Company Profiles and Ranks
      </h1>

      {/* Stat tiles double as tier filters */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-6">
        {TIERS.map((t) => (
          <button
            key={String(t.value)}
            onClick={() => setTier(tier === t.value ? "all" : t.value)}
            className={`rounded-lg border p-3 text-left transition-colors ${
              tier === t.value ? "border-gold bg-gold/10" : "border-line bg-white hover:border-gold/50"
            }`}
          >
            <p className="font-mono text-xl font-semibold text-navy">
              {t.value === "all"
                ? ALL_COMPANIES.length
                : t.value === "unranked"
                ? stats.unranked
                : stats[String(t.value)]}
            </p>
            <p className="text-xs text-muted mt-0.5">{t.label}</p>
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, owner, city, state, or product type..."
          className="flex-1 min-w-[220px] rounded-lg border border-line bg-white px-4 py-2.5 text-sm focus:border-gold outline-none"
        />
        <select
          value={productFilter}
          onChange={(e) => setProductFilter(e.target.value)}
          className="rounded-lg border border-line bg-white px-3 py-2.5 text-sm outline-none focus:border-gold"
        >
          <option value="all">All product types</option>
          {productTypes.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        <select
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value as SortKey)}
          className="rounded-lg border border-line bg-white px-3 py-2.5 text-sm outline-none focus:border-gold"
        >
          <option value="rank">Sort: rank (best first)</option>
          <option value="name">Sort: name</option>
          <option value="state">Sort: state</option>
        </select>
        <div className="inline-flex rounded-lg border border-line overflow-hidden ml-auto">
          <button
            onClick={() => setView("list")}
            className={`px-3.5 py-2 text-sm font-medium ${view === "list" ? "bg-navy text-white" : "bg-white text-muted hover:bg-page"}`}
          >
            List
          </button>
          <button
            onClick={() => setView("triage")}
            className={`px-3.5 py-2 text-sm font-medium border-l border-line ${
              view === "triage" ? "bg-navy text-white" : "bg-white text-muted hover:bg-page"
            }`}
          >
            One at a time
          </button>
        </div>
      </div>

      {view === "list" ? (
        <div>
          {filtered.length === 0 ? (
            <p className="text-center text-sm text-muted py-12 border border-line rounded-xl bg-white">
              No companies match that search.
            </p>
          ) : (
            <div className="space-y-4">
              {visible.map((c) => (
                <CompanyBlock
                  key={c.id}
                  company={c}
                  rank={ranks[c.id] ?? null}
                  onRankChange={(r) => updateRank(c.id, r)}
                />
              ))}
            </div>
          )}
          {visible.length < filtered.length && (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setVisibleCount((v) => v + PAGE_SIZE)}
                className="rounded-lg border border-line bg-white px-5 py-2.5 text-sm font-medium text-navy hover:border-gold"
              >
                Load {Math.min(PAGE_SIZE, filtered.length - visible.length)} more ({filtered.length - visible.length} remaining)
              </button>
            </div>
          )}
        </div>
      ) : (
        <TriageView
          companies={filtered}
          pos={triagePos}
          setPos={setTriagePos}
          ranks={ranks}
          onRankChange={updateRank}
        />
      )}
    </main>
  );
}

function TriageView({
  companies,
  pos,
  setPos,
  ranks,
  onRankChange,
}: {
  companies: Company[];
  pos: number;
  setPos: (p: number) => void;
  ranks: Record<string, Rank>;
  onRankChange: (id: string, r: Rank) => void;
}) {
  const router = useRouter();
  const clampedPos = Math.min(pos, Math.max(0, companies.length - 1));
  const company = companies[clampedPos];

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const tag = (document.activeElement?.tagName || "").toLowerCase();
      if (tag === "textarea" || tag === "input" || tag === "select") return;
      if (e.key === "ArrowLeft") setPos(Math.max(0, clampedPos - 1));
      if (e.key === "ArrowRight") setPos(Math.min(companies.length - 1, clampedPos + 1));
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [clampedPos, companies.length, setPos]);

  if (!company) {
    return (
      <p className="text-center text-sm text-muted py-12 border border-line rounded-xl bg-white">
        No companies match that search.
      </p>
    );
  }

  const rank = ranks[company.id] ?? null;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setPos(Math.max(0, clampedPos - 1))}
          disabled={clampedPos === 0}
          className="rounded-lg border border-line bg-white px-4 py-2 text-sm font-medium text-navy hover:border-gold disabled:opacity-40 disabled:cursor-not-allowed"
        >
          ← Previous
        </button>
        <p className="font-mono text-sm text-muted">
          {clampedPos + 1} / {companies.length}
        </p>
        <button
          onClick={() => setPos(Math.min(companies.length - 1, clampedPos + 1))}
          disabled={clampedPos === companies.length - 1}
          className="rounded-lg border border-line bg-white px-4 py-2 text-sm font-medium text-navy hover:border-gold disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Next →
        </button>
      </div>

      <div className="rounded-xl border border-line bg-white p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
          <div>
            <h3 className="font-display text-2xl font-semibold text-navy">{company.name}</h3>
            <p className="text-sm text-muted mt-1">
              {company.owner ? `${company.owner} · ` : ""}
              {[company.address.city, company.address.state].filter(Boolean).join(", ") || "Location unknown"}
            </p>
          </div>
          <button
            onClick={() => router.push(`/companies/${company.id}`)}
            className="text-xs font-mono text-navy hover:text-gold whitespace-nowrap"
          >
            View full profile →
          </button>
        </div>

        <div className="mb-5">
          <p className="text-[11px] font-mono uppercase tracking-wide text-muted mb-1.5">Rank</p>
          <RankSegmented rank={rank} onChange={(r) => onRankChange(company.id, r)} />
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted mb-6">
          {company.productTypes.length > 0 && (
            <span className="text-ink font-medium">{company.productTypes.join(", ")}</span>
          )}
          {company.membership && <span>Membership: {company.membership}</span>}
          {company.sizeRange && <span>Size: {company.sizeRange}</span>}
          {company.branches !== null && company.branches !== undefined && (
            <span>{company.branches} branch(es)</span>
          )}
          {company.phone && <span>{company.phone}</span>}
        </div>

        <NotesField companyId={company.id} />
      </div>
    </div>
  );
}
