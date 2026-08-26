"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { companies } from "@/lib/companies";

export default function CompaniesPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return companies;
    return companies.filter((c) =>
      [c.name, c.owner, c.address.city, c.address.state, ...c.productTypes]
        .filter(Boolean)
        .some((field) => (field as string).toLowerCase().includes(q))
    );
  }, [query]);

  return (
    <main className="max-w-5xl mx-auto px-6 sm:px-10 py-12 sm:py-16">
      <p className="font-mono text-xs text-gold uppercase tracking-[0.2em] mb-2">
        {companies.length} companies
      </p>
      <h1 className="font-display text-3xl sm:text-4xl font-semibold text-navy mb-6">
        Company Profiles
      </h1>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by name, owner, city, state, or product type..."
        className="w-full rounded-lg border border-line bg-white px-4 py-2.5 text-sm mb-6 focus:border-gold outline-none"
      />

      <div className="rounded-xl border border-line bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line bg-page/60 text-left">
              <th className="px-4 py-2.5 font-medium text-muted">Company</th>
              <th className="px-4 py-2.5 font-medium text-muted hidden sm:table-cell">Owner</th>
              <th className="px-4 py-2.5 font-medium text-muted hidden md:table-cell">Location</th>
              <th className="px-4 py-2.5 font-medium text-muted hidden lg:table-cell">Type</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id} className="border-b border-line/60 last:border-0 hover:bg-page/40">
                <td className="px-4 py-2.5">
                  <Link href={`/companies/${c.id}`} className="font-medium text-navy hover:text-gold">
                    {c.name}
                  </Link>
                </td>
                <td className="px-4 py-2.5 text-muted hidden sm:table-cell">{c.owner}</td>
                <td className="px-4 py-2.5 text-muted hidden md:table-cell">
                  {c.address.city}, {c.address.state}
                </td>
                <td className="px-4 py-2.5 text-muted hidden lg:table-cell">
                  {c.productTypes.join(" / ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="text-center text-sm text-muted py-8">No companies match that search.</p>
        )}
      </div>
    </main>
  );
}
