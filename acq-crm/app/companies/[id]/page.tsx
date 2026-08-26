import Link from "next/link";
import { notFound } from "next/navigation";
import { companies, getCompany, formatAddress } from "@/lib/companies";
import StageSelector from "@/components/StageSelector";
import CompanyNotes from "@/components/CompanyNotes";
import ComposeButton from "@/components/ComposeButton";
import CompanyEmailField from "@/components/CompanyEmailField";

export function generateStaticParams() {
  return companies.map((c) => ({ id: c.id }));
}

export default function CompanyProfile({ params }: { params: { id: string } }) {
  const company = getCompany(params.id);
  if (!company) notFound();

  const phoneDigits = company.phone?.replace(/[^\d+]/g, "");

  return (
    <main className="max-w-3xl mx-auto px-6 sm:px-10 py-12 sm:py-16">
      <Link href="/companies" className="text-xs font-mono text-muted hover:text-navy">
        ← All companies
      </Link>

      <div className="flex items-start justify-between gap-4 mt-3 mb-6">
        <div>
          <h1 className="font-display text-3xl font-semibold text-navy mb-1">{company.name}</h1>
          <p className="text-sm text-muted">
            {company.address.city}, {company.address.state}
          </p>
        </div>
        <StageSelector companyId={company.id} />
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div className="rounded-xl border border-line bg-white p-5">
          <h2 className="font-display text-sm font-semibold text-navy mb-3 uppercase tracking-wide">
            Contact
          </h2>
          <dl className="space-y-2 text-sm">
            <div>
              <dt className="text-muted text-xs">Owner</dt>
              <dd className="font-medium">{company.owner || "—"}</dd>
            </div>
            <div>
              <dt className="text-muted text-xs">Phone</dt>
              <dd className="font-medium">
                {company.phone ? (
                  <a href={`tel:${phoneDigits}`} className="text-navy hover:text-gold">
                    {company.phone}
                  </a>
                ) : (
                  "—"
                )}
              </dd>
            </div>
            <div className="pt-1">
              <CompanyEmailField companyId={company.id} />
            </div>
            <div className="pt-1">
              <ComposeButton companyId={company.id} companyName={company.name} />
            </div>
          </dl>
        </div>

        <div className="rounded-xl border border-line bg-white p-5">
          <h2 className="font-display text-sm font-semibold text-navy mb-3 uppercase tracking-wide">
            Addresses
          </h2>
          <dl className="space-y-2 text-sm">
            <div>
              <dt className="text-muted text-xs">Physical</dt>
              <dd>{formatAddress(company.address)}</dd>
            </div>
            <div>
              <dt className="text-muted text-xs">Mailing</dt>
              <dd>{formatAddress(company.mailingAddress)}</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-xl border border-line bg-white p-5">
          <h2 className="font-display text-sm font-semibold text-navy mb-3 uppercase tracking-wide">
            Business
          </h2>
          <dl className="space-y-2 text-sm">
            <div>
              <dt className="text-muted text-xs">Product Types</dt>
              <dd>{company.productTypes.join(", ") || "—"}</dd>
            </div>
            <div>
              <dt className="text-muted text-xs">Branches</dt>
              <dd>{company.branches ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-muted text-xs">Size Range</dt>
              <dd>{company.sizeRange ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-muted text-xs">Membership</dt>
              <dd>{company.membership ?? "—"}</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-xl border border-line bg-white p-5">
          <h2 className="font-display text-sm font-semibold text-navy mb-3 uppercase tracking-wide">
            Source List Notes
          </h2>
          <p className="text-sm text-muted">
            {company.notes || "No notes from the original list."}
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-line bg-white p-5">
        <CompanyNotes companyId={company.id} />
      </div>
    </main>
  );
}
