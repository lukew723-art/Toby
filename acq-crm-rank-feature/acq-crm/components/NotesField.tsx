"use client";

import { useEffect, useRef, useState } from "react";
import { readJSON, writeJSON } from "@/lib/storage";

/**
 * Shared debounced, autosaving notes textarea, keyed per company in
 * localStorage under "company-notes:<id>". Used both by the full-size notes
 * card on the company detail page (via CompanyNotes) and, in compact form,
 * inside each block on the Company Profiles and Ranks list page. Both
 * places read/write the same key, so edits made in one show up in the
 * other on next load.
 *
 * Keeps its own local `text` state and only calls writeJSON on a debounce
 * timer, never on every keystroke via a parent re-render, so typing here
 * never causes the list page above it to re-sort or re-render.
 */
export default function NotesField({
  companyId,
  compact = false,
  label = "Notes on this company",
}: {
  companyId: string;
  compact?: boolean;
  label?: string;
}) {
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
      {!compact && (
        <div className="flex items-baseline justify-between mb-1.5">
          <h3 className="font-display text-sm font-semibold text-navy">{label}</h3>
          <span className="text-[11px] text-muted h-4">
            {status === "saved" ? "Saved" : "Autosaves"}
          </span>
        </div>
      )}
      <textarea
        value={text}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Call notes, impressions, valuation thoughts..."
        rows={compact ? 2 : 4}
        className="w-full rounded-md border border-line bg-page px-3 py-2 text-sm outline-none focus:border-gold resize-y"
      />
      {compact && (
        <div className="text-right text-[11px] text-muted h-4 mt-0.5">
          {status === "saved" ? "Saved" : ""}
        </div>
      )}
    </div>
  );
}
