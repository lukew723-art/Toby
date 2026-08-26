"use client";

import { useEffect, useRef, useState } from "react";
import { readJSON, writeJSON } from "@/lib/storage";

const KEY = "global-notes";

export default function NotesPage() {
  const [text, setText] = useState("");
  const [status, setStatus] = useState<"idle" | "saved">("idle");
  const loaded = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setText(readJSON<string>(KEY, ""));
    loaded.current = true;
  }, []);

  function handleChange(value: string) {
    setText(value);
    if (!loaded.current) return;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      writeJSON(KEY, value);
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 1200);
    }, 500);
  }

  return (
    <main className="max-w-3xl mx-auto px-6 sm:px-10 py-12 sm:py-16">
      <p className="font-mono text-xs text-gold uppercase tracking-[0.2em] mb-2">
        Autosaves in this browser
      </p>
      <div className="flex items-baseline justify-between mb-4">
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-navy">Notes</h1>
        <span className="text-xs text-muted h-4">{status === "saved" ? "Saved" : ""}</span>
      </div>
      <p className="text-sm text-muted mb-4">
        General notes not tied to a specific company. For company-specific
        notes, use the notes box on that company's own profile page instead.
      </p>
      <textarea
        value={text}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Strategy thoughts, next steps, questions for Dad..."
        rows={16}
        className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none focus:border-gold resize-y"
      />
    </main>
  );
}
