import { companies } from "@/lib/companies";
import OutreachRow from "@/components/OutreachRow";

export default function OutreachPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 sm:px-10 py-12 sm:py-16">
      <p className="font-mono text-xs text-gold uppercase tracking-[0.2em] mb-2">
        Outreach
      </p>
      <h1 className="font-display text-3xl sm:text-4xl font-semibold text-navy mb-3">
        Email / Phone
      </h1>
      <p className="text-sm text-muted max-w-2xl mb-6">
        Your list didn't include email addresses, so add them here as you get
        them — they'll be remembered and reused on each company's profile
        too. "Call" and "Email" open your own phone/mail apps and log a
        timestamp here; this site doesn't send anything itself or host an
        inbox.
      </p>

      <div className="rounded-xl border border-line bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line bg-page/60 text-left">
              <th className="px-4 py-2.5 font-medium text-muted">Company</th>
              <th className="px-4 py-2.5 font-medium text-muted">Phone</th>
              <th className="px-4 py-2.5 font-medium text-muted">Email</th>
              <th className="px-4 py-2.5 font-medium text-muted hidden sm:table-cell">Last Contact</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((c) => (
              <OutreachRow key={c.id} company={c} />
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
