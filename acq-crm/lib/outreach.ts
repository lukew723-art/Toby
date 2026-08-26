import { readJSON, writeJSON } from "@/lib/storage";

export interface ContactLogEntry {
  method: "phone" | "email";
  date: string; // ISO
}

export function getLog(companyId: string): ContactLogEntry[] {
  return readJSON<ContactLogEntry[]>(`contact-log:${companyId}`, []);
}

export function logContact(companyId: string, method: "phone" | "email") {
  const entries = getLog(companyId);
  entries.push({ method, date: new Date().toISOString() });
  writeJSON(`contact-log:${companyId}`, entries);
}

export function lastContact(companyId: string): ContactLogEntry | null {
  const entries = getLog(companyId);
  if (entries.length === 0) return null;
  return entries[entries.length - 1];
}
