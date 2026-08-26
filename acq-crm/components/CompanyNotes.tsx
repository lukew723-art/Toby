"use client";

import { useEffect, useRef, useState } from "react";
import { readJSON, writeJSON } from "@/lib/storage";

export default function CompanyNotes({ companyId }: { companyId: string }) {
  const key = `company-notes:${companyId}`;
  const [text, setText] = useState("");
  const [status, setStatus] = useState<"idle" | "saved">("idle");
  const loaded = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setText(readJSON<string>(key, ""));
    loaded.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyId]);

  function handleChange(value: string) {
    setText(value);
    if (!loaded.current) return;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      writeJSON(key, value);
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 1200);
    }, 500);
  }

  return (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <h3 className="font-display text-sm font-semibold text-navy">Notes on this company</h3>
        <span className="text-[11px] text-muted h-4">
          {status === "saved" ? "Saved" : "Autosaves"}
        </span>
      </div>
      <textarea
        value={text}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Call notes, impressions, valuation thoughts..."
        rows={4}
        className="w-full rounded-md border border-line bg-page px-3 py-2 text-sm outline-none focus:border-gold resize-y"
      />
    </div>
  );
}
