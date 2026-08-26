"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Company } from "@/lib/companies";
import { useCompanyEmail } from "@/components/CompanyEmailField";
import { logContact, lastContact, ContactLogEntry } from "@/lib/outreach";

export default function OutreachRow({ company }: { company: Company }) {
  const { email, setEmail } = useCompanyEmail(company.id);
  const [last, setLast] = useState<ContactLogEntry | null>(null);

  useEffect(() => {
    setLast(lastContact(company.id));
  }, [company.id]);

  const phoneDigits = company.phone?.replace(/[^\d+]/g, "");

  function handleCall() {
    logContact(company.id, "phone");
    setLast(lastContact(company.id));
  }

  function handleEmail() {
    logContact(company.id, "email");
    setLast(lastContact(company.id));
  }

  return (
    <tr className="border-b border-line/60 last:border-0 hover:bg-page/40">
      <td className="px-4 py-2.5">
        <Link href={`/companies/${company.id}`} className="font-medium text-navy hover:text-gold">
          {company.name}
        </Link>
        <p className="text-xs text-muted">{company.owner}</p>
      </td>
      <td className="px-4 py-2.5">
        {company.phone ? (
          <a
            href={`tel:${phoneDigits}`}
            onClick={handleCall}
            className="text-xs font-medium text-white bg-navy hover:bg-navyLight rounded-md px-2.5 py-1 inline-block"
          >
            Call
          </a>
        ) : (
          <span className="text-xs text-muted">No phone</span>
        )}
      </td>
      <td className="px-4 py-2.5">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email address..."
          className="text-xs w-40 bg-transparent border-b border-dashed border-line focus:border-gold outline-none py-0.5 mr-2"
        />
        <a
          href={`mailto:${email}?subject=${encodeURIComponent(`Re: ${company.name}`)}`}
          onClick={handleEmail}
          className="text-xs font-medium text-white bg-gold hover:bg-goldBright rounded-md px-2.5 py-1 inline-block"
        >
          Email
        </a>
      </td>
      <td className="px-4 py-2.5 text-xs text-muted hidden sm:table-cell">
        {last
          ? `${last.method === "phone" ? "Called" : "Emailed"} ${new Date(last.date).toLocaleDateString()}`
          : "No contact logged"}
      </td>
    </tr>
  );
}
