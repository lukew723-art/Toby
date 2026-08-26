"use client";

import { useEffect, useRef, useState } from "react";
import { readJSON, writeJSON } from "@/lib/storage";

export function useCompanyEmail(companyId: string) {
  const key = `company-email:${companyId}`;
  const [email, setEmailState] = useState("");
  const loaded = useRef(false);

  useEffect(() => {
    setEmailState(readJSON<string>(key, ""));
    loaded.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyId]);

  function setEmail(value: string) {
    setEmailState(value);
    writeJSON(key, value);
  }

  return { email, setEmail, loaded: loaded.current };
}

export default function CompanyEmailField({ companyId }: { companyId: string }) {
  const { email, setEmail } = useCompanyEmail(companyId);

  return (
    <div>
      <dt className="text-muted text-xs">Email</dt>
      <dd>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Add once you have it..."
          className="w-full text-sm font-medium bg-transparent border-b border-dashed border-line focus:border-gold outline-none py-0.5"
        />
      </dd>
    </div>
  );
}
