import Link from "next/link";
import { companies } from "@/lib/companies";

export default function Dashboard() {
  const states = new Set(companies.map((c) => c.address.state).filter(Boolean));
  const withNotes = companies.filter((c) => c.notes).length;

  return (
    <main className="max-w-5xl mx-auto px-6 sm:px-10 py-12 sm:py-16">
      <p className="font-mono text-xs text-gold uppercase tracking-[0.2em] mb-2">
        Acquisitions Tracker
      </p>
      <h1 className="font-display text-4xl sm:text-5xl font-semibold text-navy mb-8">
        Welcome, Toby.
      </h1>

      <div className="grid sm:grid-cols-3 gap-4 mb-10">
        <div className="rounded-xl border border-line bg-white p-5">
          <p className="font-mono text-3xl font-semibold text-navy">{companies.length}</p>
          <p className="text-sm text-muted mt-1">Companies tracked</p>
        </div>
        <div className="rounded-xl border border-line bg-white p-5">
          <p className="font-mono text-3xl font-semibold text-navy">{states.size}</p>
          <p className="text-sm text-muted mt-1">States / regions</p>
        </div>
        <div className="rounded-xl border border-line bg-white p-5">
          <p className="font-mono text-3xl font-semibold text-navy">{withNotes}</p>
          <p className="text-sm text-muted mt-1">With flagged notes</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Link
          href="/companies"
          className="rounded-xl border border-line bg-white p-5 hover:border-gold transition-colors"
        >
          <h2 className="font-display text-lg font-semibold text-navy mb-1">Company Profiles and Ranks</h2>
          <p className="text-sm text-muted">Browse, search, and rank every company on the list.</p>
        </Link>
        <Link
          href="/pipeline"
          className="rounded-xl border border-line bg-white p-5 hover:border-gold transition-colors"
        >
          <h2 className="font-display text-lg font-semibold text-navy mb-1">Sales Pipeline</h2>
          <p className="text-sm text-muted">Track where each company stands in the process.</p>
        </Link>
        <Link
          href="/map"
          className="rounded-xl border border-line bg-white p-5 hover:border-gold transition-colors"
        >
          <h2 className="font-display text-lg font-semibold text-navy mb-1">Map</h2>
          <p className="text-sm text-muted">See every company plotted geographically.</p>
        </Link>
        <Link
          href="/contacts"
          className="rounded-xl border border-line bg-white p-5 hover:border-gold transition-colors"
        >
          <h2 className="font-display text-lg font-semibold text-navy mb-1">Contacts</h2>
          <p className="text-sm text-muted">Owner names, phone numbers, and quick outreach.</p>
        </Link>
      </div>
    </main>
  );
}
