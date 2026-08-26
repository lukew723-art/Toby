import Link from "next/link";
import { companies } from "@/lib/companies";

export default function ContactsPage() {
  const sorted = [...companies].sort((a, b) => a.owner.localeCompare(b.owner));

  return (
    <main className="max-w-5xl mx-auto px-6 sm:px-10 py-12 sm:py-16">
      <p className="font-mono text-xs text-gold uppercase tracking-[0.2em] mb-2">
        {companies.length} contacts
      </p>
      <h1 className="font-display text-3xl sm:text-4xl font-semibold text-navy mb-6">
        Contacts
      </h1>

      <div className="rounded-xl border border-line bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line bg-page/60 text-left">
              <th className="px-4 py-2.5 font-medium text-muted">Owner</th>
              <th className="px-4 py-2.5 font-medium text-muted">Company</th>
              <th className="px-4 py-2.5 font-medium text-muted hidden sm:table-cell">Phone</th>
              <th className="px-4 py-2.5 font-medium text-muted hidden md:table-cell">Location</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((c) => (
              <tr key={c.id} className="border-b border-line/60 last:border-0 hover:bg-page/40">
                <td className="px-4 py-2.5 font-medium">{c.owner || "—"}</td>
                <td className="px-4 py-2.5">
                  <Link href={`/companies/${c.id}`} className="text-navy hover:text-gold">
                    {c.name}
                  </Link>
                </td>
                <td className="px-4 py-2.5 hidden sm:table-cell">
                  {c.phone ? (
                    <a href={`tel:${c.phone.replace(/[^\d+]/g, "")}`} className="text-navy hover:text-gold">
                      {c.phone}
                    </a>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="px-4 py-2.5 text-muted hidden md:table-cell">
                  {c.address.city}, {c.address.state}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
