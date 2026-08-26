"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { companies } from "@/lib/companies";

const MapClient = dynamic(() => import("@/components/MapClient"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full rounded-xl bg-page flex items-center justify-center text-sm text-muted">
      Loading map...
    </div>
  ),
});

export default function MapPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return companies;
    return companies.filter((c) =>
      [c.name, c.owner, c.address.city, c.address.state]
        .filter(Boolean)
        .some((f) => (f as string).toLowerCase().includes(q))
    );
  }, [query]);

  return (
    <main className="px-6 sm:px-10 py-12 sm:py-16 h-screen flex flex-col">
      <p className="font-mono text-xs text-gold uppercase tracking-[0.2em] mb-2">
        {filtered.length} of {companies.length} shown
      </p>
      <h1 className="font-display text-3xl sm:text-4xl font-semibold text-navy mb-4">Map</h1>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by company, owner, city, or state..."
        className="w-full max-w-md rounded-lg border border-line bg-white px-4 py-2.5 text-sm mb-4 focus:border-gold outline-none"
      />

      <div className="flex-1 min-h-0 rounded-xl border border-line overflow-hidden">
        <MapClient companies={filtered} />
      </div>
    </main>
  );
}
