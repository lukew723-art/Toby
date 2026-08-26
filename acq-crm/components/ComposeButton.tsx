"use client";

import { useCompanyEmail } from "@/components/CompanyEmailField";

export default function ComposeButton({
  companyId,
  companyName,
}: {
  companyId: string;
  companyName: string;
}) {
  const { email } = useCompanyEmail(companyId);

  const href = `mailto:${email}?subject=${encodeURIComponent(`Re: ${companyName}`)}`;

  return (
    <a
      href={href}
      className="inline-block text-xs font-medium text-white bg-navy hover:bg-navyLight rounded-md px-3 py-1.5 transition-colors"
    >
      {email ? `Email ${email}` : "Compose email"}
    </a>
  );
}
